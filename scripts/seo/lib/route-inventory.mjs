import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const projectRoot = process.cwd();

function normalizePath(pathValue) {
    if (!pathValue || pathValue === "/") {
        return "/";
    }

    const [withoutQuery] = pathValue.split("?");
    const [withoutHash] = withoutQuery.split("#");
    const normalized = withoutHash.startsWith("/") ? withoutHash : `/${withoutHash}`;

    if (normalized.length > 1 && normalized.endsWith("/")) {
        return normalized.slice(0, -1);
    }

    return normalized;
}

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

    vm.runInNewContext(compiled, {
        module: moduleRef,
        exports: moduleRef.exports,
        require: () => {
            throw new Error(
                `Unsupported runtime import in ${relativePath}. Route inventory expects data modules only.`,
            );
        },
        __dirname: path.dirname(filePath),
        __filename: filePath,
        console,
        process,
    });

    return moduleRef.exports;
}

function collectBlogSlugs() {
    const blogDirectory = path.join(projectRoot, "content/blog");
    if (!fs.existsSync(blogDirectory)) {
        return [];
    }

    return fs
        .readdirSync(blogDirectory)
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => fileName.replace(/\.md$/, ""))
        .sort();
}

function mapRoutes(prefix, slugs) {
    return slugs.map((slug) => normalizePath(`${prefix}${slug}`));
}

export function buildRouteInventory() {
    const seoPolicyModule = loadTsModule("lib/seoPolicy.ts");
    const solutionsModule = loadTsModule("lib/solutions.ts");
    const industriesModule = loadTsModule("lib/industries.ts");
    const competitorsModule = loadTsModule("lib/competitors.ts");
    const guidesModule = loadTsModule("lib/guides.ts");
    const caseStudiesModule = loadTsModule("lib/caseStudies.ts");

    const staticPolicies = seoPolicyModule.staticSeoPolicies ?? [];
    const indexableStaticPaths = staticPolicies
        .filter((policy) => policy.indexable)
        .map((policy) => normalizePath(policy.path));
    const nonIndexableStaticPaths = staticPolicies
        .filter((policy) => !policy.indexable)
        .map((policy) => normalizePath(policy.path));

    const featureSlugs = solutionsModule.solutionSlugs ?? solutionsModule.featureSlugs ?? [];
    const industrySlugs = industriesModule.industrySlugs ?? [];
    const competitorSlugs = competitorsModule.competitorSlugs ?? [];
    const guideSlugs = guidesModule.guideSlugs ?? [];
    const caseStudySlugs = caseStudiesModule.caseStudySlugs ?? [];
    const blogSlugs = collectBlogSlugs();

    const dynamicPaths = [
        ...mapRoutes("/features/", featureSlugs),
        ...mapRoutes("/industries/", industrySlugs),
        ...mapRoutes("/compare/", competitorSlugs),
        ...mapRoutes("/guides/", guideSlugs),
        ...mapRoutes("/case-studies/", caseStudySlugs),
        ...mapRoutes("/blog/", blogSlugs),
    ];

    const indexablePathSet = new Set([...indexableStaticPaths, ...dynamicPaths].map(normalizePath));
    const nonIndexablePathSet = new Set(nonIndexableStaticPaths.map(normalizePath));

    const dynamicPrefixes = [
        "/features/",
        "/industries/",
        "/compare/",
        "/guides/",
        "/case-studies/",
        "/blog/",
    ].filter((prefix) => [...indexablePathSet].some((routePath) => routePath.startsWith(prefix)));

    return {
        indexablePaths: [...indexablePathSet].sort(),
        nonIndexablePaths: [...nonIndexablePathSet].sort(),
        dynamicPrefixes,
        indexablePathSet,
        nonIndexablePathSet,
    };
}

export function normalizeInternalPath(pathValue) {
    return normalizePath(pathValue);
}

