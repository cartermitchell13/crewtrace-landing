import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoLandingTracker from "@/components/SeoLandingTracker";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import SectionDivider from "@/components/SectionDivider";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { getFeaturePagePath } from "@/lib/feature-pages";
import { featureBySlug, type FeatureSlug } from "@/lib/solutions";

type FeaturePageFaq = {
    eyebrow: string;
    title: string;
    description: string;
};

type FeaturePageShellProps = {
    slug: FeatureSlug;
    faq: FeaturePageFaq;
    children: React.ReactNode;
};

export default function FeaturePageShell({ slug, faq, children }: FeaturePageShellProps) {
    const solution = featureBySlug[slug];
    const path = getFeaturePagePath(slug);

    if (!solution) {
        throw new Error(`Unknown feature slug: ${slug}`);
    }

    const articleJsonLd = articleSchema({
        headline: solution.metaTitle,
        description: solution.metaDescription,
        path,
    });
    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
        { name: solution.name, path },
    ]);
    const faqJsonLd = faqSchema(solution.faqItems);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
                <SeoLandingTracker
                    templateType="feature_detail"
                    cluster="features"
                    pageSlug={slug}
                    pageUrl={path}
                />

                {children}

                <SectionDivider />

                <FAQSection
                    eyebrow={faq.eyebrow}
                    title={faq.title}
                    description={faq.description}
                    items={solution.faqItems}
                />

                <SectionDivider />

                <CTASection
                    cluster="features"
                    templateType="feature_detail"
                    landingPath={path}
                />
            </main>
            <SectionDivider />
            <Footer />
        </div>
    );
}
