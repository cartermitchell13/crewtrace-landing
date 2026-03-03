# SEO QA Quality Gates

This runbook defines the release-blocking quality gates for SEO metadata ownership, schema coverage, and internal-link integrity.

## Workflow

- Workflow file: `.github/workflows/seo-quality.yml`
- Triggered on:
  - Pull requests into `main`
  - Pushes to `main`
- Job order:
  1. Install dependencies
  2. Run SEO guardrails (`npm run seo:check:all`)
  3. Run focused SEO Vitest suites
  4. Run lint
  5. Run production build

The guardrail step runs first to fail quickly before lint/build runtime.

## Local Commands

Run the full SEO gate suite:

```bash
npm run seo:check:all
```

Run focused SEO tests:

```bash
npx vitest run lib/__tests__/seo-policy.test.ts lib/__tests__/schema.test.ts
```

Run lint and build parity with CI:

```bash
npm run lint:seo
npm run build
```

Run full-repo lint separately when addressing global lint debt:

```bash
npm run lint
```

## Included Guardrails

`npm run seo:check:all` executes:

1. `seo:check` - metadata and canonical ownership contract checks.
2. `seo:check-schema` - required schema coverage checks by template family.
3. `seo:check-links` - internal-link integrity checks against route inventory.
4. `seo:check-clusters` - feature/industry cluster relationship and link-graph checks.
5. `seo:check-messaging` - ICP and promise-order messaging checks.
6. `seo:check-attribution` - booked-call attribution wiring checks.

## Failure Interpretation

- `seo:check` failures:
  - Duplicate indexable title/description/canonical ownership.
  - Metadata path ownership drift from `lib/seoPolicy.ts`.
  - Dynamic metadata fallback ownership mismatch.
- `seo:check-schema` failures:
  - Missing required schema tokens/imports on protected templates.
  - Missing schema matrix terms or missing schema library.
- `seo:check-links` failures:
  - Internal path targets not present in route inventory.
  - Dynamic link prefixes outside allowed indexable route families.

Each script prints file-level diagnostics in `path:line -> href` format where applicable.

## Route Inventory Source of Truth

Internal-link checks build inventory from:

- `lib/seoPolicy.ts` static route policies
- slug contracts in:
  - `lib/solutions.ts`
  - `lib/industries.ts`
  - `lib/competitors.ts`
  - `lib/guides.ts`
  - `lib/caseStudies.ts`
- blog markdown slugs from `content/blog/*.md`

Utility/legal routes (`/demo`, `/calculator`, `/compliance-audit`, `/privacy`, `/terms`) are allowed exceptions for link checks and are treated as non-indexable by policy.
