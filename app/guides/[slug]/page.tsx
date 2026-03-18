import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCompetitorsByGuideSlug } from "@/lib/competitors";
import { guideBySlug, guideSlugs } from "@/lib/guides";
import type { GuideSection } from "@/lib/guides";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
    return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const guide = guideBySlug[slug];

    if (!guide) {
        return createPageMetadata({
            title: "Guide Not Found",
            description: "The requested guide could not be found.",
            path: "/guides",
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: guide.title,
        description: guide.summary,
        path: `/guides/${slug}`,
    });
}

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(/[^\w-]+/g, "");
}

/* ─── Section sub-components ─── */

function SectionImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-foreground/10 mb-8 md:mb-10 bg-white">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
            />
        </div>
    );
}

function StatCallout({ stat, label }: { stat: string; label: string }) {
    return (
        <div className="relative my-8 md:my-10 rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 overflow-hidden">
            {/* decorative accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-2xl" />
            <span className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight whitespace-nowrap pl-4 sm:pl-3">
                {stat}
            </span>
            <span className="text-base md:text-lg text-foreground/70 leading-snug font-medium pl-4 sm:pl-0">
                {label}
            </span>
        </div>
    );
}

function BulletList({ points }: { points: string[] }) {
    return (
        <ul className="space-y-5">
            {points.map((point) => (
                <li key={point} className="flex gap-4 group">
                    <div className="mt-1.5 shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <svg
                            className="w-3.5 h-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <span className="text-base md:text-lg text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors">
                        {point}
                    </span>
                </li>
            ))}
        </ul>
    );
}

function NumberedList({ points }: { points: string[] }) {
    return (
        <ol className="space-y-6">
            {points.map((point, i) => (
                <li key={point} className="flex gap-5 group">
                    <div className="mt-0.5 shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-foreground/[0.06] text-foreground/80 font-bold text-sm transition-colors group-hover:bg-primary group-hover:text-white">
                        {i + 1}
                    </div>
                    <span className="text-base md:text-lg text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors pt-0.5">
                        {point}
                    </span>
                </li>
            ))}
        </ol>
    );
}

function GuideSection({
    section,
    index,
    totalSections,
}: {
    section: GuideSection;
    index: number;
    totalSections: number;
}) {
    return (
        <section id={slugify(section.heading)} className="scroll-mt-32">
            {/* Section image (if present) */}
            {section.image && (
                <SectionImage
                    src={section.image}
                    alt={section.imageAlt || section.heading}
                />
            )}

            {/* Section number + heading */}
            <div className="flex items-start gap-4 mb-5 md:mb-6">
                <span className="hidden md:flex shrink-0 items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-sm mt-1">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">
                    {section.heading}
                </h2>
            </div>

            {/* Intro paragraph */}
            {section.intro && (
                <p className="text-base md:text-lg text-foreground/60 leading-relaxed mb-6 md:mb-8 md:pl-14">
                    {section.intro}
                </p>
            )}

            {/* Stat callout */}
            {section.callout && (
                <div className="md:pl-14">
                    <StatCallout
                        stat={section.callout.stat}
                        label={section.callout.label}
                    />
                </div>
            )}

            {/* Points list */}
            <div className="md:pl-14">
                {section.numbered ? (
                    <NumberedList points={section.points} />
                ) : (
                    <BulletList points={section.points} />
                )}
            </div>

            {/* Section divider (except last) */}
            {index < totalSections - 1 && (
                <hr className="border-foreground/8 mt-14 md:mt-18" />
            )}
        </section>
    );
}

/* ─── Main page ─── */

