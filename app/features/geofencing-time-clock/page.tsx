import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    MapPin,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Clock,
    Sparkles,
    Radar,
    Target,
    Hexagon,
    Ruler,
    Layers,
    Users,
    Wrench,
    TreePine,
    Zap,
    Hammer,
    Ban,
    Eye,
    Lock,
    Fingerprint,
    Settings2,
    Compass,
    Globe2,
    FileCheck2,
    Signal,
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

const SLUG = "geofencing-time-clock";
const PATH = `/features/${SLUG}`;
const solution = featureBySlug[SLUG]!;

export const metadata: Metadata = createPageMetadata({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: PATH,
});

const IMG = {
    hero: "/images/geofencing/geofencing-hero.png",
    anatomy: "/images/geofencing/geofence-anatomy.png",
    stateInside: "/images/geofencing/state-inside.png",
    stateEdge: "/images/geofencing/state-edge.png",
    stateOutside: "/images/geofencing/state-outside.png",
    draw: "/images/geofencing/draw-boundary.png",
    enforce: "/images/geofencing/enforce-rules.png",
    review: "/images/geofencing/review-exceptions.png",
    ruleBuffer: "/images/geofencing/rule-buffer.png",
    ruleSchedule: "/images/geofencing/rule-schedule.png",
    multisite: "/images/geofencing/multisite-dashboard.png",
};

const painPoints = [
    {
        title: "Off-site punches nobody catches",
        description:
            "A worker clocks in from home, from the gas station, or from the truck on the way. The hours look fine on the sheet — because the sheet has no way to know they were wrong.",
        icon: Ban,
        tone: "rose" as const,
    },
    {
        title: "Policy without enforcement",
        description:
            "\"Clock in at the site\" is in the handbook. But handbooks don't block a punch. Without a boundary rule, the policy only exists on the day someone decides to argue.",
        icon: Lock,
        tone: "amber" as const,
    },
    {
        title: "One rule for every job",
        description:
            "Your 40-acre commercial site and your 1/10-acre residential service call need very different boundaries. A single GPS radius either lets cheats through or blocks honest workers in the parking lot.",
        icon: Ruler,
        tone: "slate" as const,
    },
];

const clockStates = [
    {
        label: "Inside the fence",
        status: "Verified",
        statusIcon: CheckCircle2,
        description:
            "Worker taps clock in inside the boundary. Event is accepted, stamped with GPS coordinates, and flows straight into payroll.",
        accent: "emerald" as const,
        image: IMG.stateInside,
        alt: "Mobile clock-in accepted with a green verified status inside the geofence boundary",
    },
    {
        label: "Outside the fence",
        status: "Blocked",
        statusIcon: XCircle,
        description:
            "GPS puts the worker outside the approved zone. The punch is blocked or logged as an exception per your policy. No silent pass-through. No mystery hours.",
        accent: "rose" as const,
        image: IMG.stateOutside,
        alt: "Mobile clock-in blocked with a red outside-boundary status",
    },
    {
        label: "Offline at the site",
        status: "Saved on device",
        statusIcon: Signal,
        description:
            "No cell service at the job site? The punch saves to the device with its timestamp and location, then syncs the moment the phone gets signal again. Crews aren't stuck. Records aren't lost.",
        accent: "slate" as const,
        image: IMG.stateEdge,
        alt: "Mobile clock-in saved on device while offline, queued to sync when service returns",
    },
];

const anatomyCallouts = [
    {
        number: "01",
        title: "The boundary",
        description: "Enter an address to instantly create a boundary, then pull the radius to customize the zone to match the exact job site.",
        icon: Hexagon,
    },
    {
        number: "02",
        title: "The site assignment",
        description: "Each crew is tied to a specific job for the day. The check runs against that site's boundary — not whatever fence happens to be closest.",
        icon: Target,
    },
    {
        number: "03",
        title: "The clock-in pin",
        description: "GPS coordinate at the exact moment the worker tapped. Stored with the event, not guessed later.",
        icon: MapPin,
    },
];

