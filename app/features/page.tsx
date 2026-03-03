import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { orderedPromiseLine, publicIcpPhrase } from "@/lib/messaging";
import { industryBySlug } from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo";
import { getFeatureSummaries } from "@/lib/solutions";

const featureSummaries = getFeatureSummaries().sort((left, right) => {
    const byName = left.name.localeCompare(right.name);
    if (byName !== 0) {
        return byName;
    }
    return left.slug.localeCompare(right.slug);
});

export const metadata: Metadata = createPageMetadata({
    title: "Features | Contractor Time Tracking and Payroll Controls",
    description:
        `Explore Crewtrace feature workflows built ${publicIcpPhrase}. ${orderedPromiseLine}`,
    path: "/features",
});

function toIndustryName(slug: string) {
    const record = industryBySlug[slug];
    if (record) {
        return record.name;
    }

    return slug
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function sortIndustrySlugs(slugs: string[]) {
    return [...slugs].sort((a, b) => toIndustryName(a).localeCompare(toIndustryName(b)));
}

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20">
                <section className="px-6 text-center mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                            Crewtrace features that close payroll leakage
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
                            Every feature is built for crews in the field and payroll teams in the office.
                            Start with the workflow you need now, then layer in additional controls as you scale.
                        </p>
                    </div>
                </section>

                <section className="px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featureSummaries.map((feature) => (
                            <article
                                key={feature.slug}
                                className="group rounded-3xl border border-foreground/10 bg-white p-8 hover:border-primary/30 hover:shadow-xl transition-all"
                            >
                                <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                                    {feature.primaryKeyword}
                                </p>
                                <Link
                                    href={`/features/${feature.slug}`}
                                    className="inline-flex text-2xl font-bold text-foreground mt-3 group-hover:text-primary transition-colors"
                                >
                                    {feature.name}
                                </Link>
                                <p className="text-foreground/60 text-sm mt-2">
                                    {feature.tagline}
                                </p>
                                <p className="text-foreground/70 mt-5 leading-relaxed">
                                    {feature.description}
                                </p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {sortIndustrySlugs(feature.relatedIndustries).map((industrySlug) => (
                                        <Link
                                            key={industrySlug}
                                            href={`/industries/${industrySlug}`}
                                            className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-semibold text-foreground/60 hover:border-primary/20 hover:text-primary transition-colors"
                                        >
                                            {toIndustryName(industrySlug)}
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href={`/features/${feature.slug}`}
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                                >
                                    Explore feature
                                    <span aria-hidden>{"->"}</span>
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="px-6 mt-16">
                    <div className="max-w-6xl mx-auto rounded-3xl border border-foreground/10 bg-[#FBFBFE] p-8 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                            Build your playbook by pairing features with your trade
                        </h2>
                        <p className="mt-3 text-foreground/60 max-w-2xl">
                            Use the feature hub to choose a workflow, then open your industry page for
                            implementation details and role-specific outcomes.
                        </p>
                        <Link
                            href="/industries"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-button"
                        >
                            Browse industries
                            <span aria-hidden>{"->"}</span>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
