# Template Copy Refresh Notes

Phase `08.1-03` aligns detail/comparison/contact templates to the deterministic queue in [`keyword-optimization-priority-map.md`](./keyword-optimization-priority-map.md).

## Summary

- Focus: intent clarity, proof-led sequencing, and stronger CTA transitions.
- Guardrails: no unsupported precision claims, messaging primitives centralized in `lib/messaging.ts`.
- Link integrity: feature, industry, guide, and case-study pathways were preserved.

## Contract Updates

### `lib/solutions.ts`
- Refined feature taglines/descriptions to emphasize verifiable workflows and payroll-decision outcomes.
- Tightened outcomes language to avoid generic claims and keep operational framing.
- Mapped to action types: `update`, `cta-test` for `/features` and `/features/[slug]`.

### `lib/industries.ts`
- Updated hero subtitle/hub descriptions to reduce vague language and improve trade-intent fit.
- Kept reciprocal feature-industry linkage data unchanged for deterministic graph integrity.
- Mapped to action types: `update`, `cta-test` for `/industries` and `/industries/[slug]`.

### `lib/competitors.ts`
- Reframed competitor summaries toward neutral decision guidance and implementation risk clarity.
- Updated soft CTA messaging for consultative conversion flow.
- Mapped to action types: `update`, `link-fix` for `/compare` and `/compare/[slug]`.

## Template Surface Updates

- `/features/[slug]`: simplified narrative order to pain -> workflow -> outcome -> related paths.
- `/industries/[slug]`: trade-intent hero and card hierarchy now mirrors decision sequence.
- `/compare`: clearer intent framing and stronger transition into comparison detail pages.
- `/compare/[slug]`: proof/resource blocks tightened with consistent CTA label from messaging primitives.
- `/contact`: lower-friction form framing with explicit next-step expectations.

## Traceability to Priority Map

| Route | action_type | owner | Status |
| --- | --- | --- | --- |
| `/features/[slug]` | `cta-test` | `growth-content` | Implemented in phase 08.1 |
| `/industries/[slug]` | `cta-test` | `growth-content` | Implemented in phase 08.1 |
| `/compare` | `update` | `seo-ops` | Implemented in phase 08.1 |
| `/compare/[slug]` | `link-fix` | `seo-ops` | Implemented in phase 08.1 |
| `/contact` | `cta-test` | `revops` | Implemented in phase 08.1 |
