# Weekly SEO Operations Reporting

This runbook defines the weekly report contract for indexation, traffic trend, and booked-call performance by cluster.

## Weekly Report Inputs

The exporter consumes three deterministic inputs:

1. Indexed pages CSV
   - Fixture: `scripts/analytics/fixtures/search-console-indexed.sample.csv`
   - Required columns:
     - `date`
     - `url`
     - `indexed` (`1` for indexed, `0` for not indexed)
2. Traffic trend CSV
   - Fixture: `scripts/analytics/fixtures/search-console-traffic.sample.csv`
   - Required columns:
     - `date`
     - `url`
     - `clicks`
     - `impressions`
3. Booked-call report JSON
   - Fixture: `scripts/analytics/fixtures/booked-call-report.sample.json`
   - Required fields:
     - top-level `rows` array
     - per-row `cluster`, `template_type`, `landing_url`
     - booked metrics (`booked_call_cta_click_count`, `lead_form_submit_success_count`)

## Output Contract (Weekly)

Exporter output is generated as both JSON and CSV with deterministic ordering.

Required weekly output dimensions:

- `cluster`
- `week_start`
- `week_end`

Required weekly output metrics:

- `indexed_pages`
- `tracked_urls`
- `traffic_clicks`
- `traffic_impressions`
- `booked_calls`
- `lead_submits_success`

## Failure Behavior

The exporter must fail fast when required columns/fields are missing and report which input failed validation.

## Initial Fixture Scope

Current fixtures cover:

- features
- industries
- compare
- guides
- blog
- case-studies

This provides deterministic multi-cluster weekly data for local validation.

## Export Command

Run locally:

```bash
node scripts/analytics/export-weekly-seo-ops-report.mjs \
  --indexed scripts/analytics/fixtures/search-console-indexed.sample.csv \
  --traffic scripts/analytics/fixtures/search-console-traffic.sample.csv \
  --booked scripts/analytics/fixtures/booked-call-report.sample.json \
  --output .planning/phases/06-qa-automation-and-scale-operations/.tmp-weekly-report
```

## Automation Schedule

- Workflow file: `.github/workflows/weekly-seo-report.yml`
- Triggers:
  - Weekly cron: `0 13 * * 1` (Monday 13:00 UTC)
  - Manual dispatch: `workflow_dispatch`
- Output artifacts:
  - `weekly-seo-ops-report.json`
  - `weekly-seo-ops-report.csv`

## Artifact Retrieval

1. Open the latest run for `Weekly SEO Operations Report`.
2. Download artifact `weekly-seo-report`.
3. Consume JSON for machine workflows and CSV for analyst review.

## Remediation (Missing or Invalid Inputs)

If report generation fails:

1. Confirm required columns/fields are present in all three inputs.
2. Re-run exporter locally with the same command to reproduce.
3. Verify URL paths normalize into expected clusters (`features`, `industries`, `compare`, `guides`, `case-studies`, `blog`).
4. If source exports changed shape, update fixture/schema contracts before changing exporter logic.
