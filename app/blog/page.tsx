import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    BarChart3,
    BookOpen,
    FileText,
    MapPin,
    ShieldCheck,
    Star,
    TrendingUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { getAllBlogPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
    title: "Construction Payroll & Time Tracking Blog",
    description:
        "Actionable content for contractors on payroll leakage prevention, GPS time tracking, compliance readiness, and field operations.",
    path: "/blog",
});

const topicCards = [
    {
        icon: ShieldCheck,
        title: "Compliance & Audit Readiness",
        description: "DOL audit preparation, FLSA recordkeeping requirements, prevailing wage rules, and what inspectors actually look for.",
        image: "/images/hub/topic-compliance.svg",
        imageAlt: "Compliance topic illustration",
    },
    {
        icon: MapPin,
        title: "Field Technology",
        description: "GPS verification, geofencing, mobile clock-in adoption, and how to roll out digital time tracking without disrupting active crews.",
        image: "/images/hub/topic-field-tech.svg",
        imageAlt: "Field technology topic illustration",
    },
    {
        icon: BarChart3,
        title: "Payroll Operations",
        description: "Export formats, overtime calculation, admin time reduction, and how to close payroll faster with fewer corrections.",
        image: "/images/hub/topic-payroll-ops.svg",
        imageAlt: "Payroll operations topic illustration",
    },
];

export default async function BlogPage() {
    const posts = await getAllBlogPosts();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-32 md:pt-40">
                    <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />

                    <div className="mx-auto max-w-4xl text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                            <BookOpen size={14} />
                            Blog
                        </p>
                        <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                            The Crewtrace Blog
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Actionable insights on payroll leakage, GPS time tracking, compliance readiness, and running field operations that actually make money.
                        </p>
                        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                            >
                                Get a personalized demo
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="/guides"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-foreground/70 transition-colors hover:text-primary"
                            >
                                Read the implementation guides
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>

                {posts.length > 0 ? (
                    <>
                        <section className="px-6 pb-24 md:pb-32">
                            <div className="mx-auto max-w-6xl">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {posts.map((post) => (
                                        <Link
                                            key={post.slug}
                                            href={`/blog/${post.slug}`}
                                            className="group overflow-hidden rounded-[2rem] border border-foreground/5 bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                        >
                                            <div className="relative aspect-video overflow-hidden">
                                                {post.coverImage ? (
                                                    <Image
                                                        src={post.coverImage}
                                                        alt={post.coverImageAlt || post.title}
                                                        width={720}
                                                        height={400}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                                                        <span className="text-4xl">{post.icon || "📝"}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-7">
                                                <div className="flex items-center gap-2 text-xs text-foreground/50 mb-3">
                                                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                                                        {post.category}
                                                    </span>
                                                    <span>·</span>
                                                    <span className="font-medium">{post.readTime}</span>
                                                </div>
                                                <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                                    {post.title}
                                                </h2>
                                                <p className="text-sm text-foreground/60 line-clamp-2 leading-relaxed font-medium">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="px-6 py-24 md:py-32">
                            <div className="mx-auto max-w-6xl">
                                <div className="mb-16 text-center">
                                    <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm mb-6">
                                        <FileText size={14} />
                                        Topics We Cover
                                    </p>
                                    <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                        Three areas where contractors lose the most
                                    </h2>
                                    <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/60 font-medium leading-relaxed">
                                        Every article addresses one of these three operational pressure points — because that is where the money leaks.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    {topicCards.map((topic) => {
                                        const Icon = topic.icon;
                                        return (
                                            <div
                                                key={topic.title}
                                                className="group relative overflow-hidden rounded-[2rem] border border-foreground/5 bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                            >
                                                <div className="overflow-hidden">
                                                    <Image
                                                        src={topic.image}
                                                        alt={topic.imageAlt}
                                                        width={480}
                                                        height={320}
                                                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                                    />
                                                </div>
                                                <div className="p-8">
                                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                        <Icon size={22} />
                                                    </div>
                                                    <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
                                                        {topic.title}
                                                    </h3>
                                                    <p className="text-base leading-relaxed text-foreground/65 font-medium">
                                                        {topic.description}
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
                                    <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 backdrop-blur-sm mb-6">
                                        <Star size={14} />
                                        From The Resource Library
                                    </p>
                                    <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                        Go deeper with guides and case studies
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <div className="group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                        <div className="mb-4">
                                            <Image
                                                src="/images/guides/geofence-jobsite.png"
                                                alt="Geofence jobsite implementation guide preview"
                                                width={720}
                                                height={400}
                                                className="h-48 w-full rounded-2xl object-cover"
                                            />
                                        </div>
                                        <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
                                            <BookOpen size={12} />
                                            Implementation Guide
                                        </p>
                                        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                                            Complete Construction Time Tracking Implementation Guide
                                        </h3>
                                        <p className="text-base text-foreground/60 font-medium leading-relaxed">
                                            22-minute step-by-step playbook covering audits, geofencing, crew adoption, payroll integration, and compliance — without disrupting your active projects.
                                        </p>
                                        <Link
                                            href="/guides/construction-time-tracking-implementation"
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                                        >
                                            Read the guide
                                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>

                                    <div className="group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white p-8 md:p-10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                        <div className="mb-4">
                                            <Image
                                                src="/images/case-studies/sw-waterproofing-hero.svg"
                                                alt="S&W Waterproofing case study hero"
                                                width={720}
                                                height={400}
                                                className="h-48 w-full rounded-2xl object-cover"
                                            />
                                        </div>
                                        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-4">
                                            <TrendingUp size={12} />
                                            Case Study
                                        </p>
                                        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                                            S&amp;W Waterproofing: $2,100/mo recovered
                                        </h3>
                                        <p className="text-base text-foreground/60 font-medium leading-relaxed">
                                            Moved from paper logs to Crewtrace. Found recurring overpayment in the first pay period. Payroll review went from hours to minutes. ROI in two weeks.
                                        </p>
                                        <Link
                                            href="/case-studies/sw-waterproofing-payroll-recovery"
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
                                        >
                                            Read the case study
                                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <section className="px-6 pb-24 md:pb-32">
                        <div className="mx-auto max-w-6xl text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">📝</span>
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Coming Soon</h2>
                            <p className="text-foreground/60 mb-8 max-w-md mx-auto">
                                We are working on some great content for you. Check back soon for
                                industry insights and best practices.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </section>
                )}

                <CTASection templateType="blog_hub" landingPath="/blog" />
            </main>
            <Footer />
        </div>
    );
}
