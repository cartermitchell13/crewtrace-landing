"use client";

import { useEffect, useRef } from "react";
import {
    captureFirstTouchAttribution,
    readFirstTouchAttribution,
} from "@/lib/first-touch-attribution";
import { sendSeoEvent } from "@/lib/event-transport";
import { buildBookedCallEmbedInteractionEvent } from "@/lib/seo-events";

type CalEmbedInteractionTrackerProps = {
    templateType?: string;
    cluster?: string;
    ctaLocation?: string;
};

function normalizeInteraction(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9:_-]+/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_+|_+$/g, "");
}

function asCalInteraction(value: unknown): string | null {
    if (typeof value === "string") {
        const direct = normalizeInteraction(value);
        if (
            direct.includes("cal") ||
            direct.includes("booking") ||
            direct.includes("slot") ||
            direct.includes("scheduler")
        ) {
            return direct;
        }

        try {
            const parsed = JSON.parse(value);
            return asCalInteraction(parsed);
        } catch {
            return null;
        }
    }

    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return null;
    }

    const payload = value as Record<string, unknown>;
    const candidates = [
        payload.event,
        payload.type,
        payload.name,
        payload.action,
        payload.message,
        (payload.data as Record<string, unknown> | undefined)?.event,
        (payload.data as Record<string, unknown> | undefined)?.type,
    ];

    for (const candidate of candidates) {
        if (typeof candidate !== "string") {
            continue;
        }

        const normalized = normalizeInteraction(candidate);
        if (
            normalized.includes("cal") ||
            normalized.includes("booking") ||
            normalized.includes("slot")
        ) {
            return normalized;
        }
    }

    return null;
}

export default function CalEmbedInteractionTracker({
    templateType = "contact",
    cluster = "company",
    ctaLocation = "cal_embed",
}: CalEmbedInteractionTrackerProps) {
    const emittedSignalsRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        // Cal embeds emit interaction signals through window postMessage events.
        const handleMessage = (message: MessageEvent) => {
            const interaction = asCalInteraction(message.data);
            if (!interaction) {
                return;
            }

            const pageUrl = `${window.location.pathname}${window.location.search}`;
            const firstTouch =
                readFirstTouchAttribution() ?? captureFirstTouchAttribution();
            const event = buildBookedCallEmbedInteractionEvent(
                {
                    templateType,
                    cluster,
                    pageUrl,
                    firstTouch,
                },
                {
                    ctaLabel: interaction,
                    ctaLocation,
                },
            );

            const dedupeKey = `${event.conversion_key}:${interaction}`;
            if (emittedSignalsRef.current.has(dedupeKey)) {
                return;
            }

            emittedSignalsRef.current.add(dedupeKey);
            void sendSeoEvent(event);
        };

        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [cluster, ctaLocation, templateType]);

    return null;
}
