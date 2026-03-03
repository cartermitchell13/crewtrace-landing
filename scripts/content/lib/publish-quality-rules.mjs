export const publishQualityRules = {
    version: "1.0.0",
    requiredFrontmatterFields: ["title", "excerpt", "date", "category", "readTime"],
    requiredFrontmatterPatterns: {
        date: "^\\d{4}-\\d{2}-\\d{2}$",
        readTime: "^\\d+\\s+min\\s+read$",
    },
    requiredBodyRules: {
        minWordCount: 250,
        minHeadingCount: 3,
        headingPattern: "^##\\s+",
    },
    slugTitleConsistency: {
        minimumSlugTokenMatches: 1,
        ignoredSlugTokens: ["for", "and", "the", "a", "an", "to", "of", "in", "on"],
    },
    bannedPhrases: [
        "11-50 employees",
        "$500k-$5m",
        "guaranteed savings",
        "instant compliance",
        "zero implementation risk",
        "works for every contractor",
    ],
};

export function normalizeText(value) {
    return String(value ?? "").toLowerCase().trim();
}

export function getBannedPhrasePatterns(rules = publishQualityRules) {
    return rules.bannedPhrases.map((phrase) => ({
        phrase,
        pattern: new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    }));
}

