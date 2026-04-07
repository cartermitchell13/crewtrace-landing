"use client";

import { useState, useRef, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import {
    type LeadApiResponse,
    type LeadPayload,
    parseLeadApiResponse,
} from "@/lib/lead-contract";
import {
    captureFirstTouchAttribution,
    readFirstTouchAttribution,
} from "@/lib/first-touch-attribution";
import { sendSeoEvent } from "@/lib/event-transport";
import { buildLeadFormEvent } from "@/lib/seo-events";

type FormStatus = "idle" | "submitting" | "success" | "error";

const CREW_SIZE_OPTIONS = [
    "1–5",
    "6–15",
    "16–30",
    "31–50",
    "51–100",
    "100+",
] as const;

type DemoRequestFormProps = {
    onSuccess?: () => void;
    /** Pre-select crew size bucket (e.g. from calculator). Must match a CREW_SIZE_OPTIONS value. */
    defaultCrewSize?: string;
    /** Pre-fill the “what to fix” field (e.g. audit summary from calculator). */
    defaultMessage?: string;
};

function getEventContext() {
    const pageUrl =
        typeof window !== "undefined"
            ? `${window.location.pathname}${window.location.search}`
            : "/contact";
    const firstTouch =
        readFirstTouchAttribution() ?? captureFirstTouchAttribution();

    return {
        templateType: "contact",
        cluster: "company",
        pageUrl,
        firstTouch,
    };
}

export default function DemoRequestForm({
    onSuccess,
    defaultCrewSize,
    defaultMessage,
}: DemoRequestFormProps) {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (status === "submitting") return;

        setStatus("submitting");
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);
        const pathname =
            typeof window !== "undefined"
                ? window.location.pathname
                : "/contact";

        const payload: LeadPayload = {
            name: (formData.get("name") as string) ?? "",
            email: (formData.get("email") as string) ?? "",
            phone: (formData.get("phone") as string) || undefined,
            company: (formData.get("company") as string) || undefined,
            crewSize: (formData.get("crewSize") as string) || undefined,
            currentSoftware:
                (formData.get("currentSoftware") as string) || undefined,
            message: (formData.get("message") as string) || undefined,
            sourcePage: pathname,
        };

        const ctx = getEventContext();
        void sendSeoEvent(buildLeadFormEvent("attempt", ctx));

        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const body = await response.json().catch(() => null);
            const parsed: LeadApiResponse | null = parseLeadApiResponse(body);

            if (parsed?.ok) {
                setStatus("success");
                void sendSeoEvent(buildLeadFormEvent("success", ctx));
                onSuccess?.();
            } else {
                const msg =
                    parsed?.message ??
                    "Something went wrong. Please try again.";
                setErrorMessage(msg);
                setStatus("error");
                void sendSeoEvent(
                    buildLeadFormEvent("failure", ctx, {
                        errorCode: parsed?.errorCode,
                        message: msg,
                    }),
                );
            }
        } catch {
            setErrorMessage(
                "Could not reach our server. Please check your connection and retry.",
            );
            setStatus("error");
            void sendSeoEvent(
                buildLeadFormEvent("failure", ctx, {
                    errorCode: "network_error",
                }),
            );
        }
    }

    if (status === "success") {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col items-center justify-center text-center py-12 px-6"
            >
                <div className="relative w-20 h-20 mb-8">
                    {/* Background pulse effect */}
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ 
                            duration: 2, 
                            ease: "easeOut",
                            repeat: Infinity,
                            repeatDelay: 0.5
                        }}
                        className="absolute inset-0 rounded-full bg-green-500/20"
                    />
                    
                    {/* Main circle */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1
                        }}
                        className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30"
                    >
                        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <motion.path 
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ 
                                    duration: 0.6, 
                                    ease: [0.25, 1, 0.5, 1],
                                    delay: 0.3
                                }}
                                d="M20 6L9 17l-5-5"
                            />
                        </svg>
                    </motion.div>
                </div>

                <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="text-3xl font-extrabold text-foreground mb-4 tracking-tight"
                >
                    Request received
                </motion.h3>
                
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    className="text-foreground/60 max-w-md leading-relaxed font-medium text-lg"
                >
                    We&apos;ll review your details and send one personalized video
                    with your demo and quote within one business day.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
                    className="mt-10 pt-8 border-t border-foreground/10 w-full max-w-sm flex flex-col items-center"
                >
                    <p className="text-sm font-semibold text-foreground/50 mb-4 uppercase tracking-wider">
                        Want to talk sooner?
                    </p>
                    <a
                        href="https://cal.com/Crewtrace/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary/10 px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Book a 15-minute call
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                </motion.div>
            </motion.div>
        );
    }

    const inputBase =
        "w-full rounded-xl border border-foreground/10 bg-white px-4 py-3.5 text-sm font-medium text-foreground placeholder:text-foreground/40 outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:shadow-input";
    const labelBase = "block text-sm font-semibold text-foreground/70 mb-1.5";

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
        >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="dr-name" className={labelBase}>
                        Name <span className="text-primary">*</span>
                    </label>
                    <input
                        id="dr-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="John Davis"
                        className={inputBase}
                    />
                </div>
                <div>
                    <label htmlFor="dr-email" className={labelBase}>
                        Work email <span className="text-primary">*</span>
                    </label>
                    <input
                        id="dr-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="john@acmeconstruction.com"
                        className={inputBase}
                    />
                </div>
            </div>

            {/* Company + Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="dr-company" className={labelBase}>
                        Company name
                    </label>
                    <input
                        id="dr-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Acme Construction"
                        className={inputBase}
                    />
                </div>
                <div>
                    <label htmlFor="dr-phone" className={labelBase}>
                        Phone <span className="text-primary">*</span>
                    </label>
                    <input
                        id="dr-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="(555) 123-4567"
                        className={inputBase}
                    />
                    <p className="mt-1.5 text-xs font-normal leading-relaxed text-foreground/40">
                        We&apos;ll only use your number to text your personalized video link.
                    </p>
                </div>
            </div>

            {/* Crew size + Current software row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="dr-crewSize" className={labelBase}>
                        Crew size
                    </label>
                    <select
                        id="dr-crewSize"
                        name="crewSize"
                        className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m2%204%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-10`}
                        defaultValue={
                            defaultCrewSize &&
                            (CREW_SIZE_OPTIONS as readonly string[]).includes(
                                defaultCrewSize,
                            )
                                ? defaultCrewSize
                                : ""
                        }
                    >
                        <option value="" disabled>
                            Select crew size
                        </option>
                        {CREW_SIZE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option} workers
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="dr-currentSoftware" className={labelBase}>
                        Current software{" "}
                        <span className="text-foreground/40 font-normal">
                            (if any)
                        </span>
                    </label>
                    <input
                        id="dr-currentSoftware"
                        name="currentSoftware"
                        type="text"
                        placeholder="Excel, T-Sheets, Procore..."
                        className={inputBase}
                    />
                </div>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="dr-message" className={labelBase}>
                    What are you looking to fix?{" "}
                    <span className="text-foreground/40 font-normal">
                        (optional)
                    </span>
                </label>
                <textarea
                    id="dr-message"
                    name="message"
                    rows={3}
                    placeholder="E.g. buddy punching, payroll disputes, no GPS verification..."
                    defaultValue={defaultMessage ?? undefined}
                    className={`${inputBase} resize-none`}
                />
            </div>

            {/* Error */}
            {status === "error" && errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {errorMessage}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-primary text-white text-base font-bold px-8 py-4 rounded-xl shadow-button transition-all hover:translate-y-[-2px] hover:translate-x-[-2px] active:translate-y-[0px] active:translate-x-[0px] disabled:opacity-70 disabled:pointer-events-none"
            >
                {status === "submitting" ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        Get Your Personalized Demo
                        <ArrowRight size={18} />
                    </>
                )}
            </button>

            <p className="text-center text-xs text-foreground/40 font-medium">
                No sales call required. We&apos;ll respond within one business
                day.
            </p>
        </form>
    );
}
