#!/usr/bin/env node
import {
    assertRequiredSources,
    loadAndValidateSource,
} from "../analytics/lib/production-source-contracts.mjs";
import {
    isTimestampInUtcWeek,
    resolveUtcWeekWindow,
} from "../analytics/lib/weekly-report-window.mjs";

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

function assertWeekCoverage(rows, sourceName, timestampField, weekWindow) {
    const rowsInWeek = rows.filter((row) =>
        isTimestampInUtcWeek(row[timestampField], weekWindow)
    );

    if (rowsInWeek.length === 0) {
        throw new Error(
            `${sourceName} has zero rows in UTC week ${weekWindow.week_start}..${weekWindow.week_end}.`,
        );
    }

    return rowsInWeek.length;
}

function run() {
    const args = parseArgs(process.argv.slice(2));
    const sourcePaths = {
        indexed: args.indexed,
        traffic: args.traffic,
        booked_events: args["booked-events"],
    };

    assertRequiredSources(sourcePaths);

    const weekWindow = resolveUtcWeekWindow({ week: args.week });
    const indexedRows = loadAndValidateSource("indexed", sourcePaths.indexed);
    const trafficRows = loadAndValidateSource("traffic", sourcePaths.traffic);
    const bookedRows = loadAndValidateSource("booked_events", sourcePaths.booked_events);

    const indexedInWeek = assertWeekCoverage(indexedRows, "indexed", "date", weekWindow);
    const trafficInWeek = assertWeekCoverage(trafficRows, "traffic", "date", weekWindow);
    const bookedInWeek = assertWeekCoverage(
        bookedRows,
        "booked_events",
        "occurred_at",
        weekWindow,
    );

    console.log(
        `Production ingestion contract passed for ${weekWindow.week_start}..${weekWindow.week_end}`,
    );
    console.log(`- indexed: ${indexedInWeek} rows in week`);
    console.log(`- traffic: ${trafficInWeek} rows in week`);
    console.log(`- booked_events: ${bookedInWeek} rows in week`);
}

try {
    run();
} catch (error) {
    console.error("Production ingestion contract check failed.");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
}

