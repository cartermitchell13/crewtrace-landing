import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const requiredSchemaContracts = [
    {
        filePath: "app/layout.tsx",
        requiredTokens: ["organizationSchema()", "websiteSchema()", "@/lib/schema"],
    },
    {
        filePath: "app/page.tsx",
        requiredTokens: ["faqSchema(", "homeFaqItems", "@/lib/schema"],
    },
    {
        filePath: "app/blog/[slug]/page.tsx",
        requiredTokens: [
            "articleSchema(",
            "breadcrumbSchema(",
            "@/lib/schema",
            'type="application/ld+json"',
        ],
    },
    {
        filePath: "app/guides/[slug]/page.tsx",
        requiredTokens: [
            "articleSchema(",
            "breadcrumbSchema(",
            "@/lib/schema",
            'type="application/ld+json"',
        ],
    },
    {
        filePath: "app/case-studies/[slug]/page.tsx",
        requiredTokens: [
            "articleSchema(",
            "breadcrumbSchema(",
            "@/lib/schema",
            'type="application/ld+json"',
        ],
    },
    {
        filePath: "app/features/[slug]/page.tsx",
        requiredTokens: [
            "articleSchema(",
            "breadcrumbSchema(",
            "@/lib/schema",
            'type="application/ld+json"',
        ],
    },
    {
        filePath: "app/industries/[slug]/page.tsx",
        requiredTokens: [
            "articleSchema(",
            "breadcrumbSchema(",
            "@/lib/schema",
            'type="application/ld+json"',
        ],
    },
    {
        filePath: "app/compare/[slug]/page.tsx",
        requiredTokens: [
            "articleSchema(",
            "breadcrumbSchema(",
            "@/lib/schema",
            'type="application/ld+json"',
        ],
    },
];

function read(filePath) {
    return fs.readFileSync(path.join(projectRoot, filePath), "utf8");
}

function run() {
    const errors = [];

    const schemaDocPath = path.join(projectRoot, "docs/seo/schema-matrix.md");
    if (!fs.existsSync(schemaDocPath)) {
        errors.push("Missing docs/seo/schema-matrix.md.");
    } else {
        const schemaDoc = fs.readFileSync(schemaDocPath, "utf8").toLowerCase();
        for (const requiredTerm of ["organization", "website", "faqpage", "article", "breadcrumblist"]) {
            if (!schemaDoc.includes(requiredTerm)) {
                errors.push(`docs/seo/schema-matrix.md is missing required term: ${requiredTerm}`);
            }
        }
    }

    const schemaLibraryPath = path.join(projectRoot, "lib/schema.ts");
    if (!fs.existsSync(schemaLibraryPath)) {
        errors.push("Missing lib/schema.ts.");
    }

    for (const contract of requiredSchemaContracts) {
        const fullPath = path.join(projectRoot, contract.filePath);
        if (!fs.existsSync(fullPath)) {
            errors.push(`Missing required template file: ${contract.filePath}`);
            continue;
        }

        const content = read(contract.filePath);
        const missingTokens = [];
        for (const token of contract.requiredTokens) {
            if (!content.includes(token)) {
                missingTokens.push(token);
            }
        }

        if (missingTokens.length > 0) {
            errors.push(
                `${contract.filePath} is missing required schema tokens: ${missingTokens.join(", ")}`,
            );
        }
    }

    if (errors.length > 0) {
        console.error("Schema presence check failed:");
        for (const error of errors) {
            console.error(`- ${error}`);
        }
        process.exit(1);
    }

    console.log("Schema presence check passed.");
}

run();
