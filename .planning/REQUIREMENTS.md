# Requirements: Crewtrace SEO Growth Engine

**Defined:** 2026-03-01
**Core Value:** Crewtrace generates qualified booked calls from U.S. crew-based businesses by proving three outcomes: less payroll overpayment, stronger compliance posture, and less weekly payroll admin time.

## v1 Requirements

### Targeting and Positioning

- [ ] **TGT-01**: SEO strategy explicitly targets U.S. crew-based businesses in construction-adjacent trades.
- [ ] **TGT-02**: Priority ICP range is reflected in messaging: 11-50 employees and roughly $500k-$5M revenue.
- [ ] **TGT-03**: Primary page promise consistently reinforces money saved, compliance confidence, and payroll time saved.
- [ ] **TGT-04**: Page voice follows mixed style (founder-direct plus professional brand clarity).

### SEO Foundation

- [ ] **SEO-01**: Every indexable page has unique title, description, and canonical URL generated from one metadata contract.
- [ ] **SEO-02**: Robots directives correctly noindex utility/private pages while allowing all public SEO pages.
- [ ] **SEO-03**: Sitemap generation includes all indexable static and dynamic routes from one source of truth.
- [ ] **SEO-04**: Page-type structured data exists for core templates (Article, FAQ, Breadcrumb, Organization/Website as applicable).
- [ ] **SEO-05**: Canonical ownership rules are documented to prevent keyword cannibalization across clusters.
- [ ] **SEO-06**: Core Web Vitals budgets are defined and enforced for primary SEO templates.

### Priority Clusters (Features and Industries)

- [x] **CLUS-01**: Feature page templates are driven by typed data records, not hand-edited page files.
- [x] **CLUS-02**: Industry page templates are driven by typed data records, not hand-edited page files.
- [x] **CLUS-03**: Feature and industry hub pages provide crawlable navigation to all child pages.
- [x] **CLUS-04**: Every indexable feature/industry page has at least one parent and one sibling internal link.
- [x] **CLUS-05**: Priority trade coverage includes construction, HVAC, waterproofing, general contractors, and landscaping.
- [x] **CLUS-06**: Each feature/industry page maps to one primary search intent with non-overlapping URL ownership.

### Competitor SEO Strategy

- [x] **COMP-01**: Keyword and SERP tracking explicitly includes Connecteam and Workyard target terms.
- [x] **COMP-02**: Content strategy includes safe, factual competitor-intent pages or sections designed to outrank both competitors.

### Conversion and Attribution

- [x] **CRO-01**: Primary conversion event is booked call from SEO landing pages.
- [x] **CRO-02**: Every priority feature/industry page includes a clear booked-call CTA path.
- [x] **CRO-03**: Contact/demo form submissions use a real backend endpoint and handle success/failure states.
- [x] **CRO-04**: SEO landing sessions and CTA interactions emit page-level events with source attribution.
- [x] **CRO-05**: Reporting can segment booked-call conversion by cluster, template type, and landing URL.

### Quality and Operations

- [ ] **OPS-01**: CI fails on duplicate title/description/canonical conflicts.
- [ ] **OPS-02**: CI fails on broken internal links for indexable pages.
- [ ] **OPS-03**: CI validates required structured data per template type.
- [ ] **OPS-04**: Publishing workflow supports AI-assisted volume but blocks publication unless quality checks pass.
- [ ] **OPS-05**: Weekly SEO report summarizes indexed pages, traffic trend, and booked calls by cluster.

## v2 Requirements

### Scale Expansion

- **SCALE-01**: Add additional cluster types (comparisons, integrations, and advanced hybrids) after feature/industry dominance is stable.
- **SCALE-02**: Expand beyond U.S. only after v1 traffic and conversion targets are consistently met.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Building the full Crewtrace product app in this repo | This roadmap is for marketing and SEO growth infrastructure |
| Subdomain-based SEO microsites | Would dilute authority and increase technical overhead |
| Fully automated AI page publishing without review | Too risky for quality, trust, and compliance accuracy |
| Non-U.S. SEO expansion in v1 | U.S. focus is the current growth priority |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TGT-01 | Phase 1 | Complete |
| TGT-02 | Phase 1 | Complete |
| TGT-03 | Phase 1 | Complete |
| TGT-04 | Phase 1 | Complete |
| SEO-01 | Phase 1 | Complete |
| SEO-02 | Phase 1 | Complete |
| SEO-03 | Phase 1 | Complete |
| SEO-04 | Phase 1 | Complete |
| SEO-05 | Phase 1 | Complete |
| SEO-06 | Phase 1 | Complete |
| CLUS-01 | Phase 2 | Complete |
| CLUS-02 | Phase 2 | Complete |
| CLUS-03 | Phase 2 | Complete |
| CLUS-05 | Phase 2 | Complete |
| CLUS-06 | Phase 2 | Complete |
| CLUS-04 | Phase 3 | Complete |
| COMP-01 | Phase 4 | Complete |
| COMP-02 | Phase 4 | Complete |
| CRO-01 | Phase 5 | Complete |
| CRO-02 | Phase 5 | Complete |
| CRO-03 | Phase 5 | Complete |
| CRO-04 | Phase 5 | Complete |
| CRO-05 | Phase 5 | Complete |
| OPS-01 | Phase 6 | Pending |
| OPS-02 | Phase 6 | Pending |
| OPS-03 | Phase 6 | Pending |
| OPS-04 | Phase 6 | Pending |
| OPS-05 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0

---
*Requirements defined: 2026-03-01*
*Last updated: 2026-03-01 after discovery interview refinement*
