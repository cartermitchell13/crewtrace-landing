# Keyword Optimization Priority Map

Phase `08.1` uses a deterministic backlog generated from weekly SEO operations data.  
Command:

```bash
node scripts/analytics/build-keyword-priority-map.mjs \
  --input .planning/phases/06-qa-automation-and-scale-operations/.tmp-weekly-report/weekly-seo-ops-report.json \
  --output .planning/phases/08.1-content-and-ui-optimization-for-keyword-ranking/.tmp-priority-map.json
```

The generated artifact always includes:
- `template_type`
- `action_type`
- `owner`
- `status`
- `rationale`

## First Optimization Wave

| Rank | Route | template_type | action_type | owner | status | rationale |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `/` | `home` | `update` | `growth-content` | `ready` | Highest entry-point visibility with strong conversion intent and direct booked-call path. |
| 2 | `/features` | `features_hub` | `update` | `growth-content` | `ready` | Primary feature-intent hub with downstream links into detail templates. |
| 3 | `/industries` | `industries_hub` | `update` | `growth-content` | `ready` | Trade-specific search intent hub with high internal-link leverage. |
| 4 | `/features/[slug]` | `feature_detail` | `cta-test` | `growth-content` | `queued` | Detail pages carry high-intent visitors and benefit from proof-to-CTA tightening. |
| 5 | `/industries/[slug]` | `industry_detail` | `cta-test` | `growth-content` | `queued` | Industry pages require stronger objection handling and decision CTA sequencing. |
| 6 | `/compare` | `compare_hub` | `update` | `seo-ops` | `queued` | Competitive-intent route with opportunity to improve framing and route depth. |
| 7 | `/compare/[slug]` | `compare_detail` | `link-fix` | `seo-ops` | `queued` | Preserve and strengthen proof-link pathways to feature, guide, and case-study assets. |
| 8 | `/contact` | `contact` | `cta-test` | `revops` | `queued` | Final conversion surface where friction-reduction and CTA clarity impact booked calls. |

## Operating Rules

- Regenerate map weekly from the most recent report artifact.
- Sort by `opportunity_score` and execute top-ranked items first.
- Any copy/UI work must pass `npm run seo:check-messaging` and `npm run seo:check-template-content`.
- Status progression should be deterministic: `ready` -> `queued` -> `in_progress` -> `done`.
