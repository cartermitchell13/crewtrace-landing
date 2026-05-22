/**
 * Pricing tiers: fixed prices and signup deep-link contract (`plan`, `flow`).
 * Update prices here only—avoid duplicating across components.
 */
export const SELF_SERVE_SIGNUP_DEFAULT_BASE = "https://crewtrace.app/signup";

export type SelfServeTierId = "lt_20" | "lt_50" | "gte_50";

export type SelfServePricingTier = {
    id: SelfServeTierId;
    /** Visible plan name */
    name: string;
    employeeRangeLabel: string;
    priceMonthlyUsd: number;
    /** Team-size line under the shared feature list (check = in bracket, × = outside this tier). */
    bracketCallout: {
        variant: "included" | "excluded";
        label: string;
    };
};

/**
 * Terse checklist of product areas included—factual labels, not sales copy.
 * Every team-size bracket gets the same inclusions (pricing differs by team size).
 */
export const selfServePlatformFeatures: readonly string[] = [
    "GPS time tracking & geofenced job sites",
    "Anomaly alerts for flagged punches",
    "Scheduling tool",
    "One-click payroll sync to QuickBooks",
    "Payroll reports & CSV exports",
    "Crew mobile apps (iOS & Android); offline punch sync when online again",
];

export const selfServePricingTiers: readonly SelfServePricingTier[] = [
    {
        id: "lt_20",
        name: "Starter",
        employeeRangeLabel: "Fewer than 20 employees",
        priceMonthlyUsd: 99,
        bracketCallout: {
            variant: "excluded",
            label: "Support for more than 20 employees",
        },
    },
    {
        id: "lt_50",
        name: "Growth",
        employeeRangeLabel: "20–49 employees",
        priceMonthlyUsd: 150,
        bracketCallout: {
            variant: "excluded",
            label: "Support for more than 49 employees",
        },
    },
    {
        id: "gte_50",
        name: "Scale",
        employeeRangeLabel: "50 or more employees",
        priceMonthlyUsd: 250,
        bracketCallout: {
            variant: "included",
            label: "Support for more than 50 employees",
        },
    },
] as const;

/**
 * Signup deep link with `plan` + `flow=self-serve` (flow value is an app contract).
 * Optional override: `NEXT_PUBLIC_SELF_SERVE_SIGNUP_URL`
 * (absolute URL, with or without existing query string).
 */
export function buildSelfServeSignupUrl(tierId: SelfServeTierId): string {
    const configured = process.env.NEXT_PUBLIC_SELF_SERVE_SIGNUP_URL?.trim();
    const base =
        configured && configured.length > 0
            ? configured
            : SELF_SERVE_SIGNUP_DEFAULT_BASE;

    try {
        const url = new URL(base);
        url.searchParams.set("plan", tierId);
        url.searchParams.set("flow", "self-serve");
        return url.toString();
    } catch {
        const params = new URLSearchParams({ plan: tierId, flow: "self-serve" });
        return `${SELF_SERVE_SIGNUP_DEFAULT_BASE}?${params.toString()}`;
    }
}
