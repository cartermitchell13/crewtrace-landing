"use client";

import LandingNavbar from "@/components/LandingNavbar";
import SavingsCalculator from "@/components/SavingsCalculator";
import Footer from "@/components/Footer";
import { CheckCircle2, Lock, TrendingUp, Sparkles } from "lucide-react";

export default function CalculatorPage() {
    return (
        <div className="min-h-screen bg-[#FBFBFE]">
            <LandingNavbar />
            
            <main className="pt-32 pb-20">
                {/* Hero Header */}
                <div className="max-w-7xl mx-auto px-6 mb-16">
                    <div className="flex flex-col items-center text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                            <Sparkles size={14} className="animate-pulse" />
                            <span>Free Profit Audit Tool</span>
                        </div>
                        
                        <div className="space-y-4 max-w-3xl">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
                                Stop Guessing. <br />
                                <span className="text-primary italic">Identify Potential Leakage.</span>
                            </h1>
                            <p className="text-xl text-foreground/50 font-medium leading-relaxed">
                                Studies suggest most construction companies may be losing up to 4% of their annual revenue to payroll leakage. 
                                Use our industrial-grade audit tool to find where your profit might be slipping through.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-foreground/40">
                                <CheckCircle2 size={18} className="text-primary" />
                                <span>100% Free — No Strings</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-foreground/40">
                                <Lock size={18} className="text-primary" />
                                <span>No Email Required</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-foreground/40">
                                <TrendingUp size={18} className="text-primary" />
                                <span>Industry Benchmarked</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Calculator */}
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/[0.01] -skew-y-3 z-0" />
                    <div className="relative z-10">
                        <SavingsCalculator />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
