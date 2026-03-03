---
phase: 03-link-graph-and-cluster-expansion
plan: 02
subsystem: cluster-expansion
tags: [seo, contracts, sitemap, vitest, validation]
requires:
  - phase: 03-01
    provides: deterministic sibling graph and reciprocal guardrails
provides:
  - Eligible expansion records for feature and industry clusters
  - Deterministic hub and sitemap ordering for expanded slugs
  - Expansion-specific eligibility guardrails in tests and scripts
affects: [phase-03-verification, crawl-surface-growth, expansion-quality-gates]
tech-stack:
  added: []
  patterns: [expansion-slug-contracts, deterministic-crawl-ordering, eligibility-first-validation]
key-files:
  created: []
  modified:
    - lib/solutions.ts
    - lib/industries.ts
    - app/features/page.tsx
    - app/industries/page.tsx
    - app/sitemap.ts
    - docs/seo/priority-cluster-coverage.md
    - lib/__tests__/cluster-coverage.test.ts
    - scripts/seo/check-cluster-content.mjs
key-decisions:
  - "Represent Phase 3 expansion inventory with explicit slug exports (`expansionFeatureSlugs`, `expansionIndustrySlugs`)."
  - "Keep crawl-surface updates contract-driven by sorting hubs/sitemap from shared slug exports instead of route-local lists."
  - "Gate expansion quality on reciprocal integrity and sibling eligibility, not just record existence."
patterns-established:
  - "Expansion records must pass reciprocal + sibling eligibility checks before merge."
  - "Hub and sitemap ordering is deterministic under cluster growth."
requirements-completed: [CLUS-04]
duration: 27 min
completed: 2026-03-03
---

# Phase 3 Plan 2: Expansion records with enforced link and intent safety Summary

**Cluster expansion now ships with one new feature (`overtime-alerts`) and one new industry (`electrical`) under deterministic crawl ordering and explicit eligibility guardrails.**

## Performance

- **Duration:** 27 min
- **Started:** 2026-03-03T00:58:00Z
- **Completed:** 2026-03-03T01:25:00Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments
- Added expansion contract entries and reciprocal mappings while preserving unique primary intent ownership.
- Updated feature/industry hubs and sitemap generation to keep expanded crawl surfaces deterministic.
- Hardened Vitest and script guardrails to validate expansion slugs for reciprocal integrity and sibling eligibility.

## Task Commits

Each task was committed atomically:

1. **Task 1: Expand typed records under strict eligibility rules** - `c7ddff1` (feat)
2. **Task 2: Ensure hubs and sitemap expose expanded crawl paths** - `e8d864d` (feat)
3. **Task 3: Harden expansion validation for link and intent safety** - `5823455` (test)

## Files Created/Modified
- `lib/solutions.ts` - Added `overtime-alerts` feature record and expansion slug export.
- `lib/industries.ts` - Added `electrical` industry record, reciprocal mappings, and expansion slug export.
- `docs/seo/priority-cluster-coverage.md` - Added Phase 3 expansion matrix with relationship ownership notes.
- `app/features/page.tsx` - Deterministic feature ordering for stable expansion crawl paths.
- `app/industries/page.tsx` - Deterministic industry ordering tie-break for stable expansion crawl paths.
- `app/sitemap.ts` - Sorted dynamic feature/industry entries from shared slug exports.
- `lib/__tests__/cluster-coverage.test.ts` - Added expansion eligibility assertions for reciprocal and sibling coverage.
- `scripts/seo/check-cluster-content.mjs` - Added expansion-specific validation and clear failure output by slug/rule.

## Decisions Made
- Expansion inventory is represented in code-level slug exports so validation rules can target it directly.
- Hubs and sitemap remain fully contract-driven so new records are indexable without route-local edits.
- Expansion quality is blocked when sibling eligibility or reciprocal integrity regresses.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Full-repo `npm run lint` still fails on pre-existing `.codex/get-shit-done/*` CommonJS and unrelated UI lint debt; all plan-specific build/test/script checks passed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 3 plan execution is complete and ready for phase-level verification and roadmap phase completion routing.

---
*Phase: 03-link-graph-and-cluster-expansion*
*Completed: 2026-03-03*
