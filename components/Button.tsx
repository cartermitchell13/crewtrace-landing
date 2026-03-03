import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps
    extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
    href: string;
    children: ReactNode;
    variant?: "primary" | "white";
    size?: "md" | "lg";
    className?: string;
    showArrow?: boolean;
}

export default function Button({
    href,
    children,
    variant = "primary",
    size = "md",
    className = "",
    showArrow = false,
    target = "_blank",
    rel,
    ...anchorProps
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center gap-2 font-bold rounded-xl shadow-button transition-all whitespace-nowrap hover:translate-y-[-2px] hover:translate-x-[-2px] active:translate-y-[0px] active:translate-x-[0px]";

    const variants = {
        primary: "bg-primary text-white",
        white: "bg-white text-primary hover:bg-white/90",
    };

    const sizes = {
        md: "px-8 py-4 text-base",
        lg: "px-10 py-5 text-lg",
    };

    const finalRel = target === "_blank" ? rel ?? "noopener noreferrer" : rel;

    return (
        <a
            href={href}
            target={target}
            rel={finalRel}
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
            {...anchorProps}
        >
            {children}
            {showArrow && <ArrowRight size={size === "lg" ? 20 : 16} className="transition-transform group-hover:translate-x-1" />}
        </a>
    );
}
