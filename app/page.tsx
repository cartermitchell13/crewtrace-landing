import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import ComplianceAudit from "@/components/ComplianceAudit";
import LiteSavingsCalculator from "@/components/LiteSavingsCalculator";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { homeFaqItems } from "@/lib/faq";
import { createPageMetadata } from "@/lib/seo";
import { orderedPromiseLine, publicIcpPhrase } from "@/lib/messaging";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "GPS Time Tracking for Construction Crews",
  description:
    `Crewtrace helps contractors ${publicIcpPhrase}: ${orderedPromiseLine}`,
  path: "/",
});

export default function Home() {
  const homeFaqJsonLd = faqSchema(homeFaqItems);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
        />
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
