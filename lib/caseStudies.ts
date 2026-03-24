import fs from "fs";
import path from "path";
import matter from "gray-matter";

const caseStudiesDirectory = path.join(process.cwd(), "content/case-studies");
const requiredFrontmatterFields = [
    "title",
    "industry",
    "summary",
    "challenge",
    "quote",
    "author",
    "company",
] as const;

type RequiredFrontmatterField = (typeof requiredFrontmatterFields)[number];
type CaseStudyFrontmatter = Record<RequiredFrontmatterField, string> & {
    lead?: string;
    heroImage?: string;
    heroImageAlt?: string;
    /** Logo + heading overlaid on heroImage (e.g. ct-grid-bg.png). */
    heroLogo?: string;
    heroCardEyebrow?: string;
    heroCardTitle?: string;
    resultsImage?: string;
    resultsImageAlt?: string;
    publishedOn?: string;
    approach: string[];
    outcomes: string[];
};

export interface CaseStudy {
    slug: string;
    title: string;
    industry: string;
    summary: string;
    challenge: string;
    approach: string[];
    outcomes: string[];
    quote: string;
    author: string;
    company: string;
    lead?: string;
    heroImage?: string;
    heroImageAlt?: string;
    heroLogo?: string;
    heroCardEyebrow?: string;
    heroCardTitle?: string;
    resultsImage?: string;
    resultsImageAlt?: string;
    publishedOn?: string;
    content: string;
}

export interface CaseStudyDetail extends Omit<CaseStudy, "content"> {
    contentHtml: string;
}

function asOptionalString(value: unknown): string | undefined {
    if (typeof value !== "string") {
        return undefined;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : undefined;
}

function asStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter((item) => item.length > 0);
}

function parseCaseStudyFrontmatter(
    rawData: Record<string, unknown>,
): CaseStudyFrontmatter | null {
    const requiredValues = {} as Record<RequiredFrontmatterField, string>;

    for (const field of requiredFrontmatterFields) {
        const value = asOptionalString(rawData[field]);
        if (!value) {
            return null;
        }
        requiredValues[field] = value;
    }

    const approach = asStringArray(rawData.approach);
    const outcomes = asStringArray(rawData.outcomes);

    if (approach.length === 0 || outcomes.length === 0) {
        return null;
    }

    return {
        ...requiredValues,
        lead: asOptionalString(rawData.lead),
        heroImage: asOptionalString(rawData.heroImage),
        heroImageAlt: asOptionalString(rawData.heroImageAlt),
        heroLogo: asOptionalString(rawData.heroLogo),
        heroCardEyebrow: asOptionalString(rawData.heroCardEyebrow),
        heroCardTitle: asOptionalString(rawData.heroCardTitle),
        resultsImage: asOptionalString(rawData.resultsImage),
        resultsImageAlt: asOptionalString(rawData.resultsImageAlt),
        publishedOn: asOptionalString(rawData.publishedOn),
        approach,
        outcomes,
    };
}

function loadCaseStudies(): CaseStudy[] {
    if (!fs.existsSync(caseStudiesDirectory)) {
        return [];
    }

    const fileNames = fs
        .readdirSync(caseStudiesDirectory)
        .filter((fileName) => fileName.endsWith(".md"))
        .sort();

    const studies = fileNames
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const fullPath = path.join(caseStudiesDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);
            const frontmatter = parseCaseStudyFrontmatter(data as Record<string, unknown>);

            if (!frontmatter) {
                return null;
            }

            const study: CaseStudy = {
                slug,
                title: frontmatter.title,
                industry: frontmatter.industry,
                summary: frontmatter.summary,
                challenge: frontmatter.challenge,
                approach: frontmatter.approach,
                outcomes: frontmatter.outcomes,
                quote: frontmatter.quote,
                author: frontmatter.author,
                company: frontmatter.company,
                content: content.trim(),
            };

            if (frontmatter.lead) {
                study.lead = frontmatter.lead;
            }
            if (frontmatter.heroImage) {
                study.heroImage = frontmatter.heroImage;
            }
            if (frontmatter.heroImageAlt) {
                study.heroImageAlt = frontmatter.heroImageAlt;
            }
            if (frontmatter.heroLogo) {
                study.heroLogo = frontmatter.heroLogo;
            }
            if (frontmatter.heroCardEyebrow) {
                study.heroCardEyebrow = frontmatter.heroCardEyebrow;
            }
            if (frontmatter.heroCardTitle) {
                study.heroCardTitle = frontmatter.heroCardTitle;
            }
            if (frontmatter.resultsImage) {
                study.resultsImage = frontmatter.resultsImage;
            }
            if (frontmatter.resultsImageAlt) {
                study.resultsImageAlt = frontmatter.resultsImageAlt;
            }
            if (frontmatter.publishedOn) {
                study.publishedOn = frontmatter.publishedOn;
            }

            return study;
        })
        .filter((study): study is CaseStudy => Boolean(study));

    return studies.sort((left, right) => {
        const leftDate = left.publishedOn ?? "";
        const rightDate = right.publishedOn ?? "";
        return rightDate.localeCompare(leftDate);
    });
}

/** Always reads from disk so content/frontmatter edits apply without restarting the dev server. */
export function getAllCaseStudies(): CaseStudy[] {
    return loadCaseStudies();
}

export function getCaseStudySlugs(): string[] {
    return getAllCaseStudies().map((study) => study.slug);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return getAllCaseStudies().find((study) => study.slug === slug);
}

export async function getCaseStudy(slug: string): Promise<CaseStudyDetail | null> {
    const study = getCaseStudyBySlug(slug);
    if (!study) {
        return null;
    }

    const [{ remark }, { default: html }, { default: remarkGfm }] = await Promise.all([
        import("remark"),
        import("remark-html"),
        import("remark-gfm"),
    ]);
    const processedContent = await remark().use(remarkGfm).use(html).process(study.content);

    return {
        ...study,
        contentHtml: processedContent.toString(),
    };
}
