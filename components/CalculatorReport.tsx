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
    ChevronRight
} from "lucide-react";
import { type CalculatorInputs, type CalculationResults } from "../lib/calculator-calculations";

// Helper components copied from original SavingsCalculator
const ContactDemoValueColumn = () => {
    return (
        <div className="space-y-6">
            <div className="rounded-md bg-foreground/[0.02] border border-foreground/5 p-6">
                <h4 className="text-sm font-bold text-foreground mb-2">What you get in your custom video:</h4>
                <ul className="space-y-3 text-xs text-foreground/60 font-medium">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>A walk-through of your specific leakages (rounding vs. admin time)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>How other contractors in your trade eliminated these leakages in 7 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>A customized pricing quote based on your actual crew size</span>
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 bg-primary/5 rounded-md border border-primary/10">
                <Shield size={18} className="text-primary shrink-0" />
                <p className="text-[11px] text-foreground/50 leading-relaxed font-semibold">
                    We hate spam. We will only email you this video and follow up once. No persistent cold calls.
                </p>
            </div>
        </div>
    );
};

interface DemoRequestFormProps {
    defaultCrewSize: string;
    defaultMessage: string;
}

const DemoRequestForm = ({ defaultCrewSize, defaultMessage }: DemoRequestFormProps) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [message, setMessage] = React.useState(defaultMessage);
    const [crewSize, setCrewSize] = React.useState(defaultCrewSize);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg("");

        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    company: "",
                    crewSize,
                    currentSoftware: "",
                    message,
                    sourcePage: "/calculator",
                }),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                const data = await response.json();
                setErrorMsg(data.message || "Failed to submit request.");
            }
        } catch {
            setErrorMsg("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-emerald-50 border border-emerald-200 rounded-md p-6 text-center space-y-3">
                <CheckCircle2 className="text-emerald-500 size-10 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-800">Demo Request Received</h4>
                <p className="text-sm text-emerald-600 leading-relaxed font-medium">
                    Thank you! We have received your request. Our team will prepare your personalized video and email it to you shortly.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && <p className="text-xs text-red-500 font-semibold">{errorMsg}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest block">Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded border border-foreground/15 bg-white text-foreground placeholder-foreground/25 focus:outline-none focus:border-primary text-sm font-medium"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest block">Work Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full px-3.5 py-2.5 rounded border border-foreground/15 bg-white text-foreground placeholder-foreground/25 focus:outline-none focus:border-primary text-sm font-medium"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest block">Phone Number</label>
                    <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 555-5555"
                        className="w-full px-3.5 py-2.5 rounded border border-foreground/15 bg-white text-foreground placeholder-foreground/25 focus:outline-none focus:border-primary text-sm font-medium"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest block">Crew Size</label>
                    <select
                        value={crewSize}
                        onChange={(e) => setCrewSize(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded border border-foreground/15 bg-white text-foreground focus:outline-none focus:border-primary text-sm font-medium"
                    >
                        <option value="1_5">1-5 workers</option>
                        <option value="6_15">6-15 workers</option>
                        <option value="16_40">16-40 workers</option>
                        <option value="40_plus">40+ workers</option>
                    </select>
                </div>
            </div>
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest block">Message (Optional)</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded border border-foreground/15 bg-white text-foreground placeholder-foreground/25 focus:outline-none focus:border-primary text-sm font-medium"
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-primary/95 transition-all text-sm flex items-center justify-center gap-2"
            >
                {isSubmitting ? "Submitting..." : "Submit Request"}
                <ArrowRight size={16} />
            </button>
        </form>
    );
};

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

    const crewSizeToLeadBucket = (size: number): string => {
        if (size <= 5) return "1_5";
        if (size <= 15) return "6_15";
        if (size <= 40) return "16_40";
        return "40_plus";
    };

    const calculatorLeadMessage = `Calculator audit results:
Est. Annual Leakage: $${calculations.totalYearlyLoss.toLocaleString("en-US")}
Est. Monthly Leakage: $${calculations.totalMonthlyLoss.toLocaleString("en-US")}
Recovery Potential: $${calculations.yearlyRecovery.toLocaleString("en-US")}/yr
Risk level: ${calculations.riskLevel} (${calculations.riskScore}/100)`;

    return (
        <section id="calculator-report" className="scroll-mt-32 bg-background py-10">
            <div className="layout-shell">
                <div className="mx-auto max-w-6xl space-y-8">

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

                    {/* Recovery Forecast */}
                    <div className="bg-primary rounded-md p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-bold uppercase tracking-wider mb-6">
                                <TrendingUp size={12} />
                                Recovery Forecast with Automated Tracking
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                <div>
                                    <div className="text-sm font-bold opacity-50 uppercase tracking-widest mb-1">Estimated Annual Recovery</div>
                                    <div className="text-5xl md:text-6xl font-bold tracking-tighter text-secondary">
                                        +${calculations.yearlyRecovery.toLocaleString()}
                                    </div>
                                    <div className="text-sm opacity-60 font-medium mt-1">${calculations.monthlyRecovery.toLocaleString()}/month recovered</div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-md border border-white/10">
                                        <Clock size={18} className="text-secondary shrink-0" />
                                        <div>
                                            <div className="text-lg font-bold">{calculations.hoursSavedPerYear}h saved</div>
                                            <div className="text-xs opacity-50 font-medium">Admin time recovered per year</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-md border border-white/10">
                                        <DollarSign size={18} className="text-secondary shrink-0" />
                                        <div>
                                            <div className="text-lg font-bold">${calculations.adminSavingsPerYear.toLocaleString()}</div>
                                            <div className="text-xs opacity-50 font-medium">In admin labor savings</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-md border border-white/10">
                                        <Shield size={18} className="text-secondary shrink-0" />
                                        <div>
                                            <div className="text-lg font-bold">95%+ accuracy</div>
                                            <div className="text-xs opacity-50 font-medium">GPS-verified time tracking</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-md border border-white/10">
                                        <Zap size={18} className="text-secondary shrink-0" />
                                        <div>
                                            <div className="text-lg font-bold">Week 1 ROI</div>
                                            <div className="text-xs opacity-50 font-medium">Most teams see results immediately</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="#calculator-next-step"
                                className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-white/20"
                            >
                                Get a demo matched to these numbers
                                <ChevronRight className="size-4 opacity-90" />
                            </a>
                        </div>
                    </div>

                    {/* Next step: same value props + form as /contact */}
                    <div id="calculator-next-step" className="relative scroll-mt-28">
                        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_70%)]" />

                        <div className="relative mb-10 max-w-4xl">
                            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                Get a personalized demo + quote
                            </p>
                            <h3 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                                See how Crewtrace fits your operation
                            </h3>
                            <p className="mt-5 text-lg font-medium leading-relaxed text-foreground/60 md:text-xl">
                                You just ran the profit audit—now tell us a bit about your crews and we&apos;ll email one personalized video with your demo and quote, matched to your crew size and trade. Watch on your own time. No sales call required.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
                            <ContactDemoValueColumn />

                            <div className="rounded-md border border-foreground/10 bg-white p-7 shadow-xl md:p-9">
                                <div className="mb-7">
                                    <h2 className="text-xl font-bold text-foreground">
                                        Request your personalized demo + quote
                                    </h2>
                                    <p className="mt-1.5 text-sm text-foreground/50 leading-relaxed">
                                        Takes about 60 seconds. No commitment.
                                    </p>
                                    <p className="mt-3 text-sm text-foreground/45 leading-relaxed">
                                        We&apos;ve pre-filled crew size and a short note from your audit—you can edit before you send.
                                    </p>
                                </div>
                                <DemoRequestForm
                                    key={`${crewSize}-${jobSites}-${trackingMethod}-${calculations.totalYearlyLoss}`}
                                    defaultCrewSize={crewSizeToLeadBucket(crewSize)}
                                    defaultMessage={calculatorLeadMessage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
