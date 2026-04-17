import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    BookOpen,
    ClipboardList,
    Clock,
    DollarSign,
    FileText,
    ListOrdered,
    Search,
    ShieldCheck,
    TrendingUp,
    Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import { visibleGuides as guides } from "@/lib/guides";
import { createPageMetadata } from "@/lib/seo";
import { guidesHubFaqItems } from "@/lib/faq";

export const metadata: Metadata = createPageMetadata({
    title: "Construction Time Tracking Guides | GPS, Payroll & Compliance",
    description:
        "Step-by-step guides for rolling out GPS time tracking, geofenced clock-ins, payroll exports, and DOL compliance workflows on construction job sites.",
    path: "/guides",
});

const contentPreviewItems = [
    {
        icon: ClipboardList,
        title: "Implementation Checklists",
        description: "Pre-rollout audit checklists, configuration worksheets, and pilot-phase criteria so nothing gets missed.",
        image: "/images/guides/approval-workflow.png",
        imageAlt: "Implementation checklist preview",
    },
    {
        icon: ListOrdered,
        title: "Numbered Step Sequences",
        description: "Each guide follows a strict phase sequence — audit, configure, pilot, rollout — with estimated timelines per phase.",
        image: "/images/guides/crew-onboarding.png",
        imageAlt: "Numbered implementation steps preview",
    },
    {
        icon: TrendingUp,
        title: "Cost & Risk Callouts",
        description: "Inline stat callouts showing real cost data — $4,000+ per worker per year from paper timesheet errors, DOL fine ranges, and admin overhead benchmarks.",
        image: "/images/guides/payroll-dashboard.png",
        imageAlt: "Cost calculation dashboard preview",
    },
];

const personaCards = [
    {
        icon: Users,
        title: "The Operations Manager",
        scenario:
            "You just audited your time tracking process and found three manual handoffs between clock-in and payroll close. Paper logs are illegible half the time, and no one can prove where crews actually were when they said they started.",
        guide: "Construction Time Tracking Implementation Guide",
        guideSlug: "construction-time-tracking-implementation",
        stat: "$4,000+",
        statLabel: "Hidden cost per worker per year",
    },
    {
        icon: Clock,
        title: "The Payroll Admin",
        scenario:
            "Every Thursday you chase down 12 foremen for their timesheets. Half arrive Friday morning with cross-outs, missing job codes, and hours that do not match what supervisors remember. Payroll closes late — again.",
        guide: "Construction Time Tracking Implementation Guide",
        guideSlug: "construction-time-tracking-implementation",
        stat: "5+ hours",
        statLabel: "Weekly admin time on corrections",
    },
    {
        icon: ShieldCheck,
        title: "The Business Owner",
        scenario:
            "A DOL audit letter arrived last week. Your records are a mix of paper time cards, text messages, and a spreadsheet someone updates when they remember. The fine for inadequate records can hit $50,000.",
        guide: "DOL Audit-Ready Time Records",
        guideSlug: "dol-audit-ready-time-records",
        stat: "$50,000",
        statLabel: "Potential fine for non-compliance",
    },
];

