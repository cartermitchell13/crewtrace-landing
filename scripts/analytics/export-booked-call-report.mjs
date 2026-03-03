#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const REQUIRED_DIMENSIONS = ["cluster", "template_type", "landing_url"];
const TRACKED_EVENT_NAMES = new Set([
    "seo_landing_view",
    "booked_call_cta_click",
    "booked_call_embed_interaction",
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

function normalizeUrlPath(value) {
    if (typeof value !== "string" || value.trim().length === 0) {
        return "/unknown";
    }

    const trimmed = value.trim();
    let pathname = trimmed;
    try {
        pathname = new URL(trimmed).pathname;
    } catch {
        pathname = trimmed.split("?")[0].split("#")[0];
    }

    if (!pathname.startsWith("/")) {
        pathname = `/${pathname}`;
    }

    if (pathname.length > 1 && pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1);
    }

    return pathname.toLowerCase();
}

function inferTemplateType(pathname) {
    if (pathname.startsWith("/features/")) {
        return "feature_detail";
    }
    if (pathname.startsWith("/industries/")) {
        return "industry_detail";
    }
    if (pathname.startsWith("/compare/")) {
        return "competitor_detail";
    }
    if (pathname.startsWith("/guides/")) {
        return "guide_detail";
    }
    if (pathname.startsWith("/case-studies/")) {
        return "case_study_detail";
    }
    if (pathname.startsWith("/blog/")) {
        return "blog_detail";
    }
    if (pathname === "/contact") {
        return "contact";
    }

    return "other";
}

function inferCluster(pathname) {
    if (pathname.startsWith("/features/")) {
        return "features";
    }
    if (pathname.startsWith("/industries/")) {
        return "industries";
    }
    if (pathname.startsWith("/compare/")) {
        return "compare";
    }
    if (pathname.startsWith("/guides/")) {
        return "guides";
    }
    if (pathname.startsWith("/case-studies/")) {
        return "case-studies";
    }
    if (pathname.startsWith("/blog/")) {
        return "blog";
    }

    return "other";
}

function stableHash(input) {
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
        hash ^= input.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0).toString(16).padStart(8, "0");
}

function deriveConversionKey(event, dimensions) {
    if (typeof event.conversion_key === "string" && event.conversion_key.trim().length > 0) {
        return event.conversion_key.trim();
    }

    const material = [
        dimensions.cluster,
        dimensions.template_type,
        dimensions.landing_url,
        normalizeDimension(event.utm_source, "na"),
        normalizeDimension(event.utm_medium, "na"),
        normalizeDimension(event.utm_campaign, "na"),
        normalizeDimension(event.utm_term, "na"),
        normalizeDimension(event.utm_content, "na"),
        normalizeDimension(event.gclid, "na"),
        normalizeDimension(event.fbclid, "na"),
        normalizeDimension(event.msclkid, "na"),
        normalizeDimension(event.ttclid, "na"),
        normalizeDimension(event.li_fat_id, "na"),
    ];

    return `seo-${stableHash(material.join("|").toLowerCase())}`;
}

function createRowSeed(cluster, templateType, landingUrl, conversionKey, firstTouchLandingUrl, firstTouchCluster, firstTouchTemplateType) {
    return {
        cluster,
        template_type: templateType,
        landing_url: landingUrl,
        conversion_key: conversionKey,
        first_touch_landing_url: firstTouchLandingUrl,
        first_touch_cluster: firstTouchCluster,
        first_touch_template_type: firstTouchTemplateType,
        event_count: 0,
        seo_landing_view_count: 0,
        booked_call_cta_click_count: 0,
        booked_call_embed_interaction_count: 0,
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
        booked_call_embed_interaction_count: 0,
        lead_form_submit_attempt_count: 0,
        lead_form_submit_success_count: 0,
        lead_form_submit_failure_count: 0,
        rows_missing_conversion_key: 0,
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

        const landingUrl = normalizeUrlPath(normalizeDimension(event.landing_url, "/unknown"));
        const cluster = normalizeDimension(event.cluster, inferCluster(landingUrl));
        const templateType = normalizeDimension(
            event.template_type,
            inferTemplateType(landingUrl),
        );
        const firstTouchLandingUrl = normalizeUrlPath(
            normalizeDimension(event.first_touch_landing_url, landingUrl),
        );
        const firstTouchCluster = normalizeDimension(
            event.first_touch_cluster,
            inferCluster(firstTouchLandingUrl),
        );
        const firstTouchTemplateType = normalizeDimension(
            event.first_touch_template_type,
            inferTemplateType(firstTouchLandingUrl),
        );
        const conversionKey = deriveConversionKey(event, {
            cluster,
            template_type: templateType,
            landing_url: landingUrl,
        });
        if (
            !event.conversion_key ||
            typeof event.conversion_key !== "string" ||
            event.conversion_key.trim().length === 0
        ) {
            totals.rows_missing_conversion_key += 1;
        }

        const key = `${cluster}::${templateType}::${landingUrl}::${conversionKey}`;

        if (!grouped.has(key)) {
            grouped.set(
                key,
                createRowSeed(
                    cluster,
                    templateType,
                    landingUrl,
                    conversionKey,
                    firstTouchLandingUrl,
                    firstTouchCluster,
                    firstTouchTemplateType,
                ),
            );
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

        if (event.event === "booked_call_embed_interaction") {
            row.booked_call_embed_interaction_count += 1;
            totals.booked_call_embed_interaction_count += 1;
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
        "conversion_key",
        "first_touch_landing_url",
        "first_touch_cluster",
        "first_touch_template_type",
        "event_count",
        "seo_landing_view_count",
        "booked_call_cta_click_count",
        "booked_call_embed_interaction_count",
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
                join_diagnostics: {
                    rows_missing_conversion_key: report.totals.rows_missing_conversion_key,
                    requires_deterministic_key: true,
                },
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
