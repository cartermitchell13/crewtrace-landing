export type CompetitorSlug = "connecteam" | "workyard";

export type CompetitorIntentBucket =
    | "comparison"
    | "alternative"
    | "pricing"
    | "reviews"
    | "migration";

export type ClaimSafetyLevel = "verified" | "cautious-inference";

export interface CompetitorKeywordCluster {
    primaryTerms: string[];
    secondaryTerms: string[];
    intentBucket: CompetitorIntentBucket;
    canonicalOwner: "competitor-page" | "feature-page" | "industry-page";
}

export interface CompetitorIntentTarget {
    query: string;
    intentBucket: CompetitorIntentBucket;
    ownershipNotes: string;
}

export interface ComparisonSection {
    id: string;
    heading: string;
    summary: string;
    bullets: string[];
}

export interface ClaimSafetyRule {
    topic: string;
    level: ClaimSafetyLevel;
    sourceType: "product-docs" | "customer-proof" | "industry-pattern";
    guidance: string;
}

export interface CompetitorLinkTargets {
    featureSlugs: string[];
    industrySlugs: string[];
    guideSlugs: string[];
    caseStudySlugs: string[];
}

export interface CompetitorRecord {
    slug: CompetitorSlug;
    name: string;
    publishStatus: "publish";
    pageTitle: string;
    pageSummary: string;
    heroTagline: string;
    primaryKeyword: string;
    keywordClusters: CompetitorKeywordCluster[];
    intentTargets: CompetitorIntentTarget[];
    comparisonSections: ComparisonSection[];
    claimSafetyRules: ClaimSafetyRule[];
    lastReviewedOn: string;
    reviewCadenceDays: number;
    softCtaHeadline: string;
    softCtaBody: string;
    linkTargets: CompetitorLinkTargets;
}

export const requiredCompetitorSlugs = ["connecteam", "workyard"] as const;

