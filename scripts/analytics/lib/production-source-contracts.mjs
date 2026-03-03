import fs from "node:fs";

export const PRODUCTION_SOURCE_CONTRACTS = {
    indexed: {
        label: "search-console-indexed",
        format: "csv",
        required: true,
        occurrence_field: "date",
        required_fields: ["date", "url", "indexed"],
    },
    traffic: {
        label: "search-console-traffic",
        format: "csv",
        required: true,
        occurrence_field: "date",
        required_fields: ["date", "url", "clicks", "impressions"],
    },
    booked_events: {
        label: "booked-call-events",
        format: "ndjson",
        required: true,
        occurrence_field: "occurred_at",
        required_fields: [
            "event",
            "occurred_at",
            "cluster",
            "template_type",
            "landing_url",
            "conversion_key",
        ],
    },
    ga4: {
        label: "ga4-events",
        format: "csv",
        required: false,
        occurrence_field: "event_timestamp",
        required_fields: [
            "event_name",
            "event_timestamp",
            "cluster",
            "template_type",
            "landing_url",
            "conversion_key",
        ],
    },
};

function splitCsvLine(line) {
    return line.split(",").map((value) => value.trim());
}

export function parseCsvFile(filePath) {
    const source = fs.readFileSync(filePath, "utf8");
    const lines = source
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length < 2) {
        throw new Error(`CSV file "${filePath}" is missing required rows.`);
    }

    const headers = splitCsvLine(lines[0]);
    const rows = lines.slice(1).map((line, index) => {
        const values = splitCsvLine(line);
        if (values.length !== headers.length) {
            throw new Error(
                `CSV file "${filePath}" has a column mismatch on row ${index + 2}: expected ${headers.length}, got ${values.length}.`,
            );
        }

        return Object.fromEntries(
            headers.map((header, headerIndex) => [header, values[headerIndex]]),
        );
    });

    return { headers, rows };
}

export function parseNdjsonFile(filePath) {
    const source = fs.readFileSync(filePath, "utf8");
    const lines = source
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length === 0) {
        throw new Error(`NDJSON file "${filePath}" is missing required rows.`);
    }

    return lines.map((line, index) => {
        try {
            return JSON.parse(line);
        } catch (error) {
            throw new Error(
                `NDJSON file "${filePath}" has malformed JSON on row ${index + 1}: ${error.message}`,
            );
        }
    });
}

function asStringOrNull(value) {
    if (typeof value !== "string") {
        return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
}

function normalizeTimestamp(value, sourceName, rowNumber, fieldName) {
    const normalized = asStringOrNull(value);
    if (!normalized) {
        throw new Error(
            `${sourceName} row ${rowNumber} is missing required timestamp field "${fieldName}".`,
        );
    }

    const parsed = Date.parse(normalized);
    if (Number.isNaN(parsed)) {
        throw new Error(
            `${sourceName} row ${rowNumber} has an invalid "${fieldName}" timestamp: "${normalized}".`,
        );
    }

    return new Date(parsed).toISOString();
}

export function assertRequiredSources(pathsBySource) {
    const missing = [];

    for (const [sourceName, contract] of Object.entries(PRODUCTION_SOURCE_CONTRACTS)) {
        if (!contract.required) {
            continue;
        }

        const candidate = pathsBySource[sourceName];
        if (typeof candidate !== "string" || candidate.trim().length === 0) {
            missing.push(`${sourceName} (${contract.label})`);
            continue;
        }

        if (!fs.existsSync(candidate)) {
            missing.push(`${sourceName} (${candidate})`);
        }
    }

    if (missing.length > 0) {
        throw new Error(
            `Missing required source datasets: ${missing.join(", ")}. Weekly ingestion cannot continue.`,
        );
    }
}

function validateRequiredFields(row, requiredFields, sourceName, rowNumber) {
    for (const field of requiredFields) {
        if (!(field in row)) {
            throw new Error(`${sourceName} is missing required field "${field}".`);
        }

        const normalized = asStringOrNull(row[field]);
        if (!normalized) {
            throw new Error(
                `${sourceName} row ${rowNumber} is missing required value for "${field}".`,
            );
        }
    }
}

export function validateSourceRows(sourceName, rows) {
    const contract = PRODUCTION_SOURCE_CONTRACTS[sourceName];
    if (!contract) {
        throw new Error(`Unknown source contract "${sourceName}".`);
    }

    if (!Array.isArray(rows) || rows.length === 0) {
        throw new Error(`${sourceName} has no data rows for weekly ingestion.`);
    }

    const validatedRows = rows.map((row, index) => {
        const rowNumber = index + 1;
        if (!row || typeof row !== "object" || Array.isArray(row)) {
            throw new Error(`${sourceName} row ${rowNumber} is malformed.`);
        }

        validateRequiredFields(row, contract.required_fields, sourceName, rowNumber);
        const occurredAt = normalizeTimestamp(
            row[contract.occurrence_field],
            sourceName,
            rowNumber,
            contract.occurrence_field,
        );

        return {
            ...row,
            [contract.occurrence_field]: occurredAt,
        };
    });

    return validatedRows;
}

export function loadAndValidateSource(sourceName, filePath) {
    const contract = PRODUCTION_SOURCE_CONTRACTS[sourceName];
    if (!contract) {
        throw new Error(`Unknown source contract "${sourceName}".`);
    }

    if (!filePath || !fs.existsSync(filePath)) {
        throw new Error(`Source "${sourceName}" is missing at "${filePath}".`);
    }

    let parsedRows;
    if (contract.format === "csv") {
        const { headers, rows } = parseCsvFile(filePath);
        for (const field of contract.required_fields) {
            if (!headers.includes(field)) {
                throw new Error(
                    `${sourceName} is missing required column "${field}" in "${filePath}".`,
                );
            }
        }
        parsedRows = rows;
    } else {
        parsedRows = parseNdjsonFile(filePath);
    }

    return validateSourceRows(sourceName, parsedRows);
}

