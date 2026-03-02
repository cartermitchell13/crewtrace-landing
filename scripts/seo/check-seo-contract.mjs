import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const staticMetadataFiles = [
    "app/page.tsx",
    "app/about/page.tsx",
    "app/blog/page.tsx",
    "app/case-studies/page.tsx",
    "app/guides/page.tsx",
    "app/features/page.tsx",
    "app/industries/page.tsx",
    "app/contact/layout.tsx",
    "app/demo/page.tsx",
    "app/calculator/layout.tsx",
    "app/compliance-audit/page.tsx",
    "app/privacy/page.tsx",
    "app/terms/page.tsx",
];

const expectedNoIndexPaths = new Set([
    "/demo",
    "/calculator",
    "/compliance-audit",
    "/privacy",
    "/terms",
]);

function read(filePath) {
    return fs.readFileSync(path.join(projectRoot, filePath), "utf8");
}

function parseMetadata(filePath) {
    const content = read(filePath);
    const metadataCall = content.match(/createPageMetadata\(\s*{([\s\S]*?)}\s*\)/);

    if (!metadataCall) {
        return null;
    }

    const block = metadataCall[1];
    const title = block.match(/title:\s*["'`]([\s\S]*?)["'`]\s*,/)?.[1]?.trim();
    const description = block.match(/description:\s*["'`]([\s\S]*?)["'`]\s*,/)?.[1]?.trim();
    const routePath = block.match(/path:\s*["'`]([^"'`]+)["'`]/)?.[1]?.trim();
    const noIndex = block.match(/noIndex:\s*(true|false)/)?.[1] === "true";

    if (!title || !description || !routePath) {
        return {
            filePath,
            error: "Missing title, description, or path in createPageMetadata call.",
        };
    }

    return {
        filePath,
        title,
        description,
        path: routePath,
        noIndex,
    };
}

function ensure(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function run() {
    const errors = [];
    const policyText = read("lib/seoPolicy.ts");

    ensure(
        fs.existsSync(path.join(projectRoot, "lib/seoPolicy.ts")),
        "Missing lib/seoPolicy.ts.",
    );

    for (const noIndexPath of expectedNoIndexPaths) {
        const escaped = noIndexPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern = new RegExp(
            `path:\\s*"${escaped}"[\\s\\S]*?indexable:\\s*false`,
            "m",
        );
        if (!pattern.test(policyText)) {
            errors.push(`SEO policy must mark ${noIndexPath} as indexable: false.`);
        }
    }

    const parsed = staticMetadataFiles.map(parseMetadata);

    for (const record of parsed) {
        if (!record) {
            errors.push("Unable to parse createPageMetadata call.");
            continue;
        }

        if ("error" in record) {
            errors.push(`${record.filePath}: ${record.error}`);
            continue;
        }

        const escapedPath = record.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        if (!new RegExp(`path:\\s*"${escapedPath}"`).test(policyText)) {
            errors.push(`${record.filePath}: path ${record.path} is missing from lib/seoPolicy.ts`);
        }
    }

    const indexableRecords = parsed.filter(
        (record) => record && !("error" in record) && !expectedNoIndexPaths.has(record.path),
    );

    const duplicateCheck = (field) => {
        const seen = new Map();
        for (const record of indexableRecords) {
            const value = record[field];
            if (seen.has(value)) {
                errors.push(
                    `Duplicate ${field} for indexable pages: "${value}" in ${seen.get(value)} and ${record.filePath}`,
                );
            } else {
                seen.set(value, record.filePath);
            }
        }
    };

    duplicateCheck("path");
    duplicateCheck("title");
    duplicateCheck("description");

    const canonicalDoc = read("docs/seo/canonical-and-indexing-policy.md");
    const cwvDoc = read("docs/seo/cwv-budgets.md");

    for (const required of ["canonical", "self-canonical", "indexable", "noindex"]) {
        if (!canonicalDoc.toLowerCase().includes(required)) {
            errors.push(`docs/seo/canonical-and-indexing-policy.md is missing required term: ${required}`);
        }
    }

    for (const required of ["lcp", "inp", "cls", "target"]) {
        if (!cwvDoc.toLowerCase().includes(required)) {
            errors.push(`docs/seo/cwv-budgets.md is missing required term: ${required}`);
        }
    }

    if (errors.length > 0) {
        console.error("SEO contract check failed:");
        for (const error of errors) {
            console.error(`- ${error}`);
        }
        process.exit(1);
    }

    console.log("SEO contract check passed.");
}

run();
