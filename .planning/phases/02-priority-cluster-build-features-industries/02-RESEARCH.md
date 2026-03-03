# Phase 2: Priority Cluster Build (Features + Industries) - Research

**Researched:** 2026-03-01
**Domain:** Next.js App Router cluster scaling with typed content contracts, intent ownership rules, and crawl-path integrity
**Confidence:** HIGH

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CLUS-01 | Feature page templates are driven by typed data records, not hand-edited page files. | Extend `lib/solutions.ts` into explicit feature records with required typed fields and slug maps. |
| CLUS-02 | Industry page templates are driven by typed data records, not hand-edited page files. | Move inline industry page data into `lib/industries.ts` with typed records and exports used by both hub and detail routes. |
| CLUS-03 | Feature and industry hub pages provide crawlable navigation to all child pages. | Add `/features` hub route, refactor `/industries` hub to shared data, and enforce link completeness with checks. |
| CLUS-05 | Priority trade coverage includes construction, HVAC, waterproofing, general contractors, and landscaping. | Add explicit priority-trade coverage map and validation tests/scripts for minimum cluster presence. |
| CLUS-06 | Each feature/industry page maps to one primary search intent with non-overlapping URL ownership. | Add `primaryIntent` ownership fields and uniqueness checks across feature and industry records. |
</phase_requirements>

<research_summary>
## Summary

The codebase already has dynamic cluster routes (`/features/[slug]`, `/industries/[slug]`) and one typed feature data source (`lib/solutions.ts`). The largest gap is asymmetry: industry detail pages still carry a large inline object map, the `/features` hub route is missing, and intent ownership is not represented as a contract field. This means cluster growth will become fragile as page count rises.

The most reliable Phase 2 approach is contract-first expansion: define required typed fields for both clusters, centralize both data sources in `lib/`, and enforce intent/coverage rules through deterministic scripts and Vitest checks. Then refactor templates to consume those contracts and add missing crawl paths from hubs to all children.

**Primary recommendation:** Deliver Phase 2 in three plans: (1) contracts plus validators, (2) template/hub refactor to contract-backed sources, and (3) priority-trade and intent-ownership hardening with automated checks.
</research_summary>

<standard_stack>
## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App Router hubs/detail routes and metadata generation | Already used for all SEO templates and sitemap integration |
| react | 19.2.3 | Page rendering for hub/detail templates | Existing runtime standard in this repo |
| typescript | 5.x | Typed content contracts and compile-time safety | Strict mode already enabled in `tsconfig.json` |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| vitest | 4.0.18 | Contract and coverage regression tests | Data shape and intent-ownership assertions |
| eslint | 9.x | Static quality checks | Catch accidental drift in modified route/template files |
| node scripts (`scripts/seo/*.mjs`) | current repo pattern | CI-friendly SEO guardrails | Deterministic structural checks for links, intents, and coverage |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Script and test validation over local TS data | Runtime schema validation dependency (for example Zod) | New dependency and runtime overhead not required for this static-content architecture |
| Shared `lib/` data contracts | Inline page-local maps | Faster short term, but causes drift and blocks scalable generation |

**Installation:**
```bash
# Existing stack already covers this phase.
# No required new package installation.
npx vitest run
```
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Recommended Project Structure
```text
lib/
  solutions.ts                 # Feature records (typed)
  industries.ts                # Industry records (typed, new)
app/
  features/page.tsx            # Feature hub (new)
  features/[slug]/page.tsx     # Feature detail from typed records
  industries/page.tsx          # Industry hub from typed records
  industries/[slug]/page.tsx   # Industry detail from typed records
scripts/
  seo/check-cluster-content.mjs  # Intent + coverage guardrails (new)
docs/
  seo/cluster-intent-ownership.md
  seo/priority-cluster-coverage.md
```

### Pattern 1: Dual-Cluster Typed Contract
**What:** Define explicit required fields for feature and industry records, including `slug`, `primaryKeyword`, `primaryIntent`, and relationship links.
**When to use:** Any page render, sitemap generation, or linking logic in the feature/industry clusters.
**Example:**
```typescript
export interface IndustryRecord {
  slug: string;
  name: string;
  primaryKeyword: string;
  primaryIntent: string;
  relatedSolutions: string[];
}
```

### Pattern 2: Slug and Ownership Utilities
**What:** Export list and map helpers (`industrySlugs`, `industryBySlug`, `featureSlugs`) from contract modules.
**When to use:** `generateStaticParams`, metadata lookup, sitemap generation, and hub rendering.
**Example:**
```typescript
export const industrySlugs = industries.map((industry) => industry.slug);
export const industryBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
```

### Pattern 3: Guardrail-First Cluster Validation
**What:** Validate non-overlapping `primaryIntent` ownership and priority-trade coverage using scripts and tests.
**When to use:** Before merge and during CI checks.
**Example:**
```javascript
if (duplicateIntents.length > 0) {
  throw new Error(`Duplicate primaryIntent values: ${duplicateIntents.join(", ")}`);
}
```

