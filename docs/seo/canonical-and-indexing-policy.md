# Canonical and Indexing Policy

## Scope
This policy defines canonical ownership and indexability rules for the Crewtrace marketing site.

## Canonical Rules
- All indexable pages are self-canonical.
- Canonical values must use normalized relative paths (for example `/industries`).
- `metadataBase` in `app/layout.tsx` is responsible for absolute URL resolution.
- Cross-canonical routing between hub and detail pages is not allowed in this phase.

## Indexability Rules
- Public SEO routes are indexable.
- Utility and legal routes are noindex by policy:
  - `/demo`
  - `/calculator`
  - `/compliance-audit`
  - `/privacy`
  - `/terms`
- Not-found metadata fallbacks should always set `noIndex: true`.

## Source of Truth
- Route policy ownership lives in `lib/seoPolicy.ts`.
- Metadata helper (`lib/seo.ts`), `app/robots.ts`, and `app/sitemap.ts` must consume the same route policy.

## QA Requirements
- Duplicate title/description/canonical conflicts fail the SEO contract check.
- Any new static route must be added to `lib/seoPolicy.ts` before release.

