import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { competitorRecords } from "@/lib/competitors";
import {
    getTemplateMessaging,
    orderedPromiseLine,
    publicIcpPhrase,
} from "@/lib/messaging";
import { createPageMetadata } from "@/lib/seo";

const compareMessaging = getTemplateMessaging("compare_hub");

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
            <main className="px-6 pb-20 pt-32">
                <section className="mx-auto max-w-6xl rounded-[2rem] border border-foreground/10 bg-white p-8 md:p-12">
                    <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        Compare options
                    </p>
                    <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                        {compareMessaging.intentHeadline}
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/70 md:text-lg">
                        Use these pages to pressure-test fit with factual framing, proof links, and
                        clear next-step guidance.
                    </p>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/55 md:text-base">
                        Built {publicIcpPhrase}. {orderedPromiseLine}
                    </p>
                </section>

                <section className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
                    {sortedCompetitors.map((competitor) => (
                        <article
                            key={competitor.slug}
                            className="rounded-2xl border border-foreground/10 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-xl"
                        >
                            <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                                {competitor.primaryKeyword}
                            </p>
                            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                                {competitor.name} comparison guide
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                                {competitor.pageSummary}
                            </p>
                            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-foreground/45">
                                Last reviewed {competitor.lastReviewedOn} | every{" "}
                                {competitor.reviewCadenceDays} days
                            </p>
                            <Link
                                href={`/compare/${competitor.slug}`}
                                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                            >
                                Read full comparison
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
