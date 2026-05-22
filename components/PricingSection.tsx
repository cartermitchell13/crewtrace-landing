import { Check, X } from "lucide-react";
import BookedCallLink from "@/components/BookedCallLink";
import {
    buildSelfServeSignupUrl,
    selfServePlatformFeatures,
    selfServePricingTiers,
} from "@/lib/pricing-plans";

const selfServeCtaClassName =
    "inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-bold tracking-tight text-white shadow-[0_2px_8px_rgba(47,39,206,0.18)] transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_4px_16px_rgba(47,39,206,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 sm:py-4 sm:text-base";

const selfServeCtaPrimary = `${selfServeCtaClassName} bg-primary`;

/** Padding/typography/shadow to match Start free trial while using BookedCallLink → Button (md arrow). */
const bookedCallCtaMatchSelfServe =
    "w-full justify-center !px-6 !py-3.5 !text-sm font-bold tracking-tight shadow-[0_2px_8px_rgba(47,39,206,0.18)] transition-all duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_4px_16px_rgba(47,39,206,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:!py-4 sm:!text-base";

const guidedBullets = [
    "Collaborative onboarding for rollout, migrations, or a tailored workspace setup.",
    "Training-focused support so field and office teams get comfortable quickly.",
];

type PricingSectionProps = {
    /** When true, renders the page title as h1 (for /pricing). */
    standalone?: boolean;
    /** Attribution path for booked-call CTAs on this surface. */
    landingPath?: string;
};

