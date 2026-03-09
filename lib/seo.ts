import type { Metadata } from "next";
import { getStaticSeoPolicy } from "@/lib/seoPolicy";

export const siteConfig = {
    name: "Crewtrace",
    url: "https://getcrewtrace.com",
    title: "Construction Time Tracking Software — GPS Verified | Crewtrace",
    description:
        "Crewtrace is GPS-verified construction time tracking software that eliminates payroll errors, prevents time theft, and generates audit-ready labor records for contractors running field crews.",
    ogImage: "/images/og-ct.png",
};

type CreatePageMetadataOptions = {
    title: string;
    description: string;
    path: string;
    noIndex?: boolean;
    image?: string;
};

function normalizePath(path: string): string {
    if (!path || path === "/") {
        return "/";
    }

    return path.startsWith("/") ? path : `/${path}`;
}

export function createPageMetadata({
    title,
    description,
    path,
    noIndex = false,
    image = siteConfig.ogImage,
}: CreatePageMetadataOptions): Metadata {
    const canonicalPath = normalizePath(path);
    const staticPolicy = getStaticSeoPolicy(canonicalPath);
    const isNoIndex = noIndex || (staticPolicy ? !staticPolicy.indexable : false);

    return {
        title,
        description,
        alternates: {
            canonical: canonicalPath,
        },
        openGraph: {
            title,
            description,
            url: canonicalPath,
            siteName: siteConfig.name,
            type: "website",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        robots: isNoIndex
            ? {
                index: false,
                follow: false,
            }
            : undefined,
    };
}

export const organizationJsonLd = {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/crew-trace-logo.png`,
    contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "carter@getcrewtrace.com",
        availableLanguage: ["en"],
    },
};

export const websiteJsonLd = {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en-US",
};
