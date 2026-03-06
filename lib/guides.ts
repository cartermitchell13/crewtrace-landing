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
            "A comprehensive compliance playbook for construction contractors — covering FLSA recordkeeping requirements, immutable edit trails, supervisor approval workflows, prevailing wage documentation, and mock audit drills — so you can produce a complete, defensible records package in hours, not weeks.",
        readTime: "20 min read",
        category: "Compliance",
        sections: [
            {
                heading: "Understand what the DOL actually requires",
                intro: "The Department of Labor does not prescribe a specific form or format for time records — but it does require specific data fields to be captured and retained. Most contractors who fail audits do not fail because they lack records entirely. They fail because their records are incomplete, inconsistent, or cannot be produced quickly enough to satisfy the investigator's timeline.",
                image: "/images/guides/compliance-shield.png",
                imageAlt: "Illustration of a compliance shield surrounded by document icons, a clock, and a location pin representing audit readiness",
                callout: { stat: "14 fields", label: "Minimum data points the FLSA requires employers to maintain for every covered worker" },
                points: [
                    "Under the Fair Labor Standards Act (FLSA), employers must maintain records that include the employee's full name, Social Security number, address, birth date (if under 19), sex, occupation, time and day the workweek begins, hours worked each day, total hours per workweek, basis of pay, regular hourly rate, daily or weekly straight-time earnings, total overtime earnings, and all wage additions or deductions.",
                    "There is no required form — paper, spreadsheet, or digital system are all acceptable — but the records must be accurate and available for inspection. An investigator can request records at any time without advance notice.",
                    "For construction specifically, you also need to associate time records with the project or job site where work was performed. This becomes critical for prevailing wage jobs where rates differ by location and trade classification.",
                    "Break periods must be documented. Under FLSA, breaks of 20 minutes or less are compensable work time. Meal periods of 30 minutes or more are not compensable only if the worker is completely relieved of duties. Ambiguity here is a common audit finding.",
                    "Overtime records must clearly show the calculation method. For workers on multiple projects at different rates, the weighted average method applies — and your records must support that calculation.",
                ],
            },
            {
                heading: "Architect your time record data structure",
                intro: "Audit-readiness is not something you bolt on after the fact — it is designed into how you capture time data from the first clock-in. The goal is a single, centralized record structure where every entry includes all the fields an auditor would ask for, without requiring anyone to manually reconstruct or cross-reference separate systems.",
                numbered: true,
                points: [
                    "Every time entry should capture, at minimum: employee identifier, date, clock-in time, clock-out time, break start and end times, total hours (regular and overtime separately), job site or project code, trade classification, pay rate, and the method of entry (mobile, kiosk, or manual).",
                    "Use a single system of record. If time data lives in one app, job codes in another, and pay rates in a spreadsheet, you have created gaps that an auditor will find. Consolidate into one platform or ensure airtight API integration between systems.",
                    "Ensure your system timestamps every entry with the exact time it was created or modified — not the time the supervisor reviewed it later. Investigators look for discrepancies between alleged work times and record creation times.",
                    "Build in project-level metadata so each time entry can be filtered by job site, contract number, and funding source. This is essential for producing prevailing wage reports scoped to specific federal projects.",
                    "Store worker classification alongside every time entry. A laborer and a carpenter on the same job site may have different prevailing wage rates — your records must tie each hour to the correct classification.",
                ],
            },
            {
                heading: "Implement immutable edit trails",
                intro: "The single most defensible feature in a digital time tracking system is an immutable edit history. When an auditor sees that every change to a record is logged — with the original value, new value, editor identity, timestamp, and reason — it signals that your company takes compliance seriously. Conversely, records that appear 'too clean' with no history of corrections raise red flags.",
                callout: { stat: "100%", label: "Of time record edits should be logged with who, when, what changed, and why — no exceptions" },
                points: [
                    "Every modification to a time entry must be captured in an immutable audit log that records the original value, the new value, the identity of the person who made the change, and the date and time of the change.",
                    "Require a reason code for every edit. Common categories include: forgot to clock in/out, phone or device issue, worked in an area with no connectivity, supervisor correction of job code, and manager-approved schedule adjustment.",
                    "Prevent bulk edits without individual justification. If a supervisor changes the clock-out time for 15 workers simultaneously, each change should still have its own log entry and reason — not a single blanket approval.",
                    "Lock records after a defined period — typically 48 to 72 hours after the pay period closes. After this window, edits should require a higher level of approval (project manager or payroll administrator) and generate an escalation flag.",
                    "Never allow records to be deleted. If an entry was created in error, it should be marked as void with a reason — not removed from the system. Deleted records create gaps that are indistinguishable from tampering.",
                ],
            },
            {
                heading: "Build a structured supervisor approval workflow",
                intro: "Raw clock-in data from the field is not payroll-ready and it is not audit-ready. It needs to pass through a structured review cycle where supervisors verify hours, resolve exceptions, and certify that the records are accurate before they reach payroll. This chain of approval is what transforms time data into defensible documentation.",
                image: "/images/guides/approval-workflow.png",
                imageAlt: "Illustration of a three-step digital approval workflow from field entry to supervisor review to payroll export",
                points: [
                    "Define a clear three-step workflow: field entry (worker clocks in/out), supervisor review (foreman verifies and approves), and payroll certification (admin exports clean data). Each step should capture who acted and when.",
                    "Set a deadline for supervisor review — ideally within 24 hours of the work day ending. Reviewing time entries on Friday for the entire week is less accurate because memory fades and corrections become guesses.",
                    "Require foremen to review and resolve all exceptions (missed punches, off-site clock-ins, overtime flags) before approving the day's entries. Unresolved exceptions should block the approval submission.",
                    "Store the supervisor's digital approval as a dated, signed record. This is the equivalent of a signed paper timesheet — and it proves that a responsible party reviewed the data before payroll processing.",
                    "Route escalations to a project manager or payroll admin when a foreman cannot resolve an exception. Build an escalation path that is fast (same-day resolution target) to prevent a backlog of unreviewed entries.",
                ],
            },
            {
                heading: "Handle prevailing wage and certified payroll requirements",
                intro: "If you work on federally funded projects governed by the Davis-Bacon Act, your recordkeeping obligations go significantly beyond standard FLSA requirements. Certified payroll reports (WH-347 forms) must be submitted weekly, and they must precisely tie labor hours, wage rates, and fringe benefits to specific trade classifications and projects. Errors here can result in withheld contract payments, back-wage assessments, and debarment from future government work.",
                callout: { stat: "$2,000", label: "Contract threshold that triggers Davis-Bacon prevailing wage requirements on federally funded construction" },
                points: [
                    "For every worker on a prevailing wage project, your records must include the correct trade classification, the applicable prevailing wage rate, the actual rate paid, and the value of fringe benefits (whether paid in cash or through bona fide benefit plans).",
                    "Certified payroll reports must be submitted weekly — even during weeks when no work is performed. Missing a week creates gaps that trigger scrutiny and suggest intentional evasion.",
                    "Pre-build WH-347 export templates in your time tracking system so that certified payroll reports can be generated directly from time data without manual re-entry. Manual transcription from timesheets to WH-347 forms is the most common source of discrepancies.",
                    "Track split classifications carefully. A worker who operates equipment in the morning and performs laborer duties in the afternoon must have their hours split and paid at the prevailing rate for each classification.",
                    "Maintain a current copy of the applicable wage determination for each project. Prevailing wage rates are updated periodically, and using an outdated rate — even by a few cents per hour — can trigger back-wage liability across every worker on the project.",
                    "Require a signed Statement of Compliance on every certified payroll submission. This is a legal certification by an officer of the company that the wages paid conform to the prevailing wage determination — it carries personal liability.",
                ],
            },
            {
                heading: "Configure exception detection and resolution",
                intro: "Exceptions — missed punches, off-site clock-ins, overtime anomalies, and break violations — are not just operational issues. They are audit vulnerabilities. An auditor who sees patterns of unresolved exceptions will question the reliability of your entire recordkeeping system. The fix is automated detection with a structured resolution workflow that clears exceptions before they accumulate.",
                points: [
                    "Configure automatic flags for the most audit-sensitive exceptions: a worker with no clock-out (suggests unrecorded overtime), daily hours exceeding 10 (potential overtime violation), break periods shorter than 30 minutes logged as unpaid (FLSA compensability issue), and clock-ins outside the designated job site.",
                    "Set a resolution SLA — every exception should be reviewed and resolved within 24 hours. Exceptions that sit unresolved for days signal a broken process to any investigator.",
                    "Track exception resolution in the same audit trail as the time record. The resolution should show what the exception was, who investigated it, what action was taken (corrected, approved as-is, or voided), and the supporting reason.",
                    "Review exception trends monthly at the company level. A high rate of 'forgot to clock out' exceptions on one project might indicate a coverage issue. A pattern of overtime flags being dismissed without adjustment could indicate wage theft exposure.",
                    "Create a weekly exception summary report for supervisors that shows unresolved items, resolution rates, and the most common exception types. This report is also valuable evidence of a proactive compliance culture during an audit.",
                ],
            },
            {
                heading: "Set up compliant data retention and storage",
                intro: "How long you keep records, where you store them, and how you protect them are all factors an auditor may examine. Federal and state requirements differ, and the safe approach is to retain records for the longest applicable period. Digital storage makes this easy — but only if your system is configured for secure, searchable, long-term archival.",
                image: "/images/guides/audit-records.png",
                imageAlt: "Illustration of organized digital time records on a laptop with a magnifying glass and compliance documents",
                callout: { stat: "3+ years", label: "Minimum federal retention period for payroll records — many states and prevailing wage contracts require longer" },
                numbered: true,
                points: [
                    "Federal FLSA rules require employers to retain payroll records for at least three years and supplementary records (time cards, work schedules, wage rate tables) for at least two years. However, many states — such as California, New York, and Illinois — require six or more years.",
                    "For prevailing wage projects, retain all certified payroll records and supporting documentation for the duration of the contract plus three years after final payment. Some agencies require longer.",
                    "Store records in a system that supports full-text search and filtering by employee, date range, project, and trade classification. An auditor may request 'all time records for electricians on Project X from March through June' — you need to produce this in minutes, not days.",
                    "Ensure your storage solution provides encryption at rest and in transit, with role-based access controls. Time records contain personally identifiable information (PII) including Social Security numbers and are subject to data protection requirements.",
                    "Maintain automated backups with geographic redundancy. If your only copy of time records is on a local server that fails, you have a compliance crisis — not just a technical one.",
                ],
            },
            {
                heading: "Prepare export templates for common audit requests",
                intro: "When a DOL investigator arrives — whether for a routine Wage and Hour Division review, a prevailing wage compliance check, or a complaint-driven investigation — they will request specific record packages. Having pre-built export templates ready eliminates the scramble that leads to incomplete or inconsistent document production.",
                points: [
                    "Build a standard FLSA response package template that exports: employee roster with classifications, date-range time records with daily and weekly totals, overtime calculations, pay rate history, and any wage deductions — all in a single, printable report.",
                    "Create a prevailing wage audit package template that includes: certified payroll reports (WH-347), supporting time records, wage determination documents, fringe benefit payment documentation, and the signed Statement of Compliance for each submission period.",
                    "Pre-configure a 'by project' export that isolates all labor data for a specific contract or job site. Prevailing wage investigations are always scoped to a specific project — your system should produce this view with one click.",
                    "Build a 'worker history' export that shows a single employee's complete time record across all projects, including rate changes, classification changes, and any corrections or edits with full audit trail.",
                    "Test your export templates quarterly by running a mock export and verifying that all required fields are populated, calculations are correct, and the output format is readable without specialized software (PDF is safest for external delivery).",
                ],
            },
            {
                heading: "Run quarterly mock audits",
                intro: "The most effective way to ensure audit readiness is to simulate one. A quarterly mock audit exposes gaps in your records, tests your team's response speed, and builds the muscle memory needed to stay calm when a real auditor arrives. Companies that run mock audits routinely resolve findings in hours — companies that do not can spend weeks scrambling.",
                callout: { stat: "< 30 min", label: "Target time to produce a complete, defensible records package for any random project and pay period" },
                numbered: true,
                points: [
                    "Select a random project and a random two-week pay period. Ask your payroll administrator to produce the full FLSA record package — employee details, daily time records, overtime calculations, pay rates, and deduction records — as if responding to an actual DOL letter.",
                    "Time the process from request to delivery. If it takes more than 30 minutes to produce a clean package, identify the bottleneck — is it data retrieval, missing fields, inconsistent formats, or approval gaps?",
                    "Review the produced records for completeness: are all 14 FLSA-required fields present? Are break periods documented? Are overtime calculations correct? Is the edit history intact and legible?",
                    "If you work on prevailing wage projects, extend the mock audit to include a certified payroll package for one project. Verify that WH-347 forms match the underlying time records and that the wage determination attached is current.",
                    "Document the findings from each mock audit — what was missing, what took too long, what was produced correctly — and track improvement over time. This documentation itself is powerful evidence of a compliance-focused culture in a real audit.",
                ],
            },
            {
                heading: "Manage subcontractor compliance exposure",
                intro: "On public works projects, the general contractor bears ultimate responsibility for ensuring that all subcontractors comply with prevailing wage and recordkeeping requirements. An audit finding against a subcontractor flows uphill. If your subs cannot produce clean records, your company absorbs the compliance risk — including potential back-wage liability, penalties, and debarment.",
                callout: { stat: "100%", label: "Of subcontractor certified payroll submissions should be collected and reviewed weekly — gaps create joint liability" },
                points: [
                    "Require subcontractors to submit certified payroll reports on the same schedule as your own crews — weekly, with no gaps. Build this requirement into your subcontract language with explicit consequences for non-compliance.",
                    "Review subcontractor certified payroll reports for the same red flags you check internally: missing classifications, rates that do not match the wage determination, incomplete fringe benefit documentation, and missing Statement of Compliance signatures.",
                    "Maintain a subcontractor compliance file for each project that includes: the executed subcontract, applicable wage determinations, all certified payroll submissions, insurance certificates, and any correspondence regarding corrections or exceptions.",
                    "If a subcontractor's records appear incomplete or inconsistent, escalate immediately — do not wait for an audit to surface the issue. Your proactive correction effort is documented evidence of good faith compliance if the issue is later investigated.",
                    "Consider requiring subcontractors on prevailing wage projects to use compatible time tracking systems that can produce standardized exports. Inconsistent data formats across subs make consolidated reporting difficult and error-prone.",
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
