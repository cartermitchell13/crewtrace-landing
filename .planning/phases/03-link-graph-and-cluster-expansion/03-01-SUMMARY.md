---
phase: 03-link-graph-and-cluster-expansion
plan: 01
subsystem: internal-link-graph
tags: [seo, nextjs, vitest, contracts, internal-linking]
requires:
  - phase: 02-02
    provides: contract-backed feature and industry detail templates
  - phase: 02-03
    provides: priority cluster coverage guardrails and relationship contracts
provides:
  - Shared deterministic sibling/cross-cluster link graph helpers
  - Detail template integration for parent, sibling, and reciprocal cross-cluster links
  - CLUS-04 guardrails for sibling coverage and reciprocal integrity
affects: [phase-03-02-expansion, cluster-content-validation, crawl-depth-governance]
tech-stack:
  added: []
  patterns: [overlap-scored-sibling-ranking, reciprocal-link-enforcement, template-level-parent-paths]
key-files:
  created:
    - lib/cluster-link-graph.ts
    - lib/__tests__/cluster-link-graph.test.ts
  modified:
    - app/features/[slug]/page.tsx
    - app/industries/[slug]/page.tsx
    - lib/__tests__/cluster-coverage.test.ts
    - scripts/seo/check-cluster-content.mjs
    - lib/solutions.ts
    - lib/industries.ts
key-decisions:
  - "Centralize sibling/cross-cluster graph derivation in lib helpers and keep routes as consumers only."
  - "Enforce reciprocity and sibling coverage in both Vitest and script guardrails for merge-time blocking."
  - "Expose explicit parent hub links from detail templates to satisfy CLUS-04 parent-path continuity."
patterns-established:
  - "Sibling ranking is overlap-score descending with slug tie-break for deterministic rendering."
  - "Reciprocity is validated bidirectionally (feature->industry and industry->feature)."
requirements-completed: [CLUS-04]
duration: 24 min
completed: 2026-03-03
---

# Phase 3 Plan 1: Deterministic link graph and CLUS-04 enforcement Summary

**Feature and industry detail routes now use one deterministic link graph for parent/sibling/cross-cluster links, with reciprocal and orphan guardrails enforced in tests and scripts.**

## Performance

- **Duration:** 24 min
- **Started:** 2026-03-03T00:32:00Z
- **Completed:** 2026-03-03T00:56:00Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments
- Added `lib/cluster-link-graph.ts` to centralize deterministic sibling ranking and reciprocal relationship detection.
- Refactored `app/features/[slug]/page.tsx` and `app/industries/[slug]/page.tsx` to consume shared graph outputs and expose parent hub links.
- Extended both Vitest and script guardrails to fail on missing sibling coverage and one-way feature/industry relationships.

## Task Commits

Each task was committed atomically:

1. **Task 1: Build shared deterministic link-graph helpers from typed contracts** - `8513f23` (feat)
2. **Task 2: Wire detail templates to shared sibling and cross-cluster graph outputs** - `d168351` (feat)
3. **Task 3: Extend guardrails to fail on orphan and reciprocity regressions** - `ae6cf91` (test)

## Files Created/Modified
- `lib/cluster-link-graph.ts` - Deterministic sibling ranking, reciprocal filtering, and detail-link bundle helpers.
- `lib/__tests__/cluster-link-graph.test.ts` - Regression tests for overlap scoring, tie-break behavior, and reciprocity detection.
- `app/features/[slug]/page.tsx` - Uses shared graph outputs for sibling/cross-cluster sections and parent hub link.
- `app/industries/[slug]/page.tsx` - Uses shared graph outputs for related features, sibling industries, and parent hub link.
- `lib/__tests__/cluster-coverage.test.ts` - Enforces CLUS-04 sibling coverage and reciprocal integrity for every indexable slug.
- `scripts/seo/check-cluster-content.mjs` - Script-level failures on missing sibling coverage and one-way links with slug-level error output.
- `lib/solutions.ts` - Relationship alignment updates required to satisfy reciprocal graph invariants.
- `lib/industries.ts` - Relationship alignment updates required to satisfy reciprocal graph invariants.

## Decisions Made
- Shared graph helpers are the single source for sibling and cross-cluster ordering in detail templates.
- Parent hub links are explicit route links (`/features`, `/industries`) rather than implicit breadcrumb/schema-only references.
- Reciprocity and sibling coverage are enforced in both test and script layers to prevent bypass in local/CI flows.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Existing relationship contracts were not fully reciprocal**
- **Found during:** Task 3 verification (new reciprocity guardrail run)
- **Issue:** Multiple one-way feature/industry links caused CLUS-04 reciprocity gates to fail.
- **Fix:** Updated affected `relatedIndustries` and `relatedSolutions` relationships to restore bidirectional integrity.
- **Files modified:** `lib/solutions.ts`, `lib/industries.ts`
- **Verification:** `npx vitest run lib/__tests__/cluster-content.test.ts lib/__tests__/cluster-coverage.test.ts lib/__tests__/cluster-link-graph.test.ts` and `node scripts/seo/check-cluster-content.mjs`
- **Committed in:** `ae6cf91`

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Blocking fix was required to make new reciprocity guardrails enforceable; no architectural scope change.

## Issues Encountered

- Full-repo `npm run lint` still fails on pre-existing `.codex/get-shit-done/*` CommonJS lint rules and unrelated UI files; targeted changed-file linting and all required build/test/script gates for this plan passed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Wave 1 graph and enforcement groundwork is complete; phase is ready for `03-02` expansion records and crawl-surface growth under the same CLUS-04 constraints.

---
*Phase: 03-link-graph-and-cluster-expansion*
*Completed: 2026-03-03*
