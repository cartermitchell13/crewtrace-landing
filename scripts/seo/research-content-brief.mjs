#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const projectRoot = process.cwd()
const defaultOutputRoot = path.join(projectRoot, "scripts", "seo", "output", "content-briefs")
const defaultOpinionFile = path.join(projectRoot, "docs", "seo", "crewtrace-category-point-of-view.md")
const defaultAuthor = "Carter Mitchell"
const defaultCategory = "Time Tracking"
const defaultResultCount = 5
const defaultExtractionChars = 7000

function parseArgs(argv) {
    const args = {}

    for (let index = 0; index < argv.length; index += 1) {
        const token = argv[index]
        if (!token.startsWith("--")) {
            continue
        }

        const key = token.slice(2)
        const value = argv[index + 1]
        if (!value || value.startsWith("--")) {
            args[key] = "true"
            continue
        }

        args[key] = value
        index += 1
    }

    return args
}

function getRequiredArg(args, key) {
    const value = args[key]
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`Missing required argument: --${key}`)
    }

    return value.trim()
}

function asOptionalString(value) {
    return typeof value === "string" && value.trim().length > 0 ? value.trim() : null
}

function getApiKey(args, argKey, envKey) {
    const fromArg = asOptionalString(args[argKey])
    if (fromArg) {
        return fromArg
    }

    const fromEnv = asOptionalString(process.env[envKey])
    return fromEnv
}

function parseInteger(value, fallback) {
    const numeric = Number.parseInt(String(value ?? ""), 10)
    return Number.isFinite(numeric) && numeric > 0 ? numeric : fallback
}

function ensureDirectory(targetPath) {
    fs.mkdirSync(targetPath, { recursive: true })
}

function toIsoDate() {
    return new Date().toISOString().slice(0, 10)
}

function slugify(input) {
    return String(input ?? "")
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-{2,}/g, "-")
}

function normalizeWhitespace(value) {
    return String(value ?? "")
        .replace(/\r/g, "")
        .replace(/\t/g, " ")
        .replace(/[ \u00a0]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
}

function stripMarkdownFence(value) {
    return normalizeWhitespace(value).replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/i, "").trim()
}

function readTextFile(filePath) {
    return fs.readFileSync(filePath, "utf8")
}

function decodeHtmlEntities(value) {
    return value
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, "\"")
        .replace(/&#39;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
}

function extractTextFromHtml(html) {
    const withoutScripts = String(html ?? "")
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
        .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
        .replace(/<header[\s\S]*?<\/header>/gi, " ")
        .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
        .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
        .replace(/<aside[\s\S]*?<\/aside>/gi, " ")
        .replace(/<form[\s\S]*?<\/form>/gi, " ")
        .replace(/<[^>]+>/g, " ")

    return normalizeWhitespace(decodeHtmlEntities(withoutScripts))
}

function limitCharacters(value, maxCharacters) {
    const normalized = normalizeWhitespace(value)
    if (normalized.length <= maxCharacters) {
        return normalized
    }

    return `${normalized.slice(0, maxCharacters).trim()}...`
}

function escapePipe(value) {
    return String(value ?? "").replace(/\|/g, "\\|")
}

function getDomainName(rawUrl) {
    try {
        return new URL(rawUrl).hostname.replace(/^www\./, "")
    } catch {
        return rawUrl
    }
}

async function postJson(url, body, headers = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(body),
    })

    const responseText = await response.text()
    if (!response.ok) {
        throw new Error(`Request failed (${response.status}) for ${url}: ${responseText}`)
    }

    return responseText ? JSON.parse(responseText) : {}
}

async function fetchSerperResults(keyword, apiKey, resultCount) {
    const payload = await postJson(
        "https://google.serper.dev/search",
        {
            q: keyword,
            num: resultCount,
            gl: "us",
            hl: "en",
        },
        {
            "X-API-KEY": apiKey,
        },
    )

    return {
        organic: Array.isArray(payload.organic) ? payload.organic : [],
        peopleAlsoAsk: Array.isArray(payload.peopleAlsoAsk) ? payload.peopleAlsoAsk : [],
        relatedSearches: Array.isArray(payload.relatedSearches) ? payload.relatedSearches : [],
    }
}

async function fetchExaContents(urls, apiKey, maxCharacters) {
    if (!apiKey || urls.length === 0) {
        return new Map()
    }

    const payload = await postJson(
        "https://api.exa.ai/contents",
        {
            urls,
            text: true,
        },
        {
            "x-api-key": apiKey,
        },
    )

    const contentByUrl = new Map()
    const statusByUrl = new Map()

    for (const item of payload.results ?? []) {
        const itemUrl = item.url ?? item.id
        if (!itemUrl) {
            continue
        }

        contentByUrl.set(itemUrl, {
            method: "exa",
            text: limitCharacters(normalizeWhitespace(item.text ?? item.context ?? ""), maxCharacters),
        })
    }

    for (const item of payload.statuses ?? []) {
        if (!item?.id) {
            continue
        }

        statusByUrl.set(item.id, item)
    }

    for (const url of urls) {
        if (contentByUrl.has(url)) {
            continue
        }

        const status = statusByUrl.get(url)
        contentByUrl.set(url, {
            method: "exa",
            text: "",
            error: status?.error
                ? `${status.error.tag ?? "EXTRACTION_ERROR"} (${status.error.httpStatusCode ?? "n/a"})`
                : "No content returned by Exa.",
        })
    }

    return contentByUrl
}

