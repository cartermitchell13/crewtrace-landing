#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const targetFiles = [
    {
        filePath: "components/Hero.tsx",
        requiredTokens: ["getTemplateMessaging", "publicIcpPhrase"],
    },
    {
        filePath: "components/CTASection.tsx",
        requiredTokens: ["getTemplateMessaging", "orderedPromiseLine"],
    },
    {
        filePath: "app/page.tsx",
        requiredTokens: ["@/lib/messaging", "orderedPromiseLine"],
    },
    {
        filePath: "app/features/page.tsx",
        requiredTokens: ["@/lib/messaging", "/features/", "/industries/"],
    },
    {
        filePath: "app/industries/page.tsx",
        requiredTokens: ["@/lib/messaging", "/industries/", "/features/"],
    },
    {
        filePath: "app/features/[slug]/page.tsx",
        requiredTokens: ["@/lib/messaging", "templateType=\"feature_detail\""],
    },
    {
        filePath: "app/industries/[slug]/page.tsx",
        requiredTokens: ["@/lib/messaging", "templateType=\"industry_detail\""],
    },
    {
        filePath: "app/compare/page.tsx",
        requiredTokens: ["@/lib/messaging", "/compare/${competitor.slug}"],
    },
    {
        filePath: "app/compare/[slug]/page.tsx",
        requiredTokens: ["@/lib/messaging", "templateType=\"competitor_detail\""],
    },
    {
        filePath: "app/contact/page.tsx",
        requiredTokens: ["@/lib/messaging", "buildLeadFormEvent"],
    },
];

const bannedPublicPhrases = ["11-50 employees", "$500k-$5M"];

function read(relativePath) {
    return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

function run() {
    const errors = [];

    const guardrailDocPath = path.join(projectRoot, "docs/seo/icp-messaging-guardrails.md");
    if (!fs.existsSync(guardrailDocPath)) {
        errors.push("Missing docs/seo/icp-messaging-guardrails.md.");
    } else {
        const guardrails = fs.readFileSync(guardrailDocPath, "utf8").toLowerCase();
        for (const requiredTerm of [
            "multiple crews",
            "reduce payroll overpayment",
            "compliance",
            "admin time",
            "headline",
            "cta",
        ]) {
            if (!guardrails.includes(requiredTerm)) {
                errors.push(`icp-messaging-guardrails.md is missing required phrase: ${requiredTerm}`);
            }
        }
    }

    const messagingLibraryPath = path.join(projectRoot, "lib/messaging.ts");
    if (!fs.existsSync(messagingLibraryPath)) {
        errors.push("Missing lib/messaging.ts.");
    } else {
        const messagingLibrary = fs.readFileSync(messagingLibraryPath, "utf8");
        for (const requiredExport of [
            "intentHeadlineOptions",
            "proofLedBodyHelpers",
            "ctaFramingVariants",
            "getTemplateMessaging",
        ]) {
            if (!messagingLibrary.includes(requiredExport)) {
                errors.push(`lib/messaging.ts must export ${requiredExport}.`);
            }
        }
    }

    for (const target of targetFiles) {
        const absoluteFilePath = path.join(projectRoot, target.filePath);
        if (!fs.existsSync(absoluteFilePath)) {
            errors.push(`Missing target file: ${target.filePath}`);
            continue;
        }

        const content = read(target.filePath);
        if (!content.includes("@/lib/messaging")) {
            errors.push(`${target.filePath} must import messaging helpers from @/lib/messaging.`);
        }

        if (
            !content.includes("publicIcpPhrase") &&
            !content.includes("orderedPromiseLine") &&
            !content.includes("getTemplateMessaging")
        ) {
            errors.push(
                `${target.filePath} must use getTemplateMessaging, publicIcpPhrase, or orderedPromiseLine.`,
            );
        }

        for (const token of target.requiredTokens) {
            if (!content.includes(token)) {
                errors.push(`${target.filePath} is missing required messaging token: "${token}".`);
            }
        }

        for (const banned of bannedPublicPhrases) {
            if (content.includes(banned)) {
                errors.push(`${target.filePath} contains disallowed public qualifier phrase: "${banned}"`);
            }
        }
    }

    if (errors.length > 0) {
        console.error("Messaging guardrail check failed:");
        for (const error of errors) {
            console.error(`- ${error}`);
        }
        process.exit(1);
    }

    console.log(`Messaging guardrail check passed for ${targetFiles.length} files.`);
}

run();
