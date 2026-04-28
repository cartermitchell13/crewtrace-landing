import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    MapPin,
    Satellite,
    Smartphone,
    ShieldCheck,
    Eye,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Clock,
    Sparkles,
    FileCheck2,
    Navigation,
    Signal,
    Battery,
    Users,
    Building2,
    Wrench,
    TreePine,
    Zap,
    Hammer,
    Radar,
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

const SLUG = "gps-time-tracking";
const PATH = `/features/${SLUG}`;
const solution = featureBySlug[SLUG]!;

export const metadata: Metadata = createPageMetadata({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: PATH,
});

type PlaceholderTone = "primary" | "emerald" | "amber" | "slate" | "rose" | "sky";

type PlaceholderProps = {
    label: string;
    sublabel?: string;
    aspect?: string;
    tone?: PlaceholderTone;
    variant?: "grid" | "map" | "phone" | "radar";
    className?: string;
};

function ImagePlaceholder({
    label,
    sublabel,
    aspect = "aspect-[16/10]",
    tone = "primary",
    variant = "grid",
    className = "",
}: PlaceholderProps) {
    const toneMap: Record<PlaceholderTone, string> = {
        primary: "from-primary/15 via-primary/5 to-white",
        emerald: "from-emerald-200/40 via-emerald-50 to-white",
        amber: "from-amber-200/40 via-amber-50 to-white",
        slate: "from-slate-200/60 via-slate-50 to-white",
        rose: "from-rose-200/40 via-rose-50 to-white",
        sky: "from-sky-200/40 via-sky-50 to-white",
    };
    const dotMap: Record<PlaceholderTone, string> = {
        primary: "bg-primary/40",
        emerald: "bg-emerald-500/50",
        amber: "bg-amber-500/50",
        slate: "bg-slate-500/40",
        rose: "bg-rose-500/50",
        sky: "bg-sky-500/50",
    };

    return (
        <div
            className={`relative w-full overflow-hidden rounded-[1.75rem] border border-foreground/5 bg-gradient-to-br ${toneMap[tone]} ${aspect} ${className}`}
            role="img"
            aria-label={label}
        >
            {variant === "grid" && (
                <div
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
            )}
            {variant === "map" && (
                <>
                    <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                            backgroundImage:
                                "linear-gradient(115deg, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(65deg, rgba(15,23,42,0.08) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                    <div className="absolute left-[18%] top-[28%] h-40 w-40 rounded-full border-2 border-dashed border-primary/50 bg-primary/10" />
                    <div className="absolute left-[30%] top-[42%] h-3 w-3 rounded-full bg-primary shadow-[0_0_0_6px_rgba(47,39,206,0.18)]" />
                    <div className="absolute right-[22%] top-[58%] h-28 w-28 rounded-full border-2 border-dashed border-emerald-500/50 bg-emerald-500/10" />
                    <div className="absolute right-[30%] top-[66%] h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
                </>
            )}
            {variant === "phone" && (
                <div
                    className="absolute inset-0 opacity-[0.25]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 30% 20%, rgba(47,39,206,0.25) 0%, transparent 40%), radial-gradient(circle at 75% 80%, rgba(16,185,129,0.2) 0%, transparent 40%)",
                    }}
                />
            )}
            {variant === "radar" && (
                <>
                    <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" />
                    <div className="absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30" />
                    <div className="absolute left-1/2 top-1/2 h-[20%] w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40" />
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
                </>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
                <span className={`flex h-2 w-2 rounded-full ${dotMap[tone]}`} />
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/45">
                    Image placeholder
                </p>
                <p className="max-w-md text-sm font-semibold text-foreground/70">{label}</p>
                {sublabel && (
                    <p className="max-w-md text-xs font-medium text-foreground/45">{sublabel}</p>
                )}
            </div>
        </div>
    );
}

const painPoints = [
    {
        title: "The parking-lot clock-in",
        description:
            "Workers punch in from the cab on the drive over. The timesheet says 7:00 but the crew didn't touch the job site until 7:45.",
        icon: Navigation,
        tone: "rose" as const,
    },
    {
        title: "\"I was there, I swear\"",
        description:
            "A supervisor flags a short day. The worker insists the hours are right. With no location record, the argument wins over the truth.",
        icon: AlertTriangle,
        tone: "amber" as const,
    },
    {
        title: "Payroll built on memory",
        description:
            "Paper logs get transcribed, errors get guessed at, and by Thursday nobody remembers which site crew #3 actually worked Tuesday.",
        icon: Clock,
        tone: "slate" as const,
    },
];

