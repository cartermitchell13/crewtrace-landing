"use client";

import React from "react";
import {
    CheckCircle2,
    ArrowRight,
    TrendingDown,
    TrendingUp,
    AlertCircle,
    Truck,
    PiggyBank,
    CalendarDays,
    BarChart3,
    Clock,
    DollarSign,
    Shield,
    Zap,
    ChevronRight,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import { type CalculatorInputs, type CalculationResults } from "../lib/calculator-calculations";

interface CalculatorReportProps {
    inputs: CalculatorInputs;
    calculations: CalculationResults;
    onReset: () => void;
}

export default function CalculatorReport({ inputs, calculations, onReset }: CalculatorReportProps) {
    const {
        crewSize,
        jobSites,
        trackingMethod,
        tradeType,
    } = inputs;

    return (
        <section id="calculator-report" className="scroll-mt-32 bg-background py-10">
            <div className="layout-shell">
                <div className="w-full space-y-8">

                    {/* Report Header */}
                    <div className="bg-white rounded-md border border-foreground/5 p-8 md:p-12 shadow-sm ring-1 ring-foreground/5">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                                    <CheckCircle2 size={12} />
                                    <span>Audit Complete</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] text-foreground">
                                    Your Profit Leakage Report
                                </h2>
                                <p className="text-base text-foreground/40 font-medium">
                                    {crewSize}-person {tradeType} crew &middot; {jobSites} active site{jobSites > 1 ? "s" : ""} &middot; {trackingMethod === "paper" ? "Paper timesheets" : trackingMethod === "spreadsheet" ? "Spreadsheets" : trackingMethod === "basic-app" ? "Basic app" : "No formal tracking"}
                                </p>
                            </div>
                            <button
                                onClick={onReset}
                                className="text-sm font-bold text-foreground/40 hover:text-primary transition-colors flex items-center gap-1.5 shrink-0"
                            >
                                <ArrowRight size={14} className="rotate-180" />
                                Edit inputs & recalculate
                            </button>
                        </div>
                    </div>

                    {/* Risk Score + Annual Loss Hero */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Risk Score */}
                        <div className="bg-white rounded-md border border-foreground/5 p-8 shadow-sm flex flex-col items-center justify-center text-center">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-4">Leakage Risk Score</div>
                            <div className="relative w-28 h-28 mb-4">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="8" />
                                    <circle
                                        cx="50" cy="50" r="42" fill="none"
                                        stroke={calculations.riskScore >= 75 ? "#dc2626" : calculations.riskScore >= 50 ? "#f59e0b" : "#22c55e"}
                                        strokeWidth="8" strokeLinecap="round"
                                        strokeDasharray={`${calculations.riskScore * 2.64} 264`}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="text-3xl font-bold tracking-tight">{calculations.riskScore}</div>
                                    <div className="text-[10px] font-bold text-foreground/40">/100</div>
                                </div>
                            </div>
                            <div className={`text-sm font-bold px-3 py-1 rounded-full ${calculations.riskScore >= 75 ? "bg-red-50 text-red-600" : calculations.riskScore >= 50 ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"}`}>
                                {calculations.riskLevel} Risk
                            </div>
                        </div>

                        {/* Annual Loss */}
                        <div className="md:col-span-2 bg-white rounded-md border-2 border-red-500/20 p-8 md:p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 text-red-500/10">
                                <TrendingDown size={140} strokeWidth={1} />
                            </div>
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider mb-4">
                                    <AlertCircle size={12} />
                                    Estimated Annual Leakage
                                </div>
                                <div className="text-6xl md:text-7xl font-bold tracking-tighter text-red-600 tabular-nums mb-4">
                                    ${calculations.totalYearlyLoss.toLocaleString()}
                                </div>
                                <div className="flex flex-wrap gap-6 text-sm">
                                    <div>
                                        <span className="text-foreground/40 font-medium">Per worker: </span>
                                        <span className="font-bold text-red-600">${calculations.perWorkerYearlyLoss.toLocaleString()}/yr</span>
                                    </div>
                                    <div>
                                        <span className="text-foreground/40 font-medium">Monthly: </span>
                                        <span className="font-bold text-red-600">${calculations.totalMonthlyLoss.toLocaleString()}/mo</span>
                                    </div>
                                    <div>
                                        <span className="text-foreground/40 font-medium">Workers affected: </span>
                                        <span className="font-bold text-foreground">{calculations.workersAffected} of {crewSize}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* "That's equivalent to..." */}
                    <div className="bg-foreground/[0.02] rounded-md border border-foreground/5 p-6 md:p-8">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-5">To put that in perspective...</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-md bg-red-50 flex items-center justify-center shrink-0">
                                    <Truck size={18} className="text-red-500" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-foreground">{calculations.truckPayments} truck payments</div>
                                    <div className="text-xs text-foreground/40 font-medium">At $650/mo avg lease payment</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-md bg-red-50 flex items-center justify-center shrink-0">
                                    <PiggyBank size={18} className="text-red-500" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-foreground">${calculations.revenueNeededToRecover.toLocaleString()} in revenue</div>
                                    <div className="text-xs text-foreground/40 font-medium">Needed to earn back at typical margins</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-md bg-red-50 flex items-center justify-center shrink-0">
                                    <CalendarDays size={18} className="text-red-500" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-foreground">${Math.round(calculations.totalYearlyLoss / 365).toLocaleString()}/day</div>
                                    <div className="text-xs text-foreground/40 font-medium">Leaking every single day you operate</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category Breakdown */}
                    <div className="bg-white rounded-md border border-foreground/5 p-8 md:p-10 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-md bg-foreground/5 flex items-center justify-center">
                                <BarChart3 size={18} className="text-foreground/60" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold tracking-tight text-foreground">Leakage Breakdown by Category</h3>
                                <p className="text-xs text-foreground/40 font-medium">Where the money is actually going</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {[
                                { label: "Time Rounding & Discrepancies", yearly: calculations.yearlyInaccuracyLoss, monthly: calculations.monthlyInaccuracyLoss, desc: "Estimated daily rounding errors across your crew (avg 12 min/day per affected worker)" },
                                { label: "Buddy Punching", yearly: calculations.yearlyBuddyPunchLoss, monthly: calculations.monthlyBuddyPunchLoss, desc: "Workers clocking in for absent crew members, common with paper & honor-system setups" },
                                { label: "Payroll Processing Errors", yearly: calculations.yearlyPayrollErrors, monthly: calculations.monthlyPayrollErrors, desc: "Data entry mistakes, miscalculations, and manual processing overhead" },
                                { label: "Overtime Misclassification", yearly: calculations.yearlyOTLoss, monthly: calculations.monthlyOTLoss, desc: "OT hours not properly tracked, leading to incorrect pay or compliance risk" },
                            ].map((cat) => {
                                const percentage = calculations.totalYearlyLoss > 0 ? (cat.yearly / calculations.totalYearlyLoss) * 100 : 0;
                                return (
                                    <div key={cat.label} className="space-y-2">
                                        <div className="flex justify-between items-baseline">
                                            <div>
                                                <div className="text-sm font-bold text-foreground">{cat.label}</div>
                                                <div className="text-[11px] text-foreground/35 font-medium mt-0.5">{cat.desc}</div>
                                            </div>
                                            <div className="text-right shrink-0 ml-4">
                                                <span className="text-lg font-bold text-red-600 tabular-nums">${cat.yearly.toLocaleString()}</span>
                                                <span className="text-xs text-foreground/40 font-medium">/yr</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-2.5 bg-foreground/[0.04] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-red-500/70 rounded-full transition-all duration-1000"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <div className="text-[10px] font-bold text-foreground/30">{percentage.toFixed(0)}% of total leakage &middot; ${cat.monthly.toLocaleString()}/mo</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Admin overhead callout */}
                        <div className="mt-8 pt-6 border-t border-foreground/5 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-md bg-amber-50 flex items-center justify-center shrink-0">
                                <Clock size={18} className="text-amber-500" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-foreground">Administrative Overhead</div>
                                <div className="text-[11px] text-foreground/40 font-medium mt-0.5">
                                    Your team spends ~{inputs.hoursPerWeekOnPayroll} hrs/week on manual timesheet processing. That is an estimated <span className="text-amber-600 font-bold">${calculations.yearlyAdminCost.toLocaleString()}</span>/yr in admin labor alone, on top of the direct leakage above.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recovery Forecast — green to contrast with blue CTA below */}
                    <div className="relative overflow-hidden rounded-md bg-gradient-to-br from-emerald-800 to-emerald-950 p-6 text-white shadow-2xl shadow-emerald-900/25 sm:p-8 lg:p-10">
                        <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-emerald-300/15 blur-[80px]" />

                        <div className="relative z-10 min-w-0">
                            <div className="mb-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-100 sm:mb-6 sm:inline-flex sm:max-w-full sm:items-center sm:gap-1.5 sm:rounded-full sm:border sm:border-white/15 sm:bg-white/10 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-wider sm:text-emerald-50">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 sm:h-auto sm:w-auto sm:rounded-none sm:border-0 sm:bg-transparent">
                                    <TrendingUp size={14} className="sm:size-3" />
                                </span>
                                <span className="leading-none sm:hidden">Recovery forecast</span>
                                <span className="hidden leading-snug sm:inline">
                                    Recovery forecast with automated tracking
                                </span>
                            </div>

                            <div className="mb-8 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-8">
                                <div className="min-w-0">
                                    <div className="mb-1 text-sm font-bold uppercase tracking-widest text-emerald-100/70">
                                        Estimated Annual Recovery
                                    </div>
                                    <div className="text-4xl font-bold tracking-tighter text-white break-words sm:text-5xl lg:text-6xl">
                                        +${calculations.yearlyRecovery.toLocaleString()}
                                    </div>
                                    <div className="mt-1 text-sm font-medium text-emerald-100/80">
                                        ${calculations.monthlyRecovery.toLocaleString()}/month recovered
                                    </div>
                                </div>
                                <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                                    {[
                                        {
                                            icon: Clock,
                                            title: `${calculations.hoursSavedPerYear}h saved`,
                                            description: "Admin time recovered per year",
                                        },
                                        {
                                            icon: DollarSign,
                                            title: `$${calculations.adminSavingsPerYear.toLocaleString()}`,
                                            description: "In admin labor savings",
                                        },
                                        {
                                            icon: Shield,
                                            title: "95%+ accuracy",
                                            description: "GPS-verified time tracking",
                                        },
                                        {
                                            icon: Zap,
                                            title: "Week 1 ROI",
                                            description: "Most teams see results immediately",
                                        },
                                    ].map((stat) => {
                                        const Icon = stat.icon;
                                        return (
                                            <div
                                                key={stat.title}
                                                className="flex min-w-0 items-start gap-3 rounded-md border border-white/10 bg-white/10 px-3 py-3 sm:px-4"
                                            >
                                                <Icon
                                                    size={18}
                                                    className="mt-0.5 shrink-0 text-emerald-200"
                                                />
                                                <div className="min-w-0">
                                                    <div className="text-base font-bold leading-tight sm:text-lg">
                                                        {stat.title}
                                                    </div>
                                                    <div className="text-xs font-medium leading-snug text-emerald-100/60">
                                                        {stat.description}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <a
                                href="#calculator-next-step"
                                className="mt-10 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-center text-sm font-bold text-white shadow-sm transition-all hover:bg-white/20 sm:w-fit sm:justify-start"
                            >
                                Book a call about these numbers
                                <ChevronRight className="size-4 opacity-90" />
                            </a>
                        </div>
                    </div>

                    <CTASection
                        variant="calculator"
                        embedded
                        sectionId="calculator-next-step"
                        cluster="tools"
                        templateType="calculator_report"
                        landingPath="/calculator"
                        calculatorContext={{
                            yearlyLoss: calculations.totalYearlyLoss,
                            yearlyRecovery: calculations.yearlyRecovery,
                            tradeType,
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
