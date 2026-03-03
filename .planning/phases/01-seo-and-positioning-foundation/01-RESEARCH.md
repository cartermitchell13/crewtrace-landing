# Phase 1: SEO and Positioning Foundation - Research

**Researched:** 2026-03-01
**Domain:** Next.js App Router SEO governance (metadata, indexing, schema, and messaging contracts)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Use one typed metadata contract in `lib/seo.ts` as the source of truth for indexable pages.
- Keep canonical values as normalized route paths (relative), with `metadataBase` responsible for absolute resolution.
- Use self-canonical URLs for all indexable pages, including hubs and detail pages (no cross-canonicalization between templates).
- Use deterministic per-template title/description patterns and add uniqueness checks to catch conflicts.
- Do not force exact numeric qualifier wording (for example, "11-50 employees" and "$500k-$5M") into all public pages.
- Public-facing copy should frame the ICP more naturally as businesses running multiple crews in the U.S.
- Keep strict numeric ICP qualifiers as internal strategic targeting guidance rather than mandatory repeated page copy.
- Message hierarchy: lead with payroll overpayment reduction, then compliance confidence, then payroll/admin time saved.
- Voice style: founder-direct headlines plus professional, proof-led body copy.
- Allow stronger numeric claims in page copy when useful for conversion.

### Claude's Discretion
- Exact template formulas for each title/description family.
- How strict uniqueness checks should be implemented (build-time script, test, CI check, or mixed).
- Exact copy placements for ICP language across each page type.

### Deferred Ideas (OUT OF SCOPE)
- None - discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TGT-01 | Target U.S. crew-based businesses in construction-adjacent trades | Messaging guardrail doc + page-level copy checks |
| TGT-02 | Reflect ICP range in positioning | Internal qualifier policy + public multi-crew wording rules |
| TGT-03 | Reinforce money saved, compliance, admin time saved | Ordered promise framework + template copy updates |
| TGT-04 | Founder-direct plus professional clarity | Voice rubric + lintable phrase guardrails |
| SEO-01 | Unique title/description/canonical from one contract | Typed metadata registry + uniqueness checks |
| SEO-02 | Correct noindex/index directives | Shared indexability policy consumed by metadata + robots |
| SEO-03 | Sitemap from one source of truth | Route registry used by sitemap generation |
| SEO-04 | Required schema on core templates | Typed JSON-LD builders + template mapping matrix |
| SEO-05 | Canonical ownership rules documented | Canonical policy doc + test assertions |
| SEO-06 | Core Web Vitals budgets defined and enforced | Budget doc + automated contract check in CI command path |
</phase_requirements>

<research_summary>
## Summary

The existing codebase already has strong primitives: a centralized `createPageMetadata` helper, App Router `sitemap.ts` and `robots.ts`, and global Organization/WebSite JSON-LD in `app/layout.tsx`. The core gap is governance consistency, not missing infrastructure. Phase 1 should therefore standardize policy contracts and verification checks around the current implementation instead of introducing a new framework.

For metadata/indexing, the lowest-risk path is a typed route policy registry that controls canonical ownership, indexability, and metadata patterns in one place, then feeds both route-level metadata and crawl endpoints. This removes drift between `createPageMetadata`, `robots.ts`, and `sitemap.ts`.

For schema and messaging, the best approach is similarly contract-first: schema builders per template type and a guardrail document plus lintable copy checks for ICP/voice/claims. This keeps future Phase 2+ scale work data-driven and avoids ad-hoc SEO regressions.

**Primary recommendation:** Implement policy-as-code in three focused plans: metadata/indexing contract, schema baseline contract, and messaging guardrail contract.
</research_summary>

<standard_stack>
## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | Metadata API, App Router, sitemap/robots routes | Native and already in use across pages |
| react | 19.2.3 | Template rendering and JSON-LD script mounting | Existing runtime standard in repo |
| typescript | 5.x | Typed SEO contracts and policy maps | Prevents route/policy drift |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| vitest | 4.0.18 | Fast policy/schema unit checks | Contract validation and regression guards |
| eslint | 9.x | Static checks for copy or metadata anti-patterns | Gate policy drift in CI |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native Next metadata APIs | Third-party SEO library | Adds abstraction cost with no clear gain for current architecture |
| Custom runtime page crawling for checks | Static route registry checks | Runtime crawling is heavier and less deterministic in CI |

**Installation:**
```bash
# Existing stack already includes required packages.
# Optional scripts only:
npx vitest run
```
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Recommended Project Structure
```text
lib/
  seo.ts                  # Existing metadata helper, kept as public entrypoint
  seoPolicy.ts            # New: typed canonical/indexability/title policy map
  schema.ts               # New: JSON-LD builders by template type
scripts/
  seo/
    check-seo-contract.mjs
    check-schema-presence.mjs
    check-messaging-guardrails.mjs
docs/
  seo/
    canonical-and-indexing-policy.md
    schema-matrix.md
    icp-messaging-guardrails.md
```

### Pattern 1: Single SEO Policy Registry
**What:** Define route ownership, indexability, and title/description patterns in one typed module.
**When to use:** Any logic that influences metadata, robots, or sitemap.
**Example:**
```typescript
type PageKind = "home" | "feature_detail" | "industry_detail" | "utility";

interface SeoPolicy {
  pageKind: PageKind;
  canonicalPath: string;
  indexable: boolean;
}
```

