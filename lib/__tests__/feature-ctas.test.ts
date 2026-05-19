import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";

const FEATURE_PAGES = [
    "app/features/scheduling/page.tsx",
    "app/features/gps-time-tracking/page.tsx",
    "app/features/geofencing-time-clock/page.tsx",
    "app/features/payroll-sync-quickbooks/page.tsx",
    "app/features/job-costing/page.tsx",
    "app/features/page.tsx",
    "app/features/[slug]/page.tsx",
];

describe("Feature Pages CTA Compliance", () => {
    it("ensures all feature page templates import and use buildSelfServeSignupUrl", () => {
        for (const relativePath of FEATURE_PAGES) {
            const fullPath = path.resolve(process.cwd(), relativePath);
            expect(fs.existsSync(fullPath)).toBe(true);

            const content = fs.readFileSync(fullPath, "utf8");

            // Verify buildSelfServeSignupUrl is imported
            expect(content).toContain("buildSelfServeSignupUrl");

            // Verify buildSelfServeSignupUrl is invoked
            expect(content).toMatch(/buildSelfServeSignupUrl\s*\(\s*["']lt_20["']\s*\)/);

            // Verify no primary button links to /contact directly
            // (We allow BookedCallLink, secondary /contact buttons, or /contact inside descriptive text,
            // but the main hero or primary CTAs should not be href="/contact" or href={"/contact"})
            // Note: Since each file had a primary link like `href="/contact"` right above `BookedCallLink`,
            // we check that the files have updated those primary links to the signup url.
            // Let's check that there's no primary contact button.
            // In the original files, the CTA button was:
            // <Link href="/contact" className="... cta-highlight ...">
            // We want to ensure that `href="/contact"` does not appear next to `cta-highlight` or inside the main button action.
            const contactCtaPattern = /href=["']\/contact["'][^>]*className=[^>]*cta-highlight/;
            const ctaHighlightContactPattern = /className=[^>]*cta-highlight[^>]*href=["']\/contact["']/;
            expect(content).not.toMatch(contactCtaPattern);
            expect(content).not.toMatch(ctaHighlightContactPattern);
        }
    });
});
