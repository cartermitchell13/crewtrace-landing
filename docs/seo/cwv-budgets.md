# Core Web Vitals Budgets

## Targets (mobile, p75)
- LCP: <= 2.5s
- INP: <= 200ms
- CLS: <= 0.10

## Template Priority
- Highest priority: home, feature detail, industry detail.
- Medium priority: guides, case studies, blog detail.
- Lower priority: utility and legal pages.

## Enforcement
- `scripts/seo/check-seo-contract.mjs` validates that this budget file exists and includes required target keys.
- CI should run the SEO checks on every pull request touching SEO templates.

## Notes
- Budgets are conservative defaults for this phase and can be tightened after baseline measurement.
- Failing CWV budgets should block release for high-priority templates.

