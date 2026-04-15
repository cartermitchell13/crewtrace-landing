import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Clock,
    FileCheck2,
    Users,
    CheckCircle2,
    ShieldCheck,
    Layers,
    Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "About Crewtrace | GPS Time Tracking Built for Contractors",
    description:
        "Crewtrace was founded to solve a problem every contractor knows: inaccurate crew hours and payroll leakage. Learn the founder story and how we help field teams track time with GPS verification.",
    path: "/about",
});

const productHighlights = [
    {
        icon: MapPin,
        title: "GPS Job Site Verification",
        description:
            "Clock-ins are verified against real job site boundaries. Owners can confirm crews were on location before approving hours — no more guessing.",
    },
    {
        icon: Clock,
        title: "Accurate Crew Hour Tracking",
        description:
            "Every started and ended shift is timestamped and stored. No paper logs, no text messages, no hours submitted at the end of the week from memory.",
    },
    {
        icon: FileCheck2,
        title: "Simple Payroll Reporting",
        description:
            "When the week closes, your report is ready. Export payroll-ready data in the format your workflow expects — without manual reformatting.",
    },
    {
        icon: Users,
        title: "Designed for Field Teams",
        description:
            "The crew app is built for the job site, not the office. Workers clock in and out in seconds. Supervisors get a clear view of attendance without chasing anyone down.",
    },
];

