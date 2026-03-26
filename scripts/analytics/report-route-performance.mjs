#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import {
    normalizeUrlPath,
    resolveCanonicalLandingDimensions,
} from "./lib/weekly-report-cluster-map.mjs"

function parseArgs(argv) {
    const args = {}

    for (let index = 0; index < argv.length; index += 1) {
        const token = argv[index]
        if (!token.startsWith("--")) {
            continue
        }

        const key = token.slice(2)
        const value = argv[index + 1]
        if (!value || value.startsWith("--")) {
            args[key] = "true"
            continue
        }

        args[key] = value
        index += 1
    }

    return args
}

function readWeeklyReport(inputPath) {
    const resolvedPath = path.resolve(process.cwd(), inputPath)
    if (!fs.existsSync(resolvedPath)) {
        throw new Error(`Weekly report not found: ${inputPath}`)
    }

    const parsed = JSON.parse(fs.readFileSync(resolvedPath, "utf8"))
    if (!Array.isArray(parsed.rows)) {
        throw new Error("Weekly report JSON must include a rows array.")
    }

    return parsed
}

function toCtr(clicks, impressions) {
    if (impressions <= 0) {
        return 0
    }

    return Number(((clicks / impressions) * 100).toFixed(2))
}

function formatText(summary) {
    const lines = []
    lines.push(`Route performance for ${summary.route}`)
    lines.push(`Week: ${summary.week_start ?? "unknown"}..${summary.week_end ?? "unknown"}`)
    lines.push(`Cluster: ${summary.cluster}`)
    lines.push(`Template type: ${summary.template_type}`)
    lines.push(`Indexed pages: ${summary.indexed_pages}`)
    lines.push(`Tracked URLs: ${summary.tracked_urls}`)
    lines.push(`Clicks: ${summary.clicks}`)
    lines.push(`Impressions: ${summary.impressions}`)
    lines.push(`CTR: ${summary.ctr_percent}%`)
    lines.push(`Booked calls: ${summary.booked_calls}`)
    lines.push(`Booked call embed interactions: ${summary.booked_call_embed_interactions}`)
    lines.push(`Lead form submits: ${summary.lead_submits_success}`)
    lines.push(`Joinable conversion keys: ${summary.joinable_conversion_keys}`)
    return `${lines.join("\n")}\n`
}

function buildRouteSummary(report, route) {
    const normalizedRoute = normalizeUrlPath(route)
    const matchedRow = report.rows.find((row) => normalizeUrlPath(row.landing_url) === normalizedRoute)
    if (!matchedRow) {
        const inferred = resolveCanonicalLandingDimensions(normalizedRoute)
        throw new Error(
            `No performance row found for ${normalizedRoute}. Expected cluster=${inferred.cluster} template_type=${inferred.template_type}.`
        )
    }

    const clicks = Number(matchedRow.traffic_trend?.clicks ?? 0)
    const impressions = Number(matchedRow.traffic_trend?.impressions ?? 0)

    return {
        route: normalizeUrlPath(matchedRow.landing_url),
        week_start: matchedRow.week_start ?? report.summary?.week_start ?? null,
        week_end: matchedRow.week_end ?? report.summary?.week_end ?? null,
        cluster: matchedRow.cluster,
        template_type: matchedRow.template_type,
        indexed_pages: Number(matchedRow.indexed_pages ?? 0),
        tracked_urls: Number(matchedRow.tracked_urls ?? 0),
        clicks,
        impressions,
        ctr_percent: toCtr(clicks, impressions),
        booked_calls: Number(matchedRow.booked_calls ?? 0),
        booked_call_embed_interactions: Number(matchedRow.booked_call_embed_interactions ?? 0),
        lead_submits_success: Number(matchedRow.lead_submits_success ?? 0),
        joinable_conversion_keys: Number(matchedRow.joinable_conversion_keys ?? 0),
    }
}

function main() {
    const args = parseArgs(process.argv.slice(2))
    if (!args.input || !args.route) {
        throw new Error(
            "Usage: node scripts/analytics/report-route-performance.mjs --input <weekly-seo-ops-report.json> --route </blog/slug> [--format text|json]"
        )
    }

    const report = readWeeklyReport(args.input)
    const summary = buildRouteSummary(report, args.route)
    const format = args.format === "json" ? "json" : "text"

    if (format === "json") {
        console.log(JSON.stringify(summary, null, 2))
        return
    }

    process.stdout.write(formatText(summary))
}

try {
    main()
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
}
