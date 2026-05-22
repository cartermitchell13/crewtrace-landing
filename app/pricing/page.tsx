import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import SectionDivider from "@/components/SectionDivider";
import { pricingFaqItems } from "@/lib/faq";
import { faqSchema } from "@/lib/schema";

const PRICING_PATH = "/pricing";

export default function PricingPage() {
    const pricingFaqJsonLd = faqSchema(pricingFaqItems);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqJsonLd) }}
                />
                <PricingSection standalone landingPath={PRICING_PATH} />
                <SectionDivider />
                <FAQSection
                    eyebrow="Pricing FAQ"
                    title="Common questions about plans and billing"
                    description="Flat-rate pricing, what's included in each tier, trials, and when done-for-you onboarding makes sense."
                    items={pricingFaqItems}
                />
                <SectionDivider />
                <CTASection
                    cluster="pricing"
                    templateType="pricing"
                    landingPath={PRICING_PATH}
                />
            </main>
            <SectionDivider />
            <Footer />
        </div>
    );
}