const spotlights = [
    {
        eyebrow: "Set the boundary",
        title: "A fence per job, set up in under a minute.",
        description:
            "Enter an address to instantly generate a boundary, then pull the radius to customize the zone to match the exact job site.",
        bullets: [
            "Address-based geofences with customizable radius",
            "Pull to adjust the zone to fit any site shape",
        ],
        image: IMG.draw,
        alt: "Crewtrace admin setting up a geofence boundary on a satellite map of a job site",
        icon: Compass,
        reverse: false,
    },
    {
        eyebrow: "Enforce at clock-in",
        title: "The rule fires before payroll ever sees the punch.",
        description:
            "The moment a worker taps clock in, Crewtrace checks their GPS against the assigned site's boundary and schedule window. Pass, flag, or block — based on your policy, not on somebody's memory three days later.",
        bullets: [
            "Block, warn, or log-only modes per site",
            "Crew-to-site assignment checked at every punch",
            "Time-window rules for shift windows and overtime",
        ],
        image: IMG.enforce,
        alt: "Worker phone showing a geofenced clock-in with live boundary check and policy outcome",
        icon: ShieldCheck,
        reverse: true,
    },
    {
        eyebrow: "Review exceptions",
        title: "A queue of edge cases, not a week of finger-pointing.",
        description:
            "Supervisors see every flagged event in one place — off-site punches, missing-GPS punches, after-hours starts — each with a map, a timestamp, and an edit trail. Approve, reject, or correct from the same screen, and the record stays intact.",
        bullets: [
            "Central exception queue by site or crew",
            "One-click approve, reject, or annotate",
            "Every decision preserved in the audit trail",
        ],
        image: IMG.review,
        alt: "Exception review queue showing off-site clock-in events with map previews",
        icon: Eye,
        reverse: false,
    },
];

const ruleTypes = [
    {
        name: "Address-based geofence",
        description: "Enter an address to instantly generate a boundary, then pull the radius to customize the zone to match the exact job site. Perfect for residential service routes and commercial properties.",
        icon: MapPin,
        image: IMG.ruleBuffer,
        alt: "Address-based geofence with customizable zone boundary",
    },
    {
        name: "Schedule windows",
        description: "Tie each geofence to its shift window. Before 6am? After 9pm? Flagged automatically.",
        icon: Clock,
        image: IMG.ruleSchedule,
        alt: "Geofence rule editor with a schedule window and overtime guardrails",
    },
];

const enforcementModes = [
    {
        label: "Hard block",
        description: "Outside the fence? The clock-in never happens. Best for tight residential service routes.",
        icon: Ban,
        tone: "rose" as const,
    },
    {
        label: "Warn + record",
        description: "Event goes through with a visible warning to the worker and an exception on the supervisor queue.",
        icon: AlertTriangle,
        tone: "amber" as const,
    },
    {
        label: "Log only",
        description: "Don't block anything. Just record location on every punch so you have proof if a dispute shows up later.",
        icon: FileCheck2,
        tone: "slate" as const,
    },
];

const useCases = [
    {
        industry: "Landscaping",
        slug: "landscaping",
        scenario: "Multi-property route days with seasonal crews",
        outcome: "Per-property geofences stop the 6:45 clock-in from the gas station before coffee.",
        icon: TreePine,
    },
    {
        industry: "Concrete",
        slug: "concrete",
        scenario: "Pour days where the crew is at the site well before dispatch arrives",
        outcome: "Boundary-based punches prove on-site arrival without supervisor phone calls.",
        icon: Hammer,
    },
    {
        industry: "Roofing",
        slug: "roofing",
        scenario: "Sunrise starts across rotating residential addresses",
        outcome: "Address-based geofences tied to the day's ticket, no manual site setup.",
        icon: Hammer,
    },
    {
        industry: "Waterproofing",
        slug: "waterproofing",
        scenario: "Phased jobs where billable hours live or die on the site record",
        outcome: "One verified time record per worker, per address, defensible on invoice.",
        icon: ShieldCheck,
    },
    {
        industry: "Plumbing",
        slug: "plumbing",
        scenario: "Service techs hitting 6–10 stops a day",
        outcome: "Each ticket gets its own geofence — clocked hours match dispatched stops.",
        icon: Wrench,
    },
    {
        industry: "HVAC",
        slug: "hvac",
        scenario: "Mid-day reassignments across a live service board",
        outcome: "Geofences follow the assignment, so an edited ticket edits the clock-in rule too.",
        icon: Zap,
    },
];

