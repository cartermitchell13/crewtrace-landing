export interface CaseStudy {
    slug: string;
    title: string;
    industry: string;
    summary: string;
    challenge: string;
    approach: string[];
    outcomes: string[];
    quote: string;
    author: string;
    company: string;
}

export const caseStudies: CaseStudy[] = [
    {
        slug: "sw-waterproofing-payroll-recovery",
        title: "S&W Waterproofing recovered $1,200/month in payroll leakage",
        industry: "Waterproofing",
        summary:
            "After replacing paper timesheets with GPS verification, S&W quickly identified recurring overpayment patterns and cut review time dramatically.",
        challenge:
            "The team relied on handwritten timesheets from multiple sites, causing repeated time disputes and delayed payroll every week.",
        approach: [
            "Configured geofenced clock-in zones for every active project",
            "Introduced supervisor review alerts for early punch-ins and long breaks",
            "Standardized payroll export flow for end-of-week approvals",
        ],
        outcomes: [
            "$1,200/month in recovered payroll cost",
            "Payroll prep reduced from hours to under 30 minutes",
            "Fewer crew disputes due to location-verified records",
        ],
        quote:
            "Once we had location-backed records, the arguments stopped. We finally trusted payroll again.",
        author: "Jason Law",
        company: "S&W Waterproofing",
    },
    {
        slug: "chen-construction-multi-site-control",
        title: "Chen Construction unified labor tracking across six active job sites",
        industry: "General Contracting",
        summary:
            "Chen Construction used Crewtrace to standardize attendance verification across employees and subcontractors while reducing manual admin work.",
        challenge:
            "Project managers had no consistent way to verify who was on-site, resulting in billing disputes and unreliable labor reporting.",
        approach: [
            "Rolled out site-specific geofence rules by project",
            "Enabled centralized attendance dashboard for office + field leads",
            "Created recurring weekly labor variance review workflow",
        ],
        outcomes: [
            "6+ hours/week saved on payroll processing",
            "Improved visibility into crew movement between sites",
            "Faster resolution of subcontractor hour disputes",
        ],
        quote:
            "Before Crewtrace we were always reconciling conflicting timesheets. Now labor data is consistent every week.",
        author: "David Chen",
        company: "Chen Construction LLC",
    },
    {
        slug: "ramirez-roofing-overtime-control",
        title: "Ramirez Roofing reduced unverified overtime by 23%",
        industry: "Roofing",
        summary:
            "By enforcing location-verified clock-ins and daily exception checks, Ramirez Roofing gained tighter control over overtime spending.",
        challenge:
            "Overtime claims regularly exceeded estimates, but the office lacked proof to validate reported hours.",
        approach: [
            "Implemented GPS verification for every roof site",
            "Set automatic alerts for extended breaks and late departures",
            "Used weekly trend reporting to coach foremen on schedule adherence",
        ],
        outcomes: [
            "23% reduction in unverified overtime",
            "More predictable labor cost forecasting",
            "Cleaner end-of-week payroll approvals",
        ],
        quote:
            "We stopped guessing and started managing with real numbers.",
        author: "Mike Ramirez",
        company: "Ramirez Roofing Co.",
    },
];

export const caseStudySlugs = caseStudies.map((study) => study.slug);

export const caseStudyBySlug = Object.fromEntries(
    caseStudies.map((study) => [study.slug, study])
) as Record<string, CaseStudy>;
