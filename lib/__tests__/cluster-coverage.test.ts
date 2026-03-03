import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
    expansionIndustrySlugs,
    industryBySlug,
    industrySlugs,
    requiredPriorityIndustrySlugs,
} from "@/lib/industries";
import {
    expansionFeatureSlugs,
    featureBySlug,
    featureRecords,
    featureSlugs,
} from "@/lib/solutions";
import {
    findReciprocalLinkViolations,
    getFeatureDetailLinks,
    getIndustryDetailLinks,
} from "@/lib/cluster-link-graph";

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

    it("keeps reciprocal cross-cluster relationships for all indexable records", () => {
        const violations = findReciprocalLinkViolations();
        expect(violations).toEqual([]);
    });

    it("ensures every feature detail page has parent and sibling coverage", () => {
        const uncoveredFeatureSlugs = featureSlugs.filter((featureSlug) => {
            const detailLinks = getFeatureDetailLinks(featureSlug);
            return detailLinks.parentPath !== "/features" || detailLinks.siblingFeatureSlugs.length === 0;
        });

        expect(uncoveredFeatureSlugs).toEqual([]);
    });

    it("ensures every industry detail page has parent and sibling coverage", () => {
        const uncoveredIndustrySlugs = industrySlugs.filter((industrySlug) => {
            const detailLinks = getIndustryDetailLinks(industrySlug);
            return detailLinks.parentPath !== "/industries" || detailLinks.siblingIndustrySlugs.length === 0;
        });

        expect(uncoveredIndustrySlugs).toEqual([]);
    });

    it("keeps expansion records eligible for reciprocal and sibling coverage", () => {
        for (const featureSlug of expansionFeatureSlugs) {
            expect(featureSlugs.includes(featureSlug), `missing expansion feature ${featureSlug}`).toBe(true);
            const feature = featureBySlug[featureSlug];
            const detailLinks = getFeatureDetailLinks(featureSlug);

            expect(feature).toBeDefined();
            expect(detailLinks.relatedIndustrySlugs.length).toBeGreaterThan(0);
            expect(detailLinks.siblingFeatureSlugs.length).toBeGreaterThan(0);

            for (const industrySlug of detailLinks.relatedIndustrySlugs) {
                const industry = industryBySlug[industrySlug];
                expect(industry?.relatedSolutions.includes(featureSlug)).toBe(true);
            }
        }

        for (const industrySlug of expansionIndustrySlugs) {
            expect(industrySlugs.includes(industrySlug), `missing expansion industry ${industrySlug}`).toBe(true);
            const industry = industryBySlug[industrySlug];
            const detailLinks = getIndustryDetailLinks(industrySlug);

            expect(industry).toBeDefined();
            expect(detailLinks.relatedFeatureSlugs.length).toBeGreaterThan(0);
            expect(detailLinks.siblingIndustrySlugs.length).toBeGreaterThan(0);

            for (const featureSlug of detailLinks.relatedFeatureSlugs) {
                const feature = featureBySlug[featureSlug];
                expect(feature?.relatedIndustries.includes(industrySlug)).toBe(true);
            }
        }
    });

    it("retains crawlable template link patterns for hubs and detail pages", () => {
        const featuresHub = fs.readFileSync(path.join(projectRoot, "app/features/page.tsx"), "utf8");
        const industriesHub = fs.readFileSync(path.join(projectRoot, "app/industries/page.tsx"), "utf8");
        const featureDetail = fs.readFileSync(path.join(projectRoot, "app/features/[slug]/page.tsx"), "utf8");
        const industryDetail = fs.readFileSync(
            path.join(projectRoot, "app/industries/[slug]/page.tsx"),
            "utf8",
        );

        expect(featuresHub).toContain("href={`/features/${feature.slug}`}");
        expect(industriesHub).toContain("href={`/industries/${industry.slug}`}");
        expect(featureDetail).toContain("href={detailLinks.parentPath}");
        expect(featureDetail).toContain("href={`/features/${related.slug}`}");
        expect(industryDetail).toContain("href={`/features/${solution.slug}`}");
        expect(industryDetail).toContain("href={detailLinks.parentPath}");
        expect(industryDetail).toContain("href={`/industries/${relatedIndustry.slug}`}");
    });
});