const compareRows = [
    {
        capability: "Where clock-ins happen",
        icon: MapPin,
        left: "Wherever the worker's standing when they tap",
        right: "Only inside the approved site boundary",
    },
    {
        capability: "Off-site punches",
        icon: Ban,
        left: "Recorded and paid like any other hour",
        right: "Blocked, warned, or flagged per your policy",
    },
    {
        capability: "Edge cases",
        icon: AlertTriangle,
        left: "Noticed only if someone complains",
        right: "Queued for supervisor review automatically",
    },
    {
        capability: "Per-site rules",
        icon: Settings2,
        left: "One handbook rule for 40 different jobs",
        right: "Custom boundary, shape, and window per site",
    },
    {
        capability: "Audit trail",
        icon: Fingerprint,
        left: "GPS? Maybe. Policy decision? Verbal.",
        right: "Rule, event, and decision stored together",
    },
];

const stats = [
    { value: "4", label: "Enforcement modes from log-only to hard-block" },
    { value: "100%", label: "Clock events checked against the assigned site's geofence" },
    { value: "10–30 ft", label: "Typical boundary accuracy on active job sites" },
    { value: "1", label: "Central queue for every exception across every site" },
];

type Accent = "emerald" | "amber" | "rose" | "slate";

const accentMap: Record<
    Accent,
    { badge: string; ring: string; dot: string; border: string; glow: string; text: string; pill: string }
> = {
    emerald: {
        badge: "bg-emerald-50 text-emerald-700 ring-emerald-200/70",
        ring: "ring-emerald-200/70",
        dot: "bg-emerald-500",
        border: "border-emerald-200/70",
        glow: "from-emerald-100/60 via-white to-white",
        text: "text-emerald-600",
        pill: "bg-emerald-500 text-white",
    },
    amber: {
        badge: "bg-amber-50 text-amber-700 ring-amber-200/70",
        ring: "ring-amber-200/70",
        dot: "bg-amber-500",
        border: "border-amber-200/70",
        glow: "from-amber-100/60 via-white to-white",
        text: "text-amber-600",
        pill: "bg-amber-500 text-white",
    },
    rose: {
        badge: "bg-rose-50 text-rose-700 ring-rose-200/70",
        ring: "ring-rose-200/70",
        dot: "bg-rose-500",
        border: "border-rose-200/70",
        glow: "from-rose-100/60 via-white to-white",
        text: "text-rose-600",
        pill: "bg-rose-500 text-white",
    },
    slate: {
        badge: "bg-slate-100 text-slate-700 ring-slate-200/70",
        ring: "ring-slate-200/70",
        dot: "bg-slate-500",
        border: "border-slate-200/70",
        glow: "from-slate-100/60 via-white to-white",
        text: "text-slate-600",
        pill: "bg-slate-600 text-white",
    },
};

