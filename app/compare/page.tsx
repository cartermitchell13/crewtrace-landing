import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    XCircle,
    Minus,
    Eye,
    ShieldCheck,
    RefreshCw,
    MapPin,
    FileDown,
    Clock,
    BellRing,
    Users,
    HelpCircle,
    Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import { competitorRecords } from "@/lib/competitors";
import {
    getTemplateMessaging,
    orderedPromiseLine,
    publicIcpPhrase,
} from "@/lib/messaging";
import { createPageMetadata } from "@/lib/seo";
import { compareHubFaqItems } from "@/lib/faq";

const compareMessaging = getTemplateMessaging("compare_hub");

export const metadata: Metadata = createPageMetadata({
    title: "Crewtrace Comparison Guides for Connecteam and Workyard",
    description:
        "Neutral, factual comparison pages for teams evaluating Connecteam or Workyard alternatives for payroll-safe field operations.",
    path: "/compare",
    noIndex: true,
});

type CellStatus = "yes" | "partial" | "no";

interface ComparisonRow {
    criteria: string;
    connecteam: CellStatus;
    workyard: CellStatus;
    crewtrace: CellStatus;
    note?: string;
}

const comparisonMatrix: ComparisonRow[] = [
    { criteria: "GPS verification at clock-in", connecteam: "yes", workyard: "yes", crewtrace: "yes" },
    { criteria: "Geofenced clock-in enforcement", connecteam: "partial", workyard: "yes", crewtrace: "yes", note: "Connecteam requires higher-tier plan for geofencing" },
    { criteria: "Real-time overtime alerts", connecteam: "yes", workyard: "partial", crewtrace: "yes" },
    { criteria: "Anomaly detection before payroll", connecteam: "no", workyard: "partial", crewtrace: "yes" },
    { criteria: "Multiple payroll export formats", connecteam: "yes", workyard: "yes", crewtrace: "yes" },
    { criteria: "DOL audit-ready record format", connecteam: "partial", workyard: "partial", crewtrace: "yes", note: "Varies by plan level" },
    { criteria: "White-glove onboarding", connecteam: "no", workyard: "no", crewtrace: "yes" },
];

function StatusCell({ status }: { status: CellStatus }) {
    if (status === "yes") {
        return (
            <span className="inline-flex items-center justify-center">
                <CheckCircle2 size={18} className="text-emerald-500" />
            </span>
        );
    }
    if (status === "partial") {
        return (
            <span className="inline-flex items-center justify-center">
                <Minus size={18} className="text-amber-500" />
            </span>
        );
    }
    return (
        <span className="inline-flex items-center justify-center">
            <XCircle size={18} className="text-foreground/20" />
        </span>
    );
}

const methodologySteps = [
    {
        icon: Eye,
        title: "Factual framing",
        description:
            "Every claim is tagged as either verified (tested hands-on or sourced from official docs) or cautious-inference. We do not publish superiority claims without a verifiable source.",
    },
    {
        icon: ShieldCheck,
        title: "Proof-linked assertions",
        description:
            "Outcome claims reference specific case studies and customer proof. We link to the underlying asset so you can evaluate the evidence yourself.",
    },
    {
        icon: RefreshCw,
        title: "Regular re-review",
        description:
            "Each comparison page is reviewed on a fixed cadence — typically every 30–90 days — with the last-reviewed date and review cadence displayed on the page.",
    },
];

const evaluationCriteria = [
    {
        icon: MapPin,
        question: "Does it verify location at clock-in — or just track GPS in the background?",
        context:
            "Background GPS tracking and verified clock-in are different things. You want a system that proves the worker was at the job site when they said they started, not just a dot on a map.",
    },
    {
        icon: FileDown,
        question: "Can you export directly to your payroll processor's format?",
        context:
            "If the export requires manual reformatting every week, you have not actually reduced admin time — you have moved it to a different step.",
    },
    {
        icon: Clock,
        question: "What happens when the DOL asks for two years of records?",
        context:
            "FLSA requires employers to keep time records for at least two years. Ask whether the platform stores immutable, audit-trail-protected records or just editable spreadsheets.",
    },
    {
        icon: BellRing,
        question: "Do you find out about overtime before or after payroll closes?",
        context:
            "Real-time overtime alerts let supervisors intervene the same day. Post-payroll reports tell you what already went wrong.",
    },
];

