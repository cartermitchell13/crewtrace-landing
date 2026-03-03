---
phase: 07-production-data-integration-and-contracts
verified: 2026-03-03T20:16:12.394Z
status: passed
score: 5/5 must-haves verified
---

# Phase 7: Production Data Integration and Contracts Verification Report

**Phase Goal:** Build trusted, production-backed data flow for SEO and booked-call analysis.  
**Verified:** 2026-03-03T20:16:12.394Z  
**Status:** passed

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Weekly reporting pipeline consumes production source data (no fixture-only release path). | VERIFIED | `scripts/analytics/build-weekly-seo-production-report.mjs` orchestrates production ingestion -> booked export -> weekly report; `.github/workflows/weekly-seo-report.yml` now runs this orchestrator path. |
| 2 | Ingestion jobs validate required schemas and fail fast on malformed rows. | VERIFIED | `scripts/analytics/lib/production-source-contracts.mjs` enforces required datasets/fields/timestamps; `scripts/seo/check-production-ingestion-contract.mjs` blocks on missing data/columns. |
| 3 | GA4 required SEO conversion events and landing dimensions are validated. | VERIFIED | `scripts/analytics/validate-ga4-readiness.mjs` enforces required events (`seo_landing_view`, `booked_call_cta_click`, `booked_call_embed_interaction`) and required dimensions (`cluster`, `template_type`, `landing_url`). |
| 4 | Attribution joins preserve first-touch landing dimensions and deterministic conversion keys. | VERIFIED | `lib/seo-events.ts` emits deterministic `conversion_key`; `scripts/analytics/export-booked-call-report.mjs` outputs `conversion_key` plus `first_touch_*` fields and join diagnostics. |
| 5 | URL/cluster/template normalization is consistent across ingestion, joins, and reporting outputs. | VERIFIED | `scripts/analytics/lib/weekly-report-cluster-map.mjs` exposes canonical normalization helpers used by ingestion and weekly exporter (`fetch-production-source-data.mjs`, `export-weekly-seo-ops-report.mjs`). |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/analytics/lib/weekly-report-window.mjs` | UTC previous-week and freeze helper | EXISTS + SUBSTANTIVE | Resolves previous Monday-Sunday UTC and freeze metadata keys. |
| `scripts/analytics/lib/production-source-contracts.mjs` | Source contract definitions + validators | EXISTS + SUBSTANTIVE | Required datasets/fields/timestamps for indexed, traffic, booked events, GA4. |
| `scripts/analytics/fetch-production-source-data.mjs` | Production ingestion entrypoint | EXISTS + SUBSTANTIVE | Validates contracts, filters weekly rows, writes normalized artifacts. |
| `scripts/seo/check-production-ingestion-contract.mjs` | Blocking ingestion contract check | EXISTS + SUBSTANTIVE | Fails on missing datasets/columns or no rows in target week. |
| `scripts/analytics/validate-ga4-readiness.mjs` | GA4 readiness validator | EXISTS + SUBSTANTIVE | Fails on missing required GA4 events, dimensions, or timestamps. |
| `scripts/analytics/build-weekly-seo-production-report.mjs` | End-to-end weekly production orchestrator | EXISTS + SUBSTANTIVE | Chains ingestion, booked report, and weekly report build for one week. |
| `scripts/analytics/export-booked-call-report.mjs` | Join-ready booked-call export | EXISTS + SUBSTANTIVE | Emits `conversion_key` and first-touch join fields in JSON/CSV rows. |
| `scripts/analytics/export-weekly-seo-ops-report.mjs` | Normalized weekly operations export | EXISTS + SUBSTANTIVE | Outputs rows normalized by canonical landing URL, cluster, and template. |
| `.github/workflows/seo-quality.yml` | Release-blocking data contract checks | EXISTS + SUBSTANTIVE | Runs `seo:check:all` plus explicit production data contract checks before build. |
| `.github/workflows/weekly-seo-report.yml` | Scheduled production pipeline workflow | EXISTS + SUBSTANTIVE | Runs weekly schedule and uploads generated artifacts from production orchestrator. |
| `docs/seo/production-data-contracts.md` | Ingestion contract runbook | EXISTS + SUBSTANTIVE | Documents required sources, fail-fast behavior, and diagnostics. |
| `docs/seo/ga4-event-contract.md` | GA4 event contract runbook | EXISTS + SUBSTANTIVE | Documents required GA4 events/dimensions and release-gate remediation flow. |
| `docs/seo/weekly-seo-operations-reporting.md` | Production weekly reporting runbook | EXISTS + SUBSTANTIVE | Documents orchestrator command, outputs, and failure remediation. |

**Artifacts:** 13/13 verified

## Requirements Coverage

| Requirement | Status | Blocking Issue |
|-------------|--------|----------------|
| DATA-01: Weekly SEO operations reporting uses production data sources instead of fixtures. | SATISFIED | - |
| DATA-02: Ingestion jobs pull and validate required fields from each source on schedule. | SATISFIED | - |
| DATA-05: GA4 required SEO conversion events/dimensions are validated in reports. | SATISFIED | - |
| DATA-03: Booked-call outcomes are joinable to first-touch attribution with deterministic keys. | SATISFIED | - |
| DATA-04: URL normalization maps rows to canonical landing URL/cluster/template dimensions. | SATISFIED | - |
| OPS-10: CI validates data-ingestion/reporting contracts and blocks malformed artifacts. | SATISFIED | - |

**Coverage:** 6/6 requirements satisfied

## Human Verification Required

None - phase must-haves were validated through implementation evidence and automated contract/reporting checks.

## Gaps Summary

No gaps found. Phase goal achieved.

## Verification Metadata

**Verification approach:** Goal-backward validation from roadmap success criteria, phase plan must-haves, and release/scheduled workflow contract wiring.  
**Automated checks:** `node scripts/analytics/fetch-production-source-data.mjs --week 2026-02-23 --indexed ... --traffic ... --booked-events ... --output ...`, `node scripts/seo/check-production-ingestion-contract.mjs --indexed ... --traffic ... --booked-events ...`, `npx vitest run lib/__tests__/seo-events.test.ts`, `node scripts/analytics/validate-ga4-readiness.mjs --input scripts/analytics/fixtures/ga4/ga4-events.weekly.sample.csv`, `node scripts/analytics/build-weekly-seo-production-report.mjs --week 2026-02-23 --indexed ... --traffic ... --booked-events ... --ga4 ... --output ...`, `npm run seo:check:all`.  
**Human checks required:** 0  
**Total verification time:** 8 min

---
*Verified: 2026-03-03T20:16:12.394Z*  
*Verifier: Codex*

