import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import BookedCallLink from "@/components/BookedCallLink";
import {
    getTemplateMessaging,
    orderedPromiseLine,
    publicIcpPhrase,
} from "@/lib/messaging";

type CTASectionProps = {
    cluster?: string;
    templateType?: string;
    landingPath?: string;
};

export default function CTASection({
    cluster = "home",
    templateType = "shared_cta",
    landingPath = "/",
}: CTASectionProps) {
    const messaging = getTemplateMessaging("home");

    return (
        <section id="audit" className="relative overflow-hidden bg-background px-6 pb-28 pt-20 scroll-mt-32 md:pb-36 md:pt-28">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0E17] border border-white/10 p-8 md:p-12 lg:p-16 shadow-[0_24px_80px_-20px_rgba(47,39,206,0.6)]">

                    {/* Background Gradients/Glows */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

                    <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#B2ACFF] backdrop-blur-md">
                                {messaging.primaryCta}
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight text-white">
                                Book a short audit and leave with a clear payroll action plan.
                            </h2>

                            <div className="max-w-xl text-lg md:text-xl font-medium leading-relaxed text-slate-300">
                                We review your time-tracking flow to identify hidden leakage and map
                                the fastest rollout steps {publicIcpPhrase}.{" "}
                                {orderedPromiseLine}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 sm:items-center text-sm font-semibold text-slate-400">
                                <div className="inline-flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1c223b] text-primary">
                                        <CheckCircle2 size={14} />
                                    </span>
                                    ROI signal in 15 minutes
                                </div>
                                <div className="inline-flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1c223b] text-primary">
                                        <CheckCircle2 size={14} />
                                    </span>
                                    No hard-sell close call
                                </div>
                            </div>
                        </div>

                        {/* Right side interactive card */}
                        <div className="relative flex flex-col rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#B2ACFF] mb-4">
                                    <ShieldCheck size={16} />
                                    Implementation fit check
                                </div>

                                <div className="text-base font-medium leading-relaxed text-slate-200 mb-8">
                                    If Crewtrace is not a fit for your workflow, we tell you directly.
                                    If it is a fit, you get a rollout sequence your team can use.
                                </div>

                                <BookedCallLink
                                    asButton={false}
                                    cluster={cluster}
                                    templateType={templateType}
                                    landingPath={landingPath}
                                    ctaLabel={messaging.primaryCta}
                                    ctaLocation="lower_page"
                                    className="w-full bg-white text-[#0A0E17] font-bold py-5 md:py-6 rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-3 text-base md:text-lg border-2 border-transparent shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-[1.01]"
                                >
                                    {messaging.primaryCta}
                                    <ArrowRight size={20} />
                                </BookedCallLink>

                                <div className="mt-6 flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
                                    <div className="text-xs leading-relaxed text-slate-400">
                                        We cover workflow fit and rollout order in the same audit call, so
                                        you leave with one clear next step. Calendar opens in a new tab.
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
