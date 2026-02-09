import { LucideIcon, MapPin, BarChart3, FileCheck2, CreditCard, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";
import React from "react";

interface BentoCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    className?: string;
    children?: React.ReactNode;
    badge?: string;
    iconBgColor?: string;
}

const BentoCard = ({
    title,
    description,
    icon: Icon,
    className = "",
    children,
    badge,
    iconBgColor = "bg-primary/10"
}: BentoCardProps) => (
    <div className={`group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col justify-between ${className}`}>
        {/* Subtle Background Glow on Hover */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

        <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBgColor} text-primary ring-1 ring-primary/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon size={28} />
                </div>
                {badge && (
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase">
                        {badge}
                    </span>
                )}
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
            <p className="text-foreground/60 font-medium leading-relaxed max-w-[90%]">{description}</p>
        </div>

        {children && (
            <div className="mt-6 relative z-10 w-full overflow-hidden">
                {children}
            </div>
        )}

        {/* Decorative corner element */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
            <ArrowUpRight size={24} className="text-primary" />
        </div>
    </div>
);

export default function FeatureGrid() {
    return (
        <section id="features" className="py-32 px-6 bg-[#FBFBFE]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold">
                        <CheckCircle2 size={16} />
                        <span>Profit Leak Prevention</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                        The Construction Profit <span className="text-primary">Protection System</span>
                    </h2>
                    <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                        Paper timesheets and the "honor system" are costing you thousands. Every single week. Here's how we fix that.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-min md:auto-rows-[auto]">
                    {/* Feature 1: Verified Clock-ins (2x2) */}
                    <BentoCard
                        title="Verified Clock-ins"
                        description="GPS confirmation means you know exactly when and where your crew starts work. No more guessing from messy paper logs."
                        icon={MapPin}
                        className="md:col-span-2 md:row-span-2 min-h-[400px]"
                        badge="GPS Verified"
                    >
                        <div className="relative mt-4 w-full rounded-2xl overflow-hidden">
                            <img
                                src="/images/gps-feature-image.png"
                                alt="GPS geofence verification showing worker location on job site"
                                className="w-full h-auto rounded-2xl shadow-lg group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </BentoCard>

                    {/* Feature 2: Real-time Costs (2x1) */}
                    <BentoCard
                        title="Live Labor Budgeting"
                        description="Watch labor dollars accumulate in real-time. Catch budget overruns before they blow up your margin."
                        icon={BarChart3}
                        className="md:col-span-2 md:row-span-1"
                        badge="Real-time"
                    />

                    {/* Feature 3: One-Click Payroll (1x1) */}
                    <BentoCard
                        title="One-Click Sync"
                        description="Verified hours flow straight into Sage, QuickBooks, or Procore."
                        icon={CreditCard}
                        className="md:col-span-1 md:row-span-1"
                    >
                        <div className="flex gap-2 mt-2 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-[8px]">Sage</div>
                            <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-[8px]">QB</div>
                            <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-[8px]">PC</div>
                        </div>
                    </BentoCard>

                    {/* Feature 4: Automated Reports (1x1) */}
                    <BentoCard
                        title="Zero Data Entry"
                        description="Reports generate themselves. No more chasing timecards."
                        icon={FileCheck2}
                        className="md:col-span-1 md:row-span-1"
                    >
                        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 group-hover:border-primary/20 transition-colors">
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-primary/40 group-hover:translate-x-full transition-transform duration-[2000ms] ease-in-out" />
                            </div>
                            <div className="h-1.5 w-[70%] bg-slate-200 rounded-full" />
                        </div>
                    </BentoCard>

                    {/* Feature 5: Success Story (3x1) */}
                    <div className="md:col-span-3 bg-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/15 transition-colors duration-700" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-bold tracking-wider uppercase">
                                    Case Study: S&W Waterproofing
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                                    Recovered <span className="text-secondary tracking-tight">$1,200</span> in the first 30 days.
                                </h3>
                                <p className="text-xl text-white/80 font-medium leading-relaxed italic">
                                    "Our old paper system made it impossible to track hours accurately. Once we could actually see the real data, we realized how much we were overpaying every week."
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="p-6 bg-white/10 rounded-3xl backdrop-blur-md border border-white/10 text-center">
                                    <div className="text-4xl font-bold text-secondary mb-1">2 Weeks</div>
                                    <div className="text-sm font-bold opacity-80 uppercase tracking-widest">Time to ROI</div>
                                </div>
                                <button className="bg-white text-primary hover:bg-white/90 transition-all font-bold px-8 py-4 rounded-2xl shadow-xl shadow-black/10 flex items-center justify-center gap-2">
                                    Calculate Your ROI <ArrowUpRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Feature 6: Get Sundays Back (1x1) */}
                    <BentoCard
                        title="Sundays Back"
                        description="Stop doing payroll math on your weekends."
                        icon={Clock}
                        className="md:col-span-1 md:row-span-1"
                        iconBgColor="bg-orange-500/10"
                    />
                </div>
            </div>
        </section>
    );
}
