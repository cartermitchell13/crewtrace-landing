export const publicIcpPhrase = "for U.S. businesses running multiple crews";

export const corePromiseSequence = [
    "reduce payroll overpayment",
    "strengthen compliance confidence",
    "cut weekly payroll admin time",
] as const;

export const orderedPromiseLine =
    "Reduce payroll overpayment, strengthen compliance confidence, and cut weekly payroll admin time.";

export const founderDirectHeadlineStyle =
    "Lead with a direct operational outcome in plain language.";

export const proofLedBodyStyle =
    "Follow with operational proof, implementation specificity, and practical risk framing.";

export const disallowedPublicQualifierPhrases = [
    "11-50 employees",
    "$500k-$5M",
] as const;

export const intentHeadlineOptions = {
    home: [
        "Construction time tracking, GPS verified.",
        "GPS time tracking software built for construction crews.",
        "Stop paying for honor-system hours.",
        "Your crews moving. Verified and budgeted.",
        "Clock in. Get verified. Get paid.",
        "Stop payroll errors before they compound.",
        "Field evidence. Payroll confidence.",
        "Protect every labor dollar.",
    ],
    features_hub: [
        "Choose the workflow that protects labor margin first.",
        "Feature paths built for payroll confidence and field accountability.",
    ],
    industries_hub: [
        "Find your trade playbook for cleaner payroll decisions.",
        "Industry pages built for field teams and payroll leads.",
    ],
    feature_detail: [
        "Use this workflow to remove one recurring payroll blind spot.",
        "Field evidence and payroll controls in one repeatable motion.",
    ],
    industry_detail: [
        "How your trade reduces overpayment and payroll rework.",
        "A practical rollout path for crews in this industry.",
    ],
    compare_hub: [
        "Compare options with payroll confidence as the first filter.",
        "Use factual side-by-side pages to pick a safer rollout path.",
    ],
    compare_detail: [
        "See where each platform fits your operating model.",
        "Use proof-linked comparisons instead of feature-checklist guesses.",
    ],
    contact: [
        "Get a 15-minute payroll leakage audit for your crew setup.",
        "Talk through your rollout plan before you commit budget.",
    ],
} as const;

export const proofLedBodyHelpers = {
    home: "Lead with measurable cost leakage, then show how verified field records reduce rework.",
    hubs: "Frame pages around decision speed, implementation fit, and proof links to detail routes.",
    detail: "Pair each claim with an operational workflow or proof path before the CTA.",
    compare: "Use neutral decision criteria with clear links to implementation and case-study evidence.",
    contact: "Reduce hesitation with explicit next-step expectations and timing.",
} as const;

export const ctaFramingVariants = {
    primary: "Book Free Audit",
    secondary: "See the rollout workflow",
    compare: "Pressure-test our fit for your workflow",
    contact: "Send my team setup details",
} as const;

export type MessagingTemplate =
    | "home"
    | "features_hub"
    | "industries_hub"
    | "feature_detail"
    | "industry_detail"
    | "compare_hub"
    | "compare_detail"
    | "contact";

export interface TemplateMessagingBundle {
    intentHeadline: string;
    proofBody: string;
    primaryCta: string;
    secondaryCta: string;
}

const templateMessaging: Record<MessagingTemplate, TemplateMessagingBundle> = {
    home: {
        intentHeadline: intentHeadlineOptions.home[0],
        proofBody: proofLedBodyHelpers.home,
        primaryCta: ctaFramingVariants.primary,
        secondaryCta: ctaFramingVariants.secondary,
    },
    features_hub: {
        intentHeadline: intentHeadlineOptions.features_hub[0],
        proofBody: proofLedBodyHelpers.hubs,
        primaryCta: ctaFramingVariants.primary,
        secondaryCta: ctaFramingVariants.secondary,
    },
    industries_hub: {
        intentHeadline: intentHeadlineOptions.industries_hub[0],
        proofBody: proofLedBodyHelpers.hubs,
        primaryCta: ctaFramingVariants.primary,
        secondaryCta: ctaFramingVariants.secondary,
    },
    feature_detail: {
        intentHeadline: intentHeadlineOptions.feature_detail[0],
        proofBody: proofLedBodyHelpers.detail,
        primaryCta: ctaFramingVariants.primary,
        secondaryCta: ctaFramingVariants.secondary,
    },
    industry_detail: {
        intentHeadline: intentHeadlineOptions.industry_detail[0],
        proofBody: proofLedBodyHelpers.detail,
        primaryCta: ctaFramingVariants.primary,
        secondaryCta: ctaFramingVariants.secondary,
    },
    compare_hub: {
        intentHeadline: intentHeadlineOptions.compare_hub[0],
        proofBody: proofLedBodyHelpers.compare,
        primaryCta: ctaFramingVariants.compare,
        secondaryCta: ctaFramingVariants.secondary,
    },
    compare_detail: {
        intentHeadline: intentHeadlineOptions.compare_detail[0],
        proofBody: proofLedBodyHelpers.compare,
        primaryCta: ctaFramingVariants.compare,
        secondaryCta: ctaFramingVariants.secondary,
    },
    contact: {
        intentHeadline: intentHeadlineOptions.contact[0],
        proofBody: proofLedBodyHelpers.contact,
        primaryCta: ctaFramingVariants.contact,
        secondaryCta: ctaFramingVariants.secondary,
    },
};

export function getTemplateMessaging(template: MessagingTemplate): TemplateMessagingBundle {
    return templateMessaging[template];
}

export function buildMultiCrewMessage(subject: string): string {
    return `${subject} ${publicIcpPhrase}.`;
}
