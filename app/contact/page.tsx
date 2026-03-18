import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoRequestForm from "@/components/DemoRequestForm";
import { createPageMetadata } from "@/lib/seo";
import { CheckCircle2, Clock, Shield, Zap } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
    title: "Get a Personalized Demo + Quote | CrewTrace",
    description:
        "Answer a few quick questions about your operation and we\u2019ll send back a personalized demo walkthrough and pricing guidance. No sales call required.",
    path: "/contact",
});

const benefits = [
    {
        icon: Zap,
        title: "Personalized demo",
        description: "A walkthrough tailored to your crew size, trade, and workflow",
    },
    {
        icon: Shield,
        title: "No hard-sell call",
        description: "We respond async so you review on your own time",
    },
    {
        icon: Clock,
        title: "One business day",
        description: "Expect a detailed response within 24 hours",
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="px-6 pb-24 pt-36 md:pt-40">
                {/* Background decoration */}
                <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_70%)]" />

                <div className="mx-auto max-w-6xl">
                    {/* Page header */}
                    <div className="mb-12 max-w-2xl">
                        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                            Get a personalized demo + quote
                        </p>
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                            See how CrewTrace fits your operation
                        </h1>
                        <p className="mt-5 text-lg font-medium leading-relaxed text-foreground/60 md:text-xl">
                            Answer a few quick questions and we&apos;ll send back the
                            best-fit rollout path and pricing guidance for your crew
                            setup.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
                        {/* Left: Benefits + trust signals */}
                        <div className="flex flex-col gap-8">
                            {/* What you get */}
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

                            {/* Proof / trust */}
                            <div className="rounded-2xl border border-foreground/[0.06] bg-white p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    <span className="text-sm font-bold text-foreground">
                                        Trusted by construction owners
                                    </span>
                                </div>
                                <blockquote className="text-sm italic leading-relaxed text-foreground/60">
                                    &ldquo;I didn&apos;t want another sales pitch.
                                    CrewTrace sent me a walkthrough specific to my
                                    roofing crews and I knew within 5 minutes it was
                                    the right fit.&rdquo;
                                </blockquote>
                                <p className="mt-3 text-xs font-semibold text-foreground/40">
                                    — Operations Manager, 35-crew roofing company
                                </p>
                            </div>

                            {/* Alternative contact */}
                            <div className="space-y-3 text-sm">
                                <p className="font-semibold text-foreground/60">
                                    Prefer a live call?{" "}
                                    <a
                                        href="https://cal.com/crewtrace/15min"
                                        className="text-primary underline underline-offset-2"
                                    >
                                        Book 15 minutes
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Right: The form */}
                        <div className="rounded-3xl border border-foreground/10 bg-white p-7 shadow-xl md:p-9">
                            <div className="mb-7">
                                <h2 className="text-xl font-bold text-foreground">
                                    Request your personalized demo
                                </h2>
                                <p className="mt-1.5 text-sm text-foreground/50 leading-relaxed">
                                    Takes about 60 seconds. No commitment.
                                </p>
                            </div>
                            <DemoRequestForm />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
