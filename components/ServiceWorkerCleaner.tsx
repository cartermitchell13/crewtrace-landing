"use client";

import { useEffect } from "react";

/**
 * Unregisters any stale service workers that may be intercepting requests.
 * A stale sw.js was blocking video range requests (HTTP 206) causing ERR_FAILED.
 */
export default function ServiceWorkerCleaner() {
    useEffect(() => {
        if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                for (const registration of registrations) {
                    registration.unregister();
                    console.log("[ServiceWorkerCleaner] Unregistered:", registration.scope);
                }
            });
        }
    }, []);

    return null;
}
