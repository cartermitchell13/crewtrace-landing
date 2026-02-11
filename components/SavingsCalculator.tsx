"use client";

import { useState, useMemo, useEffect } from "react";
import { Calculator, DollarSign, Clock, TrendingDown, TrendingUp, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

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
            <div className="relative h-10 flex items-center touch-none">
                <div className="absolute w-full h-1.5 bg-foreground/[0.03] rounded-full overflow-hidden border border-foreground/[0.02] pointer-events-none">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(47,39,206,0.2)]"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 touch-auto"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                />
                <div
                    className="absolute h-5 w-5 bg-white border-2 border-primary rounded-full shadow-md transition-all duration-300 pointer-events-none z-0"
                    style={{ left: `calc(${percentage}% - 10px)` }}
                />
            </div>
        </div>
    );
};

interface MiniStatProps {
    label: string;
    value: string;
    icon: React.ElementType;
    isLoss?: boolean;
}

const MiniStat = ({ label, value, icon: Icon, isLoss }: MiniStatProps) => (
    <div className="bg-white p-5 rounded-3xl border border-foreground/5 shadow-sm">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${isLoss ? 'bg-red-50 text-red-500' : 'bg-primary/5 text-primary'}`}>
            <Icon size={16} />
        </div>
        <div className={`text-xl font-bold tracking-tight mb-0.5 ${isLoss ? 'text-red-600' : 'text-foreground'}`}>{value}</div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">{label}</div>
    </div>
);

export default function SavingsCalculator() {
    const [crewSize, setCrewSize] = useState(12);
    const [avgHourlyRate, setAvgHourlyRate] = useState(15);
    const [hoursPerWeekOnPayroll, setHoursPerWeekOnPayroll] = useState(5);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => setIsLoaded(true), []);

    const calculations = useMemo(() => {
        const avgMinutesDiscrepancyPerDayPerWorker = 12;
        const percentWithDiscrepancies = 0.40;
        const workDaysPerWeek = 5;
        const weeksPerMonth = 4.33;
        const weeksPerYear = 52;

        const discrepancyMinutesPerWeek = avgMinutesDiscrepancyPerDayPerWorker * workDaysPerWeek;
        const workersWithDiscrepancies = Math.ceil(crewSize * percentWithDiscrepancies);
        const totalDiscrepancyHoursPerWeek = (discrepancyMinutesPerWeek * workersWithDiscrepancies) / 60;
        const weeklyInaccuracyLoss = totalDiscrepancyHoursPerWeek * avgHourlyRate;
        const monthlyInaccuracyLoss = weeklyInaccuracyLoss * weeksPerMonth;
        const yearlyInaccuracyLoss = weeklyInaccuracyLoss * weeksPerYear;

        const totalWeeklyPayroll = crewSize * 40 * avgHourlyRate;
        const payrollErrorRate = 0.015;
        const weeklyPayrollErrors = totalWeeklyPayroll * payrollErrorRate;
        const monthlyPayrollErrors = weeklyPayrollErrors * weeksPerMonth;
        const yearlyPayrollErrors = weeklyPayrollErrors * weeksPerYear;

        const inaccuracyReduction = 0.95;
        const payrollErrorReduction = 0.90;
        const payrollTimeReduction = 0.80;

        const monthlyInaccuracySavings = monthlyInaccuracyLoss * inaccuracyReduction;
        const monthlyPayrollErrorSavings = monthlyPayrollErrors * payrollErrorReduction;
        const hoursSavedPerYear = Math.round(hoursPerWeekOnPayroll * 52 * payrollTimeReduction);

        const totalMonthlySavings = monthlyInaccuracySavings + monthlyPayrollErrorSavings;
        const totalYearlySavings = totalMonthlySavings * 12;

        const totalYearlyLoss = yearlyInaccuracyLoss + yearlyPayrollErrors;

        return {
            monthlyInaccuracyLoss: Math.round(monthlyInaccuracyLoss),
            monthlyPayrollErrors: Math.round(monthlyPayrollErrors),
            totalYearlyLoss: Math.round(totalYearlyLoss),
            hoursSavedPerYear,
            totalYearlySavings: Math.round(totalYearlySavings),
            workersAffected: workersWithDiscrepancies
        };
    }, [crewSize, avgHourlyRate, hoursPerWeekOnPayroll]);

    return (
        <section id="calculator" className="py-32 px-6 bg-[#FBFBFE] relative overflow-hidden scroll-mt-32">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-stretch">

                    {/* Input Side - The "Dashboard Controls" */}
                    <div className="lg:w-[40%] space-y-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                                <Calculator size={12} />
                                <span>Profit Leakage Audit</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
                                See the <span className="text-primary italic">real cost</span> of paper tracking.
                            </h2>
                            <p className="text-lg text-foreground/50 font-medium leading-relaxed max-w-md">
                                Most GCs lose 2-4% of total profit to payroll leakage. Use the sliders to find your numbers.
                            </p>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-foreground/5 p-8 md:p-10 shadow-sm space-y-10 ring-1 ring-foreground/5 relative">
                            <Slider
                                label="Crew Size"
                                description="Field workers tracking time"
                                value={crewSize}
                                min={3}
                                max={100}
                                step={1}
                                unit=" workers"
                                onChange={setCrewSize}
                            />

                            <Slider
                                label="Average Rate"
                                description="Loaded hourly rate ($/hr)"
                                value={avgHourlyRate}
                                min={10}
                                max={85}
                                step={1}
                                prefix="$"
                                unit="/hr"
                                onChange={setAvgHourlyRate}
                            />

                            <Slider
                                label="Payroll Admin"
                                description="Hours spent weekly on timesheets"
                                value={hoursPerWeekOnPayroll}
                                min={1}
                                max={20}
                                step={1}
                                unit=" hrs/wk"
                                onChange={setHoursPerWeekOnPayroll}
                            />

                            <div className="pt-6 border-t border-foreground/5 flex items-start gap-3">
                                <AlertCircle size={16} className="text-foreground/30 mt-0.5" />
                                <p className="text-[11px] text-foreground/40 leading-normal font-medium italic">
                                    Calculations based on 2024 construction industry benchmarks for manual time tracking inaccuracy.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Results Side - The "Profit Report" */}
                    <div className="lg:w-[60%] flex flex-col justify-between py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Current Loss Card */}
                            <div className="md:col-span-2 bg-white rounded-[2.5rem] border-2 border-red-500/20 p-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 text-red-500/20 group-hover:text-red-500/30 transition-colors">
                                    <TrendingDown size={120} strokeWidth={1} />
                                </div>
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider mb-4">
                                            <AlertCircle size={12} />
                                            Annual Profit Leakage
                                        </div>
                                        <div className="text-6xl md:text-7xl font-bold tracking-tighter text-red-600 tabular-nums">
                                            ${calculations.totalYearlyLoss.toLocaleString()}
                                        </div>
                                        <p className="mt-4 text-foreground/50 font-medium max-w-[280px]">
                                            This is capital you are currently losing to inaccurate rounding and paper records.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-4 w-full md:w-auto">
                                        <MiniStat
                                            label="Monthly Discrepancy"
                                            value={`$${calculations.monthlyInaccuracyLoss.toLocaleString()}`}
                                            icon={Clock}
                                            isLoss
                                        />
                                        <MiniStat
                                            label="Payroll Errors"
                                            value={`$${calculations.monthlyPayrollErrors.toLocaleString()}`}
                                            icon={DollarSign}
                                            isLoss
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Savings Forecast */}
                            <div className="md:col-span-2 bg-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-125" />

                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-stretch gap-10">
                                    <div className="flex-1 space-y-6">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-bold uppercase tracking-wider">
                                            <TrendingUp size={12} />
                                            Recovery Forecast
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold opacity-60 uppercase tracking-widest mb-1">Estimated Annual Recovery</div>
                                            <div className="text-6xl font-bold tracking-tighter text-secondary">
                                                +${calculations.totalYearlySavings.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 py-2">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-2xl border border-white/10">
                                                <Clock size={16} className="text-secondary" />
                                                <span className="text-lg font-bold">{calculations.hoursSavedPerYear}h <span className="text-sm font-medium opacity-60">saved/yr</span></span>
                                            </div>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-2xl border border-white/10">
                                                <CheckCircle2 size={16} className="text-secondary" />
                                                <span className="text-lg font-bold">1 week <span className="text-sm font-medium opacity-60">ROI</span></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-end gap-6">
                                        <button className="bg-white text-primary hover:bg-white/90 active:scale-95 transition-all font-bold px-10 py-5 rounded-2xl shadow-xl shadow-black/10 flex items-center justify-center gap-3 text-lg group whitespace-nowrap">
                                            Reclaim Your Profit
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <div className="flex flex-col gap-1 text-center">
                                            <p className="text-white/40 text-xs font-medium">
                                                Verified accuracy from day 1. Zero risk implementation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Methodology Footnote */}
                <div className="mt-20 pt-10 border-t border-foreground/[0.03]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40">The Leakage Math</h4>
                            <p className="text-xs text-foreground/30 leading-relaxed font-medium">
                                Calculated using an industry-standard 12-minute daily discrepancy per worker (rounding & buddy punching) affecting 40% of field staff.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Error Benchmarks</h4>
                            <p className="text-xs text-foreground/30 leading-relaxed font-medium">
                                Includes a conservative 1.5% manual payroll error rate covering data entry mistakes, miscalculations, and processing overhead.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40">Recovery Logic</h4>
                            <p className="text-xs text-foreground/30 leading-relaxed font-medium">
                                Forecast assumes Crewtrace captures 95% of discrepancies and eliminates 80% of administrative overhead through automated sync.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
