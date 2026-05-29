import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    MapPin,
    ShieldCheck,
    AlertTriangle,
    Clock,
    FileSpreadsheet,
    Users,
    CheckCircle2,
    XCircle,
    Calculator,
    Hexagon,
    Smartphone,
    Flag,
    FileCheck2,
    HardHat,
    Wrench,
    Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import FAQSection from "@/components/FAQSection";
import BookedCallLink from "@/components/BookedCallLink";
import SeoLandingTracker from "@/components/SeoLandingTracker";
import GreyPlaceholder from "@/components/payroll-leakage/GreyPlaceholder";
import { createPageMetadata } from "@/lib/seo";
import type { FaqItem } from "@/lib/faq";

const LANDING_PATH = "/payroll-leakage";
const CLUSTER = "payroll_leakage_ads";
const TEMPLATE_TYPE = "google_ads_landing";

export const metadata: Metadata = createPageMetadata({
    title: "Stop Payroll Leakage from Field Time Errors",
    description:
        "See how much payroll leakage, buddy punching, and timesheet errors may be costing your construction business. Crewtrace gives contractors GPS-verified crew time records.",
    path: LANDING_PATH,
});

const heroBullets = [
    { icon: MapPin, label: "GPS-verified clock-ins" },
    { icon: Hexagon, label: "Geofenced jobsites" },
    { icon: FileCheck2, label: "Payroll-ready time records" },
    { icon: HardHat, label: "Built for field crews" },
];

const problemCards = [
    "A worker clocks in before reaching the site.",
    "Someone edits missed time at the end of the week.",
    "A foreman approves hours without location proof.",
    "Payroll spends Friday chasing down missing details.",
    "The business pays for time it can't confidently verify.",
];

const benefitBlocks = [
    {
        icon: Hexagon,
        title: "Geofenced clock-ins",
        description:
            "Require crews to clock in from the assigned jobsite, not from the truck, home, or across town.",
    },
    {
        icon: MapPin,
        title: "GPS-backed timesheets",
        description:
            "Each clock event includes location context, timestamp, worker, job, and exception history.",
    },
    {
        icon: Flag,
        title: "Exception flags",
        description:
            "Spot off-site clock-ins, missed punches, late changes, and questionable records before payroll is approved.",
    },
    {
        icon: FileSpreadsheet,
        title: "Payroll-ready exports",
        description:
            "Move cleaner crew time into payroll without rebuilding the week from texts, paper, or memory.",
    },
];

const beforeItems = [
    "Paper sheets and screenshots",
    "Manual edits with no clear trail",
    "Foremen approving time from memory",
    "Payroll questions every Friday",
    "Hard conversations after checks are already cut",
];

const afterItems = [
    "Clock-ins tied to jobsites",
    "GPS context on every event",
    "Exceptions visible before approval",
    "Cleaner records for payroll",
    "Fewer disputes over who was where and when",
];

const howItWorksSteps = [
    {
        step: "01",
        icon: Hexagon,
        title: "Set up your jobsites",
        description: "Create each job and draw the geofence around where work should happen.",
    },
    {
        step: "02",
        icon: Smartphone,
        title: "Crews clock in from the field",
        description: "Workers use the mobile app to clock in and out from their assigned site.",
    },
    {
        step: "03",
        icon: Flag,
        title: "Crewtrace flags exceptions",
        description: "Off-site punches, missed times, and edits are surfaced before payroll closes.",
    },
    {
        step: "04",
        icon: FileCheck2,
        title: "Approve cleaner time",
        description: "Export verified records and spend less time chasing down what happened.",
    },
];

const audienceBullets = [
    "General contractors",
    "Specialty trades",
    "Concrete, roofing, electrical, plumbing, HVAC, landscaping, and field services",
    "Growing teams still relying on paper, spreadsheets, or basic clock apps",
    "Owners who suspect time leakage but need proof before changing process",
];

const objectionFaqItems: FaqItem[] = [
    {
        question: "Do you track employees all day?",
        answer: "No. Crewtrace focuses on clock events and jobsite verification, not constant surveillance.",
    },
    {
        question: "Will this slow crews down?",
        answer: "No. The goal is a faster clock-in flow with fewer payroll questions later.",
    },
    {
        question: "Can we still fix missed punches?",
        answer: "Yes. Corrections can be handled with a clearer record of what changed and why.",
    },
    {
        question: "Is this only for large contractors?",
        answer: "No. It is especially useful for small and mid-sized crews where a few payroll errors can quickly eat into margin.",
    },
];

