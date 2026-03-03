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

export function buildMultiCrewMessage(subject: string): string {
    return `${subject} ${publicIcpPhrase}.`;
}

