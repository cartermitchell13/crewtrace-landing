---
phase: 07-production-data-integration-and-contracts
plan: 02
subsystem: attribution
tags: [ga4, seo-events, conversion-tracking, contact-page]
requires:
  - phase: 05-03
    provides: seo event transport and booked-call attribution baseline
provides:
  - deterministic conversion_key generation for SEO conversion events
  - booked_call_embed_interaction tracking on contact page via Cal message listener
  - GA4 readiness validator and fixture-backed event contract checks
affects: [analytics ingestion, booked-call joins, release quality gates]
tech-stack:
  added: []
  patterns:
    - deterministic attribution key generated from canonical landing + first-touch dimensions
    - contract validation scripts for GA4 event and dimension completeness
key-files:
  created:
    - components/CalEmbedInteractionTracker.tsx
    - scripts/analytics/validate-ga4-readiness.mjs
    - scripts/analytics/fixtures/ga4/ga4-events.weekly.sample.csv
    - docs/seo/ga4-event-contract.md
  modified:
    - lib/seo-events.ts
    - lib/first-touch-attribution.ts
    - lib/__tests__/seo-events.test.ts
    - app/contact/page.tsx
key-decisions:
  - "Conversion keys are deterministic hashes derived from canonical landing + first-touch dimensions."
  - "Parser remains backward-safe by deriving conversion keys for legacy payloads when missing."
  - "Embed interaction telemetry is captured with postMessage listening to avoid contact-flow replacement."
patterns-established:
  - "GA4 readiness is enforced with fixture-backed, row-level diagnostic validation."
  - "New conversion event types are added through centralized event contracts + tests."
requirements-completed: [DATA-05, DATA-03]
duration: 21 min
completed: 2026-03-03
---

# Phase 7 Plan 02: GA4 contract and deterministic attribution keying Summary

**SEO conversion telemetry now includes deterministic conversion keys, Cal embed interaction tracking, and a blocking GA4 readiness validator for required events and dimensions.**

## Performance

- **Duration:** 21 min
- **Started:** 2026-03-03T20:14:00Z
- **Completed:** 2026-03-03T20:35:00Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments
- Extended SEO event contracts to include `booked_call_embed_interaction` and deterministic `conversion_key` propagation.
- Added contact-page Cal interaction tracking that emits embed interaction events without replacing existing lead form behavior.
- Added GA4 readiness validation script, fixture input, and runbook for release-gate use.

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend conversion event contract with deterministic attribution keys** - `424fc68` (feat)
2. **Task 2: Capture Cal embed interaction events without replacing contact flow** - `a0d070e` (feat)
3. **Task 3: Add GA4 readiness validator and fixture contract** - `c923ef4` (feat)

**Plan metadata:** pending

## Files Created/Modified
- `lib/first-touch-attribution.ts` - Added deterministic conversion key builder based on first-touch and canonical landing dimensions.
- `lib/seo-events.ts` - Added embed interaction taxonomy and enforced conversion key handling in builders/parsers.
- `lib/__tests__/seo-events.test.ts` - Locked taxonomy, deterministic key behavior, and legacy parser compatibility.
- `components/CalEmbedInteractionTracker.tsx` - Added postMessage-driven embed interaction listener and SEO event emitter.
- `app/contact/page.tsx` - Integrated Cal embed tracker into the contact page.
- `scripts/analytics/validate-ga4-readiness.mjs` - Implemented GA4 event/dimension readiness guardrail validator.
- `scripts/analytics/fixtures/ga4/ga4-events.weekly.sample.csv` - Added deterministic GA4 sample export fixture.
- `docs/seo/ga4-event-contract.md` - Added GA4 contract and remediation runbook.

## Decisions Made
- Kept deterministic key generation in shared attribution utilities so frontend and parser fallback use identical logic.
- Required explicit conversion keys for new embed interaction payload parsing while preserving backward compatibility for legacy events.
- Treated GA4 readiness as a contract script instead of workflow-inline assertions for reproducibility.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Production ingestion and event contracts are now ready to wire into end-to-end weekly pipeline orchestration and CI release gates.
- Phase 7 Plan 03 can consume deterministic conversion keys and GA4 contract checks directly.

---
*Phase: 07-production-data-integration-and-contracts*
*Completed: 2026-03-03*

