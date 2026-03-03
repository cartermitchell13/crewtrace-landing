import type { Metadata } from "next";
import Link from "next/link";
import {
    Droplets,
    HardHat,
    Home,
    Layers,
    Trees,
    Wind,
    type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";
import {
    getTemplateMessaging,
    orderedPromiseLine,
    publicIcpPhrase,
} from "@/lib/messaging";
import {
    getIndustrySummaries,
    requiredPriorityIndustrySlugs,
    type IndustryIconKey,
} from "@/lib/industries";
import { getFeaturesBySlugs } from "@/lib/solutions";

const priorityTradeSet = new Set<string>(requiredPriorityIndustrySlugs);
const industrySummaries = getIndustrySummaries().sort((a, b) => {
    const aPriority = priorityTradeSet.has(a.slug) ? 0 : 1;
    const bPriority = priorityTradeSet.has(b.slug) ? 0 : 1;
    if (aPriority !== bPriority) {
        return aPriority - bPriority;
    }
    const byName = a.name.localeCompare(b.name);
    if (byName !== 0) {
        return byName;
    }
    return a.slug.localeCompare(b.slug);
});

const iconByKey: Partial<Record<IndustryIconKey, LucideIcon>> = {
    home: Home,
    wind: Wind,
    droplets: Droplets,
    "hard-hat": HardHat,
    trees: Trees,
    layers: Layers,
};

const industriesMessaging = getTemplateMessaging("industries_hub");

export const metadata: Metadata = createPageMetadata({
    title: "Industries | GPS Time Tracking for Contractors",
    description:
        `Explore industry-specific Crewtrace pages built ${publicIcpPhrase}. ${orderedPromiseLine}`,
    path: "/industries",
});

function getIndustrySolutions(relatedSolutions: string[]) {
    return getFeaturesBySlugs(relatedSolutions).slice(0, 2);
}

export default function IndustriesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pb-20 pt-32">
                <section className="px-6">
                    <div className="mx-auto max-w-6xl rounded-[2rem] border border-foreground/10 bg-white p-8 md:p-12">
                        <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                            Industry hub
                        </p>
                        <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                            {industriesMessaging.intentHeadline}
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/70 md:text-lg">
                            Start with your trade page, then open linked feature workflows to map an
                            implementation sequence. {industriesMessaging.proofBody}
                        </p>
                        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/55 md:text-base">
                            Built {publicIcpPhrase}. {orderedPromiseLine}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/features"
                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-button transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0"
                            >
                                Explore feature workflows
                                <span aria-hidden>{"->"}</span>
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-xl border border-foreground/15 bg-white px-5 py-3 text-sm font-bold text-foreground/70 transition-colors hover:border-primary/30 hover:text-primary"
                            >
                                Get rollout advice
                                <span aria-hidden>{"->"}</span>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="px-6 pt-10 md:pt-12">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {industrySummaries.map((industry) => {
                                const IndustryIcon = iconByKey[industry.icon] ?? Layers;
                                return (
                                    <article
                                        key={industry.slug}
                                        className="group relative rounded-2xl border border-foreground/10 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl"
                                    >
                                        <div className="mb-5 inline-flex h-13 w-13 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                                            <IndustryIcon size={24} />
                                        </div>

                                        <Link
                                            href={`/industries/${industry.slug}`}
                                            className="inline-flex text-xl font-bold text-foreground transition-colors group-hover:text-primary"
                                        >
                                            {industry.name}
                                        </Link>

                                        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                                            {industry.description}
                                        </p>

                                        {priorityTradeSet.has(industry.slug) && (
                                            <p className="mt-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                                                Priority trade
                                            </p>
                                        )}

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {getIndustrySolutions(industry.relatedSolutions).map((solution) => (
                                                <Link
                                                    key={solution.slug}
                                                    href={`/features/${solution.slug}`}
                                                    className="rounded-full border border-foreground/10 px-2.5 py-1 text-[11px] font-semibold text-foreground/65 transition-colors hover:border-primary/20 hover:text-primary"
                                                >
                                                    {solution.name}
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                                                {industry.stats}
                                            </span>
                                            <Link
                                                href={`/industries/${industry.slug}`}
                                                className="inline-flex items-center gap-1 text-sm font-bold text-primary"
                                            >
                                                View industry
                                                <span aria-hidden>{"->"}</span>
                                            </Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="px-6 pt-12 md:pt-14">
                    <div className="mx-auto max-w-6xl rounded-3xl border border-foreground/10 bg-[#FBFBFE] p-8 md:p-10">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                            Need a custom workflow for your trade mix?
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">
                            If your crews span multiple trades, we can map a rollout order using your
                            highest payroll-risk workflows first.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-button transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0"
                        >
                            Talk through your setup
                            <span aria-hidden>{"->"}</span>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
