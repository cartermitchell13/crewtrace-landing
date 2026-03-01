# Testing Patterns

**Analysis Date:** 2026-03-01

## Test Framework

**Runner:**
- Vitest 4.x (`vitest.config.ts`).
- jsdom test environment.
- Global test APIs enabled (`globals: true`).

**Assertion library:**
- Vitest built-in `expect` assertions.

**Run commands:**
```bash
npx vitest
npx vitest --watch
npx vitest components/__tests__/ComplianceAuditTool.test.ts
```

## Test File Organization

**Current location:**
- `components/__tests__/ComplianceAuditTool.test.ts`.

**Naming:**
- `*.test.ts` convention.

**Coverage of current tests:**
- Primarily scoring logic for compliance audit behavior.
- No broad test suite for route rendering, metadata generation, or sitemap logic.

## Test Structure

**Pattern observed:**
- `describe` blocks grouped by behavior domain.
- deterministic fixtures for "worst", "best", and "moderate" inputs.
- assertions on score ranges, risk levels, and derived outputs.

## Mocking

**Current approach:**
- No heavy mocking patterns in existing test file.
- Logic tested via local function copy instead of component-level integration.

## Fixtures and Factories

**Pattern observed:**
- Inline fixture objects inside the test file.
- No shared `fixtures/` or `factories/` directory currently.

## Coverage and Gaps

**Current state:**
- Coverage reporting is not configured in scripts.
- No `npm test` script in `package.json`.

**Major gaps:**
- No tests for dynamic route slug handling.
- No tests for metadata/canonical behavior.
- No tests for sitemap URL completeness.
- No tests for navigation/internal-link regressions.

## Recommendations

- Add `test` and `test:coverage` scripts to standardize runs.
- Move duplicated scoring logic into exportable utilities and test those directly.
- Add route-level integration tests for core SEO pages.
- Add regression tests for sitemap/robots outputs.

---
*Testing analysis: 2026-03-01*
*Update when test infrastructure or patterns change*
