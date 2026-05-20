import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    AlertTriangle,
    Sparkles,
    Clock,
    ShieldCheck,
    Zap,
    CheckCircle2,
    XCircle,
    Settings2,
    Tags,
    BarChart3,
    TrendingUp,
    Users,
    HardHat,
    Building2,
    Wrench,
    Layers,
    Download,
    Calculator,
    GitBranch,
    Flame,
    Timer,
    PieChart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookedCallLink from "@/components/BookedCallLink";
import SeoLandingTracker from "@/components/SeoLandingTracker";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import FeatureComparison from "@/components/FeatureComparison";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildSelfServeSignupUrl } from "@/lib/pricing-plans";
import { featureBySlug } from "@/lib/solutions";
import SectionDivider from "@/components/SectionDivider";
import JobCostingPainPointsSection from "./JobCostingPainPointsSection";

const SLUG = "job-costing";
const PATH = `/features/${SLUG}`;
const solution = featureBySlug[SLUG]!;

export const metadata: Metadata = createPageMetadata({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: PATH,
});

type PlaceholderProps = {
    label: string;
    sublabel?: string;
    aspect?: string;
    tone?: "primary" | "emerald" | "amber" | "slate" | "rose";
};

function ImagePlaceholder({
    label,
    sublabel,
    aspect = "aspect-[16/10]",
    tone = "primary",
}: PlaceholderProps) {
    const toneMap: Record<NonNullable<PlaceholderProps["tone"]>, string> = {
        primary: "from-primary/15 via-primary/5 to-white",
        emerald: "from-emerald-200/40 via-emerald-50 to-white",
        amber: "from-amber-200/40 via-amber-50 to-white",
        slate: "from-slate-200/60 via-slate-50 to-white",
        rose: "from-rose-200/40 via-rose-50 to-white",
    };
    const dotMap: Record<NonNullable<PlaceholderProps["tone"]>, string> = {
        primary: "bg-primary/30",
        emerald: "bg-emerald-400/40",
        amber: "bg-amber-400/40",
        slate: "bg-slate-400/40",
        rose: "bg-rose-400/40",
    };

    return (
        <div
            className={`relative w-full overflow-hidden rounded-md border border-foreground/5 bg-gradient-to-br ${toneMap[tone]} ${aspect}`}
            role="img"
            aria-label={label}
        >
            <div
                className="absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
                <span className={`flex h-2 w-2 rounded-full ${dotMap[tone]}`} />
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/45">
                    Image placeholder
                </p>
                <p className="max-w-md text-sm font-semibold text-foreground/65">{label}</p>
                {sublabel && (
                    <p className="max-w-md text-xs font-medium text-foreground/45">{sublabel}</p>
                )}
            </div>
        </div>
    );
}


const pillars = [
    {
        step: "01",
        title: "Define work types once",
        description:
            "Create reusable cost codes — demolition, framing, electrical, cleanup — with short codes, names, descriptions, and billable defaults your whole company shares.",
        icon: Tags,
    },
    {
        step: "02",
        title: "Set labor budgets on jobs",
        description:
            "Give each job an optional budget in hours and dollars, plus notes. Compare planned labor against what the field actually produces.",
        icon: Layers,
    },
    {
        step: "03",
        title: "Crews tag work at the clock",
        description:
            "Workers pick a work type at clock-in and when switching jobs. Each selection stays tied to the shift segment it came from.",
        icon: Clock,
    },
    {
        step: "04",
        title: "Actuals calculate themselves",
        description:
            "Hours and labor cost come from shift segments and hourly rate snapshots — not manual entry after payroll closes.",
        icon: GitBranch,
    },
];

