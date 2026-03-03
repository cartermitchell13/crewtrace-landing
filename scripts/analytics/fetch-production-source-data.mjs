#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
    PRODUCTION_SOURCE_CONTRACTS,
    assertRequiredSources,
    loadAndValidateSource,
} from "./lib/production-source-contracts.mjs";
import {
    buildWeekFreezeMetadata,
    isTimestampInUtcWeek,
    resolveUtcWeekWindow,
} from "./lib/weekly-report-window.mjs";
import {
    mapUrlToCluster,
    normalizeUrlPath,
} from "./lib/weekly-report-cluster-map.mjs";

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

function inferTemplateType(value) {
    const normalized = normalizeUrlPath(value);
    if (normalized.startsWith("/features/")) {
        return "feature_detail";
    }
    if (normalized.startsWith("/industries/")) {
        return "industry_detail";
    }
    if (normalized.startsWith("/compare/")) {
        return "competitor_detail";
    }
    if (normalized.startsWith("/guides/")) {
        return "guide_detail";
    }
    if (normalized.startsWith("/case-studies/")) {
        return "case_study_detail";
    }
    if (normalized.startsWith("/blog/")) {
        return "blog_detail";
    }
    if (normalized === "/contact") {
        return "contact";
    }

    return "other";
}

function toBooleanFlag(value) {
    if (typeof value !== "string") {
        return false;
    }
    const normalized = value.trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "yes";
}

function filterWeekRows(rows, sourceName, weekWindow) {
    const occurrenceField = PRODUCTION_SOURCE_CONTRACTS[sourceName].occurrence_field;
    const filtered = rows.filter((row) =>
        isTimestampInUtcWeek(row[occurrenceField], weekWindow)
    );

    if (filtered.length === 0) {
        throw new Error(
            `${sourceName} has no rows in UTC week ${weekWindow.week_start}..${weekWindow.week_end}.`,
        );
    }

    return filtered;
}

function normalizeIndexedRow(row) {
    const landingUrl = normalizeUrlPath(row.url);
    return {
        date: row.date.slice(0, 10),
        occurred_at: row.date,
        url: row.url,
        landing_url: landingUrl,
        cluster: mapUrlToCluster(landingUrl),
        template_type: inferTemplateType(landingUrl),
        indexed: row.indexed,
    };
}

function normalizeTrafficRow(row) {
    const landingUrl = normalizeUrlPath(row.url);
    return {
        date: row.date.slice(0, 10),
        occurred_at: row.date,
        url: row.url,
        landing_url: landingUrl,
        cluster: mapUrlToCluster(landingUrl),
        template_type: inferTemplateType(landingUrl),
        clicks: row.clicks,
        impressions: row.impressions,
    };
}

function normalizeBookedEventRow(row) {
    const landingUrl = normalizeUrlPath(row.landing_url);
    const firstTouchLandingUrl = normalizeUrlPath(
        row.first_touch_landing_url ?? landingUrl,
    );

    return {
        event: row.event,
        occurred_at: row.occurred_at,
        conversion_key: row.conversion_key,
        landing_url: landingUrl,
        cluster: row.cluster?.trim() || mapUrlToCluster(landingUrl),
        template_type: row.template_type?.trim() || inferTemplateType(landingUrl),
        first_touch_landing_url: firstTouchLandingUrl,
        first_touch_cluster:
            row.first_touch_cluster?.trim() || mapUrlToCluster(firstTouchLandingUrl),
        first_touch_template_type:
            row.first_touch_template_type?.trim() || inferTemplateType(firstTouchLandingUrl),
        cta_label: row.cta_label ?? "",
        cta_location: row.cta_location ?? "",
        utm_source: row.utm_source ?? "",
        utm_medium: row.utm_medium ?? "",
        utm_campaign: row.utm_campaign ?? "",
    };
}

function normalizeGa4Row(row) {
    const landingUrl = normalizeUrlPath(row.landing_url);
    return {
        event_name: row.event_name,
        event_timestamp: row.event_timestamp,
        conversion_key: row.conversion_key,
        landing_url: landingUrl,
        cluster: row.cluster?.trim() || mapUrlToCluster(landingUrl),
        template_type: row.template_type?.trim() || inferTemplateType(landingUrl),
    };
}

function toCsv(headers, rows) {
    const lines = [headers.join(",")];
    for (const row of rows) {
        lines.push(headers.map((header) => String(row[header] ?? "")).join(","));
    }

    return `${lines.join("\n")}\n`;
}

function checkFreezeState(outputDir, freezeMetadata, allowRerun) {
    const freezePath = path.join(outputDir, "weekly-freeze.json");
    if (!fs.existsSync(freezePath) || allowRerun) {
        return freezePath;
    }

    let existing;
    try {
        existing = JSON.parse(fs.readFileSync(freezePath, "utf8"));
    } catch {
        throw new Error(`Freeze metadata is malformed at ${freezePath}.`);
    }

    if (existing.freeze_key === freezeMetadata.freeze_key) {
        throw new Error(
            `Week ${freezeMetadata.week_start}..${freezeMetadata.week_end} is frozen at ${existing.frozen_at}. Use --allow-rerun true to override.`,
        );
    }

    return freezePath;
}

