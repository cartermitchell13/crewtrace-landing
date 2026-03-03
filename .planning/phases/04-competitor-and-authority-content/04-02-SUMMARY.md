---
phase: 04-competitor-and-authority-content
plan: 02
subsystem: competitor-routes-and-seo-policy
tags: [nextjs, seo, sitemap, metadata, internal-linking]
requires:
  - phase: 04-01
    provides: typed competitor records and guardrail contracts
provides:
  - Competitor hub and detail routes rendered from shared typed contracts
  - Contextual competitor-to-feature/industry/proof link modules
  - Sitemap and SEO policy coverage for competitor routes without navbar/home exposure
affects: [phase-04-03-authority-expansion, crawl-surface, metadata-contracts]
tech-stack:
  added: []
  patterns: [compare-route-family, static-plus-dynamic-seo-policy, deterministic-contextual-link-modules]
key-files:
  created:
    - app/compare/page.tsx
    - app/compare/[slug]/page.tsx
  modified:
    - app/sitemap.ts
    - lib/seoPolicy.ts
    - scripts/seo/check-seo-contract.mjs
key-decisions:
  - "Use /compare as the competitor hub route and /compare/[slug] for launch detail pages."
  - "Keep competitor discoverability to sitemap/contextual links and explicitly block nav/home exposure."
  - "Normalize contextual modules with deterministic sorting and bounded link counts."
patterns-established:
  - "Competitor pages are generated from contract exports via generateStaticParams + createPageMetadata."
  - "SEO policy combines static coverage (/compare) and dynamic prefix coverage (/compare/)."
requirements-completed: [COMP-02]
duration: 26 min
completed: 2026-03-03
---

# Phase 4 Plan 2: Competitor route publishing and crawl-policy integration Summary

**Dedicated `/compare` and `/compare/[slug]` pages are live, schema-enabled, and wired into sitemap/policy contracts while remaining outside homepage and navbar surfaces.**

## Performance

- **Duration:** 26 min
- **Started:** 2026-03-03T19:45:00Z
- **Completed:** 2026-03-03T20:11:00Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments
- Implemented competitor hub/detail routes with static params, metadata, schema, freshness display, claim-safety sections, and soft CTA framing.
- Added deterministic contextual modules linking competitor pages into feature, industry, guide, and case-study pathways.
- Registered competitor routes in sitemap + SEO policy and expanded SEO contract checks to enforce route registration and nav/home exclusion.

## Task Commits

Each task was committed atomically:

1. **Task 1: Build competitor hub and dynamic competitor detail routes** - `b7da588` (feat)
2. **Task 2: Wire competitor pages into cluster and proof-asset pathways** - `7141a7f` (feat)
3. **Task 3: Integrate competitor pages into sitemap and SEO contract policy** - `cfe6a0b` (feat)

## Files Created/Modified
- `app/compare/page.tsx` - Competitor-intent hub rendered from typed records.
- `app/compare/[slug]/page.tsx` - Competitor detail template with schema, freshness metadata, and contextual pathway sections.
- `app/sitemap.ts` - Adds `/compare/${slug}` sitemap entries from `competitorSlugs`.
- `lib/seoPolicy.ts` - Adds static `/compare` policy and dynamic `/compare/` prefix coverage.
- `scripts/seo/check-seo-contract.mjs` - Adds competitor route policy assertions and nav/home anti-exposure checks.

## Decisions Made
- Competitor detail pages use factual comparison framing with explicit claim-safety and review metadata.
- Contextual links are sorted and bounded to keep module output deterministic.
- Competitor routes are indexable by policy and sitemap but intentionally excluded from top-level navigation surfaces.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Competitor route infrastructure is complete and ready for authority-asset expansion and bidirectional proof-link reinforcement in `04-03`.

---
*Phase: 04-competitor-and-authority-content*
*Completed: 2026-03-03*
