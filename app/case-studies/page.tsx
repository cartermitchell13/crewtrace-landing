import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    BarChart3,
    BookOpen,
    CheckCircle2,
    ClipboardCheck,
    Clock,
    FileText,
    TrendingUp,
    Users,
    Lightbulb,
    AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { getAllCaseStudies } from "@/lib/caseStudies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Construction Case Studies",
    description:
        "Read real-world Crewtrace case studies showing how contractors reduce payroll leakage and improve labor visibility.",
    path: "/case-studies",
});

const outcomeStats = [
    {
        value: "$2,100",
        label: "recovered per month",
        context: "S&W Waterproofing found recurring overpayment within the first pay period after switching from paper logs.",
        icon: TrendingUp,
        color: "emerald",
    },
    {
        value: "2 Weeks",
        label: "average time to ROI",
        context: "From configuration to active use. White-glove onboarding means your team is not figuring it out alone.",
        icon: Clock,
        color: "blue",
    },
    {
        value: "100%",
        label: "verified timesheets",
        context: "Every clock event tied to a GPS-verified location record. No more honor-system hours.",
        icon: CheckCircle2,
        color: "primary",
    },
];

const timelineSteps = [
    {
        step: 1,
        icon: AlertTriangle,
        title: "The Challenge",
        description: "What was broken — paper chaos, unverified hours, compliance gaps, payroll rework every week.",
    },
    {
        step: 2,
        icon: ClipboardCheck,
        title: "Implementation",
        description: "How they configured Crewtrace — geofence zones, alert rules, export templates, and crew onboarding sequence.",
    },
    {
        step: 3,
        icon: BarChart3,
        title: "Measurable Results",
        description: "Hard numbers — dollars recovered, admin hours saved, audit outcomes, payroll close time.",
    },
    {
        step: 4,
        icon: Lightbulb,
        title: "Lessons Learned",
        description: "What surprised them, what they would do differently, and advice for teams considering the same switch.",
    },
];

