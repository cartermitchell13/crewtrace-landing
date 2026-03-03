import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { guides } from "@/lib/guides";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Construction Time Tracking Guides",
    description:
        "Actionable implementation guides for GPS time tracking, geofencing, payroll exports, and compliance workflows.",
    path: "/guides",
});

export default function GuidesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6">
                <section className="max-w-6xl mx-auto text-center mb-14">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        Guides
                    </span>
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Practical playbooks for cleaner labor operations
                    </h1>
                    <p className="mt-5 text-lg text-foreground/60 max-w-3xl mx-auto">
                        Use these guides to roll out modern time tracking without chaos and keep payroll + compliance workflows predictable.
                    </p>
                </section>

                <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {guides.map((guide) => (
                        <article
                            key={guide.slug}
                            className="rounded-2xl border border-foreground/10 bg-white p-7 hover:border-primary/20 hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                                <span>{guide.category}</span>
                                <span aria-hidden>•</span>
                                <span>{guide.readTime}</span>
                            </div>
                            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                                {guide.title}
                            </h2>
                            <p className="mt-3 text-sm text-foreground/60 leading-relaxed">{guide.summary}</p>
                            <Link
                                href={`/guides/${guide.slug}`}
                                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                                Read guide
                                <span aria-hidden>→</span>
                            </Link>
                        </article>
                    ))}
                </section>
            </main>
            <Footer />
        </div>
    );
}
