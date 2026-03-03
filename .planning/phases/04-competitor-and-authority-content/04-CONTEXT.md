# Phase 4: Competitor and Authority Content - Context

**Gathered:** 2026-03-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Build competitor-intent and authority content for Connecteam and Workyard that can rank safely, then connect it into existing clusters to support both organic visibility and booked-call intent.

Scope is implementation within Phase 4 requirements (COMP-01, COMP-02), not new capabilities beyond competitor and authority content.

</domain>

<decisions>
## Implementation Decisions

### Competitor page model
- Use dedicated competitor routes (not only embedded sections).
- Competitor content should not be prominently linked from homepage or primary navigation.
- Use typed data records in `lib/*` as source of truth for competitor content.
- Initial depth: one core page per competitor first (Connecteam, Workyard).

### Canonical ownership
- Claude's discretion for exact canonical ownership strategy, with intent-splitting to avoid cannibalization.

### Safe-claims policy
- Allow marketing-style claims when generally true.
- Unknown or missing competitor details can be inferred from industry norms.
- Add timestamping/review cadence for pricing and feature comparison freshness.
- Tone should stay neutral and factual with best-fit framing.

### Authority content mix and conversion intent
- Launch with a balanced mix: competitor pages plus supporting authority assets (guides/case studies).
- Use soft consultative CTAs on competitor-intent pages.
- Link competitor pages contextually to relevant feature + industry + one proof asset.
- Keep competitor pages out of homepage/nav, but include in sitemap and contextual internal links.

### Claude's Discretion
- Exact route taxonomy and URL naming for competitor pages.
- Canonical implementation details and cross-page ownership rules.
- Precise refresh interval and operational workflow for comparison content updates.
- Final phrasing style that balances persuasion with factual safety.

</decisions>

<specifics>
## Specific Ideas

- Do not make competitor pages highly visible to direct prospects browsing the site.
- Competitor pages should be discoverable primarily through search and contextual links, not top-level navigation.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/solutions.ts`, `lib/industries.ts`, `lib/guides.ts`, `lib/caseStudies.ts`: existing typed content-record pattern to mirror for competitor records.
- `app/features/[slug]/page.tsx`, `app/industries/[slug]/page.tsx`, `app/guides/[slug]/page.tsx`, `app/case-studies/[slug]/page.tsx`: reusable dynamic-route template structure (`generateStaticParams`, metadata, schema blocks).
- `lib/seo.ts` and `lib/schema`: reusable metadata and structured-data helpers.
- `components/CTASection.tsx`: reusable CTA block with consistent conversion pattern.

### Established Patterns
- Content at scale is managed through typed arrays/maps in `lib/*`, then rendered by shared route templates.
- Metadata/canonical logic is centralized via `createPageMetadata`.
- Existing clusters rely on deterministic internal-link logic (`lib/cluster-link-graph.ts`) for stable crawl paths.

### Integration Points
- Add new competitor data module(s) in `lib/*` and new dynamic competitor route(s) in `app/*`.
- Extend `app/sitemap.ts` so competitor pages are indexable/discoverable without nav exposure.
- Add contextual cross-links from competitor pages into feature/industry/guide/case-study routes and selective return links where appropriate.

</code_context>

<deferred>
## Deferred Ideas

- None - discussion stayed within Phase 4 scope.

</deferred>

---

*Phase: 04-competitor-and-authority-content*
*Context gathered: 2026-03-03*
