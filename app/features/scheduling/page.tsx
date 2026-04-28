import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    Smartphone,
    Layers,
    Bell,
    Repeat,
    ShieldCheck,
    Users,
    Clock,
    MapPin,
    CheckCircle2,
    Sparkles,
    Zap,
    AlertTriangle,
    ArrowUpRight,
    GitBranch,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookedCallLink from "@/components/BookedCallLink";
import SeoLandingTracker from "@/components/SeoLandingTracker";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import FeatureComparison from "@/components/FeatureComparison";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { featureBySlug } from "@/lib/solutions";

const SLUG = "scheduling";
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
            className={`relative w-full overflow-hidden rounded-[1.75rem] border border-foreground/5 bg-gradient-to-br ${toneMap[tone]} ${aspect}`}
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

const painPoints = [
    {
        title: "The Sunday-night rebuild",
        description:
            "Spreadsheets get edited by three different people, then printed out before anyone notices the version is already stale.",
        icon: Repeat,
        tone: "rose" as const,
    },
    {
        title: "The 6 AM phone tree",
        description:
            "A job gets pushed and supervisors burn the morning calling, texting, and re-dispatching crews to the right address.",
        icon: AlertTriangle,
        tone: "amber" as const,
    },
    {
        title: "The hours nobody planned",
        description:
            "Schedules say one thing, timesheets say another. Payroll spends Thursday reconciling who was actually where.",
        icon: Clock,
        tone: "slate" as const,
    },
];

const spotlights = [
    {
        eyebrow: "Plan the week",
        title: "Drag, drop, dispatch.",
        description:
            "Build the week in a single view. Move a crew between jobs, split a day across two sites, or copy last week's plan forward without reformatting a spreadsheet.",
        bullets: [
            "Weekly grid by crew, job, or worker",
            "Copy-forward and template schedules",
            "Conflict and double-book detection",
        ],
        image: {
            src: "/images/sheduling/drag-and-drop.png",
            alt: "Crewtrace drag-and-drop weekly schedule grid",
        },
        icon: Layers,
        reverse: false,
    },
    {
        eyebrow: "Push to the field",
        title: "Crews see the plan on their phones.",
        description:
            "Every assignment lands in the worker's app with the job address, reporting time, and supervisor. When the plan changes, their phone updates — no group chats, no morning phone tree.",
        bullets: [
            "Push notifications for new and changed assignments",
            "One-tap directions to the job address",
            "Read receipts so you know who saw the change",
        ],
        image: {
            src: "/images/sheduling/mobile-schedule.png",
            alt: "Crewtrace mobile app showing today's crew assignment",
        },
        icon: Smartphone,
        reverse: true,
    },
    {
        eyebrow: "Close the loop",
        title: "Know if the day is on track before payroll Thursday.",
        description:
            "The schedule and the time clock share one record, so the moment crews start clocking in you can see who showed up, who's running long, and which jobs are about to blow their budget — while you can still do something about it.",
        bullets: [
            "Live attendance against today's schedule",
            "Hour and budget variance flagged as it happens",
            "Approved hours roll straight into payroll exports",
        ],
        image: {
            src: "/images/sheduling/close-loop.png",
            alt: "Schedule view showing live clock-in status and hour variance against budget",
        },
        icon: GitBranch,
        reverse: false,
    },
];

const workflowSteps = [
    {
        step: "01",
        title: "Build the schedule",
        description: "Drop crews onto jobs for the week. Templates and copy-forward speed up recurring routes.",
        icon: CalendarDays,
    },
    {
        step: "02",
        title: "Dispatch to crews",
        description: "Workers get the assignment in the app. Schedule changes update on their phones automatically.",
        icon: Bell,
    },
    {
        step: "03",
        title: "Verify on site",
        description: "Crews clock in with GPS at the assigned site. Variances surface in real time, not on payroll day.",
        icon: MapPin,
    },
    {
        step: "04",
        title: "Approve and export",
        description: "Approved hours flow into the payroll export. Schedule, clock events, and pay all from one record.",
        icon: ShieldCheck,
    },
];

const useCases = [
    {
        industry: "HVAC",
        slug: "hvac",
        scenario: "Service routes that change three times before lunch",
        outcome: "Dispatchers move techs between calls without losing time-on-job records.",
        icon: Zap,
    },
    {
        industry: "Plumbing",
        slug: "plumbing",
        scenario: "Emergency calls bumping the planned schedule",
        outcome: "Reassign on the fly and keep planned vs. actual hours reconciled for billing.",
        icon: Bell,
    },
    {
        industry: "Landscaping",
        slug: "landscaping",
        scenario: "Multi-stop crew routes with seasonal staffing",
        outcome: "Build the week from a route template; new hires see assignments on day one.",
        icon: MapPin,
    },
    {
        industry: "General Contractors",
        slug: "general-contractors",
        scenario: "Crews and subs spread across active job sites",
        outcome: "One schedule covers employees and subs, with verified hours per project.",
        icon: Users,
    },
    {
        industry: "Electrical",
        slug: "electrical",
        scenario: "Phased rollouts where overtime sneaks in late in the week",
        outcome: "Schedule against budgeted hours and catch overruns before they hit payroll.",
        icon: AlertTriangle,
    },
    {
        industry: "Construction",
        slug: "construction",
        scenario: "Multi-site weeks with shifting crew assignments",
        outcome: "Move crews between sites without losing the audit trail of who worked where.",
        icon: Layers,
    },
];

