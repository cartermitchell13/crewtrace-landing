---
phase: 02-priority-cluster-build-features-industries
plan: 02
subsystem: cluster-templates
tags: [nextjs, seo, app-router, templates]
requires:
  - phase: 02-01
    provides: typed feature and industry contracts
provides:
  - Contract-backed feature and industry hub routes
  - Detail templates that read shared records only
  - SEO policy enforcement for the features hub route
affects: [phase-02-03-coverage-expansion, schema-guardrails, crawl-paths]
tech-stack:
  added: []
  patterns: [data-driven-hubs, contract-only-detail-lookups]
key-files:
  created:
    - app/features/page.tsx
  modified:
    - app/features/[slug]/page.tsx
    - app/industries/page.tsx
    - app/industries/[slug]/page.tsx
    - lib/seoPolicy.ts
    - scripts/seo/check-seo-contract.mjs
    - scripts/seo/check-cluster-content.mjs
key-decisions:
  - "Use icon-key mapping in route templates so industry contract data stays UI-framework agnostic."
  - "Keep hub card generation fully data-driven from shared record exports (no route-local arrays)."
  - "Enforce `/features` metadata ownership through existing SEO contract checks."
patterns-established:
  - "Hub pages resolve card/link sets from contract summaries only."
  - "Industry and feature detail routes rely on slug-indexed contract lookups."
requirements-completed: [CLUS-01, CLUS-02, CLUS-03]
duration: 31 min
completed: 2026-03-01
---

# Phase 2 Plan 2: Refactor feature and industry templates to use schema-backed data sources Summary

**Feature and industry hubs/details now render from shared cluster contracts, including a new indexable `/features` crawl entry point.**

## Performance

- **Duration:** 31 min
- **Started:** 2026-03-01T16:05:00Z
- **Completed:** 2026-03-01T16:36:00Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments
- Added `/features` as a policy-backed hub page generated from typed feature records.
- Removed route-local industry data from `app/industries/[slug]/page.tsx` and switched to `lib/industries.ts` ownership.
- Refactored `app/industries/page.tsx` to generate all cards and feature links from shared contracts.

## Task Commits

Each task was committed atomically:

1. **Task 1: Build feature hub route from typed feature records** - `096ed9b` (feat)
2. **Task 2: Refactor feature and industry detail templates to shared contracts** - `faee2b5` (feat)
3. **Task 3: Refactor industry hub to contract-backed rendering and schema guardrails** - `4f417b5` (feat)

Additional hardening:

- `c2f7c34` (fix) - lint-safe JSX quote escaping and script variable cleanup.

## Files Created/Modified
- `app/features/page.tsx` - New feature hub route sourced from feature contracts.
- `app/features/[slug]/page.tsx` - Detail template aligned to `featureBySlug` exports.
- `app/industries/page.tsx` - Industry hub cards generated from industry summaries.
- `app/industries/[slug]/page.tsx` - Detail page sourced from shared industry contract data.
- `lib/seoPolicy.ts` - Added static `/features` SEO route policy.
- `scripts/seo/check-seo-contract.mjs` - Added `/features` metadata contract coverage.
- `scripts/seo/check-cluster-content.mjs` - Minor lint-safe runtime variable cleanup.

## Decisions Made
- Industry UI icon rendering uses route-level key-to-icon mapping while keeping contracts framework-neutral.
- Hub pages link directly to all child routes based on contract exports to prevent crawl drift.
- Metadata policy checks were extended instead of adding a separate one-off script for `/features`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] JSX quote rendering lint violation in industry detail template**
- **Found during:** Plan verification (lint pass on changed files)
- **Issue:** Unescaped quote characters in testimonial markup triggered `react/no-unescaped-entities`.
- **Fix:** Replaced literal quote characters with `&ldquo;` / `&rdquo;`.
- **Files modified:** `app/industries/[slug]/page.tsx`
- **Verification:** `npm run lint -- app/industries/[slug]/page.tsx`
- **Committed in:** `c2f7c34`

**2. [Rule 1 - Bug] Reserved module variable assignment warning in cluster check script**
- **Found during:** Plan verification (lint pass on changed files)
- **Issue:** `@next/next/no-assign-module-variable` flagged local variable named `module`.
- **Fix:** Renamed runtime loader variable to `moduleRef`.
- **Files modified:** `scripts/seo/check-cluster-content.mjs`
- **Verification:** `npm run lint -- scripts/seo/check-cluster-content.mjs`
- **Committed in:** `c2f7c34`

---

**Total deviations:** 2 auto-fixed (2 bug)
**Impact on plan:** No scope change; fixes only resolved verification noise and kept checks green.

## Issues Encountered

- Repo-wide `npm run lint` currently fails on existing unrelated files (including imported GSD tool sources and pre-existing UI lint debt). Plan verification used targeted linting on modified scope plus required build/script checks.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 2 templates are now contract-backed and crawl-safe, enabling priority-trade expansion and coverage assertions in `02-03`.

---
*Phase: 02-priority-cluster-build-features-industries*
*Completed: 2026-03-01*
