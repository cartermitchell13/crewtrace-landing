# Pitfalls Research

**Domain:** SEO growth loop implementation on existing production marketing site
**Researched:** 2026-03-03
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Reporting Trust Erosion from Data Mismatch

**What goes wrong:** Teams stop using outputs because booking totals and page metrics do not align.

**Why it happens:** URL normalization and attribution fields are inconsistent between sources.

**How to avoid:** Enforce one canonical mapping layer and contract validation before scoring/reporting.

**Warning signs:** Frequent manual reconciliation and unexplained report deltas week-to-week.

**Phase to address:** Phase 7 (production data integration).

---

### Pitfall 2: Prioritization Theater

**What goes wrong:** A scoring model exists, but execution still follows intuition.

**Why it happens:** Score outputs do not produce concrete action items with owners.

**How to avoid:** Emit ranked backlog artifacts with action type, rationale, and owner workflow.

**Warning signs:** Same pages remain on backlog for weeks with no movement.

**Phase to address:** Phase 8 (opportunity scoring + backlog ops).

---

### Pitfall 3: Expansion Without Guardrails

**What goes wrong:** New clusters increase page count but reduce quality and conversion rate.

**Why it happens:** Template growth outpaces intent ownership and quality checks.

**How to avoid:** Require contract checks, intent ownership, and hub/sitemap linkage before publish.

**Warning signs:** Index growth without proportional clicks/booked calls.

**Phase to address:** Phase 9 (programmatic expansion).

---

### Pitfall 4: CRO Noise Instead of Signal

**What goes wrong:** Experiments run but results are inconclusive or misleading.

**Why it happens:** No minimum sample or confidence thresholds; segmentation is too broad.

**How to avoid:** Define experiment contract with stopping rules and cluster/template segmentation.

**Warning signs:** Frequent reversals and contradictory experiment conclusions.

**Phase to address:** Phase 10 (CRO experimentation).

---

### Pitfall 5: Permanent Partial Quality Gates

**What goes wrong:** Scoped lint gates remain forever and technical debt compounds.

**Why it happens:** No dedicated phase to retire legacy lint debt.

**How to avoid:** Isolate and resolve debt in a milestone phase with clear exit criteria.

**Warning signs:** Repeated TODOs for global lint with no timeline.

**Phase to address:** Phase 11 (platform hardening).

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Manual metric patching in reports | Fast weekly fix | Hidden drift and non-repeatable ops | Only emergency one-off with follow-up fix ticket |
| Shipping new templates without score-based prioritization | Faster content output | Lower ROI and strategy thrash | Rarely, only for urgent business priority |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Search performance data | Using page paths without canonical normalization | Normalize URLs first, then aggregate. |
| Booking/CRM data | Missing deterministic event IDs | Require event IDs and timestamp normalization at ingest. |
| Analytics events | Mixing first-touch and last-touch semantics | Preserve first-touch as canonical SEO attribution dimension. |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Full reprocessing every run | Slow jobs and timeout risk | Incremental checkpoints by date/source | As data history grows |
| Overly complex scoring formula early | Operator confusion and distrust | Start with explicit weighted factors and iterate | At first rollout |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Logging raw lead PII in analytics artifacts | Data leakage risk | Redact/suppress PII before export and commit. |
| Exposing provider secrets in scripts/workflows | Unauthorized data access | Use env-based secret management and restricted CI contexts. |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Backlogs without clear next action | Team stalls despite data availability | Include action type, rationale, and owner per row. |
| Alert floods with low precision | Teams ignore alerts | Use thresholding and cluster-level dedupe. |

## "Looks Done But Isn't" Checklist

- [ ] **Data ingestion:** Often missing backfill/retry handling - verify idempotent reruns.
- [ ] **Scoring model:** Often missing explainability fields - verify every score has rationale.
- [ ] **CRO experiments:** Often missing minimum sample rules - verify stop conditions.
- [ ] **Global lint fix:** Often missing CI enforcement switch-over - verify `npm run lint` is release-gating.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Data mismatch across sources | MEDIUM | Freeze reporting release, reconcile mapping, rerun normalized exports. |
| Expansion quality drop | MEDIUM | Pause publication, enforce guardrails, prune low-value pages. |
| Experiment misreads | LOW | Recompute with corrected segmentation and sample thresholds. |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Reporting trust erosion | Phase 7 | Data contract checks and reconciliation tests pass. |
| Prioritization theater | Phase 8 | Weekly backlog generated and consumed in planning ritual. |
| Expansion without guardrails | Phase 9 | Publish checks fail on missing intent/link contracts. |
| CRO noise | Phase 10 | Experiments include confidence and minimum sample fields. |
| Partial quality gates | Phase 11 | Global lint runs in CI release path. |

## Sources

- v1.0 implementation and verification summaries
- Existing CI/reporting workflows and temporary report outputs

---
*Pitfalls research for: Crewtrace v1.1 growth loops*
*Researched: 2026-03-03*
