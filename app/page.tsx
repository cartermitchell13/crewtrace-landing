import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import ComplianceAudit from "@/components/ComplianceAudit";
import IndustryLinks from "@/components/IndustryLinks";
import LiteSavingsCalculator from "@/components/LiteSavingsCalculator";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection, { TestimonialTextureShell } from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { homeFaqItems } from "@/lib/faq";
import { createPageMetadata } from "@/lib/seo";
import { orderedPromiseLine, publicIcpPhrase } from "@/lib/messaging";
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
        <FeatureGrid />
        <TestimonialTextureShell>
          <TestimonialsSection />
          <ProcessSection variant="texture" />
        </TestimonialTextureShell>
        <ComplianceAudit />
        <IndustryLinks />
        <LiteSavingsCalculator />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
