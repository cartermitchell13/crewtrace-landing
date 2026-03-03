import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const projectRoot = process.cwd();

const staticMetadataContracts = [
    { filePath: "app/page.tsx", path: "/", indexable: true },
    { filePath: "app/about/page.tsx", path: "/about", indexable: true },
    { filePath: "app/blog/page.tsx", path: "/blog", indexable: true },
    { filePath: "app/case-studies/page.tsx", path: "/case-studies", indexable: true },
    { filePath: "app/compare/page.tsx", path: "/compare", indexable: true },
    { filePath: "app/guides/page.tsx", path: "/guides", indexable: true },
    { filePath: "app/features/page.tsx", path: "/features", indexable: true },
    { filePath: "app/industries/page.tsx", path: "/industries", indexable: true },
    { filePath: "app/contact/layout.tsx", path: "/contact", indexable: true },
    { filePath: "app/demo/page.tsx", path: "/demo", indexable: false },
    { filePath: "app/calculator/layout.tsx", path: "/calculator", indexable: false },
    { filePath: "app/compliance-audit/page.tsx", path: "/compliance-audit", indexable: false },
    { filePath: "app/privacy/page.tsx", path: "/privacy", indexable: false },
    { filePath: "app/terms/page.tsx", path: "/terms", indexable: false },
];

const dynamicMetadataContracts = [
    {
        filePath: "app/features/[slug]/page.tsx",
        dynamicPath: "/features/${slug}",
        fallbackPath: "/features",
    },
    {
        filePath: "app/industries/[slug]/page.tsx",
        dynamicPath: "/industries/${slug}",
        fallbackPath: "/industries",
    },
    {
        filePath: "app/compare/[slug]/page.tsx",
        dynamicPath: "/compare/${slug}",
        fallbackPath: "/compare",
    },
    {
        filePath: "app/blog/[slug]/page.tsx",
        dynamicPath: "/blog/${slug}",
        fallbackPath: "/blog",
    },
    {
        filePath: "app/guides/[slug]/page.tsx",
        dynamicPath: "/guides/${slug}",
        fallbackPath: "/guides",
    },
    {
        filePath: "app/case-studies/[slug]/page.tsx",
        dynamicPath: "/case-studies/${slug}",
        fallbackPath: "/case-studies",
    },
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

function normalizePath(pathValue) {
    if (!pathValue || pathValue === "/") {
        return "/";
    }
    return pathValue.startsWith("/") ? pathValue : `/${pathValue}`;
}

function getStringInitializerValue(initializer, sourceFile) {
    if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
        return initializer.text;
    }

    if (ts.isTemplateExpression(initializer)) {
        const text = initializer.getText(sourceFile);
        return text.slice(1, -1);
    }

    return null;
}

function getBooleanInitializerValue(initializer) {
    if (initializer.kind === ts.SyntaxKind.TrueKeyword) {
        return true;
    }
    if (initializer.kind === ts.SyntaxKind.FalseKeyword) {
        return false;
    }
    return null;
}

