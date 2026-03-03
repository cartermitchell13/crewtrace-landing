import type { SeoEventPayload } from "@/lib/seo-events";

export const SEO_EVENT_ENDPOINT = "/api/events";

export type SeoEventSendResult = {
    accepted: boolean;
    transport: "beacon" | "fetch" | "none";
    status?: number;
};

export async function sendSeoEvent(
    event: SeoEventPayload,
): Promise<SeoEventSendResult> {
    const payload = JSON.stringify({ event });

    if (
        typeof navigator !== "undefined" &&
        typeof navigator.sendBeacon === "function"
    ) {
        const blob = new Blob([payload], { type: "application/json" });
        const queued = navigator.sendBeacon(SEO_EVENT_ENDPOINT, blob);

        if (queued) {
            return {
                accepted: true,
                transport: "beacon",
            };
        }
    }

    if (typeof fetch !== "function") {
        return {
            accepted: false,
            transport: "none",
        };
    }

    try {
        const response = await fetch(SEO_EVENT_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: payload,
            keepalive: true,
            cache: "no-store",
        });

        return {
            accepted: response.ok,
            transport: "fetch",
            status: response.status,
        };
    } catch {
        return {
            accepted: false,
            transport: "fetch",
        };
    }
}
