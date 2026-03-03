"use client";

import { useEffect, useRef } from "react";
import {
    captureFirstTouchAttribution,
    readFirstTouchAttribution,
} from "@/lib/first-touch-attribution";
import { sendSeoEvent } from "@/lib/event-transport";
import { buildSeoLandingViewEvent } from "@/lib/seo-events";

type SeoLandingTrackerProps = {
    templateType: string;
    cluster: string;
    pageUrl: string;
    pageSlug?: string;
};

export default function SeoLandingTracker({
    templateType,
    cluster,
    pageUrl,
    pageSlug,
}: SeoLandingTrackerProps) {
    const sentRef = useRef(false);

    useEffect(() => {
        if (sentRef.current) {
            return;
        }
        sentRef.current = true;

        const firstTouch =
            readFirstTouchAttribution() ??
            captureFirstTouchAttribution({ landingUrl: pageUrl });
        const event = buildSeoLandingViewEvent({
            templateType,
            cluster,
            pageUrl,
            pageSlug,
            firstTouch,
        });

        void sendSeoEvent(event);
    }, [cluster, pageSlug, pageUrl, templateType]);

    return null;
}
