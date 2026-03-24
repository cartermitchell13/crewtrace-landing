import { describe, expect, it } from "vitest";
import {
    competitorRecords,
    competitorSlugs,
    getCompetitorsByCaseStudySlug,
    getCompetitorsByGuideSlug,
    requiredCompetitorSlugs,
} from "@/lib/competitors";
import { getCaseStudySlugs } from "@/lib/caseStudies";
import { guideSlugs } from "@/lib/guides";
import { industrySlugs } from "@/lib/industries";
import { featureSlugs } from "@/lib/solutions";

function findDuplicates(values: string[]) {
    const seen = new Set<string>();
    const duplicates = new Set<string>();

    for (const value of values) {
        if (seen.has(value)) {
            duplicates.add(value);
        }
        seen.add(value);
    }

    return [...duplicates];
}

describe("competitor content contracts", () => {
    it("covers required launch competitors with unique slugs", () => {
        expect(competitorRecords).toHaveLength(2);
        expect(competitorSlugs.sort()).toEqual([...requiredCompetitorSlugs].sort());
        expect(findDuplicates(competitorSlugs)).toEqual([]);
    });

    it("requires non-empty keyword and claim-safety structures", () => {
        for (const competitor of competitorRecords) {
            expect(competitor.primaryKeyword).toBeTruthy();
            expect(competitor.keywordClusters.length).toBeGreaterThan(0);
            expect(competitor.intentTargets.length).toBeGreaterThan(0);
            expect(competitor.comparisonSections.length).toBeGreaterThan(0);
            expect(competitor.claimSafetyRules.length).toBeGreaterThan(0);

            for (const cluster of competitor.keywordClusters) {
                expect(cluster.primaryTerms.length).toBeGreaterThan(0);
                expect(cluster.secondaryTerms.length).toBeGreaterThan(0);
                expect(cluster.canonicalOwner).toBeTruthy();
            }

            for (const section of competitor.comparisonSections) {
                expect(section.id).toBeTruthy();
                expect(section.heading).toBeTruthy();
                expect(section.summary).toBeTruthy();
                expect(section.bullets.length).toBeGreaterThan(0);
            }

            for (const rule of competitor.claimSafetyRules) {
                expect(rule.topic).toBeTruthy();
                expect(rule.level).toBeTruthy();
                expect(rule.guidance).toBeTruthy();
            }
        }
    });

    it("requires freshness metadata for each competitor page", () => {
        for (const competitor of competitorRecords) {
            expect(competitor.lastReviewedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
            expect(Number.isInteger(competitor.reviewCadenceDays)).toBe(true);
            expect(competitor.reviewCadenceDays).toBeGreaterThan(0);
            expect(competitor.reviewCadenceDays).toBeLessThanOrEqual(90);
        }
    });

    it("ensures linked slugs resolve into cluster and authority datasets", () => {
        const featureSet = new Set(featureSlugs);
        const industrySet = new Set(industrySlugs);
        const guideSet = new Set(guideSlugs);
        const caseStudySet = new Set(getCaseStudySlugs());

        for (const competitor of competitorRecords) {
            expect(competitor.linkTargets.featureSlugs.length).toBeGreaterThan(0);
            expect(competitor.linkTargets.industrySlugs.length).toBeGreaterThan(0);
            expect(competitor.linkTargets.guideSlugs.length).toBeGreaterThan(0);
            expect(competitor.linkTargets.caseStudySlugs.length).toBeGreaterThan(0);

            for (const slug of competitor.linkTargets.featureSlugs) {
                expect(
                    featureSet.has(slug),
                    `${competitor.slug} references missing feature slug "${slug}"`,
                ).toBe(true);
            }

            for (const slug of competitor.linkTargets.industrySlugs) {
                expect(
                    industrySet.has(slug),
                    `${competitor.slug} references missing industry slug "${slug}"`,
                ).toBe(true);
            }

            for (const slug of competitor.linkTargets.guideSlugs) {
                expect(
                    guideSet.has(slug),
                    `${competitor.slug} references missing guide slug "${slug}"`,
                ).toBe(true);
            }

            for (const slug of competitor.linkTargets.caseStudySlugs) {
                expect(
                    caseStudySet.has(slug),
                    `${competitor.slug} references missing case-study slug "${slug}"`,
                ).toBe(true);
            }
        }
    });

    it("enforces proof-link graph expectations for competitor pages", () => {
        for (const competitor of competitorRecords) {
            const proofLinkCount =
                competitor.linkTargets.guideSlugs.length +
                competitor.linkTargets.caseStudySlugs.length;
            expect(
                proofLinkCount,
                `${competitor.slug} must have at least one proof asset link`,
            ).toBeGreaterThan(0);

            for (const slug of competitor.linkTargets.guideSlugs) {
                const reverseLinks = getCompetitorsByGuideSlug(slug);
                expect(
                    reverseLinks.some((record) => record.slug === competitor.slug),
                    `${competitor.slug} guide reverse-link missing for "${slug}"`,
                ).toBe(true);
            }

            for (const slug of competitor.linkTargets.caseStudySlugs) {
                const reverseLinks = getCompetitorsByCaseStudySlug(slug);
                expect(
                    reverseLinks.some((record) => record.slug === competitor.slug),
                    `${competitor.slug} case-study reverse-link missing for "${slug}"`,
                ).toBe(true);
            }
        }
    });
});
