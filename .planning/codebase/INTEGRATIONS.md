# External Integrations

**Analysis Date:** 2026-03-01

## APIs and External Services

**Scheduling / lead capture:**
- Cal.com booking links are used for primary CTA flows.
  - Integration method: direct outbound links (`https://cal.com/crewtrace/15min`).
  - Locations: multiple page components and nav/footer CTAs.

**Email and phone contact:**
- Direct `mailto:` and `tel:` links on contact/legal pages.
  - Example: `mailto:hello@crewtrace.com`.

## Data Storage

**Database:**
- None in current repo.
- Content/data is file-based and in-memory at build/runtime.

**File storage:**
- Static assets in `public/`.
- Markdown posts in `content/blog/`.

**Caching:**
- No explicit external cache service configured.

## Authentication and Identity

- No auth provider integrated in this landing-site codebase.
- No user account/session logic present.

## Monitoring and Observability

- No explicit analytics or error-tracking SDK (for example GA4, PostHog, Sentry) found in source.
- Operational monitoring appears external to this repository.

## CI/CD and Deployment

**Hosting target (inferred):**
- Next.js app suitable for Vercel deployment.

**CI pipeline:**
- No CI workflow files detected in the current repository snapshot.

## Environment Configuration

**Development:**
- No required `.env` variables for current features.
- Build and content render from repository files.

**Staging/production differences:**
- No environment-specific branching logic in code found.

## Webhooks and Callbacks

- No inbound webhook handlers detected.
- No outbound webhook dispatching detected.

## Integration Risks

- CTA dependency on a third-party scheduler means conversion flow depends on external uptime.
- No analytics instrumentation means limited attribution visibility on source-to-conversion performance.

---
*Integration audit: 2026-03-01*
*Update when new services or tracking vendors are integrated*
