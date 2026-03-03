import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { caseStudySlugs } from "@/lib/caseStudies";
import { competitorSlugs } from "@/lib/competitors";
import { guideSlugs } from "@/lib/guides";
import { industrySlugs } from "@/lib/industries";
import { siteConfig } from "@/lib/seo";
import { getSitemapStaticPolicies } from "@/lib/seoPolicy";
import { solutionSlugs } from "@/lib/solutions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    const blogPosts = await getAllBlogPosts();

    const staticEntries: MetadataRoute.Sitemap = getSitemapStaticPolicies().map((policy) => ({
        url: `${siteConfig.url}${policy.path === "/" ? "" : policy.path}`,
        lastModified: now,
        changeFrequency: policy.changeFrequency ?? "monthly",
        priority: policy.priority ?? 0.8,
    }));

    const industryEntries: MetadataRoute.Sitemap = [...industrySlugs].sort().map((slug) => ({
        url: `${siteConfig.url}/industries/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    const featureEntries: MetadataRoute.Sitemap = [...solutionSlugs].sort().map((slug) => ({
        url: `${siteConfig.url}/features/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    const guideEntries: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
        url: `${siteConfig.url}/guides/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const caseStudyEntries: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
        url: `${siteConfig.url}/case-studies/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const competitorEntries: MetadataRoute.Sitemap = [...competitorSlugs].sort().map((slug) => ({
        url: `${siteConfig.url}/compare/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [
        ...staticEntries,
        ...industryEntries,
        ...featureEntries,
        ...guideEntries,
        ...caseStudyEntries,
        ...competitorEntries,
        ...blogEntries,
    ];
}
