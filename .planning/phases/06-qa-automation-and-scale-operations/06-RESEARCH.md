# Phase 6: QA Automation and Scale Operations - Research

**Researched:** 2026-03-03
**Domain:** CI quality gates, AI-assisted publishing safeguards, and weekly SEO operations reporting
**Confidence:** MEDIUM-HIGH

<user_constraints>
## User Constraints

### Locked decisions
- No Phase 6 CONTEXT.md exists yet; planning must rely on ROADMAP, REQUIREMENTS, STATE, and implemented Phase 5 artifacts.
- Existing script-first quality guardrail pattern should be preserved (`scripts/seo/*`, deterministic CLI checks).
- Existing attribution/reporting contracts from Phase 5 should be reused instead of replaced.

### Claude's discretion
- CI provider and workflow layout details.
- Exact internal-link validation strategy and route inventory implementation details.
- Exact weekly report input contracts (API pull vs file-based ingestion), as long as outputs are deterministic.

### Deferred ideas
- Fully autonomous AI publishing directly to production without review traces.
- Multi-tool BI dashboard rollout beyond deterministic exported artifacts.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| OPS-01 | CI fails on duplicate title/description/canonical conflicts. | Expand and enforce SEO metadata contract checks in CI using script + tests. |
| OPS-02 | CI fails on broken internal links for indexable pages. | Add deterministic internal-link checker based on route inventory + template link extraction. |
| OPS-03 | CI validates required structured data per template type. | Reuse and tighten schema presence checks as required CI gate. |
| OPS-04 | Publishing workflow supports AI-assisted volume but blocks publication unless quality checks pass. | Add publish-gate validator for AI-authored content/data contracts and CI workflow gate. |
| OPS-05 | Weekly SEO report summarizes indexed pages, traffic trend, and booked calls by cluster. | Build scheduled export pipeline that aggregates index/traffic + booked-call metrics into one weekly artifact. |
</phase_requirements>

## Summary

Phase 6 should formalize the quality controls already introduced in earlier phases into release-blocking automation. The repository already has deterministic SEO checks (`check-seo-contract`, `check-schema-presence`, `check-cluster-content`, `check-booked-call-attribution`) and fixture-driven reporting scripts (`export-booked-call-report`). The missing layer is orchestration: CI workflows, internal-link regression checks across all indexable routes, publish-gate checks for AI-assisted content updates, and a weekly operations report contract that combines indexation, traffic trend, and booked calls.

Recommended sequencing:
1. Establish CI quality gate workflow first (OPS-01/02/03) so every later change is guarded.
2. Add publish gate workflow and AI content validator (OPS-04) to protect scale operations.
3. Add weekly report generation and scheduled artifact export (OPS-05) using deterministic inputs.

## Existing Baseline (What We Can Reuse)

- `scripts/seo/check-seo-contract.mjs`: duplicate metadata/path checks and SEO policy assertions.
- `scripts/seo/check-schema-presence.mjs`: required schema token checks by template.
- `scripts/seo/check-cluster-content.mjs`: robust relationship/linking integrity pattern with fail-fast errors.
- `scripts/analytics/export-booked-call-report.mjs`: deterministic NDJSON aggregation by cluster/template/landing URL.
- `lib/seoPolicy.ts` + `app/sitemap.ts`: canonical indexable route ownership/source of truth for route inventory.
- Phase 5 event taxonomy and attribution flow (`lib/seo-events.ts`, `/api/events`) for traffic/booked-call metrics.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js scripts (`*.mjs`) | runtime default | Deterministic QA/reporting gates | Existing guardrail/reporting style already script-based |
| GitHub Actions | n/a | CI quality gates + scheduled reports | Repo currently has no workflow; this is the missing automation layer |
| Next.js build + ESLint + Vitest | existing | Compile and quality confidence in CI | Already used and validated in prior phases |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `typescript` compiler API (`typescript`) | existing | Safe TS module introspection for route/content contracts in scripts | Reuse pattern from `check-cluster-content.mjs` |
| Existing SEO/report scripts | existing | Building blocks for CI composite checks | OPS-01/03/05 |

## Architecture Patterns

### Pattern 1: Script-first CI contract
Use deterministic Node scripts as single source of truth for pass/fail logic, then call them from GitHub Actions. Avoid duplicating logic in YAML.

