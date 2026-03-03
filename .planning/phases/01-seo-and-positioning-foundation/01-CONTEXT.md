# Phase 1: SEO and Positioning Foundation - Context

**Gathered:** 2026-03-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Define and enforce the Phase 1 SEO contract across current routes: metadata/canonical ownership, indexing policy direction, schema baseline requirements, and ICP/message guardrails. This phase clarifies how existing page templates should express targeting and outcomes, not new product capabilities.

</domain>

<decisions>
## Implementation Decisions

### Metadata and Canonical Ownership
- Use one typed metadata contract in `lib/seo.ts` as the source of truth for indexable pages.
- Keep canonical values as normalized route paths (relative), with `metadataBase` responsible for absolute resolution.
- Use self-canonical URLs for all indexable pages, including hubs and detail pages (no cross-canonicalization between templates).
- Use deterministic per-template title/description patterns and add uniqueness checks to catch conflicts.

### ICP Framing in Public SEO Copy
- Do not force exact numeric qualifier wording (for example, "11-50 employees" and "$500k-$5M") into all public pages.
- Public-facing copy should frame the ICP more naturally as businesses running multiple crews in the U.S.
- Keep strict numeric ICP qualifiers as internal strategic targeting guidance rather than mandatory repeated page copy.

### Core Promise and Voice
- Message hierarchy: lead with payroll overpayment reduction, then compliance confidence, then payroll/admin time saved.
- Voice style: founder-direct headlines plus professional, proof-led body copy.

### Claims Policy
- Allow stronger numeric claims in page copy when useful for conversion.
- Planner/research should define where hard numbers can be reused safely and where contextual proof should be added to reduce trust risk.

### Claude's Discretion
- Exact template formulas for each title/description family.
- How strict uniqueness checks should be implemented (build-time script, test, CI check, or mixed).
- Exact copy placements for ICP language across each page type.

</decisions>

<specifics>
## Specific Ideas

- Use practical wording like "for teams running multiple crews" instead of rigid qualifier language in public-facing copy.
- Keep conversion-forward claims tone rather than purely conservative positioning.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/seo.ts` (`createPageMetadata`, `siteConfig`, JSON-LD objects): current SEO helper and best extension point for typed metadata contract.
- Route-level `generateMetadata` implementations in dynamic templates (`/features/[slug]`, `/industries/[slug]`, `/guides/[slug]`, `/case-studies/[slug]`, `/blog/[slug]`): existing integration points for contract adoption.
- `app/layout.tsx` structured data injection (`Organization` + `WebSite`): baseline JSON-LD pattern to extend.

### Established Patterns
- Most pages already call `createPageMetadata`; missing rigor is policy consistency, not missing plumbing.
- Not-found routes already use `noIndex` fallback metadata in template pages.
- Sitemap generation uses combined static route list + dynamic slugs sourced from `lib/*` modules.

### Integration Points
- `lib/seo.ts` for metadata contract and canonical policy utilities.
- `app/layout.tsx` for global schema output and root metadata defaults.
- `app/robots.ts` and `app/sitemap.ts` for crawl/index policy expression.
- Dynamic route page files for template-level metadata standardization.

</code_context>

<deferred>
## Deferred Ideas

- None - discussion stayed within Phase 1 scope.

</deferred>

---

*Phase: 01-seo-and-positioning-foundation*
*Context gathered: 2026-03-01*
