---
phase: 04-competitor-and-authority-content
plan: 03
subsystem: authority-reinforcement
tags: [seo, authority-content, internal-linking, vitest, guardrails]
requires:
  - phase: 04-02
    provides: published competitor routes and contextual module framework
provides:
  - New authority guide and case study aligned to migration/payroll-confidence objections
  - Bidirectional contextual paths between authority pages and competitor comparison pages
  - Proof-link graph checks in tests and scripts
affects: [phase-04-verification, conversion-intent-pathways, competitor-content-maintenance]
tech-stack:
  added: []
  patterns: [authority-proof-reinforcement, reverse-lookup-compare-links, bidirectional-proof-link-guardrails]
key-files:
  created: []
  modified:
    - lib/guides.ts
    - lib/caseStudies.ts
    - lib/competitors.ts
    - app/guides/[slug]/page.tsx
    - app/case-studies/[slug]/page.tsx
    - lib/__tests__/competitor-content.test.ts
    - scripts/seo/check-competitor-content.mjs
key-decisions:
  - "Use competitor contracts as the single source for reverse compare-link lookup on authority pages."
  - "Add one migration-focused guide and one HVAC proof case study to address competitor-intent objections."
  - "Require guardrails to verify both forward proof links and reverse compare-link connectivity."
patterns-established:
  - "Authority templates derive compare return links through helper lookups (`getCompetitorsByGuideSlug`, `getCompetitorsByCaseStudySlug`)."
  - "Competitor proof-link health is enforced in both Vitest and script checks."
requirements-completed: [COMP-02]
duration: 24 min
completed: 2026-03-03
---

# Phase 4 Plan 3: Authority expansion and bidirectional proof pathways Summary

**Competitor pages are now reinforced with new authority assets and two-way contextual linking, with automated checks blocking proof-link regressions.**

## Performance

- **Duration:** 24 min
- **Started:** 2026-03-03T20:11:00Z
- **Completed:** 2026-03-03T20:35:00Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments
- Added a migration-risk checklist guide and a new HVAC case study focused on payroll-confidence outcomes.
- Expanded competitor proof-link arrays to include the new authority assets and exposed contextual return links from guide/case-study detail pages back to relevant comparisons.
- Extended competitor test/script guardrails to enforce proof-link presence, slug resolution, and reverse mapping integrity.

## Task Commits

Each task was committed atomically:

1. **Task 1: Add competitor-supporting authority assets in typed content contracts** - `4d7e199` (feat)
2. **Task 2: Implement bidirectional contextual linking between competitor and authority pages** - `3c86e09` (feat)
3. **Task 3: Enforce authority-link graph integrity in competitor guardrails** - `d254454` (test)

## Files Created/Modified
- `lib/guides.ts` - Adds `crew-time-tracking-migration-risk-checklist`.
- `lib/caseStudies.ts` - Adds `summit-hvac-payroll-confidence`.
- `lib/competitors.ts` - Expands authority slug links and preserves reverse-lookup helpers.
- `app/guides/[slug]/page.tsx` - Adds contextual compare return-link section from competitor mappings.
- `app/case-studies/[slug]/page.tsx` - Adds contextual compare return-link section from competitor mappings.
- `lib/__tests__/competitor-content.test.ts` - Adds proof-link graph integrity and reverse mapping assertions.
- `scripts/seo/check-competitor-content.mjs` - Adds reverse-mapping and template-level compare-link requirements.

## Decisions Made
- Competitor contracts remain the source of truth for both forward and reverse authority-link pathways.
- New authority content focuses on migration friction and payroll-confidence proof to support competitor-intent decision stages.
- Guardrails now include template-level checks to ensure compare return paths stay present.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 4 implementation is complete and ready for phase-level verification and transition into booked-call conversion/attribution work.

---
*Phase: 04-competitor-and-authority-content*
*Completed: 2026-03-03*
