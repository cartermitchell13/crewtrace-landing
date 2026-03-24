import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
    orderedPromiseLine,
    publicIcpPhrase,
} from "@/lib/messaging";

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
        <section id="audit" className="relative overflow-hidden bg-background px-6 pb-28 pt-20 scroll-mt-32 md:pb-36 md:pt-28">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-12 lg:p-16">
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
                                See exactly how Crewtrace fits your operation.
                            </h2>

                            <div className="max-w-xl text-lg md:text-xl font-medium leading-relaxed text-white/80">
                                Answer a few quick questions and we&apos;ll send back a
                                tailored demo walkthrough and pricing guidance {publicIcpPhrase}.{" "}
                                {orderedPromiseLine}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 sm:items-center text-sm font-semibold text-white/60">
                                <div className="inline-flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
                                        <CheckCircle2 size={14} />
                                    </span>
                                    Personalized walkthrough
                                </div>
                                <div className="inline-flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
                                        <CheckCircle2 size={14} />
                                    </span>
                                    No hard-sell call
                                </div>
                            </div>
                        </div>

                        {/* Right side card */}
                        <div className="relative flex flex-col rounded-2xl border border-white/15 bg-white/10 p-8 overflow-hidden">
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/70 mb-4">
                                    <ShieldCheck size={16} />
                                    Implementation fit check
                                </div>

                                <div className="text-base font-medium leading-relaxed text-white/80 mb-8">
                                    If Crewtrace is not a fit for your workflow, we tell you directly.
                                    If it is a fit, you get a rollout sequence your team can use.
                                </div>

                                <Link
                                    href="/contact"
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-5 text-base font-bold text-primary transition-all hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#12122a] motion-safe:hover:-translate-y-0.5 md:py-6 md:text-lg"
                                >
                                    Request Your Custom Demo
                                    <ArrowRight size={20} />
                                </Link>

                                <div className="mt-6 flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-white/40 shrink-0" />
                                    <div className="text-xs leading-relaxed text-white/50">
                                        Takes about 60 seconds. We respond within one business day
                                        with a walkthrough tailored to your crew setup.
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
