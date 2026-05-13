import { afterEach, describe, expect, it, vi } from "vitest";
import { buildSelfServeSignupUrl, SELF_SERVE_SIGNUP_DEFAULT_BASE } from "@/lib/pricing-plans";

describe("buildSelfServeSignupUrl", () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it("uses default base and appends plan + flow", () => {
        vi.stubEnv("NEXT_PUBLIC_SELF_SERVE_SIGNUP_URL", "");
        const url = buildSelfServeSignupUrl("lt_20");
        const parsed = new URL(url);
        expect(parsed.origin + parsed.pathname).toBe(
            new URL(SELF_SERVE_SIGNUP_DEFAULT_BASE).origin +
                new URL(SELF_SERVE_SIGNUP_DEFAULT_BASE).pathname,
        );
        expect(parsed.searchParams.get("plan")).toBe("lt_20");
        expect(parsed.searchParams.get("flow")).toBe("self-serve");
    });

    it("respects configured base URL", () => {
        vi.stubEnv(
            "NEXT_PUBLIC_SELF_SERVE_SIGNUP_URL",
            "https://example.com/onboard",
        );
        const url = buildSelfServeSignupUrl("gte_50");
        const parsed = new URL(url);
        expect(parsed.origin).toBe("https://example.com");
        expect(parsed.pathname).toBe("/onboard");
        expect(parsed.searchParams.get("plan")).toBe("gte_50");
        expect(parsed.searchParams.get("flow")).toBe("self-serve");
    });
});
