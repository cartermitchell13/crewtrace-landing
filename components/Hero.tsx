import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTemplateMessaging, publicIcpPhrase } from "@/lib/messaging";

const homeMessaging = getTemplateMessaging("home");

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden bg-background px-6 pb-20 pt-32 md:pb-32 md:pt-40 scroll-mt-32"
        >
            {/* Subtle blue gradient overlay */}
            <div className="absolute top-0 right-0 -z-10 h-full w-[80%] translate-x-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(47,39,206,0.08)_0%,transparent_60%)] md:w-[60%]" />
            <div className="absolute left-0 top-1/4 -z-10 h-full w-[50%] -translate-x-1/2 bg-[radial-gradient(circle_at_left_center,rgba(47,39,206,0.04)_0%,transparent_50%)]" />

            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-8">
                    {/* Left Column - Copy & CTAs */}
                    <div className="max-w-2xl text-left">
                        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                            Get a personalized demo + quote
                        </p>

                        <h1 className="mb-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5rem]">
                            {homeMessaging.intentHeadline}
                        </h1>

                        <p className="mb-10 max-w-xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Construction time tracking software with GPS verification and
                            geofencing. Your crew clocks in on the job site, hours sync to payroll,
                            and you stop losing money to time theft. Built {publicIcpPhrase}.
                        </p>

                        <Link
                            href="/contact"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl font-bold text-base transition-all motion-safe:hover:-translate-y-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(47,39,206,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            Get a Personalized Demo
                            <ArrowRight size={18} />
                        </Link>

                        <div className="mt-8 flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <svg
                                    className="h-5 w-5 text-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </span>
                            <p className="text-sm font-medium text-foreground/60">
                                No sales call required. <span className="text-foreground/80">Get a tailored walkthrough and quote in one business day.</span>
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Image Mockup */}
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        <div className="surface-panel relative rounded-2xl border border-foreground/5 bg-white p-2 md:p-3">
                            <div className="overflow-hidden rounded-xl border border-foreground/5 bg-white">
                                <Image
                                    src="/images/ct-hero-map-mockup.png"
                                    alt="Crewtrace construction GPS time tracking map view"
                                    width={1200}
                                    height={900}
                                    className="h-auto w-full object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
