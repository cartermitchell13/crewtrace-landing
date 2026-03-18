import { NextResponse } from "next/server";
import {
    type LeadApiResponse,
    type LeadPayload,
    validateLeadPayload,
} from "@/lib/lead-contract";

const DEFAULT_SUPABASE_URL = "https://dythppwtjtcsorhpeazd.supabase.co";
const DEFAULT_LEADS_TABLE = "marketing_leads";
const MAX_SMS_MESSAGE_LENGTH = 1500;

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

function getSupabaseConfig() {
    const url = process.env.SUPABASE_URL?.trim() || DEFAULT_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    const table = process.env.SUPABASE_LEADS_TABLE?.trim() || DEFAULT_LEADS_TABLE;

    if (!serviceRoleKey) {
        return null;
    }

    return {
        url,
        serviceRoleKey,
        table,
    };
}

function getTwilioConfig() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim();
    const authToken = process.env.TWILIO_AUTH_TOKEN?.trim();
    const fromNumber = process.env.TWILIO_FROM_NUMBER?.trim();
    const toNumber = process.env.LEAD_ALERT_TO_NUMBER?.trim();

    if (!accountSid || !authToken || !fromNumber || !toNumber) {
        return null;
    }

    return {
        accountSid,
        authToken,
        fromNumber,
        toNumber,
    };
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

function truncateSmsMessage(value: string): string {
    if (value.length <= MAX_SMS_MESSAGE_LENGTH) {
        return value;
    }

    return `${value.slice(0, MAX_SMS_MESSAGE_LENGTH - 3)}...`;
}

function buildLeadSmsMessage(lead: LeadPayload) {
    const parts = [
        `New CrewTrace lead`,
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        lead.phone ? `Phone: ${lead.phone}` : null,
        lead.company ? `Company: ${lead.company}` : null,
        lead.crewSize ? `Crew: ${lead.crewSize}` : null,
        lead.currentSoftware ? `Software: ${lead.currentSoftware}` : null,
        lead.message ? `Message: ${lead.message}` : null,
    ].filter(Boolean);

    return truncateSmsMessage(parts.join("\n"));
}

async function sendLeadSmsNotification(lead: LeadPayload): Promise<boolean> {
    const twilio = getTwilioConfig();
    if (!twilio) {
        console.error("Twilio SMS notification skipped: missing Twilio configuration.");
        return false;
    }

    const body = new URLSearchParams({
        To: twilio.toNumber,
        From: twilio.fromNumber,
        Body: buildLeadSmsMessage(lead),
    });

    const credentials = Buffer.from(
        `${twilio.accountSid}:${twilio.authToken}`,
    ).toString("base64");

    const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
        },
    );

    if (!response.ok) {
        const errorBody = await response.text().catch(() => "");
        console.error("Twilio SMS notification failed.", {
            status: response.status,
            statusText: response.statusText,
            body: errorBody,
        });
    }

    return response.ok;
}

async function persistLead(
    lead: LeadPayload,
    request: Request,
): Promise<boolean> {
    const supabase = getSupabaseConfig();
    if (!supabase) {
        return false;
    }

    const response = await fetch(
        `${supabase.url}/rest/v1/${supabase.table}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: supabase.serviceRoleKey,
                Authorization: `Bearer ${supabase.serviceRoleKey}`,
                Prefer: "return=minimal",
            },
            body: JSON.stringify({
                source: "crewtrace-landing",
                source_page: "/contact",
                submitted_at: new Date().toISOString(),
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                company: lead.company,
                crew_size: lead.crewSize,
                current_software: lead.currentSoftware,
                message: lead.message,
                ip: getRequestIp(request.headers),
                user_agent: request.headers.get("user-agent") ?? undefined,
            }),
        },
    );

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
    const persisted = await persistLead(validated.data, request).catch(() => false);

    if (!persisted && !forwardingUrl) {
        return toJson(
            {
                ok: false,
                message:
                    "Lead storage is not configured correctly. Add SUPABASE_SERVICE_ROLE_KEY or a lead webhook and retry.",
                errorCode: "internal_error",
            },
            500,
        );
    }

    if (persisted) {
        await sendLeadSmsNotification(validated.data).catch((error) => {
            console.error("Twilio SMS notification threw an error.", error);
            return false;
        });
    }

    if (forwardingUrl) {
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
    }

    return toJson({
        ok: true,
        message: "Thanks. Your request has been received.",
    });
}
