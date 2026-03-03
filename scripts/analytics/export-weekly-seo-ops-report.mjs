#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
    mapUrlToCluster,
    normalizeUrlPath,
    orderedWeeklyClusters,
    resolveCanonicalLandingDimensions,
} from "./lib/weekly-report-cluster-map.mjs";

const schemaVersion = "2.0.0";

function parseArgs(argv) {
    const args = {};

    for (let index = 0; index < argv.length; index += 1) {
        const token = argv[index];
        if (!token.startsWith("--")) {
            continue;
        }

        const key = token.slice(2);
        const value = argv[index + 1];
        if (!value || value.startsWith("--")) {
            args[key] = "true";
            continue;
        }

        args[key] = value;
        index += 1;
    }

    return args;
}

function parseCsv(filePath) {
    const source = fs.readFileSync(filePath, "utf8");
    const lines = source
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length < 2) {
        throw new Error(`CSV file is empty or missing rows: ${filePath}`);
    }

    const headers = lines[0].split(",").map((value) => value.trim());
    return lines.slice(1).map((line, index) => {
        const values = line.split(",").map((value) => value.trim());
        if (values.length !== headers.length) {
            throw new Error(
                `CSV column mismatch in ${filePath} on row ${index + 2}: expected ${headers.length}, got ${values.length}`,
            );
        }

        return Object.fromEntries(headers.map((header, headerIndex) => [header, values[headerIndex]]));
    });
}

function assertRequiredColumns(rows, requiredColumns, label) {
    if (!rows[0]) {
        throw new Error(`${label} has no data rows.`);
    }

    for (const column of requiredColumns) {
        if (!(column in rows[0])) {
            throw new Error(`${label} is missing required column: ${column}`);
        }
    }
}

function parseNumber(value) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : 0;
}

function parseIndexedFlag(value) {
    const normalized = String(value ?? "").trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "yes";
}

function parseEventDate(value) {
    if (typeof value !== "string" || value.trim().length === 0) {
        return null;
    }

    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
        return null;
    }

    return new Date(parsed).toISOString().slice(0, 10);
}

function createRecordSeed(dimensions) {
    return {
        ...dimensions,
        indexed_pages: 0,
        tracked_urls: new Set(),
        traffic_clicks: 0,
        traffic_impressions: 0,
        booked_calls: 0,
        booked_call_embed_interactions: 0,
        lead_submits_success: 0,
        conversion_keys: new Set(),
    };
}

function getRecord(records, dimensions) {
    const key = `${dimensions.cluster}::${dimensions.template_type}::${dimensions.landing_url}`;
    if (!records.has(key)) {
        records.set(key, createRecordSeed(dimensions));
    }

    return records.get(key);
}

function parseBookedRows(filePath) {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!Array.isArray(parsed.rows)) {
        throw new Error("Booked-call input must include a top-level rows array.");
    }

    return parsed;
}

function toCsv(rows) {
    const headers = [
        "cluster",
        "template_type",
        "landing_url",
        "week_start",
        "week_end",
        "indexed_pages",
        "tracked_urls",
        "traffic_trend_clicks",
        "traffic_trend_impressions",
        "booked_calls",
        "booked_call_embed_interactions",
        "lead_submits_success",
        "joinable_conversion_keys",
    ];

    const lines = [headers.join(",")];
    for (const row of rows) {
        lines.push(
            [
                row.cluster,
                row.template_type,
                row.landing_url,
                row.week_start,
                row.week_end,
                row.indexed_pages,
                row.tracked_urls,
                row.traffic_trend.clicks,
                row.traffic_trend.impressions,
                row.booked_calls,
                row.booked_call_embed_interactions,
                row.lead_submits_success,
                row.joinable_conversion_keys,
            ].join(","),
        );
    }

    return `${lines.join("\n")}\n`;
}

function compareClusterOrder(leftCluster, rightCluster) {
    const leftIndex = orderedWeeklyClusters.indexOf(leftCluster);
    const rightIndex = orderedWeeklyClusters.indexOf(rightCluster);
    if (leftIndex === rightIndex) {
        return leftCluster.localeCompare(rightCluster);
    }

    return leftIndex - rightIndex;
}