export default function GuidesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-32 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />

                    <div className="mx-auto max-w-4xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                            <BookOpen size={14} />
                            Guides
                        </p>
                        <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                            Practical playbooks for cleaner labor operations
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Step-by-step guides for rolling out GPS time tracking without chaos — and keeping payroll and compliance workflows predictable.
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                            >
                                Get rollout advice
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
                        {guides.map((guide) => (
                            <article
                                key={guide.slug}
                                className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/80">
                                    <span>{guide.category}</span>
                                    <span aria-hidden>·</span>
                                    <span>{guide.readTime}</span>
                                </div>
                                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                                    {guide.title}
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-foreground/60 font-medium">
                                    {guide.summary}
                                </p>
                                <div className="mt-6 rounded-xl border border-foreground/5 bg-slate-50/50 p-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-2">What you will learn</p>
                                    <ul className="space-y-1.5">
                                        {guide.sections.slice(0, 4).map((section) => (
                                            <li key={section.heading} className="flex items-center gap-2 text-xs font-semibold text-foreground/60">
                                                <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                                                {section.heading}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Link
                                    href={`/guides/${guide.slug}`}
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                                >
                                    Read guide
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
                                <FileText size={14} />
                                Inside Each Guide
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Not blog posts. Working playbooks.
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                Every guide is structured as a repeatable implementation sequence — with checklists, cost data, and decision criteria built in.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {contentPreviewItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.title}
                                        className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.imageAlt}
                                                width={720}
                                                height={400}
                                                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                            />
                                        </div>
                                        <div className="p-8">
                                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <Icon size={22} />
                                            </div>
                                            <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
                                                {item.title}
                                            </h3>
                                            <p className="text-base leading-relaxed text-foreground/65 font-medium">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/15 bg-amber-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-600 backdrop-blur-sm mb-6">
                                <Search size={14} />
                                Who Reads These
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                Three scenarios. Three starting points.
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                If any of these sound familiar, the linked guide was written for your exact situation.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {personaCards.map((persona) => {
                                const Icon = persona.icon;
                                return (
                                    <div
                                        key={persona.title}
                                        className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col"
                                    >
                                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-200/50 transition-colors group-hover:bg-amber-100">
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold tracking-tight text-foreground mb-4">
                                            {persona.title}
                                        </h3>
                                        <p className="text-base leading-relaxed text-foreground/65 font-medium flex-1">
                                            {persona.scenario}
                                        </p>

                                        <div className="mt-6 rounded-xl border border-foreground/5 bg-slate-50/50 p-4 text-center">
                                            <p className="text-3xl font-extrabold text-primary">{persona.stat}</p>
                                            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-foreground/45">
                                                {persona.statLabel}
                                            </p>
                                        </div>

                                        <Link
                                            href={`/guides/${persona.guideSlug}`}
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                                        >
                                            Read: {persona.guide}
                                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                        </Link>
                                        <div className="absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-amber-500/[0.03] blur-3xl group-hover:bg-amber-500/[0.07] transition-colors duration-500" />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-10 flex justify-center gap-3">
                            <Image
                                src="/images/hub/persona-ops-manager.svg"
                                alt="Operations manager portrait"
                                width={80}
                                height={80}
                                className="rounded-full border-2 border-foreground/5 opacity-60"
                            />
                            <Image
                                src="/images/hub/persona-payroll-admin.svg"
                                alt="Payroll admin portrait"
                                width={80}
                                height={80}
                                className="rounded-full border-2 border-foreground/5 opacity-60"
                            />
                            <Image
                                src="/images/hub/persona-owner.svg"
                                alt="Business owner portrait"
                                width={80}
                                height={80}
                                className="rounded-full border-2 border-foreground/5 opacity-60"
                            />
                        </div>
                    </div>
                </section>

                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 backdrop-blur-sm mb-6">
                                <DollarSign size={14} />
                                What It Costs
                            </p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                These guides are free. Reading them is not optional.
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                Every guide on this page is free to read in full. No email gate, no paywall. The cost of not reading them is much higher.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {[
                                { stat: "$4,000+", label: "Hidden cost per worker per year from paper timesheet errors", icon: FileText },
                                { stat: "$50,000", label: "Potential DOL fine for inadequate time records", icon: ShieldCheck },
                                { stat: "5+ hrs", label: "Weekly admin time spent chasing and correcting manual timesheets", icon: Clock },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.stat}
                                        className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 text-center"
                                    >
                                        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 ring-1 ring-red-200/50">
                                            <Icon size={24} />
                                        </div>
                                        <p className="text-4xl font-extrabold text-foreground mb-2">{item.stat}</p>
                                        <p className="text-sm font-medium leading-relaxed text-foreground/55">{item.label}</p>
                                        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-red-500/[0.02] blur-2xl group-hover:bg-red-500/[0.06] transition-colors duration-500" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <FAQSection
                    eyebrow="Guide FAQ"
                    title="Frequently asked questions about our guides"
                    description="Access, updates, and reading order — answered directly."
                    items={guidesHubFaqItems}
                />

                <CTASection templateType="guides_hub" landingPath="/guides" />
            </main>
            <Footer />
        </div>
    );
}
