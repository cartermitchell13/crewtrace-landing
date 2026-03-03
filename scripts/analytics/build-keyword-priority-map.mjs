#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const TEMPLATE_TARGETS = [
    {
        route: "/",
        template_type: "home",
        cluster: "features",
        action_type: "update",
        owner: "growth-content",
        status: "ready",
        weight: 1.35,
        rationale_hint: "homepage revenue intent and highest entry visibility",
    },
    {
        route: "/features",
        template_type: "features_hub",
        cluster: "features",
        action_type: "update",
        owner: "growth-content",
        status: "ready",
        weight: 1.25,
        rationale_hint: "hub route for feature-intent discovery and depth links",
    },
    {
        route: "/industries",
        template_type: "industries_hub",
        cluster: "industries",
        action_type: "update",
        owner: "growth-content",
        status: "ready",
        weight: 1.25,
        rationale_hint: "industry intent consolidation and trade-specific paths",
    },
    {
        route: "/features/[slug]",
        template_type: "feature_detail",
        cluster: "features",
        action_type: "cta-test",
        owner: "growth-content",
        status: "queued",
        weight: 1.18,
        rationale_hint: "high-intent feature detail conversion moments",
    },
    {
        route: "/industries/[slug]",
        template_type: "industry_detail",
        cluster: "industries",
        action_type: "cta-test",
        owner: "growth-content",
        status: "queued",
        weight: 1.16,
        rationale_hint: "trade-specific pages with direct booked-call intent",
    },
    {
        route: "/compare",
        template_type: "compare_hub",
        cluster: "compare",
        action_type: "update",
        owner: "seo-ops",
        status: "queued",
        weight: 1.12,
        rationale_hint: "competitive-intent overview and decision framing",
    },
    {
        route: "/compare/[slug]",
        template_type: "compare_detail",
        cluster: "compare",
        action_type: "link-fix",
        owner: "seo-ops",
        status: "queued",
        weight: 1.08,
        rationale_hint: "proof-link routing for comparison decision support",
    },
    {
        route: "/contact",
        template_type: "contact",
        cluster: "features",
        action_type: "cta-test",
        owner: "revops",
        status: "queued",
        weight: 1.1,
        rationale_hint: "booked-call conversion handoff from content templates",
    },
];

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

function parseCsv(input) {
    const lines = input
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length < 2) {
        throw new Error("CSV input must include a header row and at least one data row.");
    }

    const headers = lines[0].split(",").map((header) => header.trim());
    return lines.slice(1).map((line) => {
        const values = line.split(",").map((value) => value.trim());
        const row = {};
        for (let index = 0; index < headers.length; index += 1) {
            row[headers[index]] = values[index] ?? "";
        }

        return {
            cluster: row.cluster,
            week_start: row.week_start,
            week_end: row.week_end,
            indexed_pages: Number(row.indexed_pages ?? 0),
            tracked_urls: Number(row.tracked_urls ?? 0),
            traffic_trend: {
                clicks: Number(row.traffic_trend_clicks ?? 0),
                impressions: Number(row.traffic_trend_impressions ?? 0),
            },
            booked_calls: Number(row.booked_calls ?? 0),
            lead_submits_success: Number(row.lead_submits_success ?? 0),
        };
    });
}

function normalizeRows(inputPath) {
    const source = fs.readFileSync(inputPath, "utf8");
    if (inputPath.toLowerCase().endsWith(".json")) {
        const parsed = JSON.parse(source);
        if (!Array.isArray(parsed.rows)) {
            throw new Error("JSON input must contain a rows[] array.");
        }
        return parsed.rows;
    }

    if (inputPath.toLowerCase().endsWith(".csv")) {
        return parseCsv(source);
    }

    throw new Error("Input must be a .json or .csv weekly SEO report artifact.");
}

function toClusterLookup(rows) {
    return new Map(
        rows.map((row) => [
            row.cluster,
            {
                cluster: row.cluster,
                week_start: row.week_start,
                week_end: row.week_end,
                indexed_pages: Number(row.indexed_pages ?? 0),
                tracked_urls: Number(row.tracked_urls ?? 0),
                clicks: Number(row.traffic_trend?.clicks ?? 0),
                impressions: Number(row.traffic_trend?.impressions ?? 0),
                booked_calls: Number(row.booked_calls ?? 0),
                lead_submits_success: Number(row.lead_submits_success ?? 0),
            },
        ]),
    );
}

