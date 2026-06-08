import { CalendarClock, CheckCircle2, Shield, Zap } from "lucide-react";

const benefits = [
    {
        icon: Zap,
        title: "Focused payroll leakage review",
        description:
            "Your crew size, timekeeping workflow, and where verified hours can help first.",
    },
    {
        icon: Shield,
        title: "No hard sell",
        description:
            "If Crewtrace is not a fit, we say that. If it is, you leave with a clear next step.",
    },
    {
        icon: CalendarClock,
        title: "Fifteen focused minutes",
        description:
            "Enough time to review the problem and decide whether a deeper rollout conversation makes sense.",
    },
] as const;

const trustTags = ["No pressure", "15 minutes", "Clear next step"] as const;

type ContactDemoValueColumnProps = {
    className?: string;
};

/**
 * Left column from /contact: benefit list and trust cues inside the booking panel.
 */
export default function ContactDemoValueColumn({
    className = "",
}: ContactDemoValueColumnProps) {
    return (
        <div className={`flex h-full flex-col p-8 md:p-10 lg:p-11 ${className}`}>
            <div>
                <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.14em] text-primary/70">
                    What you&apos;ll get
                </p>

                <ul className="divide-y divide-foreground/[0.06]">
                    {benefits.map((benefit) => (
                        <li key={benefit.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <benefit.icon className="h-4 w-4 text-primary" aria-hidden />
                            </div>
                            <div className="min-w-0 pt-0.5">
                                <h3 className="text-base font-bold tracking-tight text-foreground">
                                    {benefit.title}
                                </h3>
                                <p className="mt-1 text-sm leading-relaxed text-foreground/55">
                                    {benefit.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-8 rounded-md border border-foreground/[0.06] bg-foreground/[0.02] p-5">
                <div className="flex items-start gap-3">
                    <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden
                    />
                    <p className="text-sm leading-relaxed text-foreground/60">
                        We keep the first call narrow: understand your crew workflow,
                        identify likely payroll leakage points, and decide whether
                        Crewtrace is worth a deeper look.
                    </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {trustTags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-foreground/[0.06] bg-white px-3 py-1 text-xs font-semibold text-foreground/55"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
