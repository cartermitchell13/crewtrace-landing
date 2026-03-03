---
phase: 04-competitor-and-authority-content
plan: 01
subsystem: competitor-content-contracts
tags: [seo, contracts, vitest, guardrails, competitor-pages]
requires:
  - phase: 03-link-graph-and-cluster-expansion
    provides: deterministic cluster data contracts and script guardrail patterns
provides:
  - Typed competitor records for Connecteam and Workyard intent ownership
  - Human-readable SERP ownership matrix tied to contract metadata
  - Test and script guardrails for competitor contract completeness and link validity
affects: [phase-04-02-route-implementation, authority-linking, seo-guardrails]
tech-stack:
  added: []
  patterns: [contract-first-competitor-content, freshness-metadata-enforcement, slug-resolution-guardrails]
key-files:
  created:
    - lib/competitors.ts
    - docs/seo/competitor-serp-map.md
    - lib/__tests__/competitor-content.test.ts
    - scripts/seo/check-competitor-content.mjs
  modified: []
key-decisions:
  - "Keep competitor content data-only in lib/competitors.ts so scripts can transpile and validate it safely."
  - "Require explicit freshness metadata (lastReviewedOn + reviewCadenceDays) in each competitor record."
  - "Validate feature/industry/authority slug references in both Vitest and script checks."
patterns-established:
  - "Competitor records expose canonical ownership and claim-safety rules before any page rendering."
  - "Guardrail scripts use aggregated error output with per-competitor diagnostics."
requirements-completed: [COMP-01, COMP-02]
duration: 19 min
completed: 2026-03-03
---

# Phase 4 Plan 1: Competitor keyword map and brief contract foundation Summary

**Connecteam and Workyard intent coverage is now encoded in typed competitor contracts with freshness and claim-safety metadata enforced by automated checks.**

## Performance

- **Duration:** 19 min
- **Started:** 2026-03-03T19:26:00Z
- **Completed:** 2026-03-03T19:45:00Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments
- Created `lib/competitors.ts` with strict launch scope (`connecteam`, `workyard`), intent buckets, comparison scaffolding, claim-safety rules, and contextual link targets.
- Published `docs/seo/competitor-serp-map.md` to mirror typed ownership into operator-readable SERP mapping.
- Added guardrails in Vitest and script form to block missing coverage, missing freshness metadata, and broken linked slugs.

## Task Commits

Each task was committed atomically:

1. **Task 1: Create typed competitor keyword and brief contracts** - `959f828` (feat)
2. **Task 2: Publish competitor SERP map documentation tied to contract ownership** - `02a6a2b` (docs)
3. **Task 3: Add automated competitor contract guardrails** - `f57b456` (test)

## Files Created/Modified
- `lib/competitors.ts` - Typed competitor data contracts, freshness metadata, claim-safety rules, and link targets.
- `docs/seo/competitor-serp-map.md` - SERP matrix with intent ownership and review cadence references.
- `lib/__tests__/competitor-content.test.ts` - Contract tests for slug coverage, required fields, and link resolution.
- `scripts/seo/check-competitor-content.mjs` - Script-level CI/local checks for contract integrity.

## Decisions Made
- Competitor launch scope is fixed to two records with explicit `requiredCompetitorSlugs` guardrails.
- Freshness cadence is enforced at 30 days for both launch competitor pages.
- Data source remains local TypeScript contracts to keep ownership deterministic and verifiable.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

The competitor contract foundation is complete and ready for route implementation in `04-02`.

---
*Phase: 04-competitor-and-authority-content*
*Completed: 2026-03-03*
