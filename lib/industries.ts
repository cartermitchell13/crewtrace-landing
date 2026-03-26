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

import type { FaqItem } from "@/lib/faq";

export interface IndustryEvaluationPoint {
    title: string;
    description: string;
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
    faqItems: FaqItem[];
    evaluationPoints: IndustryEvaluationPoint[];
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
        faqItems: [
            {
                question: "How does GPS time tracking work for roofing crews who start before the office opens?",
                answer: "Roofers clock in on their phone when they arrive at the job site. The app verifies they are inside the geofence — no office or supervisor needs to be present. Early morning starts are tracked accurately without anyone filling in times from memory later.",
            },
            {
                question: "Can Crewtrace handle crews that move between roofing jobs in a single day?",
                answer: "Yes. Workers clock out of one site and clock in at the next. Each clock event is validated against the correct geofence so multi-site days produce clean, per-project labor records.",
            },
            {
                question: "What if a roofer's phone dies during the shift?",
                answer: "The supervisor can adjust the record from their own device, and the edit is logged with a reason and timestamp. The original clock-in event is preserved so there is always a complete audit trail.",
            },
            {
                question: "How do roofing contractors typically save money with Crewtrace?",
                answer: "The biggest savings come from eliminating early punch-in fraud, catching extended lunch breaks, and verifying actual site arrival times. Most roofing contractors report $1,000–$2,000 per month in recovered labor costs within the first pay period.",
            },
            {
                question: "Does weather affect GPS accuracy for roofing time tracking?",
                answer: "GPS accuracy is not materially affected by weather conditions. Rain, wind, and heat do not degrade phone GPS performance. Crewtrace does not require clear skies or ideal conditions to verify location.",
            },
        ],
        evaluationPoints: [
            {
                title: "Verify arrival times without being on-site yourself",
                description: "Roofing supervisors often manage multiple crews at different sites. GPS-verified clock-ins confirm real arrival times so you are not relying on crew self-reporting or driving between sites to check.",
            },
            {
                title: "Catch break-time inflation before it reaches payroll",
                description: "Extended lunches are one of the most common leakage points on roofing jobs. Look for a system that flags breaks exceeding your policy so you can address patterns before they compound.",
            },
            {
                title: "Get payroll-ready records without Sunday night data entry",
                description: "The right roofing time tracking tool should produce approved, export-ready hours by the end of each work week — not a pile of paper timesheets that someone has to transcribe over the weekend.",
            },
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
        faqItems: [
            {
                question: "How does time tracking work for HVAC technicians running multiple service calls?",
                answer: "Technicians clock in at each stop using the Crewtrace app. Each clock event is tied to the specific service location, so dispatchers and office staff see exactly how long each call took without relying on technician estimates.",
            },
            {
                question: "Can Crewtrace track drive time between HVAC service calls?",
                answer: "Yes. The gap between clocking out of one location and clocking in at the next is captured automatically. This gives you visibility into transit time without requiring technicians to log it manually.",
            },
            {
                question: "How do HVAC companies use Crewtrace for job costing?",
                answer: "By tracking verified time per service call, you can compare actual labor hours against quoted hours for each job type. Over time, this data helps you price more accurately and identify which types of calls are consistently running over estimate.",
            },
            {
                question: "Does Crewtrace work for both residential and commercial HVAC service?",
                answer: "Yes. Geofences can be set for individual residential addresses or larger commercial properties. The workflow is the same regardless of property type — technicians clock in when they arrive and clock out when they leave.",
            },
            {
                question: "What if an HVAC technician forgets to clock out at a job?",
                answer: "Crewtrace sends a reminder notification. If the technician still does not clock out, the supervisor can review the gap and make an adjustment. Every edit is logged with a reason so the record stays defensible.",
            },
        ],
        evaluationPoints: [
            {
                title: "Verify actual time spent at each service call",
                description: "HVAC dispatchers need to know if a quoted 90-minute job actually took 90 minutes. Location-verified clock events give you that answer without calling the technician.",
            },
            {
                title: "Track transit time separately from billable service hours",
                description: "Drive-time padding is a common blind spot. The right time tracking system should automatically separate travel from on-site work so you can bill and pay accurately.",
            },
            {
                title: "Feed clean hours to payroll without manual reconciliation",
                description: "HVAC teams running 15–30 calls per day generate a lot of time data. Look for a system that approves and exports hours in one workflow instead of requiring back-office re-entry.",
            },
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
        faqItems: [
            {
                question: "How does Crewtrace handle emergency plumbing calls and after-hours overtime?",
                answer: "Workers clock in through the app regardless of the time of day. Emergency and after-hours events are flagged automatically based on your overtime rules, so the supervisor sees them in the exception queue the next morning. No paper logs or next-day phone calls required.",
            },
            {
                question: "Can I track time spent at supply houses separately from job sites?",
                answer: "Yes. Supply runs can be set up as their own locations with geofences. When a plumber clocks in at a supply house, it is logged separately from billable job-site time, giving you clear visibility into how long material pickups actually take.",
            },
            {
                question: "How do plumbing contractors use Crewtrace for customer billing?",
                answer: "Verified time records show exactly when a plumber arrived and left each job. This eliminates billing disputes with customers and gives you defensible records when a homeowner questions the hours on an invoice.",
            },
            {
                question: "What about plumbers who work in basements or areas with poor signal?",
                answer: "The clock event records locally on the phone and syncs when signal returns. GPS coordinates are captured at the moment of the tap, so even if the sync is delayed, the location and timestamp are accurate.",
            },
            {
                question: "Does Crewtrace help with prevailing wage tracking for commercial plumbing jobs?",
                answer: "Crewtrace tracks hours by job site and worker, which gives you the per-project labor records needed for prevailing wage documentation. Combined with the audit trail, this supports compliance reporting without separate manual tracking.",
            },
        ],
        evaluationPoints: [
            {
                title: "Separate billable job time from supply runs and travel",
                description: "Plumbing contractors lose margin when supply trips and transit get lumped into job-site hours. Your time tracking should distinguish where every hour was actually spent.",
            },
            {
                title: "Handle emergency calls without creating overtime paperwork chaos",
                description: "After-hours plumbing work needs to be logged accurately and flagged for overtime review automatically — not reconstructed the next morning from memory.",
            },
            {
                title: "Produce customer-ready time records that match invoices",
                description: "When a customer disputes a bill, you need verified arrival and departure times. The right system gives you that proof without extra documentation work.",
            },
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
        faqItems: [
            {
                question: "How does Crewtrace work across multiple active construction sites?",
                answer: "Each site gets its own geofence and project assignment. Workers clock in at whichever site they are assigned to, and Crewtrace validates the location against the correct boundary. Supervisors see a unified dashboard with attendance and hours across all active projects.",
            },
            {
                question: "Can foremen approve time from the field instead of the office?",
                answer: "Yes. Supervisors can review and approve hours directly from the Crewtrace mobile app. Exception flags for early starts, overtime, or missed clock-outs appear in a prioritized queue so they can handle approvals between site walks instead of waiting until end-of-week.",
            },
            {
                question: "How does construction time tracking reduce payroll close fire drills?",
                answer: "When hours are verified and approved throughout the week, there is no end-of-week scramble to reconcile conflicting timesheets. Payroll receives a clean export of pre-approved hours instead of a stack of paper that someone has to decipher.",
            },
            {
                question: "Does Crewtrace integrate with construction project management software?",
                answer: "Crewtrace focuses on producing clean, verified time data that exports to your payroll system. For project management, the per-site labor data can be used to inform job costing decisions, but Crewtrace is purpose-built for the time-to-payroll workflow rather than trying to replace your PM tools.",
            },
            {
                question: "What size construction company benefits most from Crewtrace?",
                answer: "The biggest impact is for contractors running 10–100 field workers across two or more active sites. That is where visibility gaps, manual timesheet errors, and payroll leakage compound fastest. Solo operators or crews of fewer than five may not see enough leakage to justify the switch.",
            },
        ],
        evaluationPoints: [
            {
                title: "Get cross-site visibility without driving between projects",
                description: "Construction supervisors managing multiple sites need real-time attendance data from every location. The right tool shows who clocked in where without requiring a physical site visit.",
            },
            {
                title: "Verify start times across trades and subcontractors",
                description: "On busy construction sites, multiple trades arrive and leave at different times. GPS verification ensures that each worker's hours reflect actual on-site presence, not estimates.",
            },
            {
                title: "Produce audit-ready records that withstand labor disputes",
                description: "Construction projects attract scrutiny. Your time tracking should create a defensible paper trail with edit history, approvals, and location proof — not just a list of hours.",
            },
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
        faqItems: [
            {
                question: "How does Crewtrace help general contractors track subcontractor hours?",
                answer: "Subcontractors use the same Crewtrace app to clock in and out at the job site. Their hours are tracked separately from your direct employees, giving you verified records for billing reconciliation and dispute resolution without relying on the sub's own timesheets.",
            },
            {
                question: "Can I see all my crews across different sites in one dashboard?",
                answer: "Yes. The supervisor dashboard shows real-time attendance across every active project. You can see which workers are on-site, who has not clocked in yet, and how total hours are trending against budget — all from one screen.",
            },
            {
                question: "How does Crewtrace prevent subcontractor billing disputes?",
                answer: "When you have GPS-verified clock events for subcontractor workers, there is no argument about whether they were on-site. If a sub invoices for 40 hours but Crewtrace shows 32, you have the data to back up the conversation.",
            },
            {
                question: "What if I have both salaried and hourly workers on the same project?",
                answer: "You can configure different tracking rules for different worker types. Hourly workers get full time-and-attendance tracking. Salaried staff can use a simplified check-in flow for project presence records without overtime calculations.",
            },
            {
                question: "Does Crewtrace handle certified payroll reporting for government projects?",
                answer: "Crewtrace provides the verified per-project, per-worker hour records that feed into certified payroll reports. While it does not generate the WH-347 form directly, the data export gives your payroll team or accountant exactly what they need to complete it accurately.",
            },
        ],
        evaluationPoints: [
            {
                title: "Track employee and subcontractor hours in one system",
                description: "General contractors juggling multiple subs need a single source of truth for labor time. Separate tracking systems create reconciliation nightmares at billing time.",
            },
            {
                title: "Close payroll in minutes instead of spending Sunday night on timesheets",
                description: "If your current process involves deciphering handwritten timesheets over the weekend, your time tracking tool is not doing its job. Approved hours should be export-ready by Friday.",
            },
            {
                title: "Maintain per-project labor records for change orders and disputes",
                description: "When a project runs over budget, you need to show exactly where the labor hours went. Site-level tracking with approval history gives you that accountability.",
            },
        ],
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
        faqItems: [
            {
                question: "How does Crewtrace handle waterproofing crews that rotate between residential and commercial properties?",
                answer: "Each property gets its own geofence. When a crew arrives at a residential job in the morning and moves to a commercial site in the afternoon, both clock events are validated against the correct boundaries. You get clean, per-project time records regardless of how many stops a crew makes.",
            },
            {
                question: "Can I separate prep time and travel from actual waterproofing installation work?",
                answer: "Yes. By setting up geofences for staging areas and job sites separately, you can see how long crews spent on setup, transit, and productive install work. This helps you identify where time is being lost before it reaches payroll.",
            },
            {
                question: "What about waterproofing jobs in basements or underground areas with weak signal?",
                answer: "The app captures GPS coordinates at the moment of clock-in — typically when the crew is still at ground level. If they then move underground, the initial location record stands. For jobs that start underground, the clock event records locally and syncs when signal returns.",
            },
            {
                question: "How do waterproofing contractors typically save money with Crewtrace?",
                answer: "The biggest wins come from eliminating off-site clock-ins, catching inflated prep and travel time, and reducing end-of-week timesheet disputes. Waterproofing contractors with rotating crews across multiple properties typically see $1,000–$2,000 per month in recovered costs.",
            },
            {
                question: "Does Crewtrace help with warranty documentation for waterproofing work?",
                answer: "Verified time records showing when crews were on-site and how long the job took can support warranty documentation by establishing a clear timeline of work performed. While Crewtrace is not a warranty management tool, the records it produces are useful supporting evidence.",
            },
        ],
        evaluationPoints: [
            {
                title: "Verify crew presence at each property without driving to check",
                description: "Waterproofing managers overseeing crews across multiple properties need location-verified proof of arrival. GPS clock-ins confirm presence without requiring physical supervision at every site.",
            },
            {
                title: "Distinguish setup and travel time from productive install hours",
                description: "Waterproofing jobs involve significant prep work. Your time tracking should separate transit and staging from billable application time so margins stay visible.",
            },
            {
                title: "Eliminate paper-log disputes between field crews and the back office",
                description: "When daily records are digital, GPS-verified, and approved before payroll, there is no room for the he-said-she-said disputes that plague paper-based operations.",
            },
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
        faqItems: [
            {
                question: "How does GPS time tracking work for landscaping crews visiting multiple properties per day?",
                answer: "Each property is set up as its own geofenced location. Crews clock in when they arrive at a property and clock out when they leave. Crewtrace validates each event against the correct boundary, so you get accurate per-property time records even on days with 8–10 stops.",
            },
            {
                question: "Can Crewtrace track how long each lawn or property actually takes?",
                answer: "Yes. The time between clock-in and clock-out at each property is logged automatically. Over time, you can see average durations by property type, crew, and season — which helps with route planning and customer pricing.",
            },
            {
                question: "How do landscaping companies handle seasonal workers with Crewtrace?",
                answer: "New workers download the app, create an account, and are added to their crew — usually in under 10 minutes. When the season ends, you deactivate their accounts. Onboarding is simple enough that even temporary workers with limited phone experience can start on day one.",
            },
            {
                question: "Does Crewtrace work for landscaping crews that start from a central yard?",
                answer: "Yes. You can set up the yard or shop as a location so crews clock in when they arrive for load-up, then clock in again at the first property. This gives you visibility into yard time versus productive job-site time.",
            },
            {
                question: "What if a landscaping crew finishes a property early and moves to the next one?",
                answer: "They clock out and clock in at the next stop as usual. The time gap between properties is visible to the supervisor, so you can spot crews that are idling between jobs or taking detours.",
            },
        ],
        evaluationPoints: [
            {
                title: "Track time per property to improve route planning and pricing",
                description: "Landscaping profitability depends on knowing exactly how long each stop takes. GPS-verified per-property time data shows where routes can be tightened and which accounts are underpriced.",
            },
            {
                title: "Onboard seasonal workers quickly without complex training",
                description: "High seasonal turnover means your time tracking app needs to be simple enough for a new hire to use on day one. If adoption requires training sessions, it will not stick.",
            },
            {
                title: "Catch route inefficiencies and idle time between stops",
                description: "Landscaping crews that take detours or extend gaps between properties drain profit quietly. Your system should make transit patterns visible so you can address them early.",
            },
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
        faqItems: [
            {
                question: "How does Crewtrace handle concrete pour schedules and wait times?",
                answer: "Workers clock in when they arrive for pour prep and clock out when the day wraps. The time record shows total on-site hours. Supervisors can flag cure-time periods during review to separate productive labor from wait time in their analysis.",
            },
            {
                question: "Can I track prep time versus actual pour time for concrete crews?",
                answer: "Yes. If prep happens at a different staging location or at a different time, the clock events will reflect when the crew arrived and how long each phase took. This gives you better data for estimating future pour-day labor.",
            },
            {
                question: "How do concrete contractors use Crewtrace to reduce early arrival claims?",
                answer: "GPS-verified clock-ins prove exactly when a worker reached the site. If someone claims they arrived at 5 AM but the GPS shows 6:15 AM, the record speaks for itself. This eliminates the most common source of time inflation on pour days.",
            },
            {
                question: "Does Crewtrace account for equipment breakdown idle time?",
                answer: "Supervisors can note equipment delays during time review. While Crewtrace does not track equipment status directly, the time records combined with supervisor notes create an accurate picture of how labor hours were actually spent — including downtime.",
            },
            {
                question: "What if weather delays a concrete pour mid-day?",
                answer: "Workers stay clocked in (since they are still on-site), and the supervisor can flag the delay during review. This keeps the time record accurate while giving you documentation for labor-cost reconciliation on weather-affected days.",
            },
        ],
        evaluationPoints: [
            {
                title: "Separate productive pour labor from site wait time",
                description: "Concrete crews spend significant time waiting — for trucks, cure times, and inspections. Your time tracking should help you distinguish billable work from on-site idle time.",
            },
            {
                title: "Verify crew arrival before early-morning pours",
                description: "Pour schedules often start before dawn. GPS-verified clock-ins confirm actual arrival times so you are not paying for claimed hours that did not happen.",
            },
            {
                title: "Build accurate labor estimates for future pour-day bids",
                description: "Reliable per-pour time data lets you quote future jobs based on actual field performance instead of guesswork. This is how concrete contractors protect margins on competitive bids.",
            },
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
        faqItems: [
            {
                question: "How does Crewtrace help electrical contractors control overtime?",
                answer: "Crewtrace fires alerts when any worker approaches a configurable overtime threshold — for example, at 38 hours on a Thursday. This gives supervisors time to reassign work or authorize the overtime intentionally, instead of discovering a $2,000 surprise on payroll day.",
            },
            {
                question: "Can I track time for both service calls and project-based electrical work?",
                answer: "Yes. Geofences can be set for individual service locations or larger project sites. Whether an electrician is running a one-hour panel swap or spending three weeks on a commercial build-out, each clock event is validated against the correct location.",
            },
            {
                question: "How does edit history help electrical contractors during labor disputes?",
                answer: "Every time a record is adjusted — by the worker or a supervisor — Crewtrace logs who made the change, when, and why. If a former employee disputes their pay, you can produce a complete chain of evidence showing exactly how their hours were calculated and approved.",
            },
            {
                question: "Does Crewtrace handle prevailing wage tracking for union electrical work?",
                answer: "Crewtrace tracks verified hours by project and worker, which provides the per-job labor data needed for prevailing wage compliance. The export files can feed into your certified payroll workflow, reducing the manual documentation burden.",
            },
            {
                question: "What if electricians work in areas without cell signal, like utility rooms or switchgear vaults?",
                answer: "The GPS coordinate is captured when the clock event happens — typically before entering a signal-dead area. The event records locally on the phone and syncs when the worker is back in range. The timestamp and location from the original tap are preserved.",
            },
        ],
        evaluationPoints: [
            {
                title: "Catch overtime risk before it reaches payroll approval",
                description: "Electrical projects frequently generate unplanned overtime from change orders and late-day service calls. Your time tracking needs to alert supervisors early enough to intervene, not just report the damage after the fact.",
            },
            {
                title: "Maintain defensible edit history for every timesheet change",
                description: "Electrical contractors face higher compliance scrutiny due to prevailing wage requirements and union rules. Every time adjustment should be logged with who changed it, when, and why.",
            },
            {
                title: "Compare labor patterns across projects and crews",
                description: "Identifying which crews or project types consistently run over on labor helps you price future bids more accurately and address operational issues before they become chronic.",
            },
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