function toOpportunityScore(target, metrics) {
    const clicks = metrics?.clicks ?? 0;
    const impressions = metrics?.impressions ?? 0;
    const bookedCalls = metrics?.booked_calls ?? 0;
    const leads = metrics?.lead_submits_success ?? 0;
    const trackedUrls = Math.max(1, metrics?.tracked_urls ?? 1);
    const indexedPages = metrics?.indexed_pages ?? 0;

    const ctr = impressions > 0 ? clicks / impressions : 0;
    const indexCoverage = indexedPages / trackedUrls;
    const visibilityGap = Math.max(0, 1 - ctr);
    const coverageGap = Math.max(0, 1 - indexCoverage);

    const baseImpact = impressions * 0.35 + clicks * 2 + bookedCalls * 11 + leads * 6;
    const weighted =
        baseImpact *
        (1 + visibilityGap * 0.4 + coverageGap * 0.25) *
        target.weight;

    return Number(weighted.toFixed(2));
}

function toRationale(target, metrics, score) {
    const clicks = metrics?.clicks ?? 0;
    const impressions = metrics?.impressions ?? 0;
    const bookedCalls = metrics?.booked_calls ?? 0;
    const trackedUrls = Math.max(1, metrics?.tracked_urls ?? 1);
    const indexedPages = metrics?.indexed_pages ?? 0;
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

    return `${target.rationale_hint}; cluster=${target.cluster}, opportunity_score=${score}, ctr=${ctr.toFixed(
        2,
    )}%, index_coverage=${indexedPages}/${trackedUrls}, booked_calls=${bookedCalls}`;
}

function buildPriorityMap(rows) {
    const clusterLookup = toClusterLookup(rows);

    const queue = TEMPLATE_TARGETS.map((target) => {
        const metrics = clusterLookup.get(target.cluster);
        const opportunityScore = toOpportunityScore(target, metrics);
        const weekStart = metrics?.week_start ?? null;
        const weekEnd = metrics?.week_end ?? null;

        return {
            route: target.route,
            template_type: target.template_type,
            cluster: target.cluster,
            week_start: weekStart,
            week_end: weekEnd,
            opportunity_score: opportunityScore,
            action_type: target.action_type,
            owner: target.owner,
            status: target.status,
            rationale: toRationale(target, metrics, opportunityScore),
        };
    })
        .sort((left, right) => {
            if (right.opportunity_score !== left.opportunity_score) {
                return right.opportunity_score - left.opportunity_score;
            }
            return left.route.localeCompare(right.route);
        })
        .map((entry, index) => ({ rank: index + 1, ...entry }));

    return {
        schema_version: "1.0.0",
        generated_at: new Date().toISOString(),
        total_items: queue.length,
        rows: queue,
    };
}

function run() {
    const args = parseArgs(process.argv.slice(2));
    const inputPath = args.input;
    const outputPath = args.output;

    if (!inputPath || !outputPath) {
        throw new Error(
            "Usage: node scripts/analytics/build-keyword-priority-map.mjs --input <weekly-report.{json|csv}> --output <priority-map.json>",
        );
    }

    const absoluteInput = path.resolve(process.cwd(), inputPath);
    const absoluteOutput = path.resolve(process.cwd(), outputPath);

    if (!fs.existsSync(absoluteInput)) {
        throw new Error(`Input report not found: ${inputPath}`);
    }

    const rows = normalizeRows(absoluteInput);
    if (!Array.isArray(rows) || rows.length === 0) {
        throw new Error("No report rows found in input.");
    }

    const priorityMap = buildPriorityMap(rows);
    fs.mkdirSync(path.dirname(absoluteOutput), { recursive: true });
    fs.writeFileSync(absoluteOutput, JSON.stringify(priorityMap, null, 2), "utf8");

    console.log(`Generated priority map with ${priorityMap.rows.length} rows.`);
    console.log(`Wrote ${absoluteOutput}`);
}

try {
    run();
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
}
