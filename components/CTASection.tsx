import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
    getTemplateMessaging,
    orderedPromiseLine,
} from "@/lib/messaging";

const contactCtaMessaging = getTemplateMessaging("contact");

type CTASectionProps = {
    cluster?: string;
    templateType?: string;
    landingPath?: string;
};

export default function CTASection({
    cluster: _cluster = "home",
    templateType: _templateType = "shared_cta",
    landingPath: _landingPath = "/",
}: CTASectionProps) {
    return (
        <section id="audit" className="relative scroll-mt-32 overflow-hidden bg-background pb-28 pt-20 md:pb-36 md:pt-28">
            <div className="layout-shell">
                <div className="relative overflow-hidden rounded-md bg-primary p-8 md:p-12 lg:p-16">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[url('/images/background-design-ct.png')] bg-cover bg-center bg-no-repeat"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-primary/35"
                    />

                    <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight text-white">
                                {contactCtaMessaging.intentHeadline}
                            </h2>

                            <div className="max-w-xl text-lg md:text-xl font-medium leading-relaxed text-white/80">
                                Invite crews and launch GPS-verified clock-ins fast—or request a demo for a tailored walkthrough and pricing.{" "}
                                {orderedPromiseLine}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 sm:items-center text-sm font-semibold text-white/70">
                                <div className="inline-flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
                                        <CheckCircle2 size={14} />
                                    </span>
                                    Invite crews and verify hours fast
                                </div>
                                <div className="inline-flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
                                        <CheckCircle2 size={14} />
                                    </span>
                                    Personalized demo on request
                                </div>
                            </div>
                        </div>

                        {/* Right side card */}
                        <div className="relative flex flex-col overflow-hidden rounded-md border border-white/20 bg-black/15 p-8 backdrop-blur-xl">
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/70 mb-4">
                                    <ShieldCheck size={16} />
                                    Implementation fit check
                                </div>

                                <div className="text-base font-medium leading-relaxed text-white/80 mb-8">
                                    If Crewtrace is not a fit for your workflow, we tell you directly.
                                    If it is a fit, you get a rollout sequence your team can use.
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="https://www.crewtrace.app/signup"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-5 py-4 text-base font-bold text-primary whitespace-nowrap transition-all hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#12122a] motion-safe:hover:-translate-y-0.5 md:text-lg lg:justify-between lg:gap-3"
                                    >
                                        <span>Sign Up for Free</span>
                                        <ArrowRight
                                            size={20}
                                            aria-hidden
                                            className="shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5"
                                        />
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="group inline-flex w-full items-center justify-center gap-2 rounded-md border-2 border-white/85 bg-transparent px-5 py-[14px] text-base font-bold text-white whitespace-nowrap transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#12122a] motion-safe:hover:-translate-y-0.5 md:text-lg lg:justify-between lg:gap-3"
                                    >
                                        <span>Request demo</span>
                                        <ArrowRight
                                            size={20}
                                            aria-hidden
                                            className="shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5"
                                        />
                                    </Link>
                                </div>

                                <div className="mt-6 flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-white/40 shrink-0" />
                                    <div className="text-xs leading-relaxed text-white/65">
                                        Sign up takes about a minute. Demo requests get a tailored walkthrough—we reply within one business day.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
