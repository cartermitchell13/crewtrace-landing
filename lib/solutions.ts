import type { FaqItem } from "@/lib/faq";

export interface FeatureRecord {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    primaryKeyword: string;
    primaryIntent: string;
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    relatedIndustries: string[];
    challenges: string[];
    capabilities: string[];
    outcomes: string[];
    faqItems: FaqItem[];
}

export const featureRecords: FeatureRecord[] = [
    {
        slug: "gps-time-tracking",
        name: "GPS Time Tracking",
        tagline: "Tie every clock event to the actual job site in real time.",
        description:
            "Give supervisors a GPS-verified record of where crews clocked in and out so payroll starts from field proof, not memory.",
        primaryKeyword: "gps time clock",
        primaryIntent: "gps-verified-contractor-time-tracking",
        metaTitle: "GPS Time Clock for Construction Crews | Crewtrace",
        metaDescription:
            "GPS time clock with jobsite verification, mobile clock-ins, and cleaner payroll approvals for contractors running field crews.",
        heroTitle: "A GPS time clock built for moving crews",
        heroSubtitle:
            "See where crews clocked in, when they left, and what hours should be paid. Crewtrace gives supervisors a field record they can trust before payroll closes.",
        relatedIndustries: [
            "roofing",
            "plumbing",
            "landscaping",
            "construction",
            "hvac",
        ],
        challenges: [
            "Unverified clock-ins from the truck or parking lot",
            "Disputes over arrival and departure times",
            "Manual time entry errors from paper logs",
        ],
        capabilities: [
            "Job-site geofence verification",
            "Mobile clock in/out with location proof",
            "Live attendance visibility for supervisors",
        ],
        outcomes: [
            "Cleaner payroll approvals before close",
            "Fewer wage and arrival-time disputes",
            "Higher confidence in labor-cost reporting",
        ],
        faqItems: [
            {
                question: "How accurate is GPS time clock verification on active job sites?",
                answer: "Crewtrace uses phone-level GPS to confirm a worker is within the designated job-site boundary at clock-in and clock-out. Accuracy typically falls within 10–30 feet depending on the device and environment. On open commercial sites, it is tighter; dense urban or indoor areas may see wider variance, which is why Crewtrace also logs a location confidence score with every event.",
            },
            {
                question: "Can workers clock in from a truck or parking lot before they reach the site?",
                answer: "Not if the geofence is drawn correctly. The boundary defines the valid clock-in zone, so a worker sitting in the parking lot across the street will not pass verification. Supervisors also see the exact GPS coordinate of each event, so any edge cases are easy to spot during review.",
            },
            {
                question: "What happens if GPS signal is weak or unavailable at a job site?",
                answer: "The app records the clock event locally on the device and syncs it when signal returns. The record will include a flag indicating reduced GPS confidence so supervisors can review it separately. This keeps the workflow moving even on rural or underground sites.",
            },
            {
                question: "Does GPS tracking drain battery on crew phones?",
                answer: "Crewtrace only activates location services at clock-in and clock-out events — it does not run continuous background tracking. Most crews report no noticeable battery difference compared to a normal workday.",
            },
            {
                question: "How is a GPS time clock different from a regular time clock app?",
                answer: "A regular time clock app records when someone tapped a button. A GPS time clock also records where that tap happened and whether the location matches the assigned job site. That location proof is what gives supervisors and payroll teams confidence that the hours are real.",
            },
        ],
    },
    {
        slug: "payroll-leakage-prevention",
        name: "Payroll Leakage Prevention",
        tagline: "Find and correct labor leakage during the week, not after payroll.",
        description:
            "Find early punch-ins, long breaks, and overtime leaks before payroll day so labor costs stop drifting.",
        primaryKeyword: "construction payroll software",
        primaryIntent: "construction-payroll-overpayment-prevention",
        metaTitle: "Construction Payroll Software for Labor Cost Control | Crewtrace",
        metaDescription:
            "Construction payroll software that helps contractors catch early punch-ins, long breaks, and overtime leaks before they turn into overpayment.",
        heroTitle: "Construction payroll software starts with clean field time",
        heroSubtitle:
            "If your team is fixing timesheets on payroll day, the real problem starts earlier. Crewtrace helps you catch small leaks before they turn into expensive overpayment.",
        relatedIndustries: [
            "general-contractors",
            "concrete",
            "hvac",
            "construction",
            "waterproofing",
            "roofing",
            "plumbing",
            "landscaping",
            "electrical",
        ],
        challenges: [
            "Small daily time inflation that compounds weekly",
            "No system for spotting repeated overpayment patterns",
            "Payroll reviews done too late to correct issues",
        ],
        capabilities: [
            "Exception flags for early/late activity",
            "Overtime and break pattern monitoring",
            "Labor-cost trend reporting by crew",
        ],
        outcomes: [
            "Lower recurring overpayment risk",
            "Faster payroll review cycles",
            "More predictable labor margin control",
        ],
        faqItems: [
            {
                question: "How much payroll leakage does the average contractor actually lose?",
                answer: "Industry estimates range from 1–7% of total labor spend depending on crew size, number of sites, and how timesheets are currently managed. For a contractor running 20 field workers, that can mean $800–$3,000 per month in early punch-ins, extended breaks, and unverified overtime alone.",
            },
            {
                question: "What types of payroll leakage does Crewtrace catch?",
                answer: "The most common patterns are early clock-ins before crews reach the site, extended or unreported breaks, overtime hours that were not pre-approved, and small daily time inflation that compounds weekly. Crewtrace flags these as exceptions before payroll is finalized, not after.",
            },
            {
                question: "How quickly will I see payroll savings after rolling out Crewtrace?",
                answer: "Most contractors identify measurable leakage patterns within the first full pay period — usually one to two weeks. The savings compound as supervisors start reviewing flagged exceptions in real time instead of discovering problems after payroll has already been submitted.",
            },
            {
                question: "Does this replace my existing payroll software?",
                answer: "No. Crewtrace is not payroll software — it sits upstream and gives your payroll team cleaner, verified time data to work with. You still run payroll through your existing provider; Crewtrace just makes sure the hours going in are accurate.",
            },
            {
                question: "Can I see which crews or job sites have the most leakage?",
                answer: "Yes. Crewtrace provides crew-level and site-level labor reporting so you can see where overpayment patterns concentrate. This helps you address specific behavioral issues rather than applying blanket policy changes.",
            },
        ],
    },
    {
        slug: "dol-compliance",
        name: "DOL Compliance Tracking",
        tagline: "Maintain audit-ready time records for wage and hour reviews.",
        description:
            "Keep defensible time records, approval history, and location context in one place so wage and hour reviews are easier to handle.",
        primaryKeyword: "department of labor time clock rules",
        primaryIntent: "dol-flsa-contractor-timekeeping-compliance",
        metaTitle: "Department of Labor Time Clock Rules and Audit Records | Crewtrace",
        metaDescription:
            "Track the records behind department of labor time clock rules with edit history, approvals, and jobsite context built for contractors.",
        heroTitle: "Stay ready for DOL time clock reviews",
        heroSubtitle:
            "Keep each edit, approval, and location record in one place so wage and hour questions do not turn into a last-minute scramble.",
        relatedIndustries: [
            "general-contractors",
            "roofing",
            "hvac",
            "construction",
            "concrete",
            "electrical",
        ],
        challenges: [
            "Missing or incomplete time documentation",
            "Difficulty proving edits and approvals",
            "Risk exposure during labor disputes or audits",
        ],
        capabilities: [
            "Centralized digital time records",
            "Edit and approval audit trail",
            "Policy-driven record retention",
        ],
        outcomes: [
            "Stronger documentation posture",
            "Less last-minute audit scramble",
            "Higher confidence in compliance reporting",
        ],
        faqItems: [
            {
                question: "What time records does the Department of Labor actually require from contractors?",
                answer: "Under FLSA, employers must retain records showing each employee's hours worked per day, total hours per week, regular and overtime pay rates, and total wages. For contractors, that also means being able to show how hours were calculated, who approved edits, and what evidence supports the final numbers. Crewtrace keeps all of this in one audit-ready trail.",
            },
            {
                question: "How does Crewtrace help during a DOL wage and hour audit?",
                answer: "Crewtrace stores every clock event, edit, approval, and location record in a centralized history. If an auditor asks why a worker was paid a specific amount, you can pull the full record chain — original clock-in, any supervisor edits, and the final approval — without digging through paper files or email threads.",
            },
            {
                question: "What is the difference between DOL compliance and just tracking time?",
                answer: "Tracking time tells you how many hours someone worked. DOL compliance means you can prove it — with edit history, approval records, and supporting evidence like GPS location. Many time tracking apps record hours but do not preserve the documentation trail that matters during an audit.",
            },
            {
                question: "How long do I need to keep time records for DOL purposes?",
                answer: "The FLSA requires payroll records to be kept for at least three years, and supplemental records (like time cards and schedules) for at least two years. Crewtrace stores records digitally with no manual archiving required, so your documentation stays accessible as long as you need it.",
            },
            {
                question: "Can Crewtrace help prevent wage and hour lawsuits?",
                answer: "It reduces your exposure significantly. Most wage disputes stem from missing or inconsistent records that make it hard to prove what was actually worked. When every shift has a GPS-verified clock event and an approval chain, there is far less room for he-said-she-said disputes.",
            },
        ],
    },
    {
        slug: "geofencing-time-clock",
        name: "Geofencing Time Clock",
        tagline: "Set clock-in boundaries that match how jobs are actually staffed.",
        description:
            "Use custom geofence zones so crews can only clock in when they are physically inside the right work area.",
        primaryKeyword: "geofencing time tracking",
        primaryIntent: "jobsite-geofenced-time-clock",
        metaTitle: "Geofencing Time Tracking for Job Sites | Crewtrace",
        metaDescription:
            "Geofencing time tracking for contractors who need on-site clock-ins, fewer off-site punches, and cleaner project records.",
        heroTitle: "Geofencing time tracking that matches the real job site",
        heroSubtitle:
            "Allow crews to clock in only where they are supposed to work. Crewtrace helps you stop off-site punches without slowing the day down.",
        relatedIndustries: ["landscaping", "concrete", "roofing", "waterproofing"],
        challenges: [
            "Crews moving between multiple sites in one day",
            "Clock-ins happening off-site",
            "No consistent rules across active projects",
        ],
        capabilities: [
            "Custom geofence setup per job",
            "Site-level time validation rules",
            "Multi-site workforce visibility",
        ],
        outcomes: [
            "More accurate site-level labor data",
            "Fewer location-related payroll disputes",
            "Cleaner project cost tracking",
        ],
        faqItems: [
            {
                question: "How does geofencing work for construction time tracking?",
                answer: "You draw a virtual boundary around each job site on a map. When a worker tries to clock in, Crewtrace checks whether their phone's GPS falls inside that boundary. If they are outside the zone, the clock-in is blocked or flagged for supervisor review. This prevents off-site punches without requiring any extra steps from the worker.",
            },
            {
                question: "Can I set different geofence zones for different job sites?",
                answer: "Yes. Each active project gets its own geofence with a custom boundary shape and radius. If you are running multiple sites, workers are validated against whichever site they are assigned to that day.",
            },
            {
                question: "What happens when a worker is right on the edge of the geofence?",
                answer: "Crewtrace logs the GPS confidence level with each event. If a clock-in lands in a gray zone — technically inside but near the boundary — the event is recorded with a proximity flag so supervisors can review it. You can also adjust the geofence radius to account for parking areas or staging zones.",
            },
            {
                question: "How is geofencing different from GPS time tracking?",
                answer: "GPS time tracking records where someone clocked in. Geofencing adds an enforcement layer: it validates whether that location is within an approved work zone before the clock-in is accepted. Think of GPS as the proof and geofencing as the rule.",
            },
            {
                question: "Does geofencing work when crews move between multiple sites in one day?",
                answer: "Yes. Workers can clock out of one site and clock in at the next. Crewtrace validates each event against the geofence for the assigned location, so multi-site days still produce clean, site-level time records.",
            },
        ],
    },
    {
        slug: "payroll-exports",
        name: "Payroll Exports",
        tagline: "Send payroll-ready files without last-minute reformatting.",
        description:
            "Move approved hours into payroll faster with exports your back office can use without last-minute cleanup.",
        primaryKeyword: "payroll time tracking software",
        primaryIntent: "contractor-payroll-export-workflow",
        metaTitle: "Payroll Time Tracking Software for Faster Exports | Crewtrace",
        metaDescription:
            "Payroll time tracking software that turns approved field hours into payroll-ready exports with fewer corrections and less admin work.",
        heroTitle: "Payroll time tracking software without last-minute cleanup",
        heroSubtitle:
            "Give payroll a cleaner handoff from the field. Crewtrace helps your team move approved hours faster and with fewer corrections.",
        relatedIndustries: [
            "plumbing",
            "hvac",
            "general-contractors",
            "waterproofing",
        ],
        challenges: [
            "Manual re-entry from timesheets into payroll software",
            "Formatting mismatches between systems",
            "Last-minute payroll delays from data cleanup",
        ],
        capabilities: [
            "Standardized CSV export workflows",
            "Field mapping support for payroll systems",
            "Approval-first export process",
        ],
        outcomes: [
            "Faster payroll processing",
            "Reduced weekly admin effort",
            "Fewer payroll correction cycles",
        ],
        faqItems: [
            {
                question: "What payroll systems does Crewtrace export to?",
                answer: "Crewtrace exports to standardized CSV files that work with most payroll providers including QuickBooks, ADP, Gusto, Paychex, and others. If your provider accepts CSV imports, Crewtrace can feed it directly. For custom formats, field mapping support is available during onboarding.",
            },
            {
                question: "How much time does automated payroll export actually save?",
                answer: "Contractors who switch from manual timesheet entry typically save 3–5 hours per pay period on data entry alone, plus another 1–2 hours that were spent resolving discrepancies. The bigger win is fewer correction cycles after payroll has been submitted.",
            },
            {
                question: "Can I review and approve hours before they are exported?",
                answer: "Yes. Crewtrace uses an approval-first workflow. Supervisors review flagged exceptions and approve the final hours before any export is generated. Payroll only receives data that has already been verified and signed off.",
            },
            {
                question: "What if my payroll provider needs a specific file format?",
                answer: "During onboarding, Crewtrace maps your export fields to match your provider's import requirements. If your payroll system needs specific column headers, date formats, or cost-code breakdowns, those are configured once and applied to every future export.",
            },
            {
                question: "Does the export include overtime and break breakdowns?",
                answer: "Yes. Exports include regular hours, overtime hours, break durations, and job-site or cost-code assignments. This gives your payroll team a complete picture without needing to cross-reference separate spreadsheets.",
            },
        ],
    },
    {
        slug: "overtime-alerts",
        name: "Overtime Alerts",
        tagline: "Catch overtime spikes early enough to intervene the same day.",
        description:
            "Track overtime risk in real time so field leads can fix schedule and labor problems before payroll closes.",
        primaryKeyword: "overtime tracking",
        primaryIntent: "construction-overtime-risk-alerts",
        metaTitle: "Overtime Tracking for Field Crews | Crewtrace",
        metaDescription:
            "Overtime tracking for contractors who need earlier alerts, faster supervisor action, and fewer payroll surprises on active jobs.",
        heroTitle: "Overtime tracking before payroll gets expensive",
        heroSubtitle:
            "Give supervisors time to fix schedule overruns the same day. Crewtrace flags overtime risk early enough to change the outcome.",
        relatedIndustries: ["construction", "hvac", "roofing", "electrical"],
        challenges: [
            "Unexpected overtime spikes discovered only at payroll close",
            "No live trigger when crews exceed scheduled labor windows",
            "Late interventions that still result in avoidable overpayment",
        ],
        capabilities: [
            "Configurable overtime thresholds by crew or job",
            "Same-day alerts for overtime and break anomalies",
            "Exception queue for supervisor review before approval",
        ],
        outcomes: [
            "Earlier correction of labor overrun patterns",
            "Lower overtime-related payroll leakage",
            "Faster escalation of timekeeping exceptions",
        ],
        faqItems: [
            {
                question: "How early does Crewtrace alert supervisors about overtime?",
                answer: "Alerts fire as soon as a worker crosses a configurable threshold — for example, when a crew member hits 38 hours on a Thursday. This gives the field lead enough runway to reassign work, adjust the schedule, or authorize the overtime intentionally rather than discovering it on payroll day.",
            },
            {
                question: "Can I set different overtime thresholds for different crews or jobs?",
                answer: "Yes. Thresholds are configurable by crew, job site, or worker. Some contractors set tighter limits on cost-sensitive projects and looser ones on jobs with built-in overtime budgets. Each threshold triggers its own alert independently.",
            },
            {
                question: "What is the difference between overtime tracking and overtime alerts?",
                answer: "Overtime tracking tells you after the fact how many overtime hours were worked. Overtime alerts notify you before or as it happens, so you can intervene. The distinction matters because most payroll overruns are discovered too late to change the outcome.",
            },
            {
                question: "Do overtime alerts also catch extended break patterns?",
                answer: "Yes. Crewtrace flags both overtime threshold breaches and break anomalies — like breaks that run significantly longer than policy. These are surfaced in the same exception queue so supervisors can review them together.",
            },
            {
                question: "How do supervisors receive overtime alerts?",
                answer: "Alerts are delivered through the Crewtrace app and can be configured to send push notifications. Supervisors see a prioritized exception queue that highlights which workers or sites need attention, so they can act quickly without sifting through raw data.",
            },
        ],
    },
];

