import { describe, expect, it } from "vitest";
import {
    captureFirstTouchAttribution,
    readFirstTouchAttribution,
} from "@/lib/first-touch-attribution";
import {
    buildBookedCallCtaClickEvent,
    buildBookedCallEmbedInteractionEvent,
    buildLeadFormEvent,
    parseSeoEventPayload,
    seoEventNames,
} from "@/lib/seo-events";

function createMemoryStorage() {
    const values = new Map<string, string>();

    return {
        getItem(key: string) {
            return values.get(key) ?? null;
        },
        setItem(key: string, value: string) {
            values.set(key, value);
        },
    };
}

describe("seo event contracts", () => {
    it("uses the required stable event taxonomy names", () => {
        expect(seoEventNames).toEqual([
            "seo_landing_view",
            "booked_call_cta_click",
            "booked_call_embed_interaction",
            "lead_form_submit_attempt",
            "lead_form_submit_success",
            "lead_form_submit_failure",
        ]);
    });

    it("merges first-touch attribution into conversion events", () => {
        const event = buildBookedCallCtaClickEvent(
            {
                templateType: "industry_detail",
                cluster: "industries",
                pageUrl: "/industries/hvac",
                attribution: {
                    utm_source: "newsletter",
                    utm_medium: "email",
                },
                firstTouch: {
                    captured_at: "2026-03-01T00:00:00.000Z",
                    utm_source: "google",
                    landing_url: "/features/gps-time-tracking",
                    referrer: "https://google.com",
                },
            },
            {
                ctaLabel: "Book a free demo",
                ctaLocation: "hero",
            },
        );

        expect(event.event).toBe("booked_call_cta_click");
        expect(event.template_type).toBe("industry_detail");
        expect(event.cluster).toBe("industries");
        expect(event.landing_url).toBe("/features/gps-time-tracking");
        expect(event.utm_source).toBe("google");
        expect(event.utm_medium).toBe("email");
        expect(event.referrer).toBe("https://google.com");
        expect(event.conversion_key).toMatch(/^seo-[0-9a-f]{8}$/);
    });

    it("keeps first-touch attribution stable after initial capture", () => {
        const storage = createMemoryStorage();

        const firstTouch = captureFirstTouchAttribution({
            search: "?utm_source=google&utm_medium=organic",
            landingUrl: "/features/gps-time-tracking",
            referrer: "https://google.com",
            storage,
            now: new Date("2026-03-01T00:00:00.000Z"),
        });

        const secondTouch = captureFirstTouchAttribution({
            search: "?utm_source=linkedin&utm_medium=paid",
            landingUrl: "/contact",
            referrer: "https://linkedin.com",
            storage,
            now: new Date("2026-03-01T01:00:00.000Z"),
        });

        expect(firstTouch).not.toBeNull();
        expect(secondTouch).toEqual(firstTouch);
        expect(readFirstTouchAttribution(storage)).toEqual(firstTouch);

        const leadFailure = buildLeadFormEvent(
            "failure",
            {
                templateType: "contact",
                cluster: "company",
                pageUrl: "/contact",
                firstTouch,
            },
            {
                errorCode: "downstream_failed",
                message: "Forwarding webhook failed",
            },
        );

        expect(leadFailure.event).toBe("lead_form_submit_failure");
        expect(leadFailure.landing_url).toBe("/features/gps-time-tracking");
        expect(leadFailure.utm_source).toBe("google");
        expect(leadFailure.error_code).toBe("downstream_failed");
        expect(leadFailure.conversion_key).toMatch(/^seo-[0-9a-f]{8}$/);
    });

    it("builds deterministic conversion keys for identical attribution input", () => {
        const context = {
            templateType: "industry_detail",
            cluster: "industries",
            pageUrl: "/industries/hvac",
            firstTouch: {
                captured_at: "2026-03-01T00:00:00.000Z",
                utm_source: "google",
                utm_medium: "organic",
                landing_url: "/features/gps-time-tracking",
            },
        };

        const first = buildBookedCallCtaClickEvent(context);
        const second = buildBookedCallEmbedInteractionEvent(context);
        expect(first.conversion_key).toBe(second.conversion_key);
    });

    it("parses legacy payloads by deriving conversion key when missing", () => {
        const parsed = parseSeoEventPayload({
            event: "booked_call_cta_click",
            occurred_at: "2026-03-01T10:01:00.000Z",
            template_type: "feature_detail",
            cluster: "features",
            landing_url: "/features/gps-time-tracking",
            utm_source: "google",
        });

        expect(parsed).not.toBeNull();
        expect(parsed?.conversion_key).toMatch(/^seo-[0-9a-f]{8}$/);
    });

    it("requires conversion keys for booked_call_embed_interaction payload parsing", () => {
        expect(
            parseSeoEventPayload({
                event: "booked_call_embed_interaction",
                occurred_at: "2026-03-01T10:01:00.000Z",
                template_type: "contact",
                cluster: "company",
                landing_url: "/contact",
            }),
        ).toBeNull();
    });
});