function writeNdjson(filePath, rows) {
    const body = rows.map((row) => JSON.stringify(row)).join("\n");
    fs.writeFileSync(filePath, `${body}\n`, "utf8");
}

export function ingestProductionSourceData(options) {
    const outputDir = options.output;
    if (!outputDir) {
        throw new Error("Missing required --output directory.");
    }

    const weekWindow = resolveUtcWeekWindow({
        week: options.week,
    });

    const sourcePaths = {
        indexed: options.indexed,
        traffic: options.traffic,
        booked_events: options["booked-events"],
    };
    if (options.ga4) {
        sourcePaths.ga4 = options.ga4;
    }

    assertRequiredSources(sourcePaths);

    const indexedRows = filterWeekRows(
        loadAndValidateSource("indexed", sourcePaths.indexed),
        "indexed",
        weekWindow,
    ).map(normalizeIndexedRow);
    const trafficRows = filterWeekRows(
        loadAndValidateSource("traffic", sourcePaths.traffic),
        "traffic",
        weekWindow,
    ).map(normalizeTrafficRow);
    const bookedEventRows = filterWeekRows(
        loadAndValidateSource("booked_events", sourcePaths.booked_events),
        "booked_events",
        weekWindow,
    ).map(normalizeBookedEventRow);

    const ga4Rows = sourcePaths.ga4
        ? filterWeekRows(
            loadAndValidateSource("ga4", sourcePaths.ga4),
            "ga4",
            weekWindow,
        ).map(normalizeGa4Row)
        : [];

    fs.mkdirSync(outputDir, { recursive: true });

    const freezeMetadata = buildWeekFreezeMetadata(weekWindow);
    const freezePath = checkFreezeState(
        outputDir,
        freezeMetadata,
        toBooleanFlag(options["allow-rerun"]),
    );

    const indexedOutputPath = path.join(outputDir, "production-indexed.weekly.csv");
    const trafficOutputPath = path.join(outputDir, "production-traffic.weekly.csv");
    const bookedEventsOutputPath = path.join(
        outputDir,
        "production-booked-events.weekly.ndjson",
    );
    const ga4OutputPath = path.join(outputDir, "production-ga4.weekly.csv");
    const summaryOutputPath = path.join(outputDir, "production-ingestion-summary.json");

    fs.writeFileSync(
        indexedOutputPath,
        toCsv(
            ["date", "occurred_at", "url", "landing_url", "cluster", "template_type", "indexed"],
            indexedRows,
        ),
        "utf8",
    );
    fs.writeFileSync(
        trafficOutputPath,
        toCsv(
            [
                "date",
                "occurred_at",
                "url",
                "landing_url",
                "cluster",
                "template_type",
                "clicks",
                "impressions",
            ],
            trafficRows,
        ),
        "utf8",
    );
    writeNdjson(bookedEventsOutputPath, bookedEventRows);

    if (ga4Rows.length > 0) {
        fs.writeFileSync(
            ga4OutputPath,
            toCsv(
                [
                    "event_name",
                    "event_timestamp",
                    "conversion_key",
                    "landing_url",
                    "cluster",
                    "template_type",
                ],
                ga4Rows,
            ),
            "utf8",
        );
    }

    fs.writeFileSync(freezePath, JSON.stringify(freezeMetadata, null, 2), "utf8");
    fs.writeFileSync(
        summaryOutputPath,
        JSON.stringify(
            {
                schema_version: "1.0.0",
                generated_at: new Date().toISOString(),
                source_inputs: sourcePaths,
                week: {
                    week_start: weekWindow.week_start,
                    week_end: weekWindow.week_end,
                    range_start_utc_iso: weekWindow.range_start_utc_iso,
                    range_end_utc_iso: weekWindow.range_end_utc_iso,
                },
                freeze: freezeMetadata,
                rows: {
                    indexed: indexedRows.length,
                    traffic: trafficRows.length,
                    booked_events: bookedEventRows.length,
                    ga4: ga4Rows.length,
                },
                outputs: {
                    indexed: indexedOutputPath,
                    traffic: trafficOutputPath,
                    booked_events: bookedEventsOutputPath,
                    ga4: ga4Rows.length > 0 ? ga4OutputPath : null,
                },
            },
            null,
            2,
        ),
        "utf8",
    );

    return {
        week: weekWindow,
        rows: {
            indexed: indexedRows.length,
            traffic: trafficRows.length,
            booked_events: bookedEventRows.length,
            ga4: ga4Rows.length,
        },
        outputs: {
            indexed: indexedOutputPath,
            traffic: trafficOutputPath,
            booked_events: bookedEventsOutputPath,
            ga4: ga4Rows.length > 0 ? ga4OutputPath : null,
            summary: summaryOutputPath,
        },
    };
}

function main() {
    const args = parseArgs(process.argv.slice(2));
    const result = ingestProductionSourceData(args);
    console.log(
        `Validated production ingestion for ${result.week.week_start}..${result.week.week_end}`,
    );
    console.log(`Rows: ${JSON.stringify(result.rows)}`);
    console.log(`Wrote ${result.outputs.summary}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
