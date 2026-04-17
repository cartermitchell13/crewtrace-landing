import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    BellRing,
    CheckCircle2,
    Clock,
    FileDown,
    FileText,
    MapPin,
    ShieldCheck,
    Zap,
    BarChart3,
    AlertTriangle,
    Users,
    Workflow,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import {
    getTemplateMessaging,
    orderedPromiseLine,
    publicIcpPhrase,
} from "@/lib/messaging";
import { industryBySlug } from "@/lib/industries";
import { createPageMetadata } from "@/lib/seo";
import { getFeatureSummaries } from "@/lib/solutions";
import { featuresHubFaqItems } from "@/lib/faq";

const featureSummaries = getFeatureSummaries().sort((left, right) => {
    const byName = left.name.localeCompare(right.name);
    if (byName !== 0) {
        return byName;
    }
    return left.slug.localeCompare(right.slug);
});

const featuresMessaging = getTemplateMessaging("features_hub");

const featureImageMap: Record<string, string> = {
    "gps-time-tracking": "/images/gps-feature-image.png",
    "geofencing-time-clock": "/images/hub/geofencing-preview.svg",
    "payroll-leakage-prevention": "/images/hub/payroll-leakage-preview.svg",
    "dol-compliance": "/images/guides/audit-records.png",
    "payroll-exports": "/images/hub/payroll-exports-preview.svg",
    "overtime-alerts": "/images/hub/overtime-alerts-preview.svg",
};

const featureIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    "gps-time-tracking": MapPin,
    "geofencing-time-clock": MapPin,
    "payroll-leakage-prevention": BarChart3,
    "dol-compliance": ShieldCheck,
    "payroll-exports": FileDown,
    "overtime-alerts": BellRing,
};

const workflowNodes = [
    { slug: "gps-time-tracking", label: "GPS Time Tracking", step: 1 },
    { slug: "geofencing-time-clock", label: "Geofencing", step: 2 },
    { slug: "overtime-alerts", label: "Overtime Alerts", step: 3 },
    { slug: "payroll-leakage-prevention", label: "Leakage Prevention", step: 4 },
    { slug: "payroll-exports", label: "Payroll Exports", step: 5 },
    { slug: "dol-compliance", label: "DOL Compliance", step: 6 },
];

