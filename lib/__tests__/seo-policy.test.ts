import { describe, expect, it } from "vitest";
import {
    getStaticSeoPolicy,
    getDisallowedStaticPaths,
    getRobotsDisallowPaths,
    getSitemapStaticPolicies,
    isIndexablePath,
    staticSeoPolicies,
} from "@/lib/seoPolicy";

describe("seo policy", () => {
    it("has unique static paths", () => {
        const paths = staticSeoPolicies.map((policy) => policy.path);
        const unique = new Set(paths);
        expect(unique.size).toBe(paths.length);
    });

    it("only exposes indexable static paths to sitemap policy list", () => {
        const sitemapPaths = getSitemapStaticPolicies().map((policy) => policy.path);
        const disallowed = new Set(getDisallowedStaticPaths());
        for (const path of sitemapPaths) {
            expect(disallowed.has(path)).toBe(false);
        }
    });

    it("marks expected utility/legal pages as non-indexable", () => {
        expect(isIndexablePath("/demo")).toBe(false);
        expect(isIndexablePath("/calculator")).toBe(false);
        expect(isIndexablePath("/compliance-audit")).toBe(false);
        expect(isIndexablePath("/privacy")).toBe(false);
        expect(isIndexablePath("/terms")).toBe(false);
    });

    it("keeps dynamic SEO routes indexable", () => {
        expect(isIndexablePath("/features/gps-time-tracking")).toBe(true);
        expect(isIndexablePath("/industries/hvac")).toBe(true);
        expect(isIndexablePath("/compare/connecteam")).toBe(true);
        expect(isIndexablePath("/blog/example-post")).toBe(true);
        expect(isIndexablePath("/guides/example-guide")).toBe(true);
        expect(isIndexablePath("/case-studies/example-study")).toBe(true);
    });

    it("keeps canonical owners for core static paths", () => {
        expect(getStaticSeoPolicy("/")).toBeDefined();
        expect(getStaticSeoPolicy("/contact")?.indexable).toBe(true);
        expect(getStaticSeoPolicy("/calculator")?.indexable).toBe(false);
        expect(getStaticSeoPolicy("/privacy")?.indexable).toBe(false);
    });

    it("does not mark unknown routes as indexable by default", () => {
        expect(isIndexablePath("/unknown-route")).toBe(false);
    });

    it("blocks privacy policy URLs in robots disallow list", () => {
        const disallow = getRobotsDisallowPaths();
        expect(disallow).toContain("/privacy");
        expect(disallow).toContain("/privacy-policy");
    });
});
