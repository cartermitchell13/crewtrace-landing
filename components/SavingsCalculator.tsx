"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
    Calculator, DollarSign, Clock, TrendingDown, TrendingUp,
    ArrowRight, AlertCircle, CheckCircle2, Users, MapPin,
    FileSpreadsheet, HardHat, Zap, BarChart3, Shield,
    ChevronRight, Loader2, Truck, PiggyBank, CalendarDays
} from "lucide-react";

// ─── Sub-components ─────────────────────────────────────────────

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit?: string;
    prefix?: string;
    onChange: (value: number) => void;
    description?: string;
}

const Slider = ({ label, value, min, max, step, unit = "", prefix = "", onChange, description }: SliderProps) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return (
        <div className="group space-y-4">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <label className="text-sm font-bold text-foreground/80 lowercase tracking-tight flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {label}
                    </label>
                    {description && (
                        <p className="text-[11px] text-foreground/40 font-medium">{description}</p>
                    )}
                </div>
                <div className="text-2xl font-bold tabular-nums tracking-tight text-primary">
                    {prefix}{value.toLocaleString()}<span className="text-sm font-medium text-foreground/40 ml-0.5">{unit}</span>
                </div>
            </div>
            <div className="relative py-4 z-10">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="savings-slider"
                    style={{
                        backgroundImage: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, rgba(0,0,0,0.03) ${percentage}%, rgba(0,0,0,0.03) 100%)`,
                    }}
                />
            </div>
        </div>
    );
};

interface OptionCardProps {
    label: string;
    description: string;
    icon: React.ElementType;
    selected: boolean;
    onClick: () => void;
}

const OptionCard = ({ label, description, icon: Icon, selected, onClick }: OptionCardProps) => (
    <button
        type="button"
        onClick={onClick}
        className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${selected
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-foreground/5 bg-white hover:border-foreground/10 hover:bg-foreground/[0.02]"
            }`}
    >
        <div className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${selected ? "bg-primary text-white" : "bg-foreground/5 text-foreground/40"}`}>
                <Icon size={16} />
            </div>
            <div>
                <div className={`text-sm font-bold ${selected ? "text-primary" : "text-foreground/70"}`}>{label}</div>
                <div className="text-[11px] text-foreground/40 font-medium mt-0.5">{description}</div>
            </div>
        </div>
    </button>
);

// ─── Loading step component ─────────────────────────────────────

interface LoadingStepProps {
    label: string;
    active: boolean;
    completed: boolean;
}

const LoadingStep = ({ label, active, completed }: LoadingStepProps) => (
    <div className={`flex items-center gap-3 py-3 transition-all duration-500 ${active ? "opacity-100" : completed ? "opacity-50" : "opacity-20"}`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${completed ? "bg-primary text-white" : active ? "bg-primary/10 text-primary" : "bg-foreground/5 text-foreground/20"}`}>
            {completed ? (
                <CheckCircle2 size={14} />
            ) : active ? (
                <Loader2 size={14} className="animate-spin" />
            ) : (
                <div className="w-2 h-2 rounded-full bg-current" />
            )}
        </div>
        <span className={`text-sm font-semibold transition-colors duration-300 ${active ? "text-foreground" : completed ? "text-foreground/50" : "text-foreground/20"}`}>
            {label}
        </span>
    </div>
);


// ─── Report stat cards ──────────────────────────────────────────

interface ReportStatProps {
    label: string;
    value: string;
    sublabel?: string;
    icon: React.ElementType;
    variant?: "loss" | "neutral" | "saving";
}

