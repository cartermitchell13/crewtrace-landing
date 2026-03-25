export const BOOKED_CALL_BASE_URL = "https://cal.com/Crewtrace/15min";

export const bookedCallAttributionParamKeys = [
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
    "referrer",
    "landing_url",
    "template_type",
    "cluster",
] as const;

export type BookedCallAttributionParamKey =
    (typeof bookedCallAttributionParamKeys)[number];

export type BookedCallUrlParams = Partial<
    Record<BookedCallAttributionParamKey, string | null | undefined>
>;

type BuildBookedCallUrlOptions = {
    baseUrl?: string;
    params?: BookedCallUrlParams;
    sourceQuery?: URLSearchParams | string;
};

function normalizeQueryValue(value: string | null | undefined): string | null {
    if (!value) {
        return null;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function toSearchParams(sourceQuery?: URLSearchParams | string): URLSearchParams {
    if (!sourceQuery) {
        return new URLSearchParams();
    }

    if (sourceQuery instanceof URLSearchParams) {
        return sourceQuery;
    }

    return new URLSearchParams(sourceQuery);
}

export function pickBookedCallParams(
    sourceQuery?: URLSearchParams | string,
): BookedCallUrlParams {
    const query = toSearchParams(sourceQuery);
    const params: BookedCallUrlParams = {};

    for (const key of bookedCallAttributionParamKeys) {
        const value = normalizeQueryValue(query.get(key));
        if (value) {
            params[key] = value;
        }
    }

    return params;
}

export function buildBookedCallUrl(options: BuildBookedCallUrlOptions = {}): string {
    const url = new URL(options.baseUrl ?? BOOKED_CALL_BASE_URL);
    const sourceParams = pickBookedCallParams(options.sourceQuery);
    const explicitParams = options.params ?? {};
    const mergedSearch = new URLSearchParams();

    for (const key of bookedCallAttributionParamKeys) {
        const explicitValue = normalizeQueryValue(explicitParams[key]);
        const sourceValue = normalizeQueryValue(sourceParams[key]);
        const baseValue = normalizeQueryValue(url.searchParams.get(key));
        const finalValue = explicitValue ?? sourceValue ?? baseValue;

        if (finalValue) {
            mergedSearch.set(key, finalValue);
        }
    }

    url.search = mergedSearch.toString();
    return url.toString();
}
