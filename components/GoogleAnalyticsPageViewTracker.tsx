"use client";

import { useEffect } from "react";
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

    useEffect(() => {
        if (!measurementId || typeof window.gtag !== "function" || !pathname) {
            return;
        }

        const queryString = searchParams.toString();
        const pagePath = queryString ? `${pathname}?${queryString}` : pathname;

        window.gtag("config", measurementId, {
            page_path: pagePath,
            page_location: `${window.location.origin}${pagePath}`,
            page_title: document.title,
        });
    }, [measurementId, pathname, searchParams]);

    return null;
}
