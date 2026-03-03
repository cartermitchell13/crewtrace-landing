import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    competitorBySlug,
    competitorSlugs,
    type CompetitorRecord,
    type CompetitorSlug,
} from "@/lib/competitors";
import { caseStudyBySlug } from "@/lib/caseStudies";
import { guideBySlug } from "@/lib/guides";
import { industryBySlug } from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { featureBySlug } from "@/lib/solutions";

const FEATURE_LINK_LIMIT = 4;
const INDUSTRY_LINK_LIMIT = 4;
const GUIDE_LINK_LIMIT = 3;
const CASE_STUDY_LINK_LIMIT = 3;

function toFeaturePath(slug: string) {
    return `/features/${slug}`;
}

function toIndustryPath(slug: string) {
    return `/industries/${slug}`;
}

function toGuidePath(slug: string) {
    return `/guides/${slug}`;
}

function toCaseStudyPath(slug: string) {
    return `/case-studies/${slug}`;
}

function sortByLabel<T extends { label: string }>(entries: T[]): T[] {
    return [...entries].sort((left, right) => left.label.localeCompare(right.label));
}

function toFeatureLinks(record: CompetitorRecord) {
    return sortByLabel(
        record.linkTargets.featureSlugs
        .map((slug) => {
            const feature = featureBySlug[slug];
            if (!feature) {
                return null;
            }
            return {
                slug,
                label: feature.name,
                description: feature.tagline,
                href: toFeaturePath(slug),
            };
        })
        .filter((entry): entry is { slug: string; label: string; description: string; href: string } =>
            Boolean(entry),
        )
        .slice(0, FEATURE_LINK_LIMIT),
    );
}

function toIndustryLinks(record: CompetitorRecord) {
    return sortByLabel(
        record.linkTargets.industrySlugs
        .map((slug) => {
            const industry = industryBySlug[slug];
            if (!industry) {
                return null;
            }
            return {
                slug,
                label: industry.name,
                description: industry.hubDescription,
                href: toIndustryPath(slug),
            };
        })
        .filter((entry): entry is { slug: string; label: string; description: string; href: string } =>
            Boolean(entry),
        )
        .slice(0, INDUSTRY_LINK_LIMIT),
    );
}

function toGuideLinks(record: CompetitorRecord) {
    return sortByLabel(
        record.linkTargets.guideSlugs
        .map((slug) => {
            const guide = guideBySlug[slug];
            if (!guide) {
                return null;
            }
            return {
                slug,
                label: guide.title,
                description: guide.summary,
                href: toGuidePath(slug),
            };
        })
        .filter((entry): entry is { slug: string; label: string; description: string; href: string } =>
            Boolean(entry),
        )
        .slice(0, GUIDE_LINK_LIMIT),
    );
}

function toCaseStudyLinks(record: CompetitorRecord) {
    return sortByLabel(
        record.linkTargets.caseStudySlugs
        .map((slug) => {
            const study = caseStudyBySlug[slug];
            if (!study) {
                return null;
            }
            return {
                slug,
                label: study.title,
                description: study.summary,
                href: toCaseStudyPath(slug),
            };
        })
        .filter((entry): entry is { slug: string; label: string; description: string; href: string } =>
            Boolean(entry),
        )
        .slice(0, CASE_STUDY_LINK_LIMIT),
    );
}

function getNextReviewDateLabel(lastReviewedOn: string, reviewCadenceDays: number): string {
    const reviewedDate = new Date(`${lastReviewedOn}T00:00:00Z`);
    if (Number.isNaN(reviewedDate.getTime())) {
        return "Review date unavailable";
    }

    const nextReviewDate = new Date(reviewedDate);
    nextReviewDate.setUTCDate(nextReviewDate.getUTCDate() + reviewCadenceDays);
    return nextReviewDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });
}

