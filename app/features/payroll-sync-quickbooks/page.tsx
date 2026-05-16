import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    ArrowLeftRight,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Sparkles,
    Clock,
    ShieldCheck,
    Receipt,
    RefreshCcw,
    Zap,
    FileSpreadsheet,
    Users,
    Briefcase,
    History,
    Plug,
    Building2,
    Hammer,
    Wrench,
    HardHat,
    Layers,
    MousePointerClick,
    BadgeCheck,
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
import { featureBySlug } from "@/lib/solutions";
import SectionDivider from "@/components/SectionDivider";

const SLUG = "payroll-sync-quickbooks";
const PATH = `/features/${SLUG}`;
const solution = featureBySlug[SLUG]!;

export const metadata: Metadata = createPageMetadata({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: PATH,
});

const PLACEHOLDER_BASE = "/images/quickbooks";

const painPoints = [
    {
        title: "The Thursday timesheet grind",
        description:
            "Every pay period, somebody loses three hours retyping approved hours into QuickBooks line by line — and a single typo means a wrong paycheck.",
        icon: Clock,
        tone: "rose" as const,
    },
    {
        title: "CSV imports that almost work",
        description:
            "One mismatched name, one renamed job, and the whole import either fails or quietly posts the wrong hours to the wrong customer.",
        icon: FileSpreadsheet,
        tone: "amber" as const,
    },
    {
        title: "Job costing that doesn't match",
        description:
            "Field hours live in one system, QuickBooks lives in another, and the labor numbers on the project P&L never quite tie out.",
        icon: AlertTriangle,
        tone: "slate" as const,
    },
];

const spotlights = [
    {
        eyebrow: "One click sync",
        title: "Approve. Click sync. Walk away.",
        description:
            "Once your hours are approved in Crewtrace, a single Sync to QuickBooks button does the rest — pulling each entry, matching it to the right employee and job, and posting it directly into QuickBooks with the right pay items attached.",
        bullets: [
            "Push approved hours by pay period or by date range",
            "Real-time progress with a per-entry status",
            "Automatic retry on transient connection errors",
        ],
        image: {
            src: `${PLACEHOLDER_BASE}/sync-console.png`,
            alt: "Crewtrace sync console pushing approved hours into QuickBooks Online",
        },
        icon: MousePointerClick,
        reverse: false,
    },
    {
        eyebrow: "Smart mapping",
        title: "Employees and jobs mapped once.",
        description:
            "Crewtrace pulls your QuickBooks employees and customers the moment you connect. Map Crewtrace employees to QuickBooks employees and Crewtrace jobs to QuickBooks customers once, and new hires or new jobs surface as a quick review step before the next sync — never silently.",
        bullets: [
            "Crewtrace Employees to QuickBooks Employees",
            "Crewtrace Jobs to QuickBooks Customers",
            "New record review step before anything posts",
        ],
        image: {
            src: `${PLACEHOLDER_BASE}/mapping.png`,
            alt: "Crewtrace mapping screen connecting Crewtrace workers and jobs to QuickBooks records",
        },
        icon: ArrowLeftRight,
        reverse: true,
    },
    {
        eyebrow: "Pre-flight check",
        title: "Catch bad data before QuickBooks ever sees it.",
        description:
            "Every sync runs a pre-flight check. Missing pay items, unmapped employees, jobs that no longer exist in QuickBooks — they all surface in one review screen with a recommended fix. Nothing posts until the issues are clean, so you never end up with half an import to undo.",
        bullets: [
            "Single review screen for all blocking issues",
            "Recommended matches based on past syncs",
            "Bulk-fix actions for repeating issues",
        ],
        image: {
            src: `${PLACEHOLDER_BASE}/preflight.png`,
            alt: "Pre-flight validation screen flagging unmapped employees and jobs before sync",
        },
        icon: ShieldCheck,
        reverse: false,
    },
];

