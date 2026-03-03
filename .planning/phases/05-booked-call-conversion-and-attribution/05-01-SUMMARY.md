---
phase: 05-booked-call-conversion-and-attribution
plan: 01
subsystem: conversion-api
tags: [nextjs, api-route, lead-validation, cta-contract]
requires:
  - phase: 04-competitor-and-authority-content
    provides: indexable template families and shared CTA surfaces
provides:
  - server-validated lead endpoint with explicit success and failure envelopes
  - real contact-page submit lifecycle wired to /api/lead
  - canonical booked-call URL builder and shared CTA link component
affects: [05-02 event instrumentation, 05-03 attribution reporting, CRO requirements]
tech-stack:
  added: []
  patterns:
    - shared conversion contracts in lib/*
    - deterministic booked-call URL parameter merge ordering
key-files:
  created:
    - app/api/lead/route.ts
    - lib/lead-contract.ts
    - lib/booked-call-url.ts
    - components/BookedCallLink.tsx
    - lib/__tests__/booked-call-url.test.ts
  modified:
    - app/contact/page.tsx
    - components/Button.tsx
    - components/CTASection.tsx
    - app/features/[slug]/page.tsx
    - app/industries/[slug]/page.tsx
key-decisions:
  - "Lead API forwarding is optional and controlled by LEAD_WEBHOOK_URL / LEAD_FORWARDING_WEBHOOK_URL."
  - "Booked-call links are generated through one builder with an allowlist of attribution params."
patterns-established:
  - "Conversion contracts: runtime validation + typed envelope parser in shared lib modules."
  - "Priority template CTA links flow through BookedCallLink instead of hardcoded Cal.com URLs."
requirements-completed: [CRO-02, CRO-03]
duration: 4 min
completed: 2026-03-02
---

# Phase 5 Plan 01: Replace simulated form submission with production-ready lead flow Summary

**Server-backed lead capture now powers contact submissions, while priority feature/industry booked-call CTAs route through a single attribution-safe link contract.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-02T23:04:50-08:00
- **Completed:** 2026-03-02T23:08:07Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments
- Added a validated `/api/lead` endpoint with deterministic error codes and optional downstream forwarding failure visibility.
- Replaced the contact page's simulated submission with real API integration and explicit retry-friendly error messaging.
- Standardized priority-template booked-call links via `buildBookedCallUrl` and `BookedCallLink`, with contract tests preventing URL-param drift.

## Task Commits

Each task was committed atomically:

1. **Task 1: Build validated lead endpoint contract and response envelope** - `d37c95d` (feat)
2. **Task 2: Replace simulated contact submit flow with real endpoint integration** - `fe52278` (feat)
3. **Task 3: Implement shared booked-call URL builder and wire priority CTAs** - `c12ac9c` (feat)

**Plan metadata:** pending (committed with state/roadmap updates)

## Files Created/Modified
- `app/api/lead/route.ts` - Lead ingestion endpoint with request validation and forwarding failure handling.
- `lib/lead-contract.ts` - Shared request/response types, validation, and client envelope parser.
- `app/contact/page.tsx` - Real API submit lifecycle with explicit success/error state handling.
- `lib/booked-call-url.ts` - Canonical booked-call URL builder with allowed attribution param set.
- `components/BookedCallLink.tsx` - Shared outbound booked-call link component that uses the URL builder.
- `components/CTASection.tsx` - Lower-page CTA now routes through `BookedCallLink`.
- `app/features/[slug]/page.tsx` - Above-the-fold CTA + CTA section routed through shared booked-call contract.
- `app/industries/[slug]/page.tsx` - Above-the-fold CTA + CTA section routed through shared booked-call contract.
- `lib/__tests__/booked-call-url.test.ts` - Contract tests for merge precedence and key filtering.

## Decisions Made
- Chose an environment-driven forwarding model so lead capture can work locally without external dependencies.
- Scoped booked-call query params to an explicit allowlist to prevent accidental tracking drift and noisy payload growth.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Existing apostrophe lint violations blocked contact-page verification**
- **Found during:** Task 2 (Replace simulated contact submit flow with real endpoint integration)
- **Issue:** `react/no-unescaped-entities` failed on existing copy in `app/contact/page.tsx`.
- **Fix:** Escaped apostrophes in user-facing text to satisfy lint.
- **Files modified:** `app/contact/page.tsx`
- **Verification:** `npm run lint -- app/contact/page.tsx` and full plan lint/build checks passed.
- **Committed in:** `fe52278`

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** No scope creep; fix was required to pass the task verification gate.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Priority page CTA plumbing and lead endpoint contracts are ready for Phase 05-02 event taxonomy and attribution transport instrumentation.
- No blockers identified for Wave 2.

---
*Phase: 05-booked-call-conversion-and-attribution*
*Completed: 2026-03-02*
