#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const REQUIRED_DIMENSIONS = ["cluster", "template_type", "landing_url"];
const TRACKED_EVENT_NAMES = new Set([
    "seo_landing_view",
    "booked_call_cta_click",
    "lead_form_submit_attempt",
    "lead_form_submit_success",
    "lead_form_submit_failure",
]);

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

function readNdjson(filePath) {
    const source = fs.readFileSync(filePath, "utf8");
    const lines = source
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    return lines.map((line, lineNumber) => {
        try {
            return JSON.parse(line);
        } catch (error) {
            throw new Error(
                `Invalid NDJSON at line ${lineNumber + 1}: ${error.message}`,
            );
        }
    });
}

function toEventPayload(entry) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        return null;
    }

    if (entry.event && typeof entry.event === "object" && !Array.isArray(entry.event)) {
        return entry.event;
    }

    return entry;
}

function normalizeDimension(value, fallback) {
    if (typeof value !== "string") {
        return fallback;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : fallback;
}

function createRowSeed(cluster, templateType, landingUrl) {
    return {
        cluster,
        template_type: templateType,
        landing_url: landingUrl,
        event_count: 0,
        seo_landing_view_count: 0,
        booked_call_cta_click_count: 0,
        lead_form_submit_attempt_count: 0,
        lead_form_submit_success_count: 0,
        lead_form_submit_failure_count: 0,
        booked_call_to_lead_success_rate: 0,
    };
}

function aggregateEvents(events) {
    const grouped = new Map();
    const totals = {
        event_count: 0,
        seo_landing_view_count: 0,
        booked_call_cta_click_count: 0,
        lead_form_submit_attempt_count: 0,
        lead_form_submit_success_count: 0,
        lead_form_submit_failure_count: 0,
    };
    const timestamps = [];

    for (const entry of events) {
        const event = toEventPayload(entry);
        if (!event || typeof event.event !== "string") {
            continue;
        }

        if (!TRACKED_EVENT_NAMES.has(event.event)) {
            continue;
        }

        const cluster = normalizeDimension(event.cluster, "unknown");
        const templateType = normalizeDimension(event.template_type, "unknown");
        const landingUrl = normalizeDimension(event.landing_url, "/unknown");
        const key = `${cluster}::${templateType}::${landingUrl}`;

        if (!grouped.has(key)) {
            grouped.set(key, createRowSeed(cluster, templateType, landingUrl));
        }

        const row = grouped.get(key);
        row.event_count += 1;
        totals.event_count += 1;

        if (event.event === "seo_landing_view") {
            row.seo_landing_view_count += 1;
            totals.seo_landing_view_count += 1;
        }

        if (event.event === "booked_call_cta_click") {
            row.booked_call_cta_click_count += 1;
            totals.booked_call_cta_click_count += 1;
        }

        if (event.event === "lead_form_submit_attempt") {
            row.lead_form_submit_attempt_count += 1;
            totals.lead_form_submit_attempt_count += 1;
        }

        if (event.event === "lead_form_submit_success") {
            row.lead_form_submit_success_count += 1;
            totals.lead_form_submit_success_count += 1;
        }

        if (event.event === "lead_form_submit_failure") {
            row.lead_form_submit_failure_count += 1;
            totals.lead_form_submit_failure_count += 1;
        }

        if (typeof event.occurred_at === "string" && event.occurred_at.trim().length > 0) {
            timestamps.push(event.occurred_at.trim());
        }
    }

    const rows = [...grouped.values()]
        .map((row) => ({
            ...row,
            booked_call_to_lead_success_rate: row.booked_call_cta_click_count
                ? Number(
                    (
                        row.lead_form_submit_success_count /
                        row.booked_call_cta_click_count
                    ).toFixed(4),
                )
                : 0,
        }))
        .sort((left, right) => {
            const byCluster = left.cluster.localeCompare(right.cluster);
            if (byCluster !== 0) {
                return byCluster;
            }

            const byTemplate = left.template_type.localeCompare(right.template_type);
            if (byTemplate !== 0) {
                return byTemplate;
            }

            return left.landing_url.localeCompare(right.landing_url);
        });

    const generatedAt = timestamps.sort()[timestamps.length - 1] ?? null;
    return { rows, totals, generatedAt };
}

function toCsv(rows) {
    const header = [
        ...REQUIRED_DIMENSIONS,
        "event_count",
        "seo_landing_view_count",
        "booked_call_cta_click_count",
        "lead_form_submit_attempt_count",
        "lead_form_submit_success_count",
        "lead_form_submit_failure_count",
        "booked_call_to_lead_success_rate",
    ];

    const lines = [header.join(",")];
    for (const row of rows) {
        const values = header.map((key) => String(row[key] ?? ""));
        lines.push(values.join(","));
    }

    return `${lines.join("\n")}\n`;
}

function main() {
    const args = parseArgs(process.argv.slice(2));
    const inputPath = args.input;
    const outputDir = args.output;

    if (!inputPath || !outputDir) {
        console.error(
            "Usage: node scripts/analytics/export-booked-call-report.mjs --input <events.ndjson> --output <dir>",
        );
        process.exit(1);
    }

    const events = readNdjson(inputPath);
    const report = aggregateEvents(events);

    fs.mkdirSync(outputDir, { recursive: true });

    const jsonPath = path.join(outputDir, "booked-call-report.json");
    const csvPath = path.join(outputDir, "booked-call-report.csv");

    fs.writeFileSync(
        jsonPath,
        JSON.stringify(
            {
                generated_at: report.generatedAt,
                input_file: inputPath,
                dimensions: REQUIRED_DIMENSIONS,
                totals: report.totals,
                rows: report.rows,
            },
            null,
            2,
        ),
        "utf8",
    );
    fs.writeFileSync(csvPath, toCsv(report.rows), "utf8");

    console.log(`Wrote ${jsonPath}`);
    console.log(`Wrote ${csvPath}`);
}

main();
