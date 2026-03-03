import { NextResponse } from "next/server";
import {
    parseSeoEventPayload,
    type SeoEventPayload,
} from "@/lib/seo-events";

type EventErrorCode =
    | "invalid_json"
    | "invalid_payload"
    | "downstream_failed";

type EventApiResponse = {
    ok: boolean;
    message: string;
    errorCode?: EventErrorCode;
};

const EVENT_FORWARDING_ENV_KEYS = [
    "SEO_EVENT_WEBHOOK_URL",
    "EVENT_FORWARDING_WEBHOOK_URL",
] as const;

function toJson(response: EventApiResponse, status = 200) {
    return NextResponse.json(response, { status });
}

function getForwardingUrl(): string | null {
    for (const key of EVENT_FORWARDING_ENV_KEYS) {
        const value = process.env[key]?.trim();
        if (value) {
            return value;
        }
    }

    return null;
}

function getEventCandidate(body: unknown): unknown {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return body;
    }

    const payload = body as Record<string, unknown>;
    if ("event" in payload) {
        return payload.event;
    }

    return payload;
}

function normalizeEventTimestamp(event: SeoEventPayload): SeoEventPayload {
    const parsed = Date.parse(event.occurred_at);
    if (Number.isNaN(parsed)) {
        return {
            ...event,
            occurred_at: new Date().toISOString(),
        };
    }

    return {
        ...event,
        occurred_at: new Date(parsed).toISOString(),
    };
}

async function forwardEvent(event: SeoEventPayload, request: Request, url: string) {
    const payload = {
        event,
        received_at: new Date().toISOString(),
        source: {
            userAgent: request.headers.get("user-agent") ?? undefined,
        },
    };

    const response = await fetch(url, {
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
                message: "Invalid event JSON payload.",
                errorCode: "invalid_json",
            },
            400,
        );
    }

    const eventCandidate = getEventCandidate(body);
    const parsedEvent = parseSeoEventPayload(eventCandidate);
    if (!parsedEvent) {
        return toJson(
            {
                ok: false,
                message: "Event payload is invalid or missing required fields.",
                errorCode: "invalid_payload",
            },
            422,
        );
    }

    const normalizedEvent = normalizeEventTimestamp(parsedEvent);
    const forwardingUrl = getForwardingUrl();
    if (!forwardingUrl) {
        return toJson({
            ok: true,
            message: "Event received.",
        });
    }

    try {
        const forwarded = await forwardEvent(normalizedEvent, request, forwardingUrl);
        if (!forwarded) {
            return toJson(
                {
                    ok: false,
                    message: "Event forwarding failed.",
                    errorCode: "downstream_failed",
                },
                502,
            );
        }
    } catch {
        return toJson(
            {
                ok: false,
                message: "Event forwarding failed.",
                errorCode: "downstream_failed",
            },
            502,
        );
    }

    return toJson({
        ok: true,
        message: "Event received.",
    });
}
