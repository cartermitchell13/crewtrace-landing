import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    AlertCircle,
    ArrowRight,
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
import SeoLandingTracker from "@/components/SeoLandingTracker";
import CTASection from "@/components/CTASection";
import {
    getTemplateMessaging,
    orderedPromiseLine,
    publicIcpPhrase,
} from "@/lib/messaging";
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

const industryMessaging = getTemplateMessaging("industry_detail");

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
                <SeoLandingTracker
                    templateType="industry_detail"
                    cluster="industries"
                    pageSlug={slug}
                    pageUrl={`/industries/${slug}`}
                />

                <section className="relative overflow-hidden px-6 pb-20 pt-36 md:pb-24 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />
                    <div className="mx-auto max-w-6xl rounded-[2rem] border border-foreground/10 bg-white p-8 md:p-10">
                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                            <IndustryIcon size={14} />
                            {industry.primaryKeyword}
                        </p>
                        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                            {industry.heroTitle}
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/70 md:text-lg">
                            {industry.heroSubtitle} {industryMessaging.proofBody}
                        </p>
                        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/55 md:text-base">
                            Built {publicIcpPhrase}. {orderedPromiseLine}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <BookedCallLink
                                cluster="industries"
                                templateType="industry_detail"
                                landingPath={`/industries/${slug}`}
                                params={{ utm_medium: "organic" }}
                                ctaLabel={industryMessaging.primaryCta}
                                ctaLocation="hero"
                                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-button"
                            >
                                {industryMessaging.primaryCta}
                            </BookedCallLink>
                            <Link
                                href={detailLinks.parentPath}
                                className="inline-flex items-center justify-center rounded-xl border border-foreground/15 bg-white px-6 py-3 text-sm font-bold text-foreground/70 transition-colors hover:border-primary/25 hover:text-primary"
                            >
                                Browse all industries
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto mt-8 max-w-6xl rounded-3xl border border-foreground/10 bg-white p-3 shadow-[0_20px_70px_-24px_rgba(47,39,206,0.35)]">
                        <Image
                            src="/images/ct-hero-min (1).png"
                            alt={`${industry.name} dashboard mockup`}
                            width={1200}
                            height={800}
                            className="h-auto w-full rounded-2xl object-cover"
                            priority
                        />
                    </div>
                </section>

                <section className="bg-white px-6 pb-20">
                    <div className="mx-auto max-w-6xl rounded-3xl border border-foreground/10 bg-[#FBFBFE] p-8 md:p-10">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            What crews in {industry.name} usually struggle with
                        </h2>
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                            {industry.painPoints.map((point) => (
                                <article
                                    key={point.title}
                                    className="rounded-2xl border border-red-200 bg-red-50/70 p-5"
                                >
                                    <h3 className="text-lg font-bold text-foreground">{point.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                                        {point.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="features" className="bg-[#FBFBFE] px-6 py-20">
                    <div className="mx-auto max-w-6xl rounded-3xl border border-foreground/10 bg-white p-8 md:p-10">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            Recommended workflow stack for {industry.name}
                        </h2>
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {industry.benefits.map((benefit) => {
                                const BenefitIcon = iconByKey[benefit.icon];
                                return (
                                    <article
                                        key={benefit.title}
                                        className="rounded-2xl border border-foreground/10 bg-[#FBFBFE] p-5"
                                    >
                                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <BenefitIcon size={22} />
                                        </div>
                                        <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground">
                                            {benefit.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                                            {benefit.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="bg-white px-6 py-20">
                    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
                        <article className="rounded-3xl border border-foreground/10 bg-[#FBFBFE] p-7">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                Related feature paths
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-foreground/65 md:text-base">
                                These feature pages are linked by deterministic overlap so teams can
                                expand without losing focus.
                            </p>
                            <div className="mt-6 space-y-3">
                                {relatedSolutions.map((solution) => (
                                    <Link
                                        key={solution.slug}
                                        href={`/features/${solution.slug}`}
                                        className="flex items-center justify-between rounded-2xl border border-foreground/10 bg-white p-4 transition-colors hover:border-primary/25"
                                    >
                                        <span className="font-semibold text-foreground">{solution.name}</span>
                                        <ArrowRight size={16} className="text-primary" />
                                    </Link>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-3xl border border-foreground/10 bg-[#FBFBFE] p-7">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                Related industries
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-foreground/65 md:text-base">
                                Keep crawl depth and route continuity with these adjacent industry pages.
                            </p>
                            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                                {siblingIndustries.map((relatedIndustry) => (
                                    <Link
                                        key={relatedIndustry.slug}
                                        href={`/industries/${relatedIndustry.slug}`}
                                        className="rounded-2xl border border-foreground/10 bg-white px-4 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:border-primary/20 hover:text-primary"
                                    >
                                        {relatedIndustry.name}
                                    </Link>
                                ))}
                            </div>
                        </article>
                    </div>
                </section>

                <section className="bg-[#FBFBFE] px-6 py-20">
                    <div className="mx-auto max-w-6xl rounded-3xl border border-foreground/10 bg-white p-8 md:p-10">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            Current operating signals
                        </h2>
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                            {industry.stats.map((stat) => (
                                <article
                                    key={stat.label}
                                    className="rounded-2xl border border-foreground/10 bg-[#FBFBFE] p-5 text-center"
                                >
                                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-foreground/45">
                                        {stat.label}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <CTASection cluster="industries" templateType="industry_detail" landingPath={`/industries/${slug}`} />
            </main>
            <Footer />
        </div>
    );
}
