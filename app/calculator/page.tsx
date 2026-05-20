"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import MultiStepSavingsCalculator from "@/components/MultiStepSavingsCalculator";
import CalculatorReport from "@/components/CalculatorReport";
import Footer from "@/components/Footer";
import ProcessSection from "@/components/ProcessSection";
import FeatureGrid from "@/components/FeatureGrid";
import Image from "next/image";
import {
    CheckCircle2,
    TrendingUp,
    Clock,
    Star,
    ShieldCheck,
    BarChart3,
    Zap,
} from "lucide-react";
import SectionDivider from "@/components/SectionDivider";
import { type CalculatorInputs, type CalculationResults } from "@/lib/calculator-calculations";

export default function CalculatorPage() {
    const [inputs, setInputs] = useState<CalculatorInputs | null>(null);
    const [results, setResults] = useState<CalculationResults | null>(null);

    const handleComplete = (inp: CalculatorInputs, res: CalculationResults) => {
        setInputs(inp);
        setResults(res);
        setTimeout(() => {
            document.getElementById("calculator-report")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleReset = () => {
        setInputs(null);
        setResults(null);
    };

    const hasReport = Boolean(inputs && results);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main>
                {/* ═══════════════════════════════════════════════════
                    HERO — Light section (2-column layout)
                   ═══════════════════════════════════════════════════ */}
                <section className="relative overflow-hidden bg-background py-28 md:py-36 lg:py-40">
                    {/* Ambient glow — weighted toward the calculator column */}
                    <div className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-[90%] translate-x-1/4 bg-[radial-gradient(ellipse_at_top_right,rgba(47,39,206,0.14)_0%,rgba(222,220,255,0.35)_35%,transparent_70%)] md:w-[55%]" />
                    <div className="pointer-events-none absolute left-0 top-1/4 -z-10 h-full w-[50%] -translate-x-1/2 bg-[radial-gradient(circle_at_left_center,rgba(47,39,206,0.04)_0%,transparent_50%)]" />

                    <div className="layout-shell relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
                            {/* Left column: Testimonial + Copy */}
                            <div className="lg:col-span-6 flex flex-col items-start text-left">
                                {/* Testimonial attribution */}
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-foreground/10 shadow-lg">
                                        <Image
                                            src="/images/jason-headshot-p-500.jpeg"
                                            alt="Jason Law"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-foreground">
                                            Jason Law
                                        </div>
                                        <div className="text-xs font-medium text-foreground/60">
                                            Owner, S&amp;W Waterproofing
                                        </div>
                                    </div>
                                    <div className="ml-1 flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className="fill-[#F59E0B] text-[#F59E0B]"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Headline */}
                                <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.08]">
                                    &ldquo;We Found{" "}
                                    <span className="text-primary italic">
                                        $2,100/mo
                                    </span>{" "}
                                    in Payroll Leakage in Week One&rdquo;
                                </h1>

                                {/* Subheadline */}
                                <p className="mb-7 max-w-xl text-base font-medium leading-relaxed text-foreground/70 md:text-lg">
                                    Join hundreds of contractors using this free 60-second
                                    audit to uncover exactly how much profit is slipping through
                                    payroll cracks — and what you could recover.
                                </p>

                                {/* Trust pills */}
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                    {[
                                        "100% Free",
                                        "No Credit Card",
                                        "Industry Benchmarked",
                                    ].map((text) => (
                                        <div
                                            key={text}
                                            className="flex items-center gap-1.5 text-xs font-bold text-foreground/45"
                                        >
                                            <CheckCircle2
                                                size={14}
                                                className="text-primary/80"
                                            />
                                            {text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right column: Multi-Step Interactive Calculator — hero focus */}
                            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-none">
                                    <MultiStepSavingsCalculator onComplete={handleComplete} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    REPORT SECTION — Displayed conditionally when complete
                   ═══════════════════════════════════════════════════ */}
                {hasReport && (
                    <CalculatorReport
                        inputs={inputs!}
                        calculations={results!}
                        onReset={handleReset}
                    />
                )}

                {!hasReport && (
                    <>
                <SectionDivider />

                {/* ═══════════════════════════════════════════════════
                    TRUST BAR — Compact proof strip
                   ═══════════════════════════════════════════════════ */}
                <div className="border-y border-foreground/[0.04] bg-foreground/[0.015]">
                    <div className="layout-shell py-5 md:py-6">
                        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 md:justify-between">
                            {[
                                {
                                    icon: ShieldCheck,
                                    text: "Based on APA & AGC research",
                                },
                                {
                                    icon: BarChart3,
                                    text: "4% avg payroll leakage identified",
                                },
                                { icon: Clock, text: "60-second audit" },
                                {
                                    icon: Zap,
                                    text: "Instant personalized report",
                                },
                            ].map((tp) => {
                                const Icon = tp.icon;
                                return (
                                    <div
                                        key={tp.text}
                                        className="flex items-center gap-2 text-xs font-bold text-foreground/45"
                                    >
                                        <Icon
                                            size={15}
                                            className="text-primary/70"
                                        />
                                        {tp.text}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <SectionDivider />

                {/* ═══════════════════════════════════════════════════
                    SOCIAL PROOF — Full testimonial card
                   ═══════════════════════════════════════════════════ */}
                <section className="py-16 md:py-24">
                    <div className="layout-shell">
                        <div className="mb-10">
                            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                                Customer proof
                            </p>
                            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                                Real results from the field.
                            </h2>
                        </div>

                        <div className="overflow-hidden rounded-md border border-foreground/5 bg-white shadow-lg">
                                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
                                    {/* Quote */}
                                    <div className="flex flex-col justify-between p-8 md:p-12 lg:border-r lg:border-foreground/5">
                                        <div>
                                            <div className="mb-5 flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={20}
                                                        className="fill-[#F59E0B] text-[#F59E0B]"
                                                    />
                                                ))}
                                            </div>
                                            <blockquote className="text-xl font-semibold leading-[1.6] tracking-tight text-foreground md:text-2xl">
                                                &ldquo;We moved from paper logs
                                                to Crewtrace and immediately
                                                found hours we were overpaying
                                                each week. Payroll now takes
                                                minutes instead of most of
                                                Thursday.&rdquo;
                                            </blockquote>
                                        </div>

                                        <div className="mt-8 flex items-center gap-4">
                                            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/10 shadow-md">
                                                <Image
                                                    src="/images/jason-headshot-p-500.jpeg"
                                                    alt="Jason Law, Owner of S&W Waterproofing"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-base font-bold text-foreground">
                                                    Jason Law
                                                </p>
                                                <p className="text-sm font-medium text-foreground/50">
                                                    Owner, S&amp;W Waterproofing
                                                </p>
                                            </div>
                                            <div className="relative ml-auto hidden h-8 w-28 opacity-80 sm:block">
                                                <Image
                                                    src="/images/sw-logo.png"
                                                    alt="S&W Waterproofing Logo"
                                                    fill
                                                    className="object-contain object-right"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div className="flex flex-col justify-center border-t border-foreground/5 bg-[#F9F9FC] p-6 md:p-10 lg:border-t-0">
                                        <h3 className="mb-5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 lg:text-left">
                                            The Impact
                                        </h3>
                                        <div className="flex flex-col gap-4">
                                            {[
                                                {
                                                    icon: TrendingUp,
                                                    value: "$2,100/mo",
                                                    label: "Capital Recovered",
                                                    iconBg: "bg-emerald-50",
                                                    iconColor:
                                                        "text-emerald-600",
                                                },
                                                {
                                                    icon: Clock,
                                                    value: "2 weeks",
                                                    label: "Time to ROI",
                                                    iconBg: "bg-blue-50",
                                                    iconColor: "text-blue-600",
                                                },
                                                {
                                                    icon: CheckCircle2,
                                                    value: "100%",
                                                    label: "Verified Timesheets",
                                                    iconBg: "bg-primary/5",
                                                    iconColor: "text-primary",
                                                },
                                            ].map((m) => {
                                                const Icon = m.icon;
                                                return (
                                                    <div
                                                        key={m.label}
                                                        className="flex items-center gap-4 rounded-md border border-foreground/5 bg-white p-4 shadow-sm"
                                                    >
                                                        <div
                                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${m.iconBg} ${m.iconColor}`}
                                                        >
                                                            <Icon
                                                                size={22}
                                                                strokeWidth={
                                                                    2.5
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-extrabold text-foreground">
                                                                {m.value}
                                                            </p>
                                                            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50">
                                                                {m.label}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </section>

                <SectionDivider />

                {/* How Crewtrace turns audit findings into verified payroll */}
                <ProcessSection />

                <SectionDivider />

                {/* What Crewtrace is — product proof from the home page */}
                <FeatureGrid headingAlign="left" />
                    </>
                )}
            </main>

            <SectionDivider />
            <Footer />
        </div>
    );
}
