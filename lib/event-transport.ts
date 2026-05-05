import type { SeoEventPayload } from "@/lib/seo-events";

export const SEO_EVENT_ENDPOINT = "/api/events";

export type SeoEventSendResult = {
    accepted: boolean;
    transport: "beacon" | "fetch" | "none";
    status?: number;
};

type GtagEventParams = Record<string, string | number | boolean>;

type Gtag = {
    (command: "event", eventName: string, params?: GtagEventParams): void;
};

type WindowWithGtag = Window & {
    gtag?: Gtag;
};

function sendGoogleAnalyticsEvent(event: SeoEventPayload) {
    if (typeof window === "undefined") {
        return;
    }

    const gtag = (window as WindowWithGtag).gtag;
    if (typeof gtag !== "function") {
        return;
    }

    const { event: eventName, ...payload } = event;
    const eventParams = Object.fromEntries(
        Object.entries(payload).filter(([, value]) => value !== undefined),
    ) as GtagEventParams;

    gtag("event", eventName, eventParams);
}

export async function sendSeoEvent(
    event: SeoEventPayload,
): Promise<SeoEventSendResult> {
    sendGoogleAnalyticsEvent(event);

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
