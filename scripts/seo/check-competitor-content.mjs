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
            `Unsupported import "${specifier}" in ${relativePath}. Keep competitor contracts data-only.`,
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

function ensureString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

function run() {
    const errors = [];

    const competitorModule = loadTsModule("lib/competitors.ts");
    const solutionModule = loadTsModule("lib/solutions.ts");
    const industryModule = loadTsModule("lib/industries.ts");
    const guideModule = loadTsModule("lib/guides.ts");
    const caseStudyModule = loadTsModule("lib/caseStudies.ts");

    const competitorRecords = competitorModule.competitorRecords ?? [];
    const competitorSlugs = competitorModule.competitorSlugs ?? [];
    const requiredCompetitorSlugs = competitorModule.requiredCompetitorSlugs ?? [
        "connecteam",
        "workyard",
    ];
    const featureSlugs = solutionModule.featureSlugs ?? solutionModule.solutionSlugs ?? [];
    const industrySlugs = industryModule.industrySlugs ?? [];
    const guideSlugs = guideModule.guideSlugs ?? [];
    const caseStudySlugs = caseStudyModule.caseStudySlugs ?? [];

    const featureSet = new Set(featureSlugs);
    const industrySet = new Set(industrySlugs);
    const guideSet = new Set(guideSlugs);
    const caseStudySet = new Set(caseStudySlugs);

    ensure(
        Array.isArray(competitorRecords) && competitorRecords.length === 2,
        "competitorRecords must contain exactly two launch competitors.",
        errors,
    );

    const duplicateCompetitorSlugs = findDuplicates(competitorSlugs);
    ensure(
        duplicateCompetitorSlugs.length === 0,
        `duplicate competitor slugs: ${duplicateCompetitorSlugs.join(", ")}`,
        errors,
    );

    for (const requiredSlug of requiredCompetitorSlugs) {
        ensure(
            competitorSlugs.includes(requiredSlug),
            `missing required competitor slug: ${requiredSlug}`,
            errors,
        );
    }

    for (const competitor of competitorRecords) {
        if (!competitor || !ensureString(competitor.slug)) {
            errors.push("competitor record is missing slug.");
            continue;
        }

        ensure(ensureString(competitor.name), `${competitor.slug}: missing name`, errors);
        ensure(ensureString(competitor.primaryKeyword), `${competitor.slug}: missing primaryKeyword`, errors);
        ensure(
            Array.isArray(competitor.keywordClusters) && competitor.keywordClusters.length > 0,
            `${competitor.slug}: keywordClusters must be non-empty`,
            errors,
        );
        ensure(
            Array.isArray(competitor.intentTargets) && competitor.intentTargets.length > 0,
            `${competitor.slug}: intentTargets must be non-empty`,
            errors,
        );
        ensure(
            Array.isArray(competitor.comparisonSections) &&
                competitor.comparisonSections.length > 0,
            `${competitor.slug}: comparisonSections must be non-empty`,
            errors,
        );
        ensure(
            Array.isArray(competitor.claimSafetyRules) &&
                competitor.claimSafetyRules.length > 0,
            `${competitor.slug}: claimSafetyRules must be non-empty`,
            errors,
        );

        ensure(
            ensureString(competitor.lastReviewedOn),
            `${competitor.slug}: missing lastReviewedOn`,
            errors,
        );
        ensure(
            /^\d{4}-\d{2}-\d{2}$/.test(String(competitor.lastReviewedOn)),
            `${competitor.slug}: lastReviewedOn must match YYYY-MM-DD`,
            errors,
        );
        ensure(
            Number.isInteger(competitor.reviewCadenceDays) &&
                competitor.reviewCadenceDays > 0,
            `${competitor.slug}: reviewCadenceDays must be a positive integer`,
            errors,
        );

        for (const cluster of competitor.keywordClusters ?? []) {
            ensure(
                Array.isArray(cluster.primaryTerms) && cluster.primaryTerms.length > 0,
                `${competitor.slug}: keyword cluster missing primaryTerms`,
                errors,
            );
            ensure(
                Array.isArray(cluster.secondaryTerms) && cluster.secondaryTerms.length > 0,
                `${competitor.slug}: keyword cluster missing secondaryTerms`,
                errors,
            );
            ensure(
                ensureString(cluster.intentBucket),
                `${competitor.slug}: keyword cluster missing intentBucket`,
                errors,
            );
            ensure(
                ensureString(cluster.canonicalOwner),
                `${competitor.slug}: keyword cluster missing canonicalOwner`,
                errors,
            );
        }

        const linkTargets = competitor.linkTargets ?? {};
        const featureLinks = linkTargets.featureSlugs ?? [];
        const industryLinks = linkTargets.industrySlugs ?? [];
        const guideLinks = linkTargets.guideSlugs ?? [];
        const caseStudyLinks = linkTargets.caseStudySlugs ?? [];

        ensure(
            Array.isArray(featureLinks) && featureLinks.length > 0,
            `${competitor.slug}: linkTargets.featureSlugs must be non-empty`,
            errors,
        );
        ensure(
            Array.isArray(industryLinks) && industryLinks.length > 0,
            `${competitor.slug}: linkTargets.industrySlugs must be non-empty`,
            errors,
        );
        ensure(
            Array.isArray(guideLinks) && guideLinks.length > 0,
            `${competitor.slug}: linkTargets.guideSlugs must be non-empty`,
            errors,
        );
        ensure(
            Array.isArray(caseStudyLinks) && caseStudyLinks.length > 0,
            `${competitor.slug}: linkTargets.caseStudySlugs must be non-empty`,
            errors,
        );

        for (const slug of featureLinks) {
            ensure(
                featureSet.has(slug),
                `${competitor.slug}: missing feature reference "${slug}"`,
                errors,
            );
        }

        for (const slug of industryLinks) {
            ensure(
                industrySet.has(slug),
                `${competitor.slug}: missing industry reference "${slug}"`,
                errors,
            );
        }

        for (const slug of guideLinks) {
            ensure(
                guideSet.has(slug),
                `${competitor.slug}: missing guide reference "${slug}"`,
                errors,
            );
        }

        for (const slug of caseStudyLinks) {
            ensure(
                caseStudySet.has(slug),
                `${competitor.slug}: missing case-study reference "${slug}"`,
                errors,
            );
        }
    }

    if (errors.length > 0) {
        console.error("Competitor content check failed:");
        for (const error of errors) {
            console.error(`- ${error}`);
        }
        process.exit(1);
    }

    console.log("Competitor content check passed.");
}

run();
