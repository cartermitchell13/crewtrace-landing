export const FIRST_TOUCH_STORAGE_KEY = "Crewtrace:first-touch:v1";

export const firstTouchParamKeys = [
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
] as const;

export type FirstTouchParamKey = (typeof firstTouchParamKeys)[number];

export type FirstTouchAttribution = Partial<
    Record<FirstTouchParamKey | "referrer" | "landing_url", string>
> & {
    captured_at: string;
};

type StorageLike = Pick<Storage, "getItem" | "setItem">;

function normalizeValue(value: string | null | undefined): string | undefined {
    if (!value) {
        return undefined;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
}

function normalizePathForKey(value: string | null | undefined): string {
    const trimmed = normalizeValue(value);
    if (!trimmed) {
        return "/unknown";
    }

    let pathname = trimmed;
    try {
        pathname = new URL(trimmed).pathname;
    } catch {
        pathname = trimmed.split("?")[0].split("#")[0];
    }

    if (!pathname.startsWith("/")) {
        pathname = `/${pathname}`;
    }

    if (pathname.length > 1 && pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1);
    }

    return pathname.toLowerCase();
}

function stableHash(input: string): string {
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
        hash ^= input.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0).toString(16).padStart(8, "0");
}

function getBrowserStorage(): StorageLike | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        return window.localStorage;
    } catch {
        return null;
    }
}

export function readFirstTouchAttribution(
    storage: StorageLike | null = getBrowserStorage(),
): FirstTouchAttribution | null {
    if (!storage) {
        return null;
    }

    try {
        const raw = storage.getItem(FIRST_TOUCH_STORAGE_KEY);
        if (!raw) {
            return null;
        }

        const parsed = JSON.parse(raw) as Record<string, unknown>;
        if (typeof parsed.captured_at !== "string") {
            return null;
        }

        const normalized: FirstTouchAttribution = {
            captured_at: parsed.captured_at,
        };

        for (const key of firstTouchParamKeys) {
            const value = normalizeValue(parsed[key] as string | undefined);
            if (value) {
                normalized[key] = value;
            }
        }

        const referrer = normalizeValue(parsed.referrer as string | undefined);
        if (referrer) {
            normalized.referrer = referrer;
        }

        const landingUrl = normalizeValue(parsed.landing_url as string | undefined);
        if (landingUrl) {
            normalized.landing_url = landingUrl;
        }

        return normalized;
    } catch {
        return null;
    }
}

export function captureFirstTouchAttribution(options: {
    search?: string;
    landingUrl?: string;
    referrer?: string;
    storage?: StorageLike | null;
    now?: Date;
} = {}): FirstTouchAttribution | null {
    const storage = options.storage ?? getBrowserStorage();
    if (!storage) {
        return null;
    }

    const existing = readFirstTouchAttribution(storage);
    if (existing) {
        return existing;
    }

    const search =
        options.search ??
        (typeof window !== "undefined" ? window.location.search : "");
    const searchParams = new URLSearchParams(search);
    const landingUrl =
        options.landingUrl ??
        (typeof window !== "undefined"
            ? `${window.location.pathname}${window.location.search}`
            : undefined);
    const referrer =
        options.referrer ??
        (typeof document !== "undefined" ? document.referrer : undefined);

    const captured: FirstTouchAttribution = {
        captured_at: (options.now ?? new Date()).toISOString(),
    };

    for (const key of firstTouchParamKeys) {
        const value = normalizeValue(searchParams.get(key));
        if (value) {
            captured[key] = value;
        }
    }

    const normalizedReferrer = normalizeValue(referrer);
    if (normalizedReferrer) {
        captured.referrer = normalizedReferrer;
    }

    const normalizedLandingUrl = normalizeValue(landingUrl);
    if (normalizedLandingUrl) {
        captured.landing_url = normalizedLandingUrl;
    }

    try {
        storage.setItem(FIRST_TOUCH_STORAGE_KEY, JSON.stringify(captured));
        return captured;
    } catch {
        return captured;
    }
}

export function mergeWithFirstTouchAttribution(
    attribution: Partial<FirstTouchAttribution> | null | undefined,
    firstTouch: FirstTouchAttribution | null | undefined,
): Partial<FirstTouchAttribution> {
    const merged: Partial<FirstTouchAttribution> = {};

    if (firstTouch) {
        for (const [key, value] of Object.entries(firstTouch)) {
            if (!value) {
                continue;
            }

            merged[key as keyof FirstTouchAttribution] = value;
        }
    }

    if (attribution) {
        for (const [key, value] of Object.entries(attribution)) {
            if (!value) {
                continue;
            }

            if (!merged[key as keyof FirstTouchAttribution]) {
                merged[key as keyof FirstTouchAttribution] = value as string;
            }
        }
    }

    return merged;
}

export function buildDeterministicConversionKey(options: {
    cluster: string;
    templateType: string;
    landingUrl: string;
    attribution?: Partial<FirstTouchAttribution> | null;
    firstTouch?: FirstTouchAttribution | null;
}): string {
    const merged = mergeWithFirstTouchAttribution(
        options.attribution,
        options.firstTouch,
    );
    const keyParts = [
        normalizeValue(options.cluster)?.toLowerCase() ?? "unknown",
        normalizeValue(options.templateType)?.toLowerCase() ?? "unknown",
        normalizePathForKey(options.landingUrl),
        normalizePathForKey(merged.landing_url),
        normalizeValue(merged.utm_source)?.toLowerCase() ?? "na",
        normalizeValue(merged.utm_medium)?.toLowerCase() ?? "na",
        normalizeValue(merged.utm_campaign)?.toLowerCase() ?? "na",
        normalizeValue(merged.utm_term)?.toLowerCase() ?? "na",
        normalizeValue(merged.utm_content)?.toLowerCase() ?? "na",
        normalizeValue(merged.gclid)?.toLowerCase() ?? "na",
        normalizeValue(merged.fbclid)?.toLowerCase() ?? "na",
        normalizeValue(merged.msclkid)?.toLowerCase() ?? "na",
        normalizeValue(merged.ttclid)?.toLowerCase() ?? "na",
        normalizeValue(merged.li_fat_id)?.toLowerCase() ?? "na",
    ];

    return `seo-${stableHash(keyParts.join("|"))}`;
}
