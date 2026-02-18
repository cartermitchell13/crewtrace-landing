import { Star } from "lucide-react";

export default function TestimonialsSection() {
    return (
        <section id="results" className="py-32 px-6 bg-white overflow-hidden relative scroll-mt-32">
            {/* Soft radial background tint */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(47,39,206,0.04)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Section label */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Real Customer Result
                    </div>
                </div>

                {/* Quote card */}
                <div className="rounded-[2.5rem] bg-[#FBFBFE] border border-foreground/5 shadow-[0_8px_40px_-8px_rgba(47,39,206,0.08)] p-10 md:p-14 space-y-8">

                    {/* Stars */}
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} className="fill-primary text-primary" />
                        ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-2xl md:text-3xl font-bold tracking-tight leading-[1.45] text-foreground">
                        "With paper timesheets, we had no way to know if hours were accurate. Rounding, memory errors, messy handwriting—it all added up. Crewtrace gave us the real numbers, and now we're saving thousands every month. Plus payroll that used to take hours only takes minutes."
                    </blockquote>

                    {/* Attribution + stats */}
                    <div className="pt-6 border-t border-foreground/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
                        {/* Person */}
                        <div className="flex items-center gap-4">
                            <div className="h-11 w-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                JL
                            </div>
                            <div>
                                <div className="font-bold text-foreground">Jason Law</div>
                                <div className="text-sm text-foreground/40 font-medium">Owner, S&amp;W Waterproofing</div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 sm:gap-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">$1,200<span className="text-base">/mo</span></div>
                                <div className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mt-0.5">Recovered</div>
                            </div>
                            <div className="w-px h-8 bg-foreground/10" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">2 <span className="text-base">wks</span></div>
                                <div className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mt-0.5">To Full ROI</div>
                            </div>
                            <div className="w-px h-8 bg-foreground/10" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">100<span className="text-base">%</span></div>
                                <div className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mt-0.5">Verified Hours</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
