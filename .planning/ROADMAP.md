# Roadmap: Crewtrace SEO Growth Engine

## Milestone

- [IN PROGRESS] **v1.1 Growth Loops** - Phases 7-11
- [SHIPPED] **v1.0 SEO Growth Engine** - Phases 1-6 (2026-03-03, archived in `.planning/milestones/v1.0-ROADMAP.md`)

## Overview

This roadmap turns v1.0 SEO infrastructure into an execution loop: reliable production data -> ranked opportunities -> expansion and CRO actions -> measurable booked-call lift. Phase order prioritizes data trust and operations discipline before scaling output.

## Phases

- [x] **Phase 7: Production Data Integration and Contracts** - Replace fixture-based reporting inputs with validated production source ingestion (including GA4), event contracts, and normalized dimensions. (completed 2026-03-03)
- [ ] **Phase 8: Opportunity Scoring and Backlog Operations** - Convert normalized performance data into weekly ranked execution actions.
- [x] **Phase 08.1: Content and UI Optimization for Keyword Ranking** - Refresh high-intent templates with intent-aligned copy, stronger UX hierarchy, and guarded internal-link/metadata integrity. (completed 2026-03-03)
- [ ] **Phase 9: Programmatic Expansion Engine** - Expand additional high-intent clusters with contract-backed templates and guardrails.
- [ ] **Phase 10: CRO Experimentation and Alerting** - Improve booked-call conversion using experiments and anomaly response loops.
- [ ] **Phase 11: Platform Hardening and Lint Convergence** - Restore full-repo lint gating and finalize operational quality controls.

## Phase Details

### Phase 7: Production Data Integration and Contracts
**Goal**: Build trusted, production-backed data flow for SEO and booked-call analysis.
**Depends on**: Phase 6
**Requirements**: DATA-01, DATA-02, DATA-05, DATA-03, DATA-04, OPS-10
**Success Criteria**:
1. Weekly reporting pipeline consumes production source data (no fixture dependency in release workflows).
2. Ingestion jobs validate required schemas and fail fast on malformed rows.
3. GA4 setup is complete and validated for required SEO conversion events and landing dimensions.
4. Attribution joins preserve first-touch landing dimensions and deterministic conversion keys.
5. Canonical URL, cluster, and template normalization is consistent across ingestion, scoring, and reporting outputs.

### Phase 8: Opportunity Scoring and Backlog Operations
**Goal**: Turn performance data into an actionable, repeatable weekly work queue.
**Depends on**: Phase 7
**Requirements**: OPS-07, OPS-08, OPS-09, OPS-11
**Success Criteria**:
1. Weekly score model outputs ranked opportunities with transparent impact/effort rationale.
2. Backlog artifact includes action type and ownership-ready fields.
3. Cannibalization and orphan-link risk detection is included in opportunity output.
4. Weekly ops review process can track status progression for top opportunities.

### Phase 08.1: Content and UI Optimization for Keyword Ranking (INSERTED)

**Goal:** Improve ranking and conversion performance on high-intent landing templates through contract-safe copy refreshes and UX redesigns.
**Requirements**: SEO-06, SEO-07, SEO-08, SEO-09
**Depends on:** Phase 8
**Success Criteria**:
1. High-priority entry templates (`/`, `/features`, `/industries`) are rewritten with intent-aligned copy and clearer CTA hierarchy.
2. Detail templates (`/features/[slug]`, `/industries/[slug]`, `/compare/[slug]`, `/contact`) ship UX and copy refreshes without breaking telemetry or schema/metadata contracts.
3. Template refreshes preserve crawlable internal-link pathways and canonical/indexability guardrails.
4. Weekly optimization backlog output includes deterministic action type, owner, status, and rationale fields to drive ongoing content operations.
**Plans:** 3/3 plans complete

Plans:
- [x] 08.1-01-PLAN.md — Build deterministic optimization foundation (priority map + copy/UI guardrails).
- [x] 08.1-02-PLAN.md — Redesign homepage and hub templates for intent clarity and conversion flow.
- [x] 08.1-03-PLAN.md — Refresh detail/comparison/contact templates with proof-led UX and link-safe content updates.

### Phase 9: Programmatic Expansion Engine
**Goal**: Scale new high-intent cluster types without degrading quality or ownership integrity.
**Depends on**: Phase 8
**Requirements**: SCALE-01, SCALE-03, SCALE-04, SCALE-05
**Success Criteria**:
1. New integration/comparison templates are generated from typed contracts (not hand-authored route files).
2. Quality/intent guardrails block publication when ownership or quality constraints fail.
3. New pages are linked from hubs and sitemap in the same release cycle.
4. Expansion does not introduce indexable orphan pages.

### Phase 10: CRO Experimentation and Alerting
**Goal**: Improve booked-call conversion rate through measured experiments and early drop detection.
**Depends on**: Phase 9
**Requirements**: CRO-06, CRO-07, CRO-08, CRO-09
**Success Criteria**:
1. Priority templates can run controlled A/B CTA experiments.
2. Experiment outputs report lift with sample and confidence metadata.
3. Cluster/template conversion-drop alerts are triggered by explicit thresholds.
4. Alert and experiment outputs generate remediation playbook recommendations.

### Phase 11: Platform Hardening and Lint Convergence
**Goal**: Remove remaining quality debt so growth workflows remain scalable and release-safe.
**Depends on**: Phase 10
**Requirements**: OPS-06
**Success Criteria**:
1. Global lint runs clean and is enforced in release CI.
2. Existing SEO/publish/reporting workflows remain green after lint convergence.
3. Quality gate documentation is updated with unified release requirements.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 7. Production Data Integration and Contracts | 3/3 | Complete    | 2026-03-03 |
| 8. Opportunity Scoring and Backlog Operations | 0/0 | Not started | - |
| 8.1 Content and UI Optimization for Keyword Ranking | 3/3 | Complete | 2026-03-03 |
| 9. Programmatic Expansion Engine | 0/0 | Not started | - |
| 10. CRO Experimentation and Alerting | 0/0 | Not started | - |
| 11. Platform Hardening and Lint Convergence | 0/0 | Not started | - |
