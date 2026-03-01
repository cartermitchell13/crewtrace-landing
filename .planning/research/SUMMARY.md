# Project Research Summary

**Project:** Crewtrace SEO Growth Engine
**Domain:** Programmatic SEO for construction SaaS demand generation
**Researched:** 2026-03-01
**Confidence:** HIGH

## Executive Summary

Crewtrace already has the right foundation for an SEO-led growth system: multiple intent clusters, dynamic routes, centralized metadata helpers, and strong conversion-oriented page design. The primary challenge is not initial capability, but scale discipline.

The recommended path is a six-phase program: harden technical SEO, refactor templates into typed scalable structures, expand high-intent page clusters, grow authority content, instrument conversion attribution, and automate SEO QA/reporting.

The key risk is publishing volume faster than quality controls. The roadmap therefore prioritizes template/data contracts and QA gates before large-scale page expansion.

## Key Findings

### Recommended Stack

Use the current Next.js + TypeScript stack, add schema validation and SEO QA automation, and keep all SEO clusters in first-party subfolders. This gives scalable architecture without a disruptive rewrite.

**Core technologies:**
- Next.js App Router: route templates + sitemap/robots APIs.
- TypeScript: typed content records and generator safety.
- Tailwind + reusable components: consistent templates at scale.

### Expected Features

**Must have (table stakes):**
- unique metadata/canonical control,
- page-type structured data,
- deterministic internal linking,
- complete sitemap coverage,
- conversion attribution.

**Should have (competitive):**
- industry x feature hybrid pages,
- robust lead magnets tied to intent,
- QA automation pipeline.

**Defer (v2+):**
- localization and location-scale clusters until core engine is stable.

### Architecture Approach

Adopt typed page records feeding template rendering, metadata/schema generation, link graph construction, and sitemap output from one source of truth. This avoids divergence across content, SEO tags, and crawl surfaces.

### Critical Pitfalls

1. Thin token-swapped pages -> enforce data-rich template sections.
2. Keyword cannibalization -> maintain intent-to-URL ownership map.
3. Orphan pages -> automate hub-spoke linking rules.
4. No revenue attribution -> instrument conversion events by template.
5. Manual QA collapse -> enforce CI SEO gates before publish.

## Implications for Roadmap

### Phase 1: Technical SEO Hardening
**Rationale:** Foundation first prevents expensive rework.
**Delivers:** metadata consistency, schema baseline, canonical and crawl rules.
**Avoids:** cannibalization and indexation drift.

### Phase 2: Template and Data Model Refactor
**Rationale:** Scaling requires typed, validated records.
**Delivers:** reusable page engines with shared contracts.
**Implements:** typed content architecture.

### Phase 3: Cluster Expansion and Link Graph
**Rationale:** Growth pages only after foundations are reliable.
**Delivers:** industry x feature expansion and no-orphan linkage.

### Phase 4: Authority Content Scaling
**Rationale:** Boost topical depth and trust for hard queries.
**Delivers:** guides/blog/case-study operating cadence.

### Phase 5: Conversion and Attribution
**Rationale:** Rankings without pipeline visibility are incomplete.
**Delivers:** lead capture reliability and event instrumentation.

### Phase 6: QA Automation and Reporting
**Rationale:** Sustains quality as output volume increases.
**Delivers:** automated checks and recurring SEO performance reports.

### Phase Ordering Rationale

- Foundation and data contracts precede scale.
- Scale precedes full automation only where necessary.
- Attribution and QA complete the growth feedback loop.

### Research Flags

Phases likely needing deeper implementation research:
- **Phase 5:** analytics and event architecture decisions.
- **Phase 6:** CI tooling choices and reporting integration.

Phases with standard patterns:
- **Phase 1-4:** strong existing conventions and known implementation paths.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Built on existing, proven repo architecture |
| Features | HIGH | Derived from pSEO patterns plus current gaps |
| Architecture | HIGH | Strong route and content baseline already exists |
| Pitfalls | HIGH | Common failure modes match current repo trajectory |

**Overall confidence:** HIGH

### Gaps to Address

- Confirm analytics provider and attribution schema.
- Decide data source evolution path (typed files vs CMS) by target page volume.

---
*Research completed: 2026-03-01*
*Ready for roadmap: yes*
