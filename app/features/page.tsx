import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    getTemplateMessaging,
    orderedPromiseLine,
    publicIcpPhrase,
} from "@/lib/messaging";
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

const featuresMessaging = getTemplateMessaging("features_hub");

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
            <main className="pb-20 pt-32">
                <section className="px-6">
                    <div className="mx-auto max-w-6xl rounded-[2rem] border border-foreground/10 bg-white p-8 md:p-12">
                        <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                            Feature hub
                        </p>
                        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                            {featuresMessaging.intentHeadline}
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/70 md:text-lg">
                            Find the fastest control to deploy first, then expand with adjacent
                            workflows. {featuresMessaging.proofBody}
                        </p>
                        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/55 md:text-base">
                            Built {publicIcpPhrase}. {orderedPromiseLine}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/industries"
                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-button transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0"
                            >
                                Browse industries
                                <span aria-hidden>{"->"}</span>
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-xl border border-foreground/15 bg-white px-5 py-3 text-sm font-bold text-foreground/70 transition-colors hover:border-primary/30 hover:text-primary"
                            >
                                Talk to a specialist
                                <span aria-hidden>{"->"}</span>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="px-6 pt-10 md:pt-12">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
                        {featureSummaries.map((feature) => (
                            <article
                                key={feature.slug}
                                className="group rounded-3xl border border-foreground/10 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl"
                            >
                                <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                                    {feature.primaryKeyword}
                                </p>
                                <Link
                                    href={`/features/${feature.slug}`}
                                    className="mt-3 inline-flex text-2xl font-bold text-foreground transition-colors group-hover:text-primary"
                                >
                                    {feature.name}
                                </Link>
                                <p className="mt-2 text-sm font-semibold text-foreground/55">
                                    {feature.tagline}
                                </p>
                                <p className="mt-4 text-base leading-relaxed text-foreground/70">
                                    {feature.description}
                                </p>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {sortIndustrySlugs(feature.relatedIndustries).map((industrySlug) => (
                                        <Link
                                            key={industrySlug}
                                            href={`/industries/${industrySlug}`}
                                            className="rounded-full border border-foreground/10 px-3 py-1 text-xs font-semibold text-foreground/60 transition-colors hover:border-primary/20 hover:text-primary"
                                        >
                                            {toIndustryName(industrySlug)}
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href={`/features/${feature.slug}`}
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                                >
                                    Explore feature workflow
                                    <span aria-hidden>{"->"}</span>
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="px-6 pt-12 md:pt-14">
                    <div className="mx-auto max-w-6xl rounded-3xl border border-foreground/10 bg-[#FBFBFE] p-8 md:p-10">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                            Pick one workflow this week and ship it end-to-end.
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">
                            Start with your top payroll risk, implement one feature workflow, and
                            connect it to your trade page for a complete rollout path.
                        </p>
                        <Link
                            href="/industries"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-button transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0"
                        >
                            Match workflow to industry
                            <span aria-hidden>{"->"}</span>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
