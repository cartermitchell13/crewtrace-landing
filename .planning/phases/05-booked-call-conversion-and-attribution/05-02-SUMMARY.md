---
phase: 05-booked-call-conversion-and-attribution
plan: 02
subsystem: analytics
tags: [event-taxonomy, first-touch, nextjs-api, conversion-tracking]
requires:
  - phase: 05-01
    provides: shared booked-call link contract and real lead-submit API lifecycle
provides:
  - typed SEO conversion event taxonomy and payload builders
  - first-touch attribution capture/persistence contract
  - unified client transport and validated /api/events ingestion endpoint
  - instrumentation on priority SEO templates and contact lead flow
affects: [05-03 reporting exporter, attribution guardrails, CRO requirements]
tech-stack:
  added: []
  patterns:
    - sendBeacon-first event transport with fetch keepalive fallback
    - first-touch attribution precedence over later navigation context
key-files:
  created:
    - lib/seo-events.ts
    - lib/first-touch-attribution.ts
    - lib/event-transport.ts
    - app/api/events/route.ts
    - components/SeoLandingTracker.tsx
    - components/FirstTouchBootstrap.tsx
    - lib/__tests__/seo-events.test.ts
  modified:
    - components/BookedCallLink.tsx
    - app/layout.tsx
    - app/features/[slug]/page.tsx
    - app/industries/[slug]/page.tsx
    - app/contact/page.tsx
    - components/CTASection.tsx
key-decisions:
  - "Event taxonomy uses stable snake_case names with one shared payload builder surface."
  - "First-touch attribution is written once to localStorage and merged with precedence on conversion events."
patterns-established:
  - "Client telemetry path is always builder -> sendSeoEvent -> /api/events."
  - "Priority template pages include explicit SeoLandingTracker mounts for landing-view instrumentation."
requirements-completed: [CRO-01, CRO-04]
duration: 6 min
completed: 2026-03-02
---

# Phase 5 Plan 02: Implement event taxonomy for SEO landings and booked-call interactions Summary

**SEO landing-view, booked-call click, and lead-form lifecycle telemetry now flows through a typed first-touch attribution contract and a single validated ingestion endpoint.**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-02T23:13:41-08:00
- **Completed:** 2026-03-02T23:19:01Z
- **Tasks:** 3
- **Files modified:** 13

## Accomplishments
- Defined the required conversion taxonomy (`seo_landing_view`, `booked_call_cta_click`, lead submit lifecycle) with typed payload builders and parser contracts.
- Implemented first-touch attribution capture and merge logic so SEO-origin context is preserved and reused for conversion events.
- Wired event transport + ingestion (`sendBeacon`/`fetch keepalive` + `/api/events`) and instrumented priority templates plus contact flow lifecycle emissions.

## Task Commits

Each task was committed atomically:

1. **Task 1: Define typed event taxonomy and first-touch attribution contract** - `9474b5c` (feat)
2. **Task 2: Build shared event transport and server ingestion endpoint** - `cd324f5` (feat)
3. **Task 3: Instrument priority templates and lead flow with required events** - `745c076` (feat)

**Plan metadata:** pending (committed with state/roadmap/requirements updates)

## Files Created/Modified
- `lib/seo-events.ts` - Stable event names, payload builders, and parser validation.
- `lib/first-touch-attribution.ts` - First-touch capture/read/merge helpers with storage contract.
- `lib/event-transport.ts` - Shared `sendSeoEvent` transport with `sendBeacon` and `fetch keepalive`.
- `app/api/events/route.ts` - Provider-agnostic event ingestion endpoint with explicit responses.
- `components/SeoLandingTracker.tsx` - Priority-template landing view emitter component.
- `components/FirstTouchBootstrap.tsx` - App-level first-touch bootstrap mount.
- `components/BookedCallLink.tsx` - Booked-call click event emission via shared taxonomy.
- `app/contact/page.tsx` - Lead submit attempt/success/failure event emissions around `/api/lead`.
- `app/features/[slug]/page.tsx` - Feature detail landing tracker mount.
- `app/industries/[slug]/page.tsx` - Industry detail landing tracker mount.

## Decisions Made
- Kept event ingestion provider-agnostic by validating and normalizing at `/api/events`, with optional forwarding only when configured.
- Used first-touch precedence for attribution merge to prevent overwrite by later in-session navigation.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Type-level payload parsing edge blocked build after Task 2**
- **Found during:** Task 2 (Build shared event transport and server ingestion endpoint)
- **Issue:** Optional-key assignment in `parseSeoEventPayload` was too broad, causing a build-time type failure.
- **Fix:** Narrowed optional key typing and cast assignments to exact optional payload key types.
- **Files modified:** `lib/seo-events.ts`
- **Verification:** Task 2 lint/build and full-plan lint/test/build checks passed.
- **Committed in:** `cd324f5`

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** No scope expansion; fix was required for type-safe compilation.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Event schema and ingestion contracts are stable and ready for deterministic report export + coverage guardrails in 05-03.
- Secondary template CTA alignment can now reuse the instrumented `BookedCallLink` contract.

---
*Phase: 05-booked-call-conversion-and-attribution*
*Completed: 2026-03-02*
