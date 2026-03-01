# Technology Stack

**Analysis Date:** 2026-03-01

## Languages

**Primary:**
- TypeScript 5.x - Application code in `app/`, `components/`, and `lib/`.

**Secondary:**
- CSS (Tailwind CSS v4 directives) - Styling via `app/globals.css`.
- Markdown - Blog content in `content/blog/*.md`.

## Runtime

**Environment:**
- Node.js 20.x+ (recommended for modern Next.js toolchain).
- Browser runtime for client components and interactive calculators.

**Package Manager:**
- npm (lockfile present: `package-lock.json`).

## Frameworks

**Core:**
- Next.js 16.1.6 - App Router pages and metadata APIs.
- React 19.2.3 + React DOM 19.2.3 - UI rendering and client interactivity.

**Styling:**
- Tailwind CSS v4 (`@tailwindcss/postcss`, global theme tokens in `app/globals.css`).

**Testing:**
- Vitest 4.x (`vitest.config.ts`) with jsdom.
- Testing Library (`@testing-library/react`, `@testing-library/jest-dom`).

**Content processing:**
- `gray-matter` for frontmatter parsing.
- `remark` + `remark-html` for markdown-to-HTML conversion.

## Key Dependencies

**Critical:**
- `next` - Framework runtime and routing.
- `react` / `react-dom` - Component model.
- `lucide-react` - Icon system used across pages/components.
- `gray-matter` - Blog metadata and content extraction.
- `remark` / `remark-html` - Blog rendering pipeline.

**Infrastructure:**
- `eslint` + `eslint-config-next` for linting.
- `typescript` for static typing.

## Configuration

**Build and runtime:**
- `next.config.ts` - minimal Next configuration.
- `tsconfig.json` - strict mode and alias `@/*`.
- `eslint.config.mjs` - Next core web vitals + TS rules.
- `vitest.config.ts` - jsdom environment and alias mapping.

**SEO and metadata:**
- `lib/seo.ts` centralizes metadata helpers and site config.
- `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` implement global SEO behavior.

## Platform Requirements

**Development:**
- Any OS supporting Node/npm.
- Local filesystem access for markdown content under `content/blog/`.

**Production:**
- Best fit: Vercel-hosted Next.js app (no custom server required).
- Static assets in `public/` served directly by hosting platform.

---
*Stack analysis: 2026-03-01*
*Update after major dependency or framework changes*
