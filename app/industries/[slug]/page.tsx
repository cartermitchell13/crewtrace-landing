import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    AlertCircle,
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    CheckCircle2,
    Clock,
    Droplets,
    HardHat,
    Home,
    Layers,
    MapPin,
    ShieldCheck,
    Trees,
    TrendingUp,
    Wind,
    type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookedCallLink from "@/components/BookedCallLink";
import CTASection from "@/components/CTASection";
import { orderedPromiseLine, publicIcpPhrase } from "@/lib/messaging";
import {
    industryBySlug,
    industrySlugs,
    type IndustryIconKey,
    type IndustryRecord,
} from "@/lib/industries";
import { getIndustryDetailLinks } from "@/lib/cluster-link-graph";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { getFeaturesBySlugs } from "@/lib/solutions";

const iconByKey: Record<IndustryIconKey, LucideIcon> = {
    home: Home,
    wind: Wind,
    droplets: Droplets,
    "hard-hat": HardHat,
    trees: Trees,
    layers: Layers,
    "map-pin": MapPin,
    "check-circle-2": CheckCircle2,
    "alert-circle": AlertCircle,
    "bar-chart-3": BarChart3,
    clock: Clock,
    "trending-up": TrendingUp,
    "shield-check": ShieldCheck,
};

