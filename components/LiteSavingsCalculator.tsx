"use client";

import { useState, useMemo, useCallback, type PointerEvent } from "react";
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
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <label className="text-[11px] font-bold text-foreground/40 uppercase tracking-wider">
                    {label}
                </label>
                <div className="text-xl font-bold tabular-nums text-primary">
                    {prefix}{value.toLocaleString()}<span className="text-xs font-medium text-foreground/40 ml-0.5">{unit}</span>
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
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="savings-slider"
                    style={{
                        backgroundImage: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, rgba(0,0,0,0.05) ${percentage}%, rgba(0,0,0,0.05) 100%)`,
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

    const calculations = useMemo(() => {
        // Constants matching the main calculator's "Paper" baseline
        const tradeMult = 1.0; // Residential
        const trackMult = 1.3; // Paper
        const otMult = 1.15; // Moderate
        const siteMult = 1.0; // 1 site
        const combinedMult = tradeMult * trackMult * otMult * siteMult;

        const avgMinutesDiscrepancyPerDayPerWorker = 12;
        const percentWithDiscrepancies = 0.40;
        const weeksPerYear = 52;

        // 1. Time Discrepancies
        const discrepancyMinutesPerWeek = avgMinutesDiscrepancyPerDayPerWorker * 5;
        const workersWithDiscrepancies = Math.ceil(crewSize * percentWithDiscrepancies);
        const totalDiscrepancyHoursPerWeek = (discrepancyMinutesPerWeek * workersWithDiscrepancies) / 60;
        const yearlyInaccuracyLoss = totalDiscrepancyHoursPerWeek * avgHourlyRate * combinedMult * weeksPerYear;

        // 2. Payroll Errors
        const totalWeeklyPayroll = crewSize * 40 * avgHourlyRate;
        const payrollErrorRate = 0.015 * trackMult;
        const yearlyPayrollErrors = totalWeeklyPayroll * payrollErrorRate * weeksPerYear;

        // 3. Buddy Punching (Paper baseline)
        const buddyPunchRate = 0.015;
        const yearlyBuddyPunchLoss = totalWeeklyPayroll * buddyPunchRate * weeksPerYear;

        // 4. Admin Overhead
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
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                            <Calculator size={12} />
                            <span>Savings Estimator</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                            Stop leaking profit from your field operations.
                        </h2>
                        <p className="text-lg text-foreground/50 font-medium leading-relaxed">
                            Most construction companies lose 3-5% of their total payroll to manual time tracking errors, rounding, and administrative overhead.
                        </p>
                        
                    </div>

                    {/* Right: Lite Calculator Card */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] -rotate-2 scale-105 blur-2xl -z-10" />
                        <div className="bg-[#FBFBFE] rounded-[2.5rem] border border-foreground/5 p-8 md:p-10 shadow-sm ring-1 ring-foreground/5 relative z-10">
                            <div className="space-y-8">
                                <Slider
                                    label="Crew Size"
                                    value={crewSize}
                                    min={3}
                                    max={100}
                                    step={1}
                                    unit=" workers"
                                    onChange={setCrewSize}
                                />
                                <Slider
                                    label="Avg. Hourly Rate"
                                    value={avgHourlyRate}
                                    min={15}
                                    max={80}
                                    step={1}
                                    prefix="$"
                                    unit="/hr"
                                    onChange={setAvgHourlyRate}
                                />
                                <Slider
                                    label="Weekly Admin Time"
                                    value={adminHours}
                                    min={1}
                                    max={40}
                                    step={1}
                                    unit=" hrs"
                                    onChange={setAdminHours}
                                />

                                <div className="pt-8 border-t border-foreground/5 mt-8">
                                    <div className="flex flex-col gap-1 mb-6">
                                        <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-wider">
                                            <TrendingDown size={14} />
                                            Estimated Annual Leakage
                                        </div>
                                        <div className="text-5xl font-bold tracking-tight text-foreground tabular-nums">
                                            ${calculations.totalYearlyLoss.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-foreground/40 font-medium">
                                            That's ~${calculations.monthlyLoss.toLocaleString()} per month in preventable losses.
                                        </div>
                                    </div>
                                    
                                    <a 
                                        href="https://cal.com/crewtrace/15min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-white border-2 border-primary/10 text-primary font-bold py-4 rounded-xl hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm"
                                    >
                                        Book your free audit call
                                        <ArrowRight size={16} />
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