export type FeatureSlug = FeatureRecord["slug"];

export const featureSlugs: FeatureSlug[] = featureRecords.map((feature) => feature.slug);

export const expansionFeatureSlugs = ["overtime-alerts"] as const;

export const featureBySlug: Record<string, FeatureRecord> = Object.fromEntries(
    featureRecords.map((feature) => [feature.slug, feature]),
);

export function getFeatureSummaries() {
    return featureRecords.map(
        ({ slug, name, tagline, description, primaryKeyword, primaryIntent, relatedIndustries }) => ({
            slug,
            name,
            tagline,
            description,
            primaryKeyword,
            primaryIntent,
            relatedIndustries,
        }),
    );
}

export function getFeaturesBySlugs(slugs: string[]): FeatureRecord[] {
    return slugs
        .map((slug) => featureBySlug[slug])
        .filter((feature): feature is FeatureRecord => Boolean(feature));
}

export function getFeaturesByIndustrySlug(industrySlug: string): FeatureRecord[] {
    return featureRecords.filter((feature) => feature.relatedIndustries.includes(industrySlug));
}

export const solutions = featureRecords;
export const solutionSlugs = featureSlugs;
export const solutionBySlug = featureBySlug;
export const getSolutionSummaries = getFeatureSummaries;
export const getSolutionsBySlugs = getFeaturesBySlugs;
