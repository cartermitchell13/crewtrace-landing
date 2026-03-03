# Feature Research

**Domain:** SEO growth loop and conversion optimization for pSEO marketing site
**Researched:** 2026-03-03
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Production search + analytics ingestion | Reporting without live data is not trusted | MEDIUM | Required before prioritization decisions. |
| Opportunity scoring and weekly prioritized backlog | SEO teams expect a repeatable prioritization system | MEDIUM | Must tie directly to rankings + conversion impact. |
| Conversion experiment instrumentation | Growth teams expect measured CRO iteration | MEDIUM | Must be joined to booked-call outcomes, not CTR only. |

### Differentiators (Competitive Advantage)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Cluster-aware opportunity model | Focuses work on pages with highest pipeline upside | MEDIUM | Uses existing cluster/template taxonomy from v1.0. |
| Automated remediation playbooks | Speeds reaction when conversion/rank drops occur | MEDIUM | Converts monitoring into action. |
| Contract-first expansion to new cluster types | Scales content without quality drift | HIGH | Reuses guardrail strategy that worked in v1.0. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Immediate non-U.S. expansion | Appears to increase addressable volume quickly | Splits focus before U.S. engine is fully efficient | Keep U.S. scope until KPI thresholds are sustained. |
| Fully auto-published pages at scale | Feels like fastest way to grow index footprint | Increases risk of thin/duplicative content and trust loss | Keep publish gates and human review checkpoints. |

## Feature Dependencies

```
Production data ingestion
    --requires--> canonical URL/cluster normalization
                       --enables--> opportunity scoring
                                      --enables--> backlog automation
                                                       --drives--> cluster expansion and CRO experiments
```

### Dependency Notes

- **Opportunity scoring requires production ingestion:** scores are only useful when fed by real performance/conversion data.
- **Expansion and CRO both require backlog prioritization:** prevents random execution and preserves focus.
- **Anomaly alerting requires stable baseline metrics:** otherwise alert noise overwhelms operators.

## MVP Definition

### Launch With (v1.1)

- [x] Production ingestion and normalized reporting model.
- [x] Weekly opportunity scoring and prioritized action queue.
- [x] Controlled expansion of new cluster types under existing quality gates.
- [x] CRO experiment and anomaly loop tied to booked-call outcomes.

### Add After Validation (v1.x)

- [ ] Predictive scoring with trend forecasting after baseline loop stability.
- [ ] Semi-automated content brief generation from top opportunities.

### Future Consideration (v2+)

- [ ] Non-U.S. market expansion once U.S. system shows repeatable outcomes.
- [ ] Multi-channel growth loop including paid channels.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Production data ingestion | HIGH | MEDIUM | P1 |
| Opportunity scoring and backlog | HIGH | MEDIUM | P1 |
| Contract-first cluster expansion | HIGH | HIGH | P1 |
| CRO experiments and anomaly alerts | HIGH | MEDIUM | P1 |
| Global lint gate convergence | MEDIUM | MEDIUM | P2 |

**Priority key:**
- P1: Must have for milestone
- P2: Should have within milestone if sequencing allows
- P3: Future consideration

## Competitor Feature Analysis

| Feature | Competitor A | Competitor B | Our Approach |
|---------|--------------|--------------|--------------|
| SEO performance ops loop | Opaque prioritization workflows | Mixed static reporting | Build transparent score and backlog output in repo artifacts. |
| Conversion attribution detail | Often aggregate-level only | Often limited to last-touch | Preserve first-touch + landing/template/cluster level attribution. |

## Sources

- v1.0 delivery artifacts and summaries in `.planning/milestones/`
- Existing project requirements/decisions in `.planning/PROJECT.md`
- Existing reporting outputs in `.planning/phases/06-qa-automation-and-scale-operations/.tmp-weekly-report/`

---
*Feature research for: SEO growth loops*
*Researched: 2026-03-03*
