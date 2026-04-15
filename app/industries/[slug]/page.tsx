import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    AlertCircle,
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Clock,
    Droplets,
    HardHat,
    Home,
    Layers,
    MapPin,
    ShieldCheck,
    Trees,
    TrendingUp,
    Wind,
    Target,
    Zap,
    Sparkles,
    type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookedCallLink from "@/components/BookedCallLink";
import SeoLandingTracker from "@/components/SeoLandingTracker";
import CTASection from "@/components/CTASection";
import TestimonialsSection, { TestimonialTextureShell } from "@/components/TestimonialsSection";
import LiteSavingsCalculator from "@/components/LiteSavingsCalculator";
import FAQSection from "@/components/FAQSection";
import {
    getTemplateMessaging,
    orderedPromiseLine,
    publicIcpPhrase,
} from "@/lib/messaging";
import {
    industryBySlug,
    industrySlugs,
    type IndustryIconKey,
    type IndustryRecord,
} from "@/lib/industries";
import { getIndustryDetailLinks } from "@/lib/cluster-link-graph";
import { createPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { getFeaturesBySlugs } from "@/lib/solutions";

const iconByKey: Record<IndustryIconKey, LucideIcon> = {
    home: Home,
    wind: Wind,
    droplets: Droplets,
    "hard-hat": HardHat,
    trees: Trees,
    layers: Layers,
    "map-pin": MapPin,
    "check-circle-2": CheckCircle2,
    "alert-circle": AlertCircle,
    "bar-chart-3": BarChart3,
    clock: Clock,
    "trending-up": TrendingUp,
    "shield-check": ShieldCheck,
};

const supportKeywordByFeatureSlug: Record<string, string> = {
    "gps-time-tracking": "gps time clock",
    "geofencing-time-clock": "geofencing time tracking",
    "payroll-leakage-prevention": "payroll time tracking",
    "payroll-exports": "mobile timesheet app",
    "dol-compliance": "audit-ready time records",
    "overtime-alerts": "overtime tracking",
};

const supportKeywordByIndustrySlug: Record<string, string[]> = {
    roofing: ["mobile time clock", "time clock app with gps"],
    hvac: [
        "digital hvac timesheets",
        "hvac time tracking software",
        "field service time tracking",
        "mobile time clock",
    ],
    plumbing: ["field service time tracking", "payroll time tracking"],
    construction: ["construction time tracking software", "construction timesheet app"],
    "general-contractors": ["contractor time tracking app", "subcontractor time tracking"],
    waterproofing: ["geofencing time tracking", "mobile timesheet app"],
    landscaping: ["landscaping time tracking software", "time clock app with gps"],
    concrete: ["mobile timesheet app", "construction time clock"],
    electrical: [
        "electrician time tracking software",
        "electrical contractor time tracking",
        "payroll time tracking",
        "employee time tracking app",
    ],
};

function joinKeywordList(items: string[]) {
    if (items.length === 0) {
        return "";
    }

    if (items.length === 1) {
        return items[0];
    }

    if (items.length === 2) {
        return `${items[0]} and ${items[1]}`;
    }

    return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function getSupportKeywords(industry: IndustryRecord, relatedFeatureSlugs: string[]) {
    return Array.from(
        new Set([
            ...(supportKeywordByIndustrySlug[industry.slug] ?? []),
            ...relatedFeatureSlugs
                .map((featureSlug) => supportKeywordByFeatureSlug[featureSlug])
                .filter((keyword): keyword is string => Boolean(keyword)),
        ]),
    ).slice(0, 4);
}

const industryMessaging = getTemplateMessaging("industry_detail");

export function generateStaticParams() {
    return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const industry = industryBySlug[slug];

    if (!industry) {
        return createPageMetadata({
            title: "Industry Not Found",
            description: "The requested industry page could not be found.",
            path: "/industries",
            noIndex: true,
        });
    }

    return createPageMetadata({
        title: industry.metaTitle,
        description: industry.metaDescription,
        path: `/industries/${slug}`,
    });
}

export default async function IndustryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const industry = industryBySlug[slug];

    if (!industry) {
        notFound();
    }

    const detailLinks = getIndustryDetailLinks(industry.slug, {
        siblingLimit: 4,
        crossClusterLimit: 5,
    });
    const articleJsonLd = articleSchema({
        headline: industry.metaTitle,
        description: industry.metaDescription,
        path: `/industries/${slug}`,
    });
    const breadcrumbJsonLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Industries", path: "/industries" },
        { name: industry.name, path: `/industries/${slug}` },
    ]);

    const IndustryIcon = iconByKey[industry.icon];
    const relatedSolutions = getFeaturesBySlugs(detailLinks.relatedFeatureSlugs);
    const siblingIndustries: IndustryRecord[] = detailLinks.siblingIndustrySlugs
        .map((siblingSlug) => industryBySlug[siblingSlug])
        .filter((record): record is IndustryRecord => Boolean(record));
    const supportKeywords = getSupportKeywords(industry, detailLinks.relatedFeatureSlugs);
    const supportKeywordLine = joinKeywordList(supportKeywords);
    const evaluationIcons = [MapPin, ShieldCheck, Target];
    const evaluationPoints = industry.evaluationPoints.map((point, index) => ({
        ...point,
        icon: evaluationIcons[index % evaluationIcons.length],
    }));
    const faqDescription = `Answers to common questions about ${industry.primaryKeyword}, ${supportKeywordLine || "gps time clocks"}, and payroll-ready workflows for ${industry.name.toLowerCase()} teams.`;

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
                    templateType="industry_detail"
                    cluster="industries"
                    pageSlug={slug}
                    pageUrl={`/industries/${slug}`}
                />

                {/* Hero Section */}
                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-32 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />

                    <div className="mx-auto max-w-4xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                            <IndustryIcon size={14} />
                            {industry.primaryKeyword}
                        </p>
                        <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-[4.5rem]">
                            {industry.heroTitle}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            {industry.heroSubtitle} Built {publicIcpPhrase}. {orderedPromiseLine}
                        </p>

                        <div className="mt-10 flex flex-col items-center gap-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 cta-highlight px-8 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                                >
                                    {industryMessaging.primaryCta}
                                    <ArrowRight size={18} />
                                </Link>
                                <Link
                                    href={detailLinks.parentPath}
                                    className="inline-flex w-full items-center justify-center sm:w-auto px-6 py-4 text-sm font-semibold text-foreground/70 transition-colors hover:text-primary group"
                                >
                                    Browse all industries
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                            <p className="text-center text-sm text-foreground/55">
                                Prefer to talk live?{" "}
                                <BookedCallLink
                                    templateType="industry_detail"
                                    cluster="industries"
                                    landingPath={`/industries/${slug}`}
                                    className="font-semibold text-primary underline-offset-2 hover:underline"
                                >
                                    Book a 15-minute call
                                </BookedCallLink>
                            </p>
                        </div>
                    </div>

                    <div className="surface-panel relative mx-auto mt-16 max-w-6xl rounded-[2rem] border border-foreground/5 bg-white/50 p-2 shadow-2xl backdrop-blur-md md:mt-20 md:rounded-[2.5rem] md:p-4">
                        <div className="overflow-hidden rounded-[1.5rem] border border-foreground/5 bg-white shadow-inner md:rounded-[2rem]">
                            <Image
                                src="/images/ct-hero-min (1).png"
                                alt={`${industry.name} dashboard mockup`}
                                width={1920}
                                height={1080}
                                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
                                priority
                            />
                        </div>
                    </div>
                </section>

                <TestimonialTextureShell>
                    <TestimonialsSection />
                </TestimonialTextureShell>

                {/* Challenges and Solutions */}
                <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
                    {/* Soft background glow */}
                    <div className="pointer-events-none absolute left-0 top-1/2 -z-10 h-[600px] w-[600px] -translate-y-1/2 -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(47,39,206,0.05)_0%,transparent_70%)] md:h-[800px] md:w-[800px]" />

                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="mb-16 text-center flex flex-col items-center lg:items-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                <AlertCircle size={14} />
                                <span>Common Challenges</span>
                            </div>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl text-center">
                                Why <span className="text-primary italic">{industry.primaryKeyword}</span> breaks down on real jobs
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed text-center">
                                Most teams do not lose money because they lack a timer. They lose it when clock-ins, site changes, breaks, and payroll approvals live in separate systems.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {industry.painPoints.map((point) => (
                                <article
                                    key={point.title}
                                    className="surface-panel group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <h3 className="text-xl font-bold text-foreground mb-4">{point.title}</h3>
                                    <p className="text-base leading-relaxed text-foreground/70 font-medium">
                                        {point.description}
                                    </p>
                                    <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-red-500/[0.03] blur-2xl group-hover:bg-red-500/[0.08] transition-colors duration-500" />
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recommended Stack */}
                <section id="features" className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
                    <div className="pointer-events-none absolute right-0 top-1/2 -z-10 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 bg-[radial-gradient(ellipse_at_center,rgba(47,39,206,0.04)_0%,transparent_60%)] md:h-[800px] md:w-[800px]" />

                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="mb-16 text-center flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 backdrop-blur-sm mb-6">
                                <Sparkles size={14} />
                                <span>Solutions & Benefits</span>
                            </div>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl text-center">
                                {industry.name} time tracking software that payroll and field leads can trust
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed text-center">
                                Use Crewtrace as your {supportKeywordLine || "mobile time clock and payroll time tracking workflow"} so hours, locations, and exceptions stay attached to one defensible record.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {industry.benefits.map((benefit) => {
                                const BenefitIcon = iconByKey[benefit.icon];
                                return (
                                    <article
                                        key={benefit.title}
                                        className="surface-panel group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-10 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/50 transition-colors group-hover:bg-emerald-100">
                                            <BenefitIcon size={26} />
                                        </div>
                                        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-lg leading-relaxed text-foreground/70 font-medium">
                                            {benefit.description}
                                        </p>
                                        <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-emerald-500/[0.03] blur-3xl group-hover:bg-emerald-500/[0.08] transition-colors duration-500" />
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
                    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06)_0%,transparent_65%)]" />

                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="mb-16 text-center flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                <Zap size={14} />
                                <span>What To Look For</span>
                            </div>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl text-center">
                                What buyers expect from {industry.primaryKeyword}
                            </h2>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed text-center">
                                Search demand shows buyers are comparing more than a basic timecard. They want location proof, mobile adoption, and payroll-ready outputs in the same system.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {evaluationPoints.map((point) => {
                                const PointIcon = point.icon;
                                return (
                                    <article
                                        key={point.title}
                                        className="surface-panel group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10 transition-colors group-hover:bg-primary/10">
                                            <PointIcon size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-4">{point.title}</h3>
                                        <p className="text-base leading-relaxed text-foreground/70 font-medium">
                                            {point.description}
                                        </p>
                                        <div className="absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-primary/[0.03] blur-3xl group-hover:bg-primary/[0.07] transition-colors duration-500" />
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Outcomes Section */}
                <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="mb-16 text-center flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                <TrendingUp size={14} />
                                <span>Current Data</span>
                            </div>
                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                What better {industry.primaryKeyword} should change
                            </h2>
                            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60 font-medium">
                                Average operating signals for teams replacing paper logs or disconnected apps with verified payroll time tracking.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {industry.stats.map((stat) => (
                                <article
                                    key={stat.label}
                                    className="surface-panel group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white p-8 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 text-center flex flex-col items-center justify-center"
                                >
                                    <p className="text-4xl font-extrabold text-primary mb-3">{stat.value}</p>
                                    <p className="text-sm font-bold uppercase tracking-widest text-foreground/50">
                                        {stat.label}
                                    </p>
                                    <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-primary/[0.02] blur-2xl group-hover:bg-primary/[0.06] transition-colors duration-500" />
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <LiteSavingsCalculator />

                <FAQSection
                    eyebrow={`${industry.name} FAQ`}
                    title={`${industry.name} Time Tracking FAQ`}
                    description={faqDescription}
                    items={industry.faqItems}
                />

                {/* Ecosystem Links */}
                <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl relative z-10">
                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Features */}
                            <div className="surface-panel rounded-[2.5rem] border border-foreground/5 bg-white shadow-xl p-8 md:p-12">
                                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                                    Related feature paths
                                </h2>
                                <p className="mb-8 text-lg text-foreground/60 font-medium leading-relaxed">
                                    These feature pages deepen the supporting topics buyers search alongside {industry.primaryKeyword}, including {supportKeywordLine || "gps time clocks and payroll time tracking"}.
                                </p>
                                <div className="space-y-4">
                                    {relatedSolutions.map((solution) => (
                                        <Link
                                            key={solution.slug}
                                            href={`/features/${solution.slug}`}
                                            className="group flex items-center justify-between gap-4 rounded-2xl border border-foreground/5 bg-gray-50/50 p-5 transition-all duration-300 hover:bg-white hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5"
                                        >
                                            <div>
                                                <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                                                    {solution.name}
                                                </p>
                                                <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-foreground/60">
                                                    {solution.description}
                                                </p>
                                            </div>
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                                <ArrowRight size={18} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Industries */}
                            <div className="surface-panel rounded-[2.5rem] border border-foreground/5 bg-white shadow-xl p-8 md:p-12">
                                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                                    Related industries
                                </h2>
                                <p className="mb-8 text-lg text-foreground/60 font-medium leading-relaxed">
                                    Explore adjacent trade pages that reinforce topical authority around contractor time tracking, GPS verification, and payroll control.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {siblingIndustries.map((relatedIndustry) => (
                                        <Link
                                            key={relatedIndustry.slug}
                                            href={`/industries/${relatedIndustry.slug}`}
                                            className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-white px-5 py-3 text-sm font-bold text-foreground/70 shadow-sm transition-all hover:border-primary/20 hover:text-primary hover:shadow-md hover:-translate-y-0.5"
                                        >
                                            {relatedIndustry.name}
                                            <ArrowRight size={14} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <CTASection cluster="industries" templateType="industry_detail" landingPath={`/industries/${slug}`} />
            </main>
            <Footer />
        </div>
    );
}
