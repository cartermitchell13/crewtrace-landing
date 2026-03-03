import { describe, expect, it } from "vitest";
import {
    articleSchema,
    breadcrumbSchema,
    faqSchema,
    organizationSchema,
    websiteSchema,
} from "@/lib/schema";

describe("schema builders", () => {
    it("creates organization and website objects for graph usage", () => {
        const org = organizationSchema();
        const website = websiteSchema();

        expect(org["@type"]).toBe("Organization");
        expect(website["@type"]).toBe("WebSite");
    });

    it("creates FAQPage schema with question/answer entities", () => {
        const schema = faqSchema([
            { question: "Q1", answer: "A1" },
            { question: "Q2", answer: "A2" },
        ]);

        expect(schema["@type"]).toBe("FAQPage");
        expect(schema.mainEntity).toHaveLength(2);
        expect(schema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
    });

    it("creates breadcrumb list with absolute URLs", () => {
        const schema = breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
        ]);

        expect(schema["@type"]).toBe("BreadcrumbList");
        expect(schema.itemListElement[0].position).toBe(1);
        expect(schema.itemListElement[1].item).toContain("/blog");
    });

    it("creates article schema with required SEO fields", () => {
        const schema = articleSchema({
            headline: "Example Headline",
            description: "Example description",
            path: "/blog/example",
            datePublished: "2026-01-01",
            authorName: "Example Author",
        });

        expect(schema["@type"]).toBe("Article");
        expect(schema.headline).toBe("Example Headline");
        expect(schema.mainEntityOfPage).toContain("/blog/example");
        expect(schema.author.name).toBe("Example Author");
    });
});