function parseMetadataCalls(filePath, errors) {
    const content = read(filePath);
    const sourceFile = ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.ES2022,
        true,
        ts.ScriptKind.TSX,
    );
    const calls = [];

    const visit = (node) => {
        if (
            ts.isCallExpression(node) &&
            ts.isIdentifier(node.expression) &&
            node.expression.text === "createPageMetadata"
        ) {
            const metadataArg = node.arguments[0];
            if (!metadataArg || !ts.isObjectLiteralExpression(metadataArg)) {
                errors.push(`${filePath}: createPageMetadata call must receive an object literal.`);
                return;
            }

            const record = {
                filePath,
                title: "",
                description: "",
                path: null,
                noIndex: false,
                hasNoIndexField: false,
                hasTitleField: false,
                hasDescriptionField: false,
                hasPathField: false,
            };

            for (const property of metadataArg.properties) {
                if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) {
                    continue;
                }

                const propertyName = property.name.text;
                if (propertyName === "title") {
                    record.hasTitleField = true;
                    const value = getStringInitializerValue(property.initializer, sourceFile);
                    if (value !== null) {
                        record.title = value.trim();
                    } else {
                        record.title = property.initializer.getText(sourceFile).trim();
                    }
                }

                if (propertyName === "description") {
                    record.hasDescriptionField = true;
                    const value = getStringInitializerValue(property.initializer, sourceFile);
                    if (value !== null) {
                        record.description = value.trim();
                    } else {
                        record.description = property.initializer.getText(sourceFile).trim();
                    }
                }

                if (propertyName === "path") {
                    record.hasPathField = true;
                    const value = getStringInitializerValue(property.initializer, sourceFile);
                    if (value !== null) {
                        record.path = normalizePath(value.trim());
                    } else {
                        const rawPath = property.initializer.getText(sourceFile).trim();
                        record.path = normalizePath(rawPath.replace(/^[`'"]|[`'"]$/g, ""));
                    }
                }

                if (propertyName === "noIndex") {
                    const value = getBooleanInitializerValue(property.initializer);
                    if (value !== null) {
                        record.noIndex = value;
                        record.hasNoIndexField = true;
                    }
                }
            }

            calls.push(record);
        }

        ts.forEachChild(node, visit);
    };

    visit(sourceFile);

    if (calls.length === 0) {
        errors.push(`${filePath}: missing createPageMetadata call.`);
        return [];
    }

    for (const [callIndex, call] of calls.entries()) {
        if (!call.hasTitleField || !call.hasDescriptionField || !call.hasPathField || !call.path) {
            errors.push(
                `${filePath}: call #${callIndex + 1} is missing title, description, or path in createPageMetadata.`,
            );
        }
    }

    return calls;
}

function run() {
    const errors = [];
    const policyText = read("lib/seoPolicy.ts");

    const staticMetadataRecords = [];

    for (const contract of staticMetadataContracts) {
        const calls = parseMetadataCalls(contract.filePath, errors);
        const ownershipMatch = calls.filter((call) => call.path === contract.path);

        if (ownershipMatch.length !== 1) {
            errors.push(
                `${contract.filePath}: expected one createPageMetadata canonical owner for ${contract.path}, found ${ownershipMatch.length}.`,
            );
            continue;
        }

        const record = ownershipMatch[0];
        if (contract.indexable && record.noIndex) {
            errors.push(
                `${contract.filePath}: indexable path ${contract.path} must not set noIndex: true.`,
            );
        }
        if (!contract.indexable && record.hasNoIndexField && !record.noIndex) {
            errors.push(
                `${contract.filePath}: non-indexable path ${contract.path} must set noIndex: true.`,
            );
        }

        if (calls.length > 1) {
            const unexpectedPaths = calls
                .map((call) => call.path)
                .filter((pathValue) => pathValue && pathValue !== contract.path);
            if (unexpectedPaths.length > 0) {
                errors.push(
                    `${contract.filePath}: unexpected canonical path ownership ${unexpectedPaths.join(", ")}.`,
                );
            }
        }

        staticMetadataRecords.push({
            ...record,
            expectedIndexable: contract.indexable,
        });
    }

    for (const contract of dynamicMetadataContracts) {
        const calls = parseMetadataCalls(contract.filePath, errors);
        const dynamicOwnerCount = calls.filter(
            (call) => call.path === contract.dynamicPath && !call.noIndex,
        ).length;
        const fallbackOwnerCount = calls.filter(
            (call) => call.path === contract.fallbackPath && call.noIndex,
        ).length;

        if (dynamicOwnerCount !== 1) {
            errors.push(
                `${contract.filePath}: expected one dynamic canonical owner ${contract.dynamicPath} without noIndex; found ${dynamicOwnerCount}.`,
            );
        }

        if (fallbackOwnerCount !== 1) {
            errors.push(
                `${contract.filePath}: expected one noIndex fallback owner ${contract.fallbackPath}; found ${fallbackOwnerCount}.`,
            );
        }
    }

    const duplicateCheck = (field) => {
        const seen = new Map();
        for (const record of staticMetadataRecords.filter((entry) => entry.expectedIndexable)) {
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

    for (const contract of staticMetadataContracts) {
        const escapedPath = contract.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const expectedIndexable = contract.indexable ? "true" : "false";
        const pattern = new RegExp(
            `path:\\s*"${escapedPath}"[\\s\\S]*?indexable:\\s*${expectedIndexable}`,
            "m",
        );
        if (!pattern.test(policyText)) {
            errors.push(
                `lib/seoPolicy.ts must include ${contract.path} with indexable: ${expectedIndexable}.`,
            );
        }
    }

    for (const dynamicPrefix of ["/features/", "/industries/", "/compare/", "/blog/", "/guides/", "/case-studies/"]) {
        const prefixPattern = new RegExp(`["'\`]${dynamicPrefix.replace("/", "\\/")}["'\`]`);
        if (!prefixPattern.test(policyText)) {
            errors.push(`SEO policy dynamic prefixes must include "${dynamicPrefix}".`);
        }
    }

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

    const navbar = read("components/Navbar.tsx");
    const homepage = read("app/page.tsx");
    if (navbar.includes("/compare")) {
        errors.push("components/Navbar.tsx must not include top-level /compare links.");
    }
    if (homepage.includes("/compare")) {
        errors.push("app/page.tsx must not include /compare links.");
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
