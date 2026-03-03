import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { guideBySlug, guideSlugs } from "@/lib/guides";
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
                        href="/guides"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-primary transition-colors"
                    >
                        <span aria-hidden>←</span>
                        Back to guides
                    </Link>

                    <header className="mt-6 rounded-3xl border border-foreground/10 bg-white p-8 md:p-10">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                            <span>{guide.category}</span>
                            <span aria-hidden>•</span>
                            <span>{guide.readTime}</span>
                        </div>
                        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                            {guide.title}
                        </h1>
                        <p className="mt-4 text-lg text-foreground/60 leading-relaxed">
                            {guide.summary}
                        </p>
                    </header>

                    <div className="mt-8 space-y-6">
                        {guide.sections.map((section) => (
                            <section
                                key={section.heading}
                                className="rounded-3xl border border-foreground/10 bg-white p-8"
                            >
                                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                    {section.heading}
                                </h2>
                                <ul className="mt-4 space-y-3 text-foreground/70">
                                    {section.points.map((point) => (
                                        <li key={point} className="flex gap-3">
                                            <span aria-hidden>•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>

                    <section className="mt-8 rounded-3xl bg-primary text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                                Want help implementing this in your workflow?
                            </h2>
                            <p className="mt-2 text-white/80">
                                We can map your current process and provide a practical rollout plan.
                            </p>
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
