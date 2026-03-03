# Crewtrace SEO Growth Engine

## What This Is

Crewtrace is a Next.js marketing platform for payroll leakage prevention and compliance support for U.S. crew-based businesses. After v1.0, the site now operates as an SEO growth engine with contract-backed page generation, deterministic internal linking, competitor-intent coverage, and measurable SEO-to-booked-call attribution.

## Core Value

Crewtrace generates qualified booked calls from U.S. crew-based businesses by proving three outcomes: less payroll overpayment, stronger compliance posture, and less weekly payroll admin time.

## Requirements

### Validated

- [x] U.S.-focused ICP and messaging contract is enforced across priority templates.
- [x] Metadata/canonical/indexability/schema policies are centralized and testable.
- [x] Feature and industry clusters are contract-driven and internally linked without orphan risk.
- [x] Competitor-intent content for Connecteam and Workyard is published and guarded.
- [x] SEO conversion flow is production-backed with booked-call attribution telemetry.
- [x] CI quality gates and recurring weekly SEO reporting automation are in place.

### Active

- [ ] SCALE-01: Add additional cluster types (comparisons, integrations, and advanced hybrids) after feature/industry dominance is stable.
- [ ] SCALE-02: Expand beyond U.S. only after v1 traffic and conversion targets are consistently met.
- [ ] DATA-01: Replace fixture-based reporting inputs with production Search Console/analytics/booking data feeds.
- [ ] CRO-06: Add threshold-based anomaly alerting for booked-call conversion drops by cluster.
- [ ] OPS-06: Resolve full-repo lint debt so global lint can run as a universal release gate.

### Out of Scope

- Building the full Crewtrace product application in this repo - this repo is marketing-site focused.
- Running paid-media landing experimentation as primary growth channel - focus remains organic SEO.
- Fully automated AI publishing without review and gate checks.

## Context

- Shipped milestone: v1.0 SEO Growth Engine on 2026-03-03.
- Delivery scope: 6 phases, 17 plans, 51 tasks.
- Timeline: 2026-03-01 to 2026-03-03.
- Stack: Next.js 16, React 19, TypeScript, Tailwind v4, contract-first SEO scripts and CI workflows.
- Primary KPI remains booked calls from SEO landings; weekly operational reporting now exists in deterministic JSON/CSV outputs.

## Constraints

- **Tech stack:** Continue with Next.js App Router and existing typed contract architecture.
- **Geo targeting:** Maintain U.S.-only targeting until SCALE-02 criteria are satisfied.
- **Claim safety:** Compliance and payroll outcome language requires factual substantiation and guardrail checks.
- **Quality gating:** SEO/publish regressions must fail automation before release.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep ICP focus on U.S. crew-based businesses (11-50 employees, about $500k-$5M revenue) | Preserves highest-fit segment and messaging clarity | ? Good |
| Make booked calls the primary SEO conversion KPI | Connects SEO output directly to pipeline value | ? Good |
| Enforce metadata/indexability ownership through shared policy contracts | Prevents page-level drift and cannibalization regressions | ? Good |
| Keep feature/industry/competitor content contract-backed and script-validated | Enables scale without manual template entropy | ? Good |
| Preserve first-touch attribution across SEO session and conversion events | Maintains reliable source context for reporting | ? Good |
| Gate releases with deterministic SEO + publish CI checks | Avoids post-release quality firefighting | ? Good |
| Keep full-repo lint debt out of milestone scope while enforcing `lint:seo` | Allowed milestone velocity with explicit debt acknowledgment | ? Revisit |
| Run weekly reporting from deterministic inputs before production data-source integration | Enabled immediate ops cadence while deferring data plumbing | ? Revisit |

---
*Last updated: 2026-03-03 after v1.0 milestone completion*
