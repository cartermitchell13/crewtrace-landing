import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");
const requiredFrontmatterFields = ["title", "excerpt", "date", "category", "readTime"] as const;

type RequiredFrontmatterField = (typeof requiredFrontmatterFields)[number];
type BlogFrontmatter = Record<RequiredFrontmatterField, string> & {
    author?: string;
    icon?: string;
};

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readTime: string;
    author?: string;
    icon?: string;
    content: string;
}

export interface BlogPostMeta {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readTime: string;
    icon?: string;
}

function asOptionalString(value: unknown): string | undefined {
    if (typeof value !== "string") {
        return undefined;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : undefined;
}

function parseBlogFrontmatter(rawData: Record<string, unknown>): BlogFrontmatter | null {
    const requiredValues = {} as Record<RequiredFrontmatterField, string>;

    for (const field of requiredFrontmatterFields) {
        const value = asOptionalString(rawData[field]);
        if (!value) {
            return null;
        }
        requiredValues[field] = value;
    }

    return {
        ...requiredValues,
        author: asOptionalString(rawData.author),
        icon: asOptionalString(rawData.icon),
    };
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = await Promise.all(
        fileNames
            .filter((fileName) => fileName.endsWith(".md"))
            .map(async (fileName) => {
                const slug = fileName.replace(/\.md$/, "");
                const fullPath = path.join(postsDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, "utf8");
                const { data } = matter(fileContents);
                const frontmatter = parseBlogFrontmatter(data as Record<string, unknown>);

                if (!frontmatter) {
                    return null;
                }

                const post: BlogPostMeta = {
                    slug,
                    title: frontmatter.title,
                    excerpt: frontmatter.excerpt,
                    date: frontmatter.date,
                    category: frontmatter.category,
                    readTime: frontmatter.readTime,
                    icon: frontmatter.icon,
                };

                return post;
            })
    );

    const validPosts = allPostsData.filter((post): post is BlogPostMeta => Boolean(post));

    // Sort posts by date
    return validPosts.sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
    });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        const frontmatter = parseBlogFrontmatter(data as Record<string, unknown>);

        if (!frontmatter) {
            return null;
        }

        // Convert markdown to HTML
        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();

        return {
            slug,
            title: frontmatter.title,
            excerpt: frontmatter.excerpt,
            date: frontmatter.date,
            category: frontmatter.category,
            readTime: frontmatter.readTime,
            author: frontmatter.author,
            icon: frontmatter.icon,
            content: contentHtml,
        };
    } catch {
        return null;
    }
}