const ReportStat = ({ label, value, sublabel, icon: Icon, variant = "neutral" }: ReportStatProps) => {
    const colors = {
        loss: "bg-red-50 text-red-500 border-red-100",
        neutral: "bg-foreground/[0.03] text-foreground/60 border-foreground/5",
        saving: "bg-primary/5 text-primary border-primary/10",
    };
    const textColors = {
        loss: "text-red-600",
        neutral: "text-foreground",
        saving: "text-primary",
    };
    return (
        <div className={`bg-white rounded-2xl border ${variant === "loss" ? "border-red-100" : variant === "saving" ? "border-primary/10" : "border-foreground/5"} p-5 shadow-sm`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colors[variant]}`}>
                <Icon size={16} />
            </div>
            <div className={`text-2xl font-bold tracking-tight mb-0.5 ${textColors[variant]}`}>{value}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">{label}</div>
            {sublabel && <div className="text-[11px] text-foreground/30 font-medium mt-1">{sublabel}</div>}
        </div>
    );
};

// ─── Types ──────────────────────────────────────────────────────

type TradeType = "residential" | "commercial" | "industrial" | "mixed";
type TrackingMethod = "paper" | "spreadsheet" | "basic-app" | "none";
type OvertimeLevel = "low" | "moderate" | "high";
type Phase = "input" | "generating" | "report";

const TRADE_OPTIONS: { value: TradeType; label: string; description: string; icon: React.ElementType }[] = [
    { value: "residential", label: "Residential", description: "Single/multi-family homes", icon: HardHat },
    { value: "commercial", label: "Commercial", description: "Office, retail, hospitality", icon: HardHat },
    { value: "industrial", label: "Industrial", description: "Heavy civil, infrastructure", icon: HardHat },
    { value: "mixed", label: "Mixed / GC", description: "Multiple project types", icon: HardHat },
];

const TRACKING_OPTIONS: { value: TrackingMethod; label: string; description: string; icon: React.ElementType }[] = [
    { value: "paper", label: "Paper Timesheets", description: "Handwritten, collected weekly", icon: FileSpreadsheet },
    { value: "spreadsheet", label: "Spreadsheets", description: "Excel or Google Sheets", icon: FileSpreadsheet },
    { value: "basic-app", label: "Basic App", description: "Simple clock-in/out tool", icon: FileSpreadsheet },
    { value: "none", label: "Honor System", description: "No formal tracking", icon: FileSpreadsheet },
];

const OVERTIME_OPTIONS: { value: OvertimeLevel; label: string; description: string; icon: React.ElementType }[] = [
    { value: "low", label: "Rarely", description: "Less than 5% of hours", icon: Clock },
    { value: "moderate", label: "Sometimes", description: "5–15% of total hours", icon: Clock },
    { value: "high", label: "Frequently", description: "15%+ of total hours", icon: Clock },
];


// ─── Main Component ─────────────────────────────────────────────

export default function SavingsCalculator() {
    const [phase, setPhase] = useState<Phase>("input");
    const [loadingStep, setLoadingStep] = useState(0);

    // Inputs
    const [crewSize, setCrewSize] = useState(12);
    const [avgHourlyRate, setAvgHourlyRate] = useState(15);
    const [hoursPerWeekOnPayroll, setHoursPerWeekOnPayroll] = useState(5);
    const [jobSites, setJobSites] = useState(3);
    const [tradeType, setTradeType] = useState<TradeType>("residential");
    const [trackingMethod, setTrackingMethod] = useState<TrackingMethod>("paper");
    const [overtimeLevel, setOvertimeLevel] = useState<OvertimeLevel>("moderate");

    const LOADING_STEPS = [
        "Analyzing your crew configuration...",
        "Calculating discrepancy patterns for your trade...",
        "Running payroll error simulation...",
        "Benchmarking against industry data...",
        "Generating your profit audit report...",
    ];

    // Multipliers based on selections
    const tradeMultipliers: Record<TradeType, number> = {
        residential: 1.0,
        commercial: 1.15,
        industrial: 1.25,
        mixed: 1.2,
    };
    const trackingMultipliers: Record<TrackingMethod, number> = {
        paper: 1.3,
        spreadsheet: 1.1,
        "basic-app": 0.85,
        none: 1.5,
    };
    const overtimeMultipliers: Record<OvertimeLevel, number> = {
        low: 1.0,
        moderate: 1.15,
        high: 1.35,
    };
    const siteMultiplier = 1 + (jobSites - 1) * 0.04;

    const calculations = useMemo(() => {
        const tradeMult = tradeMultipliers[tradeType];
        const trackMult = trackingMultipliers[trackingMethod];
        const otMult = overtimeMultipliers[overtimeLevel];
        const siteMult = siteMultiplier;
        const combinedMult = tradeMult * trackMult * otMult * siteMult;

        const avgMinutesDiscrepancyPerDayPerWorker = 12;
        const percentWithDiscrepancies = 0.40;
        const workDaysPerWeek = 5;
        const weeksPerMonth = 4.33;
        const weeksPerYear = 52;

        const discrepancyMinutesPerWeek = avgMinutesDiscrepancyPerDayPerWorker * workDaysPerWeek;
        const workersWithDiscrepancies = Math.ceil(crewSize * percentWithDiscrepancies);
        const totalDiscrepancyHoursPerWeek = (discrepancyMinutesPerWeek * workersWithDiscrepancies) / 60;
        const weeklyInaccuracyLoss = totalDiscrepancyHoursPerWeek * avgHourlyRate * combinedMult;
        const monthlyInaccuracyLoss = weeklyInaccuracyLoss * weeksPerMonth;
        const yearlyInaccuracyLoss = weeklyInaccuracyLoss * weeksPerYear;

        const totalWeeklyPayroll = crewSize * 40 * avgHourlyRate;
        const payrollErrorRate = 0.015 * trackMult;
        const weeklyPayrollErrors = totalWeeklyPayroll * payrollErrorRate;
        const monthlyPayrollErrors = weeklyPayrollErrors * weeksPerMonth;
        const yearlyPayrollErrors = weeklyPayrollErrors * weeksPerYear;

        // Buddy punching estimate
        const buddyPunchRate = trackingMethod === "paper" ? 0.015 : trackingMethod === "none" ? 0.025 : trackingMethod === "spreadsheet" ? 0.01 : 0.005;
        const weeklyBuddyPunchLoss = totalWeeklyPayroll * buddyPunchRate;
        const monthlyBuddyPunchLoss = weeklyBuddyPunchLoss * weeksPerMonth;
        const yearlyBuddyPunchLoss = weeklyBuddyPunchLoss * weeksPerYear;

        // OT misclassification
        const otRate = overtimeLevel === "high" ? 0.15 : overtimeLevel === "moderate" ? 0.08 : 0.03;
        const weeklyOTHours = totalWeeklyPayroll * otRate / avgHourlyRate;
        const otMisclassRate = trackingMethod === "paper" || trackingMethod === "none" ? 0.12 : 0.06;
        const weeklyOTLoss = weeklyOTHours * otMisclassRate * avgHourlyRate * 0.5;
        const monthlyOTLoss = weeklyOTLoss * weeksPerMonth;
        const yearlyOTLoss = weeklyOTLoss * weeksPerYear;

        // Admin overhead
        const adminHourlyRate = 25;
        const weeklyAdminCost = hoursPerWeekOnPayroll * adminHourlyRate;
        const monthlyAdminCost = weeklyAdminCost * weeksPerMonth;
        const yearlyAdminCost = weeklyAdminCost * weeksPerYear;

        // Totals
        const totalMonthlyLoss = monthlyInaccuracyLoss + monthlyPayrollErrors + monthlyBuddyPunchLoss + monthlyOTLoss;
        const totalYearlyLoss = yearlyInaccuracyLoss + yearlyPayrollErrors + yearlyBuddyPunchLoss + yearlyOTLoss;

        // Recovery
        const inaccuracyReduction = 0.95;
        const payrollErrorReduction = 0.90;
        const buddyPunchReduction = 0.98;
        const otReduction = 0.90;
        const payrollTimeReduction = 0.80;

        const yearlyRecovery =
            (yearlyInaccuracyLoss * inaccuracyReduction) +
            (yearlyPayrollErrors * payrollErrorReduction) +
            (yearlyBuddyPunchLoss * buddyPunchReduction) +
            (yearlyOTLoss * otReduction);
        const monthlyRecovery = yearlyRecovery / 12;
        const hoursSavedPerYear = Math.round(hoursPerWeekOnPayroll * 52 * payrollTimeReduction);
        const adminSavingsPerYear = Math.round(yearlyAdminCost * payrollTimeReduction);

        // Per-worker
        const perWorkerMonthlyLoss = totalMonthlyLoss / crewSize;
        const perWorkerYearlyLoss = totalYearlyLoss / crewSize;

        // Equivalent comparisons
        const truckPayments = totalYearlyLoss / 650;
        const avgNetMarginPercent = tradeType === "industrial" ? 0.05 : tradeType === "commercial" ? 0.06 : 0.08;
        const revenueNeededToRecover = totalYearlyLoss / avgNetMarginPercent;

        // Risk score (1-100)
        const baseRisk = 40;
        const methodRisk = trackingMethod === "paper" ? 25 : trackingMethod === "none" ? 30 : trackingMethod === "spreadsheet" ? 15 : 5;
        const sizeRisk = Math.min(crewSize * 0.3, 15);
        const siteRisk = Math.min(jobSites * 1.5, 10);
        const riskScore = Math.min(Math.round(baseRisk + methodRisk + sizeRisk + siteRisk), 98);
        const riskLevel = riskScore >= 75 ? "High" : riskScore >= 50 ? "Moderate" : "Low";

        return {
            monthlyInaccuracyLoss: Math.round(monthlyInaccuracyLoss),
            yearlyInaccuracyLoss: Math.round(yearlyInaccuracyLoss),
            monthlyPayrollErrors: Math.round(monthlyPayrollErrors),
            yearlyPayrollErrors: Math.round(yearlyPayrollErrors),
            monthlyBuddyPunchLoss: Math.round(monthlyBuddyPunchLoss),
            yearlyBuddyPunchLoss: Math.round(yearlyBuddyPunchLoss),
            monthlyOTLoss: Math.round(monthlyOTLoss),
            yearlyOTLoss: Math.round(yearlyOTLoss),
            monthlyAdminCost: Math.round(monthlyAdminCost),
            yearlyAdminCost: Math.round(yearlyAdminCost),
            totalMonthlyLoss: Math.round(totalMonthlyLoss),
            totalYearlyLoss: Math.round(totalYearlyLoss),
            monthlyRecovery: Math.round(monthlyRecovery),
            yearlyRecovery: Math.round(yearlyRecovery),
            hoursSavedPerYear,
            adminSavingsPerYear,
            perWorkerMonthlyLoss: Math.round(perWorkerMonthlyLoss),
            perWorkerYearlyLoss: Math.round(perWorkerYearlyLoss),
            truckPayments: truckPayments.toFixed(1),
            revenueNeededToRecover: Math.round(revenueNeededToRecover),
            riskScore,
            riskLevel,
            workersAffected: workersWithDiscrepancies,
        };
    }, [crewSize, avgHourlyRate, hoursPerWeekOnPayroll, jobSites, tradeType, trackingMethod, overtimeLevel, siteMultiplier]);

    const handleGenerate = useCallback(() => {
        setPhase("generating");
        setLoadingStep(0);
    }, []);

    // Loading sequence timer
    useEffect(() => {
        if (phase !== "generating") return;

        if (loadingStep < LOADING_STEPS.length) {
            const delay = loadingStep === LOADING_STEPS.length - 1 ? 1200 : 800 + Math.random() * 600;
            const timer = setTimeout(() => setLoadingStep((s) => s + 1), delay);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setPhase("report"), 400);
            return () => clearTimeout(timer);
        }
    }, [phase, loadingStep]);

    const handleReset = useCallback(() => {
        setPhase("input");
        setLoadingStep(0);
    }, []);

    // ─── PHASE: Input ────────────────────────────────────────────

    if (phase === "input") {
        return (
            <section id="calculator" className="py-32 px-6 bg-[#FBFBFE] relative overflow-hidden scroll-mt-32">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="bg-white rounded-[2.5rem] border border-foreground/5 p-8 md:p-12 shadow-sm ring-1 ring-foreground/5">

                        {/* Header */}
                        <div className="space-y-4 mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                                <Calculator size={12} />
                                <span>Profit Leakage Audit</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] text-foreground">
                                Tell us about your operation.
                            </h2>
                            <p className="text-base text-foreground/50 font-medium leading-relaxed max-w-xl">
                                The more accurate your inputs, the more useful your audit. All calculations are based on verified construction industry benchmarks.
                            </p>
                        </div>

                        {/* Sliders */}
                        <div className="space-y-10 mb-12">
                            <Slider
                                label="Crew Size"
                                description="Total field workers tracking time"
                                value={crewSize}
                                min={3}
                                max={100}
                                step={1}
                                unit=" workers"
                                onChange={setCrewSize}
                            />
                            <Slider
                                label="Average Hourly Rate"
                                description="Fully loaded rate per worker ($/hr)"
                                value={avgHourlyRate}
                                min={10}
                                max={85}
                                step={1}
                                prefix="$"
                                unit="/hr"
                                onChange={setAvgHourlyRate}
                            />
                            <Slider
                                label="Active Job Sites"
                                description="Number of sites running simultaneously"
                                value={jobSites}
                                min={1}
                                max={25}
                                step={1}
                                unit=" sites"
                                onChange={setJobSites}
                            />
                            <Slider
                                label="Payroll Admin Time"
                                description="Hours your team spends weekly on timesheets & payroll"
                                value={hoursPerWeekOnPayroll}
                                min={1}
                                max={20}
                                step={1}
                                unit=" hrs/wk"
                                onChange={setHoursPerWeekOnPayroll}
                            />
                        </div>

                        {/* Option selections */}
                        <div className="space-y-10 mb-12">
                            {/* Trade Type */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-foreground/80 lowercase tracking-tight flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    project type
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {TRADE_OPTIONS.map((opt) => (
                                        <OptionCard
                                            key={opt.value}
                                            label={opt.label}
                                            description={opt.description}
                                            icon={opt.icon}
                                            selected={tradeType === opt.value}
                                            onClick={() => setTradeType(opt.value)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Tracking Method */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-foreground/80 lowercase tracking-tight flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    current tracking method
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {TRACKING_OPTIONS.map((opt) => (
                                        <OptionCard
                                            key={opt.value}
                                            label={opt.label}
                                            description={opt.description}
                                            icon={opt.icon}
                                            selected={trackingMethod === opt.value}
                                            onClick={() => setTrackingMethod(opt.value)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Overtime */}
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-foreground/80 lowercase tracking-tight flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    overtime frequency
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {OVERTIME_OPTIONS.map((opt) => (
                                        <OptionCard
                                            key={opt.value}
                                            label={opt.label}
                                            description={opt.description}
                                            icon={opt.icon}
                                            selected={overtimeLevel === opt.value}
                                            onClick={() => setOvertimeLevel(opt.value)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Disclaimer + Generate Button */}
                        <div className="pt-8 border-t border-foreground/5 space-y-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle size={16} className="text-foreground/30 mt-0.5 shrink-0" />
                                <p className="text-[11px] text-foreground/40 leading-normal font-medium italic">
                                    Calculations based on 2024 construction industry benchmarks from APA, FMI, and AGC research on manual time tracking inaccuracy. Your actual results may vary.
                                </p>
                            </div>

                            <button
                                onClick={handleGenerate}
                                className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg group"
                            >
                                <BarChart3 size={20} />
                                Generate My Profit Audit
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ─── PHASE: Generating ───────────────────────────────────────

    if (phase === "generating") {
        return (
            <section id="calculator" className="py-32 px-6 bg-[#FBFBFE] relative overflow-hidden scroll-mt-32">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-2xl mx-auto relative z-10">
                    <div className="bg-white rounded-[2.5rem] border border-foreground/5 p-10 md:p-16 shadow-sm ring-1 ring-foreground/5">
                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <Loader2 size={28} className="text-primary animate-spin" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                                Running your audit...
                            </h2>
                            <p className="text-sm text-foreground/40 font-medium">
                                Crunching numbers for a {crewSize}-person {tradeType} crew across {jobSites} site{jobSites > 1 ? "s" : ""}
                            </p>
                        </div>

                        <div className="space-y-1 mb-10">
                            {LOADING_STEPS.map((step, i) => (
                                <LoadingStep
                                    key={step}
                                    label={step}
                                    active={loadingStep === i}
                                    completed={loadingStep > i}
                                />
                            ))}
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-2 bg-foreground/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${Math.min((loadingStep / LOADING_STEPS.length) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ─── PHASE: Report ───────────────────────────────────────────

    return (
        <section id="calculator" className="py-20 px-6 bg-[#FBFBFE] relative overflow-hidden scroll-mt-32">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10 space-y-8">

                {/* Report Header */}
                <div className="bg-white rounded-[2.5rem] border border-foreground/5 p-8 md:p-12 shadow-sm ring-1 ring-foreground/5">
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
                            onClick={handleReset}
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
                    <div className="bg-white rounded-[2rem] border border-foreground/5 p-8 shadow-sm flex flex-col items-center justify-center text-center">
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
                    <div className="md:col-span-2 bg-white rounded-[2rem] border-2 border-red-500/20 p-8 md:p-10 relative overflow-hidden">
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
                <div className="bg-foreground/[0.02] rounded-[2rem] border border-foreground/5 p-6 md:p-8">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-5">To put that in perspective...</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                <Truck size={18} className="text-red-500" />
                            </div>
                            <div>
                                <div className="text-lg font-bold text-foreground">{calculations.truckPayments} truck payments</div>
                                <div className="text-xs text-foreground/40 font-medium">At $650/mo avg lease payment</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                <PiggyBank size={18} className="text-red-500" />
                            </div>
                            <div>
                                <div className="text-lg font-bold text-foreground">${calculations.revenueNeededToRecover.toLocaleString()} in revenue</div>
                                <div className="text-xs text-foreground/40 font-medium">Needed to earn back at typical margins</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
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
                <div className="bg-white rounded-[2rem] border border-foreground/5 p-8 md:p-10 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
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
                            { label: "Buddy Punching", yearly: calculations.yearlyBuddyPunchLoss, monthly: calculations.monthlyBuddyPunchLoss, desc: "Workers clocking in for absent crew members — common with paper & honor-system setups" },
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
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                            <Clock size={18} className="text-amber-500" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-foreground">Administrative Overhead</div>
                            <div className="text-[11px] text-foreground/40 font-medium mt-0.5">
                                Your team spends ~{hoursPerWeekOnPayroll} hrs/week on manual timesheet processing — that is an estimated <span className="text-amber-600 font-bold">${calculations.yearlyAdminCost.toLocaleString()}/yr</span> in admin labor alone, on top of the direct leakage above.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recovery Forecast */}
                <div className="bg-primary rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
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
                                <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-2xl border border-white/10">
                                    <Clock size={18} className="text-secondary shrink-0" />
                                    <div>
                                        <div className="text-lg font-bold">{calculations.hoursSavedPerYear}h saved</div>
                                        <div className="text-xs opacity-50 font-medium">Admin time recovered per year</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-2xl border border-white/10">
                                    <DollarSign size={18} className="text-secondary shrink-0" />
                                    <div>
                                        <div className="text-lg font-bold">${calculations.adminSavingsPerYear.toLocaleString()}</div>
                                        <div className="text-xs opacity-50 font-medium">In admin labor savings</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-2xl border border-white/10">
                                    <Shield size={18} className="text-secondary shrink-0" />
                                    <div>
                                        <div className="text-lg font-bold">95%+ accuracy</div>
                                        <div className="text-xs opacity-50 font-medium">GPS-verified time tracking</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-2xl border border-white/10">
                                    <Zap size={18} className="text-secondary shrink-0" />
                                    <div>
                                        <div className="text-lg font-bold">Week 1 ROI</div>
                                        <div className="text-xs opacity-50 font-medium">Most teams see results immediately</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Soft CTA */}
                <div className="bg-white rounded-[2rem] border border-foreground/5 p-8 md:p-10 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 space-y-3">
                            <h3 className="text-xl font-bold tracking-tight text-foreground">
                                Want to see if these numbers hold up for your operation?
                            </h3>
                            <p className="text-sm text-foreground/50 font-medium leading-relaxed">
                                On a free 15-minute call, we will walk through your specific setup and tell you exactly what Crewtrace can recover — no commitment, no pressure.
                            </p>
                        </div>
                        <a
                            href="https://cal.com/crewtrace/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 text-base group whitespace-nowrap shrink-0"
                        >
                            Book a Free Audit Call
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Methodology Footer */}
                <div className="pt-8 border-t border-foreground/[0.03]">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Time Discrepancies</h4>
                            <p className="text-[11px] text-foreground/30 leading-relaxed font-medium">
                                Industry-standard 12-min daily discrepancy per worker (rounding & buddy punching) affecting ~40% of field staff, adjusted by trade and tracking method.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Payroll Errors</h4>
                            <p className="text-[11px] text-foreground/30 leading-relaxed font-medium">
                                Conservative 1.5% base error rate for manual processing, scaled by your tracking method. Includes data entry, miscalculation, and processing mistakes.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Site & OT Factors</h4>
                            <p className="text-[11px] text-foreground/30 leading-relaxed font-medium">
                                Multi-site operations compound discrepancies by ~4% per additional site. Overtime misclassification risk scales with OT frequency and tracking rigor.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Recovery Model</h4>
                            <p className="text-[11px] text-foreground/30 leading-relaxed font-medium">
                                Assumes GPS-verified tracking captures 95% of discrepancies, eliminates 98% of buddy punching, and reduces 80% of administrative overhead.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

