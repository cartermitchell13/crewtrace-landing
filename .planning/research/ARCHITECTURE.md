# Architecture Research

**Domain:** Data-driven SEO growth loop on existing Next.js marketing site
**Researched:** 2026-03-03
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
[Source APIs/Exports]
    -> [Ingestion Jobs]
        -> [Normalized Data Contracts]
            -> [Opportunity Scoring Engine]
                -> [Action Backlog Artifacts]
                    -> [Template/Cluster Execution + CRO Tests]
                        -> [Weekly Ops Reports + Alerts]
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Ingestion layer | Pull and validate search/analytics/booking records | Scheduled Node scripts + schema validation |
| Normalization layer | Canonical URL, cluster, template mapping | Shared mapping helpers and deterministic transforms |
| Scoring layer | Rank opportunities by impact/effort | Weighted scoring script with explicit factors |
| Activation layer | Turn top opportunities into page/CRO actions | Backlog exports consumed in planning/execution |
| Monitoring layer | Report trends and detect regressions | Weekly artifacts + threshold-based alerts |

## Recommended Project Structure

```
scripts/
  analytics/
    ingest-*.mjs
    score-*.mjs
    export-*.mjs
    lib/
      contracts/
      mappings/
      scoring/
docs/seo/
  growth-loop-ops.md
.planning/
  research/
  REQUIREMENTS.md
  ROADMAP.md
```

### Structure Rationale

- **`scripts/analytics/`** keeps data and scoring operations close to existing reporting scripts.
- **`lib/contracts|mappings|scoring`** isolates reusable logic for testing and CI guardrails.

## Architectural Patterns

### Pattern 1: Contract-First Data Boundaries

**What:** Validate every input and output artifact with typed schema/contracts.
**When to use:** All ingestion and scoring boundaries.
**Trade-offs:** Slight overhead; major reduction in silent metric drift.

### Pattern 2: Deterministic Artifact Outputs

**What:** Export sorted JSON/CSV outputs with stable structure for weekly review.
**When to use:** Reports, backlog files, alert payloads.
**Trade-offs:** Less ad-hoc flexibility; better reproducibility and diffability.

### Pattern 3: Incremental Loop Activation

**What:** Sequence ingestion -> scoring -> actioning -> alerting, not all-at-once rollout.
**When to use:** Milestone-phase delivery.
**Trade-offs:** Slower initial breadth; lower integration risk.

## Data Flow

### Request Flow

```
Scheduled workflow
    -> ingest source data
    -> normalize to shared dimensions
    -> compute scores
    -> emit backlog/report/alert artifacts
    -> operator executes top actions
```

### Key Data Flows

1. **Search + conversion merge flow:** source metrics join on canonical landing URLs and first-touch attribution dimensions.
2. **Scoring flow:** normalized rows produce opportunity priority with rationale fields.
3. **Alert flow:** weekly deltas trigger threshold checks and remediation suggestions.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (single brand/site) | Script-first in repo is sufficient |
| Multi-brand/site | Separate source configs and per-site artifact namespaces |
| High-volume query sets | Add incremental ingestion checkpoints and partitioned processing |

## Anti-Patterns

### Anti-Pattern 1: Dashboard-Only Operations

**What people do:** Rely on BI dashboards without artifact outputs tied to execution.
**Why it's wrong:** Insights do not become action queues.
**Do this instead:** Export ranked backlog artifacts consumed by weekly planning.

### Anti-Pattern 2: Mixing Raw and Normalized URLs

**What people do:** Score/report directly from mixed URL forms.
**Why it's wrong:** Splits signal and creates false trends.
**Do this instead:** Normalize URLs once and reuse across all downstream steps.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Search performance provider | Scheduled pull/export ingestion | Validate required columns every run. |
| Web analytics provider | Session/event aggregation ingestion | Keep landing and attribution dimensions consistent. |
| Booking/CRM provider | Conversion outcome ingestion | Require deterministic event IDs for joins. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Ingestion -> Scoring | Versioned JSON artifacts | Enforce schema version field. |
| Scoring -> Execution planning | Prioritized backlog artifact | Include confidence + recommended action type. |

## Sources

- Existing Crewtrace architecture and milestone artifacts
- Existing analytics and SEO script patterns in repo

---
*Architecture research for: Crewtrace v1.1 growth loops*
*Researched: 2026-03-03*
