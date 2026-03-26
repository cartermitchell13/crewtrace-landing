"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { homeFaqItems, type FaqItem } from "@/lib/faq";
import { publicIcpPhrase } from "@/lib/messaging";

type FAQSectionProps = {
    eyebrow?: string;
    title?: string;
    description?: string;
    items?: FaqItem[];
};

export default function FAQSection({
    eyebrow = "Support & Help",
    title = "Construction Time Tracking FAQ",
    description = `Everything you need to know about modernizing crew tracking ${publicIcpPhrase}.`,
    items,
}: FAQSectionProps) {
    const faqItems = items ?? homeFaqItems;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 md:py-32 px-6 bg-background relative overflow-hidden scroll-mt-32">
            {/* Background Accents */}
            <div className="absolute left-1/2 top-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl mx-auto relative z-10">
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

                <div className="space-y-4">
                    {faqItems.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`group rounded-2xl bg-white border outline-none transition-[border-color,box-shadow] duration-300 overflow-hidden shadow-sm transform-gpu will-change-[grid-template-rows] ${isOpen
                                    ? "border-primary/20 shadow-md shadow-primary/5"
                                    : "border-foreground/5"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${index}`}
                                    id={`faq-trigger-${index}`}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                >
                                    <span className={`text-lg md:text-xl font-bold pr-8 transition-colors duration-300 ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary/80"}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`shrink-0 relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${isOpen ? "bg-primary text-white" : "bg-primary/5 text-primary group-hover:bg-primary/10"}`}>
                                        <Plus
                                            size={20}
                                            className={`transition-all duration-300 absolute ${isOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}
                                        />
                                        <Minus
                                            size={20}
                                            className={`transition-all duration-300 absolute ${isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"}`}
                                        />
                                    </div>
                                </button>
                                <div
                                    id={`faq-panel-${index}`}
                                    role="region"
                                    aria-labelledby={`faq-trigger-${index}`}
                                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-6 md:px-8 pb-6 md:pb-8 text-foreground/70 font-medium leading-relaxed text-base md:text-lg">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