export function exportWeeklySeoOpsReport(options) {
    const indexedPath = options.indexed;
    const trafficPath = options.traffic;
    const bookedPath = options.booked;
    const outputDir = options.output;

    if (!indexedPath || !trafficPath || !bookedPath || !outputDir) {
        throw new Error(
            "Usage: node scripts/analytics/export-weekly-seo-ops-report.mjs --indexed <indexed.csv> --traffic <traffic.csv> --booked <booked.json> --output <dir>",
        );
    }

    const indexedRows = parseCsv(indexedPath);
    const trafficRows = parseCsv(trafficPath);
    const booked = parseBookedRows(bookedPath);

    assertRequiredColumns(indexedRows, ["date", "url", "indexed"], "Indexed CSV");
    assertRequiredColumns(trafficRows, ["date", "url", "clicks", "impressions"], "Traffic CSV");

    const records = new Map();
    const observedDates = new Set();

    for (const row of indexedRows) {
        const dimensions = resolveCanonicalLandingDimensions(row.url);
        const record = getRecord(records, dimensions);
        record.tracked_urls.add(dimensions.landing_url);
        if (parseIndexedFlag(row.indexed)) {
            record.indexed_pages = 1;
        }

        const eventDate = parseEventDate(row.date) ?? parseEventDate(row.occurred_at);
        if (eventDate) {
            observedDates.add(eventDate);
        }
    }

    for (const row of trafficRows) {
        const dimensions = resolveCanonicalLandingDimensions(row.url);
        const record = getRecord(records, dimensions);
        record.tracked_urls.add(dimensions.landing_url);
        record.traffic_clicks += parseNumber(row.clicks);
        record.traffic_impressions += parseNumber(row.impressions);

        const eventDate = parseEventDate(row.date) ?? parseEventDate(row.occurred_at);
        if (eventDate) {
            observedDates.add(eventDate);
        }
    }

    for (const row of booked.rows) {
        if (!row || typeof row !== "object") {
            continue;
        }

        const landingUrl = normalizeUrlPath(row.landing_url ?? "/unknown");
        const dimensions = {
            landing_url: landingUrl,
            cluster: typeof row.cluster === "string" && row.cluster.trim().length > 0
                ? row.cluster.trim()
                : mapUrlToCluster(landingUrl),
            template_type:
                typeof row.template_type === "string" && row.template_type.trim().length > 0
                    ? row.template_type.trim()
                    : resolveCanonicalLandingDimensions(landingUrl).template_type,
        };
        const record = getRecord(records, dimensions);
        record.tracked_urls.add(landingUrl);
        record.booked_calls += parseNumber(row.booked_call_cta_click_count);
        record.booked_call_embed_interactions += parseNumber(
            row.booked_call_embed_interaction_count,
        );
        record.lead_submits_success += parseNumber(row.lead_form_submit_success_count);
        if (typeof row.conversion_key === "string" && row.conversion_key.trim().length > 0) {
            record.conversion_keys.add(row.conversion_key.trim());
        }
    }

    const sortedDates = [...observedDates].sort();
    const weekStart = options["week-start"] ?? sortedDates[0] ?? null;
    const weekEnd = options["week-end"] ?? sortedDates[sortedDates.length - 1] ?? null;

    const rows = [...records.values()]
        .filter((record) => record.tracked_urls.size > 0)
        .map((record) => ({
            cluster: record.cluster,
            template_type: record.template_type,
            landing_url: record.landing_url,
            week_start: weekStart,
            week_end: weekEnd,
            indexed_pages: record.indexed_pages,
            tracked_urls: record.tracked_urls.size,
            traffic_trend: {
                clicks: record.traffic_clicks,
                impressions: record.traffic_impressions,
            },
            booked_calls: record.booked_calls,
            booked_call_embed_interactions: record.booked_call_embed_interactions,
            lead_submits_success: record.lead_submits_success,
            joinable_conversion_keys: record.conversion_keys.size,
        }))
        .sort((left, right) => {
            const byCluster = compareClusterOrder(left.cluster, right.cluster);
            if (byCluster !== 0) {
                return byCluster;
            }

            const byTemplate = left.template_type.localeCompare(right.template_type);
            if (byTemplate !== 0) {
                return byTemplate;
            }

            return left.landing_url.localeCompare(right.landing_url);
        });

    const report = {
        schema_version: schemaVersion,
        generated_at: new Date().toISOString(),
        input_files: {
            indexed: indexedPath,
            traffic: trafficPath,
            booked: bookedPath,
        },
        summary: {
            week_start: weekStart,
            week_end: weekEnd,
            row_count: rows.length,
            normalization: {
                cluster: "mapUrlToCluster",
                template_type: "resolveCanonicalLandingDimensions",
                landing_url: "normalizeUrlPath",
            },
        },
        rows,
    };

    fs.mkdirSync(outputDir, { recursive: true });
    const jsonPath = path.join(outputDir, "weekly-seo-ops-report.json");
    const csvPath = path.join(outputDir, "weekly-seo-ops-report.csv");

    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");
    fs.writeFileSync(csvPath, toCsv(rows), "utf8");

    return { jsonPath, csvPath };
}

function main() {
    const args = parseArgs(process.argv.slice(2));
    const output = exportWeeklySeoOpsReport(args);
    console.log(`Wrote ${output.jsonPath}`);
    console.log(`Wrote ${output.csvPath}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
