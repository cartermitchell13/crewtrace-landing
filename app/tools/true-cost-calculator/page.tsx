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
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pb-24">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />
                {/* Hero Section */}
                <header className="relative w-full overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background pt-32 pb-16 lg:pt-40 lg:pb-24">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/60 mb-8 font-medium">
                            <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider text-xs font-bold shadow-sm">
                                <Calculator className="w-3.5 h-3.5" />
                                Free Tool
                            </span>
                            <span className="hidden sm:inline text-foreground/30">•</span>
                            <span>No email required</span>
                            <span className="hidden sm:inline text-foreground/30">•</span>
                            <span>Industry benchmarked</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
                            The True Cost of a Construction Employee
                        </h1>

                        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Your employees cost a lot more than their hourly rate. Calculate the real, fully-burdened cost
                            — including taxes, insurance, time theft, and hidden overhead — and find out how much you could save.
                        </p>

                        {/* Jump to calculator button */}
                        <a
                            href="#calculator"
                            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-lg"
                        >
                            Use the Calculator
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </header>

                {/* Guide Content */}
                <div className="max-w-4xl mx-auto px-6 mt-16 lg:mt-20">

                    {/* Section 1: The Problem */}
                    <section className="mb-16 lg:mb-20">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                            Why Hourly Rate ≠ True Cost
                        </h2>
                        <div className="space-y-5 text-lg text-foreground/70 leading-relaxed">
                            <p>
                                If you're paying a construction worker $28/hour, you might assume they cost you $28/hour. They don't.
                            </p>
                            <p>
                                Once you factor in payroll taxes, workers' compensation, insurance, benefits, overtime premiums, and the hidden
                                costs of time theft and payroll errors, that $28/hour employee actually costs you somewhere between <strong className="text-foreground">$35 and $42 per hour</strong>.
                            </p>
                            <p>
                                This is called the <strong className="text-foreground">fully burdened labor rate</strong>, and most contractors
                                underestimate it by 20-40%. That gap between what you think you're paying and what you're actually paying is where
                                profit margins disappear.
                            </p>
                        </div>

                        {/* Stat callout */}
                        <div className="relative my-10 rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-2xl" />
                            <span className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight whitespace-nowrap pl-4 sm:pl-3">
                                1.25–1.40×
                            </span>
                            <span className="text-base md:text-lg text-foreground/70 leading-snug font-medium pl-4 sm:pl-0">
                                The typical burden rate multiplier in construction. A $28/hour worker actually costs $35–$39/hour when you account for all employer costs.
                            </span>
                        </div>
                    </section>

                    {/* Section 2: Cost Breakdown */}
                    <section className="mb-16 lg:mb-20">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                            What Makes Up the True Cost
                        </h2>
                        <p className="text-lg text-foreground/60 leading-relaxed mb-10">
                            Here's every cost category that sits on top of the base hourly wage. Most contractors only account for 2-3 of these.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {COST_BREAKDOWN.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.title}
                                        className="group p-6 rounded-2xl border border-border/50 bg-white hover:border-primary/20 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground text-lg tracking-tight">{item.title}</h3>
                                                <span className="text-sm font-bold text-primary">{item.percentage} of wages</span>
                                            </div>
                                        </div>
                                        <p className="text-foreground/60 text-sm leading-relaxed pl-14">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Section 3: Industry Benchmarks */}
                    <section className="mb-16 lg:mb-20">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                            Industry Benchmarks
                        </h2>
                        <p className="text-lg text-foreground/60 leading-relaxed mb-8">
                            Use these benchmarks to gut-check your own numbers. If your burdened rate is significantly lower than 1.25×, you're probably missing costs.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {INDUSTRY_BENCHMARKS.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-start gap-4 p-5 rounded-xl bg-foreground/[0.03] border border-border/30"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-sm font-medium text-foreground/60">{item.label}</span>
                                        <p className="text-lg font-bold text-foreground tracking-tight">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 4: The Hidden Costs */}
                    <section className="mb-16 lg:mb-20">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                            The Costs Most Contractors Miss
                        </h2>
                        <div className="space-y-5 text-lg text-foreground/70 leading-relaxed">
                            <p>
                                Payroll taxes and workers' comp are obvious. What catches most contractors off guard are the <strong className="text-foreground">soft costs</strong> — the ones that don't show up on a single line item but drain profit consistently.
                            </p>

                            <h3 className="text-2xl font-bold text-foreground pt-4">Time Theft</h3>
                            <p>
                                The American Payroll Association estimates that <strong className="text-foreground">75% of businesses</strong> are
                                affected by time theft. In construction, it's even more common because crews work across scattered job sites
                                with minimal direct supervision.
                            </p>
                            <p>
                                Common forms include buddy punching, inflated time entries, extended breaks, and rounding up hours. Our research
                                shows that even "just 15 minutes" of daily time inflation across a 10-person crew adds up to{" "}
                                <strong className="text-foreground">$17,500 per year</strong>.{" "}
                                <Link href="/blog/employee-time-theft-construction" className="text-primary font-medium hover:underline">
                                    Read our full breakdown of time theft laws and prevention →
                                </Link>
                            </p>

                            <h3 className="text-2xl font-bold text-foreground pt-4">Payroll Processing</h3>
                            <p>
                                If you're still using paper timesheets, you're spending 2-4 hours per week collecting, deciphering, calculating,
                                and entering time data. If you value your time at $50-75/hour, that's $5,200-$15,600 per year in opportunity cost.{" "}
                                <Link href="/blog/gps-time-tracking-vs-paper-timesheets" className="text-primary font-medium hover:underline">
                                    See the full cost comparison →
                                </Link>
                            </p>

                            <h3 className="text-2xl font-bold text-foreground pt-4">Overtime Mismanagement</h3>
                            <p>
                                Unplanned overtime at 1.5× rates can shred a project budget. Without real-time visibility into who's approaching
                                40 hours, you only find out when it's too late — during payroll processing. GPS time tracking with overtime alerts
                                lets you make staffing decisions before overtime kicks in.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Calculator Section — Full Width */}
                <section id="calculator" className="scroll-mt-24 mb-16 lg:mb-24">
                    <div className="max-w-4xl mx-auto px-6 mb-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                            Calculate Your True Employee Cost
                        </h2>
                        <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                            Enter your crew size, hourly rates, and current tracking method below. We'll calculate exactly how much
                            payroll leakage you could be recovering.
                        </p>
                    </div>

                    <SavingsCalculator />
                </section>

                {/* What To Do Next Section */}
                <div className="max-w-4xl mx-auto px-6">
                    <section className="mb-16 lg:mb-20">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                            What to Do With These Numbers
                        </h2>
                        <div className="space-y-5 text-lg text-foreground/70 leading-relaxed">
                            <p>
                                Once you know your true burdened labor cost, here's how to act on it:
                            </p>
                            <ol className="space-y-4 list-none pl-0">
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
                                    <li key={step.title} className="flex gap-5 group">
                                        <div className="mt-0.5 shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-foreground/[0.06] text-foreground/80 font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <strong className="text-foreground block mb-1">{step.title}</strong>
                                            <span className="text-foreground/60">{step.text}</span>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>

                    {/* Related Articles */}
                    <section className="mb-16 lg:mb-20 pt-10 border-t border-border/40">
                        <h3 className="text-xl font-bold tracking-tight text-foreground mb-6">
                            Related Articles
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    title: "Employee Time Theft in Construction: Laws & Prevention",
                                    href: "/blog/employee-time-theft-construction",
                                    icon: "⚖️",
                                },
                                {
                                    title: "GPS Time Tracking vs. Paper Timesheets",
                                    href: "/blog/gps-time-tracking-vs-paper-timesheets",
                                    icon: "📊",
                                },
                                {
                                    title: "5 Signs You're Losing Money on Payroll",
                                    href: "/blog/5-signs-losing-money-payroll",
                                    icon: "💸",
                                },
                            ].map((article) => (
                                <Link
                                    key={article.href}
                                    href={article.href}
                                    className="group flex items-start gap-3 p-5 rounded-2xl border border-border/50 bg-white hover:border-primary/20 hover:shadow-md transition-all duration-300"
                                >
                                    <span className="text-2xl flex-shrink-0">{article.icon}</span>
                                    <span className="font-semibold text-foreground/80 group-hover:text-primary transition-colors text-sm leading-snug">
                                        {article.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Author Bio */}
                    <div className="flex flex-col sm:flex-row items-start gap-6 p-8 rounded-3xl bg-secondary/30 border border-border/50 mb-16">
                        <img
                            src="/images/headshot.jpg"
                            alt="Carter Mitchell"
                            className="w-20 h-20 rounded-full object-cover flex-shrink-0 shadow-sm border-2 border-primary/20"
                        />
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">Written by Carter Mitchell</h3>
                            <p className="text-foreground/70 text-base leading-relaxed max-w-2xl">
                                Carter is the founder of Crewtrace. He built Crewtrace to help construction and field service companies
                                eliminate payroll leaks, automate GPS time tracking, and protect their bottom line.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Full-width CTA */}
                <div className="max-w-4xl mx-auto px-6">
                    <section className="relative overflow-hidden rounded-[2rem] bg-foreground text-background">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3 z-0" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 translate-y-1/3 -translate-x-1/3 z-0" />

                        <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 border border-background/20 text-background mb-8">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-sm font-medium">Ready to take control?</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                                Stop overpaying. Start tracking.
                            </h3>
                            <p className="text-lg md:text-xl text-background/80 mb-10 max-w-xl mx-auto leading-relaxed">
                                Book a free demo and see exactly how GPS-verified time tracking can reduce your true labor costs.
                            </p>
                            <BookedCallLink
                                cluster="tools"
                                templateType="tool_page"
                                landingPath="/tools/true-cost-calculator"
                                ctaLabel="Book Your Free Demo"
                                ctaLocation="footer_cta"
                                className="inline-flex items-center justify-center bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl shadow-[0_0_40px_rgba(var(--primary),0.3)] hover:shadow-[0_0_60px_rgba(var(--primary),0.5)] hover:scale-105 active:scale-95 transition-all text-lg min-w-[200px]"
                            >
                                Book Your Free Demo
                            </BookedCallLink>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