async function fetchFallbackText(url, maxCharacters) {
    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (compatible; CrewtraceSEOResearch/1.0; +https://getcrewtrace.com)",
        },
    })

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
    }

    const html = await response.text()
    return {
        method: "fetch",
        text: limitCharacters(extractTextFromHtml(html), maxCharacters),
    }
}

async function resolveSourceContent(result, exaContentByUrl, maxCharacters) {
    const exaContent = exaContentByUrl.get(result.link)
    if (exaContent?.text) {
        return {
            extractionMethod: exaContent.method,
            extractedText: limitCharacters(exaContent.text, maxCharacters),
            extractionError: null,
        }
    }

    try {
        const fallback = await fetchFallbackText(result.link, maxCharacters)
        return {
            extractionMethod: fallback.method,
            extractedText: fallback.text,
            extractionError: exaContent?.error ?? null,
        }
    } catch (error) {
        return {
            extractionMethod: exaContent?.method ?? "none",
            extractedText: "",
            extractionError: exaContent?.error ?? (error instanceof Error ? error.message : String(error)),
        }
    }
}

function buildPromptText({
    keyword,
    title,
    slug,
    category,
    date,
    author,
    briefPath,
    opinionPath,
}) {
    return [
        `Write a Crewtrace SEO article for the target keyword "${keyword}".`,
        "",
        `Read these documents first:`,
        `- Research brief: ${briefPath}`,
        `- Crewtrace point of view: ${opinionPath}`,
        "",
        `Write the final draft directly to content/blog/${slug}.md.`,
        "",
        `Hard requirements:`,
        `- Keep the frontmatter fields exactly: title, excerpt, date, category, readTime, author.`,
        `- Use this frontmatter seed:`,
        `  title: "${title}"`,
        `  date: "${date}"`,
        `  category: "${category}"`,
        `  author: "${author}"`,
        `- Write in plain markdown.`,
        `- Include at least 3 H2 sections so the publish gate passes.`,
        `- Avoid unsupported guarantees and banned phrases from scripts/content/lib/publish-quality-rules.mjs.`,
        `- Use cautious sourcing language for anything learned from competitor pages or external sources.`,
        `- Blend Crewtrace's point of view with what ranking pages cover, but do not copy their structure or wording.`,
        `- End with a CTA that points to /contact.`,
        "",
        `After writing, run: npm run content:check-publish -- --input content/blog/${slug}.md`,
    ].join("\n")
}

function buildBriefMarkdown({
    keyword,
    title,
    slug,
    route,
    date,
    category,
    author,
    serper,
    sources,
    opinionFilePath,
    opinionText,
}) {
    const lines = []
    lines.push("# Crewtrace SEO Content Brief")
    lines.push("")
    lines.push(`- Generated: ${date}`)
    lines.push(`- Target keyword: ${keyword}`)
    lines.push(`- Suggested title: ${title}`)
    lines.push(`- Suggested slug: ${slug}`)
    lines.push(`- Publish route: ${route}`)
    lines.push(`- Category: ${category}`)
    lines.push(`- Author: ${author}`)
    lines.push("")
    lines.push("## Drafting Goal")
    lines.push("")
    lines.push(
        "Write an article that matches the dominant search intent in Google's top results, while keeping Crewtrace's perspective on payroll leakage, audit readiness, and field-proofed time data."
    )
    lines.push("")
    lines.push("## Search Results")
    lines.push("")
    lines.push("| Rank | Domain | Title | URL | Snippet |")
    lines.push("| --- | --- | --- | --- | --- |")
    for (const source of sources) {
        lines.push(
            `| ${source.rank} | ${escapePipe(source.domain)} | ${escapePipe(source.title)} | ${escapePipe(source.url)} | ${escapePipe(source.snippet)} |`
        )
    }
    lines.push("")

    if (serper.peopleAlsoAsk.length > 0) {
        lines.push("## People Also Ask")
        lines.push("")
        for (const item of serper.peopleAlsoAsk.slice(0, 8)) {
            lines.push(`- ${item.question ?? item.title ?? ""}`)
        }
        lines.push("")
    }

    if (serper.relatedSearches.length > 0) {
        lines.push("## Related Searches")
        lines.push("")
        for (const item of serper.relatedSearches.slice(0, 8)) {
            lines.push(`- ${item.query ?? item.title ?? ""}`)
        }
        lines.push("")
    }

    lines.push("## Crewtrace POV")
    lines.push("")
    lines.push(`Source: ${opinionFilePath}`)
    lines.push("")
    lines.push(stripMarkdownFence(opinionText))
    lines.push("")

    lines.push("## Competitor Content Extracts")
    lines.push("")
    for (const source of sources) {
        lines.push(`### Rank ${source.rank}: ${source.title}`)
        lines.push("")
        lines.push(`- Domain: ${source.domain}`)
        lines.push(`- URL: ${source.url}`)
        lines.push(`- Extraction method: ${source.extractionMethod}`)
        if (source.extractionError) {
            lines.push(`- Extraction note: ${source.extractionError}`)
        }
        lines.push("")
        lines.push(source.extractedText || "_No extractable text found for this result._")
        lines.push("")
    }

    lines.push("## Publish Gate Checklist")
    lines.push("")
    lines.push("- Required frontmatter: title, excerpt, date, category, readTime")
    lines.push("- Use YYYY-MM-DD date format")
    lines.push("- Use `<number> min read` format for readTime")
    lines.push("- Include at least 3 `##` headings")
    lines.push("- Keep word count above 250")
    lines.push("- Avoid unsupported guarantees or broad universal claims")
    lines.push("")

    return `${lines.join("\n")}\n`
}

