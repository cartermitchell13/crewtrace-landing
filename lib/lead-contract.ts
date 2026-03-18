export type LeadErrorCode =
    | "invalid_json"
    | "invalid_payload"
    | "missing_name"
    | "missing_email"
    | "invalid_email"
    | "downstream_failed"
    | "internal_error";

export type LeadApiResponse = {
    ok: boolean;
    message: string;
    errorCode?: LeadErrorCode;
};

export type LeadPayload = {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    crewSize?: string;
    currentSoftware?: string;
    message?: string;
};

type LeadValidationResult =
    | { ok: true; data: LeadPayload }
    | { ok: false; status: number; response: LeadApiResponse };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 1000;
const MAX_MESSAGE_LENGTH = 5000;

function createLeadError(
    status: number,
    message: string,
    errorCode: LeadErrorCode,
): LeadValidationResult {
    return {
        ok: false,
        status,
        response: {
            ok: false,
            message,
            errorCode,
        },
    };
}

function toRequiredString(value: unknown): string | null {
    if (typeof value !== "string") {
        return null;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function toOptionalString(value: unknown, maxLength = MAX_FIELD_LENGTH): string | undefined {
    if (typeof value !== "string") {
        return undefined;
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return undefined;
    }

    return trimmed.slice(0, maxLength);
}

export function validateLeadPayload(value: unknown): LeadValidationResult {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return createLeadError(
            400,
            "Expected a JSON object payload.",
            "invalid_payload",
        );
    }

    const payload = value as Record<string, unknown>;
    const name = toRequiredString(payload.name);
    if (!name) {
        return createLeadError(422, "Name is required.", "missing_name");
    }

    const email = toRequiredString(payload.email);
    if (!email) {
        return createLeadError(422, "Email is required.", "missing_email");
    }

    if (!EMAIL_REGEX.test(email)) {
        return createLeadError(422, "Email format is invalid.", "invalid_email");
    }

    return {
        ok: true,
        data: {
            name: name.slice(0, MAX_FIELD_LENGTH),
            email: email.toLowerCase(),
            phone: toOptionalString(payload.phone),
            company: toOptionalString(payload.company),
            crewSize: toOptionalString(payload.crewSize),
            currentSoftware: toOptionalString(payload.currentSoftware),
            message: toOptionalString(payload.message, MAX_MESSAGE_LENGTH),
        },
    };
}

export function parseLeadApiResponse(value: unknown): LeadApiResponse | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return null;
    }

    const candidate = value as Record<string, unknown>;
    if (typeof candidate.ok !== "boolean" || typeof candidate.message !== "string") {
        return null;
    }

    if (
        typeof candidate.errorCode !== "undefined" &&
        typeof candidate.errorCode !== "string"
    ) {
        return null;
    }

    return {
        ok: candidate.ok,
        message: candidate.message,
        errorCode: candidate.errorCode as LeadErrorCode | undefined,
    };
}
