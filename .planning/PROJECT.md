# Crewtrace SEO Growth Engine

## What This Is

Crewtrace is a Next.js marketing site for construction payroll leakage prevention. It already has strong landing page design and several SEO-oriented route clusters (industries, features, guides, case studies, blog), but it still relies on mostly manual content operations.

This project turns the current site into a complete multi-page SEO machine: scalable page templates, stronger technical SEO, better internal linking, measurable conversion flows, and repeatable publishing operations.

## Core Value

Crewtrace consistently acquires qualified organic pipeline by publishing high-intent, high-quality pages that are easy to scale and hard for competitors to replicate.

## Requirements

### Validated

- [x] Multi-page App Router website is live with reusable page patterns - existing.
- [x] Core SEO plumbing exists (metadata helper, sitemap, robots) - existing.
- [x] Dynamic slug pages for industries/features/guides/case studies/blog exist - existing.
- [x] Conversion-oriented lead magnets exist (ROI calculator, compliance audit) - existing.

### Active

- [ ] Build programmatic SEO templates and data model for page scaling.
- [ ] Improve technical SEO depth (schema, canonical hygiene, crawl/index controls).
- [ ] Strengthen internal link graph and cluster architecture.
- [ ] Scale content operations with clear quality controls.
- [ ] Instrument conversion tracking and attribution for SEO traffic.
- [ ] Add automated SEO QA and reporting.

### Out of Scope

- Building the full Crewtrace product application in this repo - this repo is marketing-site focused.
- Running paid media landing page experiments as primary growth channel - focus is organic SEO.
- Auto-publishing AI-generated pages without human review - quality and trust constraints.

## Context

- Existing stack: Next.js 16 + React 19 + TypeScript + Tailwind v4.
- Existing content sources are local arrays (`lib/*.ts`) and markdown (`content/blog/*.md`).
- Existing route clusters already match pSEO-friendly structures (`/industries/[slug]`, `/features/[slug]`, etc.).
- Current bottlenecks are operational scalability, structured data depth, analytics visibility, and automated quality gates.

## Constraints

- **Tech stack**: Continue on Next.js App Router - preserve current architecture momentum.
- **Content quality**: Avoid thin or duplicate pages - protect long-term SEO performance.
- **Brand trust**: Compliance/payroll claims require accurate, reviewed content.
- **Execution speed**: Build in phases with clear verification, not a full rewrite.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use subfolder URL clusters (not subdomains) for pSEO | Preserves site authority and keeps internal linking simple | - Pending |
| Keep page generation data-driven from typed sources | Enables repeatable expansion without copy-paste pages | - Pending |
| Treat page quality as a release gate, not a post-launch fix | Prevents thin-content and cannibalization risk | - Pending |
| Instrument SEO traffic-to-lead conversion from day one | Rankings alone do not prove revenue impact | - Pending |

---
*Last updated: 2026-03-01 after initialization*
