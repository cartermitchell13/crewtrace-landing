import { LucideIcon, Rocket, Link2, TrendingUp, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import React from "react";

interface Step {
    id: string;
    number: string;
    title: string;
    description: string;
    icon: LucideIcon;
    benefit: string;
}

const steps: Step[] = [
    {
        id: "setup",
        number: "01",
        title: "White-Glove Setup",
        description: "We handle the entire heavy lifting. We upload your roster, map your job sites, and set the geo-fence boundaries. You don't touch a thing.",
        icon: ShieldCheck,
        benefit: "0h Admin Time"
    },
    {
        id: "link",
        number: "02",
        title: "One-Tap Launch",
        description: "No apps for your crew to download. We send a simple SMS link. Workers create an account in 30 seconds and tap one button to log hours.",
        icon: Link2,
        benefit: "100% Adoption Rate"
    },
    {
        id: "results",
        number: "03",
        title: "Profit Protection",
        description: "Review verified attendance from your phone. Approve payroll in one click. Watch as buddy-punching and rounding errors vanish.",
        icon: TrendingUp,
        benefit: "Instant ROI"
    }
];

export default function ProcessSection() {
    return (
        <section id="process" className="py-32 px-6 bg-white relative overflow-hidden scroll-mt-32">
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">

                    {/* Left Side: Sticky Content */}
                    <div className="lg:sticky lg:top-32 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                            <Rocket size={12} />
                            <span>Onboarding</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                            We install it <span className="text-primary italic">for you.</span>
                        </h2>
                        <p className="text-xl text-foreground/50 font-medium leading-relaxed">
                            You're busy running jobs, not learning software. That's why we handle the entire setup—so you can start saving money on day one, not day thirty.
                        </p>

                        <div className="pt-6 space-y-4">
                            <div className="flex items-center gap-3 text-sm font-bold text-foreground/70">
                                <CheckCircle2 size={18} className="text-primary" />
                                <span>Accounting System Sync</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-foreground/70">
                                <CheckCircle2 size={18} className="text-primary" />
                                <span>Custom Site Geofencing</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-foreground/70">
                                <CheckCircle2 size={18} className="text-primary" />
                                <span>1-on-1 Admin Training</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <a href="https://cal.com/crewtrace/15min" target="_blank" rel="noopener noreferrer" className="group relative">
                                {/* Glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                                <div className="relative flex items-center gap-3 bg-primary text-white font-bold px-8 py-5 rounded-2xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95 text-lg">
                                    Start Your Implementation
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Interactive Steps */}
                    <div className="w-full flex flex-col justify-between relative py-2">
                        {/* Vertical line connector */}
                        <div className="absolute left-[23.5px] top-8 bottom-8 w-[1.5px] bg-gradient-to-b from-primary/20 via-primary/10 to-transparent hidden md:block" />

                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="relative flex flex-col md:flex-row gap-6 group"
                            >
                                {/* Step Number/Icon Connector */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-foreground/5 shadow-sm flex items-center justify-center text-primary group-hover:border-primary/20 group-hover:shadow-lg transition-all duration-500 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <step.icon size={20} className="relative z-10 transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-1 right-1 text-[10px] font-bold opacity-20">{step.number}</div>
                                    </div>
                                </div>

                                {/* Step Content Card */}
                                <div className="flex-1 bg-white rounded-2xl p-5 md:p-6 border border-foreground/5 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/5 group-hover:-translate-y-0.5 transition-all duration-500 relative overflow-hidden">
                                    {/* Abstract background shape */}
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/[0.02] rounded-full blur-3xl group-hover:bg-primary/[0.05] transition-colors" />

                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                                            {step.title}
                                        </h3>
                                        <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                                            {step.benefit}
                                        </div>
                                    </div>

                                    <p className="text-sm text-foreground/50 font-medium leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Step indicator for mobile */}
                                    <div className="mt-8 flex items-center gap-2 md:hidden">
                                        <div className="w-8 h-1 bg-primary rounded-full" />
                                        <div className="text-[10px] font-bold uppercase text-primary tracking-widest">Step {step.number}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
