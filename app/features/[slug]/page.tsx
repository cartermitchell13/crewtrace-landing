import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    CheckCircle2,
    ArrowRight,
    Target,
    TrendingUp,
    X,
    Check
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { orderedPromiseLine, publicIcpPhrase } from "@/lib/messaging";
import { industryBySlug } from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import {
    featureBySlug,
    featureSlugs,
    getFeaturesBySlugs,
} from "@/lib/solutions";

function toIndustryName(slug: string) {
    return industryBySlug[slug]?.name ?? slug;
}

export function generateStaticParams() {
    return featureSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const solution = featureBySlug[slug];

    if (!solution) {
        return createPageMetadata({
            title: "Feature Not Found",
            description: "The requested feature page could not be found.",
            path: "/features",
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: `${solution.name} Feature for Contractors`,
        description: solution.description,
        path: `/features/${slug}`,
    });
}

export default async function FeatureDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const solution = featureBySlug[slug];

    if (!solution) {
        notFound();
    }

    const articleJsonLd = articleSchema({
        headline: solution.name,
        description: solution.description,
        path: `/features/${slug}`,
    });

    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: solution.name, path: `/features/${slug}` },
    ]);

    const relatedFeatures = getFeaturesBySlugs(
        featureSlugs.filter((candidateSlug) => candidateSlug !== solution.slug).slice(0, 3)
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />
                {/* Hero Section */}
                <section className="relative pt-40 pb-32 px-6 overflow-hidden bg-white">
                    {/* Soft glowing mesh background */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] -z-10 bg-[radial-gradient(ellipse_at_top,rgba(47,39,206,0.08)_0%,transparent_70%)]" />

                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-4xl mx-auto space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm font-bold text-primary uppercase tracking-widest">
                                <Target size={16} />
                                <span>{solution.primaryKeyword}</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] max-w-3xl mx-auto">
                                {solution.name}
                            </h1>

                            <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-medium max-w-2xl mx-auto">
                                {solution.description}
                            </p>
                            <p className="text-base md:text-lg text-foreground/50 leading-relaxed font-medium max-w-2xl mx-auto">
                                Built {publicIcpPhrase}. {orderedPromiseLine}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <a
                                    href="https://cal.com/crewtrace/15min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex justify-center items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-[0_8px_30px_rgba(47,39,206,0.2)] hover:shadow-[0_12px_40px_rgba(47,39,206,0.3)] hover:translate-y-[-2px] transition-all duration-300 active:translate-y-[0px] text-lg"
                                >
                                    Book a Free Demo <ArrowRight size={20} />
                                </a>
                            </div>

                            <div className="flex items-center justify-center gap-6 pt-4 text-sm font-bold text-foreground/40 uppercase tracking-widest">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-primary" />
                                    <span>No Hardware Needed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-primary" />
                                    <span>Setup in 5 Minutes</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Mockup */}
                        <div className="mt-20 relative px-4 md:px-0">
                            <div className="absolute -inset-4 md:-inset-10 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent rounded-[3rem] blur-3xl" />
                            <div className="relative rounded-[2rem] md:rounded-[3rem] border border-foreground/5 bg-white p-2 md:p-3 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] ring-1 ring-foreground/5 max-w-5xl mx-auto overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                                <Image
                                    src="/images/ct-hero-min (1).png"
                                    alt={`${solution.name} Dashboard Mockup`}
                                    width={1200}
                                    height={800}
                                    className="rounded-[1.5rem] md:rounded-[2.5rem] w-full h-auto object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Before / After Section */}
                <section className="py-32 px-6 bg-[#FBFBFE] relative border-t border-foreground/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                                The difference is clear.
                            </h2>
                            <p className="text-xl text-foreground/60 font-medium max-w-2xl mx-auto">
                                Stop accepting the hidden costs of {solution.name.toLowerCase()} and upgrade to a flawless process.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:rounded-[3rem] overflow-hidden border border-foreground/5 shadow-2xl shadow-primary/5 bg-white">
                            {/* Before (Challenges) */}
                            <div className="bg-white p-10 md:p-16 relative border-b lg:border-b-0 lg:border-r border-foreground/5">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <h3 className="text-2xl font-bold text-foreground mb-10 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                                        <X size={24} />
                                    </div>
                                    The Old Way
                                </h3>
                                <ul className="space-y-8 relative z-10">
                                    {solution.challenges.map((challenge, index) => (
                                        <li key={index} className="flex gap-4 items-start">
                                            <X className="text-red-400 flex-shrink-0 mt-1" size={24} />
                                            <span className="text-lg text-foreground/70 font-medium leading-relaxed">{challenge}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* After (Capabilities) */}
                            <div className="bg-primary p-10 md:p-16 relative text-white">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
                                <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3 relative z-10">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm border border-white/20">
                                        <Check size={24} />
                                    </div>
                                    The Crewtrace Way
                                </h3>
                                <ul className="space-y-8 relative z-10">
                                    {solution.capabilities.map((capability, index) => (
                                        <li key={index} className="flex gap-4 items-start">
                                            <CheckCircle2 className="text-white flex-shrink-0 mt-1" size={24} />
                                            <span className="text-lg text-white/90 font-medium leading-relaxed">{capability}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Outcomes Section (Dark Mode) */}
                <section className="py-32 px-6 bg-foreground text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_100%,rgba(47,39,206,0.5)_0%,transparent_60%)] opacity-30" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="flex-1 space-y-8 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white/80 uppercase tracking-widest">
                                    <TrendingUp size={16} className="text-emerald-400" />
                                    <span>The Bottom Line</span>
                                </div>

                                <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                                    Outcomes that <br />
                                    <span className="text-primary-foreground">actually matter.</span>
                                </h2>

                                <p className="text-xl text-white/60 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    By implementing {solution.name} through Crewtrace, our users see immediate improvements in operational efficiency and payroll accuracy.
                                </p>
                            </div>

                            <div className="flex-1 w-full space-y-4">
                                {solution.outcomes.map((outcome, index) => (
                                    <div key={index} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-sm flex items-center gap-5 hover:bg-white/10 transition-colors group">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                                            <TrendingUp size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{outcome}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ecosystem Section */}
                <section className="py-32 px-6 bg-white border-b border-foreground/5">
                    <div className="max-w-7xl mx-auto space-y-16">
                        <div className="text-center">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                                Connects seamlessly to your workflow.
                            </h2>
                            <p className="mt-6 text-xl text-foreground/60 font-medium max-w-2xl mx-auto">
                                Every feature in Crewtrace integrates with the others, giving you a comprehensive operational toolkit.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Industries Box */}
                            <div className="rounded-[3rem] bg-[#FBFBFE] border border-foreground/5 p-12 flex flex-col hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                                <h3 className="text-2xl font-bold text-foreground mb-4">Crafted for trades</h3>
                                <p className="text-foreground/60 mb-8 font-medium leading-relaxed">
                                    See exactly how this translates to your specific industry with targeted case studies and workflows.
                                </p>
                                <div className="flex flex-wrap gap-3 mt-auto">
                                    {solution.relatedIndustries.map((industrySlug) => (
                                        <Link
                                            key={industrySlug}
                                            href={`/industries/${industrySlug}`}
                                            className="rounded-full border border-foreground/10 bg-white px-6 py-3 text-sm font-bold text-foreground/70 hover:border-primary/30 hover:text-primary transition-all shadow-sm flex items-center gap-2"
                                        >
                                            {toIndustryName(industrySlug)} <ArrowRight size={14} />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Features Box */}
                            <div className="rounded-[3rem] bg-[#FBFBFE] border border-foreground/5 p-12 flex flex-col hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                                <h3 className="text-2xl font-bold text-foreground mb-4">Expand your capabilities</h3>
                                <p className="text-foreground/60 mb-8 font-medium leading-relaxed">
                                    Combine this with our other powerful tools to completely eliminate payroll leakage.
                                </p>
                                <div className="flex flex-col gap-3 mt-auto">
                                    {relatedFeatures.map((related) => (
                                        <Link
                                            key={related.slug}
                                            href={`/features/${related.slug}`}
                                            className="flex items-center justify-between rounded-2xl border border-foreground/5 bg-white p-5 hover:border-primary/30 transition-all group shadow-sm"
                                        >
                                            <span className="font-bold text-foreground/80 group-hover:text-primary transition-colors text-lg">
                                                {related.name}
                                            </span>
                                            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                <ArrowRight size={18} className="text-primary" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
