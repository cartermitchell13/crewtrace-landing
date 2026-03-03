#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import { getBannedPhrasePatterns, publishQualityRules } from "./lib/publish-quality-rules.mjs";

const projectRoot = process.cwd();

function parseArgs(argv) {
    const args = {};

    for (let index = 0; index < argv.length; index += 1) {
        const token = argv[index];
        if (!token.startsWith("--")) {
            continue;
        }

        const key = token.slice(2);
        const value = argv[index + 1];
        if (!value || value.startsWith("--")) {
            args[key] = "true";
            continue;
        }

        args[key] = value;
        index += 1;
    }

    return args;
}

function normalizePath(filePath) {
    return filePath.replace(/\\/g, "/");
}

function ensureDirectory(filePath) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function collectMarkdownFiles(targetPath) {
    const stat = fs.statSync(targetPath);
    if (stat.isFile()) {
        return targetPath.endsWith(".md") ? [targetPath] : [];
    }

    const files = [];
    const entries = fs.readdirSync(targetPath, { withFileTypes: true });
    for (const entry of entries) {
        const entryPath = path.join(targetPath, entry.name);
        if (entry.isDirectory()) {
            files.push(...collectMarkdownFiles(entryPath));
            continue;
        }

        if (entry.isFile() && entry.name.endsWith(".md")) {
            files.push(entryPath);
        }
    }

    return files;
}

function getChangedFileSet(inputPath) {
    const inputRelative = normalizePath(path.relative(projectRoot, inputPath));
    const command = `git diff --name-only --relative HEAD -- ${inputRelative}`;
    const output = execSync(command, { cwd: projectRoot, encoding: "utf8" });

    return new Set(
        output
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean),
    );
}

function loadRules(rulesPath) {
    if (!rulesPath) {
        return publishQualityRules;
    }

    const absoluteRulesPath = path.isAbsolute(rulesPath)
        ? rulesPath
        : path.join(projectRoot, rulesPath);
    const parsed = JSON.parse(fs.readFileSync(absoluteRulesPath, "utf8"));
    return parsed;
}

function asText(value) {
    return typeof value === "string" ? value.trim() : "";
}

function tokenizeSlug(slug, ignoredTokens) {
    return slug
        .toLowerCase()
        .split("-")
        .map((token) => token.trim())
        .filter((token) => token.length > 0 && !ignoredTokens.includes(token));
}

