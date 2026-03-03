import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    Clock3,
    MapPin,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

const valueCards = [
    {
        title: "Verify every start and stop",
        description:
            "Clock-ins are tied to real job sites, so payroll approvals start with evidence instead of guesswork.",
        icon: MapPin,
        href: "/features/gps-time-tracking",
        label: "GPS time tracking",
    },
    {
        title: "Catch leakage before payroll closes",
        description:
            "Same-week exception visibility helps field leads fix issues before overpayment compounds.",
        icon: TrendingUp,
        href: "/features/payroll-leakage-prevention",
        label: "Payroll leakage prevention",
    },
    {
        title: "Keep compliance records audit-ready",
        description:
            "Edit history and approval records are preserved in one place for cleaner DOL response workflows.",
        icon: ShieldCheck,
        href: "/features/dol-compliance",
        label: "DOL compliance tracking",
    },
    {
        title: "Finish payroll review faster",
        description:
            "Export approved labor data in payroll-ready formats so your team spends less time cleaning data.",
        icon: Clock3,
        href: "/features/payroll-exports",
        label: "Payroll exports",
    },
];

export default function FeatureGrid() {
    return (
        <section id="features" className="scroll-mt-32 bg-[#F7F7FD] px-6 py-26 md:py-30">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-3xl space-y-5 text-center">
                    <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        <CheckCircle2 size={14} />
                        What changes in week one
                    </p>
                    <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
                        Build a payroll process your team can trust every Friday.
                    </h2>
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                        Start with one workflow, then stack controls as your crews grow. Each step
                        links directly into feature and industry templates for deeper evaluation.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2">
                    {valueCards.map((card) => (
                        <article
                            key={card.title}
                            className="group rounded-3xl border border-foreground/10 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <card.icon size={24} />
                                </div>
                                <span className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary/80">
                                    {card.label}
                                </span>
                            </div>
                            <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
                                {card.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
                                {card.description}
                            </p>
                            <Link
                                href={card.href}
                                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors group-hover:text-primary/80"
                            >
                                Explore workflow
                                <ArrowRight size={15} />
                            </Link>
                        </article>
                    ))}
                </div>

                <div className="mt-8 rounded-3xl border border-foreground/10 bg-white p-6 md:mt-10 md:p-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold tracking-tight text-foreground">
                                Need a trade-specific rollout path?
                            </h3>
                            <p className="max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">
                                Jump from feature workflows into industry pages to see operational
                                fit, proof points, and implementation guidance for your crews.
                            </p>
                        </div>
                        <Link
                            href="/industries"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-button transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0"
                        >
                            Browse industries
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
