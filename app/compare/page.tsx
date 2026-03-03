import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { competitorRecords } from "@/lib/competitors";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Crewtrace Comparison Guides for Connecteam and Workyard",
    description:
        "Neutral, factual comparison pages for teams evaluating Connecteam or Workyard alternatives for payroll-safe field operations.",
    path: "/compare",
});

export default function CompareHubPage() {
    const sortedCompetitors = [...competitorRecords].sort((left, right) =>
        left.name.localeCompare(right.name),
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6">
                <section className="max-w-6xl mx-auto text-center mb-14">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        Compare options
                    </span>
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Compare Crewtrace against common field-time alternatives
                    </h1>
                    <p className="mt-5 text-lg text-foreground/60 max-w-3xl mx-auto">
                        Use these pages to evaluate fit, payroll-control workflows, and implementation risk
                        with factual framing and proof-linked resources.
                    </p>
                </section>

                <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedCompetitors.map((competitor) => (
                        <article
                            key={competitor.slug}
                            className="rounded-2xl border border-foreground/10 bg-white p-7 hover:border-primary/20 hover:shadow-xl transition-all"
                        >
                            <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                                {competitor.primaryKeyword}
                            </p>
                            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                                {competitor.name} comparison guide
                            </h2>
                            <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                                {competitor.pageSummary}
                            </p>
                            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-foreground/40">
                                Last reviewed {competitor.lastReviewedOn} | every{" "}
                                {competitor.reviewCadenceDays} days
                            </p>
                            <Link
                                href={`/compare/${competitor.slug}`}
                                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                                Read comparison
                                <span aria-hidden>{"->"}</span>
                            </Link>
                        </article>
                    ))}
                </section>
            </main>
            <Footer />
        </div>
    );
}
