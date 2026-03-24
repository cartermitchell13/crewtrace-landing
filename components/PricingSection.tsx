import { Check, ArrowRight, Clock, Zap } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
    return (
        <section id="pricing" className="relative overflow-hidden bg-background px-6 py-28 scroll-mt-32 md:py-36">
            {/* Subtle background pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
                        Simple pricing.<br className="sm:hidden" /> <span className="text-primary">Massive ROI.</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-medium">
                        Stop losing thousands to time theft and manual data entry. Get a fast return on investment with our founding client offer.
                    </p>
                </div>

                <div className="relative">
                    {/* Clean White Card with internal blue gradient */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 md:p-12 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] lg:p-16 flex flex-col lg:flex-row gap-12 lg:gap-16">

                        {/* Left Side: Info & Price */}
                        <div className="flex-1 relative z-10 flex flex-col justify-center">
                            <div className="mb-6">
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                                    Founding Clients
                                </h3>
                                <div className="text-slate-500 font-medium flex items-center gap-2">
                                    <Zap size={16} className="text-primary" /> Full platform access
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="text-slate-900 font-medium mb-1 flex items-baseline gap-2">
                                    <span className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                                        $999
                                    </span>
                                    <span className="text-slate-500 text-lg">setup</span>
                                </div>
                                <div className="font-medium flex items-baseline gap-2">
                                    <span className="text-3xl lg:text-4xl font-bold tracking-tight text-primary">
                                        +$99
                                    </span>
                                    <span className="text-slate-500 text-lg">/ month</span>
                                </div>
                                <p className="text-sm font-medium text-slate-500 mt-3 max-w-md leading-relaxed">
                                    Flat-rate pricing: one number every month, whether you&apos;re a tight crew or running multiple teams—no per-seat math, no surprise bumps as you grow.
                                </p>
                            </div>

                            <Link
                                href="/contact"
                                className="relative w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(47,39,206,0.15)] text-lg"
                            >
                                <span className="flex items-center gap-2">
                                    Claim Founding Offer
                                    <ArrowRight size={20} />
                                </span>
                            </Link>

                            <div className="text-center text-slate-500 text-sm mt-4 font-medium">
                                No credit card required. Get a personalized demo first.
                            </div>
                        </div>

                        {/* Divider for desktop */}
                        <div className="hidden lg:block w-px bg-slate-200" />
                        {/* Divider for mobile */}
                        <div className="block lg:hidden h-px w-full bg-slate-200" />

                        {/* Right Side: Features & Scarcity */}
                        <div className="flex-[1.2] relative z-10 flex flex-col justify-center">
                            {/* Scarcity Banner */}
                            <div className="flex items-start gap-4 bg-primary/5 border border-primary/20 rounded-xl p-5 mb-8">
                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Clock size={16} />
                                </div>
                                <div>
                                    <div className="text-slate-900 font-bold tracking-tight text-lg">Only for the next 5 companies</div>
                                    <div className="text-slate-600 font-medium mt-0.5">After these 5 spots, pricing increases</div>
                                </div>
                            </div>

                            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-5 text-slate-600">
                                {[
                                    "GPS-verified time tracking",
                                    "Automated timesheets",
                                    "White-glove onboarding",
                                    "Unlimited projects",
                                    "Dedicated support channel",
                                    "Payroll report exports",
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 font-medium">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
                                            <Check size={14} strokeWidth={3} />
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