### Pattern 2: Indexable-route inventory for link validation
Build internal-link checks against a generated route inventory sourced from `lib/seoPolicy.ts`, slug exports, and content slugs. Validate that links on indexable templates resolve to known indexable targets (or allowed utility/legal routes).

### Pattern 3: Publish gate as content contract validator
Add AI publishing quality checks as a dedicated script that enforces minimum structure and guardrails (required metadata fields, no banned claims/phrases, slug and heading consistency, and required CTA patterns where applicable). Publishing is blocked if validator fails.

### Pattern 4: Weekly operations aggregation pipeline
Use one exporter that merges:
- indexed-page signals,
- traffic trend signals,
- booked-call conversion totals by cluster.
Output deterministic JSON/CSV artifacts and run on schedule in CI.

## Validation Architecture

### Gate Categories
1. **Release gates (blocking on PR/push):**
   - metadata/canonical uniqueness
   - schema presence
   - internal-link integrity
   - build/lint/tests
2. **Publish gates (blocking on content publish workflows):**
   - AI content quality validator
3. **Operational observability (scheduled):**
   - weekly SEO operations report export + artifact upload

### Feedback Latency Targets
- Script checks: under 60 seconds each on standard repo size.
- Build/test suite: existing baseline runtime.
- Weekly report generation: under 2 minutes with fixture-scale inputs.

### Deterministic Verification Sources
- Static route/index policy (`lib/seoPolicy.ts`)
- Dynamic slug exports (`lib/*Slugs`)
- Content markdown/data files (`content/blog`, `lib/guides.ts`, `lib/caseStudies.ts`, `lib/competitors.ts`)
- Attribution events/report inputs from Phase 5 scripts

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CI policy logic in YAML only | brittle inline bash with duplicated conditions | Node scripts under `scripts/` + thin workflow wrappers | easier local reproduction and maintenance |
| Link validation from ad hoc regex only | template-specific hardcoded assumptions | route inventory + normalized href resolution | catches regressions across clusters/templates |
| Weekly report as screenshots/manual notes | ad hoc docs-only reporting | deterministic JSON/CSV artifacts from script | reproducible, auditable, automation-friendly |

## Common Pitfalls

### Pitfall 1: CI gate runs only lint/build but not SEO contracts
**What goes wrong:** regressions pass CI despite SEO policy drift.
**Avoid:** enforce explicit script checks as required workflow steps.

### Pitfall 2: Internal-link checker ignores dynamic routes
**What goes wrong:** false positives/false negatives for slug-backed pages.
**Avoid:** derive route inventory from exported slug/data contracts and sitemap policy.

### Pitfall 3: Publish gate validates format but not claim safety
**What goes wrong:** high-volume AI content ships with unsupported or off-brand claims.
**Avoid:** include content quality/claim guardrails aligned to existing messaging and competitor safety docs.

### Pitfall 4: Weekly report lacks cluster mapping consistency
**What goes wrong:** traffic/booked-call numbers cannot be compared across weeks.
**Avoid:** normalize cluster derivation from URL prefixes and keep schema stable.

## Open Questions

1. Should indexed-page and traffic inputs come from Search Console API credentials in CI, or from a committed/ingested export artifact contract first?
2. Do we require publish gate checks only for changed content files, or full-repo content scans on every run?

## Sources

### Primary (HIGH confidence)
- `.planning/ROADMAP.md`
- `.planning/REQUIREMENTS.md`
- `.planning/STATE.md`
- `.planning/phases/05-booked-call-conversion-and-attribution/05-03-SUMMARY.md`
- `package.json`
- `scripts/seo/check-seo-contract.mjs`
- `scripts/seo/check-schema-presence.mjs`
- `scripts/seo/check-cluster-content.mjs`
- `scripts/seo/check-booked-call-attribution.mjs`
- `scripts/analytics/export-booked-call-report.mjs`
- `docs/seo/booked-call-reporting.md`
- `app/sitemap.ts`
- `lib/seo.ts`
- `lib/seoPolicy.ts`
- `lib/blog.ts`

### Secondary (MEDIUM confidence)
- `lib/guides.ts`
- `lib/caseStudies.ts`
- `lib/competitors.ts`
- `lib/__tests__/seo-policy.test.ts`

## Metadata

**Confidence breakdown:**
- CI + script architecture: HIGH
- Internal-link full-coverage strategy details: MEDIUM
- Weekly index/traffic ingestion approach: MEDIUM (depends on external data source decision)

**Research date:** 2026-03-03
**Valid until:** 2026-04-02

