"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import Button from "@/components/Button";
import { buildBookedCallUrl, type BookedCallUrlParams } from "@/lib/booked-call-url";
import {
    captureFirstTouchAttribution,
    readFirstTouchAttribution,
} from "@/lib/first-touch-attribution";
import { sendSeoEvent } from "@/lib/event-transport";
import { buildBookedCallCtaClickEvent } from "@/lib/seo-events";

type BookedCallLinkProps = Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "children"
> & {
    children: ReactNode;
    params?: BookedCallUrlParams;
    templateType?: string;
    cluster?: string;
    landingPath?: string;
    asButton?: boolean;
    buttonVariant?: "primary" | "white";
    buttonSize?: "md" | "lg";
    showArrow?: boolean;
    ctaLabel?: string;
    ctaLocation?: string;
};

export default function BookedCallLink({
    children,
    params,
    templateType,
    cluster,
    landingPath,
    className,
    target = "_blank",
    rel,
    asButton = false,
    buttonVariant = "primary",
    buttonSize = "md",
    showArrow = false,
    ctaLabel,
    ctaLocation,
    onClick,
    ...anchorProps
}: BookedCallLinkProps) {
    const href = buildBookedCallUrl({
        params: {
            ...params,
            ...(templateType ? { template_type: templateType } : {}),
            ...(cluster ? { cluster } : {}),
            ...(landingPath ? { landing_url: landingPath } : {}),
        },
    });

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (event.defaultPrevented) {
            return;
        }

        const firstTouch =
            readFirstTouchAttribution() ?? captureFirstTouchAttribution();
        const pageUrl =
            typeof window !== "undefined"
                ? `${window.location.pathname}${window.location.search}`
                : landingPath ?? "/";

        const seoEvent = buildBookedCallCtaClickEvent(
            {
                templateType: templateType ?? "unknown",
                cluster: cluster ?? "unknown",
                pageUrl,
                firstTouch,
            },
            {
                ctaLabel,
                ctaLocation,
            },
        );
        void sendSeoEvent(seoEvent);
    };

    if (asButton) {
        return (
            <Button
                href={href}
                variant={buttonVariant}
                size={buttonSize}
                className={className}
                target={target}
                rel={rel}
                showArrow={showArrow}
                onClick={handleClick}
                {...anchorProps}
            >
                {children}
            </Button>
        );
    }

    const finalRel = target === "_blank" ? rel ?? "noopener noreferrer" : rel;

    return (
        <a
            href={href}
            target={target}
            rel={finalRel}
            className={className}
            onClick={handleClick}
            {...anchorProps}
        >
            {children}
        </a>
    );
}
