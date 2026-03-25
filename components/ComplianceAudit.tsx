"use client";

import { ShieldCheck, AlertTriangle, FileText, UserCheck } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ComplianceAudit() {
    return (
        <section
            id="compliance"
            className="py-24 md:py-32 px-6 relative scroll-mt-32 bg-background"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200/60 text-red-700 text-sm font-bold">
                        <AlertTriangle size={16} />
                        <span>Compliance & Audit Protection</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
                        DOL Compliance for{" "}
                        <span className="text-primary">Construction Timekeeping.</span>
                    </h2>

                    <div className="text-xl text-foreground/60 font-medium leading-relaxed max-w-2xl mx-auto">
                        One contractor faced a $50k fine because their records were &ldquo;word of mouth.&rdquo;
                        <span className="block mt-2 font-bold text-foreground">With Crewtrace, they achieved 100% compliance overnight.</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    <div className="p-10 rounded-2xl bg-white border border-foreground/5 text-foreground flex flex-col justify-between shadow-sm">
                        <div className="space-y-6">
                            <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-2xl font-bold">Paper Chaos</h3>
                            <p className="text-foreground/60 font-medium leading-relaxed">
                                Paper time cards are easily lost, impossible to verify, and a red flag for DOL investigators.
                            </p>
                        </div>
                    </div>

                    <div className="p-10 rounded-2xl bg-white border-2 border-primary/20 text-foreground flex flex-col justify-between shadow-md lg:scale-[1.03] relative z-20">
                        <div className="space-y-6">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-2xl font-bold">100% Digital Proof</h3>
                            <p className="text-foreground/60 font-medium leading-relaxed">
                                Geofenced clock-ins and real-time logs create an airtight defense. No more guessing, no more fines.
                            </p>
                            <div className="pt-4 border-t border-foreground/5">
                                <p className="text-sm font-bold text-primary italic">
                                    &ldquo;When the auditor saw our reports, the conversation changed instantly. We were done in 15 minutes.&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 rounded-2xl bg-white border border-foreground/5 text-foreground flex flex-col justify-between shadow-sm">
                        <div className="space-y-6">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <UserCheck size={24} />
                            </div>
                            <h3 className="text-2xl font-bold">Absolute Certainty</h3>
                            <p className="text-foreground/60 font-medium leading-relaxed">
                                Stop relying on the honor system. Know exactly when your crew starts and ends, with proof.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all whitespace-nowrap motion-safe:hover:-translate-y-0.5 bg-primary text-white hover:bg-primary/90 px-10 py-5 text-lg shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(47,39,206,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        Protect Your Business Now
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
