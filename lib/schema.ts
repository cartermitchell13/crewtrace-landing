import { siteConfig } from "@/lib/seo";

type BreadcrumbItem = {
    name: string;
    path: string;
};

type ArticleInput = {
    headline: string;
    description: string;
    path: string;
    datePublished?: string;
    dateModified?: string;
    authorName?: string;
};

function absoluteUrl(path: string): string {
    if (!path || path === "/") {
        return siteConfig.url;
    }
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${siteConfig.url}${normalized}`;
}

export function organizationSchema() {
    return {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/crew-trace-logo.png`,
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "carter@getCrewtrace.com",
            availableLanguage: ["en"],
        },
    };
}

export function websiteSchema() {
    return {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "en-US",
    };
}

export function softwareApplicationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Crewtrace",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        url: siteConfig.url,
        description: siteConfig.description,
        featureList: [
            "GPS Time Tracking",
            "Geofenced Clock-ins",
            "Automated Breaks and Overtime",
            "Payroll Export",
        ],
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            description: "Custom pricing based on crew size. Free audit call available.",
        },
    };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

export function articleSchema(input: ArticleInput) {
    const authorName = input.authorName ?? siteConfig.name;
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: input.headline,
        description: input.description,
        datePublished: input.datePublished,
        dateModified: input.dateModified ?? input.datePublished,
        mainEntityOfPage: absoluteUrl(input.path),
        author: {
            "@type": "Person",
            name: authorName,
        },
        publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
                "@type": "ImageObject",
                url: `${siteConfig.url}/images/crew-trace-logo.png`,
            },
        },
    };
}

