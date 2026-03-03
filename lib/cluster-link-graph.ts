import {
    featureBySlug,
    featureRecords,
    type FeatureRecord,
    type FeatureSlug,
} from "@/lib/solutions";
import {
    industryBySlug,
    industryRecords,
    type IndustryRecord,
    type IndustrySlug,
} from "@/lib/industries";

type FeatureGraphRecord = Pick<FeatureRecord, "slug" | "relatedIndustries">;
type IndustryGraphRecord = Pick<IndustryRecord, "slug" | "relatedSolutions">;

export interface RankedLink {
    slug: string;
    overlapScore: number;
}

export interface ReciprocalLinkViolation {
    featureSlug: string;
    industrySlug: string;
    source: "feature" | "industry";
}

interface ClusterGraphInput {
    features?: FeatureGraphRecord[];
    industries?: IndustryGraphRecord[];
}

interface LinkLimitOptions {
    siblingLimit?: number;
    crossClusterLimit?: number;
}

function countOverlap(values: string[], comparison: string[]): number {
    const comparisonSet = new Set(comparison);
    let overlap = 0;

    for (const value of values) {
        if (comparisonSet.has(value)) {
            overlap += 1;
        }
    }

    return overlap;
}

function rankByOverlapThenSlug(left: RankedLink, right: RankedLink): number {
    if (left.overlapScore !== right.overlapScore) {
        return right.overlapScore - left.overlapScore;
    }
    return left.slug.localeCompare(right.slug);
}

function getGraphInput(input?: ClusterGraphInput): Required<ClusterGraphInput> {
    return {
        features: input?.features ?? featureRecords,
        industries: input?.industries ?? industryRecords,
    };
}

function createIndustryIndex(records: IndustryGraphRecord[]): Record<string, IndustryGraphRecord> {
    return Object.fromEntries(records.map((industry) => [industry.slug, industry]));
}

function createFeatureIndex(records: FeatureGraphRecord[]): Record<string, FeatureGraphRecord> {
    return Object.fromEntries(records.map((feature) => [feature.slug, feature]));
}

function getReciprocalFeatureIndustrySlugs(
    feature: FeatureGraphRecord,
    industryIndex: Record<string, IndustryGraphRecord>,
): string[] {
    return feature.relatedIndustries
        .filter((industrySlug) => {
            const industry = industryIndex[industrySlug];
            return Boolean(industry?.relatedSolutions.includes(feature.slug));
        })
        .sort((left, right) => left.localeCompare(right));
}

function getReciprocalIndustryFeatureSlugs(
    industry: IndustryGraphRecord,
    featureIndex: Record<string, FeatureGraphRecord>,
): string[] {
    return industry.relatedSolutions
        .filter((featureSlug) => {
            const feature = featureIndex[featureSlug];
            return Boolean(feature?.relatedIndustries.includes(industry.slug));
        })
        .sort((left, right) => left.localeCompare(right));
}

export function rankFeatureSiblingSlugs(
    featureSlug: string,
    input?: ClusterGraphInput,
): RankedLink[] {
    const { features } = getGraphInput(input);
    const sourceFeature = features.find((feature) => feature.slug === featureSlug);
    if (!sourceFeature) {
        return [];
    }

    return features
        .filter((feature) => feature.slug !== sourceFeature.slug)
        .map((feature) => ({
            slug: feature.slug,
            overlapScore: countOverlap(
                sourceFeature.relatedIndustries,
                feature.relatedIndustries,
            ),
        }))
        .filter((entry) => entry.overlapScore > 0)
        .sort(rankByOverlapThenSlug);
}

export function rankIndustrySiblingSlugs(
    industrySlug: string,
    input?: ClusterGraphInput,
): RankedLink[] {
    const { industries } = getGraphInput(input);
    const sourceIndustry = industries.find((industry) => industry.slug === industrySlug);
    if (!sourceIndustry) {
        return [];
    }

    return industries
        .filter((industry) => industry.slug !== sourceIndustry.slug)
        .map((industry) => ({
            slug: industry.slug,
            overlapScore: countOverlap(
                sourceIndustry.relatedSolutions,
                industry.relatedSolutions,
            ),
        }))
        .filter((entry) => entry.overlapScore > 0)
        .sort(rankByOverlapThenSlug);
}

export function findReciprocalLinkViolations(
    input?: ClusterGraphInput,
): ReciprocalLinkViolation[] {
    const { features, industries } = getGraphInput(input);
    const industryIndex = createIndustryIndex(industries);
    const featureIndex = createFeatureIndex(features);

    const violations: ReciprocalLinkViolation[] = [];

    for (const feature of features) {
        for (const industrySlug of feature.relatedIndustries) {
            const industry = industryIndex[industrySlug];
            if (!industry || !industry.relatedSolutions.includes(feature.slug)) {
                violations.push({
                    featureSlug: feature.slug,
                    industrySlug,
                    source: "feature",
                });
            }
        }
    }

    for (const industry of industries) {
        for (const featureSlug of industry.relatedSolutions) {
            const feature = featureIndex[featureSlug];
            if (!feature || !feature.relatedIndustries.includes(industry.slug)) {
                violations.push({
                    featureSlug,
                    industrySlug: industry.slug,
                    source: "industry",
                });
            }
        }
    }

    return violations.sort((left, right) => {
        const byFeature = left.featureSlug.localeCompare(right.featureSlug);
        if (byFeature !== 0) {
            return byFeature;
        }
        const byIndustry = left.industrySlug.localeCompare(right.industrySlug);
        if (byIndustry !== 0) {
            return byIndustry;
        }
        return left.source.localeCompare(right.source);
    });
}

export function getFeatureDetailLinks(
    featureSlug: FeatureSlug,
    options?: LinkLimitOptions,
) {
    const sourceFeature = featureBySlug[featureSlug];
    if (!sourceFeature) {
        return {
            parentPath: "/features",
            siblingFeatureSlugs: [] as string[],
            relatedIndustrySlugs: [] as string[],
        };
    }

    const siblingLimit = options?.siblingLimit ?? 4;
    const crossClusterLimit = options?.crossClusterLimit ?? 5;
    const industryIndex = createIndustryIndex(industryRecords);

    const siblingFeatureSlugs = rankFeatureSiblingSlugs(featureSlug)
        .slice(0, siblingLimit)
        .map((entry) => entry.slug);

    const relatedIndustrySlugs = getReciprocalFeatureIndustrySlugs(
        sourceFeature,
        industryIndex,
    ).slice(0, crossClusterLimit);

    return {
        parentPath: "/features",
        siblingFeatureSlugs,
        relatedIndustrySlugs,
    };
}

export function getIndustryDetailLinks(
    industrySlug: IndustrySlug,
    options?: LinkLimitOptions,
) {
    const sourceIndustry = industryBySlug[industrySlug];
    if (!sourceIndustry) {
        return {
            parentPath: "/industries",
            siblingIndustrySlugs: [] as string[],
            relatedFeatureSlugs: [] as string[],
        };
    }

    const siblingLimit = options?.siblingLimit ?? 4;
    const crossClusterLimit = options?.crossClusterLimit ?? 5;
    const featureIndex = createFeatureIndex(featureRecords);

    const siblingIndustrySlugs = rankIndustrySiblingSlugs(industrySlug)
        .slice(0, siblingLimit)
        .map((entry) => entry.slug);

    const relatedFeatureSlugs = getReciprocalIndustryFeatureSlugs(
        sourceIndustry,
        featureIndex,
    ).slice(0, crossClusterLimit);

    return {
        parentPath: "/industries",
        siblingIndustrySlugs,
        relatedFeatureSlugs,
    };
}
