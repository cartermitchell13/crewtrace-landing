"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    X,
    CheckCircle2,
    Clock,
    Calculator,
    Users,
    MapPin,
    HardHat,
    AlertCircle,
    User,
    Mail,
    Phone,
    Building2,
    ShieldCheck,
} from "lucide-react";
import { calculateSavings, type CalculatorInputs, type CalculationResults } from "../lib/calculator-calculations";

// List of loading animation statements
const LOADING_STEPS = [
    "Analyzing tracking method inefficiencies...",
    "Calculating rounding leakage...",
    "Estimating overtime errors...",
    "Applying trade type multipliers...",
    "Generating final profit audit report..."
];

const CONTACT_START_STEP = 8;
const CONTACT_END_STEP = 11;
const LOADING_STEP = 12;
const TOTAL_INPUT_STEPS = 11;
const GOOGLE_ADS_CALCULATOR_LEAD_SEND_TO = "AW-18173086361/FiaZCOzI2bAcEJmVzdID";

type ContactField = "name" | "company" | "email" | "phone";
type GtagConversionParams = {
    send_to: string;
    value: number;
    currency: string;
    event_callback?: () => void;
};

type WindowWithGtag = Window & {
    gtag?: (
        command: "event",
        eventName: "conversion",
        params: GtagConversionParams,
    ) => void;
};

const CONTACT_STEPS: Array<{
    field: ContactField;
    label: string;
    placeholder: string;
    inputType: string;
    autoComplete?: string;
    icon: typeof User;
    title: string;
    reason: string;
}> = [
    {
        field: "name",
        label: "Full Name",
        placeholder: "John Doe",
        inputType: "text",
        autoComplete: "name",
        icon: User,
        title: "Who should we address this report to?",
        reason: "We use your name to personalize the audit summary and benchmark it against contractors in your region.",
    },
    {
        field: "company",
        label: "Company Name",
        placeholder: "Acme Construction",
        inputType: "text",
        autoComplete: "organization",
        icon: Building2,
        title: "What company are we auditing?",
        reason: "Company size and trade mix shape your leakage benchmarks — generic averages would mislead you.",
    },
    {
        field: "email",
        label: "Work Email",
        placeholder: "john@company.com",
        inputType: "email",
        autoComplete: "email",
        icon: Mail,
        title: "Where should we send your audit?",
        reason: "We'll deliver your full profit leakage breakdown here — no spam, just the report and one optional follow-up.",
    },
    {
        field: "phone",
        label: "Phone Number",
        placeholder: "(555) 555-5555",
        inputType: "tel",
        autoComplete: "tel",
        icon: Phone,
        title: "What's the best number to reach you?",
        reason: "If we spot something unusual in your numbers, a quick text helps us keep your audit accurate.",
    },
];

function reportCalculatorLeadConversion() {
    if (typeof window === "undefined") {
        return;
    }

    const gtag = (window as WindowWithGtag).gtag;
    if (typeof gtag !== "function") {
        return;
    }

    gtag("event", "conversion", {
        send_to: GOOGLE_ADS_CALCULATOR_LEAD_SEND_TO,
        value: 1.0,
        currency: "USD",
    });
}

function RangeSliderWithTooltip({
    value,
    min,
    max,
    onChange,
    formatValue = (v) => String(v),
}: {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    formatValue?: (value: number) => string;
}) {
    const sliderRef = useRef<HTMLInputElement>(null);
    const [thumbLeftPx, setThumbLeftPx] = useState(0);

    const updateThumbPosition = useCallback(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const styles = getComputedStyle(slider);
        const thumbSize = parseFloat(styles.getPropertyValue("--slider-thumb-size")) || 20;
        const width = slider.getBoundingClientRect().width;
        if (width === 0) return;

        const ratio = (value - min) / (max - min);
        setThumbLeftPx(ratio * (width - thumbSize) + thumbSize / 2);
    }, [value, min, max]);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const scheduleUpdate = () => requestAnimationFrame(updateThumbPosition);

        scheduleUpdate();
        slider.addEventListener("input", scheduleUpdate);

        const observer = new ResizeObserver(scheduleUpdate);
        observer.observe(slider);

        return () => {
            slider.removeEventListener("input", scheduleUpdate);
            observer.disconnect();
        };
    }, [updateThumbPosition]);

    const fillPercent = ((value - min) / (max - min)) * 100;

    return (
        <div className="pt-7">
            <div className="relative">
                <div
                    className="absolute z-10 flex flex-col items-center pointer-events-none bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md transition-[left] duration-75"
                    style={{
                        left: thumbLeftPx,
                        top: "50%",
                        transform: "translate(-50%, calc(-100% - 18px))",
                    }}
                >
                    <span>{formatValue(value)}</span>
                    <div className="w-1.5 h-1.5 bg-primary rotate-45 -mb-0.5" />
                </div>
                <input
                    ref={sliderRef}
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="savings-slider"
                    style={{
                        backgroundImage: `linear-gradient(to right, #2F27CE 0%, #2F27CE ${fillPercent}%, rgba(0,0,0,0.06) ${fillPercent}%, rgba(0,0,0,0.06) 100%)`,
                    }}
                />
            </div>
        </div>
    );
}

