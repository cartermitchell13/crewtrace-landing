import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTemplateMessaging } from "@/lib/messaging";

const homeMessaging = getTemplateMessaging("home");

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden bg-background px-6 pb-16 pt-28 md:pb-32 md:pt-40 scroll-mt-32"
        >
            {/* Subtle blue gradient overlay */}
            <div className="absolute top-0 right-0 -z-10 h-full w-[80%] translate-x-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(47,39,206,0.08)_0%,transparent_60%)] md:w-[60%]" />
            <div className="absolute left-0 top-1/4 -z-10 h-full w-[50%] -translate-x-1/2 bg-[radial-gradient(circle_at_left_center,rgba(47,39,206,0.04)_0%,transparent_50%)]" />

            <div className="mx-auto max-w-7xl">
                {/* Centered Copy & CTAs */}
                <div className="mx-auto max-w-4xl text-center">
                    <div className="mb-4 sm:mb-6 inline-flex max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.025] py-[3px] pl-[3px] pr-2.5 text-[11px] font-medium text-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:gap-2 sm:py-1 sm:pl-1 sm:pr-4 sm:text-xs">
                        <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-primary sm:px-2 sm:text-[10px]">
                            Soon
                        </span>
                        <span className="hidden text-foreground/25 sm:inline" aria-hidden="true">·</span>
                        <span className="whitespace-nowrap">
                            <span className="sm:hidden">QuickBooks &amp; Gusto sync</span>
                            <span className="hidden sm:inline">One-click sync with QuickBooks &amp; Gusto</span>
                        </span>
                    </div>

                    <h1 className="mb-5 sm:mb-8 text-3xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-[5rem]">
                        {homeMessaging.intentHeadline}
                    </h1>

                    <p className="mx-auto mb-7 sm:mb-10 max-w-xl text-base font-medium leading-relaxed text-foreground/70 md:text-xl">
                        Crews clock in at the job site, hours sync to payroll, and you stop
                        losing money to time theft.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-sm sm:text-base transition-all motion-safe:hover:-translate-y-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(47,39,206,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            Get a Personalized Demo
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <p className="mx-auto mt-4 sm:mt-6 max-w-md text-center text-sm font-medium text-foreground/60">
                        No sales call required. <span className="text-foreground/80">Get a tailored walkthrough and quote in one business day.</span>
                    </p>
                </div>

                {/* Video below */}
                <div className="mt-12 md:mt-20">
                    <div className="relative overflow-hidden rounded-2xl border border-foreground/5 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-auto w-full"
                        >
                            <source src="/videos/hero-video.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
}
