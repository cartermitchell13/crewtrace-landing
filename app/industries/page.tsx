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
import { orderedPromiseLine, publicIcpPhrase } from "@/lib/messaging";
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
            <main className="pt-32 pb-20">
                <section className="px-6 text-center mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                            Built for the trades that build America
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
                            Crewtrace is designed specifically for construction and trade businesses.
                            See how contractors in your industry reduce payroll overpayment first,
                            improve compliance confidence second, and spend less payroll admin time every week.
                        </p>
                    </div>
                </section>

                <section className="px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {industrySummaries.map((industry) => {
                                const IndustryIcon = iconByKey[industry.icon] ?? Layers;
                                return (
                                    <article
                                        key={industry.slug}
                                        className="group relative bg-white border border-foreground/5 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <IndustryIcon size={28} />
                                        </div>
                                        <Link
                                            href={`/industries/${industry.slug}`}
                                            className="inline-flex text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors"
                                        >
                                            {industry.name}
                                        </Link>
                                        <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
                                            {industry.description}
                                        </p>
                                        {priorityTradeSet.has(industry.slug) && (
                                            <p className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                                                Priority Trade
                                            </p>
                                        )}
                                        <div className="mb-5 flex flex-wrap gap-2">
                                            {getIndustrySolutions(industry.relatedSolutions).map((solution) => (
                                                <Link
                                                    key={solution.slug}
                                                    href={`/features/${solution.slug}`}
                                                    className="rounded-full border border-foreground/10 px-2.5 py-1 text-[11px] font-semibold text-foreground/60 hover:border-primary/20 hover:text-primary transition-colors"
                                                >
                                                    {solution.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                                {industry.stats}
                                            </span>
                                            <Link
                                                href={`/industries/${industry.slug}`}
                                                className="inline-flex items-center gap-1 text-sm font-semibold text-foreground/50 group-hover:text-primary transition-colors"
                                            >
                                                View industry
                                                <svg
                                                    className="w-4 h-4 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="px-6 mt-16">
                    <div className="max-w-6xl mx-auto rounded-3xl border border-foreground/10 bg-[#FBFBFE] p-8 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                            Pair your industry page with the right feature workflow
                        </h2>
                        <p className="mt-3 text-foreground/60 max-w-2xl">
                            Start with your trade-specific page, then drill into features for compliance,
                            geofencing, and payroll exports.
                        </p>
                        <Link
                            href="/features"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-button"
                        >
                            Explore features
                            <span aria-hidden>{"->"}</span>
                        </Link>
                    </div>
                </section>

                <section className="px-6 mt-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                            Do not see your industry?
                        </h2>
                        <p className="text-foreground/60 mb-8">
                            Crewtrace works for any trade that needs accurate time tracking.
                            Let&apos;s talk about your specific needs.
                        </p>
                        <a
                            href="https://cal.com/crewtrace/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all active:translate-y-[0px] active:translate-x-[0px]"
                        >
                            Contact Us
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
