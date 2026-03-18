import { LucideIcon, MapPin, BarChart3, FileCheck2, FileDown, Clock, CheckCircle2, ArrowUpRight, BellRing } from "lucide-react";
import React from "react";
import Link from "next/link";

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
    <div className={`group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white p-6 md:p-7 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col justify-between ${className}`}>
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

        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
            <ArrowUpRight size={24} className="text-primary" />
        </div>
    </div>
);

export default function FeatureGrid() {
    return (
        <section id="features" className="py-32 px-6 bg-background scroll-mt-32">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold">
                        <CheckCircle2 size={16} />
                        <span>Payroll Risk Control</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                        GPS Time Tracking and <span className="text-primary">Payroll Controls</span> for Construction
                    </h2>
                    <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                        Replace paper timesheets and guesswork with GPS-verified employee time tracking your team can trust every week.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-min md:auto-rows-[auto]">
                    <BentoCard
                        title="Verified Clock-ins"
                        description="GPS confirmation shows exactly when and where each crew starts work, so approvals are based on evidence."
                        icon={MapPin}
                        className="md:col-span-2 md:col-start-1 md:row-start-1 md:row-span-1 min-h-[270px] justify-start"
                        badge="GPS Verified"
                    >
                        <div className="relative mx-auto mt-4 w-full max-w-[720px] overflow-hidden rounded-2xl border border-foreground/10 bg-slate-50 p-1.5">
                            <img
                                src="/images/gps-feature-image.png"
                                alt="GPS geofence verification showing worker location on job site"
                                className="h-56 w-full rounded-xl object-contain shadow-lg group-hover:scale-[1.01] transition-transform duration-500 md:h-60"
                            />
                        </div>
                    </BentoCard>

                    <BentoCard
                        title="Anomaly Alerts"
                        description="Get notified when Crewtrace detects suspicious punch patterns, so admin can review issues before payroll errors compound."
                        icon={BellRing}
                        className="md:col-span-2 md:col-start-1 md:row-start-2 md:row-span-1"
                        badge="Flagged for Review"
                    >
                        <div className="mt-3 space-y-2">
                            {[
                                { issue: "Early punch-in outside geofence", status: "Needs review" },
                                { issue: "Unusually long break duration", status: "Investigate" },
                                { issue: "Duplicate punch sequence", status: "Check record" },
                            ].map((alert) => (
                                <div
                                    key={alert.issue}
                                    className="flex items-center justify-between rounded-xl border border-amber-200/60 bg-amber-50/70 px-3 py-2"
                                >
                                    <span className="text-xs font-semibold text-foreground/75">{alert.issue}</span>
                                    <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                                        {alert.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </BentoCard>

                    <BentoCard
                        title="Live Labor Budgeting"
                        description="Watch labor dollars accumulate in real time and catch budget drift before payroll closes."
                        icon={BarChart3}
                        className="md:col-span-2 md:col-start-3 md:row-start-1 md:row-span-1"
                        badge="Real-time"
                    >
                        <div className="flex items-end gap-1.5 h-12 mt-2">
                            {[
                                { h: "h-[30%]", label: "Mon" },
                                { h: "h-[55%]", label: "Tue" },
                                { h: "h-[40%]", label: "Wed" },
                                { h: "h-[75%]", label: "Thu" },
                                { h: "h-[60%]", label: "Fri" },
                            ].map(({ h, label }) => (
                                <div key={label} className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
                                    <div className={`w-full rounded-t-md bg-slate-200 group-hover:bg-primary/50 transition-colors duration-500 ${h}`} />
                                </div>
                            ))}
                            <div className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
                                <div className="w-full h-[90%] rounded-t-md bg-slate-200 group-hover:bg-red-400/70 transition-colors duration-500" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1.5">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                                <div key={d} className={`flex-1 text-center text-[9px] font-bold tracking-wider uppercase transition-colors duration-500 ${i === 5 ? "text-red-400" : "text-slate-400"}`}>{d}</div>
                            ))}
                        </div>
                    </BentoCard>

                    <BentoCard
                        title="Flexible CSV Exports"
                        description="Export payroll-ready files in the format your payroll stack expects without manual reformatting."
                        icon={FileDown}
                        className="md:col-span-1 md:col-start-3 md:row-start-2 md:row-span-1"
                    >
                        <div className="flex flex-col gap-1.5 mt-2">
                            {["Standard CSV", "ADP", "QuickBooks"].map((label) => (
                                <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:border-primary/20 transition-colors">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                                    <span className="text-xs font-semibold text-foreground/60 group-hover:text-foreground/80 transition-colors">{label}</span>
                                </div>
                            ))}
                        </div>
                    </BentoCard>

                    <BentoCard
                        title="Instant Payroll Reports"
                        description="When the shift ends, your report is ready with hours, costs, and crew context already compiled."
                        icon={FileCheck2}
                        className="md:col-span-1 md:col-start-4 md:row-start-2 md:row-span-1"
                    >
                        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:border-primary/20 transition-colors space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="h-2 w-20 bg-slate-200 rounded-full" />
                                    <div className="h-2 w-14 bg-slate-100 rounded-full" />
                                </div>
                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 group-hover:bg-emerald-100 text-slate-400 group-hover:text-emerald-600 text-[10px] font-bold uppercase tracking-wider transition-all duration-500">
                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-emerald-500 group-hover:animate-pulse transition-colors duration-500" />
                                    Report Ready
                                </span>
                            </div>
                        </div>
                    </BentoCard>

                    <div className="md:col-span-3 md:col-start-1 md:row-start-3 bg-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
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
                                    &ldquo;We moved off paper logs, found recurring overpayment fast, and cut payroll review time down to minutes.&rdquo;
                                </p>
                                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                                        How the savings were achieved
                                    </p>
                                    <ul className="mt-3 space-y-2 text-sm font-medium leading-relaxed text-white/90">
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary" />
                                            Configured geofenced clock-in zones across active projects.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary" />
                                            Added supervisor alerts for early punch-ins and long breaks.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary" />
                                            Standardized payroll exports for faster end-of-week approvals.
                                        </li>
                                    </ul>
                                </div>
                                <Link
                                    href="/case-studies/sw-waterproofing-payroll-recovery"
                                    className="inline-flex text-sm font-bold text-white underline decoration-white/45 underline-offset-4 transition-colors hover:text-secondary"
                                >
                                    Read the full S&W case study
                                </Link>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="p-6 bg-white/10 rounded-3xl backdrop-blur-md border border-white/10 text-center">
                                    <div className="text-4xl font-bold text-secondary mb-1">2 Weeks</div>
                                    <div className="text-sm font-bold opacity-80 uppercase tracking-widest">Time to ROI</div>
                                </div>
                                <Link
                                    href="/calculator"
                                    className="inline-flex items-center justify-center gap-2 font-bold rounded-xl shadow-button transition-all whitespace-nowrap hover:translate-y-[-2px] hover:translate-x-[-2px] active:translate-y-[0px] active:translate-x-[0px] bg-white text-primary hover:bg-white/90 px-10 py-5 text-lg"
                                >
                                    Calculate Your ROI
                                </Link>
                            </div>
                        </div>
                    </div>

                    <BentoCard
                        title="Sundays Back"
                        description="Stop spending weekends reconciling timesheets and payroll corrections."
                        icon={Clock}
                        className="md:col-span-1 md:col-start-4 md:row-start-3 md:row-span-1"
                        iconBgColor="bg-orange-500/10"
                    >
                        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:border-orange-200 transition-colors duration-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-500 transition-colors">Friday</div>
                                    <div className="text-xl font-bold text-slate-300 group-hover:text-slate-700 transition-colors duration-500 tabular-nums">5:00 PM</div>
                                </div>
                                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 group-hover:bg-orange-100 text-slate-400 group-hover:text-orange-600 text-[10px] font-bold uppercase tracking-wider transition-all duration-500">
                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-orange-400 group-hover:animate-pulse transition-colors duration-500" />
                                    Weekend
                                </span>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
}