export default function CaseStudiesPage() {
    const studies = getAllCaseStudies();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-32 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />

                    <div className="mx-auto max-w-4xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                            <BookOpen size={14} />
                            Case Studies
                        </p>
                        <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                            Proven outcomes from contractor teams using Crewtrace
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            See how field and office teams are reducing payroll errors, accelerating approvals, and creating cleaner labor records.
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                            >
                                Get your personalized demo
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="/calculator"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-foreground/70 transition-colors hover:text-primary"
                            >
                                Calculate your savings
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="px-6 pb-24 md:pb-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="relative overflow-hidden rounded-[2.75rem] bg-[url('/images/background-design-ct.png')] bg-cover bg-center bg-no-repeat px-4 sm:px-6 md:rounded-[3.5rem]">
                            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(47,39,206,0.06)_0%,transparent_70%)]" />

                            <div className="relative z-10 py-16 sm:py-20 md:py-24">
                                <div className="mx-auto max-w-5xl">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        {outcomeStats.map((stat) => {
                                            const Icon = stat.icon;
                                            const colorMap: Record<string, string> = {
                                                emerald: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/50",
                                                blue: "bg-blue-50 text-blue-600 ring-1 ring-blue-200/50",
                                                primary: "bg-primary/5 text-primary ring-1 ring-primary/10",
                                            };
                                            return (
                                                <div
                                                    key={stat.label}
                                                    className="rounded-[2rem] border border-white/20 bg-white/90 backdrop-blur-sm p-8 shadow-lg text-center"
                                                >
                                                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colorMap[stat.color]}`}>
                                                        <Icon size={24} strokeWidth={2.5} />
                                                    </div>
                                                    <p className="text-4xl font-extrabold text-foreground mb-1">{stat.value}</p>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-foreground/45 mb-3">
                                                        {stat.label}
                                                    </p>
                                                    <p className="text-sm font-medium leading-relaxed text-foreground/60">
                                                        {stat.context}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 pb-24 md:pb-32">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {studies.map((study) => (
                            <article
                                key={study.slug}
                                className="group overflow-hidden rounded-[2rem] border border-foreground/5 bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="relative aspect-[16/9] w-full bg-foreground/5">
                                    {study.heroImage ? (
                                        <Image
                                            src={study.heroImage}
                                            alt={study.heroImageAlt ?? `${study.company} case study cover image`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                                        />
                                    ) : null}
                                </div>

                                <div className="p-7">
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
                                                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                                                <span>{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={`/case-studies/${study.slug}`}
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
                                    >
                                        Read case study
                                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                <FileText size={14} />
                                What You Will Find Inside
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Every case study follows the same structure
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                Not marketing fluff. Each study is a working document — challenge, implementation sequence, hard results, and honest lessons.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute left-1/2 top-0 bottom-0 hidden w-[2px] -translate-x-1/2 bg-foreground/5 md:block">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
                            </div>

                            <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-4">
                                {timelineSteps.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.title}
                                            className="group relative flex flex-col items-center text-center"
                                        >
                                            <div className="relative mb-6">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-foreground/5 bg-white shadow-md ring-1 ring-primary/10 transition-all group-hover:shadow-lg group-hover:ring-primary/20">
                                                    <Icon size={24} className="text-primary" />
                                                </div>
                                                <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold shadow-md">
                                                    {item.step}
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm font-medium leading-relaxed text-foreground/60">
                                                {item.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-10 md:p-16">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-[url('/images/background-design-ct.png')] bg-cover bg-center bg-no-repeat"
                            />
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-primary/40"
                            />

                            <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                                <div className="space-y-6">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight text-white">
                                        Could your team be the next case study?
                                    </h2>
                                    <p className="max-w-xl text-lg font-medium leading-relaxed text-white/80">
                                        If Crewtrace recovers measurable payroll savings for your operation, we will document the process and outcomes — with your permission — so other contractors can learn from your experience.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white py-4 px-8 text-base font-bold text-primary transition-all hover:bg-white/90 hover:-translate-y-0.5"
                                        >
                                            Start your rollout
                                            <ArrowRight size={18} />
                                        </Link>
                                        <Link
                                            href="/calculator"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/20"
                                        >
                                            Calculate your savings first
                                        </Link>
                                    </div>
                                </div>

                                <div className="relative flex flex-col gap-4">
                                    <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm text-center">
                                        <div className="flex items-center justify-center gap-4 mb-4">
                                            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white/20">
                                                <Image
                                                    src="/images/jason-headshot-p-500.jpeg"
                                                    alt="Jason Law, Owner of S&W Waterproofing"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="relative h-16 w-32 shrink-0">
                                                <Image
                                                    src="/images/sw-logo.png"
                                                    alt="S&W Waterproofing Logo"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium leading-relaxed text-white/80 italic">
                                            &ldquo;We moved off paper logs, found recurring overpayment fast, and cut payroll review time down to minutes.&rdquo;
                                        </p>
                                        <p className="mt-3 text-xs font-bold text-white/50">
                                            Jason Law · Owner, S&amp;W Waterproofing
                                        </p>
                                    </div>
                                </div>
                            </div>
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
                                Proof from every angle
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-10 shadow-xl">
                                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                                    Implementation guides
                                </h3>
                                <p className="mb-6 text-base text-foreground/60 font-medium leading-relaxed">
                                    The playbooks behind these outcomes. Step-by-step rollout sequences with cost data and decision criteria.
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
                                    Compare with competitors
                                </h3>
                                <p className="mb-6 text-base text-foreground/60 font-medium leading-relaxed">
                                    See how Crewtrace stacks up against Connecteam and Workyard across GPS verification, payroll exports, and compliance support.
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

                <CTASection templateType="case_studies_hub" landingPath="/case-studies" />
            </main>
            <Footer />
        </div>
    );
}