const spotlights = [
    {
        eyebrow: "Admin setup",
        title: "Cost codes your whole company shares.",
        description:
            "Define work types once — demolition, framing, electrical, cleanup — with short codes crews recognize, optional descriptions, billable defaults, and display order. Archive a code and historical reporting stays intact.",
        bullets: [
            "Company-wide work types with short codes and names",
            "Billable defaults and custom display order",
            "Archive without losing historical reporting",
        ],
        icon: Settings2,
        reverse: false,
        image: {
            src: "/images/job-costing/admin-cost-codes.png",
            alt: "Crewtrace cost code setup screen with reusable framing, demolition, and cleanup work type codes",
        },
        placeholderLabel: "Cost code management interface",
        placeholderSublabel: "Work type list with short codes, billable status, and drag-to-reorder",
        placeholderTone: "primary" as const,
    },
    {
        eyebrow: "Field capture",
        title: "One extra tap. Tied to real clock events.",
        description:
            "On the worker clock, crews pick a work type at clock-in and when switching jobs. Selections land on each shift segment, so reporting reflects verified time — not estimates typed in later.",
        bullets: [
            "Work type at clock-in and job switches",
            "Tied to the same time slices payroll already uses",
            "Simple labels in the field, full detail in the report",
        ],
        icon: SmartphoneIcon,
        reverse: true,
        placeholderLabel: "Mobile work type selection at clock-in",
        placeholderSublabel: "Worker picks demolition, framing, or electrical before starting the shift",
        placeholderTone: "emerald" as const,
    },
    {
        eyebrow: "Live dashboard",
        title: "Budget burn you can act on this week.",
        description:
            "The Job Costing report answers what contractors actually need: how much labor have we spent vs. budget, which jobs are over, at risk at 80%+, on track, or missing a budget, and how many hours are uncoded. Expand any row for cost-code breakdown and top contributors by worker.",
        bullets: [
            "Portfolio KPIs and status filters",
            "Weekly burn rate and days-until-budget estimate",
            "CSV export for finance and estimating",
        ],
        icon: PieChart,
        reverse: false,
        image: {
            src: "/images/job-costing/admin-job-breakdown.png",
            alt: "Crewtrace job costing report expanded row showing tracked hours, cost codes, and top contributor labor detail",
        },
        placeholderLabel: "Job costing portfolio dashboard",
        placeholderSublabel: "Budget vs. actual with status indicators and cost-code breakdown per job",
        placeholderTone: "amber" as const,
    },
];

function SmartphoneIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    );
}

const compareRows = [
    {
        capability: "Labor actuals",
        icon: Clock,
        left: "Re-keyed from timesheets after payroll",
        right: "Calculated from shift segments automatically",
    },
    {
        capability: "Cost codes",
        icon: Tags,
        left: "Spreadsheet column someone maintains",
        right: "Selected at clock-in, stored on each segment",
    },
    {
        capability: "Budget visibility",
        icon: TrendingUp,
        left: "Discovered when the job P&L closes",
        right: "Live — over, at risk, on track, uncoded",
    },
    {
        capability: "Work type breakdown",
        icon: Layers,
        left: "Manual pivot table every Friday",
        right: "Expand any job row in the dashboard",
    },
    {
        capability: "Source of truth",
        icon: ShieldCheck,
        left: "Spreadsheet assumptions and memory",
        right: "Verified clock events with work types attached",
    },
];


const useCases = [
    {
        industry: "Construction",
        slug: "construction",
        scenario: "Multi-site weeks with crews split across phases",
        outcome: "Compare framing vs. electrical burn on each job before payroll closes.",
        icon: HardHat,
    },
    {
        industry: "General Contractors",
        slug: "general-contractors",
        scenario: "Portfolio of active jobs with different labor budgets",
        outcome: "See which projects are over budget or at risk from one dashboard.",
        icon: Building2,
    },
    {
        industry: "HVAC",
        slug: "hvac",
        scenario: "Install crews mixing rough-in, startup, and punch-list work",
        outcome: "Tag hours by work type at the clock instead of reconstructing them later.",
        icon: Zap,
    },
    {
        industry: "Electrical",
        slug: "electrical",
        scenario: "Phased rollouts where overtime sneaks in late in the week",
        outcome: "Track labor against budgeted hours while you can still reassign crews.",
        icon: AlertTriangle,
    },
    {
        industry: "Plumbing",
        slug: "plumbing",
        scenario: "Rough-in vs. finish work on the same job address",
        outcome: "Break down labor by work type without a second timesheet system.",
        icon: Wrench,
    },
    {
        industry: "Any trade",
        slug: "construction",
        scenario: "Finance wants CSV job-cost data for estimating",
        outcome: "Export the dashboard to spreadsheets with one click.",
        icon: Download,
    },
];

