# Phase 5: Booked-Call Conversion and Attribution - Context

**Gathered:** 2026-03-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Turn SEO traffic into measurable booked calls by (1) replacing simulated lead capture with a production flow, (2) enforcing clear booked-call CTA paths across priority SEO templates, (3) emitting attribution-ready events for SEO landings and CTA interactions, and (4) enabling reporting segmented by cluster, template type, and landing URL.

</domain>

<decisions>
## Implementation Decisions

### Conversion source of truth
- Primary conversion KPI is a booked call that starts from an SEO landing session.
- Cal.com booking remains the canonical booked-call destination, but all CTA links must be normalized through a shared builder so attribution parameters are attached consistently.
- Contact/demo form submissions are supporting conversions and must be captured through a real backend endpoint (no simulated success).

### Lead flow behavior and validation
- Replace simulated contact form submission with a server-backed endpoint that validates required fields and returns explicit success/failure states.
- Keep current contact form UX shape (same fields and success/error states) and make backend behavior reliable first.
- Require graceful failure handling: user-visible error message, retry path, and no silent success.

### CTA path coverage contract
- Every priority feature and industry detail page must expose at least one above-the-fold booked-call CTA and at least one lower-page CTA path (existing `CTASection` can satisfy lower-page placement).
- Use one shared CTA utility/component path for outbound booking links to avoid drift in UTM/attribution param attachment.
- Keep competitor, guides, and case-study CTA paths aligned to the same booking URL contract when present, but Phase 5 acceptance is gated first on feature/industry priority pages.

### Event taxonomy and attribution payload
- Emit page-level SEO landing event on load for indexable SEO templates with standardized properties.
- Emit CTA interaction events for booked-call clicks and lead-form submissions (attempt/success/failure).
- Preserve first-touch attribution fields when present (`utm_*`, referrer, landing URL, and click IDs when available) and include template/cluster identifiers with each event.
- Event names should be explicit and stable (for example: `seo_landing_view`, `booked_call_cta_click`, `lead_form_submit_attempt`, `lead_form_submit_success`, `lead_form_submit_failure`).

### Reporting segmentation contract
- Reporting output must segment by cluster (`features`, `industries`, plus other indexed clusters), template type (detail/hub/page family), and landing URL.
- Booked-call performance reporting is the required output; supporting lead-form metrics are secondary but tracked.
- Prefer a deterministic exported reporting artifact (script/query/dashboard source) over ad hoc manual screenshots.

### Claude's Discretion
- Choice of analytics vendor/library and backend delivery provider.
- Exact storage model for attribution context and event transport implementation details.
- Exact UX polish for loading, inline validation messaging, and retry copy.

</decisions>

<specifics>
## Specific Ideas

- Keep conversion messaging consistent around "free audit / booked call" while normalizing CTA destination and event naming.
- Preserve existing page design and copy patterns in Phase 5; focus changes on conversion reliability and attribution observability.
- Treat analytics provider selection as implementation detail, but enforce a vendor-agnostic event contract at the app layer.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/contact/page.tsx`: Existing form UI/state machine (`idle/submitting/success/error`) to keep while replacing simulated submit with real backend integration.
- `components/Button.tsx`: Shared outbound CTA primitive already used for booked-call links; natural place to centralize booking URL + tracking parameter attachment.
- `components/CTASection.tsx`: Reused lower-funnel CTA block present on multiple templates.
- `app/sitemap.ts` + slug exports in `lib/*`: Stable source for template/cluster enumeration useful for coverage checks and reporting dimensions.
- `lib/seoPolicy.ts`: Canonical route ownership and page-kind map to drive template-type attribution fields.

### Established Patterns
- Dynamic SEO pages are contract-driven from typed `lib/*` records and slug exports.
- Most booked-call CTAs are direct external links to `https://cal.com/crewtrace/15min`.
- Utility routes (`/calculator`, `/compliance-audit`, `/demo`) are intentionally noindex and can be excluded from SEO conversion denominators when needed.
- Metadata and crawl policy are centralized; Phase 5 should follow this contract-first pattern for conversion instrumentation.

### Integration Points
- Template pages with primary Phase 5 CTA coverage: `app/features/[slug]/page.tsx`, `app/industries/[slug]/page.tsx`.
- Shared CTA/navigation surfaces: `components/CTASection.tsx`, `components/Navbar.tsx`, `components/LandingNavbar.tsx`, other CTA-bearing components using Cal.com URLs.
- Global instrumentation injection point: `app/layout.tsx` (provider/bootstrap) plus shared client utilities/hooks.
- Backend lead endpoint integration point: `app/contact/page.tsx` form submit handler and a new server endpoint.

</code_context>

<deferred>
## Deferred Ideas

- Full CRM lifecycle automation and lead scoring beyond booked-call attribution.
- Multi-touch attribution modeling and channel-level MMM analysis.
- Paid media conversion tracking expansion and offline conversion upload workflows.

</deferred>

---

*Phase: 05-booked-call-conversion-and-attribution*
*Context gathered: 2026-03-03*
