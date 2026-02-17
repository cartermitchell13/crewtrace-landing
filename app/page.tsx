import LandingNavbar from "@/components/LandingNavbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import ComplianceAudit from "@/components/ComplianceAudit";
import LiteSavingsCalculator from "@/components/LiteSavingsCalculator";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <Hero />
        <FeatureGrid />
        <ComplianceAudit />
        <LiteSavingsCalculator />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
