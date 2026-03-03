---
phase: 06-qa-automation-and-scale-operations
plan: 01
subsystem: infra
tags: [seo-guardrails, ci, quality-gates, link-validation]
requires:
  - phase: 05-03
    provides: attribution guardrail/reporting scripts reused in composite quality checks
provides:
  - ast-backed metadata and canonical ownership guardrails
  - indexable internal-link integrity checks with shared route inventory contracts
  - release-blocking seo quality workflow and operator runbook
affects: [phase-06 publish gate, phase-06 weekly reporting, seo release process]
tech-stack:
  added: []
  patterns:
    - ast-based metadata contract validation for dynamic and static templates
    - shared route inventory module consumed by link validation scripts
    - ci fast-fail ordering for seo checks before lint/build
key-files:
  created:
    - scripts/seo/check-internal-links.mjs
    - scripts/seo/lib/route-inventory.mjs
    - .github/workflows/seo-quality.yml
    - docs/seo/qa-quality-gates.md
  modified:
    - scripts/seo/check-seo-contract.mjs
    - scripts/seo/check-schema-presence.mjs
    - lib/__tests__/seo-policy.test.ts
    - lib/__tests__/schema.test.ts
    - package.json
key-decisions:
  - "Metadata ownership guardrails use TypeScript AST parsing to avoid template-literal regex drift."
  - "Internal-link checks derive route inventory from seo policy plus shared slug/content contracts."
  - "CI lint gate is scoped to SEO quality files via lint:seo because full-repo lint has pre-existing unrelated debt."
patterns-established:
  - "Quality gate scripts remain deterministic and executable locally via npm scripts."
  - "Workflow ordering runs seo:check:all before heavier test/lint/build steps."
requirements-completed: [OPS-01, OPS-02, OPS-03]
duration: 4 min
completed: 2026-03-03
---

# Phase 6 Plan 01: Implement CI checks for metadata uniqueness, internal links, and schema presence Summary

**SEO release guardrails are now enforced by AST metadata ownership checks, route-inventory-backed internal-link validation, and a blocking CI workflow with reproducible local commands.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-03T10:01:20-08:00
- **Completed:** 2026-03-03T10:05:47-08:00
- **Tasks:** 3
- **Files modified:** 9

## Accomplishments
- Hardened `check-seo-contract` to validate canonical ownership for both static and dynamic templates without regex fragility.
- Added shared route inventory + internal-link checker that validates indexable template paths against static policy and slug contracts.
- Added release-blocking `seo-quality` GitHub Actions workflow, composite npm scripts, and QA runbook for local reproduction.

## Task Commits

Each task was committed atomically:

1. **Task 1: Harden metadata/canonical and schema guardrail contracts** - `fcfad79` (feat)
2. **Task 2: Add indexable internal-link integrity checker** - `09ead72` (feat)
3. **Task 3: Wire quality gate scripts into blocking CI workflow** - `5a89828` (feat)

**Plan metadata:** pending (committed with phase closeout docs updates)

## Files Created/Modified
- `scripts/seo/check-seo-contract.mjs` - AST-based metadata ownership and canonical conflict checks for static/dynamic templates.
- `scripts/seo/check-schema-presence.mjs` - Expanded schema token coverage including competitor detail template.
- `lib/__tests__/seo-policy.test.ts` - Added static ownership and compare-route indexability assertions.
- `lib/__tests__/schema.test.ts` - Added absolute URL/default author/dateModified behavior assertions.
- `scripts/seo/lib/route-inventory.mjs` - Shared indexable/non-indexable route inventory builder from policy + slug contracts.
- `scripts/seo/check-internal-links.mjs` - Internal link validator for indexable templates and shared nav components.
- `package.json` - Added `seo:check-links`, `seo:check:all`, and `lint:seo` scripts.
- `.github/workflows/seo-quality.yml` - Blocking CI workflow for guardrails, focused tests, lint scope, and build.
- `docs/seo/qa-quality-gates.md` - Operator runbook for commands, failure interpretation, and inventory provenance.

## Decisions Made
- Used TypeScript AST parsing for metadata guardrail analysis to correctly support template literal paths (for example `/features/${slug}`).
- Kept internal-link checks source-driven with explicit ignore rules for assets/api paths and explicit allowance for utility/legal non-indexable pages.
- Scoped lint in this workflow to SEO quality-gate surfaces (`lint:seo`) to avoid blocking this phase on unrelated pre-existing lint debt.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Full-repo lint debt blocked workflow reproducibility**
- **Found during:** Task 3 (Wire quality gate scripts into blocking CI workflow)
- **Issue:** `npm run lint` fails on pre-existing unrelated `.codex/*` and UI lint violations, preventing this phase from producing a stable CI gate.
- **Fix:** Added `lint:seo` and wired workflow/docs to the SEO quality-gate lint scope while preserving explicit note that full-repo lint remains separate debt.
- **Files modified:** `package.json`, `.github/workflows/seo-quality.yml`, `docs/seo/qa-quality-gates.md`
- **Verification:** `npm run lint:seo` passes; workflow command chain passes locally.
- **Committed in:** `5a89828` (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Deviation kept phase intent intact by preserving release-blocking SEO gates without introducing unrelated lint-remediation scope creep.

## Issues Encountered
- Full-repo lint command (`npm run lint`) still fails because of pre-existing project debt outside this phase scope. Resolved for this workflow by introducing scoped lint parity (`npm run lint:seo`).

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Wave 1 CI guardrails are complete and verified locally.
- Phase 6 Wave 2 plans (`06-02` publish gate and `06-03` weekly reporting) can now layer on top of blocking quality checks.

---
*Phase: 06-qa-automation-and-scale-operations*
*Completed: 2026-03-03*

