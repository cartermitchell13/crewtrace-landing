"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { homeFaqItems, type FaqItem } from "@/lib/faq";

type FAQSectionProps = {
    eyebrow?: string;
    title?: string;
    description?: string;
    items?: FaqItem[];
};

export default function FAQSection({
    eyebrow = "Support & Help",
    title = "Construction Time Tracking FAQ",
    description = "Everything you need to know about modernizing crew tracking, payroll approvals, and field accountability.",
    items,
}: FAQSectionProps) {
    const faqItems = items ?? homeFaqItems;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="relative scroll-mt-32 overflow-hidden bg-background py-24 md:py-32">
            {/* Atmospheric background — matches pricing section pattern */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(47,39,206,0.06),transparent)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.018] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:22px_22px]"
            />

            <div className="relative z-10 layout-shell">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-16 md:mb-20 space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                            <HelpCircle size={14} className="text-primary" />
                            <span>{eyebrow}</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                            {title}
                        </h2>
                        <p className="text-xl text-foreground/60 font-medium leading-relaxed max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>

                    {/* Premium panel wrapper — mirrors pricing section's single-card approach */}
                    <div className="relative overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_64px_-12px_rgba(15,23,42,0.10),0_12px_32px_-8px_rgba(47,39,206,0.05)]">
                        {/* Top accent line */}
                        <div
                            aria-hidden
                            className="h-px w-full bg-gradient-to-r from-transparent via-primary/35 to-transparent"
                        />

                        <div className="divide-y divide-slate-100">
                            {faqItems.map((faq, index) => {
                                const isOpen = openIndex === index;
                                return (
                                    <div
                                        key={index}
                                        className="group relative"
                                    >
                                        {/* Active indicator bar */}
                                        <div
                                            className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full transition-all duration-300 ${
                                                isOpen
                                                    ? "bg-primary opacity-100"
                                                    : "bg-transparent opacity-0 group-hover:bg-primary/20 group-hover:opacity-100"
                                            }`}
                                        />

                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : index)}
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-panel-${index}`}
                                            id={`faq-trigger-${index}`}
                                            className="w-full flex items-center gap-4 sm:gap-5 px-6 py-5 md:px-8 md:py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset transition-colors duration-200 hover:bg-slate-50/60"
                                        >
                                            {/* Question number */}
                                            <span
                                                className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-md text-xs font-bold tabular-nums transition-all duration-300 ${
                                                    isOpen
                                                        ? "bg-primary text-white shadow-[0_2px_8px_rgba(47,39,206,0.25)]"
                                                        : "bg-slate-100/80 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
                                                }`}
                                            >
                                                {String(index + 1).padStart(2, "0")}
                                            </span>

                                            <span
                                                className={`flex-1 text-[15px] sm:text-base md:text-lg font-bold tracking-tight transition-colors duration-300 ${
                                                    isOpen
                                                        ? "text-foreground"
                                                        : "text-foreground/80 group-hover:text-foreground"
                                                }`}
                                            >
                                                {faq.question}
                                            </span>

                                            {/* Toggle icon */}
                                            <div
                                                className={`shrink-0 relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
                                                    isOpen
                                                        ? "bg-primary/10 text-primary rotate-0"
                                                        : "bg-transparent text-slate-300 group-hover:bg-slate-100 group-hover:text-slate-500"
                                                }`}
                                            >
                                                <Plus
                                                    size={18}
                                                    strokeWidth={2.5}
                                                    className={`transition-all duration-300 absolute ${
                                                        isOpen
                                                            ? "rotate-90 opacity-0 scale-75"
                                                            : "rotate-0 opacity-100 scale-100"
                                                    }`}
                                                />
                                                <Minus
                                                    size={18}
                                                    strokeWidth={2.5}
                                                    className={`transition-all duration-300 absolute ${
                                                        isOpen
                                                            ? "rotate-0 opacity-100 scale-100"
                                                            : "-rotate-90 opacity-0 scale-75"
                                                    }`}
                                                />
                                            </div>
                                        </button>

                                        {/* Expandable answer panel */}
                                        <div
                                            id={`faq-panel-${index}`}
                                            role="region"
                                            aria-labelledby={`faq-trigger-${index}`}
                                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
                                                isOpen
                                                    ? "grid-rows-[1fr] opacity-100"
                                                    : "grid-rows-[0fr] opacity-0"
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="px-6 md:px-8 pb-6 md:pb-7 pl-[4.25rem] sm:pl-[4.75rem] md:pl-[5.25rem]">
                                                    <div className="relative rounded-sm bg-slate-50/70 border border-slate-100/80 px-5 py-4">
                                                        <p className="text-[14px] md:text-[15px] font-medium leading-relaxed text-slate-600">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom accent */}
                        <div
                            aria-hidden
                            className="h-px w-full bg-gradient-to-r from-transparent via-primary/15 to-transparent"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
