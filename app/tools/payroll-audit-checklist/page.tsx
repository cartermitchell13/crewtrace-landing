"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComplianceAuditTool from "@/components/ComplianceAuditTool";
import Link from "next/link";
import {
    ShieldCheck,
    AlertTriangle,
    FileText,
    Clock,
    Scale,
    Shield,
    ArrowRight,
    ArrowDown,
    Calculator,
} from "lucide-react";

const COMPLIANCE_RISKS = [
    {
        icon: Scale,
        title: "Burden of Proof is on the Employer",
        description:
            "Under the FLSA, if an employee claims they worked off-the-clock and you lack clear API/GPS logs validating exact time worked, the DOL automatically sides with the employee.",
    },
    {
        icon: Shield,
        title: "Liquidated Damages (Double Pay)",
        description:
            "If an auditor finds you failed to properly pay overtime or track breaks, they typically assess back wages PLUS an equal amount in 'liquidated damages'—essentially doubling your penalty.",
    },
    {
        icon: AlertTriangle,
        title: "Paper Timesheets are Not Defensible",
        description:
            "Handwritten or manually entered timesheets are easily contested in court. They do not prove an employee was actually on the job site at the recorded time.",
    },
    {
        icon: Clock,
        title: "Rounding Rules Must Be Neutral",
        description:
            "If you round time to the nearest 15 minutes, it must mathematically favor the employee half the time. If your rounding consistently benefits the company, it's a direct FLSA violation.",
    },
];

