import LandingNavbar from "@/components/LandingNavbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import SavingsCalculator from "@/components/SavingsCalculator";
import ComplianceAudit from "@/components/ComplianceAudit";
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
        <SavingsCalculator />
        <ComplianceAudit />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
