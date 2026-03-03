#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
    mapUrlToCluster,
    normalizeUrlPath,
    orderedWeeklyClusters,
} from "./lib/weekly-report-cluster-map.mjs";

const schemaVersion = "1.0.0";

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

function createClusterSeed(cluster) {
    return {
        cluster,
        indexed_pages: 0,
        tracked_urls: new Set(),
        traffic_clicks: 0,
        traffic_impressions: 0,
        booked_calls: 0,
        lead_submits_success: 0,
    };
}

function getClusterRecord(records, cluster) {
    if (!records.has(cluster)) {
        records.set(cluster, createClusterSeed(cluster));
    }
    return records.get(cluster);
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
        "week_start",
        "week_end",
        "indexed_pages",
        "tracked_urls",
        "traffic_trend_clicks",
        "traffic_trend_impressions",
        "booked_calls",
        "lead_submits_success",
    ];

    const lines = [headers.join(",")];
    for (const row of rows) {
        lines.push(
            [
                row.cluster,
                row.week_start,
                row.week_end,
                row.indexed_pages,
                row.tracked_urls,
                row.traffic_trend.clicks,
                row.traffic_trend.impressions,
                row.booked_calls,
                row.lead_submits_success,
            ].join(","),
        );
    }

    return `${lines.join("\n")}\n`;
}

function main() {
    const args = parseArgs(process.argv.slice(2));
    const indexedPath = args.indexed;
    const trafficPath = args.traffic;
    const bookedPath = args.booked;
    const outputDir = args.output;

    if (!indexedPath || !trafficPath || !bookedPath || !outputDir) {
        console.error(
            "Usage: node scripts/analytics/export-weekly-seo-ops-report.mjs --indexed <indexed.csv> --traffic <traffic.csv> --booked <booked.json> --output <dir>",
        );
        process.exit(1);
    }

    const indexedRows = parseCsv(indexedPath);
    const trafficRows = parseCsv(trafficPath);
    const booked = parseBookedRows(bookedPath);

    assertRequiredColumns(indexedRows, ["date", "url", "indexed"], "Indexed CSV");
    assertRequiredColumns(trafficRows, ["date", "url", "clicks", "impressions"], "Traffic CSV");

    const clusterRecords = new Map();
    const observedDates = new Set();

    for (const row of indexedRows) {
        const cluster = mapUrlToCluster(row.url);
        const record = getClusterRecord(clusterRecords, cluster);
        const normalizedPath = normalizeUrlPath(row.url);
        record.tracked_urls.add(normalizedPath);
        if (parseIndexedFlag(row.indexed)) {
            record.indexed_pages += 1;
        }
        if (row.date) {
            observedDates.add(row.date);
        }
    }

    for (const row of trafficRows) {
        const cluster = mapUrlToCluster(row.url);
        const record = getClusterRecord(clusterRecords, cluster);
        const normalizedPath = normalizeUrlPath(row.url);
        record.tracked_urls.add(normalizedPath);
        record.traffic_clicks += parseNumber(row.clicks);
        record.traffic_impressions += parseNumber(row.impressions);
        if (row.date) {
            observedDates.add(row.date);
        }
    }

    for (const row of booked.rows) {
        if (!row || typeof row !== "object") {
            continue;
        }

        const url = typeof row.landing_url === "string" ? row.landing_url : "/unknown";
        const mappedCluster = mapUrlToCluster(url);
        const rowCluster = typeof row.cluster === "string" && row.cluster.trim().length > 0
            ? row.cluster.trim()
            : mappedCluster;
        const cluster = orderedWeeklyClusters.includes(rowCluster) ? rowCluster : mappedCluster;
        const record = getClusterRecord(clusterRecords, cluster);
        const normalizedPath = normalizeUrlPath(url);
        record.tracked_urls.add(normalizedPath);
        record.booked_calls += parseNumber(row.booked_call_cta_click_count);
        record.lead_submits_success += parseNumber(row.lead_form_submit_success_count);
    }

    const sortedDates = [...observedDates].sort();
    const weekStart = sortedDates[0] ?? null;
    const weekEnd = sortedDates[sortedDates.length - 1] ?? null;

    const rows = [...clusterRecords.values()]
        .filter((record) => record.tracked_urls.size > 0)
        .map((record) => ({
            cluster: record.cluster,
            week_start: weekStart,
            week_end: weekEnd,
            indexed_pages: record.indexed_pages,
            tracked_urls: record.tracked_urls.size,
            traffic_trend: {
                clicks: record.traffic_clicks,
                impressions: record.traffic_impressions,
            },
            booked_calls: record.booked_calls,
            lead_submits_success: record.lead_submits_success,
        }))
        .sort((left, right) => {
            const leftIndex = orderedWeeklyClusters.indexOf(left.cluster);
            const rightIndex = orderedWeeklyClusters.indexOf(right.cluster);
            return leftIndex - rightIndex;
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
            cluster_count: rows.length,
        },
        rows,
    };

    fs.mkdirSync(outputDir, { recursive: true });
    const jsonPath = path.join(outputDir, "weekly-seo-ops-report.json");
    const csvPath = path.join(outputDir, "weekly-seo-ops-report.csv");

    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), "utf8");
    fs.writeFileSync(csvPath, toCsv(rows), "utf8");

    console.log(`Wrote ${jsonPath}`);
    console.log(`Wrote ${csvPath}`);
}

main();

