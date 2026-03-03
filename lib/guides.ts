export interface Guide {
    slug: string;
    title: string;
    summary: string;
    readTime: string;
    category: string;
    sections: Array<{
        heading: string;
        points: string[];
    }>;
}

export const guides: Guide[] = [
    {
        slug: "construction-time-tracking-implementation",
        title: "Construction Time Tracking Implementation Checklist",
        summary:
            "A practical rollout checklist to move from paper timesheets to GPS-verified tracking without disrupting crews.",
        readTime: "8 min read",
        category: "Implementation",
        sections: [
            {
                heading: "Plan your rollout scope",
                points: [
                    "List active projects and assign a geofence owner for each site.",
                    "Choose a pilot crew before company-wide deployment.",
                    "Set the success metrics: payroll prep time, disputed hours, and overtime variance.",
                ],
            },
            {
                heading: "Prepare field adoption",
                points: [
                    "Document one clear clock-in policy for all crews.",
                    "Train foremen first, then workers with a 10-minute walkthrough.",
                    "Define an exception process for missed or offline punches.",
                ],
            },
            {
                heading: "Stabilize payroll operations",
                points: [
                    "Run two payroll cycles in parallel to validate accuracy.",
                    "Review weekly exceptions with supervisors and adjust geofences.",
                    "Lock an approval cadence before export to payroll.",
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
];

export const guideSlugs = guides.map((guide) => guide.slug);

export const guideBySlug = Object.fromEntries(
    guides.map((guide) => [guide.slug, guide])
) as Record<string, Guide>;
