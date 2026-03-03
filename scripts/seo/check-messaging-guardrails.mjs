import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const targetFiles = [
    "components/Hero.tsx",
    "components/CTASection.tsx",
    "components/FAQSection.tsx",
    "app/page.tsx",
    "app/industries/page.tsx",
    "app/features/[slug]/page.tsx",
    "app/industries/[slug]/page.tsx",
];

const bannedPublicPhrases = ["11-50 employees", "$500k-$5M"];

function read(filePath) {
    return fs.readFileSync(path.join(projectRoot, filePath), "utf8");
}

function run() {
    const errors = [];

    const guardrailDocPath = path.join(projectRoot, "docs/seo/icp-messaging-guardrails.md");
    if (!fs.existsSync(guardrailDocPath)) {
        errors.push("Missing docs/seo/icp-messaging-guardrails.md.");
    } else {
        const guardrails = fs.readFileSync(guardrailDocPath, "utf8").toLowerCase();
        for (const requiredTerm of ["multiple crews", "reduce payroll overpayment", "compliance", "admin time"]) {
            if (!guardrails.includes(requiredTerm)) {
                errors.push(`icp-messaging-guardrails.md is missing required phrase: ${requiredTerm}`);
            }
        }
    }

    const messagingLibraryPath = path.join(projectRoot, "lib/messaging.ts");
    if (!fs.existsSync(messagingLibraryPath)) {
        errors.push("Missing lib/messaging.ts.");
    }

    for (const filePath of targetFiles) {
        if (!fs.existsSync(path.join(projectRoot, filePath))) {
            errors.push(`Missing target file: ${filePath}`);
            continue;
        }

        const content = read(filePath);

        if (!content.includes("@/lib/messaging")) {
            errors.push(`${filePath} must import messaging helpers from @/lib/messaging.`);
        }

        if (!content.includes("publicIcpPhrase") && !content.includes("orderedPromiseLine")) {
            errors.push(`${filePath} must use publicIcpPhrase or orderedPromiseLine.`);
        }

        for (const banned of bannedPublicPhrases) {
            if (content.includes(banned)) {
                errors.push(`${filePath} contains disallowed public qualifier phrase: "${banned}"`);
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

    console.log("Messaging guardrail check passed.");
}

run();

