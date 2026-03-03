import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { caseStudyBySlug, caseStudySlugs } from "@/lib/caseStudies";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
    return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const study = caseStudyBySlug[slug];

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
    const study = caseStudyBySlug[slug];

    if (!study) {
        notFound();
    }

    const articleJsonLd = articleSchema({
        headline: study.title,
        description: study.summary,
        path: `/case-studies/${slug}`,
        authorName: study.author,
    });

    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Case Studies", path: "/case-studies" },
        { name: study.title, path: `/case-studies/${slug}` },
    ]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6">
                <article className="max-w-4xl mx-auto">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                    />
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-primary transition-colors"
                    >
                        <span aria-hidden>←</span>
                        Back to case studies
                    </Link>

                    <header className="mt-6 rounded-3xl border border-foreground/10 bg-white p-8 md:p-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                            {study.industry}
                        </p>
                        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                            {study.title}
                        </h1>
                        <p className="mt-4 text-lg text-foreground/60 leading-relaxed">
                            {study.summary}
                        </p>
                    </header>

                    <section className="mt-8 rounded-3xl border border-red-200 bg-red-50/40 p-8">
                        <h2 className="text-2xl font-bold tracking-tight text-red-700">Challenge</h2>
                        <p className="mt-3 text-red-800/90 leading-relaxed">{study.challenge}</p>
                    </section>

                    <section className="mt-8 rounded-3xl border border-primary/20 bg-primary/5 p-8">
                        <h2 className="text-2xl font-bold tracking-tight text-primary">Approach</h2>
                        <ul className="mt-4 space-y-3 text-foreground/70">
                            {study.approach.map((step) => (
                                <li key={step} className="flex gap-3">
                                    <span aria-hidden>•</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50/40 p-8">
                        <h2 className="text-2xl font-bold tracking-tight text-emerald-700">Outcomes</h2>
                        <ul className="mt-4 space-y-3 text-emerald-900/90">
                            {study.outcomes.map((outcome) => (
                                <li key={outcome} className="flex gap-3">
                                    <span aria-hidden>•</span>
                                    <span>{outcome}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-8 rounded-3xl bg-[#050315] text-white p-8 md:p-10">
                        <p className="text-xl md:text-2xl font-bold leading-relaxed">“{study.quote}”</p>
                        <p className="mt-4 text-white/70 font-semibold">
                            {study.author} — {study.company}
                        </p>
                    </section>

                    <section className="mt-8 rounded-3xl border border-foreground/10 bg-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                Want similar outcomes in your business?
                            </h2>
                            <p className="mt-2 text-foreground/60">
                                We can map your current process and show where leakage is happening.
                            </p>
                        </div>
                        <a
                            href="https://cal.com/crewtrace/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white"
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
