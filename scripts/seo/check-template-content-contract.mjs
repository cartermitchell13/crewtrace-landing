#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const templateContracts = [
    {
        template: "home",
        filePath: "app/page.tsx",
        requiredTokens: [
            "createPageMetadata",
            "path: \"/\"",
            "<Hero",
            "<FeatureGrid",
            "<TestimonialsSection",
            "<CTASection",
        ],
    },
    {
        template: "features_hub",
        filePath: "app/features/page.tsx",
        requiredTokens: [
            "createPageMetadata",
            "path: \"/features\"",
            "<h1",
            "/features/",
            "/industries/",
        ],
    },
    {
        template: "industries_hub",
        filePath: "app/industries/page.tsx",
        requiredTokens: [
            "createPageMetadata",
            "path: \"/industries\"",
            "<h1",
            "/industries/",
            "/features/",
        ],
    },
    {
        template: "feature_detail",
        filePath: "app/features/[slug]/page.tsx",
        requiredTokens: [
            "createPageMetadata",
            "path: `/features/${slug}`",
            "templateType=\"feature_detail\"",
            "href={detailLinks.parentPath}",
            "/industries/",
        ],
    },
    {
        template: "industry_detail",
        filePath: "app/industries/[slug]/page.tsx",
        requiredTokens: [
            "createPageMetadata",
            "path: `/industries/${slug}`",
            "templateType=\"industry_detail\"",
            "href={detailLinks.parentPath}",
            "/features/",
        ],
    },
    {
        template: "compare_hub",
        filePath: "app/compare/page.tsx",
        requiredTokens: [
            "createPageMetadata",
            "path: \"/compare\"",
            "<h1",
            "/compare/${competitor.slug}",
        ],
    },
    {
        template: "compare_detail",
        filePath: "app/compare/[slug]/page.tsx",
        requiredTokens: [
            "createPageMetadata",
            "path: `/compare/${slug}`",
            "templateType=\"competitor_detail\"",
            "/features/${slug}",
            "/industries/${slug}",
            "/guides/${slug}",
            "/case-studies/${slug}",
        ],
    },
    {
        template: "contact",
        filePath: "app/contact/page.tsx",
        requiredTokens: [
            "<DemoRequestForm",
            "<h1",
            "publicIcpPhrase",
        ],
    },
    {
        template: "contact_form",
        filePath: "components/DemoRequestForm.tsx",
        requiredTokens: [
            "<form",
            "buildLeadFormEvent",
            "fetch(\"/api/lead\"",
        ],
    },
];

function read(relativePath) {
    return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

function run() {
    const errors = [];

    for (const contract of templateContracts) {
        const absolutePath = path.join(projectRoot, contract.filePath);
        if (!fs.existsSync(absolutePath)) {
            errors.push(`${contract.template}: missing file ${contract.filePath}`);
            continue;
        }

        const source = read(contract.filePath);
        for (const token of contract.requiredTokens) {
            if (!source.includes(token)) {
                errors.push(`${contract.template}: ${contract.filePath} missing token "${token}"`);
            }
        }

    }

    if (errors.length > 0) {
        console.error("Template content contract check failed:");
        for (const error of errors) {
            console.error(`- ${error}`);
        }
        process.exit(1);
    }

    console.log(`Template content contract check passed for ${templateContracts.length} templates.`);
}

run();