const mappingTiles = [
    {
        title: "Crewtrace Employees to QuickBooks Employees",
        description:
            "Match every Crewtrace employee to the right QuickBooks employee once. New hires surface for review before the next sync.",
        icon: Users,
        accent: "primary" as const,
    },
    {
        title: "Crewtrace Jobs to QuickBooks Customers",
        description:
            "Link each Crewtrace job to its QuickBooks customer so synced labor lands on the right customer record.",
        icon: Briefcase,
        accent: "emerald" as const,
    },
];

const capabilities = [
    {
        title: "QuickBooks Online + Desktop",
        description: "Native QBO API integration plus a Desktop connector for Pro, Premier, Enterprise, and Contractor.",
        icon: Plug,
    },
    {
        title: "One-click pay-period sync",
        description: "Push an entire pay period — or a custom date range — to QuickBooks in a single action.",
        icon: Zap,
    },
    {
        title: "Pre-flight validation",
        description: "Unmapped employees, missing jobs, or stale pay items get caught before anything is written.",
        icon: ShieldCheck,
    },
    {
        title: "Job-costed labor",
        description: "Every entry posts with its customer, job, and service item attached so job-cost reports match the field.",
        icon: Briefcase,
    },
    {
        title: "Overtime calculated upstream",
        description: "Crewtrace applies your overtime rules and posts each portion to the matching QuickBooks pay item.",
        icon: Clock,
    },
    {
        title: "Batch audit & rollback",
        description: "Every sync is a single batch with a complete log and a one-click rollback for the whole pay period.",
        icon: History,
    },
];

const useCases = [
    {
        industry: "Construction",
        slug: "construction",
        scenario: "Multi-site weeks with crews split across customers and jobs",
        outcome: "Labor lands on the correct customer and sub-job in QuickBooks every pay period.",
        icon: HardHat,
    },
    {
        industry: "General Contractors",
        slug: "general-contractors",
        scenario: "Mix of W-2 employees and subs across active projects",
        outcome: "Sync employee hours to QuickBooks and keep sub records cleanly separated.",
        icon: Building2,
    },
    {
        industry: "HVAC",
        slug: "hvac",
        scenario: "Service techs hitting six to ten calls a day",
        outcome: "Each call ties to the right customer and pay item with no manual entry.",
        icon: Zap,
    },
    {
        industry: "Plumbing",
        slug: "plumbing",
        scenario: "Service plus new construction running side by side",
        outcome: "Two job streams, one QuickBooks file, one click to sync the week.",
        icon: Wrench,
    },
    {
        industry: "Electrical",
        slug: "electrical",
        scenario: "Phased rollouts with overtime that creeps late in the week",
        outcome: "Overtime calculates in Crewtrace and posts to the right QuickBooks pay item.",
        icon: Sparkles,
    },
    {
        industry: "Roofing",
        slug: "roofing",
        scenario: "Crews rotating across residential addresses each day",
        outcome: "Every address ties to a QuickBooks customer for clean job-cost reporting.",
        icon: Hammer,
    },
];

const compareRows = [
    {
        capability: "How hours get into QuickBooks",
        icon: RefreshCcw,
        left: "Type each entry by hand",
        right: "One-click sync of approved hours",
    },
    {
        capability: "Pay-period close time",
        icon: Clock,
        left: "Hours of retyping every week",
        right: "Minutes — most of it is review",
    },
    {
        capability: "Mismatched names or jobs",
        icon: AlertTriangle,
        left: "Silent miscoding and broken reports",
        right: "Pre-flight blocks the sync until clean",
    },
    {
        capability: "Job costing accuracy",
        icon: Briefcase,
        left: "Field record vs. QuickBooks rarely tie",
        right: "Same record drives both",
    },
    {
        capability: "Undo a bad pay period",
        icon: History,
        left: "Hunt and delete entries one by one",
        right: "Roll back the whole batch in one click",
    },
];

const stats = [
    { value: "1 click", label: "From approved hours to QuickBooks" },
    { value: "0", label: "CSV files in the new payroll workflow" },
    { value: "~3 hrs", label: "Saved per pay period on a 25-person crew" },
    { value: "100%", label: "Of synced entries job-costed automatically" },
];

