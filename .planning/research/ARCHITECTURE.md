# Architecture Research

**Domain:** Programmatic SEO architecture for a multi-page B2B marketing site
**Researched:** 2026-03-01
**Confidence:** HIGH

## Standard Architecture

### System Overview

```text
User/Crawler Request
  -> Next.js route template
     -> typed content/data record
        -> metadata + schema builder
           -> rendered page
              -> related-page linker
                 -> sitemap/indexing endpoints
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Route templates | Render page classes by cluster | `app/<cluster>/[slug]/page.tsx` |
| Content model | Define and validate records | Typed schema in `lib/` + validator |
| Metadata engine | Canonical, title, description, robots | Shared helper utilities |
| Schema engine | JSON-LD for page type | Composable schema builders |
| Link graph | Related pages and hubs | Rule-based relatedness map |
| Crawl endpoints | Sitemap and robots policy | `app/sitemap.ts`, `app/robots.ts` |

## Recommended Project Structure

```text
app/
|-- industries/[slug]/page.tsx
|-- features/[slug]/page.tsx
|-- solutions/[slug]/page.tsx (legacy redirects)
|-- sitemap.ts
`-- robots.ts

lib/
|-- seo.ts
|-- content/
|   |-- industries.ts
|   |-- features.ts
|   `-- hybrids.ts
|-- schema/
|   `-- builders.ts
`-- linking/
    `-- related.ts
```

### Structure Rationale

- Keep template rendering in routes and business/content logic in `lib/`.
- Separate metadata/schema/linking concerns to avoid duplication.
- Preserve cluster-specific data modules for clear ownership.

## Architectural Patterns

### Pattern 1: Typed template contracts

**What:** Every cluster record conforms to a schema before route build.
**When to use:** Any new programmatic page type.
**Trade-offs:** More upfront modeling, fewer runtime surprises.

### Pattern 2: Hub-and-spoke internal linking

**What:** Cluster hub pages link to spokes; spokes link to siblings and parent hubs.
**When to use:** All SEO clusters.
**Trade-offs:** Requires link rules and QA checks.

### Pattern 3: Declarative metadata builders

**What:** Central metadata and schema builders called by templates.
**When to use:** Every indexable route.
**Trade-offs:** Central changes affect many pages (good for consistency, risky if untested).

## Data Flow

### Request Flow

```text
Request -> Route -> Content record -> Metadata/Schema -> Rendered page -> Related links
```

### Key Data Flows

1. Content records feed templates, metadata, schema, and sitemap from one source of truth.
2. Link graph uses entity relationships (industry, feature, intent) to prevent orphan pages.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-200 pages | File-based records with strict schemas |
| 200-1000 pages | Add content ops pipeline + automated QA |
| 1000+ pages | Introduce managed content source and publishing orchestration |

### Scaling Priorities

1. Prevent duplication/cannibalization before adding page volume.
2. Automate QA before adding new clusters.

## Anti-Patterns

### Anti-Pattern 1: Copy-paste templates per route

- Why wrong: inconsistent SEO rules and high maintenance overhead.
- Do this instead: shared render blocks + cluster configs.

### Anti-Pattern 2: Content and metadata maintained separately

- Why wrong: drift between on-page copy and SERP intent.
- Do this instead: derive metadata from same typed record fields.

## Integration Points

### External services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Cal.com | CTA outbound links | Conversion dependency, not rendering dependency |
| Analytics provider (planned) | Client + server events | Needed for SEO ROI attribution |

### Internal boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| route templates <-> content records | typed imports | fail-fast on missing records |
| templates <-> metadata/schema builders | helper functions | enforce canonical consistency |

## Sources

- Existing Crewtrace architecture and route structure.
- Programmatic SEO implementation principles from local skill guide.

---
*Architecture research for: Crewtrace SEO platform expansion*
*Researched: 2026-03-01*
