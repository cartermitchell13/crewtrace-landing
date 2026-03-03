# Content and UI Optimization Guardrails

This runbook defines release criteria for template copy and UX refresh work in Phase `08.1`.

## Commands

Run all checks before merging any template refresh branch:

```bash
npm run seo:check-messaging
npm run seo:check-template-content
npm run seo:check-links
npm run seo:check
```

## What The Checks Enforce

### `seo:check-messaging`
- Template files import messaging helpers from `@/lib/messaging`.
- Messaging primitives stay centralized in `lib/messaging.ts`:
  - `intentHeadlineOptions`
  - `proofLedBodyHelpers`
  - `ctaFramingVariants`
  - `getTemplateMessaging`
- Disallowed public qualifier phrases are blocked.

### `seo:check-template-content`
- Home, hub, detail, compare, and contact templates keep required heading/CTA/link blocks.
- Each required template keeps deterministic route ownership markers.
- Cross-cluster internal-link pathways remain present in source templates.

## Pass/Fail Criteria

- Pass: all commands exit with code `0`, no missing token diagnostics.
- Fail: any missing messaging token, missing template contract token, or missing route link marker.

## Remediation Flow

1. Fix missing tokens in the file reported by the script output.
2. Re-run the failing command first.
3. Run full guardrail set before final review.
4. If a contract legitimately changes, update:
   - `scripts/seo/check-template-content-contract.mjs`
   - this runbook
   - related plan summary notes for traceability

## Release Gate Policy

- No copy/UI optimization PR can merge with failing guardrail scripts.
- Any exceptions require explicit plan-level documentation and follow-up tasking in the next weekly queue.