interface MultiStepSavingsCalculatorProps {
    onComplete: (inputs: CalculatorInputs, results: CalculationResults) => void;
}

export default function MultiStepSavingsCalculator({ onComplete }: MultiStepSavingsCalculatorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1); // Steps 1 to 11: Inputs, Step 12: Loading

    // Calculator inputs state
    const [trackingMethod, setTrackingMethod] = useState<"paper" | "spreadsheet" | "basic-app" | "none">("paper");
    const [tradeType, setTradeType] = useState<"residential" | "commercial" | "industrial" | "mixed">("residential");
    const [crewSize, setCrewSize] = useState(12);
    const [jobSites, setJobSites] = useState(3);
    const [avgHourlyRate, setAvgHourlyRate] = useState(25);
    const [hoursPerWeekOnPayroll, setHoursPerWeekOnPayroll] = useState(5);
    const [overtimeLevel, setOvertimeLevel] = useState<"low" | "moderate" | "high">("moderate");

    // Contact info state
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Form submission & loading state
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const completionHandledRef = useRef(false);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    // Track if user has touched inputs
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Lock body scroll when modal is open (both axes — modal handles its own vertical scroll)
    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }
        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Teaser first question click handler
    const handleTeaserClick = (method: "paper" | "spreadsheet" | "basic-app" | "none") => {
        setTrackingMethod(method);
        setIsOpen(true);
        setStep(2); // Go to step 2 directly in modal
    };

    // Close modal
    const handleClose = () => {
        setIsOpen(false);
        setStep(1);
    };

    // Go back a step
    const handleBack = () => {
        if (step > 2) {
            setStep(step - 1);
        } else {
            handleClose();
        }
    };

    const renderStepActions = (options?: {
        showNext?: boolean;
        onNext?: () => void;
        nextLabel?: string;
    }) => {
        const { showNext = false, onNext, nextLabel = "Next Step" } = options ?? {};

        return (
            <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex w-full sm:w-auto min-w-[140px] items-center justify-center gap-2 rounded-xl border border-foreground/10 bg-white px-6 py-3.5 text-sm font-bold text-foreground/70 transition-all hover:border-foreground/20 hover:bg-foreground/[0.02] hover:text-foreground cursor-pointer"
                >
                    <ArrowLeft size={16} aria-hidden />
                    <span>Back</span>
                </button>
                {showNext && onNext && (
                    <button
                        type="button"
                        onClick={onNext}
                        className="inline-flex w-full sm:w-auto min-w-[160px] items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_12px_rgba(47,39,206,0.15)] transition-all hover:-translate-y-[1px] hover:bg-primary/95 hover:shadow-[0_6px_20px_rgba(47,39,206,0.25)] cursor-pointer"
                    >
                        <span>{nextLabel}</span>
                        <ArrowRight size={18} aria-hidden />
                    </button>
                )}
            </div>
        );
    };

    // Go forward a step (validated where necessary)
    const handleNext = () => {
        if (step < CONTACT_START_STEP) {
            setStep(step + 1);
        }
    };

    const validateContactField = (field: ContactField): boolean => {
        const errors: Record<string, string> = {};

        if (field === "name" && !name.trim()) errors.name = "Name is required";
        if (field === "company" && !company.trim()) errors.company = "Company name is required";
        if (field === "email") {
            if (!email.trim()) {
                errors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errors.email = "Invalid email address";
            }
        }
        if (field === "phone" && !phone.trim()) errors.phone = "Phone number is required";

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setTouched((prev) => ({ ...prev, [field]: true }));
            return false;
        }

        setFormErrors((prev) => ({ ...prev, [field]: "" }));
        return true;
    };

    const handleContactNext = (field: ContactField) => {
        if (validateContactField(field)) {
            setStep(step + 1);
        }
    };

    const getContactFieldValue = (field: ContactField) => {
        switch (field) {
            case "name":
                return name;
            case "company":
                return company;
            case "email":
                return email;
            case "phone":
                return phone;
        }
    };

    const setContactFieldValue = (field: ContactField, value: string) => {
        switch (field) {
            case "name":
                setName(value);
                break;
            case "company":
                setCompany(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "phone":
                setPhone(value);
                break;
        }
    };

    // Loading step animation
    useEffect(() => {
        if (step !== LOADING_STEP) {
            setLoadingStep(0);
            completionHandledRef.current = false;
            return;
        }

        const timer = setInterval(() => {
            setLoadingStep((prev) =>
                prev < LOADING_STEPS.length - 1 ? prev + 1 : prev
            );
        }, 600);

        return () => clearInterval(timer);
    }, [step]);

    // Finish after the last loading step is shown
    useEffect(() => {
        if (
            step !== LOADING_STEP ||
            loadingStep !== LOADING_STEPS.length - 1 ||
            completionHandledRef.current
        ) {
            return;
        }

        completionHandledRef.current = true;

        const completeTimer = setTimeout(() => {
            const inputs: CalculatorInputs = {
                crewSize,
                avgHourlyRate,
                hoursPerWeekOnPayroll,
                jobSites,
                tradeType,
                trackingMethod,
                overtimeLevel,
            };
            const results = calculateSavings(inputs);
            onCompleteRef.current({ ...inputs, name, company, phone, email }, results);
            setIsOpen(false);
            setStep(1);
        }, 600);

        return () => clearTimeout(completeTimer);
    }, [
        step,
        loadingStep,
        crewSize,
        avgHourlyRate,
        hoursPerWeekOnPayroll,
        jobSites,
        tradeType,
        trackingMethod,
        overtimeLevel,
        name,
        company,
        phone,
        email,
    ]);

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors: Record<string, string> = {};

        if (!name.trim()) errors.name = "Name is required";
        if (!company.trim()) errors.company = "Company name is required";
        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Invalid email address";
        }
        if (!phone.trim()) {
            errors.phone = "Phone number is required";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        reportCalculatorLeadConversion();
        setIsSubmitting(true);

        const inputs: CalculatorInputs = {
            crewSize,
            avgHourlyRate,
            hoursPerWeekOnPayroll,
            jobSites,
            tradeType,
            trackingMethod,
            overtimeLevel,
        };

        const results = calculateSavings(inputs);

        try {
            // Save submission to API
            const response = await fetch("/api/calculator-submission", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    name,
                    company,
                    phone,
                    crewSize,
                    avgHourlyRate,
                    hoursPerWeekOnPayroll,
                    jobSites,
                    tradeType,
                    trackingMethod,
                    overtimeLevel,
                    totalYearlyLoss: results.totalYearlyLoss,
                    totalMonthlyLoss: results.totalMonthlyLoss,
                    yearlyRecovery: results.yearlyRecovery,
                    riskScore: results.riskScore,
                    riskLevel: results.riskLevel,
                }),
            });

            if (!response.ok) {
                let message = "Could not save submission.";
                try {
                    const body = (await response.json()) as { message?: string };
                    if (body.message) message = body.message;
                } catch {
                    // ignore parse errors
                }
                console.warn("Calculator submission API:", message);
            }
        } catch (error) {
            console.error("Error submitting calculator audit:", error);
        } finally {
            setIsSubmitting(false);
            setStep(LOADING_STEP);
        }
    };

    // Helper components for inputs
    const renderTeaser = () => {
        const trackingOptions = [
            { id: "paper" as const, label: "Paper Timesheets" },
            { id: "spreadsheet" as const, label: "Spreadsheets" },
            { id: "basic-app" as const, label: "Basic App" },
            { id: "none" as const, label: "Honor System / None" },
        ];

        return (
            <div className="relative w-full mx-auto">
                {/* Brand glow — pulls the eye to the card */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-4 rounded-[32px] bg-primary/20 blur-2xl md:-inset-6"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-1 rounded-[26px] bg-gradient-to-br from-primary/10 via-secondary/40 to-primary/5"
                />

                <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-white shadow-[0_16px_48px_rgba(47,39,206,0.2),0_4px_20px_rgba(47,39,206,0.1)] ring-1 ring-primary/10">
                    {/* Branded header */}
                    <div className="border-b border-primary/10 bg-gradient-to-b from-secondary/50 to-white px-8 pb-6 pt-8 text-center md:px-10 md:pb-7 md:pt-9">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_10px_28px_rgba(47,39,206,0.38)] md:h-[4.5rem] md:w-[4.5rem]">
                            <Calculator size={30} strokeWidth={2.25} aria-hidden />
                        </div>
                        <p className="text-base font-bold tracking-tight text-primary md:text-lg">
                            60-Second Profit Leakage Audit
                        </p>
                        <p className="mt-1.5 text-xs font-medium text-foreground/45 md:text-sm">
                            Free · No credit card · Instant results
                        </p>
                    </div>

                    <div className="px-8 pb-9 pt-8 md:px-10 md:pb-10 md:pt-9">
                        <h3 className="text-center text-2xl font-extrabold leading-snug tracking-tight text-foreground md:text-[1.75rem] lg:text-[1.875rem]">
                            What is your current time tracking method?
                        </h3>

                        <div className="mt-7 flex flex-col gap-3.5 md:mt-8 md:gap-4">
                            {trackingOptions.map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => handleTeaserClick(opt.id)}
                                    className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold tracking-tight text-white shadow-[0_4px_14px_rgba(47,39,206,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2620B8] hover:shadow-[0_8px_24px_rgba(47,39,206,0.4)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(47,39,206,0.25)] cursor-pointer md:py-[1.125rem] md:text-[1.0625rem]"
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {renderTeaser()}

            {/* Full-Screen Multi-Step Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex w-full max-w-[100dvw] flex-col overflow-hidden bg-background text-foreground select-none"
                    >
                        {/* Ambient glow decoration — clipped so wide blurs don't cause horizontal scroll */}
                        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
                            <div className="absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/[0.05] blur-[100px]" />
                            <div className="absolute bottom-0 left-1/4 h-[600px] w-[600px] rounded-full bg-secondary/[0.03] blur-[120px]" />
                        </div>

                        {/* Header */}
                        <header className="relative z-10 mx-auto flex w-full max-w-4xl shrink-0 items-center justify-between px-6 py-6">
                            {step < LOADING_STEP ? (
                                <button
                                    onClick={handleBack}
                                    className="inline-flex items-center gap-2 text-xs font-bold text-foreground/50 hover:text-foreground uppercase tracking-wider transition-colors cursor-pointer"
                                >
                                    <ArrowLeft size={16} />
                                    <span>Back</span>
                                </button>
                            ) : (
                                <div />
                            )}
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/45">
                                Crewtrace Profit Audit
                            </span>
                            <button
                                onClick={handleClose}
                                className="w-8 h-8 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center text-foreground/60 hover:text-foreground transition-all cursor-pointer"
                                aria-label="Close calculator"
                            >
                                <X size={18} />
                            </button>
                        </header>

                        {/* Scrollable step content — top-aligned on mobile, vertically centered on desktop when content fits */}
                        <div className="relative z-10 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-x-none">
                            <div className="flex min-h-full flex-col">
                                <div className="flex flex-1 flex-col justify-start md:justify-center md:py-8 lg:py-10">
                                <main className="w-full px-6 py-6 sm:py-8 md:py-0">
                                    <div className="relative mx-auto w-full max-w-2xl">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.28, ease: "easeInOut" }}
                                        className="w-full"
                                    >
                                        {/* STEP 2: Trade Type */}
                                        {step === 2 && (
                                            <div className="space-y-8">
                                                <div className="text-center space-y-3">
                                                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading">
                                                        Select your trade or project type
                                                    </h2>
                                                    <p className="text-sm text-foreground/60 max-w-md mx-auto leading-relaxed">
                                                        Calculating benchmark metrics specific to your line of work helps ensure high accuracy.
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {([
                                                        { id: "residential", label: "Residential", desc: "Homebuilders, remodelers, residential specialty", icon: HardHat },
                                                        { id: "commercial", label: "Commercial", desc: "Commercial builders, tenant improvements", icon: Building2 },
                                                        { id: "industrial", label: "Industrial", desc: "Heavy civil, factories, utilities, heavy equipment", icon: MapPin },
                                                        { id: "mixed", label: "Mixed / General Contractor", desc: "Both residential and commercial project portfolios", icon: Users },
                                                    ] as const).map((t) => {
                                                        const Icon = t.icon;
                                                        const isSelected = tradeType === t.id;
                                                        return (
                                                            <button
                                                                key={t.id}
                                                                onClick={() => {
                                                                    setTradeType(t.id);
                                                                    handleNext();
                                                                }}
                                                                className={`p-5 rounded-2xl border text-left transition-all duration-300 group flex gap-4 cursor-pointer hover:shadow-md ${
                                                                    isSelected
                                                                        ? "border-primary bg-primary/[0.03] shadow-sm"
                                                                        : "border-foreground/10 bg-white hover:border-primary/45"
                                                                }`}
                                                            >
                                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                                                                    isSelected
                                                                        ? "bg-primary text-white"
                                                                        : "bg-primary/[0.04] text-primary group-hover:bg-primary group-hover:text-white"
                                                                } transition-all duration-300`}>
                                                                    <Icon size={22} />
                                                                </div>
                                                                <div>
                                                                    <div className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                                                                        {t.label}
                                                                    </div>
                                                                    <div className="text-xs text-foreground/50 font-medium mt-1 leading-relaxed">
                                                                        {t.desc}
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {renderStepActions()}
                                            </div>
                                        )}

                                        {/* STEP 3: Crew Size */}
                                        {step === 3 && (
                                            <div className="space-y-10">
                                                <div className="text-center space-y-3">
                                                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading">
                                                        How many workers are on your crews?
                                                    </h2>
                                                    <p className="text-sm text-foreground/60 leading-relaxed">
                                                        Include all field laborers, operators, and foremen clocking time.
                                                    </p>
                                                </div>
                                                <div className="bg-white/80 backdrop-blur-sm border border-primary/5 p-8 rounded-2xl space-y-8 max-w-lg mx-auto shadow-[0_4px_24px_rgba(47,39,206,0.02),0_12px_36px_rgba(0,0,0,0.03)]">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-bold text-foreground/45 uppercase tracking-widest">Crew Size</span>
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="number"
                                                                value={crewSize}
                                                                min={3}
                                                                max={100}
                                                                onChange={(e) => setCrewSize(Math.max(3, Math.min(100, Number(e.target.value))))}
                                                                className="w-22 bg-foreground/[0.02] border border-foreground/10 rounded-xl px-3 py-1.5 text-center text-xl font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                                                            />
                                                            <span className="text-sm font-medium text-foreground/50">workers</span>
                                                        </div>
                                                    </div>

                                                    <RangeSliderWithTooltip
                                                        value={crewSize}
                                                        min={3}
                                                        max={100}
                                                        onChange={setCrewSize}
                                                    />
                                                    <div className="flex justify-between text-xs text-foreground/40 font-medium">
                                                        <span>3 workers</span>
                                                        <span>50 workers</span>
                                                        <span>100 workers</span>
                                                    </div>
                                                </div>
                                                {renderStepActions({ showNext: true, onNext: handleNext })}
                                            </div>
                                        )}

                                        {/* STEP 4: Active Job Sites */}
                                        {step === 4 && (
                                            <div className="space-y-10">
                                                <div className="text-center space-y-3">
                                                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading">
                                                        How many active job sites do you manage?
                                                    </h2>
                                                    <p className="text-sm text-foreground/60 leading-relaxed">
                                                        More job sites increase travel time errors, buddy punching, and oversight complexity.
                                                    </p>
                                                </div>
                                                <div className="bg-white/80 backdrop-blur-sm border border-primary/5 p-8 rounded-2xl space-y-8 max-w-lg mx-auto shadow-[0_4px_24px_rgba(47,39,206,0.02),0_12px_36px_rgba(0,0,0,0.03)]">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-bold text-foreground/45 uppercase tracking-widest">Active Sites</span>
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="number"
                                                                value={jobSites}
                                                                min={1}
                                                                max={25}
                                                                onChange={(e) => setJobSites(Math.max(1, Math.min(25, Number(e.target.value))))}
                                                                className="w-22 bg-foreground/[0.02] border border-foreground/10 rounded-xl px-3 py-1.5 text-center text-xl font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                                                            />
                                                            <span className="text-sm font-medium text-foreground/50">sites</span>
                                                        </div>
                                                    </div>

                                                    <RangeSliderWithTooltip
                                                        value={jobSites}
                                                        min={1}
                                                        max={25}
                                                        onChange={setJobSites}
                                                    />
                                                    <div className="flex justify-between text-xs text-foreground/40 font-medium">
                                                        <span>1 site</span>
                                                        <span>12 sites</span>
                                                        <span>25 sites</span>
                                                    </div>
                                                </div>
                                                {renderStepActions({ showNext: true, onNext: handleNext })}
                                            </div>
                                        )}

                                        {/* STEP 5: Average Hourly Rate */}
                                        {step === 5 && (
                                            <div className="space-y-10">
                                                <div className="text-center space-y-3">
                                                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading">
                                                        What is the average hourly wage of your crew?
                                                    </h2>
                                                    <p className="text-sm text-foreground/60 leading-relaxed">
                                                        Specify the average base hourly rate (excluding burden or benefits).
                                                    </p>
                                                </div>
                                                <div className="bg-white/80 backdrop-blur-sm border border-primary/5 p-8 rounded-2xl space-y-8 max-w-lg mx-auto shadow-[0_4px_24px_rgba(47,39,206,0.02),0_12px_36px_rgba(0,0,0,0.03)]">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-bold text-foreground/45 uppercase tracking-widest">Avg Hourly Rate</span>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-xl font-bold text-foreground/50">$</span>
                                                            <input
                                                                type="number"
                                                                value={avgHourlyRate}
                                                                min={10}
                                                                max={85}
                                                                onChange={(e) => setAvgHourlyRate(Math.max(10, Math.min(85, Number(e.target.value))))}
                                                                className="w-22 bg-foreground/[0.02] border border-foreground/10 rounded-xl px-3 py-1.5 text-center text-xl font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                                                            />
                                                            <span className="text-sm font-medium text-foreground/50">/hr</span>
                                                        </div>
                                                    </div>

                                                    <RangeSliderWithTooltip
                                                        value={avgHourlyRate}
                                                        min={10}
                                                        max={85}
                                                        onChange={setAvgHourlyRate}
                                                        formatValue={(v) => `$${v}`}
                                                    />
                                                    <div className="flex justify-between text-xs text-foreground/40 font-medium">
                                                        <span>$10/hr</span>
                                                        <span>$48/hr</span>
                                                        <span>$85/hr</span>
                                                    </div>
                                                </div>
                                                {renderStepActions({ showNext: true, onNext: handleNext })}
                                            </div>
                                        )}

                                        {/* STEP 6: Payroll Admin Time */}
                                        {step === 6 && (
                                            <div className="space-y-10">
                                                <div className="text-center space-y-3">
                                                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading">
                                                        How many hours do you spend on payroll admin?
                                                    </h2>
                                                    <p className="text-sm text-foreground/60 leading-relaxed">
                                                        Total hours spent weekly collecting cards, checking sites, correcting math, and entering payroll.
                                                    </p>
                                                </div>
                                                <div className="bg-white/80 backdrop-blur-sm border border-primary/5 p-8 rounded-2xl space-y-8 max-w-lg mx-auto shadow-[0_4px_24px_rgba(47,39,206,0.02),0_12px_36px_rgba(0,0,0,0.03)]">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-bold text-foreground/45 uppercase tracking-widest">Admin Labor</span>
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="number"
                                                                value={hoursPerWeekOnPayroll}
                                                                min={1}
                                                                max={20}
                                                                onChange={(e) => setHoursPerWeekOnPayroll(Math.max(1, Math.min(20, Number(e.target.value))))}
                                                                className="w-22 bg-foreground/[0.02] border border-foreground/10 rounded-xl px-3 py-1.5 text-center text-xl font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
                                                            />
                                                            <span className="text-sm font-medium text-foreground/50">hrs/week</span>
                                                        </div>
                                                    </div>

                                                    <RangeSliderWithTooltip
                                                        value={hoursPerWeekOnPayroll}
                                                        min={1}
                                                        max={20}
                                                        onChange={setHoursPerWeekOnPayroll}
                                                        formatValue={(v) => `${v} hrs`}
                                                    />
                                                    <div className="flex justify-between text-xs text-foreground/40 font-medium">
                                                        <span>1 hr/wk</span>
                                                        <span>10 hrs/wk</span>
                                                        <span>20 hrs/wk</span>
                                                    </div>
                                                </div>
                                                {renderStepActions({ showNext: true, onNext: handleNext })}
                                            </div>
                                        )}

                                        {/* STEP 7: Overtime frequency */}
                                        {step === 7 && (
                                            <div className="space-y-8">
                                                <div className="text-center space-y-3">
                                                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading">
                                                        How often do your crews run into overtime?
                                                    </h2>
                                                    <p className="text-sm text-foreground/60 max-w-md mx-auto leading-relaxed">
                                                        Overtime hours significantly compound time-card errors, buddy punching, and wage disputes.
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                                                    {([
                                                        { id: "low", label: "Rarely", desc: "Crews stick to standard 40-hour weeks. Overtime is negligible." },
                                                        { id: "moderate", label: "Sometimes", desc: "Occasional deadlines require 5-10 hours of weekly overtime per crew." },
                                                        { id: "high", label: "Frequently", desc: "Consistently running overtime (10+ hours per week) on most projects." },
                                                    ] as const).map((o) => {
                                                        const isSelected = overtimeLevel === o.id;
                                                        return (
                                                            <button
                                                                key={o.id}
                                                                onClick={() => {
                                                                    setOvertimeLevel(o.id);
                                                                    handleNext();
                                                                }}
                                                                className={`p-5 rounded-2xl border text-left transition-all duration-300 group flex items-center justify-between cursor-pointer hover:shadow-md ${
                                                                    isSelected
                                                                        ? "border-primary bg-primary/[0.03] shadow-sm"
                                                                        : "border-foreground/10 bg-white hover:border-primary/45"
                                                                }`}
                                                            >
                                                                <div className="pr-4">
                                                                    <div className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{o.label}</div>
                                                                    <div className="text-xs text-foreground/50 font-medium mt-1 leading-relaxed">{o.desc}</div>
                                                                </div>
                                                                <div className="w-5 h-5 rounded-full border border-foreground/15 group-hover:border-primary/50 group-hover:bg-primary/5 flex items-center justify-center transition-all shrink-0">
                                                                    <div className={`w-2 h-2 rounded-full bg-primary transition-all duration-300 ${
                                                                        isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"
                                                                    }`} />
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {renderStepActions()}
                                            </div>
                                        )}

                                        {/* STEPS 8–11: Contact info (one field per slide) */}
                                        {step >= CONTACT_START_STEP && step <= CONTACT_END_STEP && (() => {
                                            const contactIndex = step - CONTACT_START_STEP;
                                            const config = CONTACT_STEPS[contactIndex];
                                            const Icon = config.icon;
                                            const isLastContactStep = contactIndex === CONTACT_STEPS.length - 1;

                                            return (
                                                <div className="space-y-6 max-w-md mx-auto">
                                                    <div className="text-center space-y-3">
                                                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/75">
                                                            {isLastContactStep ? "Last step" : `Step ${contactIndex + 1} of ${CONTACT_STEPS.length}`}
                                                        </p>
                                                        <h3 className="text-2xl md:text-[1.75rem] font-extrabold tracking-tight font-heading text-foreground leading-tight">
                                                            {config.title}
                                                        </h3>
                                                        <p className="text-sm text-foreground/55 leading-relaxed max-w-sm mx-auto">
                                                            {config.reason}
                                                        </p>
                                                    </div>

                                                    <div className="rounded-2xl border border-foreground/10 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
                                                        <form
                                                            onSubmit={isLastContactStep
                                                                ? handleSubmit
                                                                : (e) => {
                                                                    e.preventDefault();
                                                                    handleContactNext(config.field);
                                                                }}
                                                            className="p-5 sm:p-6 space-y-5"
                                                        >
                                                            <div className="space-y-2">
                                                                <label
                                                                    htmlFor={`contact-${config.field}`}
                                                                    className="text-[11px] font-bold text-foreground/45 uppercase tracking-widest block"
                                                                >
                                                                    {config.label}
                                                                </label>
                                                                <div className="relative">
                                                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-foreground/40">
                                                                        <Icon size={16} />
                                                                    </span>
                                                                    <input
                                                                        id={`contact-${config.field}`}
                                                                        type={config.inputType}
                                                                        placeholder={config.placeholder}
                                                                        autoComplete={config.autoComplete}
                                                                        value={getContactFieldValue(config.field)}
                                                                        onChange={(e) => {
                                                                            setContactFieldValue(config.field, e.target.value);
                                                                            if (touched[config.field]) {
                                                                                setFormErrors((prev) => ({ ...prev, [config.field]: "" }));
                                                                            }
                                                                        }}
                                                                        onBlur={() => setTouched((prev) => ({ ...prev, [config.field]: true }))}
                                                                        className={`w-full pl-10 pr-4 py-3.5 bg-foreground/[0.02] border rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all ${
                                                                            formErrors[config.field]
                                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                                                                : "border-foreground/10 focus:border-primary"
                                                                        }`}
                                                                    />
                                                                </div>
                                                                <AnimatePresence>
                                                                    {formErrors[config.field] && (
                                                                        <motion.p
                                                                            initial={{ opacity: 0, y: -5 }}
                                                                            animate={{ opacity: 1, y: 0 }}
                                                                            exit={{ opacity: 0, y: -5 }}
                                                                            className="text-xs text-red-500 font-semibold flex items-center gap-1.5"
                                                                        >
                                                                            <AlertCircle size={12} /> {formErrors[config.field]}
                                                                        </motion.p>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>

                                                            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                                                                <button
                                                                    type="button"
                                                                    onClick={handleBack}
                                                                    className="inline-flex w-full sm:w-auto min-w-[120px] items-center justify-center gap-2 rounded-xl border border-foreground/10 bg-white px-5 py-3 text-sm font-bold text-foreground/65 transition-all hover:border-foreground/20 hover:bg-foreground/[0.02] hover:text-foreground cursor-pointer"
                                                                >
                                                                    <ArrowLeft size={16} aria-hidden />
                                                                    <span>Back</span>
                                                                </button>
                                                                <button
                                                                    type="submit"
                                                                    disabled={isLastContactStep && isSubmitting}
                                                                    className="inline-flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-[0_4px_12px_rgba(47,39,206,0.15)] transition-all hover:bg-primary/95 hover:shadow-[0_6px_20px_rgba(47,39,206,0.25)] disabled:opacity-50 focus:outline-none cursor-pointer"
                                                                >
                                                                    {isLastContactStep ? (
                                                                        isSubmitting ? (
                                                                            <span>Analyzing data...</span>
                                                                        ) : (
                                                                            <>
                                                                                <span>Unlock My Audit</span>
                                                                                <ArrowRight size={18} aria-hidden />
                                                                            </>
                                                                        )
                                                                    ) : (
                                                                        <>
                                                                            <span>Continue</span>
                                                                            <ArrowRight size={18} aria-hidden />
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </div>

                                                            {isLastContactStep && (
                                                                <div className="space-y-3 border-t border-foreground/[0.06] pt-4">
                                                                    <p className="text-[11px] text-foreground/40 text-center font-medium leading-relaxed">
                                                                        By unlocking results, you agree to our Privacy Policy. We respect your data and never sell it.
                                                                    </p>
                                                                    <div className="flex items-center justify-center gap-2 rounded-lg bg-primary/[0.04] px-3 py-2.5 text-center">
                                                                        <ShieldCheck size={15} className="shrink-0 text-primary" aria-hidden />
                                                                        <p className="text-[11px] font-medium leading-snug text-foreground/55">
                                                                            No spam — one helpful follow-up at most. No cold-call blitz.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </form>
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        {/* Loading Report Sequence */}
                                        {step === LOADING_STEP && (
                                            <div className="space-y-8 max-w-md mx-auto text-center">
                                                {/* Advanced Branded Spinner */}
                                                <div className="relative w-20 h-20 mx-auto mb-8">
                                                    <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
                                                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                                                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-inner">
                                                        <Clock size={24} className="text-primary animate-pulse" />
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-xl font-bold tracking-tight text-foreground font-heading">
                                                        Generating Operations Audit
                                                    </h3>
                                                    <div className="space-y-2.5 max-w-sm mx-auto text-left bg-foreground/[0.015] border border-foreground/5 p-4 rounded-xl">
                                                        {LOADING_STEPS.map((lbl, idx) => {
                                                            const isCompleted = loadingStep > idx;
                                                            const isActive = loadingStep === idx;
                                                            return (
                                                                <div
                                                                    key={lbl}
                                                                    className={`text-xs font-semibold transition-all duration-300 flex items-center gap-2.5 ${
                                                                        isActive
                                                                            ? "text-primary animate-pulse"
                                                                            : isCompleted
                                                                            ? "text-green-600/90"
                                                                            : "text-foreground/30 font-normal"
                                                                    }`}
                                                                >
                                                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                                                        isCompleted
                                                                            ? "bg-green-50 border-green-600 text-green-600"
                                                                            : isActive
                                                                            ? "border-primary text-primary"
                                                                            : "border-foreground/15 text-transparent"
                                                                    }`}>
                                                                        {isCompleted ? (
                                                                            <CheckCircle2 size={12} className="stroke-[3]" />
                                                                        ) : (
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                                                                        )}
                                                                    </div>
                                                                    <span>{lbl}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="w-full bg-foreground/5 h-2 rounded-full overflow-hidden mt-6 relative shadow-inner">
                                                    <div
                                                        className="bg-primary h-full transition-all duration-300 shadow-[0_0_8px_rgba(47,39,206,0.3)]"
                                                        style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                                    </div>
                                </main>
                                </div>

                                {step < LOADING_STEP && (
                                    <footer className="mx-auto mt-auto flex w-full max-w-4xl shrink-0 flex-col items-center justify-between gap-4 border-t border-foreground/5 px-6 py-6 text-[10px] font-bold uppercase tracking-wider text-foreground/45 sm:flex-row">
                                        <div className="flex gap-4">
                                            <span>Legal Notes</span>
                                            <span>&middot;</span>
                                            <span>Privacy Policy</span>
                                            <span>&middot;</span>
                                            <span>Manage Cookies</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 rounded-full bg-foreground/5 px-2.5 py-1 text-[9px] font-extrabold tracking-widest text-foreground/60 opacity-80">
                                            <span>Step {step} of {TOTAL_INPUT_STEPS}</span>
                                        </div>
                                    </footer>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
