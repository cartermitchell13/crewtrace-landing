# Codebase Concerns

**Analysis Date:** 2026-03-01

## Tech Debt

**Large single-file client tools:**
- Issue: `components/SavingsCalculator.tsx` and `components/ComplianceAuditTool.tsx` are very large and carry UI + business logic together.
- Why: rapid iteration of lead magnet experiences.
- Impact: difficult maintenance, high regression risk, weaker testability.
- Fix approach: extract scoring/formula logic into `lib/` utilities and split presentational sections into subcomponents.

**Hardcoded SEO content arrays:**
- Issue: core programmatic content is manually encoded in `lib/solutions.ts`, `lib/guides.ts`, and `lib/caseStudies.ts`.
- Why: simple initial launch implementation.
- Impact: scaling to hundreds/thousands of pages is operationally expensive.
- Fix approach: introduce data model + generation pipeline (CMS/CSV/JSON source with validation).

## Known Bugs or Reliability Gaps

**Contact form is simulation-only:**
- Symptoms: `/contact` shows success after timeout but does not submit anywhere.
- Trigger: any form submission in `app/contact/page.tsx`.
- Workaround: users must use direct email or external CTA links.
- Root cause: placeholder async timeout implementation.

**Potential brand inconsistency:**
- Symptoms: mixed spelling/casing appears in demo metadata copy (`Crewtrace` vs `Crewtrace`).
- Trigger: reading `app/demo/page.tsx` metadata and hero copy.
- Impact: weak brand consistency and possible SERP snippet inconsistency.

## Security Considerations

**Publicly rendered legal/marketing claims:**
- Risk: claims and guarantees are static copy and may drift from actual policy.
- Files: `app/terms/page.tsx`, `app/privacy/page.tsx`, marketing pages.
- Current mitigation: none in code.
- Recommendation: create legal/content review checklist tied to release process.

## Performance Bottlenecks

**Heavy client-side interactivity above-the-fold on key landing pages:**
- Problem: calculator/audit pages run substantial client-side logic and animation.
- Files: `app/calculator/page.tsx`, `app/compliance-audit/page.tsx`.
- Measurement: no lighthouse/perf baseline tracked in repo.
- Improvement path: code split interactive modules and capture web-vitals telemetry.

## Fragile Areas

**SEO metadata consistency relies on manual discipline:**
- Why fragile: each page must call `createPageMetadata` and set path correctly.
- Common failures: missing canonical/noindex mistakes on new routes.
- Safe modification: add metadata test harness validating title/canonical/robots for all indexable routes.

## Scaling Limits

**Current content architecture ceiling:**
- Current capacity: good for dozens of pages.
- Limit: manual updates become slow/error-prone at pSEO scale.
- Symptoms at limit: inconsistent metadata/internal links/sitemap drift.
- Scaling path: typed content schema + programmatic generation + QA automation.

## Dependencies at Risk

**No analytics dependency (missing capability):**
- Risk: cannot validate SEO experiments or attribution impact.
- Impact: hard to prioritize pages by performance.
- Migration plan: add privacy-conscious analytics and server-side conversion events.

## Missing Critical Features

**No structured data beyond org/site level:**
- Problem: page-level schema (Article, FAQ, Breadcrumb, Product/SoftwareApplication) largely absent.
- Files: global JSON-LD only in `app/layout.tsx`.
- Blocks: richer SERP eligibility and stronger entity disambiguation.

**No automated SEO QA checks:**
- Problem: no CI checks for metadata uniqueness, canonical correctness, sitemap coverage, or broken internal links.
- Blocks: safe scaling of programmatic pages.

## Test Coverage Gaps

**Scoring tests do not exercise production function directly:**
- What's not tested: real `computeResults` from component module.
- Risk: test copy can drift from implementation and still pass.
- Priority: High.
- Difficulty: Medium (requires extracting pure logic to importable module).

**Routing/SEO outputs untested:**
- What's not tested: dynamic route metadata, sitemap completeness, robots directives.
- Risk: silent SEO regressions during content expansion.
- Priority: High.

---
*Concerns audit: 2026-03-01*
*Update as gaps are addressed or new risks emerge*
