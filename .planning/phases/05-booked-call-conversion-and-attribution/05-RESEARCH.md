# Phase 5: Booked-Call Conversion and Attribution - Research

**Researched:** 2026-03-03
**Domain:** SEO conversion reliability, attribution event taxonomy, and booked-call reporting
**Confidence:** MEDIUM-HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked decisions
- Primary conversion KPI is a booked call that starts from an SEO landing session.
- Cal.com booking remains the canonical booked-call destination, but all CTA links must be normalized through a shared builder so attribution parameters are attached consistently.
- Contact/demo form submissions are supporting conversions and must be captured through a real backend endpoint (no simulated success).
- Replace simulated contact form submission with a server-backed endpoint that validates required fields and returns explicit success/failure states.
- Keep current contact form UX shape (same fields and success/error states) and make backend behavior reliable first.
- Require graceful failure handling: user-visible error message, retry path, and no silent success.
- Every priority feature and industry detail page must expose at least one above-the-fold booked-call CTA and at least one lower-page CTA path (existing `CTASection` can satisfy lower-page placement).
- Use one shared CTA utility/component path for outbound booking links to avoid drift in UTM/attribution param attachment.
- Keep competitor, guides, and case-study CTA paths aligned to the same booking URL contract when present, but Phase 5 acceptance is gated first on feature/industry priority pages.
- Emit page-level SEO landing event on load for indexable SEO templates with standardized properties.
- Emit CTA interaction events for booked-call clicks and lead-form submissions (attempt/success/failure).
- Preserve first-touch attribution fields when present (`utm_*`, referrer, landing URL, and click IDs when available) and include template/cluster identifiers with each event.
- Event names should be explicit and stable (for example: `seo_landing_view`, `booked_call_cta_click`, `lead_form_submit_attempt`, `lead_form_submit_success`, `lead_form_submit_failure`).
- Reporting output must segment by cluster (`features`, `industries`, plus other indexed clusters), template type (detail/hub/page family), and landing URL.
- Booked-call performance reporting is the required output; supporting lead-form metrics are secondary but tracked.
- Prefer a deterministic exported reporting artifact (script/query/dashboard source) over ad hoc manual screenshots.

### Claude's discretion
- Choice of analytics vendor/library and backend delivery provider.
- Exact storage model for attribution context and event transport implementation details.
- Exact UX polish for loading, inline validation messaging, and retry copy.

### Deferred ideas
- Full CRM lifecycle automation and lead scoring beyond booked-call attribution.
- Multi-touch attribution modeling and channel-level MMM analysis.
- Paid media conversion tracking expansion and offline conversion upload workflows.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CRO-01 | Primary conversion event is booked call from SEO landing pages. | Use explicit `booked_call_cta_click` events with first-touch SEO context and deterministic `is_primary_conversion` derivation in reporting. |
| CRO-02 | Every priority feature/industry page includes a clear booked-call CTA path. | Normalize all priority CTA links through one shared booked-call URL builder and add guardrails to detect drift. |
| CRO-03 | Contact/demo form submissions use a real backend endpoint and handle success/failure states. | Replace simulated submit with `app/api/lead/route.ts` validation + deterministic response contract consumed by the contact page state machine. |
| CRO-04 | SEO landing sessions and CTA interactions emit page-level events with source attribution. | Implement typed client event contract + ingestion endpoint capturing first-touch fields (`utm_*`, referrer, landing URL, click IDs). |
| CRO-05 | Reporting can segment booked-call conversion by cluster, template type, and landing URL. | Add deterministic export script that aggregates event rows into cluster/template/landing segments with booked-call and lead metrics. |
</phase_requirements>

## Summary

Phase 5 is best implemented as a contract-first conversion layer on top of existing typed SEO templates. The current codebase already has stable template boundaries (`features`, `industries`, `compare`, `guides`, `case-studies`) plus shared CTA surfaces (`Button`, `CTASection`, nav components). The missing pieces are: a real backend lead endpoint, a single booked-call URL builder, and typed attribution event transport.

The lowest-risk approach is vendor-agnostic: keep event schema and segmentation logic inside the app, then support deterministic export from newline-delimited event data. This prevents lock-in and keeps reporting stable even if analytics providers change later.

Primary recommendation: implement shared conversion contracts first (URL builder + event taxonomy + lead API), then wire templates, then add scripted reporting and guardrails.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | `16.1.6` | Route handlers (`app/api/*`) and App Router template wiring | Already the runtime foundation for all SEO routes |
| `typescript` | `^5` | Typed event payloads and CTA URL contracts | Existing codebase is contract-first with typed `lib/*` modules |
| `vitest` | `^4.0.18` | Unit tests for URL builder/event payload normalization | Existing SEO contract work already uses Vitest |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `eslint` + `eslint-config-next` | existing | Lint enforcement on API/client script changes | Every touched plan in this phase |
| Node scripts (`scripts/seo/*`, `scripts/analytics/*`) | existing | Deterministic guardrails and reporting export | CRO-02 and CRO-05 enforcement |

