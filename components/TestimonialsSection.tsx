export default function TestimonialsSection() {
    return (
        <section id="results" className="py-24 px-6 bg-white overflow-hidden relative scroll-mt-32">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Know exactly what you're paying for.
                        </h2>
                        <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                            When you rely on paper and memory, hours slip through the cracks. Crewtrace gives you the real numbers—so you can pay accurately and confidently.
                        </p>
                        <div className="flex gap-12 pt-4">
                            <div>
                                <div className="text-4xl font-bold text-primary">$1,000+</div>
                                <div className="text-sm font-bold text-foreground/40 uppercase tracking-wider mt-2">Monthly Savings</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary">100%</div>
                                <div className="text-sm font-bold text-foreground/40 uppercase tracking-wider mt-2">Verified Hours</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 rounded-[2.5rem] bg-background border border-foreground/5 shadow-sm space-y-6">
                        <p className="text-2xl font-bold italic tracking-tight leading-relaxed">
                            "With paper timesheets, we had no way to know if hours were accurate. Rounding, memory errors, messy handwriting—it all added up. Crewtrace gave us the real numbers, and now we're saving thousands every month. Plus payroll that used to take hours only takes minutes."
                        </p>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="font-bold text-foreground">Jason Law</div>
                                <div className="text-sm text-foreground/40 font-medium">S&W Waterproofing</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                                    Thousands saved monthly
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