const spotlights = [
    {
        eyebrow: "Geofence verification",
        title: "Every clock event tied to a real job site.",
        description:
            "Draw a geofence around each job. When a worker taps clock in, Crewtrace checks their GPS against that boundary and stamps the event with a location and a confidence score. No boundary match, no silent pass-through.",
        bullets: [
            "Custom geofence per project or address",
            "Pass / fail / review status on every clock event",
            "Location confidence score stored with each record",
        ],
        image: {
            src: "/images/gps/geofence.png",
            alt: "Crewtrace geofence overlay on a job-site map with a verified GPS clock-in pin",
        },
        icon: Radar,
        reverse: false,
    },
    {
        eyebrow: "Mobile clock in / out",
        title: "One tap. One timestamp. One verified location.",
        description:
            "Crews clock in and out from the same phone they already carry. Location is captured at the exact moment of the tap — not before, not as background tracking — so you get proof without killing a battery or a privacy conversation.",
        bullets: [
            "Works on iOS and Android, online or offline",
            "Event-only location — no continuous tracking",
            "Photo and job-selection prompts at clock-in",
        ],
        image: {
            src: "/images/gps/phone.png",
            alt: "Crewtrace mobile app showing a GPS-verified clock-in on a crew phone",
        },
        icon: Smartphone,
        reverse: true,
    },
    {
        eyebrow: "Live attendance",
        title: "See the whole field, right now.",
        description:
            "Supervisors open Crewtrace and see every active crew on a map — who's on site, who's off, who clocked in from the wrong address. Catch issues during the day instead of untangling them on payroll day.",
        bullets: [
            "Live site-by-site attendance map",
            "Exception flags for off-site or late clock-ins",
            "Daily roll-up of planned vs. verified hours",
        ],
        image: {
            src: "/images/gps/map.png",
            alt: "Crewtrace live attendance map with multiple active crews across job sites",
        },
        icon: Eye,
        reverse: false,
    },
    {
        eyebrow: "Defensible records",
        title: "A time record your payroll team can actually defend.",
        description:
            "Every clock event keeps its GPS coordinates, confidence score, device, and edit history. When a dispute or a DOL question comes up, you pull one record \u2014 not a stack of paper and a hope.",
        bullets: [
            "Immutable clock-event history with edit trail",
            "GPS coordinate + accuracy stamped to each event",
            "One-click export for payroll, disputes, and audits",
        ],
        image: {
            src: "/images/gps/defensible.png",
            alt: "Crewtrace audit-ready time record with GPS metadata and edit history",
        },
        icon: FileCheck2,
        reverse: true,
    },
];

const capabilities = [
    {
        title: "Precise geofencing",
        description: "10–30 ft boundary accuracy with a confidence score on every clock event.",
        icon: Radar,
    },
    {
        title: "Event-only location",
        description: "Captured at clock in / out only — no background tracking, no battery drain.",
        icon: Battery,
    },
    {
        title: "Offline resilience",
        description: "Clock events save on the device and sync when signal returns with a reduced-confidence flag.",
        icon: Signal,
    },
    {
        title: "Exception flagging",
        description: "Off-site, late, or no-GPS events surface for supervisor review automatically.",
        icon: AlertTriangle,
    },
    {
        title: "Live attendance map",
        description: "A single view of who's on site, who's off, and where the variance is right now.",
        icon: MapPin,
    },
    {
        title: "Audit-ready records",
        description: "GPS coordinates, device ID, edits, and approvals stored on every record.",
        icon: ShieldCheck,
    },
];

const workflowSteps = [
    {
        step: "01",
        title: "Draw the geofence",
        description: "Drop the boundary around each site. Save it as a template for repeat jobs.",
        icon: MapPin,
    },
    {
        step: "02",
        title: "Crew clocks in",
        description: "Worker taps clock in from the jobsite. GPS verifies they're inside the boundary.",
        icon: Smartphone,
    },
    {
        step: "03",
        title: "Supervisors watch live",
        description: "Live attendance map flags off-site or late clock-ins while the day is still fixable.",
        icon: Eye,
    },
    {
        step: "04",
        title: "Payroll closes clean",
        description: "Verified hours flow into approvals and exports with the full location trail attached.",
        icon: ShieldCheck,
    },
];

