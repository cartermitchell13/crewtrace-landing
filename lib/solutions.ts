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
