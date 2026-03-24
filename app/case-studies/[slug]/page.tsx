import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCompetitorsByCaseStudySlug } from "@/lib/competitors";
import { getAllCaseStudies, getCaseStudy, getCaseStudyBySlug } from "@/lib/caseStudies";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import {
    ArrowRight,
    ArrowUpRight,
    Building2,
    CheckCircle2,
    ChevronLeft,
    Quote,
} from "lucide-react";

export function generateStaticParams() {
    return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const study = getCaseStudyBySlug(slug);

    if (!study) {
        return createPageMetadata({
            title: "Case Study Not Found",
            description: "The requested case study could not be found.",
            path: "/case-studies",
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: study.title,
        description: study.summary,
        path: `/case-studies/${slug}`,
    });
}

export default async function CaseStudyDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const study = await getCaseStudy(slug);

    if (!study) {
        notFound();
    }

    const relatedComparisons = getCompetitorsByCaseStudySlug(study.slug).sort((left, right) =>
        left.name.localeCompare(right.name),
    );

    const articleJsonLd = articleSchema({
        headline: study.title,
        description: study.summary,
        path: `/case-studies/${slug}`,
        authorName: study.author,
        datePublished: study.publishedOn,
    });

    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Case Studies", path: "/case-studies" },
        { name: study.title, path: `/case-studies/${slug}` },
    ]);

    return (
        <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
            <Navbar />
            <main className="pb-20">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />

                <header className="relative w-full overflow-hidden border-b border-border/40 pb-20 pt-32 text-white lg:pb-28 lg:pt-40">
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#050315]" />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[url('/images/background-design-ct.png')] bg-cover bg-center bg-no-repeat"
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050315]/55 via-[#050315]/35 to-[#050315]/50" />

                    <div className="relative z-10 mx-auto max-w-6xl px-6">
                        <div className="mb-10">
                            <Link
                                href="/case-studies"
                                className="group inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-white"
                            >
                                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Back to Customer Stories
                            </Link>
                        </div>

                        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
                            <div className="max-w-3xl">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                                        <Building2 className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-blue-200">
                                            {study.industry}
                                        </div>
                                        <div className="text-base font-medium text-white">
                                            {study.company}
                                        </div>
                                    </div>
                                </div>

                                <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
                                    {study.title}
                                </h1>
                                <div className="max-w-2xl text-lg font-medium leading-relaxed text-slate-200 md:text-xl">
                                    {study.summary}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mx-auto mt-16 max-w-6xl px-6 md:mt-24">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                        <article className="lg:col-span-8">
                            <p className="mb-8 text-xl font-medium text-foreground/90 md:text-2xl">
                                {study.lead ??
                                    `${study.company} needed cleaner labor records and faster payroll approvals. This is how they implemented a repeatable system and proved impact quickly.`}
                            </p>

                            <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-3xl border border-border/50 bg-foreground/5">
                                {study.heroImage ? (
                                    <Image
                                        src={study.heroImage}
                                        alt={study.heroImageAlt ?? `${study.company} case study hero image`}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 66vw, 100vw"
                                        priority
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm font-bold uppercase tracking-widest text-foreground/50">
                                        Case Study Hero Image
                                    </div>
                                )}
                                {study.heroLogo ? (
                                    <>
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/20 to-transparent"
                                        />
                                        <div className="absolute inset-0 z-[2] flex flex-col justify-center px-8 py-8 text-white md:px-12 md:py-10">
                                            <div className="mb-5 inline-flex w-fit max-w-[min(100%,20rem)] rounded-2xl bg-white px-4 py-3 shadow-lg ring-1 ring-black/10">
                                                <Image
                                                    src={study.heroLogo}
                                                    alt={`${study.company} logo`}
                                                    width={320}
                                                    height={96}
                                                    className="h-11 w-auto max-w-full object-contain object-left sm:h-12"
                                                    priority
                                                />
                                            </div>
                                            {study.heroCardEyebrow ? (
                                                <span className="block text-xs font-bold uppercase tracking-[0.2em] !text-white">
                                                    {study.heroCardEyebrow}
                                                </span>
                                            ) : null}
                                            <h2 className="mt-2 max-w-2xl text-2xl font-black leading-[1.15] tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl">
                                                {study.heroCardTitle ?? study.title}
                                            </h2>
                                        </div>
                                    </>
                                ) : null}
                            </div>

                            <div
                                className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-p:text-foreground/80 prose-p:leading-relaxed prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-border/50 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl"
                                dangerouslySetInnerHTML={{ __html: study.contentHtml }}
                            />

                            <blockquote className="my-10 rounded-r-2xl border-l-4 border-primary bg-primary/5 px-8 py-8 text-xl font-medium italic leading-relaxed text-foreground/80 md:text-2xl">
                                <span aria-hidden>&ldquo;</span>
                                {study.quote}
                                <span aria-hidden>&rdquo;</span>
                            </blockquote>

                            <h2 className="mt-12 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                Implementation Sequence
                            </h2>
                            <p className="mt-4 text-lg font-medium leading-relaxed text-foreground/70">
                                The team rolled out the process in deliberate phases tied to payroll-close outcomes.
                            </p>

                            <div className="my-10 space-y-6">
                                {study.approach.map((step, index) => (
                                    <div key={step} className="group flex gap-6">
                                        <div className="flex flex-col items-center">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-lg font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                                {index + 1}
                                            </div>
                                            {index !== study.approach.length - 1 && (
                                                <div className="mt-2 h-full min-h-[40px] w-px bg-primary/20" />
                                            )}
                                        </div>
                                        <div className="flex-1 pb-6 pt-2">
                                            <p className="mb-3 text-xl font-bold tracking-tight text-foreground">
                                                Phase {index + 1}
                                            </p>
                                            <p className="text-lg font-medium leading-relaxed text-foreground/70">
                                                {step}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="relative my-12 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border/50 bg-foreground/5">
                                {study.resultsImage ? (
                                    <Image
                                        src={study.resultsImage}
                                        alt={study.resultsImageAlt ?? `${study.company} results dashboard image`}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 66vw, 100vw"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm font-bold uppercase tracking-widest text-foreground/50">
                                        Results Dashboard Image
                                    </div>
                                )}
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                Measured Outcomes
                            </h2>
                            <p className="mt-4 text-lg font-medium leading-relaxed text-foreground/70">
                                Verified improvements observed after rollout.
                            </p>

                            <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {study.outcomes.map((outcome) => (
                                    <div
                                        key={outcome}
                                        className="flex items-start gap-4 rounded-2xl border border-emerald-100/50 bg-emerald-50/50 p-6 transition-shadow hover:shadow-md dark:border-emerald-900/30 dark:bg-emerald-950/20"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-600" />
                                        <p className="text-base font-semibold leading-snug text-emerald-900/90 dark:text-emerald-100">
                                            {outcome}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-lg leading-relaxed text-foreground/75">
                                {study.company} now operates with fewer payroll disputes, faster approvals, and a labor dataset the whole team can trust.
                            </p>
                        </article>

                        <div className="space-y-8 lg:col-span-4">
                            <div className="sticky top-32 space-y-8">
                                <div className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-white shadow-xl">
                                    <div className="absolute right-0 top-0 p-6 opacity-10">
                                        <Quote className="h-24 w-24 rotate-180" />
                                    </div>
                                    <div className="relative z-10">
                                        <Quote className="mb-6 h-8 w-8 fill-current text-white/40" />
                                        <div className="mb-8 text-xl font-bold leading-normal text-white md:text-2xl">
                                            <span aria-hidden>&ldquo;</span>
                                            {study.quote}
                                            <span aria-hidden>&rdquo;</span>
                                        </div>
                                        <div className="flex items-center gap-4 border-t border-white/20 pt-6">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold text-white">
                                                {study.author.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold tracking-tight text-white">
                                                    {study.author}
                                                </div>
                                                <div className="text-sm font-medium text-slate-100">
                                                    {study.company}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-border/50 bg-foreground/[0.03] p-8">
                                    <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-foreground/40">
                                        Company Overview
                                    </h3>
                                    <dl className="space-y-4">
                                        <div className="flex items-center justify-between border-b border-border/50 pb-4">
                                            <dt className="text-sm font-medium text-foreground/60">
                                                Industry
                                            </dt>
                                            <dd className="text-right text-sm font-bold text-foreground">
                                                {study.industry}
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-border/50 pb-4">
                                            <dt className="text-sm font-medium text-foreground/60">
                                                Company
                                            </dt>
                                            <dd className="text-right text-sm font-bold text-foreground">
                                                {study.company}
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between pb-2">
                                            <dt className="text-sm font-medium text-foreground/60">
                                                Solution Used
                                            </dt>
                                            <dd className="text-right text-sm font-bold text-foreground">
                                                Crewtrace Time and GPS
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                {relatedComparisons.length > 0 && (
                                    <div className="rounded-3xl border border-border/60 bg-white p-8 shadow-sm dark:bg-[#0A0A0A]">
                                        <h3 className="mb-3 text-lg font-bold tracking-tight text-foreground dark:text-white">
                                            Evaluating your options?
                                        </h3>
                                        <p className="mb-6 text-sm leading-relaxed text-foreground/60 dark:text-white/60">
                                            See how Crewtrace stacks up against other tools you might be considering.
                                        </p>
                                        <div className="space-y-3">
                                            {relatedComparisons.map((competitor) => (
                                                <Link
                                                    key={competitor.slug}
                                                    href={`/compare/${competitor.slug}`}
                                                    className="group flex items-center justify-between rounded-xl border border-border/50 p-4 transition-all hover:border-primary/50 hover:bg-primary/5 dark:border-white/10 dark:bg-white/5"
                                                >
                                                    <span className="text-sm font-bold text-foreground transition-colors group-hover:text-primary dark:text-white">
                                                        vs {competitor.name}
                                                    </span>
                                                    <ArrowUpRight className="h-4 w-4 text-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary dark:text-white/30" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="relative mb-10 mt-24 overflow-hidden rounded-[2.5rem] bg-primary text-white shadow-2xl md:mt-32">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
                        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white/20 blur-[100px]" />

                        <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16 text-center md:px-16 md:py-20">
                            <h2 className="mb-6 text-3xl font-black tracking-tight md:text-5xl">
                                Deliver results like {study.company}
                            </h2>
                            <div className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-white/80 md:text-xl">
                                Find out exactly where your business is leaking payroll dollars. Book a free, no-obligation audit with our team today.
                            </div>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                            >
                                Get a Personalized Demo
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