export default function PricingSection({
    standalone = false,
    landingPath = "/",
}: PricingSectionProps) {
    const HeadingTag = standalone ? "h1" : "h2";

    return (
        <section
            id={standalone ? undefined : "pricing"}
            className={`relative overflow-hidden bg-background py-24 md:py-32 ${standalone ? "scroll-mt-0 pt-36 md:pt-40" : "scroll-mt-32"}`}
            aria-labelledby="pricing-heading"
        >
            {/* Atmospheric depth */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(47,39,206,0.07),transparent)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.022] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:22px_22px]"
            />

            <div className="relative z-10 layout-shell">
                {/* Single premium panel */}
                <div className="relative overflow-hidden rounded-md border border-slate-200/90 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04),0_24px_64px_-12px_rgba(15,23,42,0.12),0_12px_32px_-8px_rgba(47,39,206,0.06)]">
                    <div
                        aria-hidden
                        className="h-px w-full bg-gradient-to-r from-transparent via-primary/35 to-transparent"
                    />

                    <div className="grid grid-cols-1 xl:grid-cols-4">
                        {/* Pricing tiers row */}
                        <div className="col-span-1 grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-3 md:p-7 xl:col-span-3 xl:p-8">
                            <header className="col-span-full max-w-4xl pb-2 text-left md:col-span-3 md:pb-4">
                                <div className="mb-4 sm:mb-5 inline-flex max-w-full items-center gap-1.5 rounded-full border border-foreground/[0.08] bg-foreground/[0.025] py-[3px] pl-[3px] pr-2.5 text-[11px] font-medium text-foreground/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:gap-2 sm:py-1 sm:pl-1 sm:pr-4 sm:text-xs">
                                    <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-primary sm:px-2 sm:text-[10px]">
                                        Flat rate
                                    </span>
                                    <span className="hidden text-foreground/25 sm:inline" aria-hidden="true">·</span>
                                    <span className="min-w-0 whitespace-nowrap">
                                        <span className="sm:hidden">No per-seat fees.</span>
                                        <span className="hidden sm:inline">
                                            No per-seat fees. Scales with your crew.
                                        </span>
                                    </span>
                                </div>

                                <HeadingTag
                                    id="pricing-heading"
                                    className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.08]"
                                >
                                    Transparent pricing, no surprises.
                                </HeadingTag>
                            </header>
                            {selfServePricingTiers.map((tier) => {
                                const signupHref = buildSelfServeSignupUrl(tier.id);
                                return (
                                    <article
                                        key={tier.id}
                                        className="relative flex h-full min-h-0 flex-col rounded-sm border border-slate-200/80 bg-white p-6 shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(15,23,42,0.08)] sm:p-7 lg:p-8"
                                        aria-label={`${tier.name} plan`}
                                    >
                                        <div className="mb-7 border-b border-slate-100 pb-7">
                                            <h3 className="text-[1.2rem] font-bold tracking-tight text-slate-900 sm:text-[1.35rem]">
                                                {tier.name}
                                            </h3>
                                            <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-slate-500">
                                                {tier.employeeRangeLabel}
                                            </p>
                                            <div className="mt-6 flex items-baseline gap-1">
                                                <span className="text-[2.1rem] font-bold tabular-nums tracking-tight text-slate-900 sm:text-[2.4rem]">
                                                    ${tier.priceMonthlyUsd}
                                                </span>
                                                <span className="text-sm font-medium text-slate-400">
                                                    /mo
                                                </span>
                                            </div>
                                            <p className="mt-1.5 text-[11px] font-medium text-slate-400">
                                                Billed monthly after your trial ends.
                                            </p>
                                        </div>

                                        <div className="flex flex-1 flex-col">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                                Included
                                            </p>
                                            <ul
                                                className="mt-3.5 space-y-2 text-[12.5px] font-medium leading-snug text-slate-600 sm:text-[13px]"
                                                aria-label={`Features included with ${tier.name}`}
                                            >
                                                {selfServePlatformFeatures.map((line) => (
                                                    <li key={line} className="flex gap-2">
                                                        <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary/[0.08] text-primary">
                                                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                                                        </span>
                                                        <span>{line}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-5 flex gap-2 border-t border-slate-100 pt-5 text-[12.5px] font-medium leading-snug sm:text-[13px]">
                                                {tier.bracketCallout.variant === "included" ? (
                                                    <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary/[0.08] text-primary">
                                                        <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                                                    </span>
                                                ) : (
                                                    <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                                        <X className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                                                    </span>
                                                )}
                                                <span
                                                    className={
                                                        tier.bracketCallout.variant === "included"
                                                            ? "text-slate-600"
                                                            : "text-slate-500"
                                                    }
                                                >
                                                    {tier.bracketCallout.variant === "included" ? (
                                                        <>
                                                            <span className="sr-only">Included: </span>
                                                            {tier.bracketCallout.label}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="sr-only">Not included: </span>
                                                            {tier.bracketCallout.label}
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <a
                                            href={signupHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${selfServeCtaPrimary} mt-8 shrink-0`}
                                        >
                                            Start free trial
                                        </a>
                                    </article>
                                );
                            })}
                        </div>

                        {/* Guided onboarding column */}
                        <article
                            className="relative flex h-full min-h-0 flex-col justify-center border-t border-slate-100 bg-gradient-to-b from-[#fafaff] via-white to-white p-7 sm:p-8 xl:border-l xl:border-t-0 xl:p-9"
                            aria-label="Done-for-you onboarding tier, most popular"
                        >
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent xl:inset-x-auto xl:inset-y-0 xl:left-0 xl:h-auto xl:w-px xl:bg-gradient-to-b"
                            />

                            <p className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/25 bg-white/90 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary shadow-[0_1px_3px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                                Most popular
                            </p>

                            <div className="mb-7 border-b border-primary/10 pb-7">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                                    Hands-on setup
                                </p>
                                <h3 className="mt-3.5 text-[1.2rem] font-bold tracking-tight text-slate-900 sm:text-[1.35rem]">
                                    Done-for-you onboarding
                                </h3>
                                <p className="mt-2 text-[13px] font-medium leading-relaxed text-slate-500 sm:text-sm">
                                    Hands-on rollout for teams that need migrations, structured
                                    site and crew setup, and live training so adoption sticks and
                                    payroll week one stays under control.
                                </p>
                            </div>

                            <ul className="space-y-2 text-[12.5px] font-medium leading-snug text-slate-600 sm:text-[13px]">
                                {guidedBullets.map((line) => (
                                    <li key={line} className="flex gap-2">
                                        <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary/[0.08] text-primary">
                                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                                        </span>
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-7 flex flex-col gap-5 border-t border-slate-200/60 pt-7">
                                <div>
                                    <p className="text-xl font-bold tabular-nums tracking-tight text-slate-900 sm:text-2xl">
                                        Custom pricing
                                    </p>
                                    <p className="mt-1.5 text-[13px] font-medium text-slate-500 sm:text-sm">
                                        Let&apos;s talk scope. We&apos;ll recommend the right mix of
                                        services.
                                    </p>
                                </div>

                                <BookedCallLink
                                    asButton
                                    buttonSize="md"
                                    templateType="pricing"
                                    cluster="guided_onboarding"
                                    landingPath={landingPath}
                                    ctaLabel="Book a call"
                                    ctaLocation="pricing_guided_card"
                                    className={bookedCallCtaMatchSelfServe}
                                    showArrow
                                >
                                    Book a call
                                </BookedCallLink>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
