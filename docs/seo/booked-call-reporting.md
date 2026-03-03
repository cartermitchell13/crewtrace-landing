# Booked-Call Attribution Reporting

This runbook defines the reporting workflow for SEO booked-call attribution.

## Inputs

The exporter consumes NDJSON where each line is either:

- A normalized event payload:
  - `event`
  - `occurred_at`
  - `cluster`
  - `template_type`
  - `landing_url`
- Or an envelope with the payload nested at `event`.

Tracked event names:

- `seo_landing_view`
- `booked_call_cta_click`
- `lead_form_submit_attempt`
- `lead_form_submit_success`
- `lead_form_submit_failure`

## Commands

Use the fixture for deterministic local validation:

```bash
npm run seo:report-booked-calls -- --input scripts/analytics/fixtures/booked-call-events.sample.ndjson --output .planning/phases/05-booked-call-conversion-and-attribution/.tmp-report
```

Run attribution wiring coverage checks:

```bash
npm run seo:check-attribution
```

## Outputs

The exporter writes two files to `--output`:

- `booked-call-report.json`
- `booked-call-report.csv`

Each row is segmented by:

- `cluster`
- `template_type`
- `landing_url`

Metrics included per segment:

- `event_count`
- `seo_landing_view_count`
- `booked_call_cta_click_count`
- `lead_form_submit_attempt_count`
- `lead_form_submit_success_count`
- `lead_form_submit_failure_count`
- `booked_call_to_lead_success_rate`

## Interpretation

- Treat `booked_call_cta_click_count` as top-of-funnel booked-call intent.
- Use lead submit attempt/success/failure counts as supporting conversion diagnostics.
- Prioritize segments with high click volume and low lead success rate for form-flow or endpoint reliability improvements.
