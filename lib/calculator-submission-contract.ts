export type CalculatorSubmissionErrorCode =
    | "invalid_json"
    | "invalid_payload"
    | "missing_email"
    | "invalid_email"
    | "internal_error";

export type CalculatorSubmissionApiResponse = {
    ok: boolean;
    message: string;
    errorCode?: CalculatorSubmissionErrorCode;
};

export type CalculatorSubmissionPayload = {
    email: string;
    crewSize: number;
    avgHourlyRate: number;
    hoursPerWeekOnPayroll: number;
    jobSites: number;
    tradeType: string;
    trackingMethod: string;
    overtimeLevel: string;
    totalYearlyLoss: number;
    totalMonthlyLoss: number;
    yearlyRecovery: number;
    riskScore: number;
    riskLevel: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    utmTerm?: string;
};

type CalculatorValidationResult =
    | { ok: true; data: CalculatorSubmissionPayload }
    | { ok: false; status: number; response: CalculatorSubmissionApiResponse };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_TRADE_TYPES = ["residential", "commercial", "industrial", "mixed"] as const;
const VALID_TRACKING_METHODS = ["paper", "spreadsheet", "basic-app", "none"] as const;
const VALID_OVERTIME_LEVELS = ["low", "moderate", "high"] as const;
const VALID_RISK_LEVELS = ["Low", "Moderate", "High"] as const;
const MAX_UTM_LENGTH = 300;

function createError(
    status: number,
    message: string,
    errorCode: CalculatorSubmissionErrorCode,
): CalculatorValidationResult {
    return {
        ok: false,
        status,
        response: { ok: false, message, errorCode },
    };
}

function toRequiredString(value: unknown): string | null {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function toOptionalUtm(value: unknown): string | undefined {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > MAX_UTM_LENGTH) return undefined;
    if (trimmed.includes("\0")) return undefined;
    return trimmed;
}

function toFiniteNumber(value: unknown): number | null {
    if (typeof value !== "number" || !Number.isFinite(value)) return null;
    return value;
}

export function validateCalculatorSubmission(value: unknown): CalculatorValidationResult {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return createError(400, "Expected a JSON object payload.", "invalid_payload");
    }

    const p = value as Record<string, unknown>;

    const email = toRequiredString(p.email);
    if (!email) return createError(422, "Email is required.", "missing_email");
    if (!EMAIL_REGEX.test(email)) return createError(422, "Email format is invalid.", "invalid_email");

    const crewSize = toFiniteNumber(p.crewSize);
    if (crewSize === null || crewSize < 1) return createError(422, "Invalid crewSize.", "invalid_payload");

    const avgHourlyRate = toFiniteNumber(p.avgHourlyRate);
    if (avgHourlyRate === null || avgHourlyRate < 0) return createError(422, "Invalid avgHourlyRate.", "invalid_payload");

    const hoursPerWeekOnPayroll = toFiniteNumber(p.hoursPerWeekOnPayroll);
    if (hoursPerWeekOnPayroll === null || hoursPerWeekOnPayroll < 0) return createError(422, "Invalid hoursPerWeekOnPayroll.", "invalid_payload");

    const jobSites = toFiniteNumber(p.jobSites);
    if (jobSites === null || jobSites < 1) return createError(422, "Invalid jobSites.", "invalid_payload");

    const tradeType = toRequiredString(p.tradeType);
    if (!tradeType || !(VALID_TRADE_TYPES as readonly string[]).includes(tradeType)) return createError(422, "Invalid tradeType.", "invalid_payload");

    const trackingMethod = toRequiredString(p.trackingMethod);
    if (!trackingMethod || !(VALID_TRACKING_METHODS as readonly string[]).includes(trackingMethod)) return createError(422, "Invalid trackingMethod.", "invalid_payload");

    const overtimeLevel = toRequiredString(p.overtimeLevel);
    if (!overtimeLevel || !(VALID_OVERTIME_LEVELS as readonly string[]).includes(overtimeLevel)) return createError(422, "Invalid overtimeLevel.", "invalid_payload");

    const totalYearlyLoss = toFiniteNumber(p.totalYearlyLoss);
    if (totalYearlyLoss === null) return createError(422, "Invalid totalYearlyLoss.", "invalid_payload");

    const totalMonthlyLoss = toFiniteNumber(p.totalMonthlyLoss);
    if (totalMonthlyLoss === null) return createError(422, "Invalid totalMonthlyLoss.", "invalid_payload");

    const yearlyRecovery = toFiniteNumber(p.yearlyRecovery);
    if (yearlyRecovery === null) return createError(422, "Invalid yearlyRecovery.", "invalid_payload");

    const riskScore = toFiniteNumber(p.riskScore);
    if (riskScore === null || riskScore < 0 || riskScore > 100) return createError(422, "Invalid riskScore.", "invalid_payload");

    const riskLevel = toRequiredString(p.riskLevel);
    if (!riskLevel || !(VALID_RISK_LEVELS as readonly string[]).includes(riskLevel)) return createError(422, "Invalid riskLevel.", "invalid_payload");

    return {
        ok: true,
        data: {
            email: email.toLowerCase(),
            crewSize,
            avgHourlyRate,
            hoursPerWeekOnPayroll,
            jobSites,
            tradeType,
            trackingMethod,
            overtimeLevel,
            totalYearlyLoss,
            totalMonthlyLoss,
            yearlyRecovery,
            riskScore,
            riskLevel,
            utmSource: toOptionalUtm(p.utmSource ?? p.utm_source),
            utmMedium: toOptionalUtm(p.utmMedium ?? p.utm_medium),
            utmCampaign: toOptionalUtm(p.utmCampaign ?? p.utm_campaign),
            utmContent: toOptionalUtm(p.utmContent ?? p.utm_content),
            utmTerm: toOptionalUtm(p.utmTerm ?? p.utm_term),
        },
    };
}

export function parseCalculatorSubmissionResponse(value: unknown): CalculatorSubmissionApiResponse | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const c = value as Record<string, unknown>;
    if (typeof c.ok !== "boolean" || typeof c.message !== "string") return null;
    if (typeof c.errorCode !== "undefined" && typeof c.errorCode !== "string") return null;
    return {
        ok: c.ok,
        message: c.message,
        errorCode: c.errorCode as CalculatorSubmissionErrorCode | undefined,
    };
}
