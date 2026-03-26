# Crewtrace SEO Content Workflow

This runbook recreates the "find keyword -> inspect Google -> extract competing pages -> mix in first-party opinion -> write -> publish -> track" workflow for Crewtrace.

## What Is Automated

- Google result collection via Serper
- Competitor page extraction via Exa when `EXA_API_KEY` is available
- Fallback page extraction via direct fetch when Exa is unavailable
- Research brief generation
- Draft prompt generation for Codex or Claude Code
- Markdown publishing target in `content/blog`
- Weekly Search Console and GA4 tracking through the existing reporting pipeline

## What Stays Human Or Agent-Led

- Choosing the final keyword from Keywords Everywhere MCP
- Writing and editing the final article
- Reviewing claims for accuracy and tone

## 1. Find the Target Keyword

Use your Keywords Everywhere MCP first. The goal is to leave that step with:

- one primary keyword
- one proposed title
- one intended search intent

Example prompt:

```text
Use Keywords Everywhere MCP to evaluate blog opportunities for Crewtrace.
Prioritize keywords with commercial or pain-point intent around contractor time tracking,
payroll leakage, GPS time clocks, labor compliance, or jobsite attendance verification.
Return the top 10 ideas with volume, competition, and a recommendation for the single
best next article to publish.
```

If you want a seed-list fallback, the older bulk script is still available:

```bash
node scripts/seo/keyword-research.mjs --apiKey="$KEYWORDS_EVERYWHERE_API_KEY"
```

## 2. Build the Research Packet

Run the content-research script with the chosen keyword:

```bash
npm run seo:research-content -- \
  --keyword "gps time tracking construction" \
  --title "GPS Time Tracking for Construction: What Contractors Should Actually Measure" \
  --category "Time Tracking"
```

Environment variables:

- `SERPER_API_KEY` is required
- `EXA_API_KEY` is optional but recommended

Output folder:

```text
scripts/seo/output/content-briefs/<slug>/
```

Artifacts:

- `research-brief.md`
- `draft-prompt.txt`
- `research-data.json`

The brief combines:

- the live Google top results from Serper
- extracted text from those ranking URLs
- Crewtrace's internal point of view from `docs/seo/crewtrace-category-point-of-view.md`
- publishing constraints from the current AI publish gate

## 3. Write the Article Into The Codebase

Open the generated prompt file and use it as the writing handoff for Codex or Claude Code.

Example:

```text
Read scripts/seo/output/content-briefs/gps-time-tracking-construction/draft-prompt.txt
and execute it exactly.
```

The workflow is designed to publish directly into:

```text
content/blog/<slug>.md
```

That replaces the "publish to CMS API" step from the original workflow.

## 4. Run the Publish Checks

Validate the new article before you ship it:

```bash
npm run content:check-publish -- --input content/blog/<slug>.md
```

If the article is part of a larger SEO release, also run:

```bash
npm run seo:check:all
```

## 5. Track Search Console And GA4 Performance

Crewtrace already has a weekly reporting pipeline for Search Console, booked-call events, and GA4.

Build the weekly report:

```bash
npm run seo:report:weekly-production -- \
  --week 2026-03-16 \
  --indexed <indexed.csv> \
  --traffic <traffic.csv> \
  --booked-events <booked.ndjson> \
  --ga4 <ga4.csv> \
  --output .tmp/weekly-seo-report
```

Then inspect the specific article route:

```bash
npm run seo:report-route -- \
  --input .tmp/weekly-seo-report/weekly-seo-ops-report.json \
  --route /blog/<slug>
```

That gives you per-route:

- indexed status
- clicks
- impressions
- CTR
- booked-call CTA activity
- lead form submits
- GA4-linked conversion-key coverage

## Recommended Operating Rhythm

1. Pick one keyword from Keywords Everywhere MCP.
2. Generate the research packet.
3. Have the agent write the markdown file.
4. Run the publish gate.
5. Publish.
6. Review route-level performance in the next weekly SEO report.

## Notes

- Exa extraction is optional in code only because not every environment has an API key. The workflow still prefers Exa when available.
- The built-in fallback extractor is intentionally simple. If a site blocks scraping, the brief will still include the SERP metadata and any successful extracts from other sources.
- Keep the point-of-view document fresh. If Crewtrace positioning changes, update `docs/seo/crewtrace-category-point-of-view.md` so future briefs inherit the new stance.
