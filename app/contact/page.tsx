import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDemoValueColumn from "@/components/ContactDemoValueColumn";
import DemoRequestForm from "@/components/DemoRequestForm";
import { publicIcpPhrase } from "@/lib/messaging";
import { createPageMetadata } from "@/lib/seo";

// Lead analytics use buildLeadFormEvent from DemoRequestForm (see @/lib/seo-events).

export const metadata: Metadata = createPageMetadata({
    title: "Get a Personalized Demo + Quote | Crewtrace",
    description:
        `Answer a few quick questions about your operation and we\u2019ll send one personalized video with your demo and quote. Watch it on your own time. No sales call required. ${publicIcpPhrase}`,
    path: "/contact",
});

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="px-6 pb-24 pt-36 md:pt-40">
                {/* Background decoration */}
                <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_70%)]" />

                <div className="mx-auto max-w-6xl">
                    {/* Page header */}
                    <div className="mb-12 max-w-2xl">
                        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                            Get a personalized demo + quote
                        </p>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                            See how Crewtrace fits your operation
                        </h1>
                        <p className="mt-5 text-lg font-medium leading-relaxed text-foreground/60 md:text-xl">
                            Answer a few quick questions and we&apos;ll email you one
                            personalized video with your demo and quote. Watch it on
                            your own time, matched to your crew size and trade. No
                            sales call required.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
                        <ContactDemoValueColumn />

                        {/* Right: The form */}
                        <div className="rounded-3xl border border-foreground/10 bg-white p-7 shadow-xl md:p-9">
                            <div className="mb-7">
                                <h2 className="text-xl font-bold text-foreground">
                                    Request your personalized demo + quote
                                </h2>
                                <p className="mt-1.5 text-sm text-foreground/50 leading-relaxed">
                                    Takes about 60 seconds. No commitment.
                                </p>
                            </div>
                            <DemoRequestForm />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
