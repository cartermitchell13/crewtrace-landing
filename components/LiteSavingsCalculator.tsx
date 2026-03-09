"use client";

import { useState, useMemo, useCallback, useEffect, useRef, type PointerEvent } from "react";
import { Calculator, ArrowRight, TrendingDown } from "lucide-react";

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit?: string;
    prefix?: string;
    onChange: (value: number) => void;
}

const Slider = ({ label, value, min, max, step, unit = "", prefix = "", onChange }: SliderProps) => {
    const percentage = ((value - min) / (max - min)) * 100;

    const updateValueFromPointer = useCallback(
        (clientX: number, container: HTMLDivElement) => {
            const { left, width } = container.getBoundingClientRect();
            if (width <= 0) return;

            const ratio = Math.max(0, Math.min(1, (clientX - left) / width));
            const rawValue = min + ratio * (max - min);
            const steppedValue = min + Math.round((rawValue - min) / step) * step;
            const clampedValue = Math.max(min, Math.min(max, steppedValue));

            onChange(clampedValue);
        },
        [min, max, step, onChange]
    );

    const handlePointerDown = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            updateValueFromPointer(event.clientX, event.currentTarget);
        },
        [updateValueFromPointer]
    );

    const handlePointerMove = useCallback(
        (event: PointerEvent<HTMLDivElement>) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
            updateValueFromPointer(event.clientX, event.currentTarget);
        },
        [updateValueFromPointer]
    );

    const handlePointerRelease = useCallback((event: PointerEvent<HTMLDivElement>) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <label className="text-[11px] font-bold text-white/80 uppercase tracking-widest">
                    {label}
                </label>
                <div className="text-2xl md:text-3xl font-bold tabular-nums text-white">
                    {prefix}{value.toLocaleString()}<span className="text-sm font-medium text-white/60 ml-1">{unit}</span>
                </div>
            </div>
            <div
                className="relative py-4 z-10 touch-none select-none group"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerRelease}
                onPointerCancel={handlePointerRelease}
            >
                {/* Glow effect for slider handle on hover */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 h-8 w-8 bg-[#635BFF]/50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ left: `calc(${percentage}% - 16px)` }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="savings-slider"
                    style={{
                        backgroundImage: `linear-gradient(to right, #635BFF 0%, #635BFF ${percentage}%, rgba(255,255,255,0.15) ${percentage}%, rgba(255,255,255,0.15) 100%)`,
                    }}
                />
            </div>
        </div>
    );
};

