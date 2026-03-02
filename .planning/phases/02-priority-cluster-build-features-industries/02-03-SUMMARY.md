---
phase: 02-priority-cluster-build-features-industries
plan: 03
subsystem: cluster-coverage
tags: [seo, contracts, vitest, validation]
requires:
  - phase: 02-01
    provides: typed contracts and ownership checks
  - phase: 02-02
    provides: contract-backed hub and detail templates
provides:
  - Required priority-trade industry coverage including construction and waterproofing
  - Explicit coverage matrix documentation for feature-to-industry linkage
  - Regression checks for required trades and crawl-link continuity
affects: [phase-03-link-graph, cluster-regression-ci, seo-crawl-depth]
tech-stack:
  added: []
  patterns: [required-trade-coverage-contract, coverage-first-regression-testing]
key-files:
  created:
    - docs/seo/priority-cluster-coverage.md
    - lib/__tests__/cluster-coverage.test.ts
  modified:
    - lib/solutions.ts
    - lib/industries.ts
    - app/features/page.tsx
    - app/features/[slug]/page.tsx
    - app/industries/page.tsx
    - app/industries/[slug]/page.tsx
    - scripts/seo/check-cluster-content.mjs
key-decisions:
  - "Represent required priority trades as code (`requiredPriorityIndustrySlugs`) instead of doc-only guidance."
  - "Enforce trade coverage in both tests and script checks so local/CI workflows catch regressions."
  - "Prioritize required trades in industry hub ordering to strengthen crawl paths to strategic pages."
patterns-established:
  - "Coverage requirements are treated as cluster contracts, not editorial preferences."
  - "Hub/detail templates render priority-trade paths directly from shared relationship data."
requirements-completed: [CLUS-03, CLUS-05, CLUS-06]
duration: 22 min
completed: 2026-03-01
---

# Phase 2 Plan 3: Expand priority trade coverage with consistent template quality Summary

**Priority trade coverage is now explicit, linked, and enforced across feature and industry clusters with regression checks.**

## Performance

- **Duration:** 22 min
- **Started:** 2026-03-01T16:12:00Z
- **Completed:** 2026-03-01T16:34:00Z
- **Tasks:** 3
- **Files modified:** 9

## Accomplishments
- Added `construction` and `waterproofing` industry pages to the typed contract set and linked them to relevant feature pages.
- Published a coverage matrix documenting required trades and their feature relationships.
- Added automated coverage checks (`cluster-coverage.test.ts` and script guardrail extensions) to block missing required-trade mappings.

## Task Commits

Each task was committed atomically:

1. **Task 1: Expand typed records to full priority-trade coverage** - `0da512f` (feat)
2. **Task 2: Ensure hub and detail templates expose complete priority crawl paths** - `fbc2aab` (feat)
3. **Task 3: Add coverage and ownership regression checks** - `0b62470` (test)

## Files Created/Modified
- `lib/solutions.ts` - Expanded feature-to-industry relationship coverage for required trade slugs.
- `lib/industries.ts` - Added construction/waterproofing records and required priority slug contract export.
- `docs/seo/priority-cluster-coverage.md` - Required trade matrix and coverage rules.
- `app/features/page.tsx` - Deterministic industry-link ordering from contract relationships.
- `app/features/[slug]/page.tsx` - Sorted related industry links for stable crawl surfaces.
- `app/industries/page.tsx` - Priority trade ordering and badge visibility on hub cards.
- `app/industries/[slug]/page.tsx` - Exposed contract keyword context in hero metadata surface.
- `lib/__tests__/cluster-coverage.test.ts` - Required trade and crawl-pattern regression assertions.
- `scripts/seo/check-cluster-content.mjs` - Required trade presence and linkage enforcement.

## Decisions Made
- Required trade scope is encoded in code (`requiredPriorityIndustrySlugs`) to avoid silent drift.
- Priority-trade crawl surfaces are intentionally emphasized in hub rendering order.
- Coverage checks validate both data presence and cross-cluster linkability.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 2 cluster contracts, hubs, detail routes, and priority coverage checks are ready for phase 3 link-graph expansion work.

---
*Phase: 02-priority-cluster-build-features-industries*
*Completed: 2026-03-01*