async function main() {
    const args = parseArgs(process.argv.slice(2))
    const keyword = getRequiredArg(args, "keyword")
    const title = asOptionalString(args.title) ?? keyword.replace(/\b\w/g, (match) => match.toUpperCase())
    const slug = asOptionalString(args.slug) ?? slugify(title || keyword)
    const category = asOptionalString(args.category) ?? defaultCategory
    const author = asOptionalString(args.author) ?? defaultAuthor
    const date = asOptionalString(args.date) ?? toIsoDate()
    const route = `/blog/${slug}`
    const outputRoot = asOptionalString(args.output) ? path.resolve(projectRoot, args.output) : defaultOutputRoot
    const opinionFilePath = asOptionalString(args["opinion-file"])
        ? path.resolve(projectRoot, args["opinion-file"])
        : defaultOpinionFile
    const resultCount = parseInteger(args.top, defaultResultCount)
    const maxCharacters = parseInteger(args["max-characters"], defaultExtractionChars)

    if (!fs.existsSync(opinionFilePath)) {
        throw new Error(`Point-of-view file not found: ${opinionFilePath}`)
    }

    const serperApiKey = getApiKey(args, "serper-key", "SERPER_API_KEY")
    if (!serperApiKey) {
        throw new Error("Missing Serper API key. Set SERPER_API_KEY or pass --serper-key.")
    }

    const exaApiKey = getApiKey(args, "exa-key", "EXA_API_KEY")
    const opinionText = readTextFile(opinionFilePath)
    const briefDirectory = path.join(outputRoot, slug)
    ensureDirectory(briefDirectory)

    const serper = await fetchSerperResults(keyword, serperApiKey, resultCount)
    const organicResults = serper.organic
        .filter((item) => typeof item.link === "string" && item.link.startsWith("http"))
        .slice(0, resultCount)
        .map((item, index) => ({
            rank: Number(item.position ?? index + 1),
            title: normalizeWhitespace(item.title ?? ""),
            url: item.link,
            domain: getDomainName(item.link),
            snippet: normalizeWhitespace(item.snippet ?? ""),
        }))

    const exaContentsByUrl = await fetchExaContents(
        organicResults.map((result) => result.url),
        exaApiKey,
        maxCharacters,
    )

    const sourceRecords = []
    for (const result of organicResults) {
        const content = await resolveSourceContent(
            {
                link: result.url,
            },
            exaContentsByUrl,
            maxCharacters,
        )

        sourceRecords.push({
            ...result,
            extractionMethod: content.extractionMethod,
            extractionError: content.extractionError,
            extractedText: content.extractedText,
        })
    }

    const briefMarkdown = buildBriefMarkdown({
        keyword,
        title,
        slug,
        route,
        date,
        category,
        author,
        serper,
        sources: sourceRecords,
        opinionFilePath,
        opinionText,
    })

    const briefPath = path.join(briefDirectory, "research-brief.md")
    const promptPath = path.join(briefDirectory, "draft-prompt.txt")
    const dataPath = path.join(briefDirectory, "research-data.json")

    const promptText = buildPromptText({
        keyword,
        title,
        slug,
        category,
        date,
        author,
        briefPath,
        opinionPath: opinionFilePath,
    })

    fs.writeFileSync(briefPath, briefMarkdown, "utf8")
    fs.writeFileSync(promptPath, `${promptText}\n`, "utf8")
    fs.writeFileSync(
        dataPath,
        JSON.stringify(
            {
                schema_version: "1.0.0",
                generated_at: new Date().toISOString(),
                keyword,
                title,
                slug,
                route,
                category,
                author,
                opinion_file: opinionFilePath,
                serper,
                sources: sourceRecords,
            },
            null,
            2,
        ),
        "utf8",
    )

    console.log(`Built SEO research brief for "${keyword}"`)
    console.log(`Wrote ${briefPath}`)
    console.log(`Wrote ${promptPath}`)
    console.log(`Wrote ${dataPath}`)
    if (!exaApiKey) {
        console.log("Exa API key not provided. The script used direct page fetching as a fallback extractor.")
    }
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
})
