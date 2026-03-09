"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SavingsCalculator from "@/components/SavingsCalculator";
import BookedCallLink from "@/components/BookedCallLink";
import Link from "next/link";
import {
    DollarSign,
    TrendingDown,
    Shield,
    Clock,
    Users,
    AlertTriangle,
    CheckCircle2,
    ArrowRight,
    Calculator,
} from "lucide-react";

const COST_BREAKDOWN = [
    {
        icon: DollarSign,
        title: "Payroll Taxes",
        percentage: "7.65–15%",
        description:
            "FICA (Social Security + Medicare), federal unemployment (FUTA), and state unemployment (SUTA) taxes that the employer pays on top of every dollar of wages.",
    },
    {
        icon: Shield,
        title: "Workers' Compensation",
        percentage: "3–15%",
        description:
            "Construction carries some of the highest workers' comp rates. Rates vary by trade — roofers pay significantly more than office workers on the same policy.",
    },
    {
        icon: Users,
        title: "Benefits & Insurance",
        percentage: "10–30%",
        description:
            "Health insurance, retirement contributions, paid time off, and other benefits. Even if you don't offer full benefits, state mandates may require minimum coverage.",
    },
    {
        icon: Clock,
        title: "Time Theft & Payroll Leakage",
        percentage: "2–5%",
        description:
            "Buddy punching, inflated hours, extended breaks, and rounding errors. The American Payroll Association estimates this costs employers $400 billion per year nationwide.",
    },
    {
        icon: TrendingDown,
        title: "Overtime Premium",
        percentage: "Variable",
        description:
            "Every hour over 40 costs 1.5× the regular rate. Unmanaged overtime is one of the fastest ways to blow a project budget without realizing it.",
    },
    {
        icon: AlertTriangle,
        title: "Administrative Overhead",
        percentage: "2–5%",
        description:
            "The cost of processing payroll, managing timesheets, correcting errors, handling compliance, and resolving disputes. Time your office spends on payroll is time not spent on revenue.",
    },
];

const INDUSTRY_BENCHMARKS = [
    { label: "Average burden rate multiplier", value: "1.25–1.40×" },
    { label: "Typical time theft loss per employee/week", value: "$50–$150" },
    { label: "Payroll processing time (manual)", value: "2–4 hrs/week" },
    { label: "Average workers' comp rate (construction)", value: "$6–$30 per $100" },
];

