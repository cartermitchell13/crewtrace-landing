import { Star, Quote, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function TestimonialsSection() {
    return (
        <section id="results" className="relative overflow-hidden bg-background px-6 py-28 md:py-36">
            {/* Soft background glows for light theme */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(47,39,206,0.06)_0%,transparent_70%)]" />

            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="mb-16 flex flex-col items-center justify-center text-center">
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                        Customer proof
                    </p>
                    <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                        Real results from the field.
                    </h2>
                </div>

                <div className="relative mx-auto max-w-5xl">
                    {/* Decorative giant quote mark */}
                    <div className="pointer-events-none absolute -left-16 -top-15 z-0 hidden text-primary/10 md:block">
                        <Quote size={140} className="rotate-180" fill="currentColor" strokeWidth={0} />
                    </div>

                    <article className="surface-panel relative z-10 flex flex-col overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white shadow-xl lg:flex-row">
                        {/* Left Side: Testimonial & Person */}
                        <div className="flex flex-col justify-between p-10 md:p-14 lg:w-[60%] lg:border-r lg:border-foreground/5">
                            <div>
                                <div className="mb-6 flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <Star key={index} size={22} className="fill-[#F59E0B] text-[#F59E0B]" />
                                    ))}
                                </div>

                                <blockquote className="text-2xl font-semibold leading-[1.6] tracking-tight text-foreground md:text-[1.7rem]">
                                    &ldquo;We moved from paper logs to Crewtrace and immediately found hours we
                                    were overpaying each week. Payroll now takes minutes instead of most of
                                    Thursday.&rdquo;
                                </blockquote>
                            </div>

                            <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-5">
                                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary/10 shadow-md">
                                        <Image
                                            src="/images/jason-headshot-p-500.jpeg"
                                            alt="Jason Law, Owner of S&W Waterproofing"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-foreground">Jason Law</p>
                                        <p className="text-sm font-medium text-foreground/50">
                                            Owner, S&amp;W Waterproofing
                                        </p>
                                    </div>
                                </div>

                                <div className="relative h-10 w-32 shrink-0 opacity-85 transition-opacity hover:opacity-100">
                                    <Image
                                        src="/images/sw-logo.png"
                                        alt="S&W Waterproofing Logo"
                                        fill
                                        className="object-contain object-left sm:object-right"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Metrics Highlights */}
                        <div className="flex flex-col justify-center border-t border-foreground/5 bg-[#F9F9FC] p-10 lg:w-[40%] lg:border-t-0 md:p-14">
                            <h3 className="mb-8 text-center text-xs font-black uppercase tracking-[0.2em] text-foreground/40 lg:text-left">
                                The Impact
                            </h3>
                            <div className="flex flex-col gap-5">
                                {/* Metric Card 1 */}
                                <div className="group flex items-center gap-5 rounded-2xl border border-foreground/5 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                                        <TrendingUp size={24} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-extrabold text-foreground">$1,200/mo</p>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/50">
                                            Capital Recovered
                                        </p>
                                    </div>
                                </div>

                                {/* Metric Card 2 */}
                                <div className="group flex items-center gap-5 rounded-2xl border border-foreground/5 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                                        <Clock size={24} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-extrabold text-foreground">2 weeks</p>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/50">
                                            Time to ROI
                                        </p>
                                    </div>
                                </div>

                                {/* Metric Card 3 */}
                                <div className="group flex items-center gap-5 rounded-2xl border border-foreground/5 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                                        <CheckCircle2 size={24} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-extrabold text-foreground">100%</p>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/50">
                                            Verified Timesheets
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
