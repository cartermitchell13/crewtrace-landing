---
phase: 05-booked-call-conversion-and-attribution
plan: 03
subsystem: reporting
tags: [reporting, attribution, guardrails, seo-scripts]
requires:
  - phase: 05-02
    provides: normalized conversion events and shared booked-call CTA instrumentation
provides:
  - secondary-template booked-call CTA alignment to shared attribution component
  - deterministic booked-call report export pipeline (JSON + CSV)
  - attribution coverage guardrails and operator runbook
affects: [phase-05 verification, phase-06 operational automation]
tech-stack:
  added: []
  patterns:
    - script-driven attribution validation for required template families
    - NDJSON-to-segmented-report export contract
key-files:
  created:
    - scripts/analytics/export-booked-call-report.mjs
    - scripts/analytics/fixtures/booked-call-events.sample.ndjson
    - scripts/seo/check-booked-call-attribution.mjs
    - docs/seo/booked-call-reporting.md
  modified:
    - package.json
    - app/compare/[slug]/page.tsx
    - app/guides/[slug]/page.tsx
    - app/case-studies/[slug]/page.tsx
    - app/blog/[slug]/page.tsx
key-decisions:
  - "Reporting exporter groups strictly by cluster/template_type/landing_url for deterministic segmentation."
  - "Attribution wiring checks are script-enforced and runnable via package scripts."
patterns-established:
  - "Secondary templates with booked-call CTAs must import and render BookedCallLink."
  - "Attribution reporting workflow is codified in docs and reproducible from fixture inputs."
requirements-completed: [CRO-01, CRO-02, CRO-05]
duration: 4 min
completed: 2026-03-02
---

# Phase 5 Plan 03: Build attribution reporting by cluster, template, and landing URL Summary

**Booked-call attribution reporting is now exportable by cluster/template/landing dimensions with script-enforced CTA wiring coverage across all required SEO template families.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-02T23:22:19-08:00
- **Completed:** 2026-03-02T23:26:08Z
- **Tasks:** 3
- **Files modified:** 9

## Accomplishments
- Replaced remaining secondary-template direct Cal.com links with `BookedCallLink` so compare/guides/case-studies/blog CTAs use shared attribution contracts.
- Added deterministic NDJSON report exporter with fixture-backed JSON/CSV outputs segmented by `cluster`, `template_type`, and `landing_url`.
- Added attribution guardrail script + package commands + runbook so regression checks and reporting exports are operationally repeatable.

## Task Commits

Each task was committed atomically:

1. **Task 1: Align secondary SEO templates to shared booked-call CTA contract** - `b5d1c61` (feat)
2. **Task 2: Build deterministic booked-call attribution reporting exporter** - `2fd341f` (feat)
3. **Task 3: Add attribution guardrails, package scripts, and runbook documentation** - `909732e` (feat)

**Plan metadata:** pending (committed with phase closeout docs updates)

## Files Created/Modified
- `app/compare/[slug]/page.tsx` - Shared booked-call CTA component usage for comparison detail pages.
- `app/guides/[slug]/page.tsx` - Shared booked-call CTA component usage for guide detail pages.
- `app/case-studies/[slug]/page.tsx` - Shared booked-call CTA component usage for case-study detail pages.
- `app/blog/[slug]/page.tsx` - Shared booked-call CTA component usage for blog detail pages.
- `scripts/analytics/export-booked-call-report.mjs` - Deterministic attribution segment export pipeline.
- `scripts/analytics/fixtures/booked-call-events.sample.ndjson` - Stable fixture dataset for repeatable exporter validation.
- `scripts/seo/check-booked-call-attribution.mjs` - Template coverage guardrails for booked-call attribution wiring.
- `package.json` - `seo:check-attribution` and `seo:report-booked-calls` command entrypoints.
- `docs/seo/booked-call-reporting.md` - Operator runbook for inputs, commands, outputs, and interpretation.

## Decisions Made
- Kept the exporter provider-agnostic by consuming normalized NDJSON payloads and writing local artifacts.
- Encoded required template coverage as explicit pattern checks to fail fast on CTA contract regressions.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 5 feature delivery is complete and fully script-verifiable.
- Phase 6 automation work can consume the new attribution scripts and runbook as CI/ops inputs.

---
*Phase: 05-booked-call-conversion-and-attribution*
*Completed: 2026-03-02*
