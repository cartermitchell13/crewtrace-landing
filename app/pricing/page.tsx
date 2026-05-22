import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import SectionDivider from "@/components/SectionDivider";

const PRICING_PATH = "/pricing";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <PricingSection standalone landingPath={PRICING_PATH} />
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
