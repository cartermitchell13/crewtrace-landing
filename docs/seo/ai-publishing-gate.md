# AI Publishing Gate

This runbook defines the blocking quality gate for AI-assisted blog publishing.

## Workflow

- Workflow file: `.github/workflows/publish-gate.yml`
- Triggers:
  - Pull requests touching `content/blog/**`, `scripts/content/**`, or `lib/blog.ts`
  - Pushes to `main` on the same paths
  - Manual runs via `workflow_dispatch`
- Blocking checks:
  1. `check-ai-publish-gate.mjs` against `content/blog`
  2. Lint check for publish-gate script and blog ingestion file

## Local Commands

Validate the current blog corpus:

```bash
npm run content:check-publish
```

Validate with JSON output:

```bash
node scripts/content/check-ai-publish-gate.mjs --input content/blog --format json --output .planning/phases/06-qa-automation-and-scale-operations/.tmp-publish-gate.json
```

Validate one file against sample rules:

```bash
node scripts/content/check-ai-publish-gate.mjs --input scripts/content/fixtures/ai-content-good.md --rules scripts/content/fixtures/quality-rules.sample.json
```

Expect deterministic failure for bad fixture:

```bash
node scripts/content/check-ai-publish-gate.mjs --input scripts/content/fixtures/ai-content-bad.md --rules scripts/content/fixtures/quality-rules.sample.json --expect-fail
```

## Quality Contract

Rule source: `scripts/content/lib/publish-quality-rules.mjs`

The publish gate enforces:

- Required frontmatter fields:
  - `title`
  - `excerpt`
  - `date`
  - `category`
  - `readTime`
- Required frontmatter patterns:
  - Date format: `YYYY-MM-DD`
  - Read time format: `<number> min read`
- Required body structure:
  - Minimum word count
  - Minimum heading count
  - Heading pattern checks (`## ...`)
- Slug/title consistency checks
- Banned phrase detection for high-risk positioning and unsupported guarantees

## Output and Troubleshooting

The validator returns:

- Per-file pass/fail status
- Word and heading counts
- Explicit failure reasons
- Summary totals (checked/passed/failed)

Common remediation paths:

1. Missing frontmatter:
   - Add required fields and valid formats.
2. Structure failures:
   - Expand body depth and section headings.
3. Banned phrase failures:
   - Replace unsupported claims with conditional, evidence-based wording.
4. Slug/title mismatch:
   - Align title wording with slug intent terms.

