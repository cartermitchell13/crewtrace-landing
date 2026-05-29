"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, SlidersHorizontal, X } from "lucide-react";

const COOKIE_CONSENT_STORAGE_KEY = "crewtrace_cookie_consent";
const COOKIE_SETTINGS_EVENT = "crewtrace:open-cookie-preferences";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

type ConsentChoice = {
    analytics: boolean;
    marketing: boolean;
    updatedAt: string;
};

type GtagConsentParams = {
    analytics_storage: "granted" | "denied";
    ad_storage: "granted" | "denied";
    ad_user_data: "granted" | "denied";
    ad_personalization: "granted" | "denied";
};

type GtagConfigParams = {
    page_path?: string;
    page_location?: string;
    page_title?: string;
};

type Gtag = {
    (command: "consent", action: "update", params: GtagConsentParams): void;
    (command: "config", measurementId: string, params?: GtagConfigParams): void;
    (command: "event", eventName: string, params?: Record<string, string | number | boolean>): void;
};

type WindowWithGtag = Window & {
    gtag?: Gtag;
};

type ConsentUiState = {
    isReady: boolean;
    isOpen: boolean;
    storedChoice: ConsentChoice | null;
    analyticsEnabled: boolean;
    marketingEnabled: boolean;
};

function readStoredConsent(): ConsentChoice | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
        if (!stored) {
            return null;
        }

        const parsed = JSON.parse(stored) as Partial<ConsentChoice>;
        if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") {
            return null;
        }

        return {
            analytics: parsed.analytics,
            marketing: parsed.marketing,
            updatedAt: parsed.updatedAt || new Date().toISOString(),
        };
    } catch {
        return null;
    }
}

function getInitialConsentState(): ConsentUiState {
    if (typeof window === "undefined") {
        return {
            isReady: false,
            isOpen: false,
            storedChoice: null,
            analyticsEnabled: true,
            marketingEnabled: true,
        };
    }

    const stored = readStoredConsent();

    return {
        isReady: true,
        isOpen: !stored,
        storedChoice: stored,
        analyticsEnabled: stored?.analytics ?? true,
        marketingEnabled: stored?.marketing ?? true,
    };
}

function applyGoogleConsent(choice: ConsentChoice) {
    const gtag = (window as WindowWithGtag).gtag;

    if (typeof gtag !== "function") {
        return;
    }

    gtag("consent", "update", {
        analytics_storage: choice.analytics ? "granted" : "denied",
        ad_storage: choice.marketing ? "granted" : "denied",
        ad_user_data: choice.marketing ? "granted" : "denied",
        ad_personalization: choice.marketing ? "granted" : "denied",
    });

    gtag("event", "cookie_consent_update", {
        analytics_consent: choice.analytics,
        marketing_consent: choice.marketing,
    });

    if (choice.analytics && GA_MEASUREMENT_ID) {
        const pagePath = `${window.location.pathname}${window.location.search}`;
        gtag("config", GA_MEASUREMENT_ID, {
            page_path: pagePath,
            page_location: window.location.href,
            page_title: document.title,
        });
    }
}

function storeConsent(analytics: boolean, marketing: boolean): ConsentChoice {
    const choice = {
        analytics,
        marketing,
        updatedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(choice));
    applyGoogleConsent(choice);

    return choice;
}

export default function CookieConsentBanner() {
    const [state, setState] = useState(getInitialConsentState);

    useEffect(() => {
        const openPreferences = () => {
            const latest = readStoredConsent();
            setState((current) => ({
                ...current,
                isReady: true,
                isOpen: true,
                storedChoice: latest,
                analyticsEnabled: latest?.analytics ?? current.analyticsEnabled,
                marketingEnabled: latest?.marketing ?? current.marketingEnabled,
            }));
        };

        window.addEventListener(COOKIE_SETTINGS_EVENT, openPreferences);

        return () => {
            window.removeEventListener(COOKIE_SETTINGS_EVENT, openPreferences);
        };
    }, []);

    if (!state.isReady || !state.isOpen) {
        return null;
    }

    const saveChoice = (analytics: boolean, marketing: boolean) => {
        const choice = storeConsent(analytics, marketing);
        setState({
            isReady: true,
            isOpen: false,
            storedChoice: choice,
            analyticsEnabled: analytics,
            marketingEnabled: marketing,
        });
    };

    return (
        <div
            className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-5 sm:pb-5"
            role="dialog"
            aria-modal="false"
            aria-labelledby="cookie-consent-title"
        >
            <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-foreground/10 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
                <div className="grid gap-0 md:grid-cols-[1fr_360px]">
                    <div className="p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div className="min-w-0">
                                <h2 id="cookie-consent-title" className="text-xl font-bold tracking-tight text-foreground">
                                    Privacy choices
                                </h2>
                                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-foreground/68">
                                    Crewtrace uses necessary site technology plus Google Analytics and Google Ads measurement to understand visits, improve pages, and measure lead conversion. You can accept, reject, or tune non-essential tracking.
                                </p>
                                <a href="/privacy" className="mt-3 inline-flex text-sm font-bold text-primary hover:underline">
                                    Read the privacy policy
                                </a>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <label className="flex min-h-24 items-start justify-between gap-4 rounded-md border border-foreground/10 bg-foreground/[0.02] p-4">
                                <span>
                                    <span className="block text-sm font-bold text-foreground">Analytics</span>
                                    <span className="mt-1 block text-xs font-medium leading-5 text-foreground/60">
                                        Helps us see page views, referrals, and calculator performance.
                                    </span>
                                </span>
                                <input
                                    type="checkbox"
                                    className="mt-1 h-5 w-5 accent-primary"
                                    checked={state.analyticsEnabled}
                                    onChange={(event) =>
                                        setState((current) => ({
                                            ...current,
                                            analyticsEnabled: event.target.checked,
                                        }))
                                    }
                                />
                            </label>

                            <label className="flex min-h-24 items-start justify-between gap-4 rounded-md border border-foreground/10 bg-foreground/[0.02] p-4">
                                <span>
                                    <span className="block text-sm font-bold text-foreground">Advertising</span>
                                    <span className="mt-1 block text-xs font-medium leading-5 text-foreground/60">
                                        Helps measure Google Ads conversion and improve campaign relevance.
                                    </span>
                                </span>
                                <input
                                    type="checkbox"
                                    className="mt-1 h-5 w-5 accent-primary"
                                    checked={state.marketingEnabled}
                                    onChange={(event) =>
                                        setState((current) => ({
                                            ...current,
                                            marketingEnabled: event.target.checked,
                                        }))
                                    }
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-foreground/10 bg-background p-5 md:border-l md:border-t-0">
                        {state.storedChoice ? (
                            <button
                                type="button"
                                className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/50 transition hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
                                onClick={() => setState((current) => ({ ...current, isOpen: false }))}
                                aria-label="Close privacy choices"
                            >
                                <X className="h-4 w-4" aria-hidden="true" />
                            </button>
                        ) : null}

                        <button
                            type="button"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-[#2620B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2"
                            onClick={() => saveChoice(true, true)}
                        >
                            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                            Accept all
                        </button>
                        <button
                            type="button"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-foreground/15 bg-white px-4 py-3 text-sm font-bold text-foreground transition hover:bg-foreground/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2"
                            onClick={() => saveChoice(state.analyticsEnabled, state.marketingEnabled)}
                        >
                            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                            Save choices
                        </button>
                        <button
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-bold text-foreground/70 transition hover:bg-foreground/[0.04] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2"
                            onClick={() => saveChoice(false, false)}
                        >
                            Reject non-essential
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