const useCases = [
    {
        industry: "Roofing",
        slug: "roofing",
        scenario: "Early-morning starts across rotating residential sites",
        outcome: "Prove arrival times at each address without calling supervisors to confirm.",
        icon: Hammer,
    },
    {
        industry: "Plumbing",
        slug: "plumbing",
        scenario: "Service techs hitting 6–10 stops a day",
        outcome: "Tie every clock event to an address so billing and payroll agree.",
        icon: Wrench,
    },
    {
        industry: "Landscaping",
        slug: "landscaping",
        scenario: "Multi-stop crew routes with seasonal workers",
        outcome: "Verify time per property without training crews on new software.",
        icon: TreePine,
    },
    {
        industry: "HVAC",
        slug: "hvac",
        scenario: "Dispatchers pushing calls mid-day",
        outcome: "See when techs actually arrive vs. when dispatch assumed they did.",
        icon: Zap,
    },
    {
        industry: "Construction",
        slug: "construction",
        scenario: "Multi-site weeks with shifting crews and subs",
        outcome: "Keep a per-site labor record even when crews move between jobs.",
        icon: Building2,
    },
    {
        industry: "General Contractors",
        slug: "general-contractors",
        scenario: "Employees and subs working the same project",
        outcome: "One verified time record per worker, per site, per day.",
        icon: Users,
    },
];

const compareRows = [
    {
        capability: "Where the clock-in happened",
        icon: MapPin,
        left: "Whatever the worker wrote down",
        right: "GPS coordinate + confidence score",
    },
    {
        capability: "Off-site clock-ins",
        icon: AlertTriangle,
        left: "Invisible until someone complains",
        right: "Flagged automatically for review",
    },
    {
        capability: "Disputes over arrival time",
        icon: Clock,
        left: "Your word vs. theirs",
        right: "Full event record with location",
    },
    {
        capability: "Audit or DOL request",
        icon: FileCheck2,
        left: "Hunt through binders",
        right: "One-click export with full trail",
    },
    {
        capability: "Battery / privacy impact",
        icon: Battery,
        left: "N/A",
        right: "Location only at clock-in / out",
    },
];

const stats = [
    { value: "10–30 ft", label: "Typical geofence accuracy on active sites" },
    { value: "0", label: "Continuous background tracking events" },
    { value: "100%", label: "Clock events stamped with location metadata" },
    { value: "1", label: "Record chain from clock-in to payroll" },
];

