# Phase 3: Link Graph and Cluster Expansion - Research

**Researched:** 2026-03-03
**Domain:** Deterministic internal link graph modeling for Next.js SEO clusters
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
### Relevance and Link-Graph Rules
- Use existing contract relationships as graph source of truth:
  - `feature.relatedIndustries` in `lib/solutions.ts`
  - `industry.relatedSolutions` in `lib/industries.ts`
- Enforce reciprocal cross-cluster relationships:
  - If feature `A` links to industry `B`, industry `B` must link back to feature `A`.
- Add deterministic sibling-link rules inside each cluster:
  - Siblings are ranked by overlap count of opposite-cluster relationships.
  - Tie-break by stable alphabetical slug order.
- Each detail page must expose parent + cross-cluster + sibling links so no indexable feature/industry detail page is orphaned.

### Link Surface and Density
- Keep all feature and industry hub pages as complete parent surfaces that link to all detail pages.
- On each detail page:
  - Keep cross-cluster "recommended" links (already present) and make them deterministic.
  - Add same-cluster sibling links from ranking rules above.
  - Keep link count bounded (target 3-5 per block) to stay readable while preserving crawl paths.
- Preserve current contract-backed rendering pattern; no route-local hardcoded link sets.

### Expansion Eligibility Rules
- A new feature/industry page is eligible only if all are true:
  - Has unique `primaryIntent` within its cluster.
  - Has at least one valid reciprocal cross-cluster relationship.
  - Can participate in sibling ranking with at least one relevant same-cluster sibling.
  - Is indexable and included in sitemap generation path.
- Intent ownership remains non-overlapping and machine-checked before merge.

### Validation and Release Gates
- Treat these as blocking checks (CI/local):
  - No orphaned indexable feature/industry detail pages.
  - Reciprocal cross-cluster link integrity.
  - Unique `primaryIntent` ownership per cluster.
  - Expansion records satisfy eligibility requirements above.
- Keep existing script/test guardrail model and extend it rather than introducing a separate validator framework.

### Claude's Discretion
- Exact sibling relevance scoring formula (as long as deterministic and overlap-based).
- Final per-template link-count cap within the agreed 3-5 range.
- Exact copy/labels for sibling link sections.
- Test naming/file split strategy, as long as checks remain in existing guardrail pattern.

### Deferred Ideas (OUT OF SCOPE)
- Link graph expansion beyond feature/industry clusters (for example, guides/case studies/blog graph rules) belongs to a future phase.
- Behavior based on live performance signals (analytics-driven dynamic link reshuffling) is out of scope for this phase.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CLUS-04 | Every indexable feature/industry page has at least one parent and one sibling internal link. | Deterministic graph helper design, sibling ranking rules, and guardrail checks that detect missing parent/sibling relationships. |
</phase_requirements>

## Summary

The current codebase already has contract-backed cluster data (`lib/solutions.ts`, `lib/industries.ts`), hub/detail rendering, and script/test guardrails. Phase 3 should extend this foundation instead of introducing a new architecture. The most reliable implementation path is to centralize link-graph derivation in a dedicated `lib/` helper module, then consume those outputs in both feature and industry detail templates and in automated checks.

No new third-party libraries are required. Existing stack (Next.js 16 + TypeScript + Vitest + script-level SEO checks) is sufficient to compute deterministic siblings, enforce reciprocity, and block orphan regressions. This keeps implementation low-risk and consistent with current project conventions.

