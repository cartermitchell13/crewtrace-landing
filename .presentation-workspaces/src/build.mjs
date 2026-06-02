/** @jsxRuntime automatic */
/** @jsxImportSource @oai/artifact-tool/presentation-jsx */

import fs from "node:fs/promises";
import path from "node:path";
import {
  Presentation,
  PresentationFile,
  row,
  column,
  grid,
  layers,
  panel,
  text,
  image,
  shape,
  rule,
  fill,
  hug,
  fixed,
  wrap,
  grow,
  fr,
  FileBlob,
} from "@oai/artifact-tool";

const W = 1920;
const H = 1080;
const REPO = path.resolve("..", "..", "crewtrace-landing");
const OUT = path.resolve("output");
const SCRATCH = path.resolve("scratch");

const C = {
  ink: "#172033",
  muted: "#667085",
  faint: "#E7EAF0",
  paper: "#F7F4EC",
  white: "#FFFFFF",
  blue: "#2F27CE",
  blueDark: "#17116F",
  blueSoft: "#E7E5FF",
  red: "#C2410C",
  redSoft: "#FFE8D9",
  green: "#047857",
  greenSoft: "#DDF7EA",
  yellow: "#F4B740",
  slate: "#2C3446",
};

const font = {
  title: "Aptos Display",
  body: "Aptos",
};

function p(...parts) {
  return path.join(REPO, ...parts);
}

function add(slides, nodes, background = C.paper) {
  const slide = slides.add();
  slide.background.fill = background;
  slide.compose(column({ name: "root", width: fill, height: fill, padding: { x: 92, y: 78 } }, nodes), {
    frame: { left: 0, top: 0, width: W, height: H },
    baseUnit: 8,
  });
  return slide;
}