export default function PayrollAuditChecklistPage() {
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "How do I pass a payroll audit?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "To pass a payroll or FLSA audit, you must maintain accurate, unedited records of all hours worked, meal breaks, and overtime for at least three years. The best way to achieve this in construction is via a digital, GPS-verified time clock app that removes manual entry and buddy punching.",
                },
            },
            {
                "@type": "Question",
                name: "What does the DOL look for in a time tracking audit?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "A DOL auditor will look for consistent off-the-clock work, unpaid travel time between job sites, improper rounding of hours, buddy punching on manual systems, and failure to accurately calculate overtime based on the regular rate of pay.",
                },
            },
            {
                "@type": "Question",
                name: "Are paper timesheets legal for payroll audits?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "While legal, paper timesheets provide zero defensibility during a dispute. Because they are filled out after the fact, employees can easily argue the paper record is inaccurate. Digital, timestamped, GPS-verified logs serve as undeniable proof of hours worked.",
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
            { "@type": "ListItem", position: 3, name: "Payroll Audit Checklist", item: "https://getcrewtrace.com/tools/payroll-audit-checklist" },
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
                <header className="relative w-full overflow-hidden bg-gradient-to-b from-primary/5 via-primary/[0.02] to-background pt-32 pb-16 lg:pt-40 lg:pb-24">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/60 mb-8 font-medium">
                            <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider text-xs font-bold shadow-sm">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Interactive Checklist
                            </span>
                            <span className="hidden sm:inline text-foreground/30">•</span>
                            <span>Construction Specific</span>
                            <span className="hidden sm:inline text-foreground/30">•</span>
                            <span>Audit Risk Calculator</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]">
                            The FLSA & Payroll Audit Checklist
                        </h1>

                        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Under the FLSA, the burden of proof is entirely on the employer. If a dispute arises over time tracking or overtime, manual timesheets won't save you. Find out if your timekeeping system is audit-ready.
                        </p>

                        <a
                            href="#checklist"
                            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-lg group"
                        >
                            Start the Audit Risk Test
                            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </a>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto px-6 mt-16 lg:mt-20">

                    {/* The Interactive Checklist */}
                    <section id="checklist" className="scroll-mt-24 mb-16 lg:mb-24">
                        <div className="mb-8 text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                                Test Your Compliance Readiness
                            </h2>
                            <p className="text-lg text-foreground/60 leading-relaxed">
                                Answer the 6 questions below. If an auditor requested your payroll records tomorrow, how confident are you that your data would hold up in court?
                            </p>
                        </div>

                        <ComplianceAuditTool />
                    </section>

                    {/* Why The DOL Targets Construction */}
                    <section className="mb-16 lg:mb-24">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                            Why Construction is a Top Target for the DOL
                        </h2>
                        <div className="space-y-5 text-lg text-foreground/70 leading-relaxed max-w-3xl">
                            <p>
                                The Department of Labor's Wage and Hour Division (WHD) specifically targets construction
                                companies because the industry has historically high rates of FLSA violations. Over the last
                                5 years, the WHD has recovered over <strong>$170 million in back wages</strong> specifically within construction.
                            </p>
                            <p>
                                When you manage geographically dispersed crews doing physical labor with varying overtime rules,
                                precise <strong className="text-foreground">payroll time tracking</strong> is critical. If
                                you rely on guys texting their hours or handwriting timesheets on Friday afternoons, you are
                                operating blindly and assuming massive liability.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                            {COMPLIANCE_RISKS.map((risk) => {
                                const Icon = risk.icon;
                                return (
                                    <div
                                        key={risk.title}
                                        className="group p-6 rounded-2xl border border-border/50 bg-white hover:border-primary/20 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                                                <Icon className="w-5 h-5 text-red-500" />
                                            </div>
                                            <h3 className="font-bold text-foreground text-lg tracking-tight self-center leading-tight">
                                                {risk.title}
                                            </h3>
                                        </div>
                                        <p className="text-foreground/60 text-sm leading-relaxed pl-14">
                                            {risk.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* What is a Compliance Audit */}
                    <section className="mb-24 lg:mb-32">
                        <div className="max-w-3xl border-l-4 border-primary pl-8 py-2 mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                                What is a <span className="text-primary italic">Payroll Compliance Audit?</span>
                            </h2>
                            <div className="space-y-5 text-lg text-foreground/60 leading-relaxed font-medium">
                                <p>
                                    A <strong className="text-foreground">payroll compliance audit</strong> is a comprehensive review of your company's payroll records, time tracking processes, and systems to ensure strict adherence to the Fair Labor Standards Act (FLSA), state labor laws, and internal company policies.
                                </p>
                                <p>
                                    The primary <strong className="text-foreground">payroll audit objectives</strong> are to verify that employees are classified correctly, paid accurately for all hours worked, and that overtime, tax deductions, and recordkeeping meet all legal standards. For construction companies, this specifically involves examining time tracking accuracy across multiple job sites, calculating the regular rate of pay correctly, and ensuring prevailing wage and break compliance.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Internal Audit vs DOL */}
                    <section className="mb-24 lg:mb-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                                    Internal Audit <br /> <span className="text-foreground/40 text-2xl md:text-3xl">vs.</span> DOL Audit
                                </h2>
                                <p className="text-lg text-foreground/60 leading-relaxed font-medium mb-6">
                                    Conducting an <strong className="text-foreground">internal audit of your payroll process</strong> is a proactive measure. You find the mistakes, correct the back pay, and fix your systems without federal penalties.
                                </p>
                                <p className="text-lg text-foreground/60 leading-relaxed font-medium">
                                    A Department of Labor (DOL) audit is reactive. If the DOL initiates a <strong className="text-foreground">timekeeping audit</strong> due to an employee complaint, they will comb through three years of records. If they find violations, you will owe back wages, liquidated damages (double the back wages), and potentially severe civil money penalties.
                                </p>
                            </div>
                            <div className="p-8 md:p-10 rounded-[2rem] bg-secondary/30 border border-border/50">
                                <h3 className="text-xl font-bold text-foreground mb-6">Common Payroll Audit Questions</h3>
                                <ul className="space-y-5 text-foreground/70 font-medium list-none pl-0">
                                    <li className="flex gap-4">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span>Do we have timestamped, GPS proof of when an employee actually arrived at the job site?</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span>Are we properly combining hours if an employee works on two different projects in the same workweek?</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span>Do we automatically deduct 30 minutes for lunch, and if so, how do we prove the employee actually took that unbroken break?</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <span>Can an employee easily alter their own timesheet after the fact without a manager's digital approval?</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Core Procedures */}
                    <section className="mb-24 lg:mb-32">
                        <div className="max-w-3xl mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
                                Internal Payroll Audit Checklist Procedures
                            </h2>
                            <p className="text-lg text-foreground/60 font-medium leading-relaxed">
                                When running your own internal payroll audit checklist, use these fundamental payroll audit procedures to stress-test your current systems before an inspector does.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "1. Audit Timekeeping Methods",
                                    text: "Compare your timesheets to reality. If you use paper timesheets, ask yourself how you would prove an employee was actually on site if they claim they were. The solution is switching to digital, GPS-verified tracking.",
                                },
                                {
                                    title: "2. Review Overtime Calculations",
                                    text: "Verify that all nondiscretionary bonuses, shift differentials, and commissions are being included in the 'regular rate of pay' before calculating the time-and-a-half overtime rate.",
                                },
                                {
                                    title: "3. Verify Worker Classification",
                                    text: "Review all 1099 independent contractors. In construction, if you dictate their schedule, provide their tools, and tell them how to do the work, the DOL will classify them as W-2 employees entitled to overtime.",
                                },
                                {
                                    title: "4. Check Record Retention",
                                    text: "Ensure you have uneditable, accurate records of all hours worked, pay rates, and payroll dates for at least the last three years, as required by the Fair Labor Standards Act.",
                                },
                            ].map((step) => (
                                <div key={step.title} className="flex flex-col gap-3 p-8 rounded-[2rem] bg-white border border-foreground/5 shadow-sm hover:shadow-md hover:border-foreground/15 transition-all">
                                    <strong className="text-foreground text-xl tracking-tight">{step.title}</strong>
                                    <span className="text-foreground/60 font-medium leading-relaxed text-base">{step.text}</span>
                                </div>
                            ))}
                        </div>
                    </section>


                    {/* Related Content */}
                    <section className="mb-16 lg:mb-20 pt-10 border-t border-border/40">
                        <h3 className="text-xl font-bold tracking-tight text-foreground mb-6">
                            Related Guides & Tools
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                {
                                    title: "DOL Audit Guide & Time Clock Rules",
                                    href: "/guides/dol-audit-ready-time-records",
                                    icon: "⚖️",
                                },
                                {
                                    title: "True Cost Calculator (Burden Rate)",
                                    href: "/tools/true-cost-calculator",
                                    icon: "📊",
                                },
                                {
                                    title: "Employee Time Theft Prevention",
                                    href: "/blog/employee-time-theft-construction",
                                    icon: "⏱",
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
                </div>

                {/* Full-width CTA */}
                <div className="max-w-4xl mx-auto px-6">
                    <section className="relative overflow-hidden rounded-[2rem] bg-foreground text-background">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3 z-0" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500 rounded-full blur-[100px] opacity-20 translate-y-1/3 -translate-x-1/3 z-0" />

                        <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 border border-background/20 text-background mb-8">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-sm font-medium">Protect your business</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                                Make your payroll bulletproof.
                            </h3>
                            <p className="text-lg md:text-xl text-background/80 mb-10 max-w-xl mx-auto leading-relaxed">
                                Deploy GPS-verified time tracking that gives you indisputable proof of exactly when and where your crew was working.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl shadow-[0_0_40px_rgba(var(--primary),0.3)] hover:shadow-[0_0_60px_rgba(var(--primary),0.5)] hover:scale-105 active:scale-95 transition-all text-lg min-w-[200px]"
                            >
                                Get a Personalized Demo
                            </Link>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