export function generateStaticParams() {
    return competitorSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const competitor = competitorBySlug[slug as CompetitorSlug];

    if (!competitor) {
        return createPageMetadata({
            title: "Comparison Not Found",
            description: "The requested comparison page could not be found.",
            path: "/compare",
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: competitor.pageTitle,
        description: competitor.pageSummary,
        path: `/compare/${slug}`,
    });
}

export default async function CompareDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const competitor = competitorBySlug[slug as CompetitorSlug];

    if (!competitor) {
        notFound();
    }

    const featureLinks = toFeatureLinks(competitor);
    const industryLinks = toIndustryLinks(competitor);
    const guideLinks = toGuideLinks(competitor);
    const caseStudyLinks = toCaseStudyLinks(competitor);

    const articleJsonLd = articleSchema({
        headline: competitor.pageTitle,
        description: competitor.pageSummary,
        path: `/compare/${slug}`,
    });

    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Compare", path: "/compare" },
        { name: competitor.name, path: `/compare/${slug}` },
    ]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6">
                <article className="max-w-5xl mx-auto">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                    />

                    <Link
                        href="/compare"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-primary transition-colors"
                    >
                        <span aria-hidden>{"<-"} </span>
                        Back to comparisons
                    </Link>

                    <header className="mt-6 rounded-3xl border border-foreground/10 bg-white p-8 md:p-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                            {competitor.primaryKeyword}
                        </p>
                        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                            Crewtrace vs {competitor.name}
                        </h1>
                        <p className="mt-4 text-lg text-foreground/60 leading-relaxed">
                            {competitor.heroTagline}
                        </p>
                        <p className="mt-4 text-sm text-foreground/50 leading-relaxed">
                            Last reviewed {competitor.lastReviewedOn}. Review cadence every{" "}
                            {competitor.reviewCadenceDays} days (next review:{" "}
                            {getNextReviewDateLabel(
                                competitor.lastReviewedOn,
                                competitor.reviewCadenceDays,
                            )}
                            ).
                        </p>
                    </header>

                    <section className="mt-8 rounded-3xl border border-foreground/10 bg-white p-8">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Intent map for this comparison
                        </h2>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {competitor.keywordClusters.map((cluster) => (
                                <div
                                    key={`${cluster.intentBucket}-${cluster.primaryTerms[0]}`}
                                    className="rounded-2xl border border-foreground/10 bg-[#FBFBFE] p-5"
                                >
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                                        {cluster.intentBucket}
                                    </p>
                                    <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                                        <span className="font-semibold">Primary terms:</span>{" "}
                                        {cluster.primaryTerms.join(", ")}
                                    </p>
                                    <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                                        <span className="font-semibold">Secondary terms:</span>{" "}
                                        {cluster.secondaryTerms.join(", ")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-8 space-y-5">
                        {competitor.comparisonSections.map((section) => (
                            <div
                                key={section.id}
                                className="rounded-3xl border border-foreground/10 bg-white p-8"
                            >
                                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                    {section.heading}
                                </h2>
                                <p className="mt-3 text-foreground/60 leading-relaxed">
                                    {section.summary}
                                </p>
                                <ul className="mt-4 space-y-3 text-foreground/70">
                                    {section.bullets.map((bullet) => (
                                        <li key={bullet} className="flex gap-3">
                                            <span aria-hidden>{"*"}</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>

                    <section className="mt-8 rounded-3xl border border-foreground/10 bg-white p-8">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Related feature and industry paths
                        </h2>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {featureLinks.map((link) => (
                                <Link
                                    key={link.slug}
                                    href={link.href}
                                    className="rounded-2xl border border-foreground/10 bg-[#FBFBFE] p-5 hover:border-primary/20 transition-colors"
                                >
                                    <p className="text-lg font-semibold text-foreground">{link.label}</p>
                                    <p className="mt-2 text-sm text-foreground/60">{link.description}</p>
                                </Link>
                            ))}
                            {industryLinks.map((link) => (
                                <Link
                                    key={link.slug}
                                    href={link.href}
                                    className="rounded-2xl border border-foreground/10 bg-[#FBFBFE] p-5 hover:border-primary/20 transition-colors"
                                >
                                    <p className="text-lg font-semibold text-foreground">{link.label}</p>
                                    <p className="mt-2 text-sm text-foreground/60">{link.description}</p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="mt-8 rounded-3xl border border-foreground/10 bg-white p-8">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Proof and implementation resources
                        </h2>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {guideLinks.map((link) => (
                                <Link
                                    key={link.slug}
                                    href={link.href}
                                    className="rounded-2xl border border-foreground/10 bg-[#FBFBFE] p-5 hover:border-primary/20 transition-colors"
                                >
                                    <p className="text-lg font-semibold text-foreground">{link.label}</p>
                                    <p className="mt-2 text-sm text-foreground/60">{link.description}</p>
                                </Link>
                            ))}
                            {caseStudyLinks.map((link) => (
                                <Link
                                    key={link.slug}
                                    href={link.href}
                                    className="rounded-2xl border border-foreground/10 bg-[#FBFBFE] p-5 hover:border-primary/20 transition-colors"
                                >
                                    <p className="text-lg font-semibold text-foreground">{link.label}</p>
                                    <p className="mt-2 text-sm text-foreground/60">{link.description}</p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="mt-8 rounded-3xl border border-foreground/10 bg-white p-8 md:p-10">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Claim-safety and review policy
                        </h2>
                        <ul className="mt-4 space-y-3 text-foreground/70">
                            {competitor.claimSafetyRules.map((rule) => (
                                <li key={rule.topic} className="flex gap-3">
                                    <span aria-hidden>{"*"}</span>
                                    <span>
                                        <span className="font-semibold">{rule.topic}:</span> {rule.guidance}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-8 rounded-3xl bg-primary text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                                {competitor.softCtaHeadline}
                            </h2>
                            <p className="mt-2 text-white/80">{competitor.softCtaBody}</p>
                        </div>
                        <a
                            href="https://cal.com/crewtrace/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary"
                        >
                            Book a free audit
                        </a>
                    </section>
                </article>
            </main>
            <Footer />
        </div>
    );
}