export default function TrueCostCalculatorPage() {
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "What is the true cost of a construction employee?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "The true cost of a construction employee is typically 1.25-1.40x their base hourly rate. A $28/hour worker actually costs $35-$42/hour when you include payroll taxes (7.65-15%), workers' compensation (3-15%), benefits (10-30%), and hidden costs like time theft (2-5%).",
                },
            },
            {
                "@type": "Question",
                name: "What is a burdened labor rate in construction?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "A burdened labor rate is the total cost to employ a worker, including the base wage plus all employer-paid taxes, insurance, benefits, and overhead. In construction, the burden multiplier is typically 1.25-1.40x the base rate.",
                },
            },
            {
                "@type": "Question",
                name: "How much does time theft cost construction companies?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Time theft typically costs construction companies 2-5% of gross payroll. For a 10-person crew earning $28/hour, just 15 minutes of daily time padding adds up to $17,500 per year. The American Payroll Association estimates time theft costs U.S. employers $400 billion per year.",
                },
            },
        ],
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://getcrewtrace.com/" },
            { "@type": "ListItem", position: 2, name: "Tools", item: "https://getcrewtrace.com/tools" },
            { "@type": "ListItem", position: 3, name: "True Cost Calculator", item: "https://getcrewtrace.com/tools/true-cost-calculator" },
        ],
    };

    return (
        <div className="min-h-screen bg-background selection:bg-primary/20">
            <Navbar />

            <main className="pb-10">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />

                {/* Hero Section */}
                <header className="relative w-full overflow-visible pt-32 pb-24 lg:pt-40 lg:pb-32 flex flex-col items-center justify-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/[0.06] blur-[100px] rounded-full pointer-events-none" />

                    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary uppercase tracking-widest text-[11px] font-bold mb-8 shadow-sm">
                            <Calculator size={14} />
                            <span>Free Industry Tool</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.05] text-balance">
                            The <span className="text-primary italic">True Cost</span> of a <br className="hidden md:block" /> Construction Employee
                        </h1>

                        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            Your employees cost a lot more than their hourly rate. Calculate the real, fully-burdened cost
                            — including taxes, insurance, time theft, and hidden overhead — and find out how much you could save.
                        </p>

                        <a
                            href="#calculator"
                            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg group"
                        >
                            Use the Calculator
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </header>

                {/* Calculator Section — Pulled up via negative margin like the other page */}
                <div className="max-w-[1000px] mx-auto px-6 relative z-20 -mt-10 lg:-mt-20">
                    <section id="calculator" className="scroll-mt-32 mb-24 lg:mb-32">
                        <SavingsCalculator />
                    </section>
                </div>

                {/* Guide Content */}
                <div className="max-w-5xl mx-auto px-6">

                    {/* Section 1: The Problem */}
                    <section className="mb-24 lg:mb-32">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                                Why Hourly Rate <span className="text-primary italic">≠</span> True Cost
                            </h2>
                            <div className="space-y-5 text-lg text-foreground/60 leading-relaxed font-medium">
                                <p>
                                    If you're paying a construction worker $28/hour, you might assume they cost you $28/hour. They don't.
                                </p>
                                <p>
                                    Once you factor in payroll taxes, workers' compensation, insurance, benefits, overtime premiums, and the hidden
                                    costs of time theft and payroll errors, that $28/hour employee actually costs you somewhere between <strong className="text-foreground">{"$35 and $42 per hour"}</strong>.
                                </p>
                                <p>
                                    This is called the <strong className="text-foreground">fully burdened labor rate</strong>, and most contractors
                                    underestimate it by 20-40%. That gap between what you think you're paying and what you're actually paying is where
                                    profit margins disappear.
                                </p>
                            </div>
                        </div>

                        {/* Premium Stat callout */}
                        <div className="relative my-12 rounded-[2rem] border border-primary/20 bg-primary/5 p-8 md:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 overflow-hidden shadow-sm">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
                            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                            <span className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight whitespace-nowrap pl-4 sm:pl-0 shrink-0">
                                1.25–1.40×
                            </span>
                            <span className="text-lg md:text-xl text-foreground/70 leading-relaxed font-medium pl-4 sm:pl-0">
                                The typical burden rate multiplier in construction. A $28/hour worker actually costs $35–$39/hour when you account for all employer costs.
                            </span>
                        </div>
                    </section>

                    {/* Section 2: Cost Breakdown Bento Grid */}
                    <section className="mb-24 lg:mb-32">
                        <div className="max-w-3xl mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight text-balance">
                                What Makes Up the <br /> <span className="text-primary italic">True Cost</span>
                            </h2>
                            <p className="text-lg text-foreground/60 leading-relaxed font-medium">
                                Here's every cost category that sits on top of the base hourly wage. Most contractors only account for 2-3 of these.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {COST_BREAKDOWN.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.title}
                                        className="group relative p-8 rounded-[2rem] bg-white border border-foreground/5 shadow-sm hover:shadow-md hover:border-foreground/15 transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
                                            <Icon size={140} className="text-foreground -rotate-12 translate-x-4 -translate-y-4" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                                                    <Icon className="w-6 h-6 text-primary" />
                                                </div>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-bold border border-primary/10">
                                                    {item.percentage}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-foreground text-xl tracking-tight mb-3">
                                                {item.title}
                                            </h3>
                                            <p className="text-foreground/50 text-base leading-relaxed font-medium">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Section 4: The Hidden Costs */}
                    <section className="mb-24 lg:mb-32">
                        <div className="max-w-3xl border-l-4 border-primary pl-8 py-2 mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                                The Costs Most Contractors Miss
                            </h2>
                            <p className="text-lg text-foreground/60 leading-relaxed font-medium">
                                Payroll taxes and workers' comp are obvious. What catches most contractors off guard are the <strong className="text-foreground">soft costs</strong> — the ones that don't show up on a single line item but drain profit consistently.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            <div>
                                <h3 className="text-xl font-bold text-foreground tracking-tight mb-4">Time Theft</h3>
                                <p className="text-foreground/60 font-medium leading-relaxed text-base">
                                    The APA estimates that <strong className="text-foreground">75% of businesses</strong> are affected by time theft. In construction, it's even more common because crews work across scattered job sites. <br />
                                    Our research shows that even just 15 minutes of daily time inflation across a 10-person crew adds up to <strong className="text-foreground">$17,500 per year</strong>.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground tracking-tight mb-4">Payroll Processing</h3>
                                <p className="text-foreground/60 font-medium leading-relaxed text-base">
                                    If you're still using paper timesheets, you're spending 2-4 hours per week collecting, deciphering, calculating, and entering time data. If you value your time at $50-75/hour, that's <strong className="text-foreground">$5,200-$15,600 per year</strong> in pure overhead opportunity cost.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground tracking-tight mb-4">Overtime Chaos</h3>
                                <p className="text-foreground/60 font-medium leading-relaxed text-base">
                                    Unplanned overtime at 1.5× rates can shred a project budget. Without real-time visibility into who's approaching 40 hours, you only find out when it's too late — during payroll processing. GPS tracking lets you make staffing decisions proactively.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Industry Benchmarks */}
                    <section className="mb-24 lg:mb-32">
                        <div className="max-w-3xl mb-10">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                                Industry Benchmarks
                            </h2>
                            <p className="text-lg text-foreground/60 font-medium leading-relaxed">
                                Use these benchmarks to gut-check your own numbers. If your burdened rate is significantly lower than 1.25×, you're probably missing costs.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {INDUSTRY_BENCHMARKS.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex flex-col p-6 rounded-2xl bg-foreground/[0.02] border border-border/40 hover:bg-foreground/[0.04] transition-colors"
                                >
                                    <CheckCircle2 className="w-6 h-6 text-primary mb-4" />
                                    <p className="text-2xl font-bold text-foreground tracking-tight mb-2">{item.value}</p>
                                    <span className="text-sm font-medium text-foreground/60 leading-snug">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* What To Do Next Section */}
                    <section className="mb-24 lg:mb-32">
                        <div className="max-w-3xl mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                                What to Do With These Numbers
                            </h2>
                            <p className="text-lg text-foreground/60 font-medium leading-relaxed">
                                Once you know your true burdened labor cost, here's how to act on it:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Re-price your bids",
                                    text: "If you've been using the base hourly rate in estimates, you've been underbidding. Apply the burden multiplier to every labor hour in your estimates.",
                                },
                                {
                                    title: "Eliminate time theft",
                                    text: "GPS-verified time tracking stops buddy punching, time inflation, and break abuse immediately. Most contractors recover $1,000-$3,000/month in the first month alone.",
                                },
                                {
                                    title: "Automate payroll",
                                    text: "Replace manual timesheet processing with digital, automated time records. Cut payroll processing from hours to minutes and eliminate data entry errors.",
                                },
                                {
                                    title: "Monitor overtime in real time",
                                    text: "Set up alerts when workers approach 40 hours so you can make staffing decisions before overtime kicks in — not after.",
                                },
                            ].map((step, i) => (
                                <div key={step.title} className="flex gap-5 p-6 rounded-2xl bg-white border border-foreground/5 shadow-sm">
                                    <div className="mt-1 shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-lg">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <strong className="text-foreground text-lg block mb-2 tracking-tight">{step.title}</strong>
                                        <span className="text-foreground/60 font-medium leading-relaxed block">{step.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Related Articles Cards */}
                    <section className="mb-24 lg:mb-32">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                    Related Guides & Research
                                </h3>
                            </div>
                            <Link href="/blog" className="text-primary font-bold hover:opacity-80 transition-opacity flex items-center gap-1 group">
                                View all resources <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Employee Time Theft in Construction",
                                    desc: "Learn exactly what time theft is and how to stop it legally.",
                                    href: "/blog/employee-time-theft-construction",
                                    icon: "⚖️",
                                },
                                {
                                    title: "GPS vs. Paper Timesheets",
                                    desc: "The true ROI comparison of upgrading your tracking.",
                                    href: "/blog/gps-time-tracking-vs-paper-timesheets",
                                    icon: "📊",
                                },
                                {
                                    title: "5 Signs You're Bleeding Payroll",
                                    desc: "Hidden red flags that your payroll process is broken.",
                                    href: "/blog/5-signs-losing-money-payroll",
                                    icon: "💸",
                                },
                            ].map((article) => (
                                <Link
                                    key={article.href}
                                    href={article.href}
                                    className="group flex flex-col p-8 rounded-[2rem] bg-white border border-foreground/5 shadow-sm hover:shadow-md hover:border-foreground/15 transition-all duration-300"
                                >
                                    <span className="text-3xl mb-5 block">{article.icon}</span>
                                    <span className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors leading-snug tracking-tight">
                                        {article.title}
                                    </span>
                                    <span className="text-foreground/50 text-sm font-medium leading-relaxed">
                                        {article.desc}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Author Bio */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 md:p-10 rounded-[2rem] bg-secondary/30 border border-border/50 mb-20">
                        <img
                            src="/images/headshot.jpg"
                            alt="Carter Mitchell"
                            className="w-24 h-24 rounded-full object-cover flex-shrink-0 shadow-sm border-4 border-white"
                        />
                        <div className="text-center sm:text-left">
                            <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Written by Carter Mitchell</h3>
                            <p className="text-foreground/70 text-base md:text-lg leading-relaxed font-medium">
                                Carter is the founder of Crewtrace. He built Crewtrace to help construction and field service companies
                                eliminate payroll leaks, automate GPS time tracking, and protect their bottom line.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Premium Full-width CTA */}
                <div className="max-w-6xl mx-auto px-6">
                    <section className="relative overflow-hidden rounded-[3rem] bg-foreground text-background border border-foreground/10 shadow-2xl">
                        {/* Premium Glow Effects */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[140px] opacity-[0.25] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-20 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                        <div className="relative z-10 px-8 py-20 md:px-16 md:py-28 text-center flex flex-col items-center">
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-3xl">
                                Stop overpaying. <span className="opacity-90 italic text-white">Start tracking.</span>
                            </h3>
                            <p className="text-xl md:text-2xl text-background/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                                Book a free demo and see exactly how GPS-verified time tracking can reduce your true labor costs.
                            </p>
                            <BookedCallLink
                                cluster="tools"
                                templateType="tool_page"
                                landingPath="/tools/true-cost-calculator"
                                ctaLabel="Book Your Free Demo"
                                ctaLocation="footer_cta"
                                className="inline-flex items-center justify-center bg-white text-foreground font-bold px-10 py-5 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all text-lg group"
                            >
                                Book Your Free Demo
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </BookedCallLink>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
