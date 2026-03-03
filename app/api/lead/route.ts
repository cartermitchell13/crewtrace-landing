import { NextResponse } from "next/server";
import {
    type LeadApiResponse,
    type LeadPayload,
    validateLeadPayload,
} from "@/lib/lead-contract";

const LEAD_FORWARDING_ENV_KEYS = [
    "LEAD_WEBHOOK_URL",
    "LEAD_FORWARDING_WEBHOOK_URL",
] as const;

function toJson(response: LeadApiResponse, status = 200) {
    return NextResponse.json(response, { status });
}

function getLeadForwardingUrl(): string | null {
    for (const key of LEAD_FORWARDING_ENV_KEYS) {
        const value = process.env[key]?.trim();
        if (value) {
            return value;
        }
    }

    return null;
}

function getRequestIp(headers: Headers): string | undefined {
    const forwardedFor = headers.get("x-forwarded-for");
    if (forwardedFor) {
        const [firstIp] = forwardedFor.split(",");
        const trimmed = firstIp?.trim();
        if (trimmed) {
            return trimmed;
        }
    }

    const realIp = headers.get("x-real-ip")?.trim();
    return realIp || undefined;
}

async function forwardLead(
    webhookUrl: string,
    lead: LeadPayload,
    requestHeaders: Headers,
) {
    const payload = {
        ...lead,
        submittedAt: new Date().toISOString(),
        source: {
            ip: getRequestIp(requestHeaders),
            userAgent: requestHeaders.get("user-agent") ?? undefined,
        },
    };

    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    return response.ok;
}

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return toJson(
            {
                ok: false,
                message: "Invalid request body. Please retry.",
                errorCode: "invalid_json",
            },
            400,
        );
    }

    const validated = validateLeadPayload(body);
    if (!validated.ok) {
        return toJson(validated.response, validated.status);
    }

    const forwardingUrl = getLeadForwardingUrl();
    if (!forwardingUrl) {
        return toJson({
            ok: true,
            message: "Thanks. Your request has been received.",
        });
    }

    try {
        const forwarded = await forwardLead(
            forwardingUrl,
            validated.data,
            request.headers,
        );

        if (!forwarded) {
            return toJson(
                {
                    ok: false,
                    message:
                        "Your request could not be delivered right now. Please retry.",
                    errorCode: "downstream_failed",
                },
                502,
            );
        }
    } catch {
        return toJson(
            {
                ok: false,
                message:
                    "Your request could not be delivered right now. Please retry.",
                errorCode: "downstream_failed",
            },
            502,
        );
    }

    return toJson({
        ok: true,
        message: "Thanks. Your request has been received.",
    });
}