### Pattern 2: Template-Level Schema Builders
**What:** Export reusable builder functions for Organization/WebSite, Article, FAQPage, BreadcrumbList.
**When to use:** Any template that should emit JSON-LD.
**Example:**
```typescript
export function articleSchema(input: {
  headline: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: input.url,
  };
}
```

### Anti-Patterns to Avoid
- **Per-page ad-hoc metadata rules:** eventually creates duplicate titles and canonical drift.
- **Schema copy/paste JSON blocks:** leads to template mismatch and stale fields.
- **Public copy hardcoding strict numeric ICP qualifiers everywhere:** conflicts with approved messaging style.
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Canonical URL normalization | Per-page path cleanup | Shared `normalizePath` + policy map | Centralized behavior avoids route drift |
| Sitemap crawl discovery | Runtime crawler in CI | Static registry + content slugs | Deterministic and faster |
| JSON-LD on each page | Inline repeated objects | Shared schema builders | Fewer regressions and easier audits |
| Messaging QA | Manual subjective review only | Scripted phrase/pattern checks + doc rubric | Scales guardrails as pages grow |

**Key insight:** Phase 1 succeeds by consolidating existing SEO primitives into explicit contracts and checks, not by adding new framework layers.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Metadata and sitemap policy diverge
**What goes wrong:** Pages are indexable in metadata but missing/incorrect in sitemap (or vice versa).
**Why it happens:** Separate policy logic in multiple files.
**How to avoid:** Use one route policy source consumed by both metadata and sitemap/robots.
**Warning signs:** Manual route lists in multiple places with partial overlap.

### Pitfall 2: Schema exists globally but not per template intent
**What goes wrong:** Organization/WebSite schema exists, but detail pages miss Article/FAQ/Breadcrumb context.
**Why it happens:** No template mapping matrix.
**How to avoid:** Track required schema by template and validate via script/test.
**Warning signs:** JSON-LD only in `app/layout.tsx`.

### Pitfall 3: Copy quality drifts during scale
**What goes wrong:** Inconsistent ICP language and claims style across pages.
**Why it happens:** No codified voice/claims rules.
**How to avoid:** Publish messaging guardrails and enforce with lintable checks.
**Warning signs:** Mixed qualifiers, conflicting promise order, unsupported numeric claims.
</common_pitfalls>

<code_examples>
## Code Examples

### Canonical policy entry
```typescript
export const seoPolicyByRoute = {
  "/industries": { pageKind: "industry_hub", indexable: true, canonicalPath: "/industries" },
  "/demo": { pageKind: "utility", indexable: false, canonicalPath: "/demo" },
} as const;
```

### Shared JSON-LD injection in template page
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(items)) }}
/>
```

### Messaging guardrail check sketch
```javascript
if (text.includes("11-50 employees")) {
  violations.push("Prefer public multi-crew phrasing; keep strict qualifiers in internal strategy docs.");
}
```
</code_examples>

<sota_updates>
## State of the Art (2024-2026)

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<Head>` tags per page | App Router `metadata` / `generateMetadata` | Next.js App Router era | Better type safety and consistency |
| SEO logic spread by template | Contract-first SEO policy modules | Modern large-site SEO ops | Easier automation and QA |
| Manual copy review only | Hybrid scripted checks + editorial review | Current SEO operations norm | Better consistency at scale |

**Deprecated/outdated:**
- Duplicating canonical logic in each route file.
- Treating JSON-LD as optional "later" work for detail templates.
</sota_updates>

<open_questions>
## Open Questions

1. **Should legal pages remain indexable for this milestone?**
   - What we know: `/privacy` and `/terms` are currently in sitemap.
   - What's unclear: Whether legal pages should be indexed or noindexed per SEO strategy.
   - Recommendation: Decide in Plan 01-01 and codify in route policy.

2. **How strict should numeric claim enforcement be in scripts?**
   - What we know: User approved stronger numeric claims, but wants natural public ICP phrasing.
   - What's unclear: Exact allowlist for sourced vs unsourced numbers.
   - Recommendation: Add explicit allowed claim contexts in messaging guardrail doc and check script.
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- Local codebase: `lib/seo.ts`, `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, and route templates under `app/`.
- Planning artifacts: `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/phases/01-seo-and-positioning-foundation/01-CONTEXT.md`.

### Secondary (MEDIUM confidence)
- Existing repository conventions in `.planning/codebase/*.md` used to align plan shape with current architecture.

### Tertiary (LOW confidence - needs validation)
- None.
</sources>

<metadata>
## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - already installed and in production use in this repo.
- Architecture: HIGH - aligns with existing code organization and Phase 1 scope.
- Pitfalls: HIGH - directly observed in current file patterns.
- Code examples: MEDIUM - pseudo-implementation patterns to be finalized during execution.

**Research date:** 2026-03-01
**Valid until:** 2026-04-01
</metadata>

---

*Phase: 01-seo-and-positioning-foundation*
*Research completed: 2026-03-01*
*Ready for planning: yes*
