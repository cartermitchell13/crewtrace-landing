"use client";

import { ShieldCheck, AlertTriangle, FileText, UserCheck, ArrowRight } from "lucide-react";

export default function ComplianceAudit() {
    return (
        <section
            className="py-24 px-6 relative overflow-hidden"
            style={{ backgroundColor: '#2F27CE' }}
        >
            {/* Design Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/4" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold">
                        <AlertTriangle size={16} className="text-red-400" />
                        <span>Compliance & Audit Protection</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white">
                        The $50,000 Audit <br />
                        <span className="text-secondary opacity-90">You Can't Afford.</span>
                    </h2>

                    <p className="text-xl text-white/80 font-medium leading-relaxed">
                        One contractor faced a $50k fine because their records were "word of mouth."
                        <span className="block mt-2 font-bold text-white">With Crewtrace, they achieved 100% compliance overnight.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {/* The Danger - Pain card (High Contrast Off-white) */}
                    <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-white/20 text-slate-900 flex flex-col justify-between shadow-xl transition-all duration-300">
                        <div className="space-y-6">
                            <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-600">
                                <FileText size={28} />
                            </div>
                            <h3 className="text-2xl font-bold">Paper Chaos</h3>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                Paper time cards are easily lost, impossible to verify, and a red flag for DOL investigators.
                            </p>
                        </div>
                    </div>

                    {/* The Transformation - Focus card (Pure White) */}
                    <div className="p-10 rounded-[2.5rem] bg-white text-primary flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.3)] lg:scale-105 relative z-20">
                        <div className="space-y-6">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#000000]">100% Digital Proof</h3>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                Geofenced clock-ins and real-time logs create an airtight defense. No more guessing, no more fines.
                            </p>
                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-sm font-bold text-primary italic">
                                    "When the auditor saw our reports, the conversation changed instantly. We were done in 15 minutes."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* The Result - Success card (High Contrast Off-white) */}
                    <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-white/20 text-slate-900 flex flex-col justify-between shadow-xl transition-all duration-300">
                        <div className="space-y-6">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                <UserCheck size={28} />
                            </div>
                            <h3 className="text-2xl font-bold">Absolute Certainty</h3>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                Stop relying on the honor system. Know exactly when your crew starts and ends, with proof.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <button className="bg-white text-primary hover:bg-white/90 transition-all font-bold px-10 py-5 rounded-2xl shadow-xl shadow-black/20 flex items-center justify-center gap-2 mx-auto text-lg hover:scale-[1.02]">
                        Protect Your Business Now <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
