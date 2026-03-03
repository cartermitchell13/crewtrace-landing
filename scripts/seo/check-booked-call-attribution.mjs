#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const checks = [
    {
        file: "components/BookedCallLink.tsx",
        patterns: ["buildBookedCallCtaClickEvent", "sendSeoEvent"],
        description: "BookedCallLink emits booked-call click events through shared transport",
    },
    {
        file: "app/features/[slug]/page.tsx",
        patterns: [
            'from "@/components/BookedCallLink"',
            "<BookedCallLink",
            "SeoLandingTracker",
        ],
        description: "Feature detail template uses shared CTA + landing tracker",
    },
    {
        file: "app/industries/[slug]/page.tsx",
        patterns: [
            'from "@/components/BookedCallLink"',
            "<BookedCallLink",
            "SeoLandingTracker",
        ],
        description: "Industry detail template uses shared CTA + landing tracker",
    },
    {
        file: "app/compare/[slug]/page.tsx",
        patterns: ['from "@/components/BookedCallLink"', "<BookedCallLink"],
        description: "Compare detail template routes CTA through shared booked-call link",
    },
    {
        file: "app/guides/[slug]/page.tsx",
        patterns: ['from "@/components/BookedCallLink"', "<BookedCallLink"],
        description: "Guide detail template routes CTA through shared booked-call link",
    },
    {
        file: "app/case-studies/[slug]/page.tsx",
        patterns: ['from "@/components/BookedCallLink"', "<BookedCallLink"],
        description: "Case-study detail template routes CTA through shared booked-call link",
    },
    {
        file: "app/blog/[slug]/page.tsx",
        patterns: ['from "@/components/BookedCallLink"', "<BookedCallLink"],
        description: "Blog detail template routes CTA through shared booked-call link",
    },
];

function readFile(relativePath) {
    const absolutePath = path.join(rootDir, relativePath);
    if (!fs.existsSync(absolutePath)) {
        throw new Error(`Missing required file: ${relativePath}`);
    }

    return fs.readFileSync(absolutePath, "utf8");
}

function runChecks() {
    const failures = [];

    for (const check of checks) {
        const source = readFile(check.file);
        const missingPatterns = check.patterns.filter((pattern) => !source.includes(pattern));

        if (missingPatterns.length > 0) {
            failures.push({
                ...check,
                missingPatterns,
            });
        }
    }

    if (failures.length > 0) {
        console.error("Booked-call attribution checks failed:\n");
        for (const failure of failures) {
            console.error(`- ${failure.file}`);
            console.error(`  Expected: ${failure.description}`);
            console.error(`  Missing patterns: ${failure.missingPatterns.join(", ")}`);
        }
        process.exit(1);
    }

    console.log("Booked-call attribution checks passed.");
    for (const check of checks) {
        console.log(`- ${check.file}: ${check.description}`);
    }
}

runChecks();
