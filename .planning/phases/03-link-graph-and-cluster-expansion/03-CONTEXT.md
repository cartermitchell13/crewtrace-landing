# Phase 3: Link Graph and Cluster Expansion - Context

**Gathered:** 2026-03-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Improve crawl depth and relevance flow across existing and newly added feature/industry pages by enforcing deterministic internal-link graph rules and safe expansion criteria. This phase covers link graph behavior and expansion governance, not new standalone capabilities.

</domain>

<decisions>
## Implementation Decisions

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

</decisions>

<specifics>
## Specific Ideas

- User delegated decision-making to builder defaults for Phase 3 so planning can proceed immediately.
- Favor deterministic rule systems over editorial/manual curation for internal links.
- Preserve current typed-contract architecture and extend checks instead of introducing parallel data sources.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/solutions.ts`: Feature records, slugs, and relationship contract (`relatedIndustries`).
- `lib/industries.ts`: Industry records, slugs, priority-trade contract, and relationship contract (`relatedSolutions`).
- `app/features/page.tsx` and `app/industries/page.tsx`: Existing parent hub crawl surfaces.
- `app/features/[slug]/page.tsx` and `app/industries/[slug]/page.tsx`: Existing detail-page related-link surfaces.
- `app/sitemap.ts`: Indexable dynamic URL generation for features/industries.
- `lib/__tests__/cluster-content.test.ts`, `lib/__tests__/cluster-coverage.test.ts`, `scripts/seo/check-cluster-content.mjs`: Existing guardrail patterns to extend.

### Established Patterns
- Contract-first cluster data model in `lib/*` with list + map exports.
- Deterministic ordering already used in hubs/details (priority + alphabetical sort patterns).
- Guardrails implemented in both Vitest and script checks; regressions are treated as quality gates.

### Integration Points
- Add/extend graph helper logic in `lib/` and consume from both feature/industry detail routes.
- Extend existing SEO guardrail script for orphan and reciprocity checks.
- Add/extend Vitest coverage for graph rules and expansion eligibility.
- Keep sitemap and route policy behavior aligned with expanded indexable pages.

</code_context>

<deferred>
## Deferred Ideas

- Link graph expansion beyond feature/industry clusters (for example, guides/case studies/blog graph rules) belongs to a future phase.
- Behavior based on live performance signals (analytics-driven dynamic link reshuffling) is out of scope for this phase.

</deferred>

---

*Phase: 03-link-graph-and-cluster-expansion*
*Context gathered: 2026-03-03*
