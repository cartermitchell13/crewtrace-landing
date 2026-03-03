---
phase: 01-seo-and-positioning-foundation
plan: 02
subsystem: seo
tags: [nextjs, schema, json-ld, faq, breadcrumb, article]
requires:
  - "01-01 metadata/canonical/indexability contract"
provides:
  - "Typed JSON-LD schema builders for core page template types"
  - "Shared FAQ data module reusable by UI and schema injection"
  - "Schema coverage test/check guardrails"
affects: [messaging-guardrails, phase-2-planning]
tech-stack:
  added: []
  patterns: ["shared schema builder imports across templates", "doc-backed schema coverage check script"]
key-files:
  created: [lib/schema.ts, lib/faq.ts, scripts/seo/check-schema-presence.mjs, lib/__tests__/schema.test.ts, docs/seo/schema-matrix.md]
  modified: [components/FAQSection.tsx, app/layout.tsx, app/page.tsx, app/blog/[slug]/page.tsx, app/guides/[slug]/page.tsx, app/case-studies/[slug]/page.tsx, app/features/[slug]/page.tsx, app/industries/[slug]/page.tsx, package.json]
key-decisions:
  - "FAQ content ownership moved to lib/faq.ts so homepage schema injection does not depend on a client component module."
  - "All template JSON-LD generation uses lib/schema.ts builders instead of duplicated inline objects."
patterns-established:
  - "Core templates import typed schema utilities from lib/schema.ts."
  - "Schema coverage is documented in docs/seo/schema-matrix.md and enforced with scripts/seo/check-schema-presence.mjs."
requirements-completed: [SEO-04]
duration: -
completed: 2026-03-01
---

# Phase 1: SEO and Positioning Foundation Summary

**Structured-data output is now centralized in typed schema builders and enforced by schema coverage checks across all core templates.**

## Performance

- **Duration:** -
- **Started:** 2026-03-01
- **Completed:** 2026-03-01
- **Tasks:** 3
- **Files modified:** 14

## Accomplishments
- Added `lib/schema.ts` with Organization, WebSite, FAQPage, BreadcrumbList, and Article schema builders.
- Wired homepage and slug templates to shared schema utilities for consistent JSON-LD output.
- Added schema matrix documentation, unit tests, and a file-level schema presence check command.

## Task Commits

Atomic task commits were not created in this session.

## Files Created/Modified
- `lib/schema.ts` - Typed JSON-LD builder utilities for all required template types.
- `lib/faq.ts` - Shared FAQ records used by both UI and homepage FAQ schema.
- `app/layout.tsx` - Uses Organization and WebSite schema builders.
- `app/page.tsx` - Injects FAQ JSON-LD from shared FAQ records.
- `app/*/[slug]/page.tsx` - Inject Article and Breadcrumb JSON-LD via shared builders.

## Decisions Made
- Move reusable FAQ source data into `lib/faq.ts` to avoid server-side imports from client component modules.
- Keep schema generation API small and explicit to reduce template drift.

## Deviations from Plan

### Auto-fixed Issues

**1. Build-time prerender failure from client-module import**
- **Found during:** Task 2 (template wiring)
- **Issue:** Homepage schema code attempted to consume FAQ data from a client component module, causing static generation failure.
- **Fix:** Introduced `lib/faq.ts` and rewired both `app/page.tsx` and `components/FAQSection.tsx` to use shared data safely.
- **Files modified:** `lib/faq.ts`, `app/page.tsx`, `components/FAQSection.tsx`
- **Verification:** `npm run build` succeeded after refactor.
- **Committed in:** N/A (no atomic task commits in this session)

---

**Total deviations:** 1 auto-fixed (build-blocking import path)
**Impact on plan:** Required for correctness. No scope expansion.

## Issues Encountered

None after the FAQ data module refactor.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Messaging guardrail enforcement can now rely on stable schema-enabled templates.

---
*Phase: 01-seo-and-positioning-foundation*  
*Completed: 2026-03-01*