export function generateStaticParams() {
    return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const industry = industryBySlug[slug];

    if (!industry) {
        return createPageMetadata({
            title: "Industry Not Found",
            description: "The requested industry page could not be found.",
            path: "/industries",
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: industry.metaTitle,
        description: industry.metaDescription,
        path: `/industries/${slug}`,
    });
}

export default async function IndustryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const industry = industryBySlug[slug];

    if (!industry) {
        notFound();
    }

    const detailLinks = getIndustryDetailLinks(industry.slug, {
        siblingLimit: 4,
        crossClusterLimit: 5,
    });
    const articleJsonLd = articleSchema({
        headline: `Crewtrace for ${industry.name}`,
        description: industry.heroSubtitle,
        path: `/industries/${slug}`,
    });

    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Industries", path: "/industries" },
        { name: industry.name, path: `/industries/${slug}` },
    ]);

    const IndustryIcon = iconByKey[industry.icon];
    const relatedSolutions = getFeaturesBySlugs(detailLinks.relatedFeatureSlugs);
    const siblingIndustries: IndustryRecord[] = detailLinks.siblingIndustrySlugs
        .map((siblingSlug) => industryBySlug[siblingSlug])
        .filter((record): record is IndustryRecord => Boolean(record));

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

                <section className="relative pt-48 pb-20 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.05)_0%,transparent_50%)]" />

                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="flex-1 space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary">
                                    <IndustryIcon size={18} />
                                    <span>Crewtrace for {industry.name}</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-foreground/10 text-xs font-bold uppercase tracking-wider text-foreground/60">
                                    <span>{industry.primaryKeyword}</span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                                    {industry.heroTitle}
                                </h1>

                                <p className="text-xl text-foreground/60 max-w-2xl leading-relaxed font-medium">
                                    {industry.heroSubtitle}
                                </p>
                                <p className="text-base text-foreground/50 max-w-2xl leading-relaxed font-medium">
                                    Built {publicIcpPhrase}. {orderedPromiseLine}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <BookedCallLink
                                        cluster="industries"
                                        templateType="industry_detail"
                                        landingPath={`/industries/${slug}`}
                                        params={{ utm_medium: "organic" }}
                                        className="inline-flex justify-center items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all active:translate-y-[0px] active:translate-x-[0px] text-lg"
                                    >
                                        Book a Free Demo <ArrowRight size={20} />
                                    </BookedCallLink>
                                    <Link
                                        href="#features"
                                        className="inline-flex justify-center bg-secondary text-foreground font-bold px-8 py-4 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all active:translate-y-[0px] active:translate-x-[0px] text-lg"
                                    >
                                        See Features
                                    </Link>
                                </div>

                                <div className="flex items-center gap-6 pt-4 text-sm font-bold text-foreground/40 uppercase tracking-widest">
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

                            <div className="flex-1 relative">
                                <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-3xl" />
                                <div className="relative rounded-[2.5rem] border border-foreground/5 bg-white p-4 shadow-2xl">
                                    <Image
                                        src="/images/ct-hero-min (1).png"
                                        alt={`${industry.name} dashboard mockup`}
                                        width={800}
                                        height={600}
                                        className="rounded-[2rem] w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 py-16 bg-[#FBFBFE] border-y border-foreground/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/[0.02] -skew-x-12 translate-x-1/2" />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {industry.stats.map((stat) => (
                                <div key={stat.label} className="text-center space-y-2">
                                    <div className="text-5xl font-bold text-primary tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-bold text-foreground/40 uppercase tracking-widest">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-6 py-32 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/5 border border-red-500/10 text-red-600 text-sm font-bold">
                                <AlertCircle size={16} />
                                <span>Common Industry Challenges</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                                Stop the <span className="text-red-500">payroll leakage</span> in your {industry.name.toLowerCase()} business.
                            </h2>
                            <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                                Every {industry.name.toLowerCase()} contractor deals with these hidden costs. Here is what is eating your margins.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {industry.painPoints.map((point) => (
                                <div
                                    key={point.title}
                                    className="group relative overflow-hidden rounded-[2.5rem] border border-red-500/5 bg-red-50/30 p-10 transition-all duration-500 hover:-translate-y-1"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 mb-8 border border-red-500/20">
                                        <AlertCircle size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-red-600 transition-colors">
                                        {point.title}
                                    </h3>
                                    <p className="text-foreground/60 font-medium leading-relaxed">
                                        {point.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="features" className="px-6 py-32 bg-[#FBFBFE]">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold">
                                <CheckCircle2 size={16} />
                                <span>The Solution</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                                Built for <span className="text-primary">{industry.name}</span> Contractors
                            </h2>
                            <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                                Features designed specifically for the unique challenges of {industry.name.toLowerCase()} work.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {industry.benefits.map((benefit) => {
                                const BenefitIcon = iconByKey[benefit.icon];
                                return (
                                    <div
                                        key={benefit.title}
                                        className="group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col sm:flex-row gap-8"
                                    >
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0 border border-primary/10 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                            <BenefitIcon size={32} />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-foreground/60 font-medium leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                                            <ArrowUpRight size={24} className="text-primary" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {industry.testimonial && (
                    <section className="py-32 px-6 bg-white overflow-hidden relative border-t border-foreground/5">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
                        <div className="max-w-7xl mx-auto relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div className="space-y-8">
                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                        Real results for <span className="text-primary">{industry.name}</span> crews.
                                    </h2>
                                    <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                                        See how other {industry.name.toLowerCase()} contractors are using Crewtrace to eliminate overpayment and streamline payroll.
                                    </p>
                                    <div className="flex gap-12 pt-4">
                                        <div>
                                            <div className="text-4xl font-bold text-primary">{industry.stats[0].value}</div>
                                            <div className="text-sm font-bold text-foreground/40 uppercase tracking-wider mt-2">Avg. Savings</div>
                                        </div>
                                        <div>
                                            <div className="text-4xl font-bold text-primary">100%</div>
                                            <div className="text-sm font-bold text-foreground/40 uppercase tracking-wider mt-2">Verified Hours</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-12 rounded-[3.5rem] bg-background border border-foreground/5 shadow-[0_32px_64px_-16px_rgba(47,39,206,0.08)] space-y-8 relative">
                                    <div className="text-primary/10 absolute top-8 right-12">
                                        <svg width="60" height="45" viewBox="0 0 60 45" fill="currentColor">
                                            <path d="M15.4 0C6.9 0 0 6.9 0 15.4v29.6h25.7V15.4H10.3c0-2.8 2.3-5.1 5.1-5.1V0zm34.3 0c-8.5 0-15.4 6.9-15.4 15.4v29.6H60V15.4H44.6c0-2.8 2.3-5.1 5.1-5.1V0z" />
                                        </svg>
                                    </div>
                                    <p className="text-2xl font-bold italic tracking-tight leading-relaxed relative z-10">
                                        &ldquo;{industry.testimonial.quote}&rdquo;
                                    </p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="font-bold text-foreground text-lg">{industry.testimonial.author}</div>
                                            <div className="text-sm text-foreground/40 font-bold uppercase tracking-widest">{industry.testimonial.company}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <section className="px-6 py-20 bg-[#FBFBFE] border-t border-foreground/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl space-y-4 mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                Recommended Crewtrace features for {industry.name}
                            </h2>
                            <p className="text-foreground/60 text-lg leading-relaxed">
                                Combine your industry workflow with these focused features to improve compliance, payroll accuracy, and field visibility.
                            </p>
                            <Link
                                href={detailLinks.parentPath}
                                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                            >
                                Browse all industries
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedSolutions.map((solution) => (
                                <Link
                                    key={solution.slug}
                                    href={`/features/${solution.slug}`}
                                    className="rounded-2xl border border-foreground/10 bg-white p-6 hover:border-primary/20 hover:shadow-xl transition-all"
                                >
                                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                                        {solution.name}
                                    </h3>
                                    <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                                        {solution.tagline}
                                    </p>
                                    <p className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-2">
                                        Explore feature
                                        <span aria-hidden>{"->"}</span>
                                    </p>
                                </Link>
                            ))}
                        </div>

                        {relatedSolutions[0] && (
                            <div className="mt-8">
                                <Link
                                    href={`/features/${relatedSolutions[0].slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                                >
                                    Start with {relatedSolutions[0].name}
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        )}

                        <div className="mt-12">
                            <h3 className="text-2xl font-bold tracking-tight text-foreground">
                                Related industries with similar workflow overlap
                            </h3>
                            <p className="mt-3 text-sm text-foreground/60 max-w-2xl">
                                These pages are ranked by shared feature overlap and kept deterministic for stable crawl paths.
                            </p>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {siblingIndustries.map((relatedIndustry) => (
                                    <Link
                                        key={relatedIndustry.slug}
                                        href={`/industries/${relatedIndustry.slug}`}
                                        className="rounded-2xl border border-foreground/10 bg-white px-5 py-4 text-sm font-semibold text-foreground/80 hover:border-primary/20 hover:text-primary transition-colors"
                                    >
                                        {relatedIndustry.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <CTASection
                    cluster="industries"
                    templateType="industry_detail"
                    landingPath={`/industries/${slug}`}
                />
            </main>
            <Footer />
        </div>
    );
}
