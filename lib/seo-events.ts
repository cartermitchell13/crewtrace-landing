import {
    mergeWithFirstTouchAttribution,
    type FirstTouchAttribution,
} from "@/lib/first-touch-attribution";

export const seoEventNames = [
    "seo_landing_view",
    "booked_call_cta_click",
    "lead_form_submit_attempt",
    "lead_form_submit_success",
    "lead_form_submit_failure",
] as const;

export type SeoEventName = (typeof seoEventNames)[number];

export type SeoEventPayload = {
    event: SeoEventName;
    occurred_at: string;
    template_type: string;
    cluster: string;
    landing_url: string;
    page_url?: string;
    page_slug?: string;
    cta_label?: string;
    cta_location?: string;
    error_code?: string;
    message?: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    gclid?: string;
    fbclid?: string;
    msclkid?: string;
    ttclid?: string;
    li_fat_id?: string;
};

export type SeoEventContext = {
    templateType: string;
    cluster: string;
    pageUrl: string;
    pageSlug?: string;
    attribution?: Partial<FirstTouchAttribution> | null;
    firstTouch?: FirstTouchAttribution | null;
};

type SeoEventExtras = Partial<
    Pick<SeoEventPayload, "cta_label" | "cta_location" | "error_code" | "message">
>;

function hasEventName(value: string): value is SeoEventName {
    return (seoEventNames as readonly string[]).includes(value);
}

function toOptionalValue(value: string | undefined): string | undefined {
    if (!value) {
        return undefined;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
}

function buildSeoEvent(
    eventName: SeoEventName,
    context: SeoEventContext,
    extras: SeoEventExtras = {},
): SeoEventPayload {
    const mergedAttribution = mergeWithFirstTouchAttribution(
        context.attribution,
        context.firstTouch,
    );
    const landingUrl =
        toOptionalValue(mergedAttribution.landing_url) ??
        toOptionalValue(context.pageUrl) ??
        "/";

    return {
        event: eventName,
        occurred_at: new Date().toISOString(),
        template_type: context.templateType,
        cluster: context.cluster,
        landing_url: landingUrl,
        page_url: toOptionalValue(context.pageUrl),
        page_slug: toOptionalValue(context.pageSlug),
        cta_label: toOptionalValue(extras.cta_label),
        cta_location: toOptionalValue(extras.cta_location),
        error_code: toOptionalValue(extras.error_code),
        message: toOptionalValue(extras.message),
        referrer: toOptionalValue(mergedAttribution.referrer),
        utm_source: toOptionalValue(mergedAttribution.utm_source),
        utm_medium: toOptionalValue(mergedAttribution.utm_medium),
        utm_campaign: toOptionalValue(mergedAttribution.utm_campaign),
        utm_term: toOptionalValue(mergedAttribution.utm_term),
        utm_content: toOptionalValue(mergedAttribution.utm_content),
        gclid: toOptionalValue(mergedAttribution.gclid),
        fbclid: toOptionalValue(mergedAttribution.fbclid),
        msclkid: toOptionalValue(mergedAttribution.msclkid),
        ttclid: toOptionalValue(mergedAttribution.ttclid),
        li_fat_id: toOptionalValue(mergedAttribution.li_fat_id),
    };
}

export function buildSeoLandingViewEvent(
    context: SeoEventContext,
): SeoEventPayload {
    return buildSeoEvent("seo_landing_view", context);
}

export function buildBookedCallCtaClickEvent(
    context: SeoEventContext,
    options: {
        ctaLabel?: string;
        ctaLocation?: string;
    } = {},
): SeoEventPayload {
    return buildSeoEvent("booked_call_cta_click", context, {
        cta_label: options.ctaLabel,
        cta_location: options.ctaLocation,
    });
}

export function buildLeadFormEvent(
    type: "attempt" | "success" | "failure",
    context: SeoEventContext,
    options: {
        errorCode?: string;
        message?: string;
    } = {},
): SeoEventPayload {
    const eventByType: Record<typeof type, SeoEventName> = {
        attempt: "lead_form_submit_attempt",
        success: "lead_form_submit_success",
        failure: "lead_form_submit_failure",
    };

    return buildSeoEvent(eventByType[type], context, {
        error_code: options.errorCode,
        message: options.message,
    });
}

export function parseSeoEventPayload(value: unknown): SeoEventPayload | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return null;
    }

    const candidate = value as Record<string, unknown>;
    if (
        typeof candidate.event !== "string" ||
        !hasEventName(candidate.event) ||
        typeof candidate.occurred_at !== "string" ||
        typeof candidate.template_type !== "string" ||
        typeof candidate.cluster !== "string" ||
        typeof candidate.landing_url !== "string"
    ) {
        return null;
    }

    const payload: SeoEventPayload = {
        event: candidate.event,
        occurred_at: candidate.occurred_at,
        template_type: candidate.template_type,
        cluster: candidate.cluster,
        landing_url: candidate.landing_url,
    };

    type OptionalSeoEventStringKey = Exclude<
        keyof SeoEventPayload,
        "event" | "occurred_at" | "template_type" | "cluster" | "landing_url"
    >;

    const optionalStringKeys: OptionalSeoEventStringKey[] = [
        "page_url",
        "page_slug",
        "cta_label",
        "cta_location",
        "error_code",
        "message",
        "referrer",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "gclid",
        "fbclid",
        "msclkid",
        "ttclid",
        "li_fat_id",
    ];

    for (const key of optionalStringKeys) {
        const valueAtKey = candidate[key];
        if (typeof valueAtKey === "string" && valueAtKey.trim().length > 0) {
            payload[key] = valueAtKey as SeoEventPayload[typeof key];
        }
    }

    return payload;
}
