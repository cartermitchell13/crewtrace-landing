import type { AnchorHTMLAttributes, ReactNode } from "react";
import Button from "@/components/Button";
import { buildBookedCallUrl, type BookedCallUrlParams } from "@/lib/booked-call-url";

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
            {...anchorProps}
        >
            {children}
        </a>
    );
}
