#!/usr/bin/env node
import fs from "node:fs";

const REQUIRED_EVENTS = [
    "seo_landing_view",
    "booked_call_cta_click",
    "booked_call_embed_interaction",
];

const REQUIRED_COLUMNS = [
    "event_name",
    "event_timestamp",
    "cluster",
    "template_type",
    "landing_url",
    "conversion_key",
];

const REQUIRED_DIMENSIONS = ["cluster", "template_type", "landing_url"];

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
        throw new Error(`GA4 export file "${filePath}" is empty or missing rows.`);
    }

    const headers = lines[0].split(",").map((value) => value.trim());
    const rows = lines.slice(1).map((line, index) => {
        const values = line.split(",").map((value) => value.trim());
        if (values.length !== headers.length) {
            throw new Error(
                `GA4 CSV column mismatch at row ${index + 2}: expected ${headers.length}, got ${values.length}.`,
            );
        }

        return Object.fromEntries(
            headers.map((header, headerIndex) => [header, values[headerIndex]]),
        );
    });

    return { headers, rows };
}

function run() {
    const args = parseArgs(process.argv.slice(2));
    const inputPath = args.input;

    if (!inputPath) {
        throw new Error(
            "Usage: node scripts/analytics/validate-ga4-readiness.mjs --input <ga4.csv>",
        );
    }

    const { headers, rows } = parseCsv(inputPath);
    const errors = [];

    for (const column of REQUIRED_COLUMNS) {
        if (!headers.includes(column)) {
            errors.push(`Missing required GA4 column: ${column}`);
        }
    }

    const requiredEventsFound = new Set();
    for (const [index, row] of rows.entries()) {
        const rowNumber = index + 2;
        const eventName = row.event_name?.trim();
        const eventTimestamp = row.event_timestamp?.trim();

        if (!eventName) {
            errors.push(`Row ${rowNumber}: missing event_name value.`);
            continue;
        }

        if (!eventTimestamp || Number.isNaN(Date.parse(eventTimestamp))) {
            errors.push(`Row ${rowNumber}: invalid event_timestamp "${row.event_timestamp}".`);
        }

        if (REQUIRED_EVENTS.includes(eventName)) {
            requiredEventsFound.add(eventName);
            for (const dimension of REQUIRED_DIMENSIONS) {
                if (!row[dimension] || row[dimension].trim().length === 0) {
                    errors.push(
                        `Row ${rowNumber}: required dimension "${dimension}" missing for ${eventName}.`,
                    );
                }
            }

            if (!row.conversion_key || row.conversion_key.trim().length === 0) {
                errors.push(
                    `Row ${rowNumber}: required conversion_key missing for ${eventName}.`,
                );
            }
        }
    }

    for (const eventName of REQUIRED_EVENTS) {
        if (!requiredEventsFound.has(eventName)) {
            errors.push(`Required GA4 event not found: ${eventName}`);
        }
    }

    if (errors.length > 0) {
        console.error("GA4 readiness check failed:");
        for (const entry of errors) {
            console.error(`- ${entry}`);
        }
        process.exit(1);
    }

    console.log("GA4 readiness check passed.");
    console.log(`Validated events: ${[...requiredEventsFound].sort().join(", ")}`);
    console.log(`Validated dimensions: ${REQUIRED_DIMENSIONS.join(", ")}`);
}

try {
    run();
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
}

