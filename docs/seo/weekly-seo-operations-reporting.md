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

