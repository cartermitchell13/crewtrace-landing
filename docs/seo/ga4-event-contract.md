# GA4 SEO Event Contract

This runbook defines the GA4 release-gate contract used in Phase 7.

## Required GA4 Events

- `seo_landing_view`
- `booked_call_cta_click`
- `booked_call_embed_interaction`

## Required Columns

GA4 export CSV must include:

- `event_name`
- `event_timestamp`
- `cluster`
- `template_type`
- `landing_url`
- `conversion_key`

## Required Dimensions

For each required event row, the following dimensions must be present and non-empty:

- `cluster`
- `template_type`
- `landing_url`

`conversion_key` is also required for deterministic attribution joins across ingestion and reporting.

## Local Validation Command

```bash
node scripts/analytics/validate-ga4-readiness.mjs \
  --input scripts/analytics/fixtures/ga4/ga4-events.weekly.sample.csv
```

## Release Gate Expectation

GA4 readiness validation is blocking. Missing required events, missing required dimensions, malformed timestamps, or blank conversion keys must fail CI.

## Failure Diagnostics

When validation fails, diagnostics include:

- Missing required columns
- Missing required events
- Row-level dimension failures with row number
- Invalid or missing event timestamp values

## Remediation Workflow

1. Confirm GA4 export schema includes all required columns.
2. Verify required event names are present in the selected weekly export.
3. Validate attribution dimensions (`cluster`, `template_type`, `landing_url`) on required events.
4. Ensure deterministic `conversion_key` is included for required events.
5. Re-run `validate-ga4-readiness.mjs` before rerunning release workflows.