function PrimaryCta({
    children,
    href = "/calculator",
    className = "",
}: {
    children: ReactNode;
    href?: string;
    className?: string;
}) {
    return (
        <Link
            href={href}
            className={`group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(47,39,206,0.15)] transition-all hover:bg-primary/90 motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 sm:px-8 sm:py-4 sm:text-base ${className}`}
        >
            {children}
            <ArrowRight
                size={18}
                aria-hidden
                className="transition-transform motion-safe:group-hover:translate-x-0.5"
            />
        </Link>
    );
}

function SecondaryCta({
    children,
    href,
    className = "",
}: {
    children: ReactNode;
    href: string;
    className?: string;
}) {
    return (
        <Link
            href={href}
            className={`group inline-flex items-center justify-center gap-2 rounded-md border-2 border-primary bg-transparent px-6 py-3.5 text-sm font-bold text-primary transition-all hover:bg-primary/[0.06] motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 sm:px-8 sm:py-4 sm:text-base ${className}`}
        >
            {children}
            <ArrowRight
                size={18}
                aria-hidden
                className="transition-transform motion-safe:group-hover:translate-x-0.5"
            />
        </Link>
    );
}

function ExistingSiteImage({
    src,
    alt,
    aspect = "aspect-[16/10]",
    className = "",
    imageClassName = "object-cover",
    priority = false,
}: {
    src: string;
    alt: string;
    aspect?: string;
    className?: string;
    imageClassName?: string;
    priority?: boolean;
}) {
    return (
        <div
            className={`relative w-full overflow-hidden rounded-md border border-foreground/[0.06] bg-white/80 ${aspect} ${className}`}
        >
            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={imageClassName}
            />
        </div>
    );
}

