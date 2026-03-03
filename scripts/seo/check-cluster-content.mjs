import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const projectRoot = process.cwd();

function loadTsModule(relativePath) {
    const filePath = path.join(projectRoot, relativePath);
    const source = fs.readFileSync(filePath, "utf8");
    const compiled = ts.transpileModule(source, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2022,
            esModuleInterop: true,
        },
        fileName: filePath,
    }).outputText;

    const moduleRef = { exports: {} };
    const dirname = path.dirname(filePath);
    const localRequire = (specifier) => {
        throw new Error(
            `Unsupported import "${specifier}" in ${relativePath}. Keep cluster contracts data-only.`,
        );
    };

    vm.runInNewContext(compiled, {
        module: moduleRef,
        exports: moduleRef.exports,
        require: localRequire,
        __dirname: dirname,
        __filename: filePath,
        console,
        process,
    });

    return moduleRef.exports;
}

function ensure(condition, message, errors) {
    if (!condition) {
        errors.push(message);
    }
}

function findDuplicates(values) {
    const seen = new Set();
    const duplicates = new Set();
    for (const value of values) {
        if (seen.has(value)) {
            duplicates.add(value);
        }
        seen.add(value);
    }
    return [...duplicates];
}

function countOverlap(values, comparison) {
    const comparisonSet = new Set(comparison);
    let overlap = 0;
    for (const value of values) {
        if (comparisonSet.has(value)) {
            overlap += 1;
        }
    }
    return overlap;
}

function getFeatureSiblings(feature, featureRecords) {
    return featureRecords
        .filter((candidate) => candidate.slug !== feature.slug)
        .map((candidate) => ({
            slug: candidate.slug,
            overlap: countOverlap(feature.relatedIndustries, candidate.relatedIndustries),
        }))
        .filter((candidate) => candidate.overlap > 0)
        .sort((left, right) => {
            if (left.overlap !== right.overlap) {
                return right.overlap - left.overlap;
            }
            return left.slug.localeCompare(right.slug);
        });
}

function getIndustrySiblings(industry, industryRecords) {
    return industryRecords
        .filter((candidate) => candidate.slug !== industry.slug)
        .map((candidate) => ({
            slug: candidate.slug,
            overlap: countOverlap(industry.relatedSolutions, candidate.relatedSolutions),
        }))
        .filter((candidate) => candidate.overlap > 0)
        .sort((left, right) => {
            if (left.overlap !== right.overlap) {
                return right.overlap - left.overlap;
            }
            return left.slug.localeCompare(right.slug);
        });
}

function assertRecords(records, requiredKeys, clusterName, errors) {
    ensure(Array.isArray(records) && records.length > 0, `${clusterName}: records must be non-empty`, errors);

    for (const [index, record] of records.entries()) {
        for (const key of requiredKeys) {
            const value = record[key];
            if (Array.isArray(value)) {
                ensure(value.length > 0, `${clusterName}[${index}] missing non-empty array "${key}"`, errors);
                continue;
            }
            ensure(
                typeof value === "string" && value.trim().length > 0,
                `${clusterName}[${index}] missing required string "${key}"`,
                errors,
            );
        }
    }
}

