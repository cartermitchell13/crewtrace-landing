---
phase: 07-production-data-integration-and-contracts
plan: 03
subsystem: reporting
tags: [weekly-reporting, ci-gates, attribution-joins, production-pipeline]
requires:
  - phase: 07-01
    provides: validated production ingestion artifacts and source contracts
  - phase: 07-02
    provides: deterministic conversion keys and GA4 contract validator
provides:
  - production report orchestrator chaining ingestion and exports
  - weekly report rows normalized by canonical landing_url, cluster, template_type
  - booked-call report rows with deterministic join keys and first-touch dimensions
  - CI workflow gates for ingestion and GA4 data contract validation
affects: [weekly ops review, opportunity scoring inputs, release quality gates]
tech-stack:
  added: []
  patterns:
    - script-orchestrated weekly pipeline with explicit artifact handoffs
    - release gate includes data contract checks alongside SEO guardrails
key-files:
  created:
    - scripts/analytics/build-weekly-seo-production-report.mjs
  modified:
    - scripts/analytics/export-booked-call-report.mjs
    - scripts/analytics/export-weekly-seo-ops-report.mjs
    - scripts/analytics/lib/weekly-report-cluster-map.mjs
    - .github/workflows/weekly-seo-report.yml
    - .github/workflows/seo-quality.yml
    - package.json
    - docs/seo/weekly-seo-operations-reporting.md
key-decisions:
  - "Booked-call exports include first-touch dimensions and join diagnostics, with fallback key derivation for legacy events."
  - "Weekly ops report rows are normalized by canonical landing dimensions instead of fixture-era cluster-only grouping."
  - "CI enforces production ingestion and GA4 contract checks as blocking release criteria."
patterns-established:
  - "Production weekly reporting runs through one orchestration command and emits pipeline summary metadata."
  - "Data contract checks are reusable in both local development and workflow automation."
requirements-completed: [DATA-01, DATA-02, DATA-03, DATA-04, OPS-10]
duration: 22 min
completed: 2026-03-03
---

# Phase 7 Plan 03: Production pipeline integration and CI gating Summary

**Weekly SEO reporting now runs through a production-oriented orchestrator with deterministic attribution joins, canonical normalization, and blocking CI checks for ingestion and GA4 contracts.**

## Performance

- **Duration:** 22 min
- **Started:** 2026-03-03T20:35:00Z
- **Completed:** 2026-03-03T20:57:00Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments
- Extended booked-call export rows with `conversion_key` and first-touch dimensions for deterministic joins.
- Built an end-to-end production weekly reporting orchestrator and normalized weekly output by canonical landing dimensions.
- Wired production ingestion + GA4 readiness checks into release CI and weekly scheduled workflow execution.

## Task Commits

Each task was committed atomically:

1. **Task 1: Add deterministic join keys and first-touch fields to booked-call export** - `fb0080f` (feat)
2. **Task 2: Build production weekly pipeline orchestrator and integrate normalized joins** - `aeb8530` (feat)
3. **Task 3: Wire ingestion and GA4 contract checks into blocking CI workflows** - `d12f972` (feat)

**Plan metadata:** pending

## Files Created/Modified
- `scripts/analytics/export-booked-call-report.mjs` - Added conversion key and first-touch join fields with diagnostics.
- `scripts/analytics/build-weekly-seo-production-report.mjs` - Added orchestration flow for ingestion, booked export, and weekly export.
- `scripts/analytics/export-weekly-seo-ops-report.mjs` - Updated weekly reporting to canonical landing URL, cluster, and template normalization.
- `scripts/analytics/lib/weekly-report-cluster-map.mjs` - Added shared template and canonical landing dimension helpers.
- `.github/workflows/weekly-seo-report.yml` - Switched scheduled workflow to production pipeline command.
- `.github/workflows/seo-quality.yml` - Added production data contract validation step.
- `package.json` - Added script aliases for production checks and weekly pipeline execution.
- `docs/seo/weekly-seo-operations-reporting.md` - Updated runbook for production command flow and remediation.

## Decisions Made
- Preserved backward compatibility for legacy booked events by deriving deterministic keys when missing.
- Kept weekly pipeline integration script-based to stay reproducible in local and CI environments.
- Treated data contract checks as first-class quality gates, not optional post-build checks.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 7 production data flow, deterministic joins, and release contract gates are fully wired.
- Phase verification can now evaluate end-to-end goal achievement for roadmap and requirement closure.

---
*Phase: 07-production-data-integration-and-contracts*
*Completed: 2026-03-03*

