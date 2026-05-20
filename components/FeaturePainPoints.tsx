"use client";

import React, { useState, useEffect } from "react";
import { LucideIcon, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface PainPoint {
    title: string;
    description: string;
    icon: LucideIcon;
    tone: "rose" | "amber" | "slate" | "primary" | "emerald";
    visual: React.ReactNode;
}

interface FeaturePainPointsProps {
    eyebrow: string;
    eyebrowIcon: LucideIcon;
    title: string;
    description: string;
    painPoints: PainPoint[];
}

const toneMap = {
    rose: {
        bg: "bg-rose-50/40 border-rose-100 shadow-sm",
        bgHover: "hover:bg-rose-50/20",
        badge: "bg-rose-50 text-rose-600 border-rose-200/50",
        text: "text-rose-600",
        glow: "from-rose-500/5 via-rose-500/[0.01] to-transparent",
        bar: "bg-rose-500",
    },
    amber: {
        bg: "bg-amber-50/40 border-amber-100 shadow-sm",
        bgHover: "hover:bg-amber-50/20",
        badge: "bg-amber-50 text-amber-600 border-amber-200/50",
        text: "text-amber-600",
        glow: "from-amber-500/5 via-amber-500/[0.01] to-transparent",
        bar: "bg-amber-500",
    },
    slate: {
        bg: "bg-slate-50/50 border-slate-150 shadow-sm",
        bgHover: "hover:bg-slate-50/20",
        badge: "bg-slate-100 text-slate-600 border-slate-200/50",
        text: "text-slate-600",
        glow: "from-slate-500/5 via-slate-500/[0.01] to-transparent",
        bar: "bg-slate-500",
    },
    primary: {
        bg: "bg-primary/5 border-primary/10 shadow-sm",
        bgHover: "hover:bg-primary/[0.02]",
        badge: "bg-primary/10 text-primary border-primary/20",
        text: "text-primary",
        glow: "from-primary/5 via-primary/[0.01] to-transparent",
        bar: "bg-primary",
    },
    emerald: {
        bg: "bg-emerald-50/40 border-emerald-100 shadow-sm",
        bgHover: "hover:bg-emerald-50/20",
        badge: "bg-emerald-50 text-emerald-600 border-emerald-200/50",
        text: "text-emerald-600",
        glow: "from-emerald-500/5 via-emerald-500/[0.01] to-transparent",
        bar: "bg-emerald-500",
    },
};

export default function FeaturePainPoints({
    eyebrow,
    eyebrowIcon: EyebrowIcon,
    title,
    description,
    painPoints,
}: FeaturePainPointsProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Auto-advance loop (reset progress when activeIndex changes)
    useEffect(() => {
        setProgress(0);
    }, [activeIndex]);

    useEffect(() => {
        if (isPaused || hasInteracted) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setActiveIndex((prevIdx) => (prevIdx + 1) % painPoints.length);
                    return 0;
                }
                return prev + 1.25; // (~8 seconds cycle: 100ms * 80 steps)
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isPaused, hasInteracted, painPoints.length]);

    const handleSelect = (idx: number) => {
        setActiveIndex(idx);
        setHasInteracted(true);
        setProgress(0);
    };

    const activePain = painPoints[activeIndex];

    return (
        <section
            className="relative overflow-hidden px-6 py-24 md:py-32 bg-background scroll-mt-32"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Ambient Background Glow matching the active tone */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Object.entries(toneMap).map(([toneName, tone]) => {
                    const isSelected = activePain.tone === toneName;
                    return (
                        <div
                            key={toneName}
                            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br ${tone.glow} blur-3xl transition-opacity duration-1000 ease-in-out`}
                            style={{ opacity: isSelected ? 0.75 : 0 }}
                        />
                    );
                })}
            </div>

            <div className="mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16 md:mb-20">
                    <p className="inline-flex items-center gap-2 rounded-full border border-rose-500/15 bg-rose-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-rose-600 backdrop-blur-sm">
                        <EyebrowIcon size={14} />
                        {eyebrow}
                    </p>
                    <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-4xl leading-[1.15]">
                        {title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                        {description}
                    </p>
                </div>

                {/* Content Layout */}
                <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-stretch">
                    {/* Left Column: Interactive List / Accordion */}
                    <div className="flex flex-col justify-center space-y-4">
                        {painPoints.map((pain, idx) => {
                            const Icon = pain.icon;
                            const isActive = idx === activeIndex;
                            const t = toneMap[pain.tone];

                            return (
                                <div
                                    key={pain.title}
                                    className={`group w-full text-left rounded-lg border transition-all duration-300 relative ${
                                        isActive
                                            ? `${t.bg} border-foreground/10`
                                            : `border-foreground/[0.06] bg-white/40 hover:bg-white/85 hover:border-foreground/10`
                                    }`}
                                >
                                    {/* Clickable Trigger Header */}
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleSelect(idx)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                handleSelect(idx);
                                            }
                                        }}
                                        className="flex items-center gap-5 p-6 cursor-pointer select-none w-full"
                                    >
                                        {/* Icon Container */}
                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md border transition-all duration-300 ${
                                                isActive
                                                    ? `${t.badge}`
                                                    : "bg-slate-50 text-foreground/50 border-foreground/[0.05]"
                                            }`}
                                        >
                                            <Icon size={20} />
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex-1 min-w-0 pr-4">
                                            <h3
                                                className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                                                    isActive ? "text-foreground" : "text-foreground/75"
                                                }`}
                                            >
                                                {pain.title}
                                            </h3>
                                            <p
                                                className={`mt-2 text-sm font-medium leading-relaxed transition-colors duration-300 ${
                                                    isActive ? "text-foreground/70" : "text-foreground/50"
                                                }`}
                                            >
                                                {pain.description}
                                            </p>

                                            {/* Progress Bar for Autoplay */}
                                            {isActive && !hasInteracted && (
                                                <div className="mt-4 h-[2px] w-full bg-foreground/[0.06] rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${t.bar}`}
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Interactive Indicator Chevron */}
                                        <div className="flex items-center justify-center shrink-0 pr-1">
                                            <ChevronRight
                                                size={18}
                                                className={`transition-all duration-300 ${
                                                    isActive
                                                        ? `${t.text} opacity-100 translate-x-0 rotate-90 lg:rotate-0`
                                                        : "text-foreground/20 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 rotate-0"
                                                }`}
                                            />
                                        </div>
                                    </div>

                                    {/* Mobile Accordion Visualizer Container */}
                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="lg:hidden overflow-hidden"
                                            >
                                                <div className="px-6 pb-6 border-t border-foreground/[0.03] pt-4">
                                                    <div className="relative w-full rounded-xl border border-foreground/[0.06] bg-gradient-to-br from-white via-white to-slate-50/50 p-6 shadow-md flex flex-col justify-between overflow-hidden">
                                                        {pain.visual}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Visualizer Window (Desktop only) */}
                    <div className="hidden lg:flex flex-col justify-center min-h-[380px] lg:min-h-[440px]">
                        <div className="relative h-full w-full rounded-xl border border-foreground/[0.06] bg-gradient-to-br from-white via-white to-slate-50/50 p-6 shadow-xl shadow-slate-100/50 flex flex-col justify-between overflow-hidden">
                            {/* Visual Grid Underlay for design depth */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(rgba(15,23,42,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.6) 1px, transparent 1px)",
                                    backgroundSize: "24px 24px",
                                }}
                            />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                    className="relative z-10 w-full h-full flex flex-col justify-center items-center"
                                >
                                    {activePain.visual}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
