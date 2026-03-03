import { describe, expect, it } from "vitest";
import {
    findReciprocalLinkViolations,
    rankFeatureSiblingSlugs,
    rankIndustrySiblingSlugs,
} from "@/lib/cluster-link-graph";

describe("cluster link graph helpers", () => {
    it("ranks feature siblings by overlap score then slug tie-break", () => {
        const features = [
            { slug: "source", relatedIndustries: ["roofing", "hvac", "plumbing"] },
            { slug: "beta", relatedIndustries: ["roofing", "hvac"] },
            { slug: "alpha", relatedIndustries: ["roofing", "hvac"] },
            { slug: "gamma", relatedIndustries: ["plumbing"] },
        ];

        const ranked = rankFeatureSiblingSlugs("source", { features, industries: [] });

        expect(ranked).toEqual([
            { slug: "alpha", overlapScore: 2 },
            { slug: "beta", overlapScore: 2 },
            { slug: "gamma", overlapScore: 1 },
        ]);
    });

    it("ranks industry siblings by overlap score then slug tie-break", () => {
        const industries = [
            {
                slug: "source",
                relatedSolutions: ["gps-time-tracking", "payroll-exports", "dol-compliance"],
            },
            {
                slug: "b-industry",
                relatedSolutions: ["gps-time-tracking", "payroll-exports"],
            },
            {
                slug: "a-industry",
                relatedSolutions: ["gps-time-tracking", "payroll-exports"],
            },
            {
                slug: "c-industry",
                relatedSolutions: ["dol-compliance"],
            },
        ];

        const ranked = rankIndustrySiblingSlugs("source", { industries, features: [] });

        expect(ranked).toEqual([
            { slug: "a-industry", overlapScore: 2 },
            { slug: "b-industry", overlapScore: 2 },
            { slug: "c-industry", overlapScore: 1 },
        ]);
    });

    it("detects one-way feature and industry relationships", () => {
        const features = [
            { slug: "feature-a", relatedIndustries: ["industry-a", "industry-b"] },
            { slug: "feature-b", relatedIndustries: [] },
        ];
        const industries = [
            { slug: "industry-a", relatedSolutions: ["feature-a"] },
            { slug: "industry-b", relatedSolutions: [] },
            { slug: "industry-c", relatedSolutions: ["feature-b"] },
        ];

        const violations = findReciprocalLinkViolations({ features, industries });

        expect(violations).toEqual([
            {
                featureSlug: "feature-a",
                industrySlug: "industry-b",
                source: "feature",
            },
            {
                featureSlug: "feature-b",
                industrySlug: "industry-c",
                source: "industry",
            },
        ]);
    });
});
