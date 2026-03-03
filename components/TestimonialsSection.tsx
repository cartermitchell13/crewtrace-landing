import { Star } from "lucide-react";

export default function TestimonialsSection() {
    return (
        <section id="results" className="relative overflow-hidden bg-white px-6 py-26 scroll-mt-32 md:py-30">
            <div className="absolute left-1/2 top-0 h-[480px] w-[920px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(47,39,206,0.06)_0%,transparent_70%)]" />

            <div className="relative z-10 mx-auto max-w-5xl">
                <div className="mb-12 flex justify-center md:mb-14">
                    <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        Customer proof
                    </p>
                </div>

                <article className="space-y-7 rounded-[2.2rem] border border-foreground/10 bg-[#FBFBFE] p-8 shadow-[0_18px_50px_-24px_rgba(47,39,206,0.45)] md:p-12">
                    <div className="flex gap-1 text-primary">
                        {[...Array(5)].map((_, index) => (
                            <Star key={index} size={18} className="fill-primary text-primary" />
                        ))}
                    </div>

                    <blockquote className="text-xl font-bold leading-[1.45] tracking-tight text-foreground md:text-3xl">
                        &ldquo;We moved from paper logs to Crewtrace and immediately found hours we
                        were overpaying each week. Payroll now takes minutes instead of most of
                        Sunday.&rdquo;
                    </blockquote>

                    <div className="grid gap-6 border-t border-foreground/10 pt-6 md:grid-cols-[1.1fr_1fr] md:items-center">
                        <div>
                            <p className="text-base font-bold text-foreground">Jason Law</p>
                            <p className="text-sm font-medium text-foreground/50">
                                Owner, S&amp;W Waterproofing
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="rounded-xl border border-foreground/10 bg-white p-3">
                                <p className="text-lg font-bold text-primary">$1,200/mo</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                                    Recovered
                                </p>
                            </div>
                            <div className="rounded-xl border border-foreground/10 bg-white p-3">
                                <p className="text-lg font-bold text-primary">2 weeks</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                                    To ROI
                                </p>
                            </div>
                            <div className="rounded-xl border border-foreground/10 bg-white p-3">
                                <p className="text-lg font-bold text-primary">100%</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                                    Verified
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