### Anti-Patterns to Avoid
- **Inline industry detail data in route files:** locks content and rendering together, making expansion brittle.
- **Hardcoded slug arrays in sitemap or hubs:** quickly drifts from source-of-truth records.
- **Missing explicit intent ownership field:** creates hidden cannibalization risk.
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cluster page inventory | Multiple ad-hoc slug lists per file | Exported slug arrays from shared data modules | One source of truth for routing and sitemap |
| Intent ownership checks | Manual spreadsheet-only review | Scripted duplicate-intent guardrails | Repeatable, CI-safe, and less error-prone |
| Hub link completeness checks | Visual spot checks only | Deterministic script/test assertions against record counts | Catches missing links before publish |
| Record shape safety | Unstructured inline objects | Typed interfaces plus fixture-style tests | Keeps contracts stable during scale |

**Key insight:** Phase 2 is mostly an information-architecture hardening phase; deterministic contracts and checks matter more than UI novelty.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Feature and industry records diverge in shape
**What goes wrong:** Templates need conditional logic for mismatched fields and regress over time.
**Why it happens:** Data contracts are implicit and maintained in separate ad-hoc structures.
**How to avoid:** Define required interfaces and exported helpers for both clusters.
**Warning signs:** Frequent `if (!field)` guards and repeated data normalization in page files.

### Pitfall 2: Hub pages fail to expose complete crawl paths
**What goes wrong:** Some detail pages exist in code/sitemap but are hard to discover via internal links.
**Why it happens:** Hubs are not generated from the same source as detail routes.
**How to avoid:** Render hubs from typed records and add script checks for child-link completeness.
**Warning signs:** Detail slug appears in `generateStaticParams` but not hub page output.

### Pitfall 3: Intent cannibalization introduced by new pages
**What goes wrong:** Multiple URLs target the same primary intent, competing against each other.
**Why it happens:** Intent ownership is not an explicit field and is not validated.
**How to avoid:** Add `primaryIntent` field and enforce uniqueness across each cluster.
**Warning signs:** Duplicate keyword/intent labels in records or docs.
</common_pitfalls>

<code_examples>
## Code Examples

### Shared cluster record and map export
```typescript
export const industryBySlug = Object.fromEntries(
  industries.map((industry) => [industry.slug, industry])
) as Record<string, IndustryRecord>;
```

### Static params from typed record exports
```typescript
export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}
```

### Priority coverage assertion pattern
```typescript
const requiredTrades = ["construction", "hvac", "waterproofing", "general-contractors", "landscaping"];
for (const trade of requiredTrades) {
  expect(priorityCoverage.has(trade)).toBe(true);
}
```
</code_examples>

<sota_updates>
## State of the Art (2024-2026)

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hand-authored individual SEO page files | Typed record-driven route generation | Mature pSEO operations pattern | Faster scale with lower drift |
| Keyword targeting tracked outside code only | Intent ownership encoded in data contracts | Current SEO ops best practice | Reduces cannibalization mistakes |
| Hub pages curated manually | Hub pages rendered from contracts and verified by scripts | Modern content-platform pattern | Stronger crawl consistency |

**Deprecated/outdated:**
- Keeping major cluster data inside route component files.
- Relying on sitemap presence alone to prove crawlability.
</sota_updates>

<open_questions>
## Open Questions

1. **How broad should non-priority trade support remain in v1?**
   - What we know: Phase requirement explicitly prioritizes five trades.
   - What's unclear: Whether existing non-priority trades should remain visible or be de-emphasized.
   - Recommendation: Keep non-priority records allowed, but enforce explicit coverage checks for the five required trades.

2. **Should intent uniqueness be enforced globally or per cluster?**
   - What we know: CLUS-06 requires non-overlapping URL ownership for feature and industry pages.
   - What's unclear: Whether collisions between a feature and industry intent string are acceptable.
   - Recommendation: Enforce uniqueness per cluster in Phase 2, then evaluate cross-cluster ownership in Phase 3 link-graph work.
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- Local codebase: `app/features/[slug]/page.tsx`, `app/industries/page.tsx`, `app/industries/[slug]/page.tsx`, `app/sitemap.ts`, `lib/solutions.ts`.
- Planning artifacts: `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, and Phase 1 summaries.
- Local research notes: `.planning/research/PITFALLS.md`.

### Secondary (MEDIUM confidence)
- `.planning/codebase/ARCHITECTURE.md`, `STACK.md`, `CONVENTIONS.md`, and `TESTING.md` for established repo patterns.

### Tertiary (LOW confidence - needs validation)
- None.
</sources>

<metadata>
## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - existing dependencies and tooling already support required work.
- Architecture: HIGH - recommendations align with current route/data module architecture.
- Pitfalls: HIGH - directly observed in current cluster implementation.
- Code examples: MEDIUM - illustrative patterns to be finalized during execution.

**Research date:** 2026-03-01
**Valid until:** 2026-04-01
</metadata>

---

*Phase: 02-priority-cluster-build-features-industries*
*Research completed: 2026-03-01*
*Ready for planning: yes*