export default function PayrollLeakageLandingPage() {
    return (
        <div className="min-h-screen bg-background">
            <SeoLandingTracker
                templateType={TEMPLATE_TYPE}
                cluster={CLUSTER}
                pageUrl={LANDING_PATH}
                pageSlug="payroll-leakage"
            />
            <Navbar />

            <main>
                {/* ── Section 1: Hero ── */}
                <section
                    id="hero"
                    className="relative scroll-mt-32 overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36"
                >
                    <div className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-[80%] translate-x-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(47,39,206,0.1)_0%,transparent_60%)] md:w-[55%]" />
                    <div className="pointer-events-none absolute left-0 top-1/4 -z-10 h-full w-[50%] -translate-x-1/2 bg-[radial-gradient(circle_at_left_center,rgba(47,39,206,0.04)_0%,transparent_50%)]" />

                    <div className="layout-shell">
                        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                            <div className="space-y-8">
                                <div className="inline-flex max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.025] py-[3px] pl-[3px] pr-2.5 text-[11px] font-medium text-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:gap-2 sm:py-1 sm:pl-1 sm:pr-4 sm:text-xs">
                                    <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-primary sm:px-2 sm:text-[10px]">
                                        Payroll
                                    </span>
                                    <span className="hidden text-foreground/25 sm:inline" aria-hidden="true">
                                        ·
                                    </span>
                                    <span>For construction crews still fighting messy timesheets</span>
                                </div>

                                <div className="space-y-5">
                                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.75rem]">
                                        Stop paying for hours you{" "}
                                        <span className="text-primary italic">can&apos;t verify</span>
                                    </h1>
                                    <p className="max-w-xl text-lg font-medium leading-relaxed text-foreground/65 md:text-xl">
                                        Crewtrace helps contractors catch payroll leakage from buddy punching,
                                        off-site clock-ins, late edits, and paper timesheet errors before they hit
                                        payroll.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                    <PrimaryCta>Get My Free Payroll Leakage Audit</PrimaryCta>
                                    <SecondaryCta href="#solution">
                                        See How GPS Verification Works
                                    </SecondaryCta>
                                </div>

                                <ul className="grid gap-3 sm:grid-cols-2">
                                    {heroBullets.map(({ icon: Icon, label }) => (
                                        <li
                                            key={label}
                                            className="flex items-center gap-3 text-sm font-semibold text-foreground/70"
                                        >
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                                <Icon size={16} />
                                            </span>
                                            {label}
                                        </li>
                                    ))}
                                </ul>

                                <p className="text-sm font-medium text-foreground/50">
                                    For contractors who need cleaner time records without adding more admin work.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute -inset-4 -z-10 rounded-md bg-primary/[0.04] blur-2xl" />
                                <ExistingSiteImage
                                    src="/images/payroll-leakage/hero-clock-in.png"
                                    alt="Construction worker holding a mobile GPS clock-in app on a jobsite"
                                    aspect="aspect-square"
                                    imageClassName="object-cover object-center"
                                    className="shadow-[0_24px_64px_-12px_rgba(15,23,42,0.12)]"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── Section 2: Problem ── */}
                <section id="problem" className="scroll-mt-32 py-20 md:py-28">
                    <div className="layout-shell">
                        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
                            <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                                Payroll leakage usually hides in plain sight
                            </h2>
                            <p className="mx-auto text-lg font-medium leading-relaxed text-foreground/60 md:text-xl">
                                Most crews are not trying to create payroll problems. But when time comes from
                                paper sheets, texts, memory, or a generic clock app, small errors stack up fast.
                            </p>
                        </div>

                        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {problemCards.map((card, index) => (
                                <div
                                    key={card}
                                    className="group relative overflow-hidden rounded-md border border-slate-200/90 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_-8px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_16px_40px_-8px_rgba(47,39,206,0.1)]"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-rose-50 text-xs font-bold tabular-nums text-rose-600">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <AlertTriangle
                                            size={18}
                                            className="text-rose-400/70 transition-colors group-hover:text-rose-500"
                                        />
                                    </div>
                                    <p className="text-[15px] font-semibold leading-snug text-foreground/85">
                                        {card}
                                    </p>
                                </div>
                            ))}
                            <div className="relative overflow-hidden rounded-md border border-primary/15 bg-gradient-to-br from-primary/[0.06] via-secondary/30 to-white p-6 sm:col-span-2 lg:col-span-1">
                                <ExistingSiteImage
                                    src="/images/blog/payroll-signs-cover.png"
                                    alt="Construction business owner reviewing payroll paperwork and calculator at a desk"
                                    aspect="aspect-[16/9]"
                                    className="mb-4 border-primary/10"
                                />
                                <p className="text-sm font-medium leading-relaxed text-foreground/60">
                                    Small gaps in verification compound across every crew, every week.
                                </p>
                            </div>
                        </div>

                        <p className="mx-auto max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
                            One or two questionable entries may not look like much. Across every crew, every
                            week, they become real margin loss.
                        </p>
                    </div>
                </section>

                <SectionDivider />

                {/* ── Section 3: Calculator Tease ── */}
                <section id="calculator" className="scroll-mt-32 py-20 md:py-28">
                    <div className="layout-shell">
                        <div className="relative overflow-hidden rounded-md border border-primary/20 bg-gradient-to-br from-primary via-primary to-[#1e18a8] p-8 md:p-12 lg:p-16">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-[url('/images/background-design-ct.png')] bg-cover bg-center opacity-20"
                            />
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12)_0%,transparent_55%)]"
                            />

                            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                                <div className="space-y-6 text-white">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/90">
                                        <Calculator size={14} />
                                        <span>Free payroll leakage audit</span>
                                    </div>
                                    <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                                        What could a few unverified hours be costing you?
                                    </h2>
                                    <p className="max-w-xl text-lg font-medium leading-relaxed text-white/80">
                                        Run a quick payroll leakage audit using your crew size, hourly rates, and
                                        estimated time errors. You&apos;ll see where money may be slipping through
                                        before you change any systems.
                                    </p>
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                        <Link
                                            href="/calculator"
                                            className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-8 py-4 text-base font-bold text-primary transition-all hover:bg-white/95 motion-safe:hover:-translate-y-0.5"
                                        >
                                            Calculate My Payroll Leakage
                                            <ArrowRight
                                                size={18}
                                                className="transition-transform motion-safe:group-hover:translate-x-0.5"
                                            />
                                        </Link>
                                        <p className="text-sm font-medium text-white/65">
                                            Takes about 60 seconds. No spreadsheet required.
                                        </p>
                                    </div>
                                </div>

                                <GreyPlaceholder
                                    aspect="aspect-[4/3]"
                                    label="Payroll leakage calculator preview"
                                    className="border-white/20 bg-white/20"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── Section 4: Solution ── */}
                <section id="solution" className="scroll-mt-32 py-20 md:py-28">
                    <div className="layout-shell">
                        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                            <div className="space-y-6 lg:sticky lg:top-32">
                                <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                                    <ShieldCheck size={14} />
                                    <span>The Crewtrace approach</span>
                                </div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                                    Crewtrace turns every clock-in into a verifiable record
                                </h2>
                                <p className="text-lg font-medium leading-relaxed text-foreground/60 md:text-xl">
                                    Crewtrace gives your team a simple mobile time clock while giving the office
                                    the proof needed to close payroll with confidence.
                                </p>
                                <ExistingSiteImage
                                    src="/images/gps/phone.png"
                                    alt="Crewtrace phone clock-in screen with a verified location marker on a map"
                                    aspect="aspect-[16/10]"
                                    className="hidden lg:block"
                                    imageClassName="object-cover object-center"
                                />
                            </div>

                            <div className="grid gap-5">
                                {benefitBlocks.map(({ icon: Icon, title, description }, index) => (
                                    <div
                                        key={title}
                                        className="flex gap-5 rounded-md border border-slate-200/90 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_-6px_rgba(15,23,42,0.08)]"
                                    >
                                        <div className="flex shrink-0 flex-col items-center gap-2">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                                                <Icon size={20} />
                                            </span>
                                            <span className="text-[10px] font-bold tabular-nums text-foreground/30">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold tracking-tight text-foreground">
                                                {title}
                                            </h3>
                                            <p className="text-[15px] font-medium leading-relaxed text-foreground/60">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── Section 5: Before / After ── */}
                <section id="before-after" className="scroll-mt-32 py-20 md:py-28">
                    <div className="layout-shell">
                        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
                            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                                From payroll guessing to payroll proof
                            </h2>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="overflow-hidden rounded-md border border-rose-200/80 bg-gradient-to-b from-rose-50/80 to-white">
                                <div className="border-b border-rose-100 px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-rose-600">
                                        <XCircle size={16} />
                                        Before
                                    </div>
                                </div>
                                <div className="space-y-4 p-6">
                                    <ExistingSiteImage
                                        src="/images/quickbooks/before-csv.png"
                                        alt="Messy payroll spreadsheet with errors, warnings, and manual notes"
                                        aspect="aspect-video"
                                        className="border-rose-100"
                                        imageClassName="object-cover object-center"
                                    />
                                    <ul className="space-y-3">
                                        {beforeItems.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3 text-[15px] font-medium text-foreground/70"
                                            >
                                                <XCircle
                                                    size={18}
                                                    className="mt-0.5 shrink-0 text-rose-400"
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-md border border-emerald-200/80 bg-gradient-to-b from-emerald-50/80 to-white">
                                <div className="border-b border-emerald-100 px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-700">
                                        <CheckCircle2 size={16} />
                                        After
                                    </div>
                                </div>
                                <div className="space-y-4 p-6">
                                    <ExistingSiteImage
                                        src="/images/quickbooks/after-sync.png"
                                        alt="Crewtrace payroll report ready for review and sync"
                                        aspect="aspect-video"
                                        className="border-emerald-100"
                                        imageClassName="object-cover object-center"
                                    />
                                    <ul className="space-y-3">
                                        {afterItems.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3 text-[15px] font-medium text-foreground/70"
                                            >
                                                <CheckCircle2
                                                    size={18}
                                                    className="mt-0.5 shrink-0 text-emerald-500"
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── Section 6: How It Works ── */}
                <section id="how-it-works" className="scroll-mt-32 py-20 md:py-28">
                    <div className="layout-shell">
                        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
                            <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                                Simple for the crew. Clear for the office.
                            </h2>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                            {howItWorksSteps.map(({ step, icon: Icon, title, description }) => (
                                <div
                                    key={step}
                                    className="flex flex-col overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_8px_24px_-6px_rgba(15,23,42,0.08)]"
                                >
                                    <ExistingSiteImage
                                        src={
                                            step === "01"
                                                ? "/images/geofencing/draw-boundary.png"
                                                : step === "02"
                                                  ? "/images/gps/phone.png"
                                                  : step === "03"
                                                    ? "/images/geofencing/review-exceptions.png"
                                                    : "/images/guides/payroll-dashboard.png"
                                        }
                                        alt={
                                            step === "01"
                                                ? "Crewtrace job setup screen showing a geofence boundary drawn around a jobsite"
                                                : step === "02"
                                                  ? "Crewtrace mobile clock-in screen with verified location"
                                                  : step === "03"
                                                    ? "Crewtrace payroll readiness screen showing a GPS anomaly that needs review"
                                                    : "Payroll dashboard showing export-ready crew hours"
                                        }
                                        aspect="aspect-[4/3]"
                                        className="rounded-none border-0 border-b border-slate-100"
                                        imageClassName="object-cover object-center"
                                    />
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="mb-4 flex items-center gap-3">
                                            <span className="text-xs font-bold tabular-nums text-primary">
                                                {step}
                                            </span>
                                            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                                                <Icon size={18} />
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground">
                                            {title}
                                        </h3>
                                        <p className="text-sm font-medium leading-relaxed text-foreground/60">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── Section 7: Audience Fit ── */}
                <section id="audience" className="scroll-mt-32 py-20 md:py-28">
                    <div className="layout-shell">
                        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                            <ExistingSiteImage
                                src="/images/guides/crew-onboarding.png"
                                alt="Construction crew holding a mobile clock-in app"
                                aspect="aspect-[4/3]"
                                className="order-2 lg:order-1"
                                imageClassName="object-cover object-center"
                            />
                            <div className="order-1 space-y-8 lg:order-2">
                                <div className="space-y-5">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                                        <Users size={14} />
                                        <span>Who it&apos;s for</span>
                                    </div>
                                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                                        Built for contractors with crews in the field
                                    </h2>
                                    <p className="text-lg font-medium leading-relaxed text-foreground/60">
                                        Crewtrace is for construction and crew-based businesses that need better time
                                        records without forcing the office to babysit every punch.
                                    </p>
                                </div>
                                <ul className="space-y-4">
                                    {audienceBullets.map((bullet) => (
                                        <li
                                            key={bullet}
                                            className="flex items-start gap-3 rounded-md border border-slate-100 bg-white px-4 py-3.5 text-[15px] font-medium text-foreground/75 shadow-sm"
                                        >
                                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                {bullet.startsWith("General") ? (
                                                    <Building2 size={13} />
                                                ) : bullet.startsWith("Specialty") ? (
                                                    <Wrench size={13} />
                                                ) : (
                                                    <CheckCircle2 size={13} />
                                                )}
                                            </span>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── Section 8: Objection Handling ── */}
                <section id="objections" className="scroll-mt-32">
                    <FAQSection
                        eyebrow="Common concerns"
                        title="What if my crew pushes back?"
                        description="Crewtrace is designed to verify clock events, not track workers all day. Location is tied to time events so crews get a simple clock-in flow and the office gets the record it needs."
                        items={objectionFaqItems}
                    />
                </section>

                <SectionDivider />

                {/* ── Section 9: Final CTA ── */}
                <section id="final-cta" className="scroll-mt-32 pb-24 pt-12 md:pb-32 md:pt-16">
                    <div className="layout-shell">
                        <div className="relative overflow-hidden rounded-md border border-slate-200/90 bg-white p-8 shadow-[0_24px_64px_-12px_rgba(15,23,42,0.12)] md:p-12 lg:p-16">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(47,39,206,0.06)_0%,transparent_50%)]"
                            />

                            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                                        <Clock size={16} />
                                        <span>Before your next payroll run</span>
                                    </div>
                                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                                        Find the payroll leakage before it becomes another payroll run
                                    </h2>
                                    <p className="max-w-xl text-lg font-medium leading-relaxed text-foreground/60">
                                        Use the free audit to estimate what unverified time could be costing your
                                        business, then see how Crewtrace helps close the gap with GPS-verified
                                        crew time.
                                    </p>
                                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                        <PrimaryCta>Get My Free Payroll Leakage Audit</PrimaryCta>
                                        <BookedCallLink
                                            templateType={TEMPLATE_TYPE}
                                            cluster={CLUSTER}
                                            landingPath={LANDING_PATH}
                                            ctaLabel="Book a Crewtrace Demo"
                                            ctaLocation="final_cta"
                                            className="group inline-flex items-center justify-center gap-2 rounded-md border-2 border-primary bg-transparent px-6 py-3.5 text-sm font-bold text-primary transition-all hover:bg-primary/[0.06] motion-safe:hover:-translate-y-0.5 sm:px-8 sm:py-4 sm:text-base"
                                        >
                                            Book a Crewtrace Demo
                                            <ArrowRight
                                                size={18}
                                                aria-hidden
                                                className="transition-transform motion-safe:group-hover:translate-x-0.5"
                                            />
                                        </BookedCallLink>
                                    </div>
                                    <p className="text-sm font-medium text-foreground/45">
                                        Built for U.S. crew-based businesses. No pressure, just a clearer view of
                                        your time records.
                                    </p>
                                </div>

                                <ExistingSiteImage
                                    src="/images/guides/approval-workflow.png"
                                    alt="Crew time approval workflow moving from mobile clock-in to approval and payroll export"
                                    aspect="aspect-square"
                                    imageClassName="object-contain p-6"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SectionDivider />
            <Footer />
        </div>
    );
}
