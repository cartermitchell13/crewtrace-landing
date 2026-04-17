import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Clock,
    Droplets,
    HardHat,
    Home,
    Layers,
    MapPin,
    Trees,
    TrendingUp,
    Wind,
    Users,
    type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
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
import { industriesHubFaqItems } from "@/lib/faq";

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

const industrySpotlights = [
    {
        slug: "roofing",
        title: "Roofing",
        painPoint: "Early punch-in fraud — crews claiming 6 AM arrival when they really showed at 7. Multiply by 15 workers, 5 days a week.",
        image: "/images/case-studies/ramirez-roofing-hero.svg",
        imageAlt: "Roofing crew on a commercial re-roof project",
    },
    {
        slug: "waterproofing",
        title: "Waterproofing",
        painPoint: "Paper logs that are illegible half the time, with no way to prove which site a crew was on when they claim overtime.",
        image: "/images/case-studies/sw-waterproofing-hero.svg",
        imageAlt: "Waterproofing crew applying foundation sealant",
    },
];

export default function IndustriesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-32 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />

                    <div className="mx-auto max-w-4xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                            <MapPin size={14} />
                            Industry hub
                        </p>
                        <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                            {industriesMessaging.intentHeadline}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Start with your trade page, then open linked feature workflows to map an
                            implementation sequence. {industriesMessaging.proofBody}
                        </p>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/55 md:text-base">
                            Built {publicIcpPhrase}. {orderedPromiseLine}
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                            >
                                {industriesMessaging.primaryCta}
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="/features"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-foreground/70 transition-colors hover:text-primary"
                            >
                                Explore feature workflows
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
                        {[
                            { value: "8", label: "Trades covered", icon: HardHat },
                            { value: "3", label: "Priority trades", icon: AlertTriangle },
                            { value: "2 wk", label: "Avg rollout", icon: Clock },
                            { value: "$2,100", label: "Avg monthly savings", icon: TrendingUp },
                        ].map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="rounded-2xl border border-foreground/5 bg-white p-5 text-center shadow-sm">
                                    <Icon size={18} className="mx-auto mb-2 text-primary/60" />
                                    <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/45">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="px-6 pb-24 md:pb-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {industrySummaries.map((industry) => {
                                const IndustryIcon = iconByKey[industry.icon] ?? Layers;
                                return (
                                    <article
                                        key={industry.slug}
                                        className="group relative rounded-[2rem] border border-foreground/5 bg-white p-7 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
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
                                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-primary/[0.02] blur-2xl group-hover:bg-primary/[0.06] transition-colors duration-500" />
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                <AlertTriangle size={14} />
                                Why Industry-Specific?
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Different trades. Different payroll risks.
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                A one-size-fits-all time clock treats a roofing crew the same as a landscaping team. But their compliance exposure, site patterns, and overtime risk are completely different.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
                            <div className="space-y-6">
                                <div className="rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md">
                                    <h3 className="text-xl font-bold tracking-tight text-foreground mb-4">
                                        A roofing crew running 3 active re-roofs
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            "High overtime exposure — early starts, late finishes, weather-dependent schedule changes",
                                            "DOL scrutiny — prevailing wage on commercial projects, apprenticeship ratios",
                                            "Site verification matters — crews at 3 addresses, multi-story work zones",
                                        ].map((point) => (
                                            <li key={point} className="flex gap-3 text-sm font-medium text-foreground/70 leading-relaxed">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md">
                                    <h3 className="text-xl font-bold tracking-tight text-foreground mb-4">
                                        A landscaping team hitting 15 residential stops a day
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            "Drive-time inflation — 15 address changes means 14 gaps where hours get fuzzy",
                                            "Lower overtime risk but higher buddy-punch risk — crews work independently",
                                            "Client-billable hours need site-level tracking for accurate invoicing",
                                        ].map((point) => (
                                            <li key={point} className="flex gap-3 text-sm font-medium text-foreground/70 leading-relaxed">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-[2.5rem] border border-foreground/5">
                                <Image
                                    src="/images/hub/trade-comparison-split.svg"
                                    alt="Trade-specific workflow comparison showing different field operation patterns"
                                    width={640}
                                    height={480}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="relative overflow-hidden rounded-[2.75rem] bg-[url('/images/background-design-ct.png')] bg-cover bg-center bg-no-repeat px-4 sm:px-6 md:rounded-[3.5rem]">
                            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(47,39,206,0.06)_0%,transparent_70%)]" />

                            <div className="relative z-10 py-16 sm:py-20 md:py-24">
                                <div className="mx-auto max-w-5xl">
                                    <div className="mb-12 text-center">
                                        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 backdrop-blur-sm mb-4">
                                            <TrendingUp size={14} />
                                            Real Outcomes
                                        </p>
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                                            Results from the field
                                        </h2>
                                        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/60 font-medium leading-relaxed">
                                            These are not hypothetical numbers. They come from a real waterproofing contractor who replaced paper logs with Crewtrace.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div className="rounded-[2rem] border border-white/20 bg-white/90 backdrop-blur-sm p-8 shadow-lg flex items-center gap-5">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                                <TrendingUp size={24} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <p className="text-3xl font-extrabold text-foreground">$2,100</p>
                                                <p className="text-xs font-bold uppercase tracking-widest text-foreground/45">Recovered per month</p>
                                            </div>
                                        </div>

                                        <div className="rounded-[2rem] border border-white/20 bg-white/90 backdrop-blur-sm p-8 shadow-lg flex items-center gap-5">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                <Clock size={24} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <p className="text-3xl font-extrabold text-foreground">2 Weeks</p>
                                                <p className="text-xs font-bold uppercase tracking-widest text-foreground/45">Time to ROI</p>
                                            </div>
                                        </div>

                                        <div className="rounded-[2rem] border border-white/20 bg-white/90 backdrop-blur-sm p-8 shadow-lg flex items-center gap-5">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
                                                <CheckCircle2 size={24} strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <p className="text-3xl font-extrabold text-foreground">100%</p>
                                                <p className="text-xs font-bold uppercase tracking-widest text-foreground/45">Verified timesheets</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 rounded-2xl border border-white/20 bg-white/90 backdrop-blur-sm p-6 flex items-center gap-5">
                                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-primary/10 shadow-md">
                                            <Image
                                                src="/images/jason-headshot-p-500.jpeg"
                                                alt="Jason Law, Owner of S&W Waterproofing"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold leading-relaxed text-foreground/80 italic">
                                                &ldquo;We moved off paper logs, found recurring overpayment fast, and cut payroll review time down to minutes.&rdquo;
                                            </p>
                                            <p className="mt-1 text-xs font-bold text-foreground/50">
                                                Jason Law · Owner, S&amp;W Waterproofing
                                            </p>
                                        </div>
                                        <div className="relative hidden h-10 w-28 shrink-0 sm:block">
                                            <Image
                                                src="/images/sw-logo.png"
                                                alt="S&W Waterproofing Logo"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/15 bg-amber-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-600 backdrop-blur-sm mb-6">
                                <AlertTriangle size={14} />
                                Priority Trade Spotlight
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Where payroll risk is highest
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                These trades have the highest DOL enforcement activity and the most payroll leakage exposure based on our customer data.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {industrySpotlights.map((spotlight) => (
                                <Link
                                    key={spotlight.slug}
                                    href={`/industries/${spotlight.slug}`}
                                    className="group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <div className="overflow-hidden">
                                        <Image
                                            src={spotlight.image}
                                            alt={spotlight.imageAlt}
                                            width={720}
                                            height={400}
                                            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <div className="mb-3 flex items-center gap-3">
                                            <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                                                Priority trade
                                            </p>
                                        </div>
                                        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                                            {spotlight.title}
                                        </h3>
                                        <p className="text-base leading-relaxed text-foreground/65 font-medium">
                                            {spotlight.painPoint}
                                        </p>
                                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                                            View {spotlight.title.toLowerCase()} page
                                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                <Users size={14} />
                                Related Resources
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                More ways to evaluate fit
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-10 shadow-xl">
                                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                                    Feature workflows
                                </h3>
                                <p className="mb-6 text-base text-foreground/60 font-medium leading-relaxed">
                                    Each industry page links to the feature workflows that matter most for that trade. Start here if you want to see all features in one place.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href="/features"
                                        className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-white px-5 py-3 text-sm font-bold text-foreground/70 shadow-sm transition-all hover:border-primary/20 hover:text-primary hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        Explore all features
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                    </Link>
                                    <Link
                                        href="/guides"
                                        className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-white px-5 py-3 text-sm font-bold text-foreground/70 shadow-sm transition-all hover:border-primary/20 hover:text-primary hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        Implementation guides
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-10 shadow-xl">
                                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                                    Compare platforms
                                </h3>
                                <p className="mb-6 text-base text-foreground/60 font-medium leading-relaxed">
                                    See how Crewtrace compares to Connecteam and Workyard across GPS verification, payroll exports, and compliance support.
                                </p>
                                <div className="space-y-3">
                                    <Link
                                        href="/compare/connecteam"
                                        className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/5 bg-slate-50/50 p-5 transition-all duration-300 hover:bg-white hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        <div>
                                            <p className="font-bold text-foreground group-hover:text-primary transition-colors">Crewtrace vs Connecteam</p>
                                            <p className="mt-1 text-sm font-medium text-foreground/60">Payroll-confidence comparison</p>
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                            <ArrowRight size={18} />
                                        </div>
                                    </Link>
                                    <Link
                                        href="/compare/workyard"
                                        className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/5 bg-slate-50/50 p-5 transition-all duration-300 hover:bg-white hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        <div>
                                            <p className="font-bold text-foreground group-hover:text-primary transition-colors">Crewtrace vs Workyard</p>
                                            <p className="mt-1 text-sm font-medium text-foreground/60">Field visibility and overtime comparison</p>
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                            <ArrowRight size={18} />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <FAQSection
                    eyebrow="Industry FAQ"
                    title="Choosing the right industry workflow"
                    description="Questions about trade-specific coverage, multi-trade operations, and how industry data is sourced."
                    items={industriesHubFaqItems}
                />

                <CTASection cluster="industries" templateType="industries_hub" landingPath="/industries" />
            </main>
            <Footer />
        </div>
    );
}
