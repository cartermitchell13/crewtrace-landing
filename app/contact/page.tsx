"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalEmbedInteractionTracker from "@/components/CalEmbedInteractionTracker";
import { parseLeadApiResponse, type LeadPayload } from "@/lib/lead-contract";
import {
    captureFirstTouchAttribution,
    readFirstTouchAttribution,
} from "@/lib/first-touch-attribution";
import { sendSeoEvent } from "@/lib/event-transport";
import { buildLeadFormEvent } from "@/lib/seo-events";
import { getTemplateMessaging, publicIcpPhrase } from "@/lib/messaging";

const contactMessaging = getTemplateMessaging("contact");

export default function ContactPage() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        crewSize: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("submitting");
        setSubmitMessage(null);

        const pageUrl =
            typeof window !== "undefined"
                ? `${window.location.pathname}${window.location.search}`
                : "/contact";
        const firstTouch = readFirstTouchAttribution() ?? captureFirstTouchAttribution();

        const payload: LeadPayload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            crewSize: formData.crewSize,
            message: formData.message,
        };

        void sendSeoEvent(
            buildLeadFormEvent("attempt", {
                templateType: "contact",
                cluster: "company",
                pageUrl,
                firstTouch,
            }),
        );

        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const json = await response.json().catch(() => null);
            const leadResponse = parseLeadApiResponse(json);

            if (!response.ok || !leadResponse?.ok) {
                setFormState("error");
                setSubmitMessage(
                    leadResponse?.message || "We could not submit your request. Please try again.",
                );
                void sendSeoEvent(
                    buildLeadFormEvent(
                        "failure",
                        {
                            templateType: "contact",
                            cluster: "company",
                            pageUrl,
                            firstTouch,
                        },
                        {
                            errorCode: leadResponse?.errorCode ?? "request_failed",
                            message: leadResponse?.message,
                        },
                    ),
                );
                return;
            }

            setFormState("success");
            void sendSeoEvent(
                buildLeadFormEvent("success", {
                    templateType: "contact",
                    cluster: "company",
                    pageUrl,
                    firstTouch,
                }),
            );
        } catch {
            setFormState("error");
            setSubmitMessage("Network error while submitting your request. Please retry.");
            void sendSeoEvent(
                buildLeadFormEvent(
                    "failure",
                    {
                        templateType: "contact",
                        cluster: "company",
                        pageUrl,
                        firstTouch,
                    },
                    {
                        errorCode: "network_error",
                        message: "Network error while submitting lead form",
                    },
                ),
            );
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

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

                        <section className="rounded-3xl border border-foreground/10 bg-white p-7 shadow-xl md:p-9">
                            {formState === "success" ? (
                                <div className="py-8 text-center md:py-12">
                                    <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
                                        ✓
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">Request received</h2>
                                    <p className="mx-auto mt-3 max-w-sm text-foreground/65">
                                        A Crewtrace specialist will follow up with next steps within one
                                        business day.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setFormState("idle");
                                            setFormData({
                                                name: "",
                                                email: "",
                                                phone: "",
                                                company: "",
                                                crewSize: "",
                                                message: "",
                                            });
                                        }}
                                        className="mt-6 font-semibold text-primary underline"
                                    >
                                        Submit another request
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-foreground">
                                        {contactMessaging.primaryCta}
                                    </h2>
                                    <p className="mt-2 text-sm text-foreground/60">
                                        Share a few details so we can make the audit call useful from minute
                                        one.
                                    </p>

                                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-foreground">
                                                    Your name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full rounded-xl border border-foreground/10 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                                                    placeholder="John Smith"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-foreground">
                                                    Email address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full rounded-xl border border-foreground/10 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-foreground">
                                                    Phone number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full rounded-xl border border-foreground/10 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                                                    placeholder="(555) 123-4567"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-foreground">
                                                    Company name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full rounded-xl border border-foreground/10 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                                                    placeholder="ABC Roofing"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-foreground">
                                                Crew size
                                            </label>
                                            <select
                                                name="crewSize"
                                                value={formData.crewSize}
                                                onChange={handleChange}
                                                className="w-full rounded-xl border border-foreground/10 bg-white px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                                            >
                                                <option value="">Select crew size</option>
                                                <option value="1-5">1-5 workers</option>
                                                <option value="6-15">6-15 workers</option>
                                                <option value="16-30">16-30 workers</option>
                                                <option value="31-50">31-50 workers</option>
                                                <option value="50+">50+ workers</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-foreground">
                                                Current challenge
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full resize-none rounded-xl border border-foreground/10 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                                                placeholder="Tell us what is slowing payroll review down right now."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formState === "submitting"}
                                            className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-button transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                                        >
                                            {formState === "submitting" ? "Submitting..." : contactMessaging.primaryCta}
                                        </button>

                                        {formState === "error" && submitMessage && (
                                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                                {submitMessage} You can correct any details and submit again.
                                            </div>
                                        )}

                                        <p className="text-center text-xs text-foreground/45">
                                            By submitting this form, you agree to our{" "}
                                            <a href="/privacy" className="underline">
                                                Privacy Policy
                                            </a>
                                            .
                                        </p>
                                    </form>
                                </>
                            )}
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
