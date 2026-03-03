---
phase: 07-production-data-integration-and-contracts
plan: 01
subsystem: analytics
tags: [production-ingestion, data-contracts, reporting, validation]
requires:
  - phase: 06-03
    provides: deterministic weekly reporting fixtures and exporter baseline
provides:
  - reusable UTC previous-week window + freeze metadata helper
  - production source schema contracts and fail-fast validators
  - ingestion entrypoint emitting normalized weekly source artifacts
  - blocking ingestion contract guardrail command for CI/local checks
affects: [weekly reporting pipeline, ga4 readiness checks, release quality gates]
tech-stack:
  added: []
  patterns:
    - contract-first source validation before downstream exports
    - UTC Monday-Sunday week filtering by source occurrence timestamps
key-files:
  created:
    - scripts/analytics/lib/weekly-report-window.mjs
    - scripts/analytics/lib/production-source-contracts.mjs
    - scripts/analytics/fetch-production-source-data.mjs
    - scripts/analytics/fixtures/production/search-console-indexed.weekly.sample.csv
    - scripts/analytics/fixtures/production/search-console-traffic.weekly.sample.csv
    - scripts/analytics/fixtures/production/booked-call-events.weekly.sample.ndjson
    - scripts/seo/check-production-ingestion-contract.mjs
    - docs/seo/production-data-contracts.md
  modified:
    - docs/seo/production-data-contracts.md
key-decisions:
  - "The ingestion path fails fast on the first missing dataset, required field, or malformed timestamp."
  - "Week inclusion is strictly based on UTC occurrence timestamps and enforces Monday-Sunday boundaries."
  - "Freeze metadata is written per week and blocks reruns for the same week unless explicitly overridden."
patterns-established:
  - "All production source contracts are centralized in one module and shared by ingestion + guardrail scripts."
  - "Ingestion emits canonical landing, cluster, and template dimensions to reduce downstream drift."
requirements-completed: [DATA-01, DATA-02, DATA-04]
duration: 25 min
completed: 2026-03-03
---

# Phase 7 Plan 01: Production ingestion contracts and source validation Summary

**Phase 7 now has a production-shaped ingestion pipeline that validates source contracts, filters to the previous UTC week, freezes completed weeks, and emits normalized artifacts for downstream reporting.**

## Performance

- **Duration:** 25 min
- **Started:** 2026-03-03T19:49:00Z
- **Completed:** 2026-03-03T20:14:00Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments
- Added a shared UTC weekly window helper that enforces previous Monday-Sunday windowing and freeze metadata.
- Added centralized source contracts for indexed, traffic, booked events, and GA4 with required field/timestamp validation.
- Implemented ingestion + contract-check scripts with deterministic fixture inputs and clear failure diagnostics.

## Task Commits

Each task was committed atomically:

1. **Task 1: Codify UTC weekly window and required source contracts** - `6aa9ca3` (feat)
2. **Task 2: Implement production-source ingestion with fail-fast validation** - `0d20032` (feat)
3. **Task 3: Add blocking ingestion contract guardrail script** - `fc7187e` (feat)

**Plan metadata:** pending

## Files Created/Modified
- `scripts/analytics/lib/weekly-report-window.mjs` - Shared helper for previous Monday-Sunday UTC windows and freeze metadata.
- `scripts/analytics/lib/production-source-contracts.mjs` - Central source contract registry with CSV/NDJSON validators.
- `scripts/analytics/fetch-production-source-data.mjs` - Ingestion entrypoint for validation, weekly filtering, normalization, and artifact writes.
- `scripts/analytics/fixtures/production/search-console-indexed.weekly.sample.csv` - Production-shaped indexed sample fixture.
- `scripts/analytics/fixtures/production/search-console-traffic.weekly.sample.csv` - Production-shaped traffic sample fixture.
- `scripts/analytics/fixtures/production/booked-call-events.weekly.sample.ndjson` - Production-shaped booked-event sample fixture.
- `scripts/seo/check-production-ingestion-contract.mjs` - Blocking contract check for required datasets and week coverage.
- `docs/seo/production-data-contracts.md` - Operator runbook for source requirements, failure behavior, and remediation.

## Decisions Made
- Kept ingestion and guardrail validators on the same shared contract module to prevent schema drift.
- Enforced week filtering after schema validation so malformed rows fail before reporting.
- Added freeze metadata checks to block silent same-week restatements.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Production ingestion contracts are in place for GA4 readiness and weekly report orchestration.
- Phase 7 Plan 02 can now lock event taxonomy and deterministic conversion key propagation.

---
*Phase: 07-production-data-integration-and-contracts*
*Completed: 2026-03-03*