export const competitorRecords: CompetitorRecord[] = [
    {
        slug: "connecteam",
        name: "Connecteam",
        publishStatus: "publish",
        pageTitle: "Crewtrace vs Connecteam for U.S. field crews",
        pageSummary:
            "Neutral comparison for payroll-focused teams that need location-verified time and cleaner payroll approvals.",
        heroTagline: "Compare with a payroll-confidence lens, not feature overload.",
        primaryKeyword: "crewtrace vs connecteam",
        keywordClusters: [
            {
                primaryTerms: ["crewtrace vs connecteam", "connecteam alternative"],
                secondaryTerms: ["connecteam time tracking for construction", "connecteam payroll export"],
                intentBucket: "comparison",
                canonicalOwner: "competitor-page",
            },
            {
                primaryTerms: ["connecteam pricing alternatives"],
                secondaryTerms: ["connecteam cost for contractors"],
                intentBucket: "pricing",
                canonicalOwner: "competitor-page",
            },
        ],
        intentTargets: [
            {
                query: "crewtrace vs connecteam",
                intentBucket: "comparison",
                ownershipNotes:
                    "Owned by /compare/connecteam and positioned as factual side-by-side decision support.",
            },
            {
                query: "connecteam alternative for construction crews",
                intentBucket: "alternative",
                ownershipNotes:
                    "Owned by /compare/connecteam while deep feature intent remains on /features/* pages.",
            },
            {
                query: "connecteam migration for payroll teams",
                intentBucket: "migration",
                ownershipNotes:
                    "Owned by /compare/connecteam with implementation handoff into authority guides.",
            },
        ],
        comparisonSections: [
            {
                id: "fit",
                heading: "Best-fit team profile",
                summary:
                    "Frame differences by operating model so buyers can self-select quickly and avoid forced parity claims.",
                bullets: [
                    "Crewtrace emphasizes payroll confidence and location-verified labor records for U.S. crews.",
                    "Connecteam may fit broader workforce operations where scheduling breadth is the top requirement.",
                ],
            },
            {
                id: "payroll-control",
                heading: "Payroll risk controls",
                summary:
                    "Keep this section evidence-led, referencing process control patterns and customer outcomes.",
                bullets: [
                    "Highlight exception-review workflows, verified clock events, and approval traceability.",
                    "Avoid unsupported feature parity statements; focus on verifiable process outcomes.",
                ],
            },
            {
                id: "rollout",
                heading: "Implementation path",
                summary:
                    "Give practical migration framing that points to guide and case-study proof assets.",
                bullets: [
                    "Use phased rollout language and avoid universal-time-to-value guarantees.",
                    "Link to checklist and proof assets for adoption confidence.",
                ],
            },
        ],
        claimSafetyRules: [
            {
                topic: "Product feature comparisons",
                level: "verified",
                sourceType: "product-docs",
                guidance: "Only publish claims supported by official product documentation at review time.",
            },
            {
                topic: "Savings and outcome framing",
                level: "verified",
                sourceType: "customer-proof",
                guidance:
                    "Reference only case-study outcomes already represented in local authority assets.",
            },
            {
                topic: "Adoption friction expectations",
                level: "cautious-inference",
                sourceType: "industry-pattern",
                guidance:
                    "Use conditional language (can, often, typically) when discussing migration risk.",
            },
        ],
        lastReviewedOn: "2026-03-03",
        reviewCadenceDays: 30,
        softCtaHeadline: "Need a second set of eyes on your current workflow?",
        softCtaBody:
            "Share your payroll and field process. We will map where verification gaps are likely costing you money.",
        linkTargets: {
            featureSlugs: ["gps-time-tracking", "payroll-leakage-prevention", "payroll-exports"],
            industrySlugs: ["construction", "general-contractors", "waterproofing"],
            guideSlugs: ["construction-time-tracking-implementation", "payroll-export-workflow-for-contractors"],
            caseStudySlugs: ["chen-construction-multi-site-control", "sw-waterproofing-payroll-recovery"],
        },
    },
    {
        slug: "workyard",
        name: "Workyard",
        publishStatus: "publish",
        pageTitle: "Crewtrace vs Workyard for payroll-safe field operations",
        pageSummary:
            "Factual comparison for teams evaluating GPS time tracking, overtime controls, and implementation confidence.",
        heroTagline: "Choose the model that protects labor margins and keeps payroll review predictable.",
        primaryKeyword: "crewtrace vs workyard",
        keywordClusters: [
            {
                primaryTerms: ["crewtrace vs workyard", "workyard alternative"],
                secondaryTerms: ["workyard payroll tracking", "workyard for contractors"],
                intentBucket: "comparison",
                canonicalOwner: "competitor-page",
            },
            {
                primaryTerms: ["workyard reviews for contractors"],
                secondaryTerms: ["workyard overtime tracking alternative"],
                intentBucket: "reviews",
                canonicalOwner: "competitor-page",
            },
        ],
        intentTargets: [
            {
                query: "crewtrace vs workyard",
                intentBucket: "comparison",
                ownershipNotes:
                    "Owned by /compare/workyard with neutral framing and proof-link pathways.",
            },
            {
                query: "workyard alternative for construction payroll",
                intentBucket: "alternative",
                ownershipNotes:
                    "Owned by /compare/workyard; workflow-level detail is delegated to /features/* and /guides/*.",
            },
            {
                query: "workyard implementation checklist",
                intentBucket: "migration",
                ownershipNotes:
                    "Owned by /compare/workyard plus linked authority content for rollout and adoption steps.",
            },
        ],
        comparisonSections: [
            {
                id: "visibility",
                heading: "Field visibility model",
                summary:
                    "Clarify how each approach handles multi-site movement and exception detection before payroll close.",
                bullets: [
                    "Discuss verified location evidence and supervisor review loops.",
                    "Keep language neutral; avoid unsupported superiority claims.",
                ],
            },
            {
                id: "overtime",
                heading: "Overtime and exception control",
                summary:
                    "Position around decision speed and confidence rather than absolute capability checklists.",
                bullets: [
                    "Highlight same-day intervention workflows and traceable exception review.",
                    "Link to proof content for outcomes; do not imply guaranteed percentages.",
                ],
            },
            {
                id: "proof",
                heading: "Proof and rollout confidence",
                summary:
                    "Route visitors into guide and case-study evidence that answers implementation objections.",
                bullets: [
                    "Use real case-study outcomes and practical rollout checklists.",
                    "Present consultative CTA copy instead of hard-switch language.",
                ],
            },
        ],
        claimSafetyRules: [
            {
                topic: "Comparison statements",
                level: "verified",
                sourceType: "product-docs",
                guidance: "Claims must be traced to current public documentation reviewed on cadence.",
            },
            {
                topic: "Outcome language",
                level: "verified",
                sourceType: "customer-proof",
                guidance: "Only cite outcomes present in first-party case study assets.",
            },
            {
                topic: "Migration effort framing",
                level: "cautious-inference",
                sourceType: "industry-pattern",
                guidance:
                    "Use conditional wording for implementation complexity unless documented by proof assets.",
            },
        ],
        lastReviewedOn: "2026-03-03",
        reviewCadenceDays: 30,
        softCtaHeadline: "Want help pressure-testing your migration path?",
        softCtaBody:
            "We can review your current process and outline a low-risk transition plan based on your crew setup.",
        linkTargets: {
            featureSlugs: ["gps-time-tracking", "overtime-alerts", "dol-compliance"],
            industrySlugs: ["construction", "hvac", "electrical"],
            guideSlugs: ["geofencing-best-practices-for-job-sites", "dol-audit-ready-time-records"],
            caseStudySlugs: ["ramirez-roofing-overtime-control", "chen-construction-multi-site-control"],
        },
    },
];

export const competitorSlugs: CompetitorSlug[] = competitorRecords.map(
    (competitor) => competitor.slug,
);

export const competitorBySlug: Record<CompetitorSlug, CompetitorRecord> = Object.fromEntries(
    competitorRecords.map((competitor) => [competitor.slug, competitor]),
) as Record<CompetitorSlug, CompetitorRecord>;

export function getCompetitorsByGuideSlug(guideSlug: string): CompetitorRecord[] {
    return competitorRecords.filter((competitor) =>
        competitor.linkTargets.guideSlugs.includes(guideSlug),
    );
}

export function getCompetitorsByCaseStudySlug(caseStudySlug: string): CompetitorRecord[] {
    return competitorRecords.filter((competitor) =>
        competitor.linkTargets.caseStudySlugs.includes(caseStudySlug),
    );
}