function addCover(slides, assets) {
  const slide = slides.add();
  slide.background.fill = C.blueDark;
  slide.compose(
    grid(
      {
        name: "cover-root",
        width: fill,
        height: fill,
        padding: { x: 110, y: 86 },
        columns: [fr(1.45), fr(0.65)],
        columnGap: 72,
      },
      [
        column(
          { name: "cover-left", width: fill, height: fill, gap: 34 },
          [
            image({
              name: "crewtrace-logo",
              blob: assets.logo,
              width: fixed(260),
              height: fixed(70),
              fit: "contain",
              alt: "Crewtrace logo",
            }),
            column({ name: "cover-title-stack", width: fill, height: hug, gap: 28 }, [
              tx("Marketing plan", {
                size: 28,
                color: "#D6D2FF",
                bold: true,
                width: wrap(420),
                name: "cover-kicker",
              }),
              tx("Turn payroll leakage into the sales wedge.", {
                name: "cover-title",
                size: 82,
                bold: true,
                color: C.white,
                face: font.title,
                width: wrap(980),
                style: { lineSpacingMultiple: 0.9 },
              }),
              tx("California-first founder-led acquisition plan for Crewtrace.", {
                name: "cover-subtitle",
                size: 31,
                color: "#D6D2FF",
                width: wrap(820),
              }),
            ]),
            tx("June 2026", { width: wrap(300), size: 20, color: "#B8B4FF", name: "cover-date" }),
          ],
        ),
        column(
          { name: "cover-right", width: fill, height: fill, gap: 18, verticalAlign: "center" },
          [
            tx("$2,100/mo", {
              size: 86,
              bold: true,
              color: C.white,
              face: font.title,
              name: "cover-number",
              width: fill,
            }),
            tx("recovered in payroll leakage at S&W Waterproofing", {
              size: 28,
              color: "#E6E3FF",
              width: wrap(430),
              name: "cover-proof-label",
            }),
            rule({ name: "cover-rule", width: fixed(260), stroke: C.yellow, weight: 7 }),
          ],
        ),
      ],
    ),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
}

function tx(value, opts = {}) {
  return text(value, {
    width: opts.width ?? fill,
    height: opts.height ?? hug,
    name: opts.name,
    style: {
      fontFace: opts.face ?? font.body,
      fontSize: opts.size ?? 30,
      bold: opts.bold ?? false,
      italic: opts.italic ?? false,
      color: opts.color ?? C.ink,
      horizontalAlign: opts.align ?? "left",
      ...opts.style,
    },
  });
}

function chip(label, color = C.blue, bg = C.blueSoft) {
  return panel(
    {
      name: `chip-${label}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      width: hug,
      height: hug,
      padding: { x: 20, y: 10 },
      fill: bg,
      borderRadius: 999,
    },
    tx(label, { size: 19, bold: true, color, width: hug, name: `chip-text-${label}` }),
  );
}

function footer(label = "Crewtrace marketing plan | June 2026") {
  return row(
    {
      name: "footer",
      width: fill,
      height: hug,
      gap: 18,
      verticalAlign: "center",
    },
    [
      rule({ name: "footer-rule", width: fixed(88), stroke: C.blue, weight: 3 }),
      tx(label, { name: "footer-text", size: 16, color: "#7B8190", width: wrap(920) }),
    ],
  );
}

function titleBlock(kicker, title, subtitle, color = C.ink) {
  return column(
    { name: "title-block", width: fill, height: hug, gap: 18 },
    [
      chip(kicker, C.blue, C.blueSoft),
      tx(title, {
        name: "slide-title",
        size: 58,
        bold: true,
        color,
        face: font.title,
        width: wrap(1380),
        style: { lineSpacingMultiple: 0.92 },
      }),
      subtitle
        ? tx(subtitle, {
            name: "slide-subtitle",
            size: 27,
            color: C.muted,
            width: wrap(1160),
            style: { lineSpacingMultiple: 1.12 },
          })
        : null,
    ].filter(Boolean),
  );
}

function metric(value, label, color = C.blue) {
  return column(
    { name: `metric-${label}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"), width: fill, height: hug, gap: 8 },
    [
      tx(value, { size: 64, bold: true, color, face: font.title, width: fill, name: `metric-value-${label}` }),
      tx(label, { size: 22, color: C.muted, width: fill, name: `metric-label-${label}` }),
    ],
  );
}

function bulletList(items, size = 28) {
  return column(
    { name: "bullet-list", width: fill, height: hug, gap: 18 },
    items.map((item, i) =>
      row(
        { name: `bullet-${i + 1}`, width: fill, height: hug, gap: 14, verticalAlign: "top" },
        [
          tx("–", { size, bold: true, color: C.blue, width: fixed(24), name: `bullet-mark-${i + 1}` }),
          tx(item, { size, color: C.ink, width: fill, name: `bullet-text-${i + 1}` }),
        ],
      ),
    ),
  );
}

function band(color, left, top, width, height, opacity = 1) {
  return shape({
    name: `band-${left}-${top}`,
    shape: "rect",
    left,
    top,
    width,
    height,
    fill: color,
    opacity,
  });
}

function buildDeck(assets) {
  const deck = Presentation.create({ slideSize: { width: W, height: H } });

  // 1. Cover
  addCover(deck.slides, assets);

  // 2. Situation
  add(deck.slides, [
    column(
      { name: "s2", left: 92, top: 78, width: 1740, height: fill, gap: 54 },
      [
        titleBlock(
          "Current signal",
          "The strongest evidence is not ad volume. It is trust.",
          "Crewtrace has two real usage proofs: a paying general contractor and the waterproofing company it was originally built for.",
        ),
        grid(
          { name: "signal-grid", width: fill, height: hug, columns: [fr(1), fr(1), fr(1)], gap: 46 },
          [
            metric("1", "paying GC customer", C.green),
            metric("$1k", "onboarding fee collected", C.green),
            metric("$100/mo", "current subscription", C.blue),
          ],
        ),
        rule({ name: "divider", width: fixed(980), stroke: C.faint, weight: 2 }),
        row(
          { name: "signal-bottom", width: fill, height: hug, gap: 60 },
          [
            bulletList([
              "Cold email produced almost no response across roughly 2,000 contacts.",
              "Manual LinkedIn created conversations, but no conversions.",
              "Industry contacts produced the only sale so far.",
            ], 25),
            panel(
              { name: "proof-note", width: fixed(560), height: hug, padding: { x: 34, y: 28 }, fill: C.white, borderRadius: 16 },
              tx("Interpretation: the market buys this through credibility and owner-to-owner trust before it buys the website.", {
                size: 28,
                bold: true,
                color: C.ink,
                width: fill,
                name: "proof-note-text",
              }),
            ),
          ],
        ),
        footer("Repo and founder context: pricing, S&W proof, current funnel, current customer status."),
      ],
    ),
  ]);

  // 3. Beachhead
  add(deck.slides, [
    column(
      { name: "s3", left: 92, top: 78, width: 1740, height: fill, gap: 34 },
      [
        titleBlock(
          "Beachhead",
          "Start with California contractors who already feel payroll pain.",
          "Not every contractor is the first target. The best first customer has enough crews, enough jobsites, and enough payroll mess for the problem to be visible.",
        ),
        row(
          { name: "profile-row", width: fill, height: hug, gap: 54 },
          [
            column(
              { name: "profile-left", width: fixed(840), height: hug, gap: 26 },
              [
                tx("Ideal first segment", { size: 24, bold: true, color: C.blue, name: "segment-label" }),
                tx("California contractors with 10–75 hourly field employees across multiple active jobsites.", {
                  size: 48,
                  bold: true,
                  color: C.ink,
                  face: font.title,
                  width: wrap(800),
                  name: "segment-main",
                }),
                bulletList([
                  "General contractors with employees",
                  "Waterproofing, roofing, concrete, HVAC, electrical, plumbing, landscaping",
                  "Paper timesheets, spreadsheets, or basic clock apps",
                  "Owner suspects leakage but lacks proof",
                ], 25),
              ],
            ),
            column(
              { name: "profile-right", width: fill, height: hug, gap: 28 },
              [
                panel(
                  { name: "ca-records", width: fill, height: hug, padding: { x: 34, y: 26 }, fill: C.redSoft, borderRadius: 16 },
                  column({ width: fill, height: hug, gap: 12 }, [
                    tx("California wedge", { size: 23, bold: true, color: C.red, name: "ca-title" }),
                    tx("Do not sell legal advice. Sell cleaner records before payroll closes.", {
                      size: 34,
                      bold: true,
                      color: C.ink,
                      width: fill,
                      name: "ca-copy",
                    }),
                  ]),
                ),
                image({
                  name: "geofence-image",
                  blob: assets.geofence,
                  width: fill,
                  height: fixed(320),
                  fit: "cover",
                  alt: "Crewtrace geofence setup screen",
                }),
              ],
            ),
          ],
        ),
        footer("Source context: CA DIR/DOL recordkeeping and meal-period guidance; use as risk context, not legal claims."),
      ],
    ),
  ]);

  // 4. Positioning
  add(deck.slides, [
    column(
      { name: "s4", left: 92, top: 78, width: 1740, height: fill, gap: 54 },
      [
        titleBlock(
          "Positioning",
          "Do not sell time tracking. Sell payroll proof.",
          "The category is crowded. Crewtrace needs a narrower promise that connects directly to owner pain.",
        ),
        row(
          { name: "positioning-row", width: fill, height: hug, gap: 70, verticalAlign: "center" },
          [
            column(
              { name: "before-after", width: fixed(690), height: hug, gap: 28 },
              [
                tx("Commodity framing", { size: 24, bold: true, color: C.red, name: "bad-label" }),
                tx("Construction time tracking software", {
                  size: 42,
                  color: C.muted,
                  width: wrap(650),
                  name: "bad-copy",
                }),
                rule({ width: fixed(420), stroke: C.faint, weight: 2, name: "position-rule" }),
                tx("Wedge framing", { size: 24, bold: true, color: C.green, name: "good-label" }),
                tx("Stop paying for hours you cannot verify.", {
                  size: 56,
                  bold: true,
                  color: C.ink,
                  face: font.title,
                  width: wrap(650),
                  name: "good-copy",
                }),
              ],
            ),
            panel(
              { name: "positioning-statement", width: fill, height: hug, padding: { x: 42, y: 38 }, fill: C.white, borderRadius: 20 },
              column({ width: fill, height: hug, gap: 24 }, [
                tx("Recommended message", { size: 22, bold: true, color: C.blue, name: "message-label" }),
                tx("Crewtrace helps California contractors stop payroll leakage with GPS-verified time records, jobsite geofencing, and payroll-ready exports.", {
                  size: 41,
                  bold: true,
                  color: C.ink,
                  width: fill,
                  name: "message-copy",
                  style: { lineSpacingMultiple: 1.05 },
                }),
              ]),
            ),
          ],
        ),
        footer(),
      ],
    ),
  ]);

  // 5. Offer
  add(deck.slides, [
    column(
      { name: "s5", left: 92, top: 78, width: 1740, height: fill, gap: 44 },
      [
        titleBlock(
          "Offer",
          "Make onboarding the thing they buy first.",
          "The product needs implementation to create the proof moment. Price that work explicitly.",
        ),
        row(
          { name: "offer-row", width: fill, height: hug, gap: 54 },
          [
            column(
              { name: "sprint", width: fixed(880), height: hug, gap: 24 },
              [
                tx("Payroll Leakage Recovery Sprint", { size: 53, bold: true, color: C.ink, face: font.title, name: "sprint-title" }),
                tx("In 14 days, review the current time process, configure active jobsites, onboard the crew, and show whether unverified hours are costing money before the next payroll run.", {
                  size: 30,
                  color: C.muted,
                  width: wrap(820),
                  name: "sprint-copy",
                }),
                bulletList([
                  "Time-process audit",
                  "Jobsite/geofence setup",
                  "Crew onboarding",
                  "Payroll-review checkpoint",
                  "Owner-facing leakage summary",
                ], 25),
              ],
            ),
            column(
              { name: "pricing", width: fill, height: hug, gap: 22 },
              [
                metric("$1,000", "first-10 customer implementation", C.green),
                metric("$150/mo", "recommended software floor", C.blue),
                metric("$250/mo", "larger crews / scale plan", C.blue),
                tx("Do not make onboarding optional. It is the path to the outcome.", {
                  size: 25,
                  bold: true,
                  color: C.red,
                  width: wrap(620),
                  name: "pricing-warning",
                }),
              ],
            ),
          ],
        ),
        footer("Pricing remains flexible; recommendation is to preserve paid implementation and simplify monthly tiers."),
      ],
    ),
  ]);

  // 6. Channel portfolio
  add(deck.slides, [
    column(
      { name: "s6", left: 92, top: 78, width: 1740, height: fill, gap: 46 },
      [
        titleBlock(
          "Channel mix",
          "Make conversations the constraint, not traffic.",
          "The next month is about creating qualified owner conversations and paid audits, not maximizing impressions.",
        ),
        grid(
          { name: "channel-table", width: fill, height: hug, columns: [fr(0.9), fr(1.25), fr(0.8), fr(0.7)], rowGap: 0, columnGap: 0 },
          [
            tx("Channel", { size: 23, bold: true, color: C.blue, name: "h1" }),
            tx("Role", { size: 23, bold: true, color: C.blue, name: "h2" }),
            tx("Owner", { size: 23, bold: true, color: C.blue, name: "h3" }),
            tx("Priority", { size: 23, bold: true, color: C.blue, name: "h4" }),
            tx("Partner-led calls", { size: 28, bold: true, name: "c1" }),
            tx("Contractor-to-contractor trust and close motion", { size: 27, color: C.muted, name: "r1" }),
            tx("Partner", { size: 27, name: "o1" }),
            tx("P1", { size: 30, bold: true, color: C.green, name: "p1" }),
            tx("Warm intros", { size: 28, bold: true, name: "c2" }),
            tx("Use waterproofing reference and paying GC proof", { size: 27, color: C.muted, name: "r2" }),
            tx("Both", { size: 27, name: "o2" }),
            tx("P1", { size: 30, bold: true, color: C.green, name: "p2" }),
            tx("Bookkeepers / QuickBooks", { size: 28, bold: true, name: "c3" }),
            tx("Referral channel from people who see payroll mess", { size: 27, color: C.muted, name: "r3" }),
            tx("You", { size: 27, name: "o3" }),
            tx("P1", { size: 30, bold: true, color: C.green, name: "p3" }),
            tx("Google Search", { size: 28, bold: true, name: "c4" }),
            tx("Capture high-intent demand; route to calculator/call", { size: 27, color: C.muted, name: "r4" }),
            tx("You", { size: 27, name: "o4" }),
            tx("P2", { size: 30, bold: true, color: C.blue, name: "p4" }),
            tx("Demand Gen", { size: 28, bold: true, name: "c5" }),
            tx("Retargeting only until it proves booked-call value", { size: 27, color: C.muted, name: "r5" }),
            tx("You", { size: 27, name: "o5" }),
            tx("P3", { size: 30, bold: true, color: C.red, name: "p5" }),
          ],
        ),
        footer(),
      ],
    ),
  ]);

  // 7. Sales motion
  add(deck.slides, [
    column(
      { name: "s7", left: 92, top: 78, width: 1740, height: fill, gap: 46 },
      [
        titleBlock(
          "Sales motion",
          "Let the construction operator carry the first conversation.",
          "Your partner's industry credibility is the channel advantage. Your role is to make every call easy to run and easy to follow up.",
        ),
        row(
          { name: "roles-row", width: fill, height: hug, gap: 58 },
          [
            column(
              { name: "partner-role", width: fixed(820), height: hug, gap: 20 },
              [
                tx("Partner owns", { size: 24, bold: true, color: C.green, name: "partner-label" }),
                bulletList([
                  "Owner calls and warm intros",
                  "Peer-to-peer payroll pain conversation",
                  "Waterproofing reference story",
                  "Closing the Recovery Sprint",
                ], 29),
              ],
            ),
            column(
              { name: "you-role", width: fill, height: hug, gap: 20 },
              [
                tx("You own", { size: 24, bold: true, color: C.blue, name: "you-label" }),
                bulletList([
                  "Target-account list",
                  "Ads, landing pages, and calculator funnel",
                  "Call notes and follow-up materials",
                  "Demo/product implementation support",
                ], 29),
              ],
            ),
          ],
        ),
        panel(
          { name: "call-opener", width: fill, height: hug, padding: { x: 38, y: 28 }, fill: C.white, borderRadius: 18 },
          tx("Call opener: “I run a construction company too. We built Crewtrace because paper time and edited punches were costing us money. We helped one contractor find about $2,100/month in payroll leakage. Would it be worth a 10-minute look at whether the same thing is happening in your payroll?”", {
            size: 30,
            color: C.ink,
            width: fill,
            name: "call-opener-copy",
          }),
        ),
        footer(),
      ],
    ),
  ]);

  // 8. Paid search
  add(deck.slides, [
    column(
      { name: "s8", left: 92, top: 78, width: 1740, height: fill, gap: 42 },
      [
        titleBlock(
          "Paid search",
          "Keep Search narrow. Treat Demand Gen as unproven.",
          "The campaign data is too early to declare failure, but it is clear enough to stop equating cheap clicks with qualified demand.",
        ),
        row(
          { name: "ads-row", width: fill, height: hug, gap: 54 },
          [
            column({ name: "ads-metrics", width: fixed(680), height: hug, gap: 22 }, [
              metric("687", "Demand Gen clicks, 0 conversions", C.red),
              metric("39", "Search clicks, 0 conversions", C.blue),
              metric("$294", "total ad spend reviewed", C.ink),
            ]),
            column({ name: "ads-actions", width: fill, height: hug, gap: 28 }, [
              tx("Action", { size: 24, bold: true, color: C.blue, name: "ads-action-label" }),
              bulletList([
                "Prioritize construction + GPS/geofence + time-clock terms.",
                "Send high-intent search to payroll-leakage/calculator path.",
                "Pause or cap Demand Gen unless used for retargeting.",
                "Measure calculator completions and booked-call clicks, not impressions.",
              ], 29),
              panel(
                { name: "keywords", width: fill, height: hug, padding: { x: 30, y: 24 }, fill: C.blueSoft, borderRadius: 14 },
                tx("Core terms: construction time tracking, construction time clock app, GPS time clock app, geofence time clock, contractor time tracking app, QuickBooks construction time tracking.", {
                  size: 25,
                  color: C.blueDark,
                  width: fill,
                  name: "keyword-copy",
                }),
              ),
            ]),
          ],
        ),
        footer("AdLoop snapshot: 2026-05-26 to 2026-06-01."),
      ],
    ),
  ]);

  // 9. 30-day operating plan
  add(deck.slides, [
    column(
      { name: "s9", left: 92, top: 78, width: 1740, height: fill, gap: 40 },
      [
        titleBlock(
          "30-day plan",
          "The goal is three paid Recovery Sprints.",
          "If three contractors pay for implementation in 30 days, Crewtrace has a repeatable early sales signal.",
        ),
        grid(
          { name: "plan-grid", width: fill, height: hug, columns: [fr(1), fr(1), fr(1), fr(1)], gap: 34 },
          [
            column({ width: fill, height: hug, gap: 14, name: "week1" }, [
              tx("Week 1", { size: 24, bold: true, color: C.blue, name: "w1" }),
              tx("Package the Sprint, fix credibility copy, build 150 target accounts.", { size: 27, color: C.ink, name: "w1-copy" }),
            ]),
            column({ width: fill, height: hug, gap: 14, name: "week2" }, [
              tx("Week 2", { size: 24, bold: true, color: C.blue, name: "w2" }),
              tx("Partner runs calls. Ask for warm intros. Start bookkeeper outreach.", { size: 27, color: C.ink, name: "w2-copy" }),
            ]),
            column({ width: fill, height: hug, gap: 14, name: "week3" }, [
              tx("Week 3", { size: 24, bold: true, color: C.blue, name: "w3" }),
              tx("Run audits, demo around their numbers, create trade-specific proof.", { size: 27, color: C.ink, name: "w3-copy" }),
            ]),
            column({ width: fill, height: hug, gap: 14, name: "week4" }, [
              tx("Week 4", { size: 24, bold: true, color: C.blue, name: "w4" }),
              tx("Close Sprints, review channel data, tighten the next-month playbook.", { size: 27, color: C.ink, name: "w4-copy" }),
            ]),
          ],
        ),
        row(
          { name: "goal-row", width: fill, height: hug, gap: 44 },
          [
            metric("150", "target accounts", C.blue),
            metric("20", "real owner conversations", C.green),
            metric("8", "audits booked", C.green),
            metric("3", "paid Sprints sold", C.green),
          ],
        ),
        footer(),
      ],
    ),
  ]);

  return deck;
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(SCRATCH, { recursive: true });
  const assets = {
    logo: await FileBlob.load(p("public", "images", "crew-trace-logo.png")),
    geofence: await FileBlob.load(p("public", "images", "geofencing", "draw-boundary.png")),
  };
  const deck = buildDeck(assets);
  const pptx = await PresentationFile.exportPptx(deck);
  const pptxPath = path.join(OUT, "output.pptx");
  await pptx.save(pptxPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
