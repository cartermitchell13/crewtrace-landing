import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeMobileClockInSection from "@/components/HomeMobileClockInSection";
import HomePayrollLeakageStory from "@/components/HomePayrollLeakageStory";
import FeatureGrid from "@/components/FeatureGrid";
import ComplianceAudit from "@/components/ComplianceAudit";
import InjuryAlertWorkflowSection from "@/components/InjuryAlertWorkflowSection";
import LiteSavingsCalculator from "@/components/LiteSavingsCalculator";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection, { TestimonialTextureShell } from "@/components/TestimonialsSection";
import CustomPricingSection from "@/components/CustomPricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { homeFaqItems } from "@/lib/faq";
import { createPageMetadata } from "@/lib/seo";
import SectionDivider from "@/components/SectionDivider";
import { faqSchema, softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Stop Payroll Leakage with GPS Crew Tracking Software",
  description:
    "Stop paying for field hours you can't verify. Crewtrace gives contractors GPS-verified crew time, geofenced clock-ins, exception flags, and payroll-ready exports.",
  path: "/",
});

export default function Home() {
  const homeFaqJsonLd = faqSchema(homeFaqItems);
  const softwareAppJsonLd = softwareApplicationSchema();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
        />
        <Hero />
        <SectionDivider />
        <HomeMobileClockInSection />
        <SectionDivider />
        <HomePayrollLeakageStory />
        <SectionDivider />
        <FeatureGrid />
        <SectionDivider />
        <TestimonialTextureShell>
          <TestimonialsSection />
          <ProcessSection variant="texture" />
        </TestimonialTextureShell>
        <SectionDivider />
        <InjuryAlertWorkflowSection
          eyebrow="Product proof"
          title="See how field issues reach the office before payroll closes."
          description="This product walkthrough shows one real workflow: a worker reports an injury, the admin gets notified, and the shift review keeps the notes, photos, worker, and time record together."
          badge="Live workflow"
        />
        <SectionDivider />
        <ComplianceAudit />
        <SectionDivider />
        <LiteSavingsCalculator />
        <SectionDivider />
        <CustomPricingSection />
        <SectionDivider />
        <FAQSection />
        <SectionDivider />
        <CTASection />
      </main>
      <SectionDivider />
      <Footer />
    </div>
  );
}