export default function GeofencingTimeClockFeaturePage() {
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

                    {/* Faint grid in hero background */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                "linear-gradient(115deg, rgba(15,23,42,0.8) 1px, transparent 1px), linear-gradient(65deg, rgba(15,23,42,0.8) 1px, transparent 1px)",
                            backgroundSize: "56px 56px",
                        }}
                    />

                    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                        <div className="mb-4 sm:mb-6 inline-flex max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.025] py-[3px] pl-[3px] pr-2.5 text-[11px] font-medium text-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:gap-2 sm:py-1 sm:pl-1 sm:pr-4 sm:text-xs">
                            <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-primary sm:px-2 sm:text-[10px]">
                                Feature
                            </span>
                            <span className="hidden text-foreground/25 sm:inline" aria-hidden="true">·</span>
                            <span className="whitespace-nowrap">Geofencing Time Clock for Contractors</span>
                        </div>
                        <h1 className="mt-7 text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                            An invisible fence
                            <br />
                            <span className="text-primary italic">around every job site.</span>
                        </h1>
                        <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Set a boundary around each project. Crewtrace checks every clock-in against it automatically — so policy stops living in the handbook and starts living on the phone.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href="/contact"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 cta-highlight px-7 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                            >
                                See it on your sites
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
                            src={IMG.hero}
                            alt="Crewtrace geofencing dashboard showing multiple job sites with active boundaries and live clock-in pins"
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
                                Why GPS alone isn&apos;t enough
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                The rule you never had.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                                GPS tells you <em>where</em> a punch happened. Geofencing tells the punch <em>whether it&apos;s allowed in the first place</em>. Most contractor payroll leaks come from the gap between those two.
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

                {/* ANATOMY OF A GEOFENCE — unique annotated diagram */}
                <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Target size={14} />
                                Anatomy of a geofence
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Three layers between a tap and a payroll hour.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                                Every Crewtrace geofence is more than a line on a map. It&apos;s a layered rule the clock-in has to pass before it ever reaches your approvals queue.
                            </p>
                        </div>

                        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:items-center">
                            {/* Annotated diagram */}
                            <div className="relative">
                                <div className="relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white shadow-xl">
                                    <Image
                                        src={IMG.anatomy}
                                        alt="Anatomy of a Crewtrace geofence: boundary, site assignment, and clock-in pin annotated on a satellite view"
                                        width={1400}
                                        height={1400}
                                        className="h-auto w-full"
                                    />
                                </div>
                            </div>

                            {/* Callouts */}
                            <ol className="space-y-4">
                                {anatomyCallouts.map((c) => {
                                    const Icon = c.icon;
                                    return (
                                        <li
                                            key={c.number}
                                            className="group relative flex gap-5 rounded-2xl border border-foreground/5 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                                        >
                                            <div className="flex flex-col items-center">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-[11px] font-extrabold tracking-widest text-primary ring-1 ring-primary/20">
                                                    {c.number}
                                                </span>
                                                <span className="mt-2 h-full w-px flex-1 bg-gradient-to-b from-primary/20 to-transparent group-last:hidden" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <Icon size={16} className="text-primary" />
                                                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                                                        {c.title}
                                                    </h3>
                                                </div>
                                                <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/65">
                                                    {c.description}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    </div>
                </section>

                {/* THREE STATES OF A CLOCK-IN — unique */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(47,39,206,0.06)_0%,transparent_60%)]" />
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Radar size={14} />
                                What happens at the tap
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Three possible outcomes. Zero mystery hours.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                                Every punch goes through the same decision. The worker knows instantly, the supervisor knows automatically, and the payroll record knows before Thursday.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {clockStates.map((state, i) => {
                                const StatusIcon = state.statusIcon;
                                const a = accentMap[state.accent];
                                return (
                                    <article
                                        key={state.label}
                                        className={`surface-panel group relative overflow-hidden rounded-[2rem] border bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${a.border}`}
                                    >
                                        {/* top colored rail */}
                                        <div className={`absolute inset-x-0 top-0 h-1.5 ${a.dot}`} />
                                        <div className={`relative overflow-hidden bg-gradient-to-b ${a.glow} p-6 pt-8`}>
                                            <div className="flex items-center justify-between">
                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/50">
                                                    <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                                                    State 0{i + 1}
                                                </span>
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${a.pill}`}>
                                                    <StatusIcon size={12} />
                                                    {state.status}
                                                </span>
                                            </div>
                                            <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-foreground">
                                                {state.label}
                                            </h3>
                                            <div className="mt-6 overflow-hidden rounded-2xl border border-foreground/5 bg-white">
                                                <Image
                                                    src={state.image}
                                                    alt={state.alt}
                                                    width={900}
                                                    height={1100}
                                                    className="h-auto w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-sm font-medium leading-relaxed text-foreground/65">
                                                {state.description}
                                            </p>
                                        </div>
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
                                Inside Crewtrace Geofencing
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Set it. Enforce it. Review it.
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
                                            src={s.image}
                                            alt={s.alt}
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

                {/* RULE BUILDER — unique section */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(15,23,42,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.6) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Settings2 size={14} />
                                The rule builder
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Different sites need different fences.
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                                A residential service stop and a 40-acre commercial pour can&apos;t share one geofence shape. Crewtrace gives you the rule primitives to set a boundary every site actually deserves.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {ruleTypes.map((rule, idx) => {
                                const Icon = rule.icon;
                                return (
                                    <article
                                        key={rule.name}
                                        className="surface-panel group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="grid gap-0 md:grid-cols-[1fr_1.2fr]">
                                            <div className="relative overflow-hidden bg-gradient-to-br from-primary/[0.06] via-white to-emerald-50/30">
                                                <Image
                                                    src={rule.image}
                                                    alt={rule.alt}
                                                    width={900}
                                                    height={900}
                                                    className="h-full w-full object-cover"
                                                />
                                                <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur">
                                                    Rule 0{idx + 1}
                                                </span>
                                            </div>
                                            <div className="p-7">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                                                    <Icon size={20} />
                                                </div>
                                                <h3 className="mt-5 text-xl font-extrabold tracking-tight text-foreground">
                                                    {rule.name}
                                                </h3>
                                                <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/65">
                                                    {rule.description}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {/* Enforcement modes strip */}
                        <div className="mt-14 rounded-[2rem] border border-foreground/5 bg-white p-7 shadow-md md:p-10">
                            <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/80">Per-site enforcement</p>
                                    <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground">
                                        Tune how strict each fence is.
                                    </h3>
                                </div>
                                <p className="max-w-md text-sm font-medium leading-relaxed text-foreground/60">
                                    Start soft on a new site, tighten as crews learn the rule. Every site carries its own enforcement mode.
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-3">
                                {enforcementModes.map((mode) => {
                                    const Icon = mode.icon;
                                    const a = accentMap[mode.tone];
                                    return (
                                        <div
                                            key={mode.label}
                                            className={`group relative overflow-hidden rounded-2xl border bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md ${a.border}`}
                                        >
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${a.badge}`}>
                                                <Icon size={18} />
                                            </div>
                                            <p className={`mt-4 text-sm font-bold uppercase tracking-[0.14em] ${a.text}`}>
                                                {mode.label}
                                            </p>
                                            <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/65">
                                                {mode.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* MULTI-SITE COMMAND — unique section */}
                <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/60 to-white px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                            <div>
                                <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                    <Globe2 size={14} />
                                    Multi-site command
                                </p>
                                <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                    Every fence, every crew, one screen.
                                </h2>
                                <p className="mt-5 text-lg font-medium leading-relaxed text-foreground/65">
                                    Geofencing stops working when it scales to 40 open jobs. Crewtrace is built for the multi-site week — a live map of every active boundary, color-coded by status, with exceptions surfaced to the top.
                                </p>
                                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                                    {[
                                        { label: "Live status per site", icon: Radar },
                                        { label: "Exceptions surfaced first", icon: AlertTriangle },
                                        { label: "Bulk-apply templates", icon: Layers },
                                        { label: "Role-based views", icon: Users },
                                    ].map((i) => {
                                        const Icon = i.icon;
                                        return (
                                            <li
                                                key={i.label}
                                                className="flex items-center gap-3 rounded-2xl border border-foreground/5 bg-white px-4 py-3 text-sm font-semibold text-foreground/80 shadow-sm"
                                            >
                                                <Icon size={16} className="text-primary" />
                                                {i.label}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="relative">
                                <div className="relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white shadow-xl">
                                    <Image
                                        src={IMG.multisite}
                                        alt="Multi-site geofencing dashboard with live status badges across 12 active job sites"
                                        width={1600}
                                        height={1200}
                                        className="h-auto w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <FeatureComparison
                    eyebrow="Open clock-in vs. Geofenced"
                    eyebrowIcon={Ban}
                    title="Same workers."
                    subtitle="Very different clock-in rules."
                    leftColumn={{
                        label: "Week one",
                        sublabel: "Open GPS clock-in",
                        icon: XCircle,
                    }}
                    rightColumn={{
                        label: "Week two",
                        sublabel: "Geofenced on Crewtrace",
                        icon: ShieldCheck,
                        badge: "Enforced",
                    }}
                    rows={compareRows}
                    firstRowAnnotation="boundary-checked"
                    leftSummary={{
                        icon: Clock,
                        highlight: "Dozens",
                        text: "of off-site punches you never see",
                    }}
                    rightSummary={{
                        icon: ShieldCheck,
                        text: "Every punch ",
                        highlight: "checked against the rule, not the handbook.",
                    }}
                />

                {/* USE CASES */}
                <section className="relative overflow-hidden px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center mb-16">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                                <Users size={14} />
                                Built for the trades
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                                Geofencing that fits how your trade actually works a day.
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
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.12]"
                        style={{
                            backgroundImage:
                                "linear-gradient(115deg, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(65deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                            backgroundSize: "56px 56px",
                        }}
                    />
                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="flex flex-col items-center text-center mb-14">
                            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                                <Sparkles size={14} />
                                What changes on day one
                            </p>
                            <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl max-w-3xl">
                                A clock-in rule that doesn&apos;t need a reminder email.
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
                    eyebrow="Geofencing Time Clock FAQ"
                    title="Geofencing questions, answered"
                    description={`Answers to common questions about ${solution.primaryKeyword}, boundary accuracy, enforcement modes, and how geofencing connects to payroll.`}
                    items={solution.faqItems}
                />

                <CTASection cluster="features" templateType="feature_detail" landingPath={PATH} />
            </main>
            <Footer />
        </div>
    );
}
