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

    const detailLinks = getFeatureDetailLinks(solution.slug, {
        siblingLimit: 4,
        crossClusterLimit: 5,
    });
    const articleJsonLd = articleSchema({
        headline: solution.name,
        description: solution.description,
        path: `/features/${slug}`,
    });
    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
        { name: solution.name, path: `/features/${slug}` },
    ]);

    const relatedFeatures = getFeaturesBySlugs(detailLinks.siblingFeatureSlugs);

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
                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                            {solution.primaryKeyword}
                        </p>
                        <h1 className="mt-8 text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                            {solution.name}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            {solution.description} {detailMessaging.proofBody}
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4">
                            <div className="w-full max-w-md space-y-3 rounded-3xl border border-foreground/10 bg-white p-4 shadow-xl shadow-primary/5">
                                <BookedCallLink
                                    cluster="features"
                                    templateType="feature_detail"
                                    landingPath={`/features/${slug}`}
                                    params={{ utm_medium: "organic" }}
                                    ctaLabel={detailMessaging.primaryCta}
                                    ctaLocation="hero"
                                    asButton
                                    buttonSize="lg"
                                    className="w-full"
                                >
                                    {detailMessaging.primaryCta}
                                </BookedCallLink>
                                <Link
                                    href={detailLinks.parentPath}
                                    className="inline-flex w-full items-center justify-center text-sm font-semibold text-primary/65 underline decoration-primary/35 underline-offset-4 transition-colors hover:text-primary"
                                >
                                    Browse all features
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-16 max-w-6xl rounded-[2.5rem] border border-foreground/10 bg-white p-3 shadow-panel md:mt-20">
                        <Image
                            src="/images/ct-hero-min (1).png"
                            alt={`${solution.name} dashboard mockup`}
                            width={1920}
                            height={1080}
                            className="h-auto w-full rounded-[1.8rem] object-cover"
                            priority
                        />
                    </div>
                </section>

                {/* Challenges and Solutions */}
                <section className="bg-white px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                                <Sparkles size={12} />
                                <span>The Workflow Transformation</span>
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                                From chaos to <span className="text-primary italic">control.</span>
                            </h2>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-2">
                            <div className="group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-[#FBFBFE] p-8 md:p-10 transition-all duration-500 hover:shadow-2xl">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-200/50">
                                    <XCircle size={28} />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight mb-6">Common failure points</h3>
                                <ul className="space-y-4">
                                    {solution.challenges.map((challenge) => (
                                        <li key={challenge} className="flex gap-4 text-foreground/60 font-medium leading-relaxed">
                                            <span className="flex-shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-red-400" />
                                            <span>{challenge}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-100/20 blur-3xl" />
                            </div>

                            <div className="group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/50">
                                    <CheckCircle2 size={28} />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight mb-6 text-emerald-600">What changes after rollout</h3>
                                <ul className="space-y-4">
                                    {solution.capabilities.map((capability) => (
                                        <li key={capability} className="flex gap-4 text-foreground/75 font-medium leading-relaxed">
                                            <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                            <span>{capability}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-100/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Outcomes Section */}
                <section className="bg-[#FBFBFE] px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                                <TrendingUp size={12} />
                                <span>ROI & Impact</span>
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                                Expected outcomes
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/50 font-medium">
                                Companies using this workflow typically see these operational improvements within 30 days.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {solution.outcomes.map((outcome, index) => {
                                const Icon = [Target, Zap, Layout][index % 3] || Zap;
                                return (
                                    <div
                                        key={outcome}
                                        className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary ring-1 ring-primary/10">
                                            <Icon size={20} />
                                        </div>
                                        <p className="text-lg font-bold tracking-tight text-foreground leading-snug">{outcome}</p>
                                        <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-primary/[0.02] blur-2xl group-hover:bg-primary/[0.05] transition-colors" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Ecosystem Links */}
                <section className="bg-white px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-8 lg:grid-cols-2">
                            <div className="rounded-[2.5rem] border border-foreground/5 bg-[#FBFBFE] p-8 md:p-10">
                                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                                    Related industries
                                </h2>
                                <p className="mb-8 text-base text-foreground/50 font-medium leading-relaxed">
                                    Trade-specific implementation details for this workflow across your core service lines.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {detailLinks.relatedIndustrySlugs.map((industrySlug) => (
                                        <Link
                                            key={industrySlug}
                                            href={`/industries/${industrySlug}`}
                                            className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-white px-5 py-2.5 text-sm font-bold text-foreground/70 transition-all hover:border-primary/20 hover:text-primary hover:shadow-md"
                                        >
                                            {toIndustryName(industrySlug)}
                                            <ArrowRight size={14} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[2.5rem] border border-foreground/5 bg-[#FBFBFE] p-8 md:p-10">
                                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                                    Adjacent workflows
                                </h2>
                                <p className="mb-8 text-base text-foreground/50 font-medium leading-relaxed">
                                    Build depth with related controls ranked by operational overlap and data flow.
                                </p>
                                <div className="space-y-4">
                                    {relatedFeatures.map((related) => (
                                        <Link
                                            key={related.slug}
                                            href={`/features/${related.slug}`}
                                            className="group flex items-center justify-between rounded-2xl border border-foreground/5 bg-white p-5 transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
                                        >
                                            <span className="font-bold text-foreground group-hover:text-primary transition-colors">{related.name}</span>
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                                                <ArrowRight size={16} />
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
