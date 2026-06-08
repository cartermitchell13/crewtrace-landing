import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDemoValueColumn from "@/components/ContactDemoValueColumn";
import SectionDivider from "@/components/SectionDivider";
import BookedCallLink from "@/components/BookedCallLink";
import { ArrowRight, Calendar, Clock3, MessageSquare } from "lucide-react";

const callSteps = [
    {
        icon: Calendar,
        label: "Pick a time",
    },
    {
        icon: MessageSquare,
        label: "Review your workflow",
    },
    {
        icon: Clock3,
        label: "Leave with a next step",
    },
] as const;

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="relative pb-24 pt-36 md:pt-40">
                <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_70%)]" />

                <div className="layout-shell">
                    <div className="mx-auto max-w-6xl">
                        <div id="hero" className="mb-12 max-w-4xl">
                            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                Book a 15-minute call
                            </p>
                            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                                See how Crewtrace fits your operation
                            </h1>
                            <p className="mt-5 text-lg font-medium leading-relaxed text-foreground/60 md:text-xl">
                                Pick a time and we&apos;ll look at your crew size, current
                                time-tracking process, and where payroll leakage is most
                                likely hiding. No hard sell.
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-foreground/[0.08] bg-white shadow-[0_12px_48px_-12px_rgba(47,39,206,0.12)]">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <ContactDemoValueColumn className="order-2 lg:order-1" />

                                <div className="relative order-1 flex flex-col justify-center overflow-hidden border-b border-foreground/[0.06] bg-[linear-gradient(160deg,rgba(47,39,206,0.07)_0%,rgba(47,39,206,0.02)_45%,transparent_100%)] p-8 md:p-10 lg:border-b-0 lg:border-l lg:p-11">
                                    <div
                                        aria-hidden
                                        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/[0.06] blur-3xl"
                                    />

                                    <div className="relative">
                                        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                                            <Calendar className="h-3.5 w-3.5" aria-hidden />
                                            15-minute call
                                        </p>

                                        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                            Book your payroll leakage review
                                        </h2>
                                        <p className="mt-3 max-w-md text-base leading-relaxed text-foreground/55">
                                            Focused on your current workflow and the next best
                                            step — not a generic product tour.
                                        </p>

                                        <ol className="mt-8 grid gap-3 sm:grid-cols-3">
                                            {callSteps.map((step, index) => (
                                                <li
                                                    key={step.label}
                                                    className="flex items-center gap-3 rounded-md border border-foreground/[0.06] bg-white/70 px-3 py-3 sm:flex-col sm:items-start sm:gap-2 sm:px-4 sm:py-4"
                                                >
                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                        {index + 1}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <step.icon
                                                            className="mb-1 hidden h-4 w-4 text-primary/70 sm:block"
                                                            aria-hidden
                                                        />
                                                        <span className="text-sm font-semibold leading-snug text-foreground/75">
                                                            {step.label}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ol>

                                        <BookedCallLink
                                            templateType="contact"
                                            cluster="company"
                                            landingPath="/contact"
                                            ctaLabel="Book a 15-minute call"
                                            ctaLocation="contact_primary_card"
                                            className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-bold text-white shadow-[0_4px_20px_rgba(47,39,206,0.28)] transition-all hover:bg-primary/90 motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                        >
                                            Book a 15-minute call
                                            <ArrowRight
                                                size={18}
                                                className="transition-transform group-hover:translate-x-1"
                                                aria-hidden
                                            />
                                        </BookedCallLink>

                                        <p className="mt-4 text-center text-xs font-medium leading-relaxed text-foreground/45">
                                            You&apos;ll choose a time on the calendar. We&apos;ll
                                            use the call to confirm fit and outline rollout
                                            options.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <SectionDivider />
            <Footer />
        </div>
    );
}
