# Phase 4: Competitor and Authority Content - Research

**Researched:** 2026-03-03
**Domain:** Competitor-intent SEO pages and authority-content reinforcement for Connecteam and Workyard
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked decisions
- Use dedicated competitor routes, not only embedded sections.
- Keep competitor pages out of homepage and primary navigation.
- Use typed `lib/*` records as source of truth for competitor content.
- Initial competitor depth is one core page each for Connecteam and Workyard.
- Link competitor pages contextually to relevant feature + industry + one proof asset.
- Include competitor pages in sitemap and contextual internal links.
- Use soft consultative CTAs on competitor-intent pages.

### Safe-claims policy and freshness
- Tone should stay neutral and factual with best-fit framing.
- Comparison freshness needs explicit review timestamp/cadence fields.
- Unknown details may appear in inferred framing, but implementation still needs explicit claim-safety metadata to avoid unsafe copy drift.

### Claude's discretion
- Final route taxonomy and URL naming.
- Canonical implementation details and anti-cannibalization strategy.
- Operational freshness cadence implementation details.

### Deferred ideas
- None.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| COMP-01 | Keyword and SERP tracking explicitly includes Connecteam and Workyard target terms. | Add typed keyword-map records plus machine-checked docs matrix to keep terms explicit and auditable. |
| COMP-02 | Content strategy includes safe, factual competitor-intent pages or sections designed to outrank both competitors. | Build dedicated competitor pages with claim-safety fields, freshness metadata, and contextual links into feature/industry/proof assets. |
</phase_requirements>

## Summary

This phase can be implemented fully with existing patterns: typed `lib/*` contracts, dynamic App Router pages, centralized metadata helpers, and script/test guardrails. No external service or dependency is required.

The lowest-risk architecture is:
1. Add a typed competitor contract module for Connecteam and Workyard that contains keyword clusters, SERP targets, claim-safety notes, and freshness metadata.
2. Render dedicated competitor pages from that module under a deterministic route family (for example `/compare/[slug]`).
3. Keep pages crawlable through sitemap and contextual internal links, while intentionally excluding any competitor entry points from navbar/homepage surfaces.
4. Add automated checks that fail on missing competitor coverage, missing freshness metadata, or broken links to supporting authority assets.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|-------------|
| `next` | `16.1.6` | App Router pages, sitemap, metadata generation | Existing route and SEO infrastructure already in place |
| `typescript` | `^5` | Typed competitor contracts and link mapping | Current cluster architecture is contract-first |
| `vitest` | `^4.0.18` | Contract and regression assertions | Existing SEO/cluster checks already use Vitest |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `eslint` + `eslint-config-next` | existing | Lint checks on route/data/script changes | All touched files in this phase |
| Node script runner | existing | Script-level validation under `scripts/seo` | Fast CI/local checks for competitor contracts |

### Alternatives considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Typed local competitor contracts | CMS/external source | Adds operational complexity and drift risk before model is proven |
| Script + Vitest guardrails | Manual editorial review only | Increases regression risk and weakens repeatability |

## Architecture Patterns

### Pattern 1: Contract-first competitor source of truth
Create `lib/competitors.ts` with two records (`connecteam`, `workyard`) and structured fields:
- keyword clusters and SERP intents
- comparison sections with safety notes
- freshness metadata (`lastReviewedOn`, `reviewCadenceDays`)
- contextual link targets to features/industries/guides/case studies

### Pattern 2: Dedicated competitor route family with controlled visibility
Use dedicated pages under a route family (for example `/compare/[slug]`) with:
- `generateStaticParams` from competitor slugs
- metadata via `createPageMetadata`
- `Article` + `Breadcrumb` schema via `lib/schema`
- no primary nav entry and no homepage hero link

### Pattern 3: Authority reinforcement through contextual linking
Ensure competitor pages always connect to:
- at least one relevant feature page
- at least one relevant industry page
- at least one proof asset (guide/case study/blog)

This directly supports COMP-02 while reinforcing existing cluster pathways.

### Pattern 4: Freshness and safety guardrails
Add `lib/__tests__/competitor-content.test.ts` and `scripts/seo/check-competitor-content.mjs` checks to block:
- missing competitor coverage (both Connecteam and Workyard required)
- missing/expired freshness metadata
- missing contextual proof links
- broken slug references into linked feature/industry/authority assets

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Metadata/canonical logic | Route-local metadata objects everywhere | `createPageMetadata` + `lib/seoPolicy.ts` | Keeps canonical/indexing behavior centralized |
| Link validation | Manual spot checks | Vitest + `scripts/seo/*` checks | Existing project pattern for SEO contracts |
| Competitor page content source | Hardcoded JSX-only copy | Typed `lib/competitors.ts` records | Scalable and machine-checked |

## Common Pitfalls

### Pitfall 1: Competitor pages become too visible in navigation
**What goes wrong:** Competitor routes leak into primary nav and change brand-positioning surface.
**Avoid:** Keep discoverability to sitemap + contextual links only.

### Pitfall 2: Unsafe or stale comparison claims
**What goes wrong:** Claims become outdated or unsupported.
**Avoid:** Enforce freshness metadata and claim-safety fields, then fail checks if missing.

### Pitfall 3: Cannibalization with feature/industry intent pages
**What goes wrong:** Competitor pages and feature/industry pages fight for same query intent.
**Avoid:** Use explicit primary-intent fields and route-specific canonical ownership guidance in docs.

## Code Examples

Verified local patterns that should be reused:

### Existing metadata helper pattern
```typescript
// Source: lib/seo.ts
createPageMetadata({ title, description, path });
```

### Existing dynamic route pattern
```typescript
// Source: app/features/[slug]/page.tsx
export function generateStaticParams() {
  return featureSlugs.map((slug) => ({ slug }));
}
```

### Existing sitemap contract pattern
```typescript
// Source: app/sitemap.ts
const featureEntries = [...solutionSlugs].sort().map((slug) => ({ ... }));
```

### Existing guardrail script pattern
```typescript
// Source: scripts/seo/check-cluster-content.mjs
ensure(condition, "message", errors);
```

## Open Questions

1. Should competitor detail pages live under `/compare/*` or `/alternatives/*` for best long-term taxonomy consistency?
2. What exact freshness SLA should be enforced first (`30` vs `60` days) given current publishing bandwidth?

## Sources

### Primary (HIGH confidence)
- `.planning/phases/04-competitor-and-authority-content/04-CONTEXT.md`
- `.planning/ROADMAP.md`
- `.planning/REQUIREMENTS.md`
- `app/features/[slug]/page.tsx`
- `app/industries/[slug]/page.tsx`
- `app/sitemap.ts`
- `lib/seo.ts`
- `lib/seoPolicy.ts`
- `lib/guides.ts`
- `lib/caseStudies.ts`
- `scripts/seo/check-cluster-content.mjs`

### Secondary (MEDIUM confidence)
- `.planning/codebase/ARCHITECTURE.md`
- `.planning/codebase/CONVENTIONS.md`
- `.planning/codebase/TESTING.md`

### Tertiary (LOW confidence)
- None.

## Metadata

**Research date:** 2026-03-03
**Valid until:** 2026-04-02
