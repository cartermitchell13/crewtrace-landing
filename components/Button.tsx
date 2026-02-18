import { ArrowRight } from "lucide-react";

interface ButtonProps {
    href: string;
    children: React.ReactNode;
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

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
            {showArrow && <ArrowRight size={size === "lg" ? 20 : 16} className="transition-transform group-hover:translate-x-1" />}
        </a>
    );
}
