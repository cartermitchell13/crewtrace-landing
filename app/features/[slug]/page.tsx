import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, XCircle, Zap, Target, TrendingUp, Sparkles, Layout } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookedCallLink from "@/components/BookedCallLink";
import SeoLandingTracker from "@/components/SeoLandingTracker";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LiteSavingsCalculator from "@/components/LiteSavingsCalculator";
import FAQSection from "@/components/FAQSection";
import {
    getTemplateMessaging,
    orderedPromiseLine,
    publicIcpPhrase,
} from "@/lib/messaging";
import { industryBySlug } from "@/lib/industries";
import { getFeatureDetailLinks } from "@/lib/cluster-link-graph";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { featureBySlug, featureSlugs, getFeaturesBySlugs } from "@/lib/solutions";

const detailMessaging = getTemplateMessaging("feature_detail");

const supportKeywordByFeatureSlug: Record<string, string[]> = {
    "gps-time-tracking": ["time clock app with gps", "gps time tracking app", "gps employee tracking app"],
    "payroll-leakage-prevention": ["payroll time tracking", "construction payroll software", "employee time clock"],
    "dol-compliance": ["department of labor time clock rules", "labor laws clocking in and out", "audit-ready time records"],
    "geofencing-time-clock": ["geofencing time tracking", "geofence time clock", "clock in app with gps"],
    "payroll-exports": ["payroll time tracking software", "construction payroll software", "time tracking payroll"],
    "overtime-alerts": ["overtime tracking", "overtime tracking software", "employee time tracking"],
};