const scenarioCards = [
    {
        title: "Losing money to unverified hours?",
        context:
            "Crews are clocking in from the parking lot, staying on the clock during drive time, and inflating hours by 10–15 minutes a day. Over 20 workers, that compounds to thousands per month.",
        solution: "Start with GPS Time Tracking",
        solutionSlug: "gps-time-tracking",
        image: "/images/hub/scenario-unverified-hours.svg",
        color: "red",
    },
    {
        title: "DOL audit letter just arrived?",
        context:
            "Your records are a mix of paper time cards and text messages. The inspector wants two years of defensible time records, edit history, and proof of hours worked.",
        solution: "Start with DOL Compliance",
        solutionSlug: "dol-compliance",
        image: "/images/hub/scenario-dol-audit.svg",
        color: "amber",
    },
    {
        title: "Payroll takes all of Thursday?",
        context:
            "Your payroll admin spends 5+ hours every week chasing timesheets, fixing cross-outs, reconciling missing job codes, and reformatting data for the payroll processor.",
        solution: "Start with Payroll Exports",
        solutionSlug: "payroll-exports",
        image: "/images/hub/scenario-payroll-admin.svg",
        color: "primary",
    },
];

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
            <main>
                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-32 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />

                    <div className="mx-auto max-w-4xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                            <Workflow size={14} />
                            Feature hub
                        </p>
                        <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                            {featuresMessaging.intentHeadline}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Find the fastest control to deploy first, then expand with adjacent workflows. {featuresMessaging.proofBody}
                        </p>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/55 md:text-base">
                            Built {publicIcpPhrase}. {orderedPromiseLine}
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                            >
                                {featuresMessaging.primaryCta}
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="/industries"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-foreground/70 transition-colors hover:text-primary"
                            >
                                Browse industries
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="surface-panel relative mx-auto mt-16 max-w-5xl rounded-[2rem] border border-foreground/5 bg-white/50 p-2 shadow-2xl backdrop-blur-md md:mt-20 md:rounded-[2.5rem] md:p-4">
                        <div className="overflow-hidden rounded-[1.5rem] border border-foreground/5 bg-white shadow-inner md:rounded-[2rem]">
                            <Image
                                src="/images/ct-hero-mockup.png"
                                alt="Crewtrace feature dashboard showing GPS time tracking and payroll controls"
                                width={1200}
                                height={750}
                                className="h-auto w-full object-cover"
                                priority
                            />
                        </div>
                    </div>
                </section>

                <section className="px-6 pb-24 md:pb-32">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
                        {featureSummaries.map((feature) => {
                            const previewImage = featureImageMap[feature.slug];
                            return (
                                <article
                                    key={feature.slug}
                                    className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                                        {feature.primaryKeyword}
                                    </p>
                                    <Link
                                        href={`/features/${feature.slug}`}
                                        className="mt-2 inline-flex text-2xl font-bold text-foreground transition-colors group-hover:text-primary"
                                    >
                                        {feature.name}
                                    </Link>
                                    <p className="mt-1 text-sm font-semibold text-foreground/55">
                                        {feature.tagline}
                                    </p>
                                    <p className="mt-4 text-base leading-relaxed text-foreground/70 font-medium">
                                        {feature.description}
                                    </p>

                                    {previewImage && (
                                        <div className="mt-5 overflow-hidden rounded-xl border border-foreground/5">
                                            <Image
                                                src={previewImage}
                                                alt={`${feature.name} preview`}
                                                width={720}
                                                height={400}
                                                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                            />
                                        </div>
                                    )}

                                    <div className="mt-5 flex flex-wrap gap-2">
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
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
                                    >
                                        Explore feature workflow
                                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                    </Link>
                                    <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-primary/[0.02] blur-2xl group-hover:bg-primary/[0.06] transition-colors duration-500" />
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                <Workflow size={14} />
                                How They Connect
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Six workflows. One data pipeline.
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                These features are not isolated tools. They compose into a single field-to-payroll pipeline where each workflow feeds the next. Start anywhere. Expand when ready.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 md:block">
                                <div className="mx-auto max-w-4xl h-[2px] bg-foreground/5">
                                    <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                                </div>
                            </div>

                            <div className="relative z-10 grid grid-cols-2 gap-4 md:grid-cols-6">
                                {workflowNodes.map((node) => {
                                    const Icon = featureIconMap[node.slug] ?? Zap;
                                    const isStart = node.step === 1;
                                    return (
                                        <Link
                                            key={node.slug}
                                            href={`/features/${node.slug}`}
                                            className="group flex flex-col items-center text-center"
                                        >
                                            <div className={`relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg ${isStart ? "border-primary/30 bg-primary/10 ring-2 ring-primary/20" : "border-foreground/5 bg-white shadow-md"}`}>
                                                <Icon size={24} className={isStart ? "text-primary" : "text-foreground/60 group-hover:text-primary transition-colors"} />
                                                <div className={`absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow-md ${isStart ? "bg-primary text-white" : "bg-foreground/10 text-foreground/50"}`}>
                                                    {node.step}
                                                </div>
                                            </div>
                                            <p className={`text-xs font-bold leading-tight ${isStart ? "text-primary" : "text-foreground/60 group-hover:text-primary transition-colors"}`}>
                                                {node.label}
                                            </p>
                                            {isStart && (
                                                <span className="mt-2 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                                                    Start here
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/15 bg-amber-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-600 backdrop-blur-sm mb-6">
                                <AlertTriangle size={14} />
                                Which Feature First?
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Pick the problem that costs you the most
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                You do not need all six features on day one. Start with the one that addresses your biggest payroll risk right now.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {scenarioCards.map((scenario) => {
                                const colorMap: Record<string, { border: string; bg: string; icon: string; text: string }> = {
                                    red: { border: "border-l-red-400", bg: "bg-red-50", icon: "text-red-500", text: "text-red-600" },
                                    amber: { border: "border-l-amber-400", bg: "bg-amber-50", icon: "text-amber-500", text: "text-amber-600" },
                                    primary: { border: "border-l-primary", bg: "bg-primary/5", icon: "text-primary", text: "text-primary" },
                                };
                                const colors = colorMap[scenario.color] ?? colorMap.primary;
                                return (
                                    <div
                                        key={scenario.title}
                                        className={`group relative overflow-hidden rounded-[2rem] border border-foreground/5 border-l-4 ${colors.border} bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
                                    >
                                        <div className="overflow-hidden rounded-xl mb-6">
                                            <Image
                                                src={scenario.image}
                                                alt={scenario.title}
                                                width={480}
                                                height={320}
                                                className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
                                            {scenario.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-foreground/65 font-medium">
                                            {scenario.context}
                                        </p>
                                        <Link
                                            href={`/features/${scenario.solutionSlug}`}
                                            className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${colors.text}`}
                                        >
                                            {scenario.solution}
                                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                        </Link>
                                        <div className="absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-primary/[0.03] blur-3xl group-hover:bg-primary/[0.07] transition-colors duration-500" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 backdrop-blur-sm mb-6">
                                <CheckCircle2 size={14} />
                                Quick Numbers
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                What contractors measure after rollout
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            {[
                                { value: "6", label: "Integrated workflows", icon: Workflow },
                                { value: "8", label: "Industry paths", icon: Users },
                                { value: "4", label: "Step rollout", icon: Zap },
                                { value: "2 wk", label: "Avg time to ROI", icon: Clock },
                            ].map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.label}
                                        className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 text-center"
                                    >
                                        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/50">
                                            <Icon size={22} />
                                        </div>
                                        <p className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</p>
                                        <p className="text-xs font-bold uppercase tracking-widest text-foreground/45">{stat.label}</p>
                                        <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-500/[0.02] blur-2xl group-hover:bg-emerald-500/[0.06] transition-colors duration-500" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                <FileText size={14} />
                                Related Resources
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Go deeper before you decide
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-10 shadow-xl">
                                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                                    Implementation guides
                                </h3>
                                <p className="mb-6 text-base text-foreground/60 font-medium leading-relaxed">
                                    Step-by-step playbooks for rolling out each workflow without disrupting active crews.
                                </p>
                                <div className="space-y-3">
                                    <Link
                                        href="/guides/construction-time-tracking-implementation"
                                        className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/5 bg-slate-50/50 p-5 transition-all duration-300 hover:bg-white hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        <div>
                                            <p className="font-bold text-foreground group-hover:text-primary transition-colors">Complete Implementation Guide</p>
                                            <p className="mt-1 text-sm font-medium text-foreground/60">22 min read</p>
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                            <ArrowRight size={18} />
                                        </div>
                                    </Link>
                                    <Link
                                        href="/guides/dol-audit-ready-time-records"
                                        className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/5 bg-slate-50/50 p-5 transition-all duration-300 hover:bg-white hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        <div>
                                            <p className="font-bold text-foreground group-hover:text-primary transition-colors">DOL Audit-Ready Time Records</p>
                                            <p className="mt-1 text-sm font-medium text-foreground/60">20 min read</p>
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                            <ArrowRight size={18} />
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-10 shadow-xl">
                                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                                    Proof from the field
                                </h3>
                                <p className="mb-6 text-base text-foreground/60 font-medium leading-relaxed">
                                    Real outcomes from contractors who replaced manual processes with verified field records.
                                </p>
                                <div className="space-y-3">
                                    <Link
                                        href="/case-studies/sw-waterproofing-payroll-recovery"
                                        className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/5 bg-slate-50/50 p-5 transition-all duration-300 hover:bg-white hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        <div>
                                            <p className="font-bold text-foreground group-hover:text-primary transition-colors">S&amp;W Waterproofing</p>
                                            <p className="mt-1 text-sm font-medium text-foreground/60">$2,100/mo recovered · 2 weeks to ROI</p>
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                            <ArrowRight size={18} />
                                        </div>
                                    </Link>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link
                                        href="/compare"
                                        className="rounded-full border border-foreground/10 px-4 py-2 text-xs font-semibold text-foreground/65 transition-colors hover:border-primary/20 hover:text-primary"
                                    >
                                        Compare platforms
                                    </Link>
                                    <Link
                                        href="/industries"
                                        className="rounded-full border border-foreground/10 px-4 py-2 text-xs font-semibold text-foreground/65 transition-colors hover:border-primary/20 hover:text-primary"
                                    >
                                        Browse industries
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <FAQSection
                    eyebrow="Feature FAQ"
                    title="Choosing the right feature workflow"
                    description="Answers to common questions about feature selection, rollout, and how the workflows compose together."
                    items={featuresHubFaqItems}
                />

                <CTASection cluster="features" templateType="features_hub" landingPath="/features" />
            </main>
            <Footer />
        </div>
    );
}
