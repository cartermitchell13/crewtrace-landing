import { CheckCircle2, Clock, Shield, Zap } from "lucide-react";

const benefits = [
    {
        icon: Zap,
        title: "Personalized demo + quote",
        description:
            "One video walkthrough of Crewtrace for your operation, with your quote built in. Watch whenever it fits",
    },
    {
        icon: Shield,
        title: "No hard-sell call",
        description:
            "We email one link. Watch the full walkthrough and pricing on your schedule, no live pitch",
    },
    {
        icon: Clock,
        title: "One business day",
        description: "Expect your video link within 24 hours",
    },
] as const;

/**
 * Left column from /contact: benefit cards, trust block, and Cal.com link.
 * Shared with the calculator “next step” section for visual parity.
 */
export default function ContactDemoValueColumn() {
    return (
        <div className="flex flex-col gap-8">
            <div className="space-y-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40">
                    What you&apos;ll get
                </h2>
                <div className="space-y-4">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.title}
                            className="flex items-start gap-4 rounded-2xl border border-foreground/[0.06] bg-white p-5 transition-colors hover:border-primary/10"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                <benefit.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-foreground">
                                    {benefit.title}
                                </h3>
                                <p className="mt-0.5 text-sm text-foreground/50 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-2xl border border-foreground/[0.06] bg-white p-6">
                <div className="mb-4 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-bold text-foreground">
                        Trusted by construction owners
                    </span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/60">
                    We hate unnecessary meetings too. That&apos;s why we keep this
                    simple: tell us a bit about your crews, and we&apos;ll send one
                    video with your demo and quote. Watch it whenever you want. No
                    call required.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {[
                        "No pressure",
                        "No calendar ping-pong",
                        "Just the info you need",
                    ].map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-foreground/[0.04] px-3 py-1 text-xs font-semibold text-foreground/50"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="space-y-3 text-sm">
                <p className="font-semibold text-foreground/60">
                    Prefer a live call?{" "}
                    <a
                        href="https://cal.com/Crewtrace/15min"
                        className="text-primary underline underline-offset-2"
                    >
                        Book 15 minutes
                    </a>
                </p>
            </div>
        </div>
    );
}
