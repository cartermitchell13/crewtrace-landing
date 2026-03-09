/**
 * SEO Keyword Research Script using Keywords Everywhere API
 *
 * Usage:
 *   node scripts/seo/keyword-research.mjs --apiKey=YOUR_API_KEY
 *   (or set KEYWORDS_EVERYWHERE_API_KEY env var)
 *
 * Outputs:
 *   - scripts/seo/output/keyword-research-results.json  (raw data)
 *   - scripts/seo/output/keyword-research-report.md     (human-readable report)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "output");
const API_BASE = "https://api.keywordseverywhere.com/v1";

// ── Seed keywords relevant to Crewtrace ──────────────────────────────
const SEED_KEYWORDS = [
    // Core product keywords
    "gps time tracking construction",
    "construction time tracking app",
    "construction crew time tracking",
    "employee gps tracking construction",
    "construction payroll software",
    "job site time tracking",
    "geofencing time tracking",
    "construction labor tracking",
    "field employee time tracking",
    "mobile time tracking construction",

    // Pain-point / problem keywords
    "construction payroll errors",
    "construction time theft",
    "paper timesheet problems construction",
    "construction payroll leakage",
    "construction overtime tracking",

    // Industry keywords
    "hvac time tracking",
    "landscaping time tracking",
    "electrical contractor time tracking",
    "general contractor time tracking",
    "waterproofing crew management",

    // Comparison / alternative keywords
    "busybusy alternative",
    "clockshark alternative",
    "tsheets alternative construction",
    "exaktime alternative",

    // Long-tail / informational keywords
    "how to track construction crew hours",
    "best time tracking app for construction crews",
    "gps time clock for construction workers",
    "construction crew management software",
    "dol audit ready time records construction",
    "flsa compliance construction payroll",
];

// Competitor domains to analyze
const COMPETITOR_DOMAINS = [
    "busybusy.com",
    "clockshark.com",
    "tsheets.intuit.com",
    "exaktime.com",
    "jobnimbus.com",
];

// ── API helper ───────────────────────────────────────────────────────

function getApiKey() {
    // Check CLI arg first: --apiKey=xxx
    const cliArg = process.argv.find((a) => a.startsWith("--apiKey="));
    if (cliArg) return cliArg.split("=")[1];

    // Fall back to env var
    if (process.env.KEYWORDS_EVERYWHERE_API_KEY) {
        return process.env.KEYWORDS_EVERYWHERE_API_KEY;
    }

    console.error(
        "❌  No API key provided.\n" +
        "   Pass --apiKey=YOUR_KEY  or set KEYWORDS_EVERYWHERE_API_KEY env var.\n"
    );
    process.exit(1);
}

async function apiPost(endpoint, body, apiKey) {
    const url = `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(body).toString(),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API ${endpoint} failed (${res.status}): ${text}`);
    }
    return res.json();
}

async function apiGet(endpoint, apiKey) {
    const url = `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API ${endpoint} failed (${res.status}): ${text}`);
    }
    return res.json();
}

// ── API calls ────────────────────────────────────────────────────────

async function getCredits(apiKey) {
    return apiGet("/account/credits", apiKey);
}

async function getKeywordData(keywords, apiKey) {
    // API accepts up to 100 keywords per call
    const params = {};
    keywords.forEach((kw, i) => {
        params[`kw[${i}]`] = kw;
    });
    params.country = "us";
    params.currency = "usd";
    params.dataSource = "cli"; // clickstream + GKP for richer data

    return apiPost("/keywords/data", params, apiKey);
}

async function getRelatedKeywords(keyword, apiKey) {
    return apiPost(
        "/keywords/related",
        { keyword, num: "50" },
        apiKey
    );
}

async function getPasfKeywords(keyword, apiKey) {
    return apiPost(
        "/keywords/pasf",
        { keyword, num: "50" },
        apiKey
    );
}

async function getDomainKeywords(domain, apiKey) {
    return apiPost(
        "/keywords/domain",
        { domain, country: "us", num: "100" },
        apiKey
    );
}

// ── Scoring & clustering ─────────────────────────────────────────────

function scoreKeyword(kw) {
    const vol = kw.vol ?? 0;
    const competition = kw.competition ?? 1;
    // Higher volume + lower competition = higher opportunity
    const opportunityScore = vol * (1 - Math.min(competition, 1));
    return { ...kw, opportunityScore: Math.round(opportunityScore) };
}

function clusterKeywords(keywords) {
    const clusters = {
        "Core Product": [],
        "Pain Points / Problems": [],
        "Industry-Specific": [],
        "Competitor Alternatives": [],
        "How-To / Informational": [],
        "Compliance / Legal": [],
        Other: [],
    };

    for (const kw of keywords) {
        const lower = (kw.keyword ?? "").toLowerCase();

        if (lower.includes("alternative") || lower.includes("vs ") || lower.includes("vs.")) {
            clusters["Competitor Alternatives"].push(kw);
        } else if (
            lower.includes("how to") ||
            lower.includes("best ") ||
            lower.includes("what is") ||
            lower.includes("guide")
        ) {
            clusters["How-To / Informational"].push(kw);
        } else if (
            lower.includes("dol") ||
            lower.includes("flsa") ||
            lower.includes("compliance") ||
            lower.includes("audit")
        ) {
            clusters["Compliance / Legal"].push(kw);
        } else if (
            lower.includes("hvac") ||
            lower.includes("landscap") ||
            lower.includes("electrical") ||
            lower.includes("general contractor") ||
            lower.includes("waterproof") ||
            lower.includes("plumb") ||
            lower.includes("roofing")
        ) {
            clusters["Industry-Specific"].push(kw);
        } else if (
            lower.includes("error") ||
            lower.includes("theft") ||
            lower.includes("problem") ||
            lower.includes("leakage") ||
            lower.includes("losing money")
        ) {
            clusters["Pain Points / Problems"].push(kw);
        } else if (
            lower.includes("time tracking") ||
            lower.includes("time clock") ||
            lower.includes("payroll") ||
            lower.includes("crew management") ||
            lower.includes("labor tracking") ||
            lower.includes("geofenc")
        ) {
            clusters["Core Product"].push(kw);
        } else {
            clusters["Other"].push(kw);
        }
    }

    // Sort each cluster by opportunity score
    for (const key of Object.keys(clusters)) {
        clusters[key].sort((a, b) => (b.opportunityScore ?? 0) - (a.opportunityScore ?? 0));
    }

    return clusters;
}

// ── Report generation ────────────────────────────────────────────────

function generateReport(results) {
    const lines = [];
    lines.push("# 🔍 Crewtrace Keyword Research Report");
    lines.push("");
    lines.push(`*Generated: ${new Date().toISOString().split("T")[0]}*`);
    lines.push("");
    lines.push("---");
    lines.push("");

    // Credits
    if (results.credits) {
        lines.push(`> **Credits remaining:** ${results.credits.credits ?? "N/A"}`);
        lines.push("");
    }

    // Keyword data table
    if (results.keywordData?.length) {
        lines.push("## 📊 Seed Keyword Metrics");
        lines.push("");
        lines.push(
            "| Keyword | Monthly Volume | CPC | Competition | Opportunity Score |"
        );
        lines.push("|---------|---------------|-----|-------------|-------------------|");
        const sorted = [...results.keywordData].sort(
            (a, b) => (b.opportunityScore ?? 0) - (a.opportunityScore ?? 0)
        );
        for (const kw of sorted) {
            const vol = kw.vol ?? 0;
            const cpc = kw.cpc?.value ?? "N/A";
            const comp = typeof kw.competition === "number" ? kw.competition.toFixed(2) : "N/A";
            const score = kw.opportunityScore ?? 0;
            lines.push(`| ${kw.keyword} | ${vol.toLocaleString()} | $${cpc} | ${comp} | ${score} |`);
        }
        lines.push("");
    }

    // Clustered keywords
    if (results.clusters) {
        lines.push("## 🗂️ Keyword Clusters");
        lines.push("");
        for (const [clusterName, keywords] of Object.entries(results.clusters)) {
            if (keywords.length === 0) continue;
            lines.push(`### ${clusterName}`);
            lines.push("");
            lines.push("| Keyword | Volume | Competition | Score |");
            lines.push("|---------|--------|-------------|-------|");
            for (const kw of keywords.slice(0, 15)) {
                const vol = kw.vol ?? 0;
                const comp =
                    typeof kw.competition === "number" ? kw.competition.toFixed(2) : "N/A";
                lines.push(
                    `| ${kw.keyword} | ${vol.toLocaleString()} | ${comp} | ${kw.opportunityScore ?? 0} |`
                );
            }
            lines.push("");
        }
    }

    // Related keywords
    if (results.relatedKeywords) {
        lines.push("## 🔗 Related Keywords (Top Seeds)");
        lines.push("");
        for (const [seed, related] of Object.entries(results.relatedKeywords)) {
            if (!related?.length) continue;
            lines.push(`### Seed: "${seed}"`);
            lines.push("");
            lines.push(related.slice(0, 10).map((r) => `- ${r}`).join("\n"));
            lines.push("");
        }
    }

    // PASF keywords
    if (results.pasfKeywords) {
        lines.push("## 🔎 People Also Search For (Top Seeds)");
        lines.push("");
        for (const [seed, pasf] of Object.entries(results.pasfKeywords)) {
            if (!pasf?.length) continue;
            lines.push(`### Seed: "${seed}"`);
            lines.push("");
            lines.push(pasf.slice(0, 10).map((p) => `- ${p}`).join("\n"));
            lines.push("");
        }
    }

    // Competitor keywords
    if (results.competitorKeywords) {
        lines.push("## 🏆 Competitor Keyword Analysis");
        lines.push("");
        for (const [domain, keywords] of Object.entries(results.competitorKeywords)) {
            if (!keywords?.length) continue;
            lines.push(`### ${domain}`);
            lines.push("");
            lines.push("| Keyword | SERP Position | Est. Monthly Traffic |");
            lines.push("|---------|---------------|---------------------|");
            for (const kw of keywords.slice(0, 15)) {
                lines.push(
                    `| ${kw.keyword} | ${kw.serp_position ?? "N/A"} | ${kw.estimated_monthly_traffic ?? "N/A"} |`
                );
            }
            lines.push("");
        }
    }

    // Content recommendations
    lines.push("## 📝 Content Recommendations");
    lines.push("");
    lines.push("Based on the keyword data, here are the top content opportunities:");
    lines.push("");

    if (results.clusters) {
        const allScored = Object.values(results.clusters)
            .flat()
            .sort((a, b) => (b.opportunityScore ?? 0) - (a.opportunityScore ?? 0));

        const topOpportunities = allScored.slice(0, 10);
        topOpportunities.forEach((kw, i) => {
            const type = kw.keyword?.includes("how to") || kw.keyword?.includes("best ")
                ? "Blog Post"
                : kw.keyword?.includes("alternative")
                    ? "Comparison Page"
                    : "Guide / Landing Page";
            lines.push(
                `${i + 1}. **\"${kw.keyword}\"** (Vol: ${(kw.vol ?? 0).toLocaleString()}, Score: ${kw.opportunityScore ?? 0}) → ${type}`
            );
        });
    }

    lines.push("");
    lines.push("---");
    lines.push("");
    lines.push(
        "> *Use this report to prioritize which content to create first. Focus on keywords with high opportunity scores and low competition.*"
    );

    return lines.join("\n");
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
    const apiKey = getApiKey();
    const results = {};

    // Ensure output dir exists
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    // 1. Check credits
    console.log("💰  Checking credit balance...");
    try {
        results.credits = await getCredits(apiKey);
        console.log(`   Credits remaining: ${results.credits.credits ?? "unknown"}`);
    } catch (err) {
        console.warn(`   ⚠️  Could not check credits: ${err.message}`);
    }

    // 2. Get keyword data for all seed keywords
    console.log(`\n🔑  Fetching keyword data for ${SEED_KEYWORDS.length} seed keywords...`);
    try {
        const response = await getKeywordData(SEED_KEYWORDS, apiKey);
        results.keywordData = (response.data ?? []).map(scoreKeyword);
        console.log(`   Retrieved data for ${results.keywordData.length} keywords`);
    } catch (err) {
        console.error(`   ❌  Keyword data error: ${err.message}`);
        results.keywordData = [];
    }

    // 3. Get related keywords for top 3 seed keywords
    const topSeeds = [
        "construction time tracking app",
        "gps time tracking construction",
        "job site time tracking",
    ];
    console.log(`\n🔗  Fetching related keywords for ${topSeeds.length} top seeds...`);
    results.relatedKeywords = {};
    for (const seed of topSeeds) {
        try {
            const response = await getRelatedKeywords(seed, apiKey);
            results.relatedKeywords[seed] = response.data ?? [];
            console.log(`   "${seed}" → ${results.relatedKeywords[seed].length} related keywords`);
        } catch (err) {
            console.warn(`   ⚠️  Related keywords for "${seed}": ${err.message}`);
        }
    }

    // 4. Get PASF for top 3 seeds
    console.log(`\n🔎  Fetching "People Also Search For" for ${topSeeds.length} seeds...`);
    results.pasfKeywords = {};
    for (const seed of topSeeds) {
        try {
            const response = await getPasfKeywords(seed, apiKey);
            results.pasfKeywords[seed] = response.data ?? [];
            console.log(`   "${seed}" → ${results.pasfKeywords[seed].length} PASF keywords`);
        } catch (err) {
            console.warn(`   ⚠️  PASF for "${seed}": ${err.message}`);
        }
    }

    // 5. Competitor domain keyword analysis (top 2 to conserve credits)
    const competitorsToAnalyze = COMPETITOR_DOMAINS.slice(0, 2);
    console.log(`\n🏆  Analyzing ${competitorsToAnalyze.length} competitor domains...`);
    results.competitorKeywords = {};
    for (const domain of competitorsToAnalyze) {
        try {
            const response = await getDomainKeywords(domain, apiKey);
            results.competitorKeywords[domain] = response.data ?? [];
            console.log(
                `   ${domain} → ${results.competitorKeywords[domain].length} keywords`
            );
        } catch (err) {
            console.warn(`   ⚠️  Domain keywords for ${domain}: ${err.message}`);
        }
    }

    // 6. Cluster & score
    console.log("\n🗂️  Clustering keywords...");
    const allKeywords = [
        ...(results.keywordData ?? []),
    ];

    // Also get keyword data for related/PASF (collect unique new keywords)
    const discoveredKeywords = new Set();
    for (const relatedList of Object.values(results.relatedKeywords)) {
        relatedList?.forEach((kw) => discoveredKeywords.add(kw));
    }
    for (const pasfList of Object.values(results.pasfKeywords)) {
        pasfList?.forEach((kw) => discoveredKeywords.add(kw));
    }

    // Get metrics for discovered keywords (batch of up to 100)
    const newKeywords = [...discoveredKeywords]
        .filter((kw) => !SEED_KEYWORDS.includes(kw))
        .slice(0, 100);
    if (newKeywords.length > 0) {
        console.log(
            `\n📈  Getting metrics for ${newKeywords.length} discovered keywords...`
        );
        try {
            const response = await getKeywordData(newKeywords, apiKey);
            const scored = (response.data ?? []).map(scoreKeyword);
            allKeywords.push(...scored);
            console.log(`   Retrieved data for ${scored.length} additional keywords`);
        } catch (err) {
            console.warn(`   ⚠️  Discovered keyword data error: ${err.message}`);
        }
    }

    // De-duplicate
    const seen = new Set();
    const deduped = allKeywords.filter((kw) => {
        if (seen.has(kw.keyword)) return false;
        seen.add(kw.keyword);
        return true;
    });

    results.clusters = clusterKeywords(deduped);
    const clusterCounts = Object.entries(results.clusters)
        .map(([name, kws]) => `${name}: ${kws.length}`)
        .join(", ");
    console.log(`   Clusters: ${clusterCounts}`);

    // 7. Save results
    const jsonPath = path.join(OUTPUT_DIR, "keyword-research-results.json");
    fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
    console.log(`\n💾  Raw data saved to ${jsonPath}`);

    const reportPath = path.join(OUTPUT_DIR, "keyword-research-report.md");
    const report = generateReport(results);
    fs.writeFileSync(reportPath, report);
    console.log(`📄  Report saved to ${reportPath}`);

    console.log("\n✅  Keyword research complete!");
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
