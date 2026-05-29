type GreyPlaceholderProps = {
    aspect?: string;
    className?: string;
    label?: string;
};

export default function GreyPlaceholder({
    aspect = "aspect-[16/10]",
    className = "",
    label,
}: GreyPlaceholderProps) {
    return (
        <div
            className={`relative w-full overflow-hidden rounded-md border border-foreground/[0.06] bg-slate-200/80 ${aspect} ${className}`}
            role="img"
            aria-label={label ?? "Image placeholder"}
        >
            {label ? (
                <span className="sr-only">{label}</span>
            ) : null}
        </div>
    );
}
