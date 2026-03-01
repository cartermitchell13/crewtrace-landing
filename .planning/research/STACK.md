# Stack Research

**Domain:** Programmatic SEO for a B2B SaaS marketing site (construction workforce/payroll niche)
**Researched:** 2026-03-01
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js App Router | 16.x | Routing, static generation, metadata APIs | Excellent fit for templated SEO pages and sitemap generation |
| TypeScript | 5.x | Typed content models and generators | Prevents schema drift as page count scales |
| React | 19.x | Componentized template rendering | Reuse blocks across clusters while preserving consistency |
| Tailwind CSS | 4.x | Utility-first design system | Fast iteration across many templates with token consistency |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| gray-matter | 4.x | Parse markdown frontmatter | Blog/guide ingestion from markdown files |
| remark + remark-html | 15.x / 16.x | Render markdown to HTML | Long-form content pages |
| zod | latest | Data schema validation | Validate pSEO records before publish |
| rehype plugins | latest | Heading IDs / sanitization | Rich article rendering and TOC support |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint + Next config | Static quality checks | Keep route/page conventions consistent |
| Vitest | Utility and route logic testing | Validate generators, metadata, and sitemap coverage |
| Lighthouse CI | Performance and SEO budgets | Catch regressions before deploy |

## Installation

```bash
# Optional additions for scaling operations
npm install zod
npm install -D lighthouse-ci
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Local typed data + markdown | Headless CMS first | Use CMS when content contributors expand beyond engineering |
| App Router static routes | SSR-everything pages | Use SSR only for truly dynamic, user-specific pages |
| One primary domain | SEO subdomains | Only if legal/ops constraints force strict property separation |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Thin token-swapped templates | High duplicate/thin-content risk | Rich data-driven template sections per page |
| Unvalidated content imports | Schema drift at scale | Typed schemas + CI validation |
| Manual sitemap maintenance | Easy to miss new pages | Programmatic sitemap generation |

## Stack Patterns by Variant

**If page count stays under 200:**
- Keep file-based content source with strict schemas.

**If page count grows beyond 500:**
- Move to data pipeline + content operations tooling while preserving same template layer.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| next@16.x | react@19.x | Current repo baseline |
| vitest@4.x | jsdom@28.x | Current test stack baseline |

## Sources

- Existing repository architecture and dependencies (high confidence).
- Programmatic SEO playbook principles from local skill reference (high confidence).

---
*Stack research for: Crewtrace SEO growth architecture*
*Researched: 2026-03-01*
