import { describe, expect, it } from "vitest";
import {
    featureBySlug,
    featureRecords,
    featureSlugs,
} from "@/lib/solutions";
import {
    industryBySlug,
    industryRecords,
    industrySlugs,
} from "@/lib/industries";

function expectUnique(values: string[], label: string) {
    const seen = new Set<string>();
    const duplicates: string[] = [];

    for (const value of values) {
        if (seen.has(value)) {
            duplicates.push(value);
        }
        seen.add(value);
    }

    expect(duplicates, `${label} duplicates: ${duplicates.join(", ")}`).toEqual([]);
}

describe("cluster content contracts", () => {
    it("defines non-empty feature and industry collections", () => {
        expect(featureRecords.length).toBeGreaterThan(0);
        expect(industryRecords.length).toBeGreaterThan(0);
    });

    it("keeps feature records aligned to required contract fields", () => {
        for (const feature of featureRecords) {
            expect(feature.slug).toBeTruthy();
            expect(feature.name).toBeTruthy();
            expect(feature.primaryKeyword).toBeTruthy();
            expect(feature.primaryIntent).toBeTruthy();
            expect(feature.description).toBeTruthy();
            expect(feature.relatedIndustries.length).toBeGreaterThan(0);
            expect(feature.challenges.length).toBeGreaterThan(0);
            expect(feature.capabilities.length).toBeGreaterThan(0);
            expect(feature.outcomes.length).toBeGreaterThan(0);
        }
    });

    it("keeps industry records aligned to required contract fields", () => {
        for (const industry of industryRecords) {
            expect(industry.slug).toBeTruthy();
            expect(industry.name).toBeTruthy();
            expect(industry.primaryKeyword).toBeTruthy();
            expect(industry.primaryIntent).toBeTruthy();
            expect(industry.metaTitle).toBeTruthy();
            expect(industry.metaDescription).toBeTruthy();
            expect(industry.heroTitle).toBeTruthy();
            expect(industry.heroSubtitle).toBeTruthy();
            expect(industry.hubDescription).toBeTruthy();
            expect(industry.hubStat).toBeTruthy();
            expect(industry.painPoints.length).toBeGreaterThan(0);
            expect(industry.benefits.length).toBeGreaterThan(0);
            expect(industry.stats.length).toBeGreaterThan(0);
            expect(industry.relatedSolutions.length).toBeGreaterThan(0);
        }
    });

    it("enforces unique primaryIntent ownership per cluster", () => {
        expectUnique(
            featureRecords.map((feature) => feature.primaryIntent),
            "feature primaryIntent",
        );
        expectUnique(
            industryRecords.map((industry) => industry.primaryIntent),
            "industry primaryIntent",
        );
    });

    it("keeps feature slug list and map exports in sync", () => {
        const mapSlugs = Object.keys(featureBySlug).sort();
        const listSlugs = [...featureSlugs].sort();

        expect(mapSlugs).toEqual(listSlugs);
        for (const slug of featureSlugs) {
            expect(featureBySlug[slug]).toBeDefined();
        }
    });

    it("keeps industry slug list and map exports in sync", () => {
        const mapSlugs = Object.keys(industryBySlug).sort();
        const listSlugs = [...industrySlugs].sort();

        expect(mapSlugs).toEqual(listSlugs);
        for (const slug of industrySlugs) {
            expect(industryBySlug[slug]).toBeDefined();
        }
    });
});
