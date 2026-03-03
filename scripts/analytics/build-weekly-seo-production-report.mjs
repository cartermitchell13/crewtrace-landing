#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { resolveUtcWeekWindow } from "./lib/weekly-report-window.mjs";

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

function runNodeScript(relativeScriptPath, scriptArgs) {
    const scriptPath = path.join(process.cwd(), relativeScriptPath);
    const result = spawnSync(process.execPath, [scriptPath, ...scriptArgs], {
        encoding: "utf8",
    });

    if (result.status !== 0) {
        const output = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
        throw new Error(
            `Command failed: node ${relativeScriptPath} ${scriptArgs.join(" ")}\n${output}`,
        );
    }

    return result.stdout.trim();
}

function run() {
    const args = parseArgs(process.argv.slice(2));
    const outputDir = args.output;
    if (!outputDir) {
        throw new Error(
            "Usage: node scripts/analytics/build-weekly-seo-production-report.mjs --indexed <indexed.csv> --traffic <traffic.csv> --booked-events <booked.ndjson> --ga4 <ga4.csv> --output <dir> [--week YYYY-MM-DD]",
        );
    }

    if (!args.indexed || !args.traffic || !args["booked-events"]) {
        throw new Error(
            "Missing required source paths: --indexed, --traffic, and --booked-events are required.",
        );
    }

    const weekWindow = resolveUtcWeekWindow({ week: args.week });
    const ingestionDir = path.join(outputDir, "ingestion");
    const bookedDir = path.join(outputDir, "booked");
    const summaryPath = path.join(outputDir, "production-pipeline-summary.json");

    fs.mkdirSync(outputDir, { recursive: true });

    if (args.ga4) {
        runNodeScript("scripts/analytics/validate-ga4-readiness.mjs", [
            "--input",
            args.ga4,
        ]);
    }

    runNodeScript("scripts/analytics/fetch-production-source-data.mjs", [
        "--week",
        weekWindow.week_start,
        "--indexed",
        args.indexed,
        "--traffic",
        args.traffic,
        "--booked-events",
        args["booked-events"],
        ...(args.ga4 ? ["--ga4", args.ga4] : []),
        "--output",
        ingestionDir,
    ]);

    const ingestedBookedPath = path.join(ingestionDir, "production-booked-events.weekly.ndjson");
    const ingestedIndexedPath = path.join(ingestionDir, "production-indexed.weekly.csv");
    const ingestedTrafficPath = path.join(ingestionDir, "production-traffic.weekly.csv");

    runNodeScript("scripts/analytics/export-booked-call-report.mjs", [
        "--input",
        ingestedBookedPath,
        "--output",
        bookedDir,
    ]);

    const bookedReportPath = path.join(bookedDir, "booked-call-report.json");
    runNodeScript("scripts/analytics/export-weekly-seo-ops-report.mjs", [
        "--indexed",
        ingestedIndexedPath,
        "--traffic",
        ingestedTrafficPath,
        "--booked",
        bookedReportPath,
        "--week-start",
        weekWindow.week_start,
        "--week-end",
        weekWindow.week_end,
        "--output",
        outputDir,
    ]);

    fs.writeFileSync(
        summaryPath,
        JSON.stringify(
            {
                schema_version: "1.0.0",
                generated_at: new Date().toISOString(),
                week: {
                    week_start: weekWindow.week_start,
                    week_end: weekWindow.week_end,
                },
                inputs: {
                    indexed: args.indexed,
                    traffic: args.traffic,
                    booked_events: args["booked-events"],
                    ga4: args.ga4 ?? null,
                },
                outputs: {
                    ingestion: ingestionDir,
                    booked_report: bookedDir,
                    weekly_report_json: path.join(outputDir, "weekly-seo-ops-report.json"),
                    weekly_report_csv: path.join(outputDir, "weekly-seo-ops-report.csv"),
                },
            },
            null,
            2,
        ),
        "utf8",
    );

    console.log(
        `Built weekly production SEO report for ${weekWindow.week_start}..${weekWindow.week_end}`,
    );
    console.log(`Wrote ${summaryPath}`);
}

try {
    run();
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
}

