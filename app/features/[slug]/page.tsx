import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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

                <section className="relative overflow-hidden px-6 pb-20 pt-36 md:pb-24 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />
                    <div className="mx-auto max-w-6xl rounded-[2rem] border border-foreground/10 bg-white p-8 md:p-10">
                        <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                            {solution.primaryKeyword}
                        </p>
                        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                            {solution.name}
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/70 md:text-lg">
                            {solution.description} {detailMessaging.proofBody}
                        </p>
                        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/55 md:text-base">
                            Built {publicIcpPhrase}. {orderedPromiseLine}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <BookedCallLink
                                cluster="features"
                                templateType="feature_detail"
                                landingPath={`/features/${slug}`}
                                params={{ utm_medium: "organic" }}
                                ctaLabel={detailMessaging.primaryCta}
                                ctaLocation="hero"
                                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-button"
                            >
                                {detailMessaging.primaryCta}
                            </BookedCallLink>
                            <Link
                                href={detailLinks.parentPath}
                                className="inline-flex items-center justify-center rounded-xl border border-foreground/15 bg-white px-6 py-3 text-sm font-bold text-foreground/70 transition-colors hover:border-primary/25 hover:text-primary"
                            >
                                Browse all features
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto mt-8 max-w-6xl rounded-3xl border border-foreground/10 bg-white p-3 shadow-[0_20px_70px_-24px_rgba(47,39,206,0.35)]">
                        <Image
                            src="/images/ct-hero-min (1).png"
                            alt={`${solution.name} dashboard mockup`}
                            width={1200}
                            height={800}
                            className="h-auto w-full rounded-2xl object-cover"
                            priority
                        />
                    </div>
                </section>

                <section className="bg-white px-6 pb-20">
                    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
                        <article className="rounded-3xl border border-red-200 bg-red-50/70 p-7">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                Common failure points
                            </h2>
                            <ul className="mt-4 space-y-3 text-sm text-foreground/70 md:text-base">
                                {solution.challenges.map((challenge) => (
                                    <li key={challenge} className="flex gap-3">
                                        <span aria-hidden>{"*"}</span>
                                        <span>{challenge}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>

                        <article className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-7">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                What changes after rollout
                            </h2>
                            <ul className="mt-4 space-y-3 text-sm text-foreground/75 md:text-base">
                                {solution.capabilities.map((capability) => (
                                    <li key={capability} className="flex gap-3">
                                        <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                                        <span>{capability}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="bg-[#FBFBFE] px-6 py-20">
                    <div className="mx-auto max-w-6xl rounded-3xl border border-foreground/10 bg-white p-8 md:p-10">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                            Expected outcomes
                        </h2>
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                            {solution.outcomes.map((outcome) => (
                                <div
                                    key={outcome}
                                    className="rounded-2xl border border-foreground/10 bg-[#FBFBFE] p-5"
                                >
                                    <p className="text-base font-semibold text-foreground">{outcome}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white px-6 py-20">
                    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
                        <article className="rounded-3xl border border-foreground/10 bg-[#FBFBFE] p-7">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                Related industries for this workflow
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-foreground/65 md:text-base">
                                Open these industry pages to see trade-specific implementation details.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {detailLinks.relatedIndustrySlugs.map((industrySlug) => (
                                    <Link
                                        key={industrySlug}
                                        href={`/industries/${industrySlug}`}
                                        className="rounded-full border border-foreground/10 bg-white px-4 py-2 text-sm font-semibold text-foreground/70 transition-colors hover:border-primary/20 hover:text-primary"
                                    >
                                        {toIndustryName(industrySlug)}
                                    </Link>
                                ))}
                            </div>
                        </article>

                        <article className="rounded-3xl border border-foreground/10 bg-[#FBFBFE] p-7">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                Adjacent feature workflows
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-foreground/65 md:text-base">
                                Build depth with related controls ranked by deterministic overlap.
                            </p>
                            <div className="mt-6 space-y-3">
                                {relatedFeatures.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/features/${related.slug}`}
                                        className="flex items-center justify-between rounded-2xl border border-foreground/10 bg-white p-4 transition-colors hover:border-primary/25"
                                    >
                                        <span className="font-semibold text-foreground">{related.name}</span>
                                        <ArrowRight size={16} className="text-primary" />
                                    </Link>
                                ))}
                            </div>
                        </article>
                    </div>
                </section>

                <CTASection cluster="features" templateType="feature_detail" landingPath={`/features/${slug}`} />
            </main>
            <Footer />
        </div>
    );
}
