# Phase 7: Production Data Integration and Contracts - Research

**Researched:** 2026-03-03
**Domain:** Production source ingestion, GA4 conversion contracts, deterministic attribution joins
**Confidence:** MEDIUM-HIGH

<user_constraints>
## User Constraints

### Locked decisions
- Weekly reporting window is previous Monday-Sunday in UTC.
- Weekly data freezes after the first successful run; same-week reruns are not allowed.
- Runs fail if any required source dataset is missing for the full weekly window.
- Week inclusion uses source occurrence timestamps (`occurred_at` or source date) in UTC (not ingestion time).
- Required GA4 events for this phase:
  - `seo_landing_view`
  - `booked_call_cta_click`
  - `booked_call_embed_interaction`
- Required GA4 dimensions for tracked events:
  - `cluster`
  - `template_type`
  - `landing_url`
- GA4 readiness is a strict release gate.

### Claude's discretion
- Exact ingestion/fetch wiring for production sources.
- Exact Cal embed interaction capture mechanism (embed hooks or postMessage bridge).
- Exact validator organization (single script vs modular scripts).

### Deferred ideas
- Replacing the lead form flow with a Cal.com embed product experience change.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DATA-01 | Weekly reporting uses production sources instead of fixtures. | Introduce production source fetch + normalize pipeline and feed weekly exporter with validated outputs. |
| DATA-02 | Ingestion jobs validate required fields on schedule. | Add explicit schema contracts per source plus fail-fast ingestion validator. |
| DATA-05 | GA4 setup and required conversion events/dimensions are validated. | Add GA4 readiness validator for required event names + dimensions and wire into release checks. |
| DATA-03 | Booked-call outcomes join to first-touch attribution with deterministic event keys. | Extend event/report contracts to carry deterministic conversion keys and preserve first-touch landing dimensions through joins. |
| DATA-04 | URL normalization maps rows to canonical landing URL, cluster, template dimensions. | Reuse shared normalization helpers as single source of truth across ingestion, reporting, and scoring inputs. |
| OPS-10 | CI validates ingestion/reporting contracts and blocks malformed artifacts. | Add contract checks into `seo:check:*` and CI workflow steps before build/release. |
</phase_requirements>

## Summary

Phase 7 should convert the existing fixture-backed reporting foundation into a production-grade ingestion contract without breaking deterministic outputs established in Phase 6. The codebase already has reusable URL/cluster normalization (`weekly-report-cluster-map.mjs`), event taxonomy + payload parsing (`lib/seo-events.ts`), and scheduled weekly report automation (`weekly-seo-report.yml`). The gap is source trust: provider-backed ingestion, schema validation gates, GA4 event/dimension readiness, and deterministic attribution key propagation from event ingestion to weekly aggregates.

Recommended sequence:
1. Define production-source and weekly-window contracts first (window semantics, required columns, freeze behavior).
2. Lock GA4/event contracts (including `booked_call_embed_interaction`) with deterministic key support and readiness validation.
3. Integrate ingestion + joins into weekly exports and CI release gates.

## Existing Baseline (What We Can Reuse)

- `scripts/analytics/export-weekly-seo-ops-report.mjs`: deterministic weekly aggregation/output shape.
- `scripts/analytics/export-booked-call-report.mjs`: segmented conversion report scaffold from event streams.
- `scripts/analytics/lib/weekly-report-cluster-map.mjs`: canonical URL normalization and cluster mapping.
- `lib/seo-events.ts`: centralized event taxonomy, payload parsing/building.
- `lib/first-touch-attribution.ts`: first-touch capture and merge utilities.
- `app/api/events/route.ts`: server-side event payload validation + timestamp normalization.
- `.github/workflows/weekly-seo-report.yml`: existing weekly automation entrypoint.
- `.github/workflows/seo-quality.yml` and `package.json` `seo:check:*` scripts: existing release gate pattern.

## Standard Stack

### Core
| Library/Tool | Purpose | Why Standard |
|--------------|---------|--------------|
| Node.js scripts (`scripts/analytics/*.mjs`, `scripts/seo/*.mjs`) | Ingestion, validation, deterministic exports | Existing guardrail + reporting architecture is script-first and reproducible. |
| GitHub Actions workflows | Scheduled reporting and release blocking | Existing repo pattern for deterministic gates and automation. |
| Vitest (`lib/__tests__`) | Contract-level behavior checks for shared TS modules | Existing testing style for event/policy contracts. |

