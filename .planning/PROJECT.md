# Crewtrace SEO Growth Engine

## What This Is

Crewtrace is a Next.js marketing site for payroll leakage prevention and compliance support for U.S. crew-based businesses. Initial focus includes construction, HVAC, waterproofing, general contractors, and landscaping companies with roughly 11-50 employees and about $500k-$5M in annual revenue.

This project turns the current site into a complete multi-page SEO machine that drives booked calls through scalable page templates, stronger technical SEO, tighter internal linking, and reliable conversion attribution.

## Core Value

Crewtrace generates qualified booked calls from U.S. crew-based businesses by proving three outcomes: less payroll overpayment, stronger compliance posture, and less weekly payroll admin time.

## Requirements

### Validated

- [x] Multi-page App Router website is live with reusable page patterns - existing.
- [x] Core SEO plumbing exists (metadata helper, sitemap, robots) - existing.
- [x] Dynamic slug pages for industries/features/guides/case studies/blog exist - existing.
- [x] Conversion-oriented lead magnets exist (ROI calculator, compliance audit) - existing.

### Active

- [ ] Prioritize and scale feature and industry page clusters first.
- [ ] Improve technical SEO depth (schema, canonical hygiene, crawl/index controls).
- [ ] Strengthen internal link graph and cluster architecture.
- [ ] Build content and landing assets that directly support booked-call conversion.
- [ ] Target competitor-intent opportunities against Connecteam and Workyard.
- [ ] Scale publishing with AI-assisted workflows while enforcing quality gates.
- [ ] Add automated SEO QA and reporting.

### Out of Scope

- Building the full Crewtrace product application in this repo - this repo is marketing-site focused.
- Running paid media landing page experiments as primary growth channel - focus is organic SEO.
- Non-U.S. SEO expansion in this milestone.
- Auto-publishing AI-generated pages without quality review.

## Context

- Existing stack: Next.js 16 + React 19 + TypeScript + Tailwind v4.
- Existing content sources are local arrays (`lib/*.ts`) and markdown (`content/blog/*.md`).
- Existing route clusters already match pSEO-friendly structures (`/industries/[slug]`, `/features/[slug]`, etc.).
- Current bottlenecks are operational scalability, structured data depth, analytics visibility, and automated quality gates.
- Primary conversion objective for SEO traffic is booked calls.
- Brand voice target is mixed: founder-led directness plus professional brand clarity.

## Constraints

- **Tech stack**: Continue on Next.js App Router - preserve current architecture momentum.
- **Geo targeting**: U.S.-only SEO targeting for this milestone.
- **ICP focus**: Prioritize crews in 11-50 employee companies and $500k-$5M annual revenue range.
- **Content quality**: Avoid thin or duplicate pages - protect long-term SEO performance.
- **Brand trust**: Compliance/payroll claims require accurate, reviewed content.
- **Execution speed**: Pursue quick SEO wins while preserving long-term compounding architecture.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Focus ICP on U.S. crew-based businesses (11-50 employees, $500k-$5M revenue) | Matches current go-to-market and sales fit | - Locked |
| Make booked calls the primary SEO conversion target | Clear pipeline-oriented KPI for SEO performance | - Locked |
| Prioritize feature and industry clusters before other expansions | Fastest route to high-intent query coverage | - Locked |
| Use subfolder URL clusters (not subdomains) for pSEO | Preserves site authority and keeps internal linking simple | - Locked |
| Keep page generation data-driven from typed sources | Enables repeatable expansion without copy-paste pages | - Locked |
| Target competitor-intent opportunities vs Connecteam and Workyard | Directly supports outranking business priority | - Locked |
| Treat page quality as a release gate, not a post-launch fix | Prevents thin-content and cannibalization risk | - Locked |
| Instrument SEO traffic-to-booked-call conversion | Rankings alone do not prove revenue impact | - Locked |

---
*Last updated: 2026-03-01 after discovery interview refinement*
