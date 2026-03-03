export interface FeatureRecord {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    primaryKeyword: string;
    primaryIntent: string;
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
            "Replace paper timesheets with GPS-verified clock-ins and clock-outs so payroll decisions start from field evidence, not memory.",
        primaryKeyword: "gps time tracking for construction",
        primaryIntent: "gps-verified-contractor-time-tracking",
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
            "Identify hidden overpayment patterns including early punch-ins, long breaks, and unverified overtime before they compound.",
        primaryKeyword: "reduce payroll leakage construction",
        primaryIntent: "construction-payroll-overpayment-prevention",
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
            "Maintain defensible time records, approval history, and location context so compliance reviews are straightforward and traceable.",
        primaryKeyword: "construction time tracking compliance",
        primaryIntent: "dol-flsa-contractor-timekeeping-compliance",
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
            "Use custom geofence zones per project so workers can only clock in when physically inside approved work areas.",
        primaryKeyword: "geofence time clock",
        primaryIntent: "jobsite-geofenced-time-clock",
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
            "Export approved hours in payroll-friendly formats so payroll teams can finalize runs faster and with fewer corrections.",
        primaryKeyword: "construction payroll export",
        primaryIntent: "contractor-payroll-export-workflow",
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
            "Track overtime risk in real time with configurable alerts so field leads can correct schedule and labor issues before payroll closes.",
        primaryKeyword: "construction overtime alert software",
        primaryIntent: "construction-overtime-risk-alerts",
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