### Supporting
| Asset | Purpose | When to Use |
|-------|---------|-------------|
| Fixture contracts | Deterministic validation for parser/schema changes | Local regression checks and CI smoke checks. |
| Shared URL mapper (`weekly-report-cluster-map.mjs`) | Canonical cluster/template normalization | Any ingestion or reporting path that touches landing URLs. |

## Architecture Patterns

### Pattern 1: Contract-before-ingestion
Define required fields and timestamp semantics in reusable modules before implementing provider fetch logic. Ingestion scripts should consume those contracts and fail on first malformed source.

### Pattern 2: Deterministic weekly windowing
All inputs are filtered by source occurrence timestamp into previous Monday-Sunday UTC. First successful run stamps freeze metadata and blocks same-week reruns.

### Pattern 3: Event contract propagation
GA4/event taxonomy updates must flow through:
- TS payload builders/parsers
- API ingestion endpoint validation
- reporting aggregators
- contract check scripts
to avoid partial contract drift.

### Pattern 4: Canonical normalization as shared dependency
Every ingestion/join path should map URLs through one normalization layer before cluster/template attribution, preventing split metrics from URL variants.

## Validation Architecture

### Gate categories
1. **Ingestion contract gates (blocking):**
   - Required source presence for weekly window
   - Required fields and timestamp validity checks
2. **GA4 readiness gates (blocking):**
   - Required event names present
   - Required dimensions present and populated
3. **Reporting contract gates (blocking):**
   - Weekly exporter output schema + deterministic dimensions
4. **Scheduled operations gates:**
   - Weekly workflow executes ingestion + export against production inputs and uploads artifacts

### Feedback latency targets
- Contract checks: under 60 seconds each with fixture-scale inputs.
- End-to-end weekly pipeline smoke run: under 3 minutes in CI.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Multiple ad hoc URL mappers | New normalization logic per script | `normalizeUrlPath` + `mapUrlToCluster` shared helper | Prevents attribution drift by path variant. |
| Hardcoded one-off GA4 checks in workflow YAML | Inline brittle shell assertions | Reusable `scripts/seo` or `scripts/analytics` validators | Local reproducibility and stable diagnostics. |
| Ingestion keyed by processing time | Ingestion timestamp filters | Source occurrence timestamp (`occurred_at` / source date) | Preserves deterministic weekly windows and joins. |

## Common Pitfalls

### Pitfall 1: Partial GA4 contract rollout
**Risk:** Event names update in frontend but parser/report validators still use old taxonomy.
**Avoid:** Update taxonomy, parser, contract checks, and docs in the same plan.

### Pitfall 2: Weekly window based on ingestion time
**Risk:** Late-arriving rows mutate closed weeks.
**Avoid:** Filter by source event date/time and freeze completed weeks.

### Pitfall 3: URL normalization drift across scripts
**Risk:** Same landing page appears under multiple URLs/clusters.
**Avoid:** Route all joins through shared normalization helpers.

### Pitfall 4: CI checks only validate code style, not data contracts
**Risk:** Malformed source artifacts pass release gates and break scheduled reporting.
**Avoid:** Add ingestion/reporting contract validators to blocking `seo:check:*` workflow steps.

## Open Questions

1. Which production transport is canonical per source in v1.1 (API pull, signed artifact URL, or warehouse export)?
2. Should weekly freeze state live in repo artifacts, CI artifact metadata, or external storage?
3. What minimal GA4 export shape is guaranteed in CI for deterministic readiness checks?

## Sources

### Primary (HIGH confidence)
- `.planning/ROADMAP.md`
- `.planning/REQUIREMENTS.md`
- `.planning/STATE.md`
- `.planning/phases/07-production-data-integration-and-contracts/07-CONTEXT.md`
- `scripts/analytics/export-weekly-seo-ops-report.mjs`
- `scripts/analytics/export-booked-call-report.mjs`
- `scripts/analytics/lib/weekly-report-cluster-map.mjs`
- `lib/seo-events.ts`
- `lib/first-touch-attribution.ts`
- `app/api/events/route.ts`
- `.github/workflows/weekly-seo-report.yml`
- `.github/workflows/seo-quality.yml`
- `package.json`

### Secondary (MEDIUM confidence)
- `docs/seo/booked-call-reporting.md`
- `docs/seo/weekly-seo-operations-reporting.md`
- `lib/__tests__/seo-events.test.ts`

## Metadata

**Confidence breakdown:**
- Ingestion/reporting architecture fit with current codebase: HIGH
- GA4 production source wiring details: MEDIUM
- Weekly freeze persistence strategy: MEDIUM

**Research date:** 2026-03-03
**Valid until:** 2026-04-02