Primary recommendation: implement graph derivation and validation as deterministic pure functions in `lib/`, wire detail templates to those functions, and extend existing Vitest + `scripts/seo/check-cluster-content.mjs` checks to make CLUS-04 a merge gate.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | `16.1.6` | App Router rendering, route generation, metadata | Existing production framework for all templates and sitemap generation in this repo |
| `typescript` | `^5` | Typed contract modeling for cluster records and graph helpers | Current data-contract and guardrail pattern is TypeScript-first |
| `vitest` | `^4.0.18` | Fast contract and regression tests | Existing cluster checks already run here |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Node runtime (`vm`, `typescript` transpile) | existing | Script-level contract validation in `scripts/seo/check-cluster-content.mjs` | For pre-build/CI guardrails independent of app runtime |
| `eslint` + `eslint-config-next` | existing | Static quality checks for route/template changes | Run for touched files and final phase verification |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Internal deterministic graph helpers | External graph libraries | Unnecessary dependency for a small, static relationship graph; adds complexity without clear benefit |
| Script + Vitest dual guardrails | Test-only validation | Loses one enforcement path in CI/local workflows and weakens defense-in-depth pattern already established |

**Installation:**
```bash
# No new dependencies required for this phase.
```

## Architecture Patterns

### Recommended Project Structure
```text
lib/
|-- solutions.ts                # feature contracts
|-- industries.ts               # industry contracts
|-- clusterLinkGraph.ts         # new deterministic graph derivation (phase 3)
|-- __tests__/
    |-- cluster-content.test.ts
    |-- cluster-coverage.test.ts
    |-- cluster-link-graph.test.ts   # new graph behavior tests (phase 3)
scripts/seo/
|-- check-cluster-content.mjs   # extended orphan/reciprocity validation
app/features/[slug]/page.tsx    # consumes graph outputs for siblings
app/industries/[slug]/page.tsx  # consumes graph outputs for siblings
```

### Pattern 1: Contract-first graph derivation
**What:** Build link graph from existing contract arrays/maps, not route-local data.
**When to use:** Any time sibling/cross-cluster links are rendered or validated.
**Example:**
```typescript
// Source: local code pattern in lib/solutions.ts and lib/industries.ts
const featureSlugSet = new Set(featureSlugs);
const industrySlugSet = new Set(industrySlugs);
```

### Pattern 2: Deterministic ordering
**What:** Rank by relevance metric, then tie-break alphabetically by slug.
**When to use:** Sibling recommendations and consistent UI rendering.
**Example:**
```typescript
siblings.sort((a, b) => {
  if (b.overlapScore !== a.overlapScore) return b.overlapScore - a.overlapScore;
  return a.slug.localeCompare(b.slug);
});
```

### Pattern 3: Dual enforcement (tests + script)
**What:** Keep invariants in both Vitest and Node script checks.
**When to use:** Requirements that must block regressions in multiple execution contexts.
**Example:**
```typescript
// Source: lib/__tests__/cluster-content.test.ts
expectUnique(featureRecords.map((feature) => feature.primaryIntent), "feature primaryIntent");
```

### Anti-Patterns to Avoid
- Computing siblings ad hoc in each route file (drift risk between templates).
- Non-deterministic ordering (unstable UI snapshots and crawl surfaces).
- Validation that only checks presence, not bidirectional integrity or orphan state.
- Adding expansion pages without proving parent/sibling coverage.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Relationship storage | New ad hoc JSON/route-local maps | Existing typed contracts in `lib/solutions.ts` + `lib/industries.ts` | Prevents parallel data sources and drift |
| Enforcement pipeline | New standalone validator framework | Existing Vitest + `scripts/seo/check-cluster-content.mjs` pattern | Already integrated, maintainable, and familiar |
| Rendering sort logic | Per-component custom ranking rules | Shared pure helper functions in `lib/` | Guarantees deterministic behavior across templates |

**Key insight:** phase success depends on consistent graph logic reused everywhere, not on adding more systems.

## Common Pitfalls

### Pitfall 1: Asymmetric links
**What goes wrong:** Feature links to industry, but industry does not link back.
**Why it happens:** One-directional edits to relationship arrays.
**How to avoid:** Add reciprocity checks in both tests and script validation.
**Warning signs:** Script/test passes for slug existence but fails new reciprocity assertion.

