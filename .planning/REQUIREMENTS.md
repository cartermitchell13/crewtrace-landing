# Requirements: Crewtrace SEO Growth Engine

**Defined:** 2026-03-03
**Milestone:** v1.1 Growth Loops
**Core Value:** Crewtrace generates qualified booked calls from U.S. crew-based businesses by proving three outcomes: less payroll overpayment, stronger compliance posture, and less weekly payroll admin time.

## v1.1 Requirements

Requirements for this milestone. Each maps to exactly one roadmap phase.

### Data Integration and Attribution

- [ ] **DATA-01**: Weekly SEO operations reporting uses production data sources (search, analytics, and booked-call outcomes) instead of fixtures.
- [ ] **DATA-02**: Ingestion jobs pull and validate required fields from each source on a scheduled cadence.
- [ ] **DATA-05**: GA4 property and web data stream are configured with required SEO conversion events (`seo_landing_view`, `booked_call_cta_click`, `lead_form_submit_*`) and validated in reports.
- [ ] **DATA-03**: Booked-call outcomes are joinable to first-touch landing attribution with deterministic event keys.
- [ ] **DATA-04**: URL normalization maps every row to canonical landing URL, cluster, and template dimensions.

### Opportunity Prioritization

- [ ] **OPS-07**: A weekly scoring model ranks page/query opportunities by potential booked-call impact and effort.
- [ ] **OPS-08**: Scoring outputs a ranked action backlog with explicit action type (`new`, `update`, `link-fix`, `cta-test`) and rationale.
- [ ] **OPS-09**: Opportunity outputs flag cannibalization and orphan-link risks with recommended remediation.
- [ ] **OPS-11**: Weekly SEO review artifacts include owner, status, and follow-up fields for top opportunities.

### Programmatic Expansion

- [ ] **SCALE-01**: Additional high-intent cluster types are added through typed contracts and reusable templates.
- [ ] **SCALE-03**: Integration and comparison page templates can be generated from record contracts without hand-authored route files.
- [ ] **SCALE-04**: New expansion pages must pass intent ownership and quality gate checks before publication.
- [ ] **SCALE-05**: New cluster pages are auto-linked from relevant hubs and included in sitemap outputs in the same release.

### CRO Experimentation and Alerting

- [ ] **CRO-06**: Threshold-based alerts detect booked-call conversion drops by cluster and template family.
- [ ] **CRO-07**: SEO landing templates support controlled A/B experiments for CTA copy/layout variations.
- [ ] **CRO-08**: Experiment reports provide lift by cluster/template with sample size and confidence fields.
- [ ] **CRO-09**: Underperforming pages receive generated remediation playbook recommendations tied to observed signals.

### Quality and Operations Hardening

- [ ] **OPS-06**: Full-repo lint debt is resolved so global lint is restored as a universal release gate.
- [ ] **OPS-10**: CI validates data-ingestion and reporting contracts to block malformed artifacts from release workflows.

## v2 Requirements

Deferred to future release. Tracked but not in the v1.1 roadmap.

### Scale Expansion

- **SCALE-02**: Expand beyond U.S. only after v1.1 traffic and conversion targets are consistently met.

### Advanced Growth Automation

- **AUTO-01**: Generate content briefs automatically from opportunity backlog output.
- **AUTO-02**: Add predictive opportunity scoring based on multi-week trend modeling.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Non-U.S. SEO expansion in v1.1 | Keeps focus on improving and compounding U.S. growth loop performance first |
| Paid-media-first growth motions | Milestone focus remains organic SEO and booked-call conversion |
| Fully autonomous AI publishing | Quality and trust risk remains too high without review gates |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 7 | Pending |
| DATA-02 | Phase 7 | Pending |
| DATA-05 | Phase 7 | Pending |
| DATA-03 | Phase 7 | Pending |
| DATA-04 | Phase 7 | Pending |
| OPS-10 | Phase 7 | Pending |
| OPS-07 | Phase 8 | Pending |
| OPS-08 | Phase 8 | Pending |
| OPS-09 | Phase 8 | Pending |
| OPS-11 | Phase 8 | Pending |
| SCALE-01 | Phase 9 | Pending |
| SCALE-03 | Phase 9 | Pending |
| SCALE-04 | Phase 9 | Pending |
| SCALE-05 | Phase 9 | Pending |
| CRO-06 | Phase 10 | Pending |
| CRO-07 | Phase 10 | Pending |
| CRO-08 | Phase 10 | Pending |
| CRO-09 | Phase 10 | Pending |
| OPS-06 | Phase 11 | Pending |

**Coverage:**
- v1.1 requirements: 19 total
- Mapped to phases: 19
- Unmapped: 0

---
*Requirements defined: 2026-03-03*
*Last updated: 2026-03-03 after roadmap creation*