function joinKeywordList(items: string[]) {
    if (items.length === 0) {
        return "";
    }

    if (items.length === 1) {
        return items[0];
    }

    if (items.length === 2) {
        return `${items[0]} and ${items[1]}`;
    }

    return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

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
        title: solution.metaTitle,
        description: solution.metaDescription,
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

    const detailLinks = getFeatureDetailLinks(solution.slug, {
        siblingLimit: 4,
        crossClusterLimit: 5,
    });
    const articleJsonLd = articleSchema({
        headline: solution.metaTitle,
        description: solution.metaDescription,
        path: `/features/${slug}`,
    });
    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
        { name: solution.name, path: `/features/${slug}` },
    ]);

    const relatedFeatures = getFeaturesBySlugs(detailLinks.siblingFeatureSlugs);
    const supportKeywordLine = joinKeywordList(supportKeywordByFeatureSlug[solution.slug] ?? []);
    const faqDescription = `Answers to common questions about ${solution.primaryKeyword}, rollout expectations, and how Crewtrace fits payroll and field operations.`;

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
                    templateType="feature_detail"
                    cluster="features"
                    pageSlug={slug}
                    pageUrl={`/features/${slug}`}
                />

                {/* Hero Section */}
                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-32 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />

                    <div className="mx-auto max-w-4xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                            {solution.primaryKeyword}
                        </p>
                        <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-[4.5rem]">
                            {solution.heroTitle}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            {solution.heroSubtitle} Built {publicIcpPhrase}. {orderedPromiseLine}
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 cta-highlight px-8 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                                >
                                    {detailMessaging.primaryCta}
                                    <ArrowRight size={18} />
                                </Link>
                                <Link
                                    href={detailLinks.parentPath}
                                    className="inline-flex w-full items-center justify-center sm:w-auto px-6 py-4 text-sm font-semibold text-foreground/70 transition-colors hover:text-primary group"
                                >
                                    Browse all features
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                            <p className="text-center text-sm text-foreground/55">
                                Prefer to talk live?{" "}
                                <BookedCallLink
                                    templateType="feature_detail"
                                    cluster="features"
                                    landingPath={`/features/${slug}`}
                                    className="font-semibold text-primary underline-offset-2 hover:underline"
                                >
                                    Book a 15-minute call
                                </BookedCallLink>
                            </p>
                        </div>
                    </div>

                    <div className="surface-panel relative mx-auto mt-16 max-w-6xl rounded-[2rem] border border-foreground/5 bg-white/50 p-2 shadow-2xl backdrop-blur-md md:mt-20 md:rounded-[2.5rem] md:p-4">
                        <div className="overflow-hidden rounded-[1.5rem] border border-foreground/5 bg-white shadow-inner md:rounded-[2rem]">
                            <Image
                                src="/images/ct-hero-min (1).png"
                                alt={`${solution.name} dashboard mockup`}
                                width={1920}
                                height={1080}
                                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
                                priority
                            />
                        </div>
                    </div>
                </section>

                <TestimonialsSection />

                {/* Challenges and Solutions */}
                <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
                    {/* Soft background glow */}
                    <div className="pointer-events-none absolute left-0 top-1/2 -z-10 h-[600px] w-[600px] -translate-y-1/2 -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(47,39,206,0.05)_0%,transparent_70%)] md:h-[800px] md:w-[800px]" />

                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="mb-16 text-center lg:text-left flex flex-col items-center lg:items-start">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                <Sparkles size={14} />
                                <span>The Workflow Transformation</span>
                            </div>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Why teams buy <span className="text-primary italic">{solution.primaryKeyword}</span>
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed text-center lg:text-left">
                                Buyers are not looking for another isolated feature. They want a workflow that fixes the field problem and gives payroll something they can actually trust.
                            </p>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Challenges Card */}
                            <div className="surface-panel group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-12 shadow-xl transition-all duration-500 hover:shadow-2xl">
                                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-200/50">
                                    <XCircle size={28} />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight mb-8">Common failure points</h3>
                                <ul className="space-y-5">
                                    {solution.challenges.map((challenge) => (
                                        <li key={challenge} className="flex gap-4 text-foreground/70 font-medium leading-relaxed">
                                            <span className="flex-shrink-0 mt-2 h-1.5 w-1.5 rounded-full bg-red-400" />
                                            <span>{challenge}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-100/30 blur-3xl" />
                            </div>

                            {/* Solutions Card */}
                            <div className="surface-panel group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-12 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/50">
                                    <CheckCircle2 size={28} />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight mb-8 text-emerald-600">What changes after rollout</h3>
                                <ul className="space-y-5">
                                    {solution.capabilities.map((capability) => (
                                        <li key={capability} className="flex gap-4 text-foreground/80 font-semibold leading-relaxed">
                                            <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                            <span>{capability}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-100/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Outcomes Section */}
                <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
                    <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 bg-[radial-gradient(ellipse_at_center,rgba(47,39,206,0.04)_0%,transparent_60%)] md:h-[800px] md:w-[800px]" />

                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="mb-16 text-center flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                <TrendingUp size={14} />
                                <span>ROI & Impact</span>
                            </div>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                What better {solution.primaryKeyword} should change
                            </h2>
                            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60 font-medium">
                                Teams that replace manual workarounds with this workflow usually see these operating gains first.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {solution.outcomes.map((outcome, index) => {
                                const Icon = [Target, Zap, Layout][index % 3] || Zap;
                                return (
                                    <div
                                        key={outcome}
                                        className="surface-panel group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10 transition-colors group-hover:bg-primary/10">
                                            <Icon size={24} />
                                        </div>
                                        <p className="text-xl font-bold tracking-tight text-foreground leading-snug">{outcome}</p>
                                        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-primary/[0.02] blur-2xl group-hover:bg-primary/[0.06] transition-colors duration-500" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <LiteSavingsCalculator />

                <FAQSection
                    eyebrow={`${solution.name} FAQ`}
                    title={`${solution.name} FAQ`}
                    description={faqDescription}
                />

                {/* Ecosystem Links */}
                <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Industries */}
                            <div className="surface-panel rounded-[2.5rem] border border-foreground/5 bg-white shadow-xl p-8 md:p-12">
                                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                                    Related industries
                                </h2>
                                <p className="mb-8 text-lg text-foreground/60 font-medium leading-relaxed">
                                    See how this workflow gets applied across the trades most likely to buy {solution.primaryKeyword}.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {detailLinks.relatedIndustrySlugs.map((industrySlug) => (
                                        <Link
                                            key={industrySlug}
                                            href={`/industries/${industrySlug}`}
                                            className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-white px-5 py-3 text-sm font-bold text-foreground/70 shadow-sm transition-all hover:border-primary/20 hover:text-primary hover:shadow-md hover:-translate-y-0.5"
                                        >
                                            {toIndustryName(industrySlug)}
                                            <ArrowRight size={14} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Adjacent Features */}
                            <div className="surface-panel rounded-[2.5rem] border border-foreground/5 bg-white shadow-xl p-8 md:p-12">
                                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                                    Adjacent workflows
                                </h2>
                                <p className="mb-8 text-lg text-foreground/60 font-medium leading-relaxed">
                                    Buyers evaluating {solution.primaryKeyword} often compare it with {supportKeywordLine || "adjacent controls that tighten the same workflow"}.
                                </p>
                                <div className="space-y-4">
                                    {relatedFeatures.map((related) => (
                                        <Link
                                            key={related.slug}
                                            href={`/features/${related.slug}`}
                                            className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/5 bg-gray-50/50 p-5 transition-all duration-300 hover:bg-white hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5"
                                        >
                                            <div>
                                                <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {related.name}
                                                </p>
                                                <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-foreground/60">
                                                    {related.description}
                                                </p>
                                            </div>
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                                <ArrowRight size={18} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <CTASection cluster="features" templateType="feature_detail" landingPath={`/features/${slug}`} />
            </main>
            <Footer />
        </div>
    );
}
