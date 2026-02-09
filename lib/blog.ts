import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

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

                return {
                    slug,
                    title: data.title || "Untitled",
                    excerpt: data.excerpt || "",
                    date: data.date || "",
                    category: data.category || "General",
                    readTime: data.readTime || "5 min read",
                    icon: data.icon,
                };
            })
    );

    // Sort posts by date
    return allPostsData.sort((a, b) => {
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

        // Convert markdown to HTML
        const processedContent = await remark().use(html).process(content);
        const contentHtml = processedContent.toString();

        return {
            slug,
            title: data.title || "Untitled",
            excerpt: data.excerpt || "",
            date: data.date || "",
            category: data.category || "General",
            readTime: data.readTime || "5 min read",
            author: data.author,
            icon: data.icon,
            content: contentHtml,
        };
    } catch {
        return null;
    }
}