### Pitfall 2: Hidden orphans after expansion
**What goes wrong:** New page is indexable but has no sibling links or missing parent path.
**Why it happens:** Expansion focuses on content records only, not graph completeness.
**How to avoid:** Encode eligibility checks for parent + sibling coverage before merge.
**Warning signs:** Page appears in sitemap but not in expected hub/detail link surfaces.

### Pitfall 3: Non-deterministic sibling surfaces
**What goes wrong:** Link order changes across edits/builds without relevance change.
**Why it happens:** Sorting by mutable display text only or omitting tie-break rules.
**How to avoid:** Use numeric score then slug-based tie-break.
**Warning signs:** Snapshot churn and inconsistent "recommended" order across pages.

## Code Examples

Verified patterns from current repository:

### Existing contract-based link references
```typescript
// Source: app/features/page.tsx
{sortIndustrySlugs(feature.relatedIndustries).map((industrySlug) => (
  <Link key={industrySlug} href={`/industries/${industrySlug}`}>
    {toIndustryName(industrySlug)}
  </Link>
))}
```

### Existing required-trade regression guardrail
```typescript
// Source: scripts/seo/check-cluster-content.mjs
const linkedFromFeatures = featureRecords.some((feature) =>
  feature.relatedIndustries.includes(requiredSlug),
);
ensure(
  linkedFromFeatures,
  `required priority trade "${requiredSlug}" must be referenced by at least one feature`,
  errors,
);
```

### Existing sitemap source-of-truth pattern
```typescript
// Source: app/sitemap.ts
const industryEntries = industrySlugs.map((slug) => ({
  url: `${siteConfig.url}/industries/${slug}`,
}));
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Route-local page data and manual link surfaces | Typed contract modules + generated hubs/details | Phase 2 (2026-03-01 to 2026-03-02) | Enabled deterministic expansion and machine-checkable ownership |
| Coverage as doc-only policy | Coverage encoded in code + tests + script checks | Phase 2 Plan 03 | Regressions can be blocked automatically |

**Deprecated/outdated:**
- Hand-maintained route-local cluster datasets.
- Expansion decisions without corresponding guardrails.

## Open Questions

1. **Expansion record source for Phase 3 plan 02**
   - What we know: New pages must meet strict eligibility rules.
   - What's unclear: Exact source and quantity of new expansion records for this phase.
   - Recommendation: Keep plan 02 flexible on record count but strict on eligibility + validation gates.

2. **Sibling link surface placement**
   - What we know: Detail templates already have related-link sections.
   - What's unclear: Final UI placement and labeling for same-cluster siblings.
   - Recommendation: Implement in existing related sections with deterministic ordering and cap 3-5 links.

## Sources

### Primary (HIGH confidence)
- Local code: `lib/solutions.ts`, `lib/industries.ts` - contract schema and relationship source of truth.
- Local code: `app/features/[slug]/page.tsx`, `app/industries/[slug]/page.tsx` - existing detail link surfaces.
- Local code: `lib/__tests__/cluster-content.test.ts`, `lib/__tests__/cluster-coverage.test.ts` - current guardrail/test patterns.
- Local code: `scripts/seo/check-cluster-content.mjs` - script-level integrity enforcement.
- Local docs: `.planning/phases/03-link-graph-and-cluster-expansion/03-CONTEXT.md` - locked implementation decisions.
- Local docs: `.planning/REQUIREMENTS.md` - CLUS-04 requirement definition.

### Secondary (MEDIUM confidence)
- Local architecture maps: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/TESTING.md`, `.planning/codebase/CONVENTIONS.md`.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - exact versions and scripts come from local `package.json`.
- Architecture: HIGH - derived from existing production code paths and enforced contracts.
- Pitfalls: HIGH - directly inferred from current guardrails and known failure modes in this repo.

**Research date:** 2026-03-03
**Valid until:** 2026-04-02
