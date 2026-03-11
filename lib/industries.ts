export type IndustryIconKey =
    | "home"
    | "wind"
    | "droplets"
    | "hard-hat"
    | "trees"
    | "layers"
    | "map-pin"
    | "check-circle-2"
    | "alert-circle"
    | "bar-chart-3"
    | "clock"
    | "trending-up"
    | "shield-check";

export interface IndustryBenefit {
    title: string;
    description: string;
    icon: IndustryIconKey;
}

export interface IndustryPainPoint {
    title: string;
    description: string;
}

export interface IndustryStat {
    value: string;
    label: string;
}

export interface IndustryTestimonial {
    quote: string;
    author: string;
    company: string;
}

export interface IndustryRecord {
    slug: string;
    name: string;
    icon: IndustryIconKey;
    primaryKeyword: string;
    primaryIntent: string;
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    hubDescription: string;
    hubStat: string;
    painPoints: IndustryPainPoint[];
    benefits: IndustryBenefit[];
    stats: IndustryStat[];
    testimonial?: IndustryTestimonial;
    relatedSolutions: string[];
}

export const industryRecords: IndustryRecord[] = [
    {
        slug: "roofing",
        name: "Roofing",
        icon: "home",
        primaryKeyword: "roofing contractor time tracking",
        primaryIntent: "roofing-payroll-time-tracking",
        metaTitle: "Roofing Contractor Time Tracking Software | Crewtrace",
        metaDescription:
            "Roofing contractor time tracking software with a GPS time clock, mobile timesheets, and payroll-ready records for field crews.",
        heroTitle: "Roofing contractor time tracking with a GPS time clock",
        heroSubtitle:
            "Keep every crew honest from the first arrival to the last wrap-up. Crewtrace gives you a clean, verified record before payroll is approved.",
        hubDescription:
            "Track when roofing crews actually arrive, start, and wrap each site with verified clock events and payroll-ready timesheets.",
        hubStat: "Avg. $1,400/mo saved",
        painPoints: [
            {
                title: "Early punch-in fraud",
                description:
                    "Crews claiming they arrived at 6 AM when they really showed up at 7.",
            },
            {
                title: "Extended lunch breaks",
                description: "30-minute lunches that mysteriously become 90 minutes.",
            },
            {
                title: "Job site hopping",
                description: "Workers leaving early to hit another contractor's job.",
            },
        ],
        benefits: [
            {
                title: "GPS Geofencing",
                description: "Workers can only clock in when physically at the job site.",
                icon: "map-pin",
            },
            {
                title: "Photo Verification",
                description: "Timestamped photos prove work started and ended.",
                icon: "check-circle-2",
            },
            {
                title: "Real-Time Alerts",
                description: "Get notified when crews arrive late or leave early.",
                icon: "alert-circle",
            },
            {
                title: "Weather Tracking",
                description: "Log weather delays automatically for accurate records.",
                icon: "wind",
            },
        ],
        stats: [
            { value: "$1,400", label: "Average monthly savings" },
            { value: "23%", label: "Reduction in payroll costs" },
            { value: "4 hrs", label: "Saved on payroll processing weekly" },
        ],
        testimonial: {
            quote:
                "We were paying for 2 hours of work that was not happening every single day. That is $400 a week we were just throwing away.",
            author: "Mike Ramirez",
            company: "Ramirez Roofing Co.",
        },
        relatedSolutions: [
            "gps-time-tracking",
            "payroll-leakage-prevention",
            "geofencing-time-clock",
            "dol-compliance",
            "overtime-alerts",
        ],
    },
    {
        slug: "hvac",
        name: "HVAC",
        icon: "wind",
        primaryKeyword: "hvac time tracking",
        primaryIntent: "hvac-service-time-tracking",
        metaTitle: "HVAC Time Tracking Software for Service Teams | Crewtrace",
        metaDescription:
            "HVAC time tracking software for service teams that need verified stops, cleaner dispatch visibility, and payroll-ready records.",
        heroTitle: "HVAC time tracking for technicians in the field",
        heroSubtitle:
            "See where each technician worked, how long the stop took, and what should be paid. Crewtrace keeps dispatch, payroll, and job costing on the same page.",
        hubDescription:
            "Track technicians across service calls with verified time logs, mobile clock-ins, and cleaner payroll handoff.",
        hubStat: "Avg. $1,200/mo saved",
        painPoints: [
            {
                title: "Drive time padding",
                description: "Technicians adding extra time between service calls.",
            },
            {
                title: "Call stacking",
                description: "Techs running personal errands between appointments.",
            },
            {
                title: "Inaccurate job duration",
                description:
                    "No way to know if a 2-hour job really took the full 2 hours.",
            },
        ],
        benefits: [
            {
                title: "Multi-Stop Tracking",
                description: "Automatic time logging at each service location.",
                icon: "map-pin",
            },
            {
                title: "Route Verification",
                description: "See actual routes taken between jobs.",
                icon: "trending-up",
            },
            {
                title: "Service Time Reports",
                description: "Know exactly how long each job takes.",
                icon: "clock",
            },
            {
                title: "Customer Communication",
                description: "Send accurate ETAs to customers.",
                icon: "check-circle-2",
            },
        ],
        stats: [
            { value: "$1,200", label: "Average monthly savings" },
            { value: "18%", label: "More jobs completed per tech" },
            { value: "2 hrs", label: "Saved on scheduling daily" },
        ],
        relatedSolutions: [
            "gps-time-tracking",
            "payroll-exports",
            "dol-compliance",
            "payroll-leakage-prevention",
            "overtime-alerts",
        ],
    },
    {
        slug: "plumbing",
        name: "Plumbing",
        icon: "droplets",
        primaryKeyword: "plumbing contractor time tracking",
        primaryIntent: "plumbing-job-time-verification",
        metaTitle: "Plumbing Contractor Time Tracking Software | Crewtrace",
        metaDescription:
            "Plumbing contractor time tracking software for residential, commercial, and emergency crews that need verified field hours and payroll-ready records.",
        heroTitle: "Plumbing contractor time tracking with verified field stops",
        heroSubtitle:
            "From emergency calls to scheduled jobs, Crewtrace shows what time was actually worked so payroll, billing, and overtime decisions are easier to trust.",
        hubDescription:
            "See when plumbers clock in, leave, and return so overtime, billing, and payroll time tracking hold up.",
        hubStat: "Avg. $1,100/mo saved",
        painPoints: [
            {
                title: "Emergency call padding",
                description: "Overtime claims on after-hours calls you cannot verify.",
            },
            {
                title: "Supply run abuse",
                description:
                    "Two-hour trips to the supply house that should take 30 minutes.",
            },
            {
                title: "Job time inflation",
                description: "Simple fixes billed as complex repairs.",
            },
        ],
        benefits: [
            {
                title: "Emergency Time Logging",
                description: "Accurate overtime tracking for after-hours calls.",
                icon: "clock",
            },
            {
                title: "Supply Stop Tracking",
                description: "Log time at supply houses separately from job sites.",
                icon: "map-pin",
            },
            {
                title: "Job Cost Reports",
                description: "Compare estimated versus actual time per job type.",
                icon: "bar-chart-3",
            },
            {
                title: "Customer Billing",
                description: "Generate accurate invoices based on real time.",
                icon: "shield-check",
            },
        ],
        stats: [
            { value: "$1,100", label: "Average monthly savings" },
            { value: "15%", label: "Reduction in overtime costs" },
            { value: "95%", label: "Billing accuracy improvement" },
        ],
        relatedSolutions: [
            "gps-time-tracking",
            "payroll-exports",
            "payroll-leakage-prevention",
        ],
    },
    {
        slug: "construction",
        name: "Construction",
        icon: "hard-hat",
        primaryKeyword: "construction time tracking",
        primaryIntent: "construction-crew-time-and-payroll-control",
        metaTitle: "Construction Time Tracking Software | Crewtrace",
        metaDescription:
            "Construction time tracking software with GPS time clocks, mobile timesheets, and payroll-ready exports for active job sites.",
        heroTitle: "Construction time tracking software for field crews",
        heroSubtitle:
            "Give supervisors and payroll one version of the truth across every active site. Crewtrace turns daily clock events into records you can approve with confidence.",
        hubDescription:
            "Track field time across active construction sites with verified clock events, cleaner payroll workflows, and construction-ready reporting.",
        hubStat: "Avg. $2,100/mo saved",
        painPoints: [
            {
                title: "Unverified start times",
                description:
                    "Foremen cannot confirm exactly when workers were on site and productive.",
            },
            {
                title: "Multi-site blind spots",
                description:
                    "Project leads lose visibility when crews move between active jobs.",
            },
            {
                title: "Payroll close fire drills",
                description:
                    "Admins spend end-of-week hours reconciling conflicting timesheets.",
            },
        ],
        benefits: [
            {
                title: "Site-level verification",
                description: "Clock events are tied to active job locations.",
                icon: "map-pin",
            },
            {
                title: "Cross-site visibility",
                description: "See where each crew worked throughout the day.",
                icon: "trending-up",
            },
            {
                title: "Audit-ready history",
                description: "Preserve a defensible record of edits and approvals.",
                icon: "shield-check",
            },
            {
                title: "Payroll-ready exports",
                description: "Send approved labor data to payroll without manual cleanup.",
                icon: "clock",
            },
        ],
        stats: [
            { value: "$2,100", label: "Average monthly savings" },
            { value: "5 hrs", label: "Saved on payroll review weekly" },
            { value: "99%", label: "Clock event verification rate" },
        ],
        relatedSolutions: [
            "gps-time-tracking",
            "payroll-leakage-prevention",
            "dol-compliance",
            "overtime-alerts",
        ],
    },
    {
        slug: "general-contractors",
        name: "General Contractors",
        icon: "hard-hat",
        primaryKeyword: "contractor time tracking app",
        primaryIntent: "general-contractor-multi-crew-time-visibility",
        metaTitle: "Contractor Time Tracking App for General Contractors | Crewtrace",
        metaDescription:
            "A contractor time tracking app for general contractors managing employees, subcontractors, multiple sites, and payroll in one workflow.",
        heroTitle: "A contractor time tracking app for general contractors",
        heroSubtitle:
            "Keep employees, subcontractors, and site leads working from the same record. Crewtrace helps you close payroll faster without chasing down timesheets.",
        hubDescription:
            "Manage multiple crews across different sites with one source of verified labor time and subcontractor visibility.",
        hubStat: "Avg. $2,500/mo saved",
        painPoints: [
            {
                title: "Subcontractor disputes",
                description: "He-said-she-said arguments about hours worked.",
            },
            {
                title: "Multi-site chaos",
                description: "No visibility into which crews are where.",
            },
            {
                title: "Payroll nightmares",
                description: "Sunday nights spent deciphering timesheets.",
            },
        ],
        benefits: [
            {
                title: "Multi-Project Dashboard",
                description: "See all job sites and crews in one view.",
                icon: "layers",
            },
            {
                title: "Subcontractor Tracking",
                description: "Log subcontractor hours for accurate billing.",
                icon: "check-circle-2",
            },
            {
                title: "Project Cost Reports",
                description: "Track labor costs by project in real time.",
                icon: "bar-chart-3",
            },
            {
                title: "Payroll Integration",
                description: "Export directly to payroll systems.",
                icon: "clock",
            },
        ],
        stats: [
            { value: "$2,500", label: "Average monthly savings" },
            { value: "6 hrs", label: "Saved on payroll weekly" },
            { value: "100%", label: "Dispute resolution rate" },
        ],
        testimonial: {
            quote:
                "I used to spend every Sunday night doing payroll. Now it takes 20 minutes on Monday morning, and I actually trust the numbers.",
            author: "David Chen",
            company: "Chen Construction LLC",
        },
        relatedSolutions: ["payroll-leakage-prevention", "dol-compliance", "payroll-exports"],
    },
    {
        slug: "waterproofing",
        name: "Waterproofing",
        icon: "droplets",
        primaryKeyword: "waterproofing contractor time tracking",
        primaryIntent: "waterproofing-job-time-and-crew-control",
        metaTitle: "Waterproofing Contractor Time Tracking Software | Crewtrace",
        metaDescription:
            "Waterproofing contractor time tracking software with geofencing time tracking, mobile timesheets, and payroll-ready records.",
        heroTitle: "Waterproofing contractor time tracking for rotating crews",
        heroSubtitle:
            "Track prep, travel, and install work without the usual guesswork. Crewtrace gives you verified time records before small gaps turn into payroll disputes.",
        hubDescription:
            "Verified time tracking for waterproofing crews rotating across commercial and residential properties with geofenced clock-ins.",
        hubStat: "Avg. $1,500/mo saved",
        painPoints: [
            {
                title: "Unverified travel and prep time",
                description:
                    "Managers cannot separate transit, setup, and billable install work.",
            },
            {
                title: "Off-site clock activity",
                description:
                    "Clock-ins can happen before crews actually reach the assigned property.",
            },
            {
                title: "Inconsistent daily records",
                description:
                    "Paper logs create disputes about job duration and overtime approvals.",
            },
        ],
        benefits: [
            {
                title: "Geofenced clocking",
                description: "Allow clock-ins only when crews are at approved properties.",
                icon: "map-pin",
            },
            {
                title: "Shift exception alerts",
                description: "Flag irregular starts, overtime spikes, and long breaks.",
                icon: "alert-circle",
            },
            {
                title: "Crew productivity reports",
                description: "Compare labor effort by job type and team.",
                icon: "bar-chart-3",
            },
            {
                title: "Payroll export workflow",
                description: "Export approved hours directly into payroll processing.",
                icon: "clock",
            },
        ],
        stats: [
            { value: "$1,500", label: "Average monthly savings" },
            { value: "17%", label: "Reduction in overpayment risk" },
            { value: "3 hrs", label: "Saved on weekly payroll administration" },
        ],
        relatedSolutions: [
            "geofencing-time-clock",
            "payroll-leakage-prevention",
            "payroll-exports",
        ],
    },
    {
        slug: "landscaping",
        name: "Landscaping",
        icon: "trees",
        primaryKeyword: "landscaping time tracking",
        primaryIntent: "landscaping-multi-stop-time-tracking",
        metaTitle: "Landscaping Time Tracking Software | Crewtrace",
        metaDescription:
            "Landscaping time tracking software with a GPS time clock, route visibility, and payroll-ready records for crews moving property to property.",
        heroTitle: "Landscaping time tracking with a GPS time clock",
        heroSubtitle:
            "Know how long each stop took, where crews actually worked, and what hours should be paid. Crewtrace keeps routes, labor, and payroll grounded in real field activity.",
        hubDescription:
            "GPS verification for outdoor job sites built for crews that move between locations and need cleaner payroll time tracking.",
        hubStat: "Avg. $900/mo saved",
        painPoints: [
            {
                title: "Route inefficiency",
                description: "Crews taking longer routes or extra stops.",
            },
            {
                title: "Property time guessing",
                description: "No idea how long each property actually takes.",
            },
            {
                title: "Seasonal worker oversight",
                description: "Temporary workers with little supervision.",
            },
        ],
        benefits: [
            {
                title: "Auto Location Tracking",
                description: "Automatic clock in and out at each property.",
                icon: "map-pin",
            },
            {
                title: "Route Optimization Data",
                description: "See patterns to improve crew routes.",
                icon: "trending-up",
            },
            {
                title: "Property Time Logs",
                description: "Know exactly how long each property takes.",
                icon: "clock",
            },
            {
                title: "Seasonal Crew Management",
                description: "Easy onboarding for temporary workers.",
                icon: "check-circle-2",
            },
        ],
        stats: [
            { value: "$900", label: "Average monthly savings" },
            { value: "12%", label: "More properties per crew per day" },
            { value: "30 min", label: "New worker onboarding time" },
        ],
        relatedSolutions: [
            "geofencing-time-clock",
            "gps-time-tracking",
            "payroll-leakage-prevention",
        ],
    },
    {
        slug: "concrete",
        name: "Concrete",
        icon: "layers",
        primaryKeyword: "concrete contractor time tracking",
        primaryIntent: "concrete-pour-labor-time-accuracy",
        metaTitle: "Concrete Contractor Time Tracking Software | Crewtrace",
        metaDescription:
            "Concrete contractor time tracking software for pour schedules, wait-time visibility, and payroll-ready labor records.",
        heroTitle: "Concrete contractor time tracking that keeps every pour on budget",
        heroSubtitle:
            "Track prep time, wait time, and productive labor without the usual payroll guesswork. Crewtrace gives you cleaner records for every pour day.",
        hubDescription:
            "Accurate time tracking for pour schedules so labor costs, wait time, and field reality stay aligned.",
        hubStat: "Avg. $1,300/mo saved",
        painPoints: [
            {
                title: "Early arrival claims",
                description: "Crews claiming prep time that did not happen.",
            },
            {
                title: "Cure time padding",
                description:
                    "Workers sitting around on the clock while waiting for concrete to set.",
            },
            {
                title: "Equipment idle time",
                description: "Paying labor during equipment breakdowns.",
            },
        ],
        benefits: [
            {
                title: "Pour Schedule Integration",
                description: "Track time against scheduled pour windows.",
                icon: "clock",
            },
            {
                title: "Break Time Logging",
                description: "Separate active work from wait time.",
                icon: "check-circle-2",
            },
            {
                title: "Equipment Downtime Tracking",
                description: "Log delays for accurate labor cost allocation.",
                icon: "alert-circle",
            },
            {
                title: "Crew Productivity Reports",
                description: "Compare efficiency across different crews.",
                icon: "bar-chart-3",
            },
        ],
        stats: [
            { value: "$1,300", label: "Average monthly savings" },
            { value: "20%", label: "Reduction in labor cost overruns" },
            { value: "98%", label: "Timesheet accuracy" },
        ],
        relatedSolutions: [
            "geofencing-time-clock",
            "payroll-leakage-prevention",
            "dol-compliance",
        ],
    },
    {
        slug: "electrical",
        name: "Electrical",
        icon: "alert-circle",
        primaryKeyword: "electrical contractor time tracking",
        primaryIntent: "electrical-overtime-and-compliance-control",
        metaTitle: "Electrical Contractor Time Tracking Software | Crewtrace",
        metaDescription:
            "Electrical contractor time tracking software with overtime alerts, audit-ready records, and payroll-ready field data.",
        heroTitle: "Electrical contractor time tracking with overtime control",
        heroSubtitle:
            "Catch overtime problems early and keep every edit tied to a clear field record. Crewtrace helps you stay ahead of payroll surprises on fast-moving jobs.",
        hubDescription:
            "Verified time tracking and overtime exception control for electrical contractors that need stronger payroll confidence.",
        hubStat: "Avg. $1,600/mo saved",
        painPoints: [
            {
                title: "Unplanned overtime spikes",
                description:
                    "Late-day service calls and change orders create overtime overages that are hard to control.",
            },
            {
                title: "Compliance exposure on edited time",
                description:
                    "Manual timesheet adjustments make it difficult to prove payroll decisions later.",
            },
            {
                title: "Delayed payroll intervention",
                description:
                    "Teams discover labor overages after payroll processing has already started.",
            },
        ],
        benefits: [
            {
                title: "Overtime exception alerts",
                description: "Flag threshold breaches before they reach payroll approval.",
                icon: "alert-circle",
            },
            {
                title: "Audit-ready edit history",
                description: "Track each time change with approval context and timestamps.",
                icon: "shield-check",
            },
            {
                title: "Crew-level labor analytics",
                description: "Compare overtime patterns by project, crew, and supervisor.",
                icon: "bar-chart-3",
            },
            {
                title: "Field-verified clock events",
                description: "Tie time entries to real job sites for stronger payroll confidence.",
                icon: "map-pin",
            },
        ],
        stats: [
            { value: "$1,600", label: "Average monthly savings" },
            { value: "19%", label: "Reduction in overtime overpayment risk" },
            { value: "3 hrs", label: "Saved on weekly payroll exception review" },
        ],
        relatedSolutions: [
            "overtime-alerts",
            "payroll-leakage-prevention",
            "dol-compliance",
        ],
    },
];

export type IndustrySlug = IndustryRecord["slug"];

export const industrySlugs: IndustrySlug[] = industryRecords.map((industry) => industry.slug);

export const requiredPriorityIndustrySlugs = [
    "construction",
    "hvac",
    "waterproofing",
    "general-contractors",
    "landscaping",
] as const;

export const expansionIndustrySlugs = ["electrical"] as const;

export const industryBySlug: Record<string, IndustryRecord> = Object.fromEntries(
    industryRecords.map((industry) => [industry.slug, industry]),
);

export function getIndustrySummaries() {
    return industryRecords.map(
        ({ slug, name, icon, hubDescription, hubStat, primaryKeyword, primaryIntent, relatedSolutions }) => ({
            slug,
            name,
            icon,
            description: hubDescription,
            stats: hubStat,
            primaryKeyword,
            primaryIntent,
            relatedSolutions,
        }),
    );
}
