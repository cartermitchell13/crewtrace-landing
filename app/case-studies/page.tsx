import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { caseStudies } from "@/lib/caseStudies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Construction Case Studies",
    description:
        "Read real-world Crewtrace case studies showing how contractors reduce payroll leakage and improve labor visibility.",
    path: "/case-studies",
});

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6">
                <section className="max-w-6xl mx-auto text-center mb-14">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        Case Studies
                    </span>
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Proven outcomes from contractor teams using Crewtrace
                    </h1>
                    <p className="mt-5 text-lg text-foreground/60 max-w-3xl mx-auto">
                        See how field and office teams are reducing payroll errors, accelerating approvals, and creating cleaner labor records.
                    </p>
                </section>

                <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {caseStudies.map((study) => (
                        <article
                            key={study.slug}
                            className="rounded-2xl border border-foreground/10 bg-white p-6 hover:border-primary/20 hover:shadow-xl transition-all"
                        >
                            <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                                {study.industry}
                            </p>
                            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                                {study.title}
                            </h2>
                            <p className="mt-3 text-sm text-foreground/60 leading-relaxed">{study.summary}</p>
                            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                                {study.outcomes.slice(0, 2).map((outcome) => (
                                    <li key={outcome} className="flex gap-2">
                                        <span aria-hidden>•</span>
                                        <span>{outcome}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={`/case-studies/${study.slug}`}
                                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                                Read case study
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
