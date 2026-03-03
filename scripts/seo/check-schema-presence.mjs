import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const requiredTokensByFile = {
    "app/layout.tsx": ["organizationSchema()", "websiteSchema()", "@/lib/schema"],
    "app/page.tsx": ["faqSchema(", "homeFaqItems", "@/lib/schema"],
    "app/blog/[slug]/page.tsx": ["articleSchema(", "breadcrumbSchema(", "@/lib/schema"],
    "app/guides/[slug]/page.tsx": ["articleSchema(", "breadcrumbSchema(", "@/lib/schema"],
    "app/case-studies/[slug]/page.tsx": ["articleSchema(", "breadcrumbSchema(", "@/lib/schema"],
    "app/features/[slug]/page.tsx": ["articleSchema(", "breadcrumbSchema(", "@/lib/schema"],
    "app/industries/[slug]/page.tsx": ["articleSchema(", "breadcrumbSchema(", "@/lib/schema"],
};

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

    for (const [filePath, requiredTokens] of Object.entries(requiredTokensByFile)) {
        const fullPath = path.join(projectRoot, filePath);
        if (!fs.existsSync(fullPath)) {
            errors.push(`Missing required template file: ${filePath}`);
            continue;
        }

        const content = read(filePath);
        for (const token of requiredTokens) {
            if (!content.includes(token)) {
                errors.push(`${filePath} is missing required schema token: ${token}`);
            }
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