const integrationBadges = [
    { label: "QuickBooks Online" },
    { label: "QuickBooks Desktop Pro" },
    { label: "QuickBooks Desktop Premier" },
    { label: "QuickBooks Enterprise" },
    { label: "QuickBooks Contractor" },
];

export default function PayrollSyncQuickbooksFeaturePage() {
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
                    <div className="pointer-events-none absolute -right-32 top-72 -z-10 h-[420px] w-[420px] rounded-full bg-emerald-300/15 blur-3xl" />

                    <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
                        <div className="mb-4 sm:mb-6 inline-flex max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.025] py-[3px] pl-[3px] pr-2.5 text-[11px] font-medium text-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:gap-2 sm:py-1 sm:pl-1 sm:pr-4 sm:text-xs">
                            <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-primary sm:px-2 sm:text-[10px]">
                                New
                            </span>
                            <span className="hidden text-foreground/25 sm:inline" aria-hidden="true">·</span>
                            <span className="whitespace-nowrap">Payroll sync to QuickBooks</span>
                        </div>
                        <h1 className="mt-7 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                            One click. Approved hours{" "}
                            <span className="text-primary italic">straight into QuickBooks.</span>
                        </h1>
                        <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Approve crew hours in Crewtrace, hit sync, and watch them land in QuickBooks Online or Desktop with the right employee, job, and pay item already mapped. No CSVs. No copy-paste. No more Thursday timesheet grind.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href="/contact"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 cta-highlight px-7 py-4 text-white bg-primary hover:bg-primary/90 rounded-md font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                            >
                                See the sync in action
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

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-[0.16em] text-foreground/45">
                            <span className="inline-flex items-center gap-2">
                                <Plug size={14} className="text-primary/70" />
                                QuickBooks Online
                            </span>
                            <span className="hidden h-1 w-1 rounded-full bg-foreground/20 sm:inline-block" />
                            <span className="inline-flex items-center gap-2">
                                <Plug size={14} className="text-primary/70" />
                                QuickBooks Desktop
                            </span>
                            <span className="hidden h-1 w-1 rounded-full bg-foreground/20 sm:inline-block" />
                            <span className="inline-flex items-center gap-2">
                                <ShieldCheck size={14} className="text-emerald-500/80" />
                                OAuth-secured
                            </span>
                        </div>
                    </div>

                    <div className="relative mx-auto mt-16 w-full max-w-7xl md:mt-20">
                        <Image
                            src={`${PLACEHOLDER_BASE}/quickbooks-hero.png`}
                            alt="Crewtrace sync console pushing a pay period of approved hours into QuickBooks with mapped employees, jobs, and pay items"
                            width={1920}
                            height={1080}
                            className="h-auto w-full rounded-md shadow-xl"
                            priority
                        />
                    </div>
                </section>

                <SectionDivider />

                {/* PAIN POINTS */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-rose-500/15 bg-rose-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-rose-600 backdrop-blur-sm">
                                <AlertTriangle size={14} />
                                The Thursday timesheet ritual
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Why payroll day still takes a whole afternoon.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                                Most contractors don&apos;t have a payroll problem. They have a <span className="font-bold text-foreground/80">data-handoff</span> problem — and QuickBooks is where it shows up.
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
                                        className="surface-panel group relative overflow-hidden rounded-md border border-foreground/5 bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div
                                            className={`mb-6 flex h-12 w-12 items-center justify-center rounded-md ring-1 ${toneClasses[pain.tone]}`}
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

                <SectionDivider />

                {/* BEFORE / AFTER VISUAL */}
                <section className="relative overflow-hidden px-6 pb-24 md:pb-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="relative grid gap-6 rounded-md border border-foreground/5 bg-gradient-to-br from-white to-slate-50/80 p-6 shadow-lg md:grid-cols-2 md:p-10">
                            <div className="relative overflow-hidden rounded-md border border-rose-200/40 bg-rose-50/40 p-6">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-rose-600">
                                    <XCircle size={14} />
                                    Before — CSV chaos
                                </div>
                                <Image
                                    src={`${PLACEHOLDER_BASE}/before-csv.png`}
                                    alt="A messy spreadsheet of approved hours being copy-pasted into QuickBooks"
                                    width={1200}
                                    height={800}
                                    className="mt-5 h-auto w-full rounded-md border border-rose-200/40 shadow-md"
                                />
                                <ul className="mt-5 space-y-2 text-sm font-semibold text-foreground/70">
                                    <li className="flex gap-2"><XCircle size={16} className="mt-0.5 flex-shrink-0 text-rose-500" /> Hours retyped from approvals into QB</li>
                                    <li className="flex gap-2"><XCircle size={16} className="mt-0.5 flex-shrink-0 text-rose-500" /> Names mismatch — silent miscoding</li>
                                    <li className="flex gap-2"><XCircle size={16} className="mt-0.5 flex-shrink-0 text-rose-500" /> Job costs that never tie out</li>
                                </ul>
                            </div>

                            <div className="relative overflow-hidden rounded-md border border-emerald-200/40 bg-emerald-50/40 p-6">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                                    <Sparkles size={14} />
                                    After — One-click sync
                                </div>
                                <Image
                                    src={`${PLACEHOLDER_BASE}/after-sync.png`}
                                    alt="Crewtrace sync console showing approved hours being pushed to QuickBooks in a single click"
                                    width={1200}
                                    height={800}
                                    className="mt-5 h-auto w-full rounded-md border border-emerald-200/40 shadow-md"
                                />
                                <ul className="mt-5 space-y-2 text-sm font-semibold text-foreground/80">
                                    <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" /> Approved hours sync straight to QuickBooks</li>
                                    <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" /> Pre-flight catches issues before posting</li>
                                    <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" /> Job-cost reports match the field record</li>
                                </ul>
                            </div>

                            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg ring-1 ring-foreground/5 md:flex">
                                <ArrowRight size={22} />
                            </div>
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* FEATURE SPOTLIGHTS */}
                <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50/60 px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-20">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Sparkles size={14} />
                                Inside the QuickBooks sync
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Built so payroll day stops costing you a day.
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
                                            className="h-auto w-full rounded-md shadow-xl"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* MAPPING TILES */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(47,39,206,0.06)_0%,transparent_60%)]" />
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <ArrowLeftRight size={14} />
                                Mapping that holds up
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Two mappings. Set them once.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                                Crewtrace keeps the two records payroll depends on aligned: employees and jobs. New hires and new jobs surface as a quick review — never as a silent miscode.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {mappingTiles.map((tile) => {
                                const Icon = tile.icon;
                                const accentClasses: Record<typeof tile.accent, string> = {
                                    primary: "bg-primary/10 text-primary ring-primary/15",
                                    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-200/60",
                                };
                                return (
                                    <div
                                        key={tile.title}
                                        className="surface-panel group relative overflow-hidden rounded-md border border-foreground/5 bg-white p-7 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-md ring-1 ${accentClasses[tile.accent]}`}
                                        >
                                            <Icon size={22} />
                                        </div>
                                        <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">
                                            {tile.title}
                                        </h3>
                                        <p className="mt-3 text-base font-medium leading-relaxed text-foreground/65">
                                            {tile.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-14 mx-auto w-full max-w-6xl">
                            <Image
                                src={`${PLACEHOLDER_BASE}/mapping-diagram.png`}
                                alt="Diagram mapping Crewtrace employees to QuickBooks employees and Crewtrace jobs to QuickBooks customers"
                                width={2400}
                                height={1100}
                                className="h-auto w-full rounded-md shadow-xl"
                            />
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* CAPABILITIES GRID */}
                <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50/60 px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Receipt size={14} />
                                What&apos;s in the box
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Six things the QuickBooks sync does for you.
                            </h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {capabilities.map((cap) => {
                                const Icon = cap.icon;
                                return (
                                    <div
                                        key={cap.title}
                                        className="surface-panel group relative overflow-hidden rounded-md border border-foreground/5 bg-white p-6 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
                                            <Icon size={20} />
                                        </div>
                                        <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">
                                            {cap.title}
                                        </h3>
                                        <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/60">
                                            {cap.description}
                                        </p>
                                    </div>
                                );
                            })}
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
                                <Layers size={14} />
                                From approval to QuickBooks
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Four steps from field hours to a clean payroll run.
                            </h2>
                        </div>

                        <div className="mx-auto w-full max-w-7xl">
                            <Image
                                src={`${PLACEHOLDER_BASE}/workflow-diagram.png`}
                                alt="End-to-end flow: Crewtrace approvals to pre-flight to QuickBooks sync to job-cost reports"
                                width={2400}
                                height={1350}
                                className="h-auto w-full rounded-md shadow-xl"
                            />
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* SUPPORTED EDITIONS */}
                <section className="relative overflow-hidden px-6 py-24 md:py-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                            <div>
                                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 backdrop-blur-sm">
                                    <Plug size={14} />
                                    Works with the QuickBooks you already run
                                </p>
                                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                                    Online or Desktop. Same one-click sync.
                                </h2>
                                <p className="mt-5 text-lg font-medium leading-relaxed text-foreground/65">
                                    QuickBooks Online connects with a one-time OAuth handshake. QuickBooks Desktop installs a lightweight Web Connector that pushes approved hours on demand or on a schedule. Either way, the Crewtrace experience is identical.
                                </p>
                                <div className="mt-7 flex flex-wrap gap-2.5">
                                    {integrationBadges.map((badge) => (
                                        <span
                                            key={badge.label}
                                            className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-foreground/70 shadow-sm"
                                        >
                                            <BadgeCheck size={14} className="text-emerald-500" />
                                            {badge.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Image
                                src={`${PLACEHOLDER_BASE}/quickbooks-editions.png`}
                                alt="Supported QuickBooks editions: Online, Desktop Pro, Premier, Enterprise, and Contractor"
                                width={1400}
                                height={1100}
                                className="mx-auto h-auto w-full max-w-xl rounded-md shadow-xl"
                            />
                        </div>
                    </div>
                </section>

                <SectionDivider />

                <FeatureComparison
                    eyebrow="CSV imports vs. Crewtrace sync"
                    eyebrowIcon={FileSpreadsheet}
                    title="Same hours."
                    subtitle="Two very different payroll days."
                    leftColumn={{
                        label: "Today",
                        sublabel: "CSV exports & retyping",
                        icon: XCircle,
                    }}
                    rightColumn={{
                        label: "After rollout",
                        sublabel: "One-click QuickBooks sync",
                        icon: Sparkles,
                        badge: "Synced",
                    }}
                    rows={compareRows}
                    firstRowAnnotation="one click"
                    leftSummary={{
                        icon: Clock,
                        highlight: "~3 hrs/period",
                        text: "retyping, fixing imports, reconciling",
                    }}
                    rightSummary={{
                        icon: RefreshCcw,
                        text: "One record. ",
                        highlight: "Approved hours straight into QuickBooks.",
                    }}
                />

                <SectionDivider />

                {/* USE CASES BY INDUSTRY */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Users size={14} />
                                Built for the trades
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Payroll sync that fits how your trade actually bills.
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {useCases.map((u) => {
                                const Icon = u.icon;
                                return (
                                    <Link
                                        key={u.slug}
                                        href={`/industries/${u.slug}`}
                                        className="surface-panel group relative overflow-hidden rounded-md border border-foreground/5 bg-white p-7 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
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

                <SectionDivider />

                {/* STATS */}
                <section className="relative overflow-hidden bg-gradient-to-br from-primary/95 via-primary to-primary/90 px-6 py-24 md:py-28 text-white">
                    <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 40%)" }} />
                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="flex flex-col items-center text-center mb-14">
                            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                                <Sparkles size={14} />
                                What changes on payroll day
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl max-w-3xl">
                                Less retyping. Cleaner job costs. Same QuickBooks file.
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

                {/* FAQ */}
                <FAQSection
                    eyebrow="QuickBooks Payroll Sync FAQ"
                    title="QuickBooks sync questions, answered"
                    description={`Answers to common questions about ${solution.primaryKeyword}, supported editions, mapping, and how the sync fits into payroll day.`}
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
