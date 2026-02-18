import { ArrowRight, CheckCircle2, Calculator, ShieldCheck } from "lucide-react";
import React from "react";
import Button from "@/components/Button";

export default function CTASection() {
    return (
        <section id="audit" className="pt-32 pb-52 px-6 relative bg-white overflow-hidden scroll-mt-32">
            {/* Soft background accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-6xl mx-auto">
                <div className="relative rounded-[3.5rem] bg-white border border-foreground/5 shadow-[0_32px_64px_-16px_rgba(47,39,206,0.08)] p-12 md:p-24 overflow-hidden">
                    {/* Inner decorative gradients */}
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(47,39,206,0.05)_0%,transparent_50%)]" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                                <Calculator size={14} />
                                <span>Free Profit Leak Audit</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
                                Ready to stop the <br />
                                <span className="text-primary italic">profit leakage?</span>
                            </h2>

                            <p className="text-xl text-foreground/50 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                                We do not want you to pay us unless we know we can save you money. On a free 15-minute call, we will audit your current time tracking and payroll process and tell you if Crewtrace is a fit.
                            </p>

                            <div className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-6 space-y-3 max-w-xl mx-auto lg:mx-0 text-left">
                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                                    <ShieldCheck size={14} />
                                    <span>Profit Protection Guarantee</span>
                                </div>
                                <p className="text-sm md:text-base text-foreground/70 font-semibold leading-relaxed">
                                    We guarantee your payroll leakage drops to near zero in the first 30 days.
                                </p>
                                <p className="text-sm md:text-base text-foreground/60 font-medium leading-relaxed">
                                    If Crewtrace does not pay for itself in your first 6 months, we refund the difference. You cannot lose money on this deal.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-sm font-bold text-foreground/40">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-primary" />
                                    <span>Immediate ROI Analysis</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-primary" />
                                    <span>Fit Check Before You Pay</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto flex flex-col items-center gap-4">
                            <Button href="https://cal.com/crewtrace/15min" size="lg">
                                Secure Your Free Audit
                            </Button>
                            <p className="text-sm font-bold text-foreground/30 uppercase tracking-widest">
                                Limited spots available this week
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
