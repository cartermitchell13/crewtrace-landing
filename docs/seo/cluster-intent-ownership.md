# Cluster Intent Ownership Policy

## Purpose

Each indexable feature and industry URL in the priority clusters must own one primary search intent.
Intent ownership is encoded in data contracts via the `primaryIntent` field and machine-checked by tests/scripts.

## Ownership Rules

1. Every feature record in `lib/solutions.ts` must define exactly one non-empty `primaryIntent`.
2. Every industry record in `lib/industries.ts` must define exactly one non-empty `primaryIntent`.
3. `primaryIntent` values must be unique within each cluster:
`featureRecords` cannot contain duplicates and `industryRecords` cannot contain duplicates.
4. New pages must be blocked from merge if intent ownership checks fail in:
`lib/__tests__/cluster-content.test.ts` or `scripts/seo/check-cluster-content.mjs`.

## Naming Standard

Use lowercase kebab-case phrases that describe the dominant query goal for the URL.

Good examples:
- `gps-verified-contractor-time-tracking`
- `general-contractor-multi-crew-time-visibility`
- `dol-flsa-contractor-timekeeping-compliance`

Avoid:
- Reusing existing intent strings on multiple URLs.
- Generic labels that do not represent a unique query purpose.
- Human-readable sentence case or punctuation.

## Review Checklist

Before adding or editing a cluster record:

1. Confirm the `primaryIntent` is unique within the target cluster.
2. Confirm the intent is specific to one page's dominant keyword target.
3. Confirm related links (`relatedIndustries` or `relatedSolutions`) point to valid slugs.
4. Run:
   - `npx vitest run lib/__tests__/cluster-content.test.ts`
   - `node scripts/seo/check-cluster-content.mjs`