const compareRows = [
    {
        capability: "Schedule + time clock",
        icon: Layers,
        left: "Two systems, manual reconciliation",
        right: "Same record. No double entry.",
    },
    {
        capability: "Field visibility",
        icon: Smartphone,
        left: "Group text or a printed sheet",
        right: "Push notification + assignment card",
    },
    {
        capability: "Mid-week changes",
        icon: Repeat,
        left: "Edit, re-print, re-text",
        right: "Edit once, the field sees it instantly",
    },
    {
        capability: "Planned vs. actual",
        icon: Clock,
        left: "Reconciled after payroll",
        right: "Live, the moment crews clock in",
    },
    {
        capability: "Audit history",
        icon: ShieldCheck,
        left: "Whichever copy was saved last",
        right: "Every change preserved with timestamps",
    },
];

const stats = [
    { value: "2 hrs", label: "Saved building the weekly schedule" },
    { value: "30%", label: "Fewer dispatch escalations" },
    { value: "0", label: "Re-keyed timesheets after rollout" },
    { value: "1", label: "Record for schedule, time, and payroll" },
];

export default function SchedulingFeaturePage() {
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
                <SeoLandingTracker
                    templateType="feature_detail"
                    cluster="features"
                    pageSlug={SLUG}
                    pageUrl={PATH}
                />

                {/* HERO */}
                <section className="relative overflow-hidden px-6 pb-16 pt-32 md:pb-24 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.10)_0%,transparent_60%)]" />
                    <div className="pointer-events-none absolute -left-32 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
                    <div className="pointer-events-none absolute -right-32 top-72 -z-10 h-[420px] w-[420px] rounded-full bg-emerald-300/15 blur-3xl" />

                    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                        <div className="mb-4 sm:mb-6 inline-flex max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.025] py-[3px] pl-[3px] pr-2.5 text-[11px] font-medium text-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:gap-2 sm:py-1 sm:pl-1 sm:pr-4 sm:text-xs">
                            <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-primary sm:px-2 sm:text-[10px]">
                                New
                            </span>
                            <span className="hidden text-foreground/25 sm:inline" aria-hidden="true">·</span>
                            <span className="whitespace-nowrap">Crew Scheduling for Contractors</span>
                        </div>
                        <h1 className="mt-7 text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                            Schedule the week.
                            <br />
                            <span className="text-primary italic">Lose the spreadsheet.</span>
                        </h1>
                        <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Plan crews and jobs in one view, push assignments straight to worker phones, and keep your schedule, time clock, and payroll on the same record.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href="/contact"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 cta-highlight px-7 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                            >
                                See it on your team
                                <ArrowRight size={18} />
                            </Link>
                            <BookedCallLink
                                templateType="feature_detail"
                                cluster="features"
                                landingPath={PATH}
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-4 rounded-xl border border-foreground/10 bg-white text-sm font-semibold text-foreground/80 hover:text-primary hover:border-primary/30 transition-colors"
                            >
                                Book a 15-minute call
                                <ArrowUpRight size={16} />
                            </BookedCallLink>
                        </div>
                    </div>

                    <div className="relative mx-auto mt-16 w-full max-w-7xl md:mt-20">
                        <Image
                            src="/images/sheduling/scheduling-hero.png"
                            alt="Crewtrace scheduling dashboard with crews assigned across the week"
                            width={1920}
                            height={1080}
                            className="h-auto w-full rounded-[1.5rem] md:rounded-[2.5rem]"
                            priority
                        />
                    </div>
                </section>

                {/* PAIN POINTS */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-rose-500/15 bg-rose-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-rose-600 backdrop-blur-sm">
                                <AlertTriangle size={14} />
                                Sound familiar?
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                The scheduling problems that aren&apos;t really scheduling problems.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                                Most crew schedules don&apos;t fail because the plan was wrong. They fail because the plan, the field, and payroll never share the same record.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {painPoints.map((pain) => {
                                const Icon = pain.icon;
                                const toneClasses: Record<typeof pain.tone, string> = {
                                    rose: "bg-rose-50 text-rose-600 ring-rose-200/60",
                                    amber: "bg-amber-50 text-amber-600 ring-amber-200/60",
                                    slate: "bg-slate-100 text-slate-600 ring-slate-200/60",
                                };
                                return (
                                    <article
                                        key={pain.title}
                                        className="surface-panel group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div
                                            className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${toneClasses[pain.tone]}`}
                                        >
                                            <Icon size={22} />
                                        </div>
                                        <h3 className="text-xl font-bold tracking-tight text-foreground">
                                            {pain.title}
                                        </h3>
                                        <p className="mt-3 text-base font-medium leading-relaxed text-foreground/65">
                                            {pain.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FEATURE SPOTLIGHTS */}
                <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50/60 px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-20">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Sparkles size={14} />
                                Inside Crewtrace Scheduling
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Three jobs scheduling needs to do well.
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
                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
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
                                                {s.bullets.map((b) => (
                                                    <li key={b} className="flex gap-3 text-foreground/80 font-semibold">
                                                        <CheckCircle2 size={20} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Image
                                            src={s.image.src}
                                            alt={s.image.alt}
                                            width={1600}
                                            height={1100}
                                            className="h-auto w-full rounded-[1.5rem] md:rounded-[2rem]"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CONNECTED WORKFLOW */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(47,39,206,0.06)_0%,transparent_60%)]" />
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <GitBranch size={14} />
                                One connected workflow
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Plan, dispatch, verify, pay — on one record.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                                Scheduling isn&apos;t a side tool in Crewtrace. It&apos;s the front of the same pipeline that runs your time clock, payroll exports, and audit history.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {workflowSteps.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={step.step}
                                        className="surface-panel group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-7 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                                                <Icon size={22} />
                                            </span>
                                            <span className="text-xs font-extrabold tracking-widest text-foreground/30">
                                                {step.step}
                                            </span>
                                        </div>
                                        <h3 className="mt-6 text-lg font-bold tracking-tight text-foreground">
                                            {step.title}
                                        </h3>
                                        <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/60">
                                            {step.description}
                                        </p>
                                        {i < workflowSteps.length - 1 && (
                                            <div className="pointer-events-none absolute right-[-10px] top-1/2 hidden -translate-y-1/2 text-primary/30 lg:block">
                                                <ArrowRight size={20} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    <div className="mt-16 mx-auto w-full max-w-7xl">
                        <Image
                            src="/images/sheduling/connected-workflow.png"
                            alt="Connected workflow pipeline: schedule, dispatch, time clock, and payroll export on one record"
                            width={2400}
                            height={1030}
                            className="h-auto w-full rounded-[1.5rem] md:rounded-[2rem]"
                        />
                    </div>
                </section>

                <FeatureComparison
                    eyebrow="Spreadsheet vs. Crewtrace"
                    eyebrowIcon={Repeat}
                    title="The same scheduling job."
                    subtitle="Two very different weeks."
                    leftColumn={{
                        label: "Week one",
                        sublabel: "The spreadsheet stack",
                        icon: AlertTriangle,
                    }}
                    rightColumn={{
                        label: "Week two",
                        sublabel: "Running on Crewtrace",
                        icon: Sparkles,
                        badge: "On track",
                    }}
                    rows={compareRows}
                    firstRowAnnotation="same record"
                    leftSummary={{
                        icon: Clock,
                        highlight: "~6 hrs/week",
                        text: "reconciling, re-printing, re-texting",
                    }}
                    rightSummary={{
                        icon: Zap,
                        text: "One record. ",
                        highlight: "Schedule, clock, and payroll in sync.",
                    }}
                />

                {/* USE CASES BY INDUSTRY */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Users size={14} />
                                Built for the field
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Scheduling that fits how your trade actually runs.
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {useCases.map((u) => {
                                const Icon = u.icon;
                                return (
                                    <Link
                                        key={u.slug}
                                        href={`/industries/${u.slug}`}
                                        className="surface-panel group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-7 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                                                <Icon size={20} />
                                            </span>
                                            <span className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/40 group-hover:text-primary transition-colors">
                                                {u.industry}
                                            </span>
                                        </div>
                                        <p className="mt-6 text-lg font-bold leading-snug text-foreground">
                                            {u.scenario}
                                        </p>
                                        <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/60">
                                            {u.outcome}
                                        </p>
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

                {/* STATS */}
                <section className="relative overflow-hidden bg-gradient-to-br from-primary/95 via-primary to-primary/90 px-6 py-24 md:py-28 text-white">
                    <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 40%)" }} />
                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="flex flex-col items-center text-center mb-14">
                            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                                <Sparkles size={14} />
                                What contractors measure
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl max-w-3xl">
                                Scheduling time you get back. Payroll noise you don&apos;t.
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
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

                {/* FAQ */}
                <FAQSection
                    eyebrow="Crew Scheduling FAQ"
                    title="Scheduling questions, answered"
                    description={`Answers to common questions about ${solution.primaryKeyword}, rollout expectations, and how scheduling connects to time tracking and payroll.`}
                    items={solution.faqItems}
                />

                <CTASection cluster="features" templateType="feature_detail" landingPath={PATH} />
            </main>
            <Footer />
        </div>
    );
}