const stats = [
    { value: "0", label: "Manual labor-cost entries after rollout" },
    { value: "80%", label: "Threshold for at-risk job alerts" },
    { value: "Live", label: "Budget burn vs. waiting for payroll" },
    { value: "CSV", label: "Export for finance and estimating" },
];

export default function JobCostingFeaturePage() {
    const articleJsonLd = articleSchema({
        headline: solution.metaTitle,
        description: solution.metaDescription,
        path: PATH,
    });
    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
        { name: solution.name, path: PATH },
    ]);
    const faqJsonLd = faqSchema(solution.faqItems);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
                <SeoLandingTracker
                    templateType="feature_detail"
                    cluster="features"
                    pageSlug={SLUG}
                    pageUrl={PATH}
                />

                {/* HERO */}
                <section id="hero" className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-24 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.10)_0%,transparent_60%)]" />
                    <div className="pointer-events-none absolute -left-32 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
                    <div className="pointer-events-none absolute -right-32 top-72 -z-10 h-[420px] w-[420px] rounded-full bg-amber-300/15 blur-3xl" />

                    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                        <div className="mb-4 sm:mb-6 inline-flex max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.025] py-[3px] pl-[3px] pr-2.5 text-[11px] font-medium text-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:gap-2 sm:py-1 sm:pl-1 sm:pr-4 sm:text-xs">
                            <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-primary sm:px-2 sm:text-[10px]">
                                New
                            </span>
                            <span className="hidden text-foreground/25 sm:inline" aria-hidden="true">·</span>
                            <span className="whitespace-nowrap">Budget vs. Actual Labor</span>
                        </div>
                        <h1 className="mt-7 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                            Know your labor burn
                            <br />
                            <span className="text-primary italic">before payroll closes.</span>
                        </h1>
                        <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Compare planned labor to real labor by job and work type — calculated automatically from the same clock events your crews already use. No spreadsheet reconciliation after the fact.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href={buildSelfServeSignupUrl("lt_20")}
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 cta-highlight px-7 py-4 text-white bg-primary hover:bg-primary/90 rounded-md font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                            >
                                Start your free trial
                                <ArrowRight size={18} />
                            </Link>
                            <BookedCallLink
                                templateType="feature_detail"
                                cluster="features"
                                landingPath={PATH}
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-4 rounded-md border border-foreground/10 bg-white text-sm font-semibold text-foreground/80 hover:text-primary hover:border-primary/30 transition-colors"
                            >
                                Book a 15-minute call
                                <ArrowUpRight size={16} />
                            </BookedCallLink>
                        </div>
                    </div>

                    <div className="relative mx-auto mt-16 w-full max-w-7xl md:mt-20">
                        <Image
                            src="/images/job-costing/job-costing-hero.png"
                            alt="Crewtrace job costing dashboard showing budget vs. actual labor, status filters, and job-level labor burn"
                            width={1672}
                            height={941}
                            priority
                            sizes="(min-width: 1280px) 1280px, calc(100vw - 48px)"
                            className="h-auto w-full rounded-md shadow-xl"
                        />
                    </div>
                </section>

                <SectionDivider />

                {/* PAIN POINTS */}
                <JobCostingPainPointsSection />

                <SectionDivider />

                {/* FEATURE SPOTLIGHTS */}
                <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50/60 px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-20">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Sparkles size={14} />
                                Inside Crewtrace Job Costing
                            </p>
                            <h2 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Setup once. Capture in the field. Read the dashboard all week.
                            </h2>
                        </div>

                        <div className="space-y-24 md:space-y-32">
                            {spotlights.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <div
                                        key={s.title}
                                        className={`grid gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center ${
                                            s.reverse ? "lg:[&>div:first-child]:order-2" : ""
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
                                                    <Icon size={20} />
                                                </span>
                                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">
                                                    {s.eyebrow} · 0{i + 1}
                                                </p>
                                            </div>
                                            <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                                                {s.title}
                                            </h3>
                                            <p className="mt-5 text-lg font-medium leading-relaxed text-foreground/65">
                                                {s.description}
                                            </p>
                                            <ul className="mt-7 space-y-3">
                                                {s.bullets.map((bullet) => (
                                                    <li key={bullet} className="flex gap-3 text-foreground/80 font-semibold">
                                                        <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {s.image ? (
                                            <div className="relative overflow-hidden rounded-md border border-foreground/5 bg-white shadow-xl">
                                                <Image
                                                    src={s.image.src}
                                                    alt={s.image.alt}
                                                    width={1200}
                                                    height={900}
                                                    sizes="(min-width: 1024px) 50vw, calc(100vw - 48px)"
                                                    className="h-auto w-full"
                                                />
                                            </div>
                                        ) : (
                                            <ImagePlaceholder
                                                label={s.placeholderLabel}
                                                sublabel={s.placeholderSublabel}
                                                tone={s.placeholderTone}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* VALUE */}
                <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-primary/90 px-6 py-24 text-white md:py-28">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                    <div className="relative mx-auto max-w-6xl">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <div>
                                <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                                    <TrendingUp size={14} />
                                    Margin protection
                                </p>
                                <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
                                    Catch labor overruns while you can still do something about them.
                                </h2>
                                <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-white/70">
                                    Job costing turns verified clock events into budget-vs-actual visibility — by job, by work type, and across your whole portfolio — so margin problems surface mid-week, not after payroll closes.
                                </p>
                                <ul className="mt-8 space-y-3">
                                    {[
                                        "See which jobs are over budget, at risk, or missing a budget",
                                        "Break down labor by work type without manual entry",
                                        "Spot uncoded hours before they become reporting gaps",
                                    ].map((line) => (
                                        <li key={line} className="flex gap-3 text-sm font-semibold text-white/85">
                                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    { label: "Over budget", value: "2 jobs", tone: "border-rose-300/30 bg-rose-400/10 text-rose-100" },
                                    { label: "At risk", value: "4 jobs", tone: "border-amber-300/30 bg-amber-400/10 text-amber-100" },
                                    { label: "On track", value: "11 jobs", tone: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100" },
                                    { label: "Uncoded hours", value: "12h", tone: "border-white/15 bg-white/5 text-white/80" },
                                ].map((card) => (
                                    <div key={card.label} className={`rounded-md border p-5 backdrop-blur-sm ${card.tone}`}>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">{card.label}</p>
                                        <p className="mt-2 font-mono text-3xl font-bold tracking-tight">{card.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* CONNECTED WORKFLOW */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(47,39,206,0.06)_0%,transparent_60%)]" />
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <GitBranch size={14} />
                                One connected workflow
                            </p>
                            <h2 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Planned labor and real labor, on one continuous record.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                                Job costing isn&apos;t a side report in Crewtrace. It&apos;s a live pipeline from the clock event to the budget line — with cost codes attached the moment crews clock in.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {pillars.map((pillar, i) => {
                                const Icon = pillar.icon;
                                return (
                                    <div
                                        key={pillar.step}
                                        className="surface-panel group relative overflow-hidden rounded-md border border-foreground/5 bg-white p-7 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
                                                <Icon size={22} />
                                            </span>
                                            <span className="text-xs font-extrabold tracking-widest text-foreground/30">
                                                {pillar.step}
                                            </span>
                                        </div>
                                        <h3 className="mt-6 text-lg font-bold tracking-tight text-foreground">
                                            {pillar.title}
                                        </h3>
                                        <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/60">
                                            {pillar.description}
                                        </p>
                                        {i < pillars.length - 1 && (
                                            <div className="pointer-events-none absolute right-[-10px] top-1/2 hidden -translate-y-1/2 text-primary/30 lg:block">
                                                <ArrowRight size={20} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-16 mx-auto w-full max-w-7xl">
                            <ImagePlaceholder
                                label="Connected workflow pipeline"
                                sublabel="Define codes → Set budgets → Tag at clock-in → Dashboard updates automatically"
                                aspect="aspect-[21/9]"
                                tone="slate"
                            />
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* REPORT CAPABILITIES */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                            <div>
                                <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                    <BarChart3 size={14} />
                                    Job Costing report
                                </p>
                                <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                    The questions it answers — without a second system.
                                </h2>
                                <p className="mt-5 text-lg font-medium leading-relaxed text-foreground/60">
                                    Portfolio KPIs, job-level breakdowns, and CSV export — under Reports and in the Jobs workspace.
                                </p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    {
                                        q: "How much labor have we spent vs. budget?",
                                        icon: Calculator,
                                    },
                                    {
                                        q: "Which jobs are over budget, at risk, on track, or missing a budget?",
                                        icon: Flame,
                                    },
                                    {
                                        q: "How many hours are uncoded — time without a work type?",
                                        icon: Tags,
                                    },
                                    {
                                        q: "What is the weekly burn rate and days until budget runs out?",
                                        icon: TrendingUp,
                                    },
                                    {
                                        q: "Who are the top labor contributors on this job?",
                                        icon: Users,
                                    },
                                    {
                                        q: "Can finance get this into a spreadsheet?",
                                        icon: Download,
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.q}
                                            className="surface-panel rounded-md border border-foreground/5 bg-white p-6 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                        >
                                            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
                                                <Icon size={18} />
                                            </span>
                                            <p className="mt-4 text-sm font-bold leading-snug text-foreground">{item.q}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-14 flex flex-wrap gap-2">
                            {["Last 7 days", "30 days", "60 days", "90 days", "Year to date", "All time", "Custom range"].map(
                                (preset) => (
                                    <span
                                        key={preset}
                                        className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                                            preset === "30 days"
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-foreground/[0.08] bg-white text-foreground/55"
                                        }`}
                                    >
                                        {preset}
                                    </span>
                                ),
                            )}
                        </div>
                    </div>
                </section>

                <SectionDivider />

                <FeatureComparison
                    eyebrow="Spreadsheet vs. Crewtrace"
                    eyebrowIcon={Calculator}
                    title="Same labor. Two very different views of margin."
                    subtitle="One reconciles after payroll. The other reads from the clock all week."
                    leftColumn={{
                        label: "After payroll",
                        sublabel: "The spreadsheet stack",
                        icon: XCircle,
                    }}
                    rightColumn={{
                        label: "During the week",
                        sublabel: "Running on Crewtrace Job Costing",
                        icon: Sparkles,
                        badge: "Live",
                    }}
                    rows={compareRows}
                    firstRowAnnotation="same clock events"
                    leftSummary={{
                        icon: Clock,
                        highlight: "Too late",
                        text: "to fix the week that already closed",
                    }}
                    rightSummary={{
                        icon: Zap,
                        text: "Budget burn, work types, and labor cost ",
                        highlight: "from verified shift segments.",
                    }}
                />

                <SectionDivider />

                {/* USE CASES */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Users size={14} />
                                Built for contractors
                            </p>
                            <h2 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Job costing that fits how your trade actually runs.
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {useCases.map((u) => {
                                const Icon = u.icon;
                                return (
                                    <Link
                                        key={`${u.slug}-${u.scenario}`}
                                        href={`/industries/${u.slug}`}
                                        className="surface-panel group relative overflow-hidden rounded-md border border-foreground/5 bg-white p-7 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
                                                <Icon size={20} />
                                            </span>
                                            <span className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/40 transition-colors group-hover:text-primary">
                                                {u.industry}
                                            </span>
                                        </div>
                                        <p className="mt-6 text-lg font-bold leading-snug text-foreground">{u.scenario}</p>
                                        <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/60">{u.outcome}</p>
                                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                                            See {u.industry.toLowerCase()} workflow
                                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* STATS */}
                <section className="relative overflow-hidden bg-gradient-to-br from-primary/95 via-primary to-primary/90 px-6 py-24 md:py-28 text-white">
                    <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 40%)" }} />
                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="flex flex-col items-center text-center mb-14">
                            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                                <Sparkles size={14} />
                                What changes
                            </p>
                            <h2 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
                                Planned labor and real labor in one place — not two systems reconciled on Friday.
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-md border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
                                >
                                    <p className="text-4xl font-extrabold tracking-tight md:text-5xl">{s.value}</p>
                                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-white/75 leading-snug">
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <SectionDivider />

                <FAQSection
                    eyebrow="Job Costing FAQ"
                    title="Job costing questions, answered"
                    description={`Answers to common questions about ${solution.primaryKeyword}, rollout expectations, and how budget vs. actual labor connects to your existing Crewtrace workflow.`}
                    items={solution.faqItems}
                />

                <SectionDivider />

                <CTASection cluster="features" templateType="feature_detail" landingPath={PATH} />
            </main>
            <SectionDivider />
            <Footer />
        </div>
    );
}
