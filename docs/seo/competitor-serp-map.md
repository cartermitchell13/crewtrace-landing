# Competitor SERP Map

## Scope

This matrix tracks launch ownership for competitor-intent demand tied to `connecteam` and `workyard`.
The source of truth is `lib/competitors.ts`. This document is an operator-facing mirror for review workflows.

## Canonical Ownership Guardrail

- Competitor intent is owned by `/compare/[slug]` pages.
- Feature intent remains owned by `/features/[slug]` pages.
- Industry intent remains owned by `/industries/[slug]` pages.
- Proof-led migration and implementation concerns route into guides and case studies linked from competitor pages.

## SERP Matrix

| Competitor | Intent category | Primary terms | Secondary terms | Safe-claim posture | Review cadence |
|---|---|---|---|---|---|
| Connecteam | comparison | `Crewtrace vs connecteam`, `connecteam alternative` | `connecteam time tracking for construction`, `connecteam payroll export` | Verified product-doc and customer-proof claims only; migration framing uses cautious inference language | Every 30 days (`lastReviewedOn: 2026-03-03`) |
| Connecteam | pricing | `connecteam pricing alternatives` | `connecteam cost for contractors` | Pricing references must be timestamped and sourced; no evergreen guarantees | Every 30 days (`lastReviewedOn: 2026-03-03`) |
| Workyard | comparison | `Crewtrace vs workyard`, `workyard alternative` | `workyard payroll tracking`, `workyard for contractors` | Verified product-doc and customer-proof claims only; neutral side-by-side framing | Every 30 days (`lastReviewedOn: 2026-03-03`) |
| Workyard | reviews | `workyard reviews for contractors` | `workyard overtime tracking alternative` | Use first-party evidence and avoid unverifiable parity/superiority language | Every 30 days (`lastReviewedOn: 2026-03-03`) |

## Notes

- Review cadence enforcement is automated by `scripts/seo/check-competitor-content.mjs`.
- Contextual links from competitor pages must resolve to valid feature, industry, guide, and case-study slugs.
- If coverage changes in `lib/competitors.ts`, update this matrix in the same commit.
