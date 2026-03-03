# Weekly SEO Operations Reporting

This runbook defines the Phase 7 production reporting pipeline for weekly SEO operations.

## Pipeline Command (Production Flow)

Run one command to execute ingestion, booked-call export, and weekly report generation:

```bash
node scripts/analytics/build-weekly-seo-production-report.mjs \
  --week 2026-02-23 \
  --indexed scripts/analytics/fixtures/production/search-console-indexed.weekly.sample.csv \
  --traffic scripts/analytics/fixtures/production/search-console-traffic.weekly.sample.csv \
  --booked-events scripts/analytics/fixtures/production/booked-call-events.weekly.sample.ndjson \
  --ga4 scripts/analytics/fixtures/ga4/ga4-events.weekly.sample.csv \
  --output .planning/phases/07-production-data-integration-and-contracts/.tmp-weekly-production
```

The orchestrator executes:

1. `validate-ga4-readiness.mjs` (when `--ga4` is provided)
2. `fetch-production-source-data.mjs`
3. `export-booked-call-report.mjs`
4. `export-weekly-seo-ops-report.mjs`

## Weekly Window and Freeze Rules

- Reporting week is previous Monday-Sunday UTC.
- Inclusion uses source occurrence timestamps.
- Ingestion writes freeze metadata and prevents same-week reruns unless explicitly overridden.

## Required Inputs

1. Indexed CSV (`date`, `url`, `indexed`)
2. Traffic CSV (`date`, `url`, `clicks`, `impressions`)
3. Booked event NDJSON (`event`, `occurred_at`, `cluster`, `template_type`, `landing_url`, `conversion_key`)
4. GA4 CSV (`event_name`, `event_timestamp`, `cluster`, `template_type`, `landing_url`, `conversion_key`)

## Output Artifacts

`build-weekly-seo-production-report.mjs` writes:

- `weekly-seo-ops-report.json`
- `weekly-seo-ops-report.csv`
- `production-pipeline-summary.json`
- `ingestion/*` normalized weekly source artifacts
- `booked/*` booked-call report artifacts

Weekly report rows are normalized by canonical:

- `landing_url`
- `cluster`
- `template_type`

plus deterministic join metadata (`joinable_conversion_keys`).

## Validation and Failure Behavior

Pipeline is fail-fast:

- Missing required source datasets or columns fail immediately.
- Malformed timestamps fail validation.
- Missing GA4 required events/dimensions fail readiness checks.
- Join-key gaps surface in booked-call `join_diagnostics`.

## Remediation Steps

1. Run ingestion guardrail:
   - `node scripts/seo/check-production-ingestion-contract.mjs --indexed <...> --traffic <...> --booked-events <...>`
2. Run GA4 readiness guardrail:
   - `node scripts/analytics/validate-ga4-readiness.mjs --input <ga4.csv>`
3. Re-run full weekly pipeline command.
4. Inspect:
   - `production-pipeline-summary.json`
   - `booked/booked-call-report.json` (`join_diagnostics`)
   - `weekly-seo-ops-report.json` row normalization fields

## CI and Scheduling

- Weekly scheduled workflow: `.github/workflows/weekly-seo-report.yml`
- Release quality gate workflow: `.github/workflows/seo-quality.yml`
- Both workflows must run contract checks before report/build steps.

