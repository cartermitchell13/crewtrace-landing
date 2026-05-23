import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { featureBySlug, featureSlugs, type FeatureSlug } from "@/lib/solutions";

export const CUSTOM_FEATURE_SLUGS = new Set<FeatureSlug>([
    "scheduling",
    "gps-time-tracking",
    "geofencing-time-clock",
    "payroll-sync-quickbooks",
    "job-costing",
]);

export const supportKeywordByFeatureSlug: Record<FeatureSlug, string[]> = {
    "gps-time-tracking": [
        "time clock app with gps",
        "gps time tracking app",
        "gps employee tracking app",
    ],
    "geofencing-time-clock": [
        "geofencing time tracking",
        "geofence time clock",
        "clock in app with gps",
    ],
    "scheduling": [
        "crew scheduling software",
        "construction scheduling software",
        "contractor scheduling app",
    ],
    "payroll-sync-quickbooks": [
        "quickbooks payroll sync",
        "quickbooks time tracking",
        "construction payroll software",
    ],
    "job-costing": [
        "construction job costing software",
        "job cost tracking",
        "labor cost tracking construction",
    ],
};

export function getFeaturePagePath(slug: FeatureSlug) {
    return `/features/${slug}`;
}

export function createFeaturePageMetadata(slug: FeatureSlug): Metadata {
    const solution = featureBySlug[slug];

    if (!solution) {
        throw new Error(`Unknown feature slug: ${slug}`);
    }

    return createPageMetadata({
        title: solution.metaTitle,
        description: solution.metaDescription,
        path: getFeaturePagePath(slug),
    });
}

export function getTemplateFeatureSlugs() {
    return featureSlugs.filter((slug) => !CUSTOM_FEATURE_SLUGS.has(slug));
}
