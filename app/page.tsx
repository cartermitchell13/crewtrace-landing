import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import ComplianceAudit from "@/components/ComplianceAudit";
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
  title: "Construction Time Tracking Software | GPS Time Clock App",
  description:
    "GPS-verified construction time tracking software and time clock app for contractors. Eliminate time theft, automate timesheets, and export payroll-ready reports with geofencing verification.",
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
        <LiteSavingsCalculator />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
