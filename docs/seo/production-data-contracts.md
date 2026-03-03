# Production Data Contracts for Weekly SEO Reporting

This runbook defines the required production source contracts for Phase 7 weekly reporting.

## Weekly UTC Window Rules

- The weekly reporting window is always the previous Monday-Sunday in UTC.
- Source inclusion is based on source occurrence timestamps, not ingestion runtime.
- A successful weekly run writes freeze metadata and treats that week as frozen.
- Re-running the same frozen week should fail unless an explicit override is provided.

## Required Source Datasets

The ingestion contract blocks execution when required datasets are missing.

1. Search Console indexed dataset (`indexed`)
2. Search Console traffic dataset (`traffic`)
3. Booked-call event stream (`booked_events`)
4. GA4 export dataset (`ga4`) for GA4 readiness checks

## Required Field Contracts

### `indexed` (CSV)

- Required fields: `date`, `url`, `indexed`
- Required timestamp field: `date` (UTC)

### `traffic` (CSV)

- Required fields: `date`, `url`, `clicks`, `impressions`
- Required timestamp field: `date` (UTC)

### `booked_events` (NDJSON)

- Required fields: `event`, `occurred_at`, `cluster`, `template_type`, `landing_url`, `conversion_key`
- Required timestamp field: `occurred_at` (UTC ISO)

### `ga4` (CSV)

- Required fields: `event_name`, `event_timestamp`, `cluster`, `template_type`, `landing_url`, `conversion_key`
- Required timestamp field: `event_timestamp` (UTC timestamp)

## Fail-Fast Behavior

The ingestion validator fails immediately when:

- A required dataset path is missing.
- A required column/field is missing.
- A required column value is blank.
- A timestamp is malformed or outside the target week window.

Failure output includes source name, row index, and missing/invalid field for operator diagnostics.

## Local Contract Commands

Validate production ingestion contract with deterministic fixtures:

```bash
node scripts/seo/check-production-ingestion-contract.mjs \
  --indexed scripts/analytics/fixtures/production/search-console-indexed.weekly.sample.csv \
  --traffic scripts/analytics/fixtures/production/search-console-traffic.weekly.sample.csv \
  --booked-events scripts/analytics/fixtures/production/booked-call-events.weekly.sample.ndjson
```

Expected pass output:

- `Production ingestion contract passed for <week_start>..<week_end>`
- Row counts for `indexed`, `traffic`, and `booked_events`

Expected failure output:

- `Production ingestion contract check failed.`
- Source label plus missing dataset/column/field details

Run full ingestion and write normalized weekly artifacts:

```bash
node scripts/analytics/fetch-production-source-data.mjs \
  --week 2026-02-23 \
  --indexed scripts/analytics/fixtures/production/search-console-indexed.weekly.sample.csv \
  --traffic scripts/analytics/fixtures/production/search-console-traffic.weekly.sample.csv \
  --booked-events scripts/analytics/fixtures/production/booked-call-events.weekly.sample.ndjson \
  --output .planning/phases/07-production-data-integration-and-contracts/.tmp-production-ingest
```

## Remediation Checklist

1. Confirm all required source paths are provided and readable.
2. Validate required columns match the contract exactly.
3. Inspect timestamp format and ensure rows fall within previous Monday-Sunday UTC.
4. Confirm conversion keys are present for booked-call event rows.
5. Re-run contract check before re-triggering scheduled report workflows.
