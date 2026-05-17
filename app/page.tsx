import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import ComplianceAudit from "@/components/ComplianceAudit";
import InjuryAlertWorkflowSection from "@/components/InjuryAlertWorkflowSection";
import IndustryLinks from "@/components/IndustryLinks";
import LiteSavingsCalculator from "@/components/LiteSavingsCalculator";
import PricingSection from "@/components/PricingSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection, { TestimonialTextureShell } from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { homeFaqItems } from "@/lib/faq";
import { createPageMetadata } from "@/lib/seo";
import SectionDivider from "@/components/SectionDivider";
import { faqSchema, softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Crew Tracking & Construction Time Tracking Software | GPS Verified",
  description:
    "GPS-verified crew tracking and construction time tracking software for job sites. Crew location tracking at clock-in, geofenced time clock app, payroll-ready exports—built for contractors running field crews.",
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
        <IndustryLinks />
        <SectionDivider />
        <LiteSavingsCalculator />
        <SectionDivider />
        <PricingSection />
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