function countWords(content) {
    return content
        .replace(/[#>*`_\-\[\]\(\)]/g, " ")
        .split(/\s+/)
        .map((token) => token.trim())
        .filter(Boolean).length;
}

function countHeadings(content, pattern) {
    const headingRegex = new RegExp(pattern, "gm");
    return [...content.matchAll(headingRegex)].length;
}

function validateFile(filePath, rules) {
    const source = fs.readFileSync(filePath, "utf8");
    const parsed = matter(source);
    const slug = path.basename(filePath, ".md");
    const errors = [];

    for (const field of rules.requiredFrontmatterFields ?? []) {
        const value = asText(parsed.data[field]);
        if (!value) {
            errors.push(`Missing required frontmatter field: ${field}`);
        }
    }

    const patternEntries = Object.entries(rules.requiredFrontmatterPatterns ?? {});
    for (const [field, pattern] of patternEntries) {
        const value = asText(parsed.data[field]);
        if (!value) {
            continue;
        }

        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
            errors.push(`Frontmatter field "${field}" does not match required pattern ${pattern}`);
        }
    }

    const ignoredTokens = rules.slugTitleConsistency?.ignoredSlugTokens ?? [];
    const slugTokens = tokenizeSlug(slug, ignoredTokens);
    const titleLower = asText(parsed.data.title).toLowerCase();
    const matchedTokens = slugTokens.filter((token) => titleLower.includes(token));
    const minimumMatches = rules.slugTitleConsistency?.minimumSlugTokenMatches ?? 0;
    if (slugTokens.length > 0 && matchedTokens.length < minimumMatches) {
        errors.push(
            `Slug/title consistency failed: matched ${matchedTokens.length}/${minimumMatches} required slug tokens`,
        );
    }

    const wordCount = countWords(parsed.content);
    const minimumWords = rules.requiredBodyRules?.minWordCount ?? 0;
    if (wordCount < minimumWords) {
        errors.push(`Body word count ${wordCount} is below minimum ${minimumWords}`);
    }

    const headingPattern = rules.requiredBodyRules?.headingPattern ?? "^##\\s+";
    const headingCount = countHeadings(parsed.content, headingPattern);
    const minimumHeadings = rules.requiredBodyRules?.minHeadingCount ?? 0;
    if (headingCount < minimumHeadings) {
        errors.push(`Heading count ${headingCount} is below minimum ${minimumHeadings}`);
    }

    const searchableText = `${JSON.stringify(parsed.data)}\n${parsed.content}`;
    for (const banned of getBannedPhrasePatterns(rules)) {
        if (banned.pattern.test(searchableText)) {
            errors.push(`Banned phrase detected: ${banned.phrase}`);
        }
    }

    return {
        file: normalizePath(path.relative(projectRoot, filePath)),
        status: errors.length > 0 ? "fail" : "pass",
        word_count: wordCount,
        heading_count: headingCount,
        errors,
    };
}

function formatTextReport(results, summary) {
    const lines = [];
    lines.push(
        `AI publish gate checked ${summary.checked_files} file(s): ${summary.passed} passed, ${summary.failed} failed.`,
    );

    for (const result of results) {
        if (result.status === "pass") {
            lines.push(`- PASS ${result.file} (words=${result.word_count}, headings=${result.heading_count})`);
            continue;
        }

        lines.push(`- FAIL ${result.file}`);
        for (const error of result.errors) {
            lines.push(`  - ${error}`);
        }
    }

    return `${lines.join("\n")}\n`;
}

function main() {
    const args = parseArgs(process.argv.slice(2));
    const inputArg = args.input;

    if (!inputArg) {
        console.error(
            "Usage: node scripts/content/check-ai-publish-gate.mjs --input <file-or-directory> [--rules <rules.json>] [--format text|json] [--output <file>] [--changed-only] [--expect-fail]",
        );
        process.exit(1);
    }

    const inputPath = path.isAbsolute(inputArg) ? inputArg : path.join(projectRoot, inputArg);
    if (!fs.existsSync(inputPath)) {
        console.error(`Input path not found: ${inputArg}`);
        process.exit(1);
    }

    const rules = loadRules(args.rules);
    const format = args.format === "json" ? "json" : "text";
    const changedOnly = args["changed-only"] === "true";
    const expectFail = args["expect-fail"] === "true";

    const allMarkdownFiles = collectMarkdownFiles(inputPath);
    const changedFileSet = changedOnly ? getChangedFileSet(inputPath) : null;
    const filesToCheck = allMarkdownFiles.filter((filePath) => {
        if (!changedFileSet) {
            return true;
        }

        const relative = normalizePath(path.relative(projectRoot, filePath));
        return changedFileSet.has(relative);
    });

    const results = filesToCheck.map((filePath) => validateFile(filePath, rules));
    const summary = {
        checked_files: results.length,
        passed: results.filter((result) => result.status === "pass").length,
        failed: results.filter((result) => result.status === "fail").length,
        generated_at: new Date().toISOString(),
        rules_version: rules.version ?? "unknown",
    };

    const report = {
        input: normalizePath(path.relative(projectRoot, inputPath)),
        changed_only: changedOnly,
        summary,
        results,
    };

    if (args.output) {
        const outputPath = path.isAbsolute(args.output)
            ? args.output
            : path.join(projectRoot, args.output);
        ensureDirectory(outputPath);
        fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), "utf8");
    }

    if (format === "json") {
        console.log(JSON.stringify(report, null, 2));
    } else {
        process.stdout.write(formatTextReport(results, summary));
    }

    if (expectFail) {
        if (summary.failed === 0) {
            console.error("Expected validator to fail, but all files passed.");
            process.exit(1);
        }
        process.exit(0);
    }

    if (summary.failed > 0) {
        process.exit(1);
    }
}

main();