function run() {
    const errors = [];

    const solutionModule = loadTsModule("lib/solutions.ts");
    const industryModule = loadTsModule("lib/industries.ts");

    const featureRecords = solutionModule.featureRecords ?? solutionModule.solutions;
    const industryRecords = industryModule.industryRecords;
    const requiredPriorityIndustrySlugs = industryModule.requiredPriorityIndustrySlugs ?? [];
    const expansionFeatureSlugs = solutionModule.expansionFeatureSlugs ?? [];
    const expansionIndustrySlugs = industryModule.expansionIndustrySlugs ?? [];

    assertRecords(
        featureRecords,
        ["slug", "name", "primaryKeyword", "primaryIntent", "description"],
        "featureRecords",
        errors,
    );
    assertRecords(
        industryRecords,
        [
            "slug",
            "name",
            "primaryKeyword",
            "primaryIntent",
            "metaTitle",
            "metaDescription",
            "heroTitle",
            "heroSubtitle",
        ],
        "industryRecords",
        errors,
    );

    const featureSlugs = featureRecords.map((feature) => feature.slug);
    const industrySlugs = industryRecords.map((industry) => industry.slug);
    const featureIntents = featureRecords.map((feature) => feature.primaryIntent);
    const industryIntents = industryRecords.map((industry) => industry.primaryIntent);

    const duplicateFeatureSlugs = findDuplicates(featureSlugs);
    const duplicateIndustrySlugs = findDuplicates(industrySlugs);
    const duplicateFeatureIntents = findDuplicates(featureIntents);
    const duplicateIndustryIntents = findDuplicates(industryIntents);

    ensure(
        duplicateFeatureSlugs.length === 0,
        `featureRecords has duplicate slugs: ${duplicateFeatureSlugs.join(", ")}`,
        errors,
    );
    ensure(
        duplicateIndustrySlugs.length === 0,
        `industryRecords has duplicate slugs: ${duplicateIndustrySlugs.join(", ")}`,
        errors,
    );
    ensure(
        duplicateFeatureIntents.length === 0,
        `featureRecords has duplicate primaryIntent values: ${duplicateFeatureIntents.join(", ")}`,
        errors,
    );
    ensure(
        duplicateIndustryIntents.length === 0,
        `industryRecords has duplicate primaryIntent values: ${duplicateIndustryIntents.join(", ")}`,
        errors,
    );

    const featureSlugSet = new Set(featureSlugs);
    const industrySlugSet = new Set(industrySlugs);
    const featureBySlug = new Map(featureRecords.map((feature) => [feature.slug, feature]));
    const industryBySlug = new Map(industryRecords.map((industry) => [industry.slug, industry]));

    for (const feature of featureRecords) {
        const missingIndustryLinks = feature.relatedIndustries.filter(
            (industrySlug) => !industrySlugSet.has(industrySlug),
        );
        ensure(
            missingIndustryLinks.length === 0,
            `feature "${feature.slug}" references missing industries: ${missingIndustryLinks.join(", ")}`,
            errors,
        );

        const siblingFeatureLinks = getFeatureSiblings(feature, featureRecords);
        ensure(
            siblingFeatureLinks.length > 0,
            `feature "${feature.slug}" has no sibling feature links (CLUS-04 parent/sibling coverage)`,
            errors,
        );

        for (const industrySlug of feature.relatedIndustries) {
            const industry = industryBySlug.get(industrySlug);
            if (!industry || !industry.relatedSolutions.includes(feature.slug)) {
                ensure(
                    false,
                    `feature "${feature.slug}" -> industry "${industrySlug}" is not reciprocal`,
                    errors,
                );
            }
        }
    }

    for (const industry of industryRecords) {
        const missingFeatureLinks = industry.relatedSolutions.filter(
            (featureSlug) => !featureSlugSet.has(featureSlug),
        );
        ensure(
            missingFeatureLinks.length === 0,
            `industry "${industry.slug}" references missing features: ${missingFeatureLinks.join(", ")}`,
            errors,
        );

        const siblingIndustryLinks = getIndustrySiblings(industry, industryRecords);
        ensure(
            siblingIndustryLinks.length > 0,
            `industry "${industry.slug}" has no sibling industry links (CLUS-04 parent/sibling coverage)`,
            errors,
        );

        for (const featureSlug of industry.relatedSolutions) {
            const feature = featureBySlug.get(featureSlug);
            if (!feature || !feature.relatedIndustries.includes(industry.slug)) {
                ensure(
                    false,
                    `industry "${industry.slug}" -> feature "${featureSlug}" is not reciprocal`,
                    errors,
                );
            }
        }
    }

    for (const requiredSlug of requiredPriorityIndustrySlugs) {
        ensure(
            industrySlugSet.has(requiredSlug),
            `missing required priority trade industry slug: ${requiredSlug}`,
            errors,
        );

        const industry = industryRecords.find((record) => record.slug === requiredSlug);
        if (!industry) {
            continue;
        }

        ensure(
            industry.relatedSolutions.length > 0,
            `required priority trade "${requiredSlug}" must include relatedSolutions`,
            errors,
        );

        const linkedFromFeatures = featureRecords.some((feature) =>
            feature.relatedIndustries.includes(requiredSlug),
        );
        ensure(
            linkedFromFeatures,
            `required priority trade "${requiredSlug}" must be referenced by at least one feature`,
            errors,
        );
    }

    for (const featureSlug of expansionFeatureSlugs) {
        const feature = featureBySlug.get(featureSlug);
        ensure(Boolean(feature), `missing expansion feature slug: ${featureSlug}`, errors);
        if (!feature) {
            continue;
        }

        const siblingFeatureLinks = getFeatureSiblings(feature, featureRecords);
        ensure(
            siblingFeatureLinks.length > 0,
            `expansion feature "${featureSlug}" has no sibling eligibility`,
            errors,
        );

        ensure(
            feature.relatedIndustries.length > 0,
            `expansion feature "${featureSlug}" must have at least one related industry`,
            errors,
        );

        for (const industrySlug of feature.relatedIndustries) {
            const industry = industryBySlug.get(industrySlug);
            if (!industry || !industry.relatedSolutions.includes(featureSlug)) {
                ensure(
                    false,
                    `expansion feature "${featureSlug}" has non-reciprocal industry link "${industrySlug}"`,
                    errors,
                );
            }
        }
    }

    for (const industrySlug of expansionIndustrySlugs) {
        const industry = industryBySlug.get(industrySlug);
        ensure(Boolean(industry), `missing expansion industry slug: ${industrySlug}`, errors);
        if (!industry) {
            continue;
        }

        const siblingIndustryLinks = getIndustrySiblings(industry, industryRecords);
        ensure(
            siblingIndustryLinks.length > 0,
            `expansion industry "${industrySlug}" has no sibling eligibility`,
            errors,
        );

        ensure(
            industry.relatedSolutions.length > 0,
            `expansion industry "${industrySlug}" must have at least one related feature`,
            errors,
        );

        for (const featureSlug of industry.relatedSolutions) {
            const feature = featureBySlug.get(featureSlug);
            if (!feature || !feature.relatedIndustries.includes(industrySlug)) {
                ensure(
                    false,
                    `expansion industry "${industrySlug}" has non-reciprocal feature link "${featureSlug}"`,
                    errors,
                );
            }
        }
    }

    const featureDetailTemplate = fs.readFileSync(
        path.join(projectRoot, "app/features/[slug]/page.tsx"),
        "utf8",
    );
    const industryDetailTemplate = fs.readFileSync(
        path.join(projectRoot, "app/industries/[slug]/page.tsx"),
        "utf8",
    );

    ensure(
        featureDetailTemplate.includes("href={detailLinks.parentPath}"),
        "feature detail template is missing parent hub path link (/features)",
        errors,
    );
    ensure(
        industryDetailTemplate.includes("href={detailLinks.parentPath}"),
        "industry detail template is missing parent hub path link (/industries)",
        errors,
    );

    if (errors.length > 0) {
        console.error("Cluster content check failed:");
        for (const entry of errors) {
            console.error(`- ${entry}`);
        }
        process.exit(1);
    }

    console.log("Cluster content check passed.");
}

run();