### Alternatives considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vendor-agnostic event contract + export script | Provider-specific analytics SDK first | Faster dashboard setup, but higher lock-in and less deterministic schema control |
| Shared booked-call URL builder | Per-page hardcoded Cal.com links | Lower up-front effort but high drift risk and inconsistent attribution params |
| Route-handler lead endpoint | Third-party embed-only lead forms | Faster integration but weaker control of validation and explicit failure UX |

## Architecture Patterns

### Pattern 1: Shared booked-call URL contract
Create one utility (`lib/booked-call-url.ts`) that:
- owns canonical Cal.com destination
- merges allowed attribution params only (`utm_*`, click IDs, referrer hints, landing URL, cluster/template tags)
- prevents duplicated manual query-string logic across components/pages

### Pattern 2: Lead endpoint with explicit result envelope
Add `app/api/lead/route.ts` with:
- strict payload validation (`name`, `email` required)
- explicit JSON result envelope (`ok`, `errorCode`, `message`)
- deterministic 2xx/4xx/5xx mapping consumed by contact page state machine

### Pattern 3: Event taxonomy as typed contract
Centralize event names and payload requirements in `lib/seo-events.ts`:
- `seo_landing_view`
- `booked_call_cta_click`
- `lead_form_submit_attempt`
- `lead_form_submit_success`
- `lead_form_submit_failure`

Use one client transport helper with `navigator.sendBeacon` fallback to `fetch(..., { keepalive: true })`.

### Pattern 4: Deterministic segmentation reporting
Implement reporting script (`scripts/analytics/export-booked-call-report.mjs`) that:
- ingests NDJSON event rows
- normalizes cluster/template/landing dimensions
- outputs grouped metrics (booked-call clicks, lead attempts/success/failure, conversion rates)
- writes machine-readable output (`.json`/`.csv`) for reproducible reporting

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CTA attribution params | ad hoc string concatenation in JSX | shared URL builder utility | avoids drift and malformed links |
| Event naming | page-local arbitrary event labels | typed centralized event enum/contract | keeps reporting joins stable |
| Lead success UX | optimistic simulated success | explicit API result handling | prevents silent failures and false conversion data |

## Common Pitfalls

### Pitfall 1: First-touch attribution is overwritten by later clicks
**What goes wrong:** later navigation rewrites source params, corrupting original landing attribution.
**Avoid:** preserve first-touch values in stable client storage and merge into later CTA/lead events.

### Pitfall 2: CTA links drift across templates
**What goes wrong:** some pages keep raw Cal.com URLs, others append different params.
**Avoid:** replace direct booking URLs with one shared component/utility path and add script guardrail checks.

### Pitfall 3: Reporting script depends on provider-specific export shape
**What goes wrong:** provider migration breaks segmentation.
**Avoid:** normalize into internal event schema before aggregation.

## Code Examples

Verified local patterns to reuse:

### Existing dynamic template pattern
```typescript
// Source: app/features/[slug]/page.tsx
export function generateStaticParams() {
  return featureSlugs.map((slug) => ({ slug }));
}
```

### Existing central SEO policy contract
```typescript
// Source: lib/seoPolicy.ts
export function isIndexablePath(path: string): boolean {
  // static policy + dynamic prefixes
}
```

### Existing script guardrail pattern
```javascript
// Source: scripts/seo/check-cluster-content.mjs
ensure(condition, "message", errors);
```

## Open Questions

1. Which delivery target should `app/api/lead/route.ts` forward to first (email webhook, CRM webhook, or queue) in production deploys?
2. Should event storage start with provider export ingestion only, or should the app write a mirrored internal store from day one?

## Sources

### Primary (HIGH confidence)
- `.planning/phases/05-booked-call-conversion-and-attribution/05-CONTEXT.md`
- `.planning/ROADMAP.md`
- `.planning/REQUIREMENTS.md`
- `.planning/STATE.md`
- `app/contact/page.tsx`
- `app/features/[slug]/page.tsx`
- `app/industries/[slug]/page.tsx`
- `components/Button.tsx`
- `components/CTASection.tsx`
- `components/Navbar.tsx`
- `components/LandingNavbar.tsx`
- `app/layout.tsx`
- `app/sitemap.ts`
- `lib/seoPolicy.ts`
- `scripts/seo/check-seo-contract.mjs`
- `scripts/seo/check-cluster-content.mjs`

### Secondary (MEDIUM confidence)
- `.planning/codebase/ARCHITECTURE.md`
- `.planning/codebase/CONVENTIONS.md`
- `.planning/codebase/TESTING.md`

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH (based on in-repo dependencies and patterns)
- Architecture: MEDIUM-HIGH (vendor choice still open)
- Pitfalls: HIGH (directly visible from current code state)

**Research date:** 2026-03-03
**Valid until:** 2026-04-02

