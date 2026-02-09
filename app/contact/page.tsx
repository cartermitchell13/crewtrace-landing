"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
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

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setFormState("success");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Left Column - Info */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                                Let's talk about your payroll leaks
                            </h1>
                            <p className="text-lg text-foreground/60 mb-8">
                                Book a free 15-minute call with our team. We'll show you exactly
                                how much you could save with GPS-verified time tracking.
                            </p>

                            {/* Benefits List */}
                            <div className="space-y-4 mb-12">
                                {[
                                    "No credit card required",
                                    "Free ROI analysis for your business",
                                    "See a live demo tailored to your trade",
                                    "Get pricing customized to your crew size",
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-foreground/70">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-foreground mb-2">Email us directly</h3>
                                    <a href="mailto:hello@crewtrace.com" className="text-primary hover:underline">
                                        hello@crewtrace.com
                                    </a>
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-2">Call us</h3>
                                    <a href="tel:+18005551234" className="text-primary hover:underline">
                                        1-800-555-1234
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="bg-white border border-foreground/5 rounded-2xl p-8 shadow-xl">
                            {formState === "success" ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">We'll be in touch!</h2>
                                    <p className="text-foreground/60 mb-6">
                                        Someone from our team will reach out within 24 hours.
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
                                        className="text-primary font-medium hover:underline"
                                    >
                                        Submit another request
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-foreground mb-6">Book your free demo</h2>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-2">
                                                    Your name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                                    placeholder="John Smith"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-2">
                                                    Email address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-2">
                                                    Phone number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                                    placeholder="(555) 123-4567"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-2">
                                                    Company name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                                    placeholder="ABC Roofing"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Crew size
                                            </label>
                                            <select
                                                name="crewSize"
                                                value={formData.crewSize}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all bg-white"
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
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                How can we help?
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none"
                                                placeholder="Tell us about your current time tracking challenges..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formState === "submitting"}
                                            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all active:translate-y-[0px] active:translate-x-[0px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:translate-x-0"
                                        >
                                            {formState === "submitting" ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Submitting...
                                                </span>
                                            ) : (
                                                "Book My Free Demo"
                                            )}
                                        </button>

                                        <p className="text-xs text-foreground/40 text-center">
                                            By submitting this form, you agree to our{" "}
                                            <a href="/privacy" className="underline">Privacy Policy</a>.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
