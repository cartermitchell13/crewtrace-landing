# Coding Conventions

**Analysis Date:** 2026-03-01

## Naming Patterns

**Files:**
- React components: PascalCase (`LandingNavbar.tsx`, `CTASection.tsx`).
- Route segments: kebab-case directories in `app/`.
- Route files: `page.tsx`, `layout.tsx`, plus `sitemap.ts` and `robots.ts`.
- Tests: `*.test.ts` in `components/__tests__/`.

**Functions and variables:**
- camelCase for local variables and helpers (`createPageMetadata`, `getAllBlogPosts`).
- React components exported as default functions with PascalCase names.

**Types/interfaces:**
- PascalCase (`Solution`, `Guide`, `CaseStudy`, `BlogPost`).
- string literal unions used for constrained state in client components.

## Code Style

**Formatting patterns observed:**
- Semicolons enabled.
- Double quotes for strings.
- Mixed indentation width (2 and 4 spaces) depending on file history.
- Tailwind utility classes inline in JSX.

**Linting:**
- ESLint 9 with `eslint-config-next/core-web-vitals` + TypeScript rules.
- Run with `npm run lint`.

## Import Organization

**Typical order:**
1. Framework/external imports (`react`, `next/*`, `lucide-react`).
2. Internal imports via alias (`@/components/*`, `@/lib/*`).

**Path alias:**
- `@/*` maps to project root via `tsconfig.json`.

## Error Handling

**Route-level:**
- Invalid dynamic slugs use `notFound()`.
- Missing content data returns fallback metadata and/or 404 behavior.

**Utility-level:**
- `lib/blog.ts` catches file read/parse errors and returns `null` rather than throwing.

## Logging

**Current approach:**
- Minimal logging in production paths.
- `components/ServiceWorkerCleaner.tsx` currently uses `console.log` on unregister.

## Comments

**Usage:**
- Section comments in page components for readability.
- Dense explanatory comments in long interactive tools and test files.

## Function and Module Design

**Module style:**
- Default export for page/component modules.
- Named exports for metadata and helper functions.
- Content maps in `lib/*` expose both list and slug-indexed lookup patterns.

**Design tendency:**
- Large, single-file interactive client components (`SavingsCalculator.tsx`, `ComplianceAuditTool.tsx`).

## Recommendations for New Code

- Keep route metadata centralized through `createPageMetadata`.
- Follow existing alias import patterns (`@/`), not deep relative paths.
- Keep new dynamic routes paired with explicit data source modules.
- Prefer splitting very large client components into smaller composable units.

---
*Convention analysis: 2026-03-01*
*Update when linting/formatting rules or naming patterns change*
