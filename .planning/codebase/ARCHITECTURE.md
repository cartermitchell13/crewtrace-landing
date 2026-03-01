# Architecture

**Analysis Date:** 2026-03-01

## Pattern Overview

**Overall:** SEO-focused, content-heavy Next.js marketing site (App Router) with static and dynamic route segments.

**Key characteristics:**
- Route-level metadata on every major page via `createPageMetadata` (`lib/seo.ts`).
- Programmatic route generation from local data modules (`lib/*.ts`) and markdown (`content/blog`).
- Shared design system and navigation across all pages.
- High-interactivity lead magnets (`SavingsCalculator`, `ComplianceAuditTool`) rendered client-side.

## Layers

**Routing + Page Composition layer:**
- Purpose: Define URL structure and compose page sections.
- Contains: `app/**/page.tsx`, `generateMetadata`, `generateStaticParams`.
- Depends on: shared components, `lib/*` data modules.
- Used by: Next.js App Router runtime.

**Presentation layer:**
- Purpose: Reusable UI sections and conversion components.
- Contains: `components/*.tsx` (Navbar, Footer, Hero, calculators, audit tool).
- Depends on: Tailwind classes, `lucide-react`, Next `Link`/`Image`.
- Used by: route pages.

**Content and domain-data layer:**
- Purpose: Hold structured product/content data for SEO pages.
- Contains: `lib/solutions.ts`, `lib/guides.ts`, `lib/caseStudies.ts`, `lib/blog.ts`.
- Depends on: local files and markdown parser.
- Used by: dynamic route pages and sitemap.

**SEO infra layer:**
- Purpose: Canonicals, robots directives, sitemap entries, JSON-LD base entities.
- Contains: `lib/seo.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`.
- Depends on: site config constants and route inventories.
- Used by: every page render and crawler endpoints.

## Data Flow

**Static content page flow:**
1. User requests route (for example `/industries/roofing`).
2. Page resolves slug from route params.
3. Page loads matching object from `lib/*` maps.
4. `generateMetadata` builds page-level metadata.
5. UI sections render with shared components and route-specific content.

**Blog flow:**
1. `lib/blog.ts` reads `content/blog/*.md`.
2. Frontmatter is parsed for metadata.
3. Markdown is converted to HTML for detail pages.
4. Blog index and detail routes render content.
5. `app/sitemap.ts` includes blog URLs with date-based `lastModified`.

**State management:**
- Mostly server-rendered with static/local data.
- Local client state only inside interactive tools and nav menus.

## Key Abstractions

**Metadata helper:**
- `createPageMetadata` in `lib/seo.ts` ensures canonical/open graph/twitter consistency.

**Slug-driven content maps:**
- `solutionBySlug`, `guideBySlug`, `caseStudyBySlug` allow deterministic dynamic routing.

**Lead-magnet calculators:**
- Large client components compute outputs from local formulas and show CTA flows.

## Entry Points

**Root app shell:**
- `app/layout.tsx` - global fonts, metadata defaults, global JSON-LD, `ServiceWorkerCleaner`.

**Homepage:**
- `app/page.tsx` - hero + primary conversion path.

**Crawler endpoints:**
- `app/sitemap.ts` and `app/robots.ts`.

## Error Handling

**Strategy:**
- Invalid slugs call `notFound()` in dynamic routes.
- Missing blog files return `null` in `lib/blog.ts` and route-level fallbacks apply.

## Cross-Cutting Concerns

**Navigation and internal linking:**
- `components/Navbar.tsx` and `components/Footer.tsx` connect all content clusters.

**Brand/visual consistency:**
- Central theme tokens in `app/globals.css`.

**Conversion focus:**
- Repeated CTA endpoints (`cal.com`) across marketing pages.

---
*Architecture analysis: 2026-03-01*
*Update when major routing or data-source patterns change*
