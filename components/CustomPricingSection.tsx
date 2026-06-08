import { Check, Sparkles, Users, Wrench } from "lucide-react";
import BookedCallLink from "@/components/BookedCallLink";

const onboardingSteps = [
    {
        title: "We configure everything",
        description:
            "Job sites, geofences, crews, and payroll export—mapped to how you actually run jobs.",
        Icon: Wrench,
    },
    {
        title: "Your team gets trained",
        description:
            "Live walkthroughs for field crews and office staff so clock-ins stick from day one.",
        Icon: Users,
    },
    {
        title: "Live before payroll week one",
        description:
            "Structured rollout with migrations handled. You don't lift a finger—we get you running.",
        Icon: Sparkles,
    },
] as const;

const includedBullets = [
    "GPS time tracking, geofencing, and anomaly alerts",
    "Scheduling and QuickBooks payroll sync",
    "Crew mobile apps with offline punch sync",
    "Hands-on onboarding and rollout support",
] as const;

const bookedCallCtaClassName =
    "mt-8 w-full justify-center !px-6 !py-3.5 !text-sm font-bold tracking-tight shadow-[0_2px_8px_rgba(47,39,206,0.18)] transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_4px_16px_rgba(47,39,206,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:!py-4 sm:!text-base";

type CustomPricingSectionProps = {
    /** Attribution path for booked-call CTAs on this surface. */
    landingPath?: string;
};

export default function CustomPricingSection({
    landingPath = "/",
}: CustomPricingSectionProps) {
    return (
        <section
            id="pricing"
            className="relative scroll-mt-32 overflow-hidden bg-background py-24 md:py-32"
            aria-labelledby="custom-pricing-heading"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(47,39,206,0.07),transparent)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.022] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:22px_22px]"
            />

            <div className="relative z-10 layout-shell">
                <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
                    <div className="mb-5 inline-flex max-w-full items-center gap-1.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.025] py-[3px] pl-[3px] pr-2.5 text-[11px] font-medium text-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:gap-2 sm:py-1 sm:pl-1 sm:pr-4 sm:text-xs">
                        <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-primary sm:px-2 sm:text-[10px]">
                            Done for you
                        </span>
                        <span className="min-w-0 whitespace-nowrap">
                            <span className="sm:hidden">Zero DIY setup.</span>
                            <span className="hidden sm:inline">
                                Zero DIY setup. We handle rollout end to end.
                            </span>
                        </span>
                    </div>

                    <h2
                        id="custom-pricing-heading"
                        className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.08]"
                    >
                        Custom pricing.{" "}
                        <span className="text-primary">You don&apos;t lift a finger.</span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/60">
                        Every contractor runs crews differently. We scope pricing on a quick call
                        and roll you out with done-for-you onboarding—super easy to set up, no
                        admin marathon on your end.
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_64px_-12px_rgba(15,23,42,0.12),0_12px_32px_-8px_rgba(47,39,206,0.06)]">
                    <div
                        aria-hidden
                        className="h-px w-full bg-gradient-to-r from-transparent via-primary/35 to-transparent"
                    />

                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px]">
                        <div className="p-7 sm:p-8 xl:p-10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">
                                Your rollout, handled
                            </p>
                            <p className="mt-2 max-w-xl text-base font-medium leading-relaxed text-foreground/55">
                                Three steps from kickoff call to live crews—no spreadsheets, no
                                guesswork, no weekend admin project.
                            </p>

                            <ol className="relative mt-8 space-y-0">
                                {onboardingSteps.map((step, index) => (
                                    <li
                                        key={step.title}
                                        className="relative flex gap-5 pb-9 last:pb-0 sm:gap-6"
                                    >
                                        {index < onboardingSteps.length - 1 ? (
                                            <span
                                                aria-hidden
                                                className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-primary/25 via-primary/10 to-transparent sm:left-[22px]"
                                            />
                                        ) : null}

                                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-white text-xs font-bold tabular-nums text-primary shadow-[0_2px_8px_rgba(47,39,206,0.08)] sm:h-11 sm:w-11 sm:text-sm">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        <div className="min-w-0 flex-1 pt-0.5">
                                            <div className="flex flex-wrap items-center gap-2.5">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/[0.07] text-primary">
                                                    <step.Icon className="h-4 w-4" aria-hidden />
                                                </span>
                                                <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="mt-2 max-w-lg text-sm font-medium leading-relaxed text-foreground/55 sm:text-[15px]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>

                            <div className="mt-8 rounded-md border border-primary/10 bg-gradient-to-br from-secondary/50 via-secondary/25 to-white p-6 sm:p-7">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/60">
                                            What&apos;s included
                                        </p>
                                        <p className="mt-1.5 text-sm font-medium text-foreground/55">
                                            Full platform access from day one—no stripped-down tier.
                                        </p>
                                    </div>
                                </div>
                                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
                                    {includedBullets.map((line) => (
                                        <li
                                            key={line}
                                            className="flex items-start gap-3 rounded-md border border-white/60 bg-white/70 px-3.5 py-3 text-sm font-medium leading-snug text-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
                                        >
                                            <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary text-white">
                                                <Check className="h-2.5 w-2.5" strokeWidth={3} />
                                            </span>
                                            <span>{line}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <article
                            className="relative flex flex-col justify-between border-t border-slate-100 bg-gradient-to-b from-[#f8f7ff] via-white to-white p-7 sm:p-8 xl:border-l xl:border-t-0 xl:p-9"
                            aria-label="Custom pricing and done-for-you onboarding"
                        >
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent xl:inset-x-auto xl:inset-y-0 xl:left-0 xl:h-auto xl:w-px xl:bg-gradient-to-b"
                            />

                            <div>
                                <p className="inline-flex w-fit items-center rounded-full border border-primary/25 bg-white/90 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
                                    Most popular
                                </p>

                                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                                    Hands-on setup
                                </p>
                                <h3 className="mt-3 text-[1.35rem] font-bold tracking-tight text-slate-900 sm:text-2xl">
                                    Done-for-you onboarding
                                </h3>
                                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500 sm:text-[15px]">
                                    Tell us how you run payroll today. We handle migrations, site
                                    setup, crew configuration, and training—so your team is live and
                                    comfortable before the next payroll close.
                                </p>
                            </div>

                            <div className="mt-8 flex flex-col">
                                <div className="rounded-md border border-primary/10 bg-white p-6 shadow-[0_4px_20px_rgba(47,39,206,0.06)]">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                        Pricing
                                    </p>
                                    <p className="mt-2 text-[2rem] font-bold leading-none tracking-tight text-slate-900 sm:text-[2.25rem]">
                                        Custom
                                    </p>
                                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                                        Scoped to your crew size and rollout. No hidden per-seat
                                        math—just a straight answer on a 15-minute call.
                                    </p>
                                </div>

                                <BookedCallLink
                                    asButton
                                    buttonSize="md"
                                    templateType="pricing"
                                    cluster="guided_onboarding"
                                    landingPath={landingPath}
                                    ctaLabel="Book a 15-minute call"
                                    ctaLocation="custom_pricing_card"
                                    className={bookedCallCtaClassName}
                                    showArrow
                                >
                                    Book a 15-minute call
                                </BookedCallLink>

                                <p className="mt-4 text-center text-xs font-medium text-slate-400">
                                    If Crewtrace isn&apos;t the right fit, we&apos;ll tell you
                                    straight.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
