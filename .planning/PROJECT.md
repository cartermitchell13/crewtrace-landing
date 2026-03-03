# Crewtrace SEO Growth Engine

## What This Is

Crewtrace is a Next.js marketing platform for payroll leakage prevention and compliance support for U.S. crew-based businesses. After v1.0, the site runs as an SEO growth engine with contract-backed page generation, deterministic internal linking, competitor-intent coverage, and measurable SEO-to-booked-call attribution.

## Core Value

Crewtrace generates qualified booked calls from U.S. crew-based businesses by proving three outcomes: less payroll overpayment, stronger compliance posture, and less weekly payroll admin time.

## Current Milestone: v1.1 Growth Loops

**Goal:** Turn the current SEO foundation into a closed growth loop where production data drives page prioritization, publishing, and conversion lift.

**Target features:**
- Production data ingestion for search, analytics, and booked-call outcomes.
- Opportunity scoring with a weekly action backlog for pages and clusters.
- Programmatic expansion of additional high-intent cluster types.
- CRO experimentation and anomaly alerting for booked-call conversion.
- Quality hardening to restore global lint as a release gate.

## Requirements

### Validated

- [x] U.S.-focused ICP and messaging contract is enforced across priority templates. - v1.0
- [x] Metadata/canonical/indexability/schema policies are centralized and testable. - v1.0
- [x] Feature and industry clusters are contract-driven and internally linked without orphan risk. - v1.0
- [x] Competitor-intent content for Connecteam and Workyard is published and guarded. - v1.0
- [x] SEO conversion flow is production-backed with booked-call attribution telemetry. - v1.0
- [x] CI quality gates and recurring weekly SEO reporting automation are in place. - v1.0

### Active

- [ ] DATA-01: Replace fixture-based reporting inputs with production Search Console/analytics/booking data feeds.
- [ ] OPS-07: Score and prioritize SEO opportunities weekly by impact and effort.
- [ ] SCALE-01: Add additional cluster types (comparisons, integrations, advanced hybrids) using contract-first templates.
- [ ] CRO-06: Add threshold-based anomaly alerting for booked-call conversion drops by cluster.
- [ ] OPS-06: Resolve full-repo lint debt so global lint can run as a universal release gate.

### Out of Scope

- Building the full Crewtrace product application in this repo - this repo is marketing-site focused.
- Running paid-media landing experimentation as primary growth channel - focus remains organic SEO.
- Fully automated AI publishing without review and gate checks.
- Non-U.S. SEO expansion before v1.1 KPI targets are met.

## Context

- Shipped milestone: v1.0 SEO Growth Engine on 2026-03-03.
- Delivery scope: 6 phases, 17 plans, 51 tasks.
- Stack: Next.js 16, React 19, TypeScript, Tailwind v4, contract-first SEO scripts and CI workflows.
- Primary KPI remains booked calls from SEO landings.
- Current gap: weekly reporting exists, but production data integrations and prioritization loops are not yet fully operational.

## Constraints

- **Tech stack:** Continue with Next.js App Router and existing typed contract architecture.
- **Geo targeting:** Maintain U.S.-only targeting until expansion criteria are met.
- **Claim safety:** Compliance/payroll claims require factual substantiation and guardrail checks.
- **Quality gating:** SEO/publish regressions must fail automation before release.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep ICP focus on U.S. crew-based businesses (11-50 employees, about $500k-$5M revenue) | Preserves highest-fit segment and messaging clarity | Good |
| Make booked calls the primary SEO conversion KPI | Connects SEO output directly to pipeline value | Good |
| Enforce metadata/indexability ownership through shared policy contracts | Prevents page-level drift and cannibalization regressions | Good |
| Keep feature/industry/competitor content contract-backed and script-validated | Enables scale without manual template entropy | Good |
| Preserve first-touch attribution across SEO session and conversion events | Maintains reliable source context for reporting | Good |
| Gate releases with deterministic SEO + publish CI checks | Avoids post-release quality firefighting | Good |
| Keep full-repo lint debt out of milestone scope while enforcing `lint:seo` in v1.0 | Allowed milestone velocity with explicit debt acknowledgment | Revisit in v1.1 |
| Start v1.1 with data integration and opportunity scoring before further cluster expansion | Ensures scaling decisions are driven by measured impact | Pending |

---
*Last updated: 2026-03-03 after v1.1 milestone initialization*
