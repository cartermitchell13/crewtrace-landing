import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import BookedCallLink from "@/components/BookedCallLink";
import {
    getTemplateMessaging,
    orderedPromiseLine,
} from "@/lib/messaging";

const contactCtaMessaging = getTemplateMessaging("contact");

const defaultBullets = [
    "Invite crews and verify hours fast",
    "Personalized demo on request",
] as const;

type CTASectionVariant = "default" | "calculator";

export type CalculatorCtaContext = {
    yearlyLoss: number;
    yearlyRecovery: number;
    tradeType: string;
};

type CTASectionProps = {
    variant?: CTASectionVariant;
    /** When true, parent supplies `layout-shell` width — no nested shell wrapper */
    embedded?: boolean;
    sectionId?: string;
    cluster?: string;
    templateType?: string;
    landingPath?: string;
    calculatorContext?: CalculatorCtaContext;
};

function formatTradeLabel(tradeType: string): string {
    const labels: Record<string, string> = {
        residential: "residential",
        commercial: "commercial",
        industrial: "industrial",
        mixed: "general contractor",
    };
    return labels[tradeType] ?? tradeType;
}

export default function CTASection({
    variant = "default",
    embedded = false,
    sectionId = "audit",
    cluster = "home",
    templateType = "shared_cta",
    landingPath = "/",
    calculatorContext,
}: CTASectionProps) {
    const isCalculator = variant === "calculator" && calculatorContext;

    const headline = isCalculator
        ? "You found the leak — let's map how to fix it"
        : contactCtaMessaging.intentHeadline;

    const body = isCalculator
        ? `Your audit shows about $${calculatorContext.yearlyLoss.toLocaleString("en-US")}/yr slipping through payroll, with roughly $${calculatorContext.yearlyRecovery.toLocaleString("en-US")}/yr recoverable. Book 15 minutes and we'll prioritize what to tackle first for your ${formatTradeLabel(calculatorContext.tradeType)} crews.`
        : `Invite crews and launch GPS-verified clock-ins fast—or request a demo for a tailored walkthrough and pricing. ${orderedPromiseLine}`;

    const bullets = isCalculator
        ? [
              "Pinpoint which leakage categories cost you the most",
              "See how similar contractors closed the gap in week one",
              "Get a straight answer on fit, rollout, and pricing",
          ]
        : defaultBullets;

    const cardEyebrow = isCalculator ? "Post-audit strategy call" : "Implementation fit check";

    const cardBody = isCalculator
        ? "We'll use your audit as the agenda — not a generic deck. If Crewtrace isn't the right fix, we'll tell you. If it is, you'll leave with a clear first step."
        : "If Crewtrace is not a fit for your workflow, we tell you directly. If it is a fit, you get a rollout sequence your team can use.";

    const footnote = isCalculator
        ? "Pick a time that works. Fifteen minutes, focused on your audit numbers."
        : "Sign up takes about a minute. Demo requests get a tailored walkthrough—we reply within one business day.";

    const sectionPadding = embedded
        ? ""
        : variant === "calculator"
          ? "pb-16 pt-12 md:pb-20 md:pt-16"
          : "pb-28 pt-20 md:pb-36 md:pt-28";

    const card = (
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
                            <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
                                {headline}
                            </h2>

                            <div className="max-w-xl text-lg font-medium leading-relaxed text-white/80 md:text-xl">
                                {body}
                            </div>

                            <div
                                className={`flex flex-col gap-5 text-sm font-semibold text-white/70 ${
                                    isCalculator ? "" : "sm:flex-row sm:items-center"
                                }`}
                            >
                                {bullets.map((bullet) => (
                                    <div key={bullet} className="inline-flex items-center gap-3">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
                                            <CheckCircle2 size={14} />
                                        </span>
                                        {bullet}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative flex flex-col overflow-hidden rounded-md border border-white/20 bg-black/15 p-8 backdrop-blur-xl">
                            <div className="relative z-10">
                                <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/70">
                                    <ShieldCheck size={16} />
                                    {cardEyebrow}
                                </div>

                                <div className="mb-8 text-base font-medium leading-relaxed text-white/80">
                                    {cardBody}
                                </div>

                                <div className="flex flex-col gap-3">
                                    {isCalculator ? (
                                        <BookedCallLink
                                            templateType={templateType}
                                            cluster={cluster}
                                            landingPath={landingPath}
                                            ctaLabel="Book a 15-minute call"
                                            ctaLocation="calculator_cta_card"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-5 py-4 text-base font-bold text-primary whitespace-nowrap transition-all hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#12122a] motion-safe:hover:-translate-y-0.5 md:text-lg lg:justify-between lg:gap-3"
                                        >
                                            <span>Book a 15-minute call</span>
                                            <ArrowRight
                                                size={20}
                                                aria-hidden
                                                className="shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5"
                                            />
                                        </BookedCallLink>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </div>

                                <div className="mt-6 flex items-start gap-3">
                                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white/40" />
                                    <div className="text-xs leading-relaxed text-white/65">{footnote}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );

    if (embedded) {
        return (
            <div id={sectionId} className="scroll-mt-28 w-full">
                {card}
            </div>
        );
    }

    return (
        <section
            id={sectionId}
            className={`relative scroll-mt-32 overflow-hidden bg-background ${sectionPadding}`}
        >
            <div className="layout-shell">{card}</div>
        </section>
    );
}
