# Stack Research

**Domain:** SEO growth engine for conversion-focused marketing site operations
**Researched:** 2026-03-03
**Confidence:** MEDIUM

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js App Router | Existing in repo | Route generation and server/client composition | Already production baseline; supports deterministic template rendering and API endpoints. |
| TypeScript | Existing in repo | Contracts for page content, events, and reporting payloads | Critical for pSEO scale where schema drift causes silent failures. |
| Node.js script pipeline | Existing in repo | Scheduled reporting, validation checks, data transforms | Keeps ops checks reproducible in CI and local workflows. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Google Search Console API client | Current stable at implementation time | Pull query/page index and performance data | Use in data ingestion phase for production weekly reporting. |
| Analytics provider SDK (GA4/measurement export) | Current stable at implementation time | Session and landing behavior ingestion | Use when merging SEO and on-site behavior in one model. |
| Validation library already used in repo | Existing in repo | Ingestion schema and event payload validation | Use at data boundaries to block malformed rows/events. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Existing CI workflows | Release and quality gates | Extend current workflows rather than adding parallel pipelines. |
| Existing script guardrails | Regression checks for SEO/CTA/reporting wiring | Add new checks for ingestion contracts and opportunity outputs. |

## Installation

```bash
# No mandatory stack migration required for v1.1.
# Add provider SDKs only when integration implementation begins.
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Script-first ingestion in repo | External ETL platform first | Use external ETL when data volume or connector breadth exceeds current ops capacity. |
| Typed contracts in app repo | Spreadsheet-driven mapping | Only for one-off investigations, not production pipelines. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Unvalidated webhook/event ingestion | Leads to reporting drift and trust loss in metrics | Schema-validated ingestion with explicit failure logs. |
| Manual page-priority decisions without scoring | Creates inconsistent output and bias | Deterministic opportunity scoring with explicit inputs. |

## Stack Patterns by Variant

**If data source access is limited:**
- Use export-file ingestion jobs with strict schema checks.
- Because it preserves deterministic outputs before direct APIs are unlocked.

**If API access is available:**
- Use scheduled pull jobs with checkpointed cursors and idempotent merges.
- Because it reduces manual operations and keeps weekly reports fresh.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Existing Next.js + Node runtime | Existing repo toolchain | Keep dependencies aligned with current lockfile and CI runtime. |

## Sources

- Existing repo architecture and workflows (`.planning/milestones/v1.0-ROADMAP.md`, `.planning/PROJECT.md`) - High confidence
- Existing script and CI patterns in this codebase - High confidence
- Industry-practice inference for SEO data operations - Medium confidence

---
*Stack research for: SEO growth operations on Crewtrace*
*Researched: 2026-03-03*
