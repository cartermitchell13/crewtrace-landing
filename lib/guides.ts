export interface GuideSection {
    heading: string;
    /** Optional intro paragraph displayed before the bullet/step list */
    intro?: string;
    points: string[];
    /** If true, render points as numbered steps instead of bullet checkmarks */
    numbered?: boolean;
    /** Optional stat callout box rendered between intro and points */
    callout?: { stat: string; label: string };
    /** Optional image rendered above the section content */
    image?: string;
    imageAlt?: string;
}

export interface Guide {
    slug: string;
    title: string;
    summary: string;
    readTime: string;
    category: string;
    sections: GuideSection[];
}

export const guides: Guide[] = [
    {
        slug: "construction-time-tracking-implementation",
        title: "The Complete Construction Time Tracking Implementation Guide",
        summary:
            "A step-by-step playbook to move from paper timesheets to GPS-verified digital time tracking — covering audits, geofencing, crew adoption, payroll integration, and compliance — without disrupting your active projects.",
        readTime: "22 min read",
        category: "Implementation",
        sections: [
            {
                heading: "Audit your current time tracking process",
                intro: "Before you can improve your time tracking, you need a clear picture of how it works today. Most contractors underestimate how many manual touchpoints exist between a worker clocking in and payroll being finalized. This audit surfaces the hidden costs and friction points that digital tracking will eliminate.",
                callout: { stat: "$4,000+", label: "Hidden cost per worker per year from paper timesheet errors and admin overhead" },
                points: [
                    "Map how time data currently flows from the field to payroll — including every handoff, manual entry, and approval step — so you understand exactly what you are replacing.",
                    "Interview three to five foremen and at least one payroll admin to document pain points: late submissions, illegible handwriting, missing job codes, and disputed hours.",
                    "Calculate your current cost of manual tracking by estimating hours spent collecting, correcting, and re-keying timesheets each pay period.",
                    "Identify which crews, trades, or job sites generate the most payroll disputes or timesheet corrections — these are your highest-ROI targets for the pilot.",
                    "Document any existing policies around clock-in tolerances, break requirements, and overtime rules so they can be configured in the new system from day one.",
                ],
            },
            {
                heading: "Define success metrics and KPIs before you start",
                intro: "Without a baseline, you cannot prove ROI. Define your KPIs before implementation begins so you have concrete numbers to compare against after rollout. This step also forces alignment between field leadership and the back office on what 'success' actually means.",
                points: [
                    "Set a baseline for payroll prep time — the hours between timesheet collection and a clean payroll export. Most contractors see a 50–70% reduction after switching to digital tracking.",
                    "Track disputed hours per pay period as a core metric. GPS-verified entries dramatically reduce 'he said / she said' disagreements between field and office.",
                    "Measure overtime variance by comparing scheduled vs. actual overtime. Automated tracking surfaces unplanned OT that paper systems hide until the payroll run.",
                    "Monitor clock-in compliance rate — the percentage of punches that happen within the geofence, on time, and without manual edits.",
                    "Set a target adoption timeline: most successful rollouts reach 90% field adoption within two to three pay periods when foremen are trained first.",
                ],
            },
            {
                heading: "Choose the right tool and configure it properly",
                intro: "Not all time tracking apps are built for construction. You need a solution that handles offline environments, multi-site crews, union rules, and variable pay types. The wrong tool creates more friction than paper — the right one disappears into the daily routine.",
                numbered: true,
                points: [
                    "Prioritize solutions that work offline. Construction crews frequently work in areas with poor cell coverage — the app must queue punches locally and sync when connectivity returns.",
                    "Verify the platform supports your payroll export format natively. Manual CSV reformatting defeats the purpose of automation and introduces new error vectors.",
                    "Confirm the solution offers configurable geofence shapes and sizes. A downtown high-rise needs a tighter radius than a highway project that spans half a mile.",
                    "Look for built-in exception handling workflows — automatic flags for missed punches, early clock-ins, extended breaks, and punches outside the geofence.",
                    "Ensure the tool supports role-based permissions so foremen can approve time for their crews without seeing company-wide labor data.",
                    "Check that your solution provides an auditable edit history. Every change to a time entry should record who made it, when, and why — this is critical for DOL compliance.",
                ],
            },
            {
                heading: "Set up geofences for every active job site",
                intro: "Geofencing is the backbone of GPS-verified time tracking. A well-configured geofence automatically validates that workers are on-site when they clock in, eliminating buddy punching and early clock-ins from the parking lot. But a poorly sized geofence creates false alerts that erode trust in the system.",
                image: "/images/guides/geofence-jobsite.png",
                imageAlt: "Illustration of a construction job site surrounded by a GPS geofence boundary with a worker clocking in via smartphone",
                points: [
                    "Walk each site or use satellite imagery to define geofence boundaries that cover the actual work area, staging yards, and parking — not just the building footprint.",
                    "Size your geofences based on GPS signal conditions. Urban sites surrounded by tall buildings may need a wider radius (150–300 feet) to account for signal bounce, while open rural sites can use tighter boundaries.",
                    "Create separate geofence zones for distinct work areas on large projects — such as the main structure, laydown yard, and field office — to improve job costing accuracy.",
                    "Test every geofence with a real device before going live. Have a foreman walk the site perimeter and confirm clock-in triggers correctly at entry points and edges.",
                    "Establish a process for creating, modifying, and retiring geofences as projects start and finish. Assign one admin owner responsible for keeping the geofence list current.",
                ],
            },
            {
                heading: "Design your crew onboarding and training plan",
                intro: "Technology adoption in the field lives or dies on the training experience. Construction workers are not resistant to new tools — they are resistant to tools that slow them down. The goal is to make digital clock-in feel faster and easier than the paper method from day one.",
                image: "/images/guides/crew-onboarding.png",
                imageAlt: "Illustration of construction workers collaborating and adopting a mobile time tracking app",
                callout: { stat: "< 10 min", label: "Target training time per worker — focus on clock in, clock out, and correction requests" },
                points: [
                    "Train foremen and superintendents first — they are the force multipliers in the field and the first line of support when a crew member has trouble.",
                    "Keep per-worker training under 10 minutes. Focus on three actions only: how to clock in, how to clock out, and how to request a correction if something goes wrong.",
                    "Create a one-page laminated quick-start card with screenshots that foremen can keep in their truck or post in the job trailer.",
                    "Address privacy concerns upfront. Explain clearly that GPS location is only captured at clock-in and clock-out — not continuously throughout the day — and that tracking stops when they are off the clock.",
                    "Run a dedicated Q&A session with each pilot crew during their first week. Most resistance evaporates once workers see the system is faster than filling out paper.",
                    "Designate one 'super user' per crew — a tech-comfortable worker who can help peers troubleshoot issues in the field without calling the office.",
                ],
            },
            {
                heading: "Run a controlled pilot before company-wide rollout",
                intro: "A pilot is not optional — it is the single most important step in a successful rollout. It surfaces edge cases, builds internal champions, and gives you real data to prove the system works before asking the entire company to change behavior.",
                callout: { stat: "2 pay periods", label: "Minimum pilot duration — one cycle is not enough to surface edge cases" },
                numbered: true,
                points: [
                    "Select one to two crews and one to two job sites for the pilot. Choose a mix — one experienced foreman and one who is less comfortable with technology — to stress-test adoption across skill levels.",
                    "Run the pilot for a minimum of two full pay periods. One cycle is not enough to surface edge cases like week-boundary overtime, holiday pay, or end-of-project transitions.",
                    "Operate in parallel mode during the pilot: collect both paper timesheets and digital punches so payroll can cross-reference until confidence is established.",
                    "Collect structured feedback from every pilot participant — foremen, workers, and payroll staff — after each pay period. Ask what confused them, what was faster, and what broke.",
                    "Document every exception, edge case, and workaround that surfaces during the pilot. This becomes your rollout FAQ and saves enormous time when onboarding remaining crews.",
                ],
            },
            {
                heading: "Integrate with payroll and job costing systems",
                intro: "The moment time data flows directly from the field into your payroll system without manual re-entry is when you start seeing real ROI. But this integration must be tested carefully — a rounding mismatch or a mismatched job code can create errors across every single employee record.",
                image: "/images/guides/payroll-dashboard.png",
                imageAlt: "Illustration of a payroll dashboard showing clean data export from a digital time tracking system",
                points: [
                    "Map every field on your payroll import template — employee ID, pay type, job code, cost code, hours, and OT — to the corresponding field in your time tracking system before the first export.",
                    "Validate that rounding rules in the digital system match your payroll provider's rounding rules. A seven-minute rounding mismatch can create discrepancies on every single punch.",
                    "Test the export with one pay period of real data before trusting it for live payroll. Compare the exported totals against a manual calculation for at least 10 employees.",
                    "Establish a clear cutoff time — for example, Monday at 10 AM — after which no further edits are allowed and the payroll export is locked.",
                    "If your payroll provider supports API integration, prioritize that over CSV file exports. Automated data flow eliminates the most common source of post-export errors: accidentally uploading the wrong file.",
                ],
            },
            {
                heading: "Build your exception handling and approval workflow",
                intro: "Exceptions are inevitable — phones die, workers forget to clock out, and crews sometimes arrive before the geofence owner has set up the boundary. What matters is having a fast, structured workflow that resolves them before they snowball into payroll delays.",
                points: [
                    "Define automatic exception flags for the five most common issues: missed clock-out, clock-in outside geofence, punch more than 15 minutes before shift start, break longer than policy, and daily hours exceeding 10.",
                    "Route exceptions to the responsible foreman first, then escalate to the project manager if unresolved within 24 hours. Never let exceptions pile up until Friday.",
                    "Create a simple correction request process that workers can initiate from their phone — a missed punch should take under 30 seconds to report, not a phone call to the office.",
                    "Require a reason code for every manual time edit. Categories like 'phone dead,' 'forgot to clock out,' and 'worked in no-service area' help you spot systemic issues vs. one-off mistakes.",
                    "Review exception trends weekly with supervisors. If one crew consistently clocks in outside the geofence, the problem is probably the geofence boundary — not the crew.",
                ],
            },
            {
                heading: "Ensure compliance and audit readiness",
                intro: "Digital time records are not just operationally better — they are legally stronger. When a Department of Labor auditor requests records, you need to produce a complete, consistent package within days, not weeks. GPS-verified entries with immutable edit trails give you a level of defensibility that paper timesheets simply cannot match.",
                callout: { stat: "3 years", label: "Federal FLSA minimum record retention for payroll — many states require longer" },
                points: [
                    "Configure your system to capture and retain all data required by the Department of Labor: daily start and end times, break periods, total hours, overtime, and the work location or project.",
                    "Enable immutable edit history so that every change to a time record is logged with the original value, new value, editor name, and timestamp. This is your first line of defense in an audit.",
                    "Store digital policy acknowledgements — each worker should confirm they understand the timekeeping policy — with a date-stamped record in the system.",
                    "Keep certified payroll export templates pre-built for Davis-Bacon, prevailing wage, and state-specific reporting requirements if you work on public projects.",
                    "Set a data retention policy that meets or exceeds your state's requirements. Federal FLSA rules require three years for payroll records and two years for time cards, but many states require longer.",
                    "Run a mock audit quarterly: pull a random week of time records for a random crew and verify that you can produce a complete, defensible package in under 30 minutes.",
                ],
            },
            {
                heading: "Scale across all crews and continuously improve",
                intro: "Once the pilot is proven and payroll integration is validated, it is time to expand. But scaling is not a flip-the-switch moment — it is a phased rollout with dedicated support at each wave. The companies that succeed treat digital time tracking as a living process, not a one-time project.",
                callout: { stat: "3–5 crews", label: "Maximum crews to onboard per pay period to maintain quality support" },
                points: [
                    "Roll out to remaining crews in waves — no more than three to five crews per pay period — so your support capacity is never overwhelmed.",
                    "Assign a rollout champion for each wave who is responsible for training, fielding questions during the first week, and collecting feedback.",
                    "Retire paper timesheets completely after a crew has been on digital tracking for two full pay periods with no unresolved issues. Keeping paper as a backup beyond this point undermines adoption.",
                    "Review system-wide metrics monthly: payroll prep time, exception rate, correction rate, overtime accuracy, and adoption percentage. Share these results with leadership and field teams.",
                    "Revisit and optimize geofences quarterly as projects start and finish. An outdated geofence list creates false exceptions that erode trust in the system.",
                    "Solicit ongoing feedback from foremen at least once per quarter. The best process improvements — like a faster break-start button or a better overtime alert — come from the people using the tool every day.",
                ],
            },
        ],
    },
    {
        slug: "dol-audit-ready-time-records",
        title: "How to Keep DOL Audit-Ready Time Records",
        summary:
            "Build a defensible documentation process for wage and hour reviews using digital records and approval trails.",
        readTime: "7 min read",
        category: "Compliance",
        sections: [
            {
                heading: "Define required records",
                points: [
                    "Capture start/end times, break details, and project location context.",
                    "Retain edit history including approver and timestamp.",
                    "Centralize records so office and field teams access one source of truth.",
                ],
            },
            {
                heading: "Build repeatable review controls",
                points: [
                    "Use exception thresholds for early clock-ins, long breaks, and overtime spikes.",
                    "Require weekly supervisor review before payroll approval.",
                    "Store policy acknowledgements for all timekeeping users.",
                ],
            },
            {
                heading: "Respond faster during audits",
                points: [
                    "Keep export templates ready for common DOL requests.",
                    "Use location-verified entries to reduce dispute ambiguity.",
                    "Document correction workflows to show process consistency.",
                ],
            },
        ],
    },
    {
        slug: "geofencing-best-practices-for-job-sites",
        title: "Geofencing Best Practices for Multi-Site Crews",
        summary:
            "Set reliable geofence boundaries for crews that move across multiple projects each day.",
        readTime: "6 min read",
        category: "Operations",
        sections: [
            {
                heading: "Design practical geofence rules",
                points: [
                    "Match geofence size to site footprint and GPS signal conditions.",
                    "Use separate zones for staging yards vs active work areas.",
                    "Review edge cases for shared lots and dense urban jobs.",
                ],
            },
            {
                heading: "Prevent false positives",
                points: [
                    "Test boundaries with foremen before full rollout.",
                    "Require location refresh at clock-in for high-risk sites.",
                    "Use exception review for repeated near-boundary punches.",
                ],
            },
            {
                heading: "Maintain accuracy over time",
                points: [
                    "Revalidate geofences when site boundaries change.",
                    "Retire inactive geofences to reduce confusion.",
                    "Track boundary changes in a central admin log.",
                ],
            },
        ],
    },
    {
        slug: "payroll-export-workflow-for-contractors",
        title: "Payroll Export Workflow for Contractors",
        summary:
            "Create a weekly payroll workflow that reduces manual edits and keeps labor data consistent from field to payroll.",
        readTime: "6 min read",
        category: "Payroll",
        sections: [
            {
                heading: "Standardize pre-export checks",
                points: [
                    "Close open punches daily instead of waiting until Friday.",
                    "Review overtime and break exceptions by crew.",
                    "Confirm project/job code mapping before payroll lock.",
                ],
            },
            {
                heading: "Build an approval chain",
                points: [
                    "Set foreman review deadlines for each pay period.",
                    "Require office verification before file export.",
                    "Version payroll exports for traceable corrections.",
                ],
            },
            {
                heading: "Measure payroll performance",
                points: [
                    "Track payroll prep time week over week.",
                    "Monitor correction rate after export.",
                    "Report top exception drivers to operations leadership.",
                ],
            },
        ],
    },
    {
        slug: "crew-time-tracking-migration-risk-checklist",
        title: "Crew Time Tracking Migration Risk Checklist for Field Teams",
        summary:
            "Use this checklist to reduce rollout risk when switching from a legacy time app to a payroll-confidence workflow.",
        readTime: "7 min read",
        category: "Migration",
        sections: [
            {
                heading: "Baseline your current risk before you switch",
                points: [
                    "List where payroll disputes happen today and which crews generate the highest exception volume.",
                    "Document how clock edits, approvals, and exports are handled right now.",
                    "Define success metrics before migration: approval time, dispute count, and payroll correction rate.",
                ],
            },
            {
                heading: "Design a low-friction transition path",
                points: [
                    "Pilot with one crew and one supervisor before company-wide rollout.",
                    "Map geofence coverage and exception thresholds before launch day.",
                    "Run one parallel payroll cycle to compare legacy vs new records.",
                ],
            },
            {
                heading: "Lock proof and accountability loops",
                points: [
                    "Publish one owner for weekly freshness review on policy and comparison claims.",
                    "Review migration blockers after each payroll close and resolve in the next sprint.",
                    "Train supervisors on one escalation path for edge cases and missed punches.",
                ],
            },
        ],
    },
];

export const guideSlugs = guides.map((guide) => guide.slug);

export const guideBySlug = Object.fromEntries(
    guides.map((guide) => [guide.slug, guide])
) as Record<string, Guide>;
