# Phase 7: Production Data Integration and Contracts - Context

**Gathered:** 2026-03-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace fixture-based weekly SEO/booked-call reporting inputs with validated production ingestion (including GA4), enforce event/data contracts, preserve deterministic attribution joins, and keep canonical URL/cluster/template normalization consistent across ingestion, scoring, and reporting.

</domain>

<decisions>
## Implementation Decisions

### Data window and cadence
- Weekly reporting window is the previous Monday-Sunday in UTC.
- Weekly data freezes after the first successful run; no backfill reruns for the same week.
- Weekly run fails if any required source dataset is missing for the full week.
- Week inclusion is based on source occurrence timestamps (`occurred_at` or source date) in UTC, not ingestion time.

### GA4 event contract
- Required tracked event set for Phase 7:
  - `seo_landing_view`
  - `booked_call_cta_click`
  - `booked_call_embed_interaction` (new)
- Required dimensions on tracked events are core attribution dimensions:
  - `cluster`
  - `template_type`
  - `landing_url`
- `event` and `occurred_at` remain required core fields for all events.
- GA4 readiness is a strict release gate: missing required events or required dimensions fails validation/release.

### Claude's Discretion
- Exact GA4 ingestion mechanism and job wiring (API pull shape, scheduling internals, and secret/env handling).
- Exact implementation pattern for Cal embed interaction capture (for example, embed hooks or postMessage bridge) as long as it reliably emits `booked_call_embed_interaction`.
- Exact validator organization (single script vs split checks) as long as release gating is enforced.

</decisions>

<specifics>
## Specific Ideas

- Keep weekly outputs deterministic and stable for downstream scoring/ops by preventing same-week restatement.
- Track interaction intent on the Cal embed explicitly rather than conflating all actions into CTA click events.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/analytics/export-weekly-seo-ops-report.mjs`: Existing weekly rollup pipeline with required-column checks and deterministic JSON/CSV outputs.
- `scripts/analytics/export-booked-call-report.mjs`: Existing event aggregation contract for booked-call funnel events and required dimensions.
- `scripts/analytics/lib/weekly-report-cluster-map.mjs`: Shared URL normalization and cluster mapping (`normalizeUrlPath`, `mapUrlToCluster`, ordered cluster list).
- `lib/seo-events.ts`: Central event taxonomy/types and payload-building helpers used by UI tracking components.
- `app/api/events/route.ts`: Event ingestion endpoint with payload validation, timestamp normalization, and optional webhook forwarding.
- `.github/workflows/weekly-seo-report.yml`: Existing scheduled weekly report workflow to evolve from fixture inputs to production inputs.

### Established Patterns
- Fixture-first, deterministic reporting contracts with fail-fast validation on required fields.
- Canonical cluster segmentation by normalized URL path via shared helper module.
- Contract-driven event taxonomy centralized in `lib/seo-events.ts` and reused across templates/components.
- Weekly ops artifacts emitted in both JSON and CSV for machine + analyst consumers.

### Integration Points
- Replace fixture-based input plumbing in weekly reporting workflow with production source fetch/ingestion jobs.
- Extend event contract and downstream aggregators to include `booked_call_embed_interaction`.
- Add GA4 contract validation into release gating (`seo:check:*` flow / CI checks) so required events/dimensions block release when missing.

</code_context>

<deferred>
## Deferred Ideas

- Replace lead form flow with a Cal.com embed experience as a product/UI capability change (future phase scope).

</deferred>

---

*Phase: 07-production-data-integration-and-contracts*
*Context gathered: 2026-03-03*
