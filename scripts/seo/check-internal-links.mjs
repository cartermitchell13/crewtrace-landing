#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { buildRouteInventory, normalizeInternalPath } from "./lib/route-inventory.mjs";

const projectRoot = process.cwd();

const INDEXABLE_SOURCE_FILES = [
    "app/page.tsx",
    "app/about/page.tsx",
    "app/contact/page.tsx",
    "app/blog/page.tsx",
    "app/blog/[slug]/page.tsx",
    "app/case-studies/page.tsx",
    "app/case-studies/[slug]/page.tsx",
    "app/compare/page.tsx",
    "app/compare/[slug]/page.tsx",
    "app/features/page.tsx",
    "app/features/[slug]/page.tsx",
    "app/guides/page.tsx",
    "app/guides/[slug]/page.tsx",
    "app/industries/page.tsx",
    "app/industries/[slug]/page.tsx",
    "components/Footer.tsx",
    "components/LandingNavbar.tsx",
    "components/Navbar.tsx",
];

const ALLOWED_NON_PAGE_PREFIXES = [
    "/images/",
    "/api/",
    "/favicon",
    "/icon",
    "/manifest",
    "/_next/",
];

const ALLOWED_FILE_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg",
    ".svg",
    ".webp",
    ".ico",
    ".xml",
    ".txt",
    ".json",
    ".pdf",
];

function getLineNumberFromOffset(source, offset) {
    return source.slice(0, offset).split(/\r?\n/).length;
}

function read(relativePath) {
    return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

function extractInternalPathLiterals(source) {
    return [...source.matchAll(/(["'`])(\/[^"'`\r\n]*)\1/g)].map((match) => ({
        value: match[2],
        offset: match.index ?? 0,
    }));
}

function shouldIgnorePath(rawPath) {
    if (!rawPath || rawPath === "/") {
        return false;
    }

    if (rawPath.startsWith("#") || rawPath.startsWith("mailto:") || rawPath.startsWith("tel:")) {
        return true;
    }

    if (rawPath.includes("://") || rawPath.startsWith("//")) {
        return true;
    }

    if (ALLOWED_NON_PAGE_PREFIXES.some((prefix) => rawPath.startsWith(prefix))) {
        return true;
    }

    const normalizedLower = rawPath.toLowerCase();
    if (ALLOWED_FILE_EXTENSIONS.some((extension) => normalizedLower.endsWith(extension))) {
        return true;
    }

    return false;
}

function resolveDynamicPrefix(rawPath) {
    const placeholderIndex = rawPath.indexOf("${");
    if (placeholderIndex === -1) {
        return null;
    }
    return rawPath.slice(0, placeholderIndex);
}

function run() {
    const inventory = buildRouteInventory();
    const failures = [];
    const seenFailureKeys = new Set();

    for (const relativePath of INDEXABLE_SOURCE_FILES) {
        const absolutePath = path.join(projectRoot, relativePath);
        if (!fs.existsSync(absolutePath)) {
            failures.push({
                filePath: relativePath,
                line: 0,
                href: "<missing file>",
                reason: "Source file not found.",
            });
            continue;
        }

        const source = read(relativePath);
        const matches = extractInternalPathLiterals(source);

        for (const match of matches) {
            const rawPath = match.value.trim();
            if (shouldIgnorePath(rawPath)) {
                continue;
            }

            const normalizedPath = normalizeInternalPath(rawPath);
            const lineNumber = getLineNumberFromOffset(source, match.offset);

            if (rawPath.includes("${")) {
                const prefix = resolveDynamicPrefix(rawPath);
                if (!prefix || !inventory.dynamicPrefixes.includes(prefix)) {
                    const failureKey = `${relativePath}:${lineNumber}:${rawPath}`;
                    if (!seenFailureKeys.has(failureKey)) {
                        seenFailureKeys.add(failureKey);
                        failures.push({
                            filePath: relativePath,
                            line: lineNumber,
                            href: rawPath,
                            reason: `Dynamic path prefix "${prefix ?? "<unknown>"}" is not in route inventory.`,
                        });
                    }
                }
                continue;
            }

            const isIndexable = inventory.indexablePathSet.has(normalizedPath);
            const isAllowedNonIndexable = inventory.nonIndexablePathSet.has(normalizedPath);

            if (!isIndexable && !isAllowedNonIndexable) {
                const failureKey = `${relativePath}:${lineNumber}:${normalizedPath}`;
                if (!seenFailureKeys.has(failureKey)) {
                    seenFailureKeys.add(failureKey);
                    failures.push({
                        filePath: relativePath,
                        line: lineNumber,
                        href: rawPath,
                        reason: "Target is missing from indexable route inventory.",
                    });
                }
            }
        }
    }

    if (failures.length > 0) {
        console.error("Internal link integrity check failed:");
        for (const failure of failures) {
            console.error(
                `- ${failure.filePath}:${failure.line} -> ${failure.href} (${failure.reason})`,
            );
        }
        process.exit(1);
    }

    console.log(
        `Internal link integrity check passed. Verified ${INDEXABLE_SOURCE_FILES.length} source files.`,
    );
}

run();

