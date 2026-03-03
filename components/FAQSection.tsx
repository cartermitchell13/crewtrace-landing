"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { homeFaqItems } from "@/lib/faq";
import { publicIcpPhrase } from "@/lib/messaging";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 px-6 bg-background scroll-mt-32">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-lg text-foreground/60 font-medium">
                        Everything you need to know about modernizing crew tracking {publicIcpPhrase}.
                    </p>
                </div>

                <div className="space-y-4">
                    {homeFaqItems.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-foreground/5 bg-white rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-lg pr-8">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-primary shrink-0" />
                                ) : (
                                    <ChevronDown className="text-foreground/20 shrink-0" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-6 text-foreground/60 font-medium leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
