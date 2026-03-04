import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllCaseStudies } from "@/lib/caseStudies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Construction Case Studies",
    description:
        "Read real-world Crewtrace case studies showing how contractors reduce payroll leakage and improve labor visibility.",
    path: "/case-studies",
});

export default function CaseStudiesPage() {
    const studies = getAllCaseStudies();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="px-6 pb-20 pt-32">
                <section className="mx-auto mb-14 max-w-6xl text-center">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        Case Studies
                    </span>
                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                        Proven outcomes from contractor teams using Crewtrace
                    </h1>
                    <p className="mx-auto mt-5 max-w-3xl text-lg text-foreground/60">
                        See how field and office teams are reducing payroll errors, accelerating approvals, and creating cleaner labor records.
                    </p>
                </section>

                <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {studies.map((study) => (
                        <article
                            key={study.slug}
                            className="overflow-hidden rounded-2xl border border-foreground/10 bg-white transition-all hover:border-primary/20 hover:shadow-xl"
                        >
                            <div className="relative aspect-[16/9] w-full bg-foreground/5">
                                {study.heroImage ? (
                                    <Image
                                        src={study.heroImage}
                                        alt={study.heroImageAlt ?? `${study.company} case study cover image`}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                                    />
                                ) : null}
                            </div>

                            <div className="p-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                                    {study.industry}
                                </p>
                                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                                    {study.title}
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                                    {study.summary}
                                </p>
                                <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                                    {study.outcomes.slice(0, 2).map((outcome) => (
                                        <li key={outcome} className="flex gap-2">
                                            <span aria-hidden>{"*"}</span>
                                            <span>{outcome}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={`/case-studies/${study.slug}`}
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                                >
                                    Read case study
                                    <span aria-hidden>{"->"}</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
            <Footer />
        </div>
    );
}