export default function CompareHubPage() {
    const sortedCompetitors = [...competitorRecords].sort((left, right) =>
        left.name.localeCompare(right.name),
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-32 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />

                    <div className="mx-auto max-w-4xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                            <Search size={14} />
                            Compare options
                        </p>
                        <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                            {compareMessaging.intentHeadline}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Use these pages to pressure-test fit with factual framing, proof links, and
                            clear next-step guidance.
                        </p>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/55 md:text-base">
                            Built {publicIcpPhrase}. {orderedPromiseLine}
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                            >
                                {compareMessaging.primaryCta}
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
                </section>

                <section className="px-6 pb-24 md:pb-32">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
                        {sortedCompetitors.map((competitor) => (
                            <article
                                key={competitor.slug}
                                className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
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

                                <div className="mt-6 rounded-xl border border-foreground/5 bg-slate-50/50 p-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2">Comparison sections</p>
                                    <ul className="space-y-1.5">
                                        {competitor.comparisonSections.map((section) => (
                                            <li key={section.id} className="flex items-center gap-2 text-xs font-semibold text-foreground/60">
                                                <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                                                {section.heading}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-foreground/45">
                                    Last reviewed {competitor.lastReviewedOn} · every {competitor.reviewCadenceDays} days
                                </p>
                                <Link
                                    href={`/compare/${competitor.slug}`}
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                                >
                                    Read full comparison
                                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                </Link>
                                <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-primary/[0.02] blur-2xl group-hover:bg-primary/[0.06] transition-colors duration-500" />
                            </article>
                        ))}
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                <Eye size={14} />
                                Review Methodology
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                How we evaluate each platform
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                Every comparison follows a structured review process. Claims are sourced, tagged for confidence, and re-verified on a fixed schedule.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute left-0 right-0 top-1/2 hidden h-[2px] -translate-y-1/2 bg-foreground/5 md:block">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                            </div>

                            <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                                {methodologySteps.map((step) => {
                                    const Icon = step.icon;
                                    return (
                                        <div
                                            key={step.title}
                                            className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                        >
                                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10 transition-colors group-hover:bg-primary/10">
                                                <Icon size={24} />
                                            </div>
                                            <h3 className="text-xl font-bold tracking-tight text-foreground mb-4">
                                                {step.title}
                                            </h3>
                                            <p className="text-base leading-relaxed text-foreground/70 font-medium">
                                                {step.description}
                                            </p>
                                            <div className="absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-primary/[0.03] blur-3xl group-hover:bg-primary/[0.07] transition-colors duration-500" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 backdrop-blur-sm mb-6">
                                <CheckCircle2 size={14} />
                                Quick Snapshot
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Feature comparison at a glance
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                A high-level feature snapshot. Read the full comparison pages for detailed analysis and context behind each cell.
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-[2rem] border border-foreground/5 bg-white shadow-xl">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-foreground/5">
                                            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-foreground/50">
                                                Criteria
                                            </th>
                                            <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-widest text-foreground/50">
                                                Connecteam
                                            </th>
                                            <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-widest text-foreground/50">
                                                Workyard
                                            </th>
                                            <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-widest text-primary">
                                                Crewtrace
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonMatrix.map((row, index) => (
                                            <tr
                                                key={row.criteria}
                                                className={`border-b border-foreground/5 last:border-b-0 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                                            >
                                                <td className="px-6 py-4 text-sm font-semibold text-foreground/80">
                                                    {row.criteria}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <StatusCell status={row.connecteam} />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <StatusCell status={row.workyard} />
                                                </td>
                                                <td className="px-6 py-4 text-center bg-primary/[0.02]">
                                                    <StatusCell status={row.crewtrace} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center gap-6 border-t border-foreground/5 px-6 py-4 text-xs text-foreground/50">
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> Full support</span>
                                <span className="flex items-center gap-1.5"><Minus size={14} className="text-amber-500" /> Partial / plan-dependent</span>
                                <span className="flex items-center gap-1.5"><XCircle size={14} className="text-foreground/20" /> Not available</span>
                            </div>
                        </div>

                        <div className="mt-8 overflow-hidden rounded-2xl border border-foreground/5 bg-white">
                            <Image
                                src="/images/hub/compare-product-screens.svg"
                                alt="Side-by-side platform comparison screenshots"
                                width={960}
                                height={400}
                                className="h-auto w-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/15 bg-amber-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-600 backdrop-blur-sm mb-6">
                                <HelpCircle size={14} />
                                Buyer Checklist
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Four questions to ask every vendor
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                Before you commit to any platform, pressure-test these four areas. The answers determine whether the tool will actually reduce your payroll risk or just add another layer of admin.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {evaluationCriteria.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.question}
                                        className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-200/50 transition-colors group-hover:bg-amber-100">
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="text-lg font-bold tracking-tight text-foreground mb-3">
                                            {item.question}
                                        </h3>
                                        <p className="text-base leading-relaxed text-foreground/65 font-medium">
                                            {item.context}
                                        </p>
                                        <div className="absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-amber-500/[0.03] blur-3xl group-hover:bg-amber-500/[0.07] transition-colors duration-500" />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 overflow-hidden rounded-2xl border border-foreground/5">
                            <Image
                                src="/images/hub/compare-audit-context.svg"
                                alt="DOL audit evaluation context for construction time tracking"
                                width={640}
                                height={360}
                                className="h-auto w-full object-cover"
                            />
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
                                Proof before you commit
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                These guides and case studies give you the implementation context that comparison pages cannot cover alone.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-10 shadow-xl">
                                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                                    Implementation guides
                                </h3>
                                <p className="mb-6 text-base text-foreground/60 font-medium leading-relaxed">
                                    Step-by-step playbooks for rolling out GPS time tracking, configuring geofences, and preparing for DOL audits.
                                </p>
                                <div className="space-y-3">
                                    <Link
                                        href="/guides/construction-time-tracking-implementation"
                                        className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/5 bg-slate-50/50 p-5 transition-all duration-300 hover:bg-white hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        <div>
                                            <p className="font-bold text-foreground group-hover:text-primary transition-colors">Complete Implementation Guide</p>
                                            <p className="mt-1 text-sm font-medium text-foreground/60">22 min read · From audit to full rollout</p>
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
                                            <p className="mt-1 text-sm font-medium text-foreground/60">20 min read · FLSA compliance playbook</p>
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                            <ArrowRight size={18} />
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-10 shadow-xl">
                                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                                    Case study evidence
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
                                        href="/features"
                                        className="rounded-full border border-foreground/10 px-4 py-2 text-xs font-semibold text-foreground/65 transition-colors hover:border-primary/20 hover:text-primary"
                                    >
                                        Explore features
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
                    eyebrow="Comparison FAQ"
                    title="Frequently asked questions about our comparison process"
                    description="How we keep these pages accurate, neutral, and useful for your evaluation."
                    items={compareHubFaqItems}
                />

                <CTASection cluster="compare" templateType="compare_hub" landingPath="/compare" />
            </main>
            <Footer />
        </div>
    );
}