export default function LiteSavingsCalculator() {
    const [crewSize, setCrewSize] = useState(12);
    const [avgHourlyRate, setAvgHourlyRate] = useState(25);
    const [adminHours, setAdminHours] = useState(5);
    const [showAuditCue, setShowAuditCue] = useState(false);
    const cueTimeoutRef = useRef<number | null>(null);

    const triggerAuditCue = useCallback(() => {
        setShowAuditCue(true);

        if (cueTimeoutRef.current !== null) {
            window.clearTimeout(cueTimeoutRef.current);
        }

        cueTimeoutRef.current = window.setTimeout(() => {
            setShowAuditCue(false);
            cueTimeoutRef.current = null;
        }, 2200);
    }, []);

    const handleCrewSizeChange = useCallback((value: number) => {
        setCrewSize(value);
        triggerAuditCue();
    }, [triggerAuditCue]);

    const handleAvgHourlyRateChange = useCallback((value: number) => {
        setAvgHourlyRate(value);
        triggerAuditCue();
    }, [triggerAuditCue]);

    const handleAdminHoursChange = useCallback((value: number) => {
        setAdminHours(value);
        triggerAuditCue();
    }, [triggerAuditCue]);

    useEffect(() => {
        return () => {
            if (cueTimeoutRef.current !== null) {
                window.clearTimeout(cueTimeoutRef.current);
            }
        };
    }, []);

    const calculations = useMemo(() => {
        const tradeMult = 1.0;
        const trackMult = 1.3;
        const otMult = 1.15;
        const siteMult = 1.0;
        const combinedMult = tradeMult * trackMult * otMult * siteMult;

        const avgMinutesDiscrepancyPerDayPerWorker = 12;
        const percentWithDiscrepancies = 0.40;
        const weeksPerYear = 52;

        const discrepancyMinutesPerWeek = avgMinutesDiscrepancyPerDayPerWorker * 5;
        const workersWithDiscrepancies = Math.ceil(crewSize * percentWithDiscrepancies);
        const totalDiscrepancyHoursPerWeek = (discrepancyMinutesPerWeek * workersWithDiscrepancies) / 60;
        const yearlyInaccuracyLoss = totalDiscrepancyHoursPerWeek * avgHourlyRate * combinedMult * weeksPerYear;

        const totalWeeklyPayroll = crewSize * 40 * avgHourlyRate;
        const payrollErrorRate = 0.015 * trackMult;
        const yearlyPayrollErrors = totalWeeklyPayroll * payrollErrorRate * weeksPerYear;

        const buddyPunchRate = 0.015;
        const yearlyBuddyPunchLoss = totalWeeklyPayroll * buddyPunchRate * weeksPerYear;

        const adminHourlyRate = 25;
        const yearlyAdminCost = adminHours * adminHourlyRate * weeksPerYear;

        const totalYearlyLoss = yearlyInaccuracyLoss + yearlyPayrollErrors + yearlyBuddyPunchLoss + yearlyAdminCost;
        const monthlyLoss = totalYearlyLoss / 12;

        return {
            totalYearlyLoss: Math.round(totalYearlyLoss),
            monthlyLoss: Math.round(monthlyLoss),
        };
    }, [crewSize, avgHourlyRate, adminHours]);

    return (
        <section className="py-24 md:py-32 px-6 bg-background overflow-hidden relative scroll-mt-32">
            {/* Background design accents */}
            <div className="absolute top-1/2 left-0 w-full h-[500px] bg-primary/[0.01] -skew-y-6 transform-gpu blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 items-center">

                    {/* Left: Content */}
                    <div className="space-y-8 lg:max-w-lg">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                            <Calculator size={14} />
                            <span>Savings Estimator</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.05]">
                            Stop leaking profit from your field operations.
                        </h2>
                        <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                            Most construction companies lose <span className="text-foreground font-bold">3-5%</span> of their total payroll to manual time tracking errors, rounding, and administrative overhead.
                        </p>
                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-semibold text-foreground/70">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Buddy Punching
                                </li>
                                <li className="flex items-center gap-3 text-sm font-semibold text-foreground/70">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Inflated Hours
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-semibold text-foreground/70">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Data Entry Errors
                                </li>
                                <li className="flex items-center gap-3 text-sm font-semibold text-foreground/70">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Payroll Processing Time
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Massive Calculator Card */}
                    <div className="relative w-full">
                        {/* Dramatic glow behind the dark calculator */}
                        <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-[80px] -z-10 transform-gpu" />

                        <div className="bg-[#0A0E17] rounded-[2rem] md:rounded-[3rem] border border-white/10 p-6 md:p-12 shadow-[0_20px_80px_-20px_rgba(47,39,206,0.5)] relative z-10 flex flex-col gap-10">

                            {/* Sliders Area */}
                            <div className="space-y-8">
                                <Slider
                                    label="Crew Size"
                                    value={crewSize}
                                    min={3}
                                    max={100}
                                    step={1}
                                    unit="workers"
                                    onChange={handleCrewSizeChange}
                                />
                                <Slider
                                    label="Avg. Hourly Rate"
                                    value={avgHourlyRate}
                                    min={15}
                                    max={80}
                                    step={1}
                                    prefix="$"
                                    unit="/hr"
                                    onChange={handleAvgHourlyRateChange}
                                />
                                <Slider
                                    label="Weekly Admin Time"
                                    value={adminHours}
                                    min={1}
                                    max={40}
                                    step={1}
                                    unit="hrs"
                                    onChange={handleAdminHoursChange}
                                />
                            </div>

                            {/* Massive Results Area */}
                            <div className="pt-10 border-t border-white/10 mt-2 relative">
                                <div className="absolute -top-[1px] left-0 right-0 h-[10px] bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-[8px]" />

                                <div className="flex flex-col gap-2 mb-8">
                                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs md:text-sm uppercase tracking-widest">
                                        <TrendingDown size={16} />
                                        Estimated Annual Leakage
                                    </div>
                                    <div className="text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-extrabold tracking-tighter text-white tabular-nums drop-shadow-lg leading-none py-2">
                                        ${calculations.totalYearlyLoss.toLocaleString()}
                                    </div>
                                    <div className="text-base text-white/40 font-medium">
                                        That&apos;s <span className="text-[#B2ACFF] italic font-bold">~${calculations.monthlyLoss.toLocaleString()}</span> per month in preventable losses.
                                    </div>
                                </div>

                                <div className="relative mt-10">
                                    <p
                                        className={`pointer-events-none absolute -top-4 right-6 rounded-full bg-[#635BFF] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300 shadow-lg border border-white/20 z-20 ${showAuditCue ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                                            }`}
                                    >
                                        Next best step
                                    </p>
                                    <a
                                        href="https://cal.com/crewtrace/15min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full bg-white text-[#0A0E17] font-bold py-5 md:py-6 rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-3 text-base md:text-lg border-2 ${showAuditCue
                                            ? "border-primary shadow-[0_0_0_8px_rgba(47,39,206,0.2)] animate-[pulse_2s_ease-in-out_infinite]"
                                            : "border-transparent"
                                            }`}
                                    >
                                        Book your free audit call
                                        <ArrowRight size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

