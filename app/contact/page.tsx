"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalEmbedInteractionTracker from "@/components/CalEmbedInteractionTracker";
import { getTemplateMessaging, publicIcpPhrase } from "@/lib/messaging";
import Cal, { getCalApi } from "@calcom/embed-react";

const contactMessaging = getTemplateMessaging("contact");

export default function ContactPage() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "15min" });
            cal("ui", { "theme": "light", "cssVarsPerTheme": { "light": { "cal-brand": "#2F27CE" }, "dark": { "cal-brand": "#2F27CE" } }, "hideEventTypeDetails": false, "layout": "week_view" });
        })();
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <CalEmbedInteractionTracker
                templateType="contact"
                cluster="company"
                ctaLocation="cal_embed"
            />
            <main className="px-6 pb-20 pt-32">
                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
                        <section className="rounded-3xl border border-foreground/10 bg-white p-7 md:p-9">
                            <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                                Contact
                            </p>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                                {contactMessaging.intentHeadline}
                            </h1>
                            <p className="mt-4 text-base leading-relaxed text-foreground/70 md:text-lg">
                                Tell us how your crews operate and where payroll friction shows up.
                                We tailor the call to your setup {publicIcpPhrase}.
                            </p>

                            <div className="mt-7 space-y-3 rounded-2xl border border-foreground/10 bg-[#FBFBFE] p-5">
                                {[
                                    "No obligation sales call",
                                    "Live workflow walkthrough",
                                    "Specific next steps for your team",
                                    "Timeline estimate for rollout",
                                ].map((benefit) => (
                                    <p key={benefit} className="flex items-start gap-3 text-sm text-foreground/70">
                                        <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                                            ✓
                                        </span>
                                        <span>{benefit}</span>
                                    </p>
                                ))}
                            </div>

                            <div className="mt-8 space-y-4 text-sm">
                                <p className="font-semibold text-foreground/80">
                                    Prefer email?{" "}
                                    <a href="mailto:hello@crewtrace.com" className="text-primary underline">
                                        hello@crewtrace.com
                                    </a>
                                </p>
                                <p className="font-semibold text-foreground/80">
                                    Want to call?{" "}
                                    <a href="tel:+18005551234" className="text-primary underline">
                                        1-800-555-1234
                                    </a>
                                </p>
                            </div>
                        </section>

                        <section className="min-h-[600px] overflow-hidden rounded-3xl border border-foreground/10 bg-white p-0 shadow-xl sm:p-2">
                            <Cal
                                namespace="15min"
                                calLink="crewtrace/15min"
                                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                                config={{ "layout": "week_view", "useSlotsViewOnSmallScreen": "true", "theme": "light" }}
                            />
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
