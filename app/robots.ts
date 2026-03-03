import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { getDisallowedStaticPaths } from "@/lib/seoPolicy";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: getDisallowedStaticPaths(),
            },
        ],
        sitemap: `${siteConfig.url}/sitemap.xml`,
        host: siteConfig.url,
    };
}
