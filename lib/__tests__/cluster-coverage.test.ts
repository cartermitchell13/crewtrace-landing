import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
    industryBySlug,
    requiredPriorityIndustrySlugs,
} from "@/lib/industries";
import { featureRecords } from "@/lib/solutions";

const projectRoot = process.cwd();

describe("priority cluster coverage", () => {
    it("includes every required priority trade industry page", () => {
        for (const slug of requiredPriorityIndustrySlugs) {
            expect(industryBySlug[slug], `missing industry record for ${slug}`).toBeDefined();
        }
    });

    it("keeps required priority trades linked to feature pages", () => {
        for (const slug of requiredPriorityIndustrySlugs) {
            const industry = industryBySlug[slug];
            expect(industry.relatedSolutions.length).toBeGreaterThan(0);

            const linkedFromFeatureCluster = featureRecords.some((feature) =>
                feature.relatedIndustries.includes(slug),
            );
            expect(
                linkedFromFeatureCluster,
                `expected at least one feature to reference ${slug}`,
            ).toBe(true);
        }
    });

    it("retains crawlable template link patterns for hubs and detail pages", () => {
        const featuresHub = fs.readFileSync(path.join(projectRoot, "app/features/page.tsx"), "utf8");
        const industriesHub = fs.readFileSync(path.join(projectRoot, "app/industries/page.tsx"), "utf8");
        const industryDetail = fs.readFileSync(
            path.join(projectRoot, "app/industries/[slug]/page.tsx"),
            "utf8",
        );

        expect(featuresHub).toContain("href={`/features/${feature.slug}`}");
        expect(industriesHub).toContain("href={`/industries/${industry.slug}`}");
        expect(industryDetail).toContain("href={`/features/${solution.slug}`}");
    });
});