export default async function GuideDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const guide = guideBySlug[slug];

    if (!guide) {
        notFound();
    }

    const relatedComparisons = getCompetitorsByGuideSlug(guide.slug).sort(
        (left, right) => left.name.localeCompare(right.name)
    );

    const articleJsonLd = articleSchema({
        headline: guide.title,
        description: guide.summary,
        path: `/guides/${slug}`,
    });

    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: guide.title, path: `/guides/${slug}` },
    ]);

    return (
        <div className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />

            <main className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* ─── Left Sidebar (Sticky TOC) ─── */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-32 flex flex-col gap-10">
                            <Link
                                href="/guides"
                                className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-foreground transition-colors"
                            >
                                <span className="text-lg group-hover:-translate-x-1 transition-transform duration-200">
                                    &larr;
                                </span>
                                Back to guides
                            </Link>

                            <nav>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-5">
                                    In this guide
                                </h3>
                                <ul className="flex flex-col gap-1">
                                    {guide.sections.map((section, i) => (
                                        <li key={section.heading}>
                                            <a
                                                href={`#${slugify(section.heading)}`}
                                                className="group/toc flex items-start gap-2.5 py-1.5 text-sm font-medium text-foreground/55 hover:text-primary transition-colors leading-snug"
                                            >
                                                <span className="shrink-0 text-xs font-bold text-foreground/30 group-hover/toc:text-primary/60 transition-colors mt-px tabular-nums">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span className="line-clamp-2">
                                                    {section.heading}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    {/* ─── Article Content ─── */}
                    <article className="max-w-3xl flex-1">
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(articleJsonLd),
                            }}
                        />
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(breadcrumbJsonLd),
                            }}
                        />

                        {/* Mobile Back Link */}
                        <Link
                            href="/guides"
                            className="lg:hidden inline-flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-foreground transition-colors mb-8"
                        >
                            <span className="text-lg">&larr;</span>
                            Back to guides
                        </Link>

                        {/* ─── Article Header ─── */}
                        <header className="mb-14 md:mb-18">
                            <div className="flex flex-wrap items-center gap-3 text-sm font-bold mb-6">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wide text-xs">
                                    {guide.category}
                                </span>
                                <span className="text-foreground/30">•</span>
                                <span className="text-foreground/50">
                                    {guide.readTime}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                                {guide.title}
                            </h1>

                            <p className="text-xl md:text-2xl text-foreground/55 leading-relaxed font-medium max-w-2xl">
                                {guide.summary}
                            </p>
                        </header>

                        <hr className="border-foreground/10 mb-14 md:mb-18" />

                        {/* ─── Sections ─── */}
                        <div className="space-y-14 md:space-y-18">
                            {guide.sections.map((section, i) => (
                                <GuideSection
                                    key={section.heading}
                                    section={section}
                                    index={i}
                                    totalSections={guide.sections.length}
                                />
                            ))}
                        </div>

                        {/* ─── Author Bio ─── */}
                        <div className="mt-16 md:mt-20 flex flex-col sm:flex-row items-start gap-6 p-8 rounded-3xl bg-secondary/30 border border-border/50">
                            <img
                                src="/images/headshot.jpg"
                                alt="Carter Mitchell"
                                className="w-20 h-20 rounded-full object-cover flex-shrink-0 shadow-sm border-2 border-primary/20"
                            />
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">Written by Carter Mitchell</h3>
                                <p className="text-foreground/70 text-base leading-relaxed max-w-2xl">
                                    Carter is the founder of Crewtrace. He built Crewtrace to help construction and field service companies eliminate payroll leaks, automate GPS time tracking, and protect their bottom line.
                                </p>
                            </div>
                        </div>

                        {/* ─── Related Comparisons ─── */}
                        {relatedComparisons.length > 0 && (
                            <section className="mt-20 md:mt-24 pt-16 border-t border-foreground/10">
                                <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
                                    Compare vendor options
                                </h3>
                                <p className="text-foreground/60 mb-8 max-w-2xl">
                                    Evaluating solutions? Use these neutral
                                    comparison pages to connect this
                                    implementation guidance with a decision path.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {relatedComparisons.map((competitor) => (
                                        <Link
                                            key={competitor.slug}
                                            href={`/compare/${competitor.slug}`}
                                            className="group relative flex items-center justify-between p-5 rounded-2xl border border-foreground/10 bg-white hover:border-primary/30 hover:shadow-sm transition-all overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="font-semibold text-foreground/80 group-hover:text-primary transition-colors relative z-10 w-full pr-6">
                                                Crewtrace vs {competitor.name}
                                            </span>
                                            <span className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all relative z-10 font-bold">
                                                &rarr;
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </article>
                </div>

                {/* ─── Full-width CTA ─── */}
                <div className="max-w-7xl mx-auto mt-24 md:mt-32">
                    <section className="relative overflow-hidden rounded-[2rem] bg-primary text-white p-10 md:p-16 lg:p-20 shadow-xl">
                        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20 pointer-events-none">
                            <div className="w-[400px] h-[400px] rounded-full bg-white/30 blur-3xl" />
                        </div>
                        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 opacity-20 pointer-events-none">
                            <div className="w-[300px] h-[300px] rounded-full bg-white/30 blur-3xl" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                            <div className="max-w-xl">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.1]">
                                    Ready to implement this workflow?
                                </h2>
                                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium">
                                    Get a personalized action plan. We&apos;ll
                                    map your current process and show you how to
                                    streamline it with the right tools.
                                </p>
                            </div>
                            <div className="shrink-0 pt-4 md:pt-0">
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-base md:text-lg font-bold text-primary shadow-sm hover:scale-105 transition-all duration-200"
                                >
                                    Get a Personalized Demo
                                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                                        &rarr;
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