export default function GpsTimeTrackingFeaturePage() {
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
                                Feature
                            </span>
                            <span className="hidden text-foreground/25 sm:inline" aria-hidden="true">·</span>
                            <span className="whitespace-nowrap">GPS Time Tracking for Contractors</span>
                        </div>
                        <h1 className="mt-7 text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                            A GPS time clock
                            <br />
                            <span className="text-primary italic">crews can&apos;t fake.</span>
                        </h1>
                        <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Tie every clock in and out to the real job site. Stop paying for parking-lot hours, windshield time, and &quot;I&apos;m pretty sure I was there.&quot;
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href="/contact"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 cta-highlight px-7 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                            >
                                See it on your crews
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
                            src="/images/gps/gps-hero.png"
                            alt="Crewtrace GPS time tracking hero showing job-site map with active geofences, live crew pins, and a clock-in event highlighted"
                            width={1920}
                            height={1080}
                            className="h-auto w-full rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl"
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
                                The hours you&apos;re actually paying for
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Where time leaks out of a field crew.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                                Most contractor payroll problems aren&apos;t fraud — they&apos;re a missing record. Without location context, every timesheet is a story you can&apos;t check.
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
                                Inside Crewtrace GPS Time Tracking
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Location proof, built into every clock event.
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
                                            height={1200}
                                            className="h-auto w-full rounded-[1.5rem] md:rounded-[2rem] shadow-xl"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CAPABILITIES GRID */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(47,39,206,0.06)_0%,transparent_60%)]" />
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Satellite size={14} />
                                What&apos;s in the box
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Six GPS capabilities contractors actually use.
                            </h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {capabilities.map((cap) => {
                                const Icon = cap.icon;
                                return (
                                    <div
                                        key={cap.title}
                                        className="surface-panel group relative overflow-hidden rounded-[1.75rem] border border-foreground/5 bg-white p-6 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
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

                {/* CONNECTED WORKFLOW */}
                <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50/60 px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Radar size={14} />
                                From boundary to payroll
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Four steps from geofence to clean payroll.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                                GPS isn&apos;t a gimmick in Crewtrace. It&apos;s the first link in the record chain that ends with a payroll export you can defend.
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

                        <div className="mt-16 mx-auto w-full max-w-7xl">
                            <Image
                                src="/images/gps/four-steps.png"
                                alt="End-to-end diagram: geofence to mobile clock-in to live attendance to payroll export"
                                width={2400}
                                height={900}
                                className="h-auto w-full rounded-[1.5rem] md:rounded-[2rem] shadow-xl"
                            />
                        </div>
                    </div>
                </section>

                {/* PRIVACY / ACCURACY CALLOUT */}
                <section className="relative overflow-hidden px-6 py-24 md:py-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                            <div>
                                <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 backdrop-blur-sm">
                                    <ShieldCheck size={14} />
                                    Built for the field, not surveillance
                                </p>
                                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                                    GPS that your crew will actually agree to use.
                                </h2>
                                <p className="mt-5 text-lg font-medium leading-relaxed text-foreground/65">
                                    Crewtrace only captures location at the moment of a clock event — not all day, not in the background. Crews keep their privacy. Supervisors get the proof they need. Everybody wins the argument before it starts.
                                </p>
                                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                                    {[
                                        { label: "Event-only location", icon: MapPin },
                                        { label: "No always-on tracking", icon: XCircle },
                                        { label: "No measurable battery drain", icon: Battery },
                                        { label: "Clear worker-facing policy", icon: ShieldCheck },
                                    ].map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <li
                                                key={item.label}
                                                className="flex items-center gap-3 rounded-2xl border border-foreground/5 bg-white px-4 py-3 text-sm font-semibold text-foreground/80 shadow-sm"
                                            >
                                                <Icon size={16} className="text-primary" />
                                                {item.label}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <Image
                                src="/images/gps/privacy.png"
                                alt="Crewtrace worker-facing privacy and GPS policy screen on the mobile app"
                                width={1200}
                                height={1500}
                                className="mx-auto h-auto w-full max-w-md rounded-[1.5rem] md:rounded-[2rem] shadow-xl"
                            />
                        </div>
                    </div>
                </section>

                <FeatureComparison
                    eyebrow="Paper time sheets vs. Crewtrace"
                    eyebrowIcon={FileCheck2}
                    title="Same hours."
                    subtitle="Very different record."
                    leftColumn={{
                        label: "Week one",
                        sublabel: "Paper time sheets",
                        icon: XCircle,
                    }}
                    rightColumn={{
                        label: "Week two",
                        sublabel: "Running on Crewtrace",
                        icon: Sparkles,
                        badge: "Verified",
                    }}
                    rows={compareRows}
                    firstRowAnnotation="verified"
                    leftSummary={{
                        icon: Clock,
                        highlight: "~4 hrs/week",
                        text: "reconciling disputes and hunting records",
                    }}
                    rightSummary={{
                        icon: ShieldCheck,
                        text: "One record. ",
                        highlight: "GPS proof from clock-in to payroll.",
                    }}
                />

                {/* USE CASES BY INDUSTRY */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Users size={14} />
                                Built for the trades
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                GPS time tracking that fits how your trade actually runs.
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
                                What changes on day one
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl max-w-3xl">
                                Location proof where there used to be none.
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
                    eyebrow="GPS Time Tracking FAQ"
                    title="GPS time clock questions, answered"
                    description={`Answers to common questions about ${solution.primaryKeyword}, accuracy, privacy, and how GPS time tracking connects to payroll.`}
                    items={solution.faqItems}
                />

                <CTASection cluster="features" templateType="feature_detail" landingPath={PATH} />
            </main>
            <Footer />
        </div>
    );
}
