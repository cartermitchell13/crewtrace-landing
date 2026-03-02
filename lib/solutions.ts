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
        tagline: "Verified start and stop times at every job site.",
        description:
            "Replace paper timesheets with GPS-verified clock-ins and clock-outs so payroll is based on where crews actually worked.",
        primaryKeyword: "gps time tracking for construction",
        primaryIntent: "gps-verified-contractor-time-tracking",
        relatedIndustries: ["roofing", "plumbing", "landscaping", "construction"],
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
            "Cleaner payroll approvals",
            "Fewer wage disputes",
            "Higher confidence in labor reporting",
        ],
    },
    {
        slug: "payroll-leakage-prevention",
        name: "Payroll Leakage Prevention",
        tagline: "Find and stop labor waste before payroll closes.",
        description:
            "Identify hidden overpayment patterns including early punch-ins, long breaks, and unverified overtime with daily visibility.",
        primaryKeyword: "reduce payroll leakage construction",
        primaryIntent: "construction-payroll-overpayment-prevention",
        relatedIndustries: [
            "general-contractors",
            "concrete",
            "hvac",
            "construction",
            "waterproofing",
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
            "Lower overpayment risk",
            "Faster payroll review cycles",
            "More predictable labor margins",
        ],
    },
    {
        slug: "dol-compliance",
        name: "DOL Compliance Tracking",
        tagline: "Audit-ready records for wage and hour compliance.",
        description:
            "Maintain defensible time records, approval history, and location context to support FLSA and DOL audit requirements.",
        primaryKeyword: "construction time tracking compliance",
        primaryIntent: "dol-flsa-contractor-timekeeping-compliance",
        relatedIndustries: ["general-contractors", "roofing", "hvac", "construction"],
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
            "Reduced audit scramble",
            "Higher confidence in compliance reporting",
        ],
    },
    {
        slug: "geofencing-time-clock",
        name: "Geofencing Time Clock",
        tagline: "Clock-in boundaries that match real job sites.",
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
            "Fewer location-related disputes",
            "Cleaner project cost tracking",
        ],
    },
    {
        slug: "payroll-exports",
        name: "Payroll Exports",
        tagline: "Payroll-ready files without manual cleanup.",
        description:
            "Export approved hours in payroll-friendly formats so your team spends less time fixing data and more time running operations.",
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
            "Reduced admin effort",
            "Fewer payroll correction cycles",
        ],
    },
];

export type FeatureSlug = FeatureRecord["slug"];

export const featureSlugs: FeatureSlug[] = featureRecords.map((feature) => feature.slug);

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
