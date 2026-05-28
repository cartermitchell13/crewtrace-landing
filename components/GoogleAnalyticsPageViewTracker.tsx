"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type GtagConfigParams = {
    page_path?: string;
    page_location?: string;
    page_title?: string;
    send_page_view?: boolean;
};

type GtagEventParams = Record<string, string | number | boolean>;

type Gtag = {
    (command: "js", date: Date): void;
    (command: "config", measurementId: string, params?: GtagConfigParams): void;
    (command: "event", eventName: string, params?: GtagEventParams): void;
};

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: Gtag;
    }
}

type GoogleAnalyticsPageViewTrackerProps = {
    measurementId: string;
};

export default function GoogleAnalyticsPageViewTracker({
    measurementId,
}: GoogleAnalyticsPageViewTrackerProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastSentPageViewRef = useRef<string | null>(null);

    useEffect(() => {
        if (!measurementId || !pathname) {
            return;
        }

        const queryString = searchParams.toString();
        const pagePath = queryString ? `${pathname}?${queryString}` : pathname;
        const pageViewKey = `${measurementId}:${pagePath}`;
        let retryCount = 0;
        let retryTimer: number | undefined;

        const sendPageView = () => {
            if (typeof window.gtag !== "function") {
                if (retryCount < 50) {
                    retryCount += 1;
                    retryTimer = window.setTimeout(sendPageView, 100);
                }

                return;
            }

            if (lastSentPageViewRef.current === pageViewKey) {
                return;
            }

            lastSentPageViewRef.current = pageViewKey;

            window.gtag("config", measurementId, {
                page_path: pagePath,
                page_location: `${window.location.origin}${pagePath}`,
                page_title: document.title,
            });
        };

        sendPageView();

        return () => {
            if (retryTimer !== undefined) {
                window.clearTimeout(retryTimer);
            }
        };
    }, [measurementId, pathname, searchParams]);

    return null;
}
