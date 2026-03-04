import { CheckCircle2, ShieldCheck } from "lucide-react";
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
        <section id="audit" className="relative overflow-hidden bg-white px-6 pb-28 pt-20 scroll-mt-32 md:pb-36 md:pt-28">
            <div className="absolute right-0 top-0 h-[520px] w-[520px] translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[480px] w-[480px] -translate-x-1/3 translate-y-1/3 rounded-full bg-primary/[0.05] blur-3xl" />

            <div className="mx-auto max-w-6xl">
                <div className="relative overflow-hidden rounded-[2.4rem] border border-foreground/10 bg-white p-8 shadow-[0_24px_64px_-28px_rgba(47,39,206,0.45)] md:p-12 lg:p-16">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(47,39,206,0.07)_0%,transparent_55%)]" />

                    <div className="relative z-10 grid gap-9 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
                        <div className="space-y-6">
                            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                {messaging.primaryCta}
                            </p>

                            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
                                Book a short audit and leave with a clear payroll action plan.
                            </h2>

                            <p className="max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                                We review your current time-tracking flow, show where leakage usually
                                hides, and map the fastest rollout steps {publicIcpPhrase}.{" "}
                                {orderedPromiseLine}
                            </p>

                            <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-5">
                                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                                    <ShieldCheck size={14} />
                                    Implementation fit check
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-foreground/70 md:text-base">
                                    If Crewtrace is not a fit for your workflow, we tell you directly.
                                    If it is a fit, you get a rollout sequence your team can use.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-5 text-sm font-semibold text-foreground/55">
                                <p className="inline-flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-primary" />
                                    ROI signal in 15 minutes
                                </p>
                                <p className="inline-flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-primary" />
                                    No hard-sell close call
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-foreground/10 bg-[#FBFBFE] p-5 md:p-6">
                            <BookedCallLink
                                asButton
                                buttonSize="lg"
                                cluster={cluster}
                                templateType={templateType}
                                landingPath={landingPath}
                                ctaLabel={messaging.primaryCta}
                                ctaLocation="lower_page"
                                className="w-full"
                            >
                                {messaging.primaryCta}
                            </BookedCallLink>
                            <p className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-foreground/45">
                                Calendar opens in a new tab
                            </p>
                            <div className="mt-5 rounded-xl border border-foreground/10 bg-white px-4 py-3 text-sm leading-relaxed text-foreground/65">
                                We cover workflow fit and rollout order in the same audit call, so
                                you leave with one clear next step.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