const values = [
    {
        icon: Layers,
        title: "Built for real crews, not office workers",
        description:
            "Every feature is designed around how field teams actually operate — outdoors, on the move, and with limited time for admin.",
    },
    {
        icon: Zap,
        title: "Simple tools over complicated systems",
        description:
            "Field crews don't need enterprise HR software. They need something that works on their phone and takes less than a minute to use.",
    },
    {
        icon: ShieldCheck,
        title: "Accuracy and transparency",
        description:
            "GPS verification removes the need to trust or guess. Owners get facts, not estimates, and crews know the system is consistent for everyone.",
    },
    {
        icon: CheckCircle2,
        title: "Software that respects how field work happens",
        description:
            "We build with the assumption that crews are busy, connectivity is inconsistent, and the simplest solution wins every time.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                {/* ── 1. HERO ─────────────────────────────────────────── */}
                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />

                    <div className="mx-auto max-w-4xl text-center space-y-6">
                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                            About Crewtrace
                        </p>
                        <h1 className="text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                            Why We Built Crewtrace
                        </h1>
                        <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Contractors lose money every week to inaccurate time tracking — paper logs, texted hours,
                            and crew members clocking in from across the street. Crewtrace was built to fix that
                            with a simple, GPS-verified system designed specifically for field crews.
                        </p>
                    </div>
                </section>

                {/* ── 2. FOUNDER STORY ────────────────────────────────── */}
                <section className="bg-background px-6 py-20 md:py-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">

                            {/* Text side */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                                        Founder Story
                                    </p>
                                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                        I kept seeing the same problem, at company after company.
                                    </h2>
                                </div>

                                <div className="space-y-5 text-base leading-relaxed text-foreground/70 font-medium">
                                    <p>
                                        I&apos;ve spent years building software and websites for businesses —
                                        everything from e-commerce sites to internal tools for operations teams.
                                        A lot of that work was with small service businesses and contractors:
                                        roofers, waterproofers, landscapers, general contractors. People running
                                        real crews in the field.
                                    </p>
                                    <p>
                                        At almost every one of those companies, the same thing came up. Tracking
                                        crew hours was a mess. Paper timesheets. Text messages with hours at the end
                                        of the day. Foremen writing down what they remembered. The business owner
                                        had a gut feeling that something was off — too many hours on jobs that
                                        didn&apos;t seem to warrant it — but no clean way to verify what was
                                        actually happening on site.
                                    </p>
                                    <p>
                                        The problem wasn&apos;t that anyone was dishonest. It was that the system
                                        itself was unreliable. Hours tracked from memory are inaccurate by default.
                                        When crews write down their own time at the end of the week, rounding
                                        happens naturally — and it almost never rounds down.
                                    </p>
                                    <p>
                                        The fix seemed obvious to me: if you could verify that a crew member was
                                        actually at the job site when they clocked in, the whole guessing game goes
                                        away. No more trusting handwritten logs. No more disputes. Just a
                                        timestamped record tied to a real GPS location.
                                    </p>
                                    <p>
                                        That realization is what became Crewtrace — a simple, modern time tracking
                                        tool built specifically for field crews, not generic software adapted from
                                        office HR systems.
                                    </p>

                                    <p className="font-semibold text-foreground">
                                        — Carter Mitchell, Founder
                                    </p>
                                </div>
                            </div>

                            {/* Photo / visual side */}
                            <div className="lg:sticky lg:top-32">
                                <div className="relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-[#FBFBFE] p-8 shadow-[0_18px_55px_-28px_rgba(47,39,206,0.2)]">
                                    {/* Founder Photo */}
                                    <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center overflow-hidden rounded-[1.5rem] border border-foreground/10">
                                        <Image
                                            src="/images/headshot.jpg"
                                            alt="Carter Mitchell, Founder of Crewtrace"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 384px"
                                        />
                                    </div>

                                    {/* Pull quote */}
                                    <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/[0.04] p-5">
                                        <p className="text-sm leading-relaxed text-foreground/70 italic">
                                            &ldquo;The business owner had a gut feeling something was off — but no
                                            clean way to verify what was actually happening on site.&rdquo;
                                        </p>
                                    </div>

                                    {/* Stats row */}
                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <div className="rounded-xl border border-foreground/10 bg-white p-4 text-center">
                                            <div className="text-2xl font-bold text-primary">GPS</div>
                                            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                                                Verified Clock-ins
                                            </div>
                                        </div>
                                        <div className="rounded-xl border border-foreground/10 bg-white p-4 text-center">
                                            <div className="text-2xl font-bold text-primary">$0</div>
                                            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                                                Payroll Guesswork
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. MISSION ──────────────────────────────────────── */}
                <section className="bg-background px-6 py-20 md:py-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="rounded-[2rem] border border-foreground/10 bg-white p-10 md:p-14 shadow-[0_18px_55px_-28px_rgba(47,39,206,0.18)]">
                            <div className="mx-auto max-w-3xl text-center space-y-6">
                                <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                    Our Mission
                                </p>
                                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                                    Help field service businesses eliminate payroll leakage and run more efficient crews.
                                </h2>
                                <div className="space-y-4 text-base leading-relaxed text-foreground/65 font-medium text-left md:text-center">
                                    <p>
                                        Payroll leakage is one of the most common — and quietly accepted — sources of
                                        margin loss for contractors. Most owners know it&apos;s happening. Very few
                                        have a reliable way to stop it.
                                    </p>
                                    <p>
                                        Crewtrace exists to change that. By giving field teams a simple way to track
                                        hours and giving owners a verified record to approve against, we close the gap
                                        between what crews report and what actually happened on the job site.
                                    </p>
                                    <p>
                                        We also believe the field service industry is underserved by software. Most
                                        time tracking tools were designed for knowledge workers in offices, then
                                        stretched to cover field use cases. We are building for field crews from the
                                        start.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. HOW THE PRODUCT HELPS ────────────────────────── */}
                <section className="bg-background px-6 py-20 md:py-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold">
                                <CheckCircle2 size={16} />
                                <span>How Crewtrace Helps</span>
                            </div>
                            <h2 className="text-4xl font-bold tracking-tight leading-[1.1] md:text-5xl">
                                Simple tools that{" "}
                                <span className="text-primary italic">actually work</span>{" "}
                                in the field.
                            </h2>
                            <p className="text-lg text-foreground/60 font-medium leading-relaxed">
                                Every feature is designed around real field workflows — not adapted from office software.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {productHighlights.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.title}
                                        className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-[#FBFBFE] p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5"
                                    >
                                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative z-10 space-y-4">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                                <Icon size={26} />
                                            </div>
                                            <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-base text-foreground/60 font-medium leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── 5. VALUES / PHILOSOPHY ──────────────────────────── */}
                <section className="bg-background px-6 py-20 md:py-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
                            <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                Product Philosophy
                            </p>
                            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                The principles behind every decision we make.
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {values.map((value) => {
                                const Icon = value.icon;
                                return (
                                    <article
                                        key={value.title}
                                        className="group relative rounded-2xl border border-foreground/10 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl"
                                    >
                                        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                                            <Icon size={22} />
                                        </div>
                                        <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                                            {value.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                                            {value.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── 6. CLOSING CTA ──────────────────────────────────── */}
                <section className="relative overflow-hidden bg-background px-6 pb-28 pt-20 md:pb-36 md:pt-28">
                    <div className="absolute right-0 top-0 h-[520px] w-[520px] translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/[0.06] blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-[480px] w-[480px] -translate-x-1/3 translate-y-1/3 rounded-full bg-primary/[0.05] blur-3xl" />

                    <div className="mx-auto max-w-6xl">
                        <div className="relative overflow-hidden rounded-[2.4rem] border border-foreground/10 bg-white p-8 shadow-[0_24px_64px_-28px_rgba(47,39,206,0.45)] md:p-12 lg:p-16">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(47,39,206,0.07)_0%,transparent_55%)]" />

                            <div className="relative z-10 grid gap-9 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
                                <div className="space-y-6">
                                    <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                        Get started
                                    </p>
                                    <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
                                        Crewtrace is being built to stop a problem contractors deal with every day.
                                    </h2>
                                    <p className="max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                                        Lost money from inaccurate time tracking is one of the most common — and most
                                        preventable — margin problems in field service. See exactly how much your
                                        business could be recovering.
                                    </p>

                                    <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-5">
                                        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                                            <ShieldCheck size={14} />
                                            15-minute audit call
                                        </p>
                                        <p className="mt-2 text-sm leading-relaxed text-foreground/70 md:text-base">
                                            We review your current time-tracking setup, show where leakage is most
                                            likely hiding, and give you a clear rollout sequence — no hard sell.
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-foreground/10 bg-[#FBFBFE] p-5 md:p-6 space-y-3">
                                    <Link
                                        href="/contact"
                                        className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-sm font-bold text-white shadow-button transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
                                    >
                                        Get a Personalized Demo
                                    </Link>
                                    <Link
                                        href="/calculator"
                                        className="inline-flex w-full items-center justify-center rounded-xl border border-foreground/15 bg-white px-6 py-4 text-sm font-bold text-foreground/70 transition-colors hover:border-primary/30 hover:text-primary"
                                    >
                                        Run the Payroll Leakage Calculator
                                    </Link>
                                    <p className="text-center text-xs font-bold uppercase tracking-widest text-foreground/40">
                                        No sales call required
                                    </p>
                                    <div className="pt-3 border-t border-foreground/5">
                                        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40 text-center">
                                            Explore by trade
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-1.5">
                                            {[
                                                { name: "HVAC", slug: "hvac" },
                                                { name: "Electrical", slug: "electrical" },
                                                { name: "Roofing", slug: "roofing" },
                                                { name: "Construction", slug: "construction" },
                                                { name: "Plumbing", slug: "plumbing" },
                                            ].map((trade) => (
                                                <Link
                                                    key={trade.slug}
                                                    href={`/industries/${trade.slug}`}
                                                    className="rounded-full border border-foreground/10 bg-white px-3 py-1.5 text-xs font-semibold text-foreground/60 transition-colors hover:border-primary/30 hover:text-primary"
                                                >
                                                    {trade.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
