"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
    {
        question: "My guys can barely use their phones. Will they actually use this?",
        answer: "Yes. We built this specifically for crews who don't want to download apps or remember passwords. They get a text link, tap it, and they're clocked in. One button. That's it. If your guy can send a text, he can use Crewtrace."
    },
    {
        question: "What if there's no cell reception on the job site?",
        answer: "The clock-in records locally on their phone and syncs automatically when they get signal again. We built this for real construction sites, not downtown coffee shops. It works in basements, in the desert, wherever your crew works."
    },
    {
        question: "How much does this actually cost?",
        answer: "Before we quote anything, we run a free audit call to confirm we can save you money. If we cannot show a clear path to savings, we will tell you not to switch. For qualified teams, we charge a one-time setup fee plus a small monthly fee, and most contractors recover $1,000-2,000/month in wages and admin time."
    },
    {
        question: "What if this does not pay for itself?",
        answer: "Then you are protected. We guarantee payroll leakage drops to near zero in your first 30 days. If Crewtrace does not pay for itself in your first 6 months, we refund the difference. You cannot lose money on this deal."
    },
    {
        question: "Do I have to set all this up myself?",
        answer: "No. We handle the heavy lifting—uploading your roster, configuring your job sites, and getting the system ready to go. The admin dashboard is simple enough that you'll pick it up in minutes, plus we include video walkthroughs if you need them."
    },
    {
        question: "What if a worker forgets to clock in or out?",
        answer: "You get a notification. You can manually adjust or flag it for review. But with GPS verification, there's no more arguing about what time someone actually showed up—the data speaks for itself."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 px-6 bg-background">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-lg text-foreground/60 font-medium">
                        Everything you need to know about modernizing your crew tracking.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-foreground/5 bg-white rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-lg pr-8">{faq.question}</span>
                                {openIndex === index ? <ChevronUp className="text-primary shrink-0" /> : <ChevronDown className="text-foreground/20 shrink-0" />}
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
