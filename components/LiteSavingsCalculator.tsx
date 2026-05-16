"use client";

import { useState, useMemo, useCallback, useId, type PointerEvent } from "react";
import { Calculator, ArrowRight, TrendingDown } from "lucide-react";
import Link from "next/link";

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
    const inputId = useId();

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
                <label htmlFor={inputId} className="text-[11px] font-bold text-foreground/50 uppercase tracking-widest">
                    {label}
                </label>
                <div className="text-2xl md:text-3xl font-bold tabular-nums text-foreground">
                    {prefix}{value.toLocaleString()}<span className="text-sm font-medium text-foreground/40 ml-1">{unit}</span>
                </div>
            </div>
            <div
                className="relative py-4 z-10 touch-none select-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerRelease}
                onPointerCancel={handlePointerRelease}
            >
                <input
                    id={inputId}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="savings-slider"
                    style={{
                        backgroundImage: `linear-gradient(to right, #2F27CE 0%, #2F27CE ${percentage}%, rgba(0,0,0,0.06) ${percentage}%, rgba(0,0,0,0.06) 100%)`,
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

    const handleCrewSizeChange = useCallback((value: number) => {
        setCrewSize(value);
    }, []);

    const handleAvgHourlyRateChange = useCallback((value: number) => {
        setAvgHourlyRate(value);
    }, []);

    const handleAdminHoursChange = useCallback((value: number) => {
        setAdminHours(value);
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
        <section className="relative scroll-mt-32 overflow-hidden bg-background py-24 md:py-32">
            <div className="layout-shell">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-10 lg:gap-12 xl:gap-16 items-stretch">
                    {/* Left: diagonal split on lg — copy top, image slot bottom */}
                    <div className="flex flex-col min-h-0 w-full lg:h-full">
                        <div className="flex flex-col gap-4 lg:gap-0 h-full overflow-hidden rounded-md lg:overflow-visible lg:rounded-none">
                            <div className="rounded-md bg-[#0f0f12] px-8 py-10 sm:px-10 sm:py-12 text-white lg:flex-[1.65] lg:min-h-[400px] lg:rounded-none lg:rounded-t-md lg:pb-20 lg:pt-12 lg:[clip-path:polygon(0_0,100%_0,100%_calc(100%-5.5rem),0_100%)]">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/90 text-[10px] font-bold uppercase tracking-widest mb-8">
                                    <Calculator size={14} className="opacity-90" />
                                    <span>Savings Estimator</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight leading-[1.05] text-balance">
                                    Stop leaking profit from your field operations.
                                </h2>
                                <p className="mt-5 text-lg sm:text-xl text-white/65 font-medium leading-relaxed max-w-prose">
                                    Most crews lose <span className="text-white font-semibold">3–5%</span> of payroll to manual time errors and admin overhead. See what that costs you.
                                </p>
                            </div>

                            <div
                                className="relative min-h-[220px] overflow-hidden rounded-md bg-[url('/images/ct-grid-bg.png')] bg-cover bg-center bg-no-repeat sm:min-h-[240px] lg:min-h-0 lg:flex-1 lg:rounded-none lg:rounded-b-md lg:-mt-[calc(5.5rem-0.875rem)] lg:[clip-path:polygon(0_5.5rem,100%_0,100%_100%,0_100%)]"
                                aria-hidden
                            />
                        </div>
                    </div>

                    {/* Right: Calculator Card */}
                    <div className="relative w-full flex flex-col justify-center lg:min-h-full rounded-md bg-secondary/35 p-1 sm:p-2 lg:p-3">
                        <div className="bg-white rounded-md border border-foreground/10 p-6 md:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] relative z-10 flex flex-col gap-10">

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

                            {/* Results Area */}
                            <div className="pt-10 border-t border-foreground/10 mt-2 relative">
                                <div className="flex flex-col gap-2 mb-8">
                                    <div className="flex items-center gap-2 text-red-600 font-bold text-xs md:text-sm uppercase tracking-widest">
                                        <TrendingDown size={16} />
                                        Estimated Annual Leakage
                                    </div>
                                    <div className="text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-extrabold tracking-tighter text-foreground tabular-nums leading-none py-2">
                                        ${calculations.totalYearlyLoss.toLocaleString()}
                                    </div>
                                    <div className="text-base text-foreground/40 font-medium">
                                        That&apos;s <span className="text-primary italic font-bold">~${calculations.monthlyLoss.toLocaleString()}</span> per month in preventable losses.
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <Link
                                        href="/calculator"
                                        className="w-full bg-primary text-white font-bold py-5 md:py-6 rounded-md hover:bg-primary/90 transition-all flex items-center justify-center gap-3 text-base md:text-lg shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(47,39,206,0.15)] border-2 border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    >
                                        See Your Full Savings Breakdown
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
