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
        slug: "scheduling",
        name: "Crew Scheduling",
        tagline: "Plan crews, jobs, and shifts without juggling spreadsheets.",
        description:
            "Build the week's schedule in minutes, send assignments to crews, and keep field changes synced with the time records payroll uses.",
        primaryKeyword: "crew scheduling software",
        primaryIntent: "construction-crew-scheduling-and-dispatch",
        metaTitle: "Crew Scheduling Software for Contractors | Crewtrace",
        metaDescription:
            "Crew scheduling software that lets contractors plan jobs, assign workers, and keep field changes in sync with time tracking and payroll.",
        heroTitle: "Crew scheduling that stays in sync with the field",
        heroSubtitle:
            "Plan the week, assign crews to jobs, and push changes to the field in seconds. Crewtrace keeps schedules, clock events, and payroll working from the same record.",
        relatedIndustries: [
            "hvac",
            "plumbing",
            "electrical",
            "landscaping",
            "general-contractors",
            "construction",
        ],
        challenges: [
            "Schedules built in spreadsheets that go stale by Monday morning",
            "Last-minute job changes that never reach the right crew",
            "Disconnect between who was scheduled and who actually clocked in",
        ],
        capabilities: [
            "Drag-and-drop weekly schedule by crew or job",
            "Assignment notifications pushed to worker phones",
            "Schedule vs. actual hours visibility tied to time records",
        ],
        outcomes: [
            "Fewer missed assignments and dispatch mistakes",
            "Less time spent rebuilding the schedule each week",
            "Cleaner reconciliation between planned and worked hours",
        ],
        faqItems: [
            {
                question: "How is Crewtrace scheduling different from a spreadsheet or calendar?",
                answer: "A spreadsheet shows intent. Crewtrace scheduling is connected to the same record that captures clock events, GPS location, and approvals. When a crew is reassigned, the new job is reflected on their phone, and when they clock in, you immediately see scheduled hours versus actual hours instead of reconciling two different systems.",
            },
            {
                question: "Can crews see their schedule on their phones?",
                answer: "Yes. Once a worker is assigned to a job, they see the date, location, and reporting time directly in the Crewtrace mobile app. Schedule changes pushed by the office update on the worker's device automatically, so there is no group chat scramble when a job moves.",
            },
            {
                question: "How do schedule changes work when jobs get pushed or canceled?",
                answer: "Supervisors can move a crew between jobs, swap workers, or cancel a shift directly from the schedule. Affected workers are notified, and the schedule history is preserved so you can see what was originally planned and what actually happened.",
            },
            {
                question: "Does Crewtrace scheduling integrate with time tracking and payroll?",
                answer: "Yes. Scheduling, time tracking, and payroll exports all run on the same record. Scheduled hours can be compared to verified clock events, and the approved hours flow into your payroll export with no double entry.",
            },
            {
                question: "Can I schedule by job site, by crew, or by individual worker?",
                answer: "All three. Most contractors build the week by job site first, then assign crews or individuals to that job. You can also pivot the view to see one worker's full week or one crew's coverage across multiple sites.",
            },
        ],
    },
];

export type FeatureSlug = FeatureRecord["slug"];

export const featureSlugs: FeatureSlug[] = featureRecords.map((feature) => feature.slug);

export const expansionFeatureSlugs: string[] = [];

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
