export type ImagePlaceholderTone = "primary" | "emerald" | "amber" | "slate" | "rose" | "sky";

export type ImagePlaceholderVariant = "grid" | "map" | "phone" | "radar";

export type ImagePlaceholderProps = {
    label: string;
    sublabel?: string;
    aspect?: string;
    tone?: ImagePlaceholderTone;
    variant?: ImagePlaceholderVariant;
    className?: string;
};

const toneMap: Record<ImagePlaceholderTone, string> = {
    primary: "from-primary/15 via-primary/5 to-white",
    emerald: "from-emerald-200/40 via-emerald-50 to-white",
    amber: "from-amber-200/40 via-amber-50 to-white",
    slate: "from-slate-200/60 via-slate-50 to-white",
    rose: "from-rose-200/40 via-rose-50 to-white",
    sky: "from-sky-200/40 via-sky-50 to-white",
};

const dotMap: Record<ImagePlaceholderTone, string> = {
    primary: "bg-primary/40",
    emerald: "bg-emerald-500/50",
    amber: "bg-amber-500/50",
    slate: "bg-slate-500/40",
    rose: "bg-rose-500/50",
    sky: "bg-sky-500/50",
};

export default function ImagePlaceholder({
    label,
    sublabel,
    aspect = "aspect-[16/10]",
    tone = "primary",
    variant = "grid",
    className = "",
}: ImagePlaceholderProps) {
    return (
        <div
            className={`relative w-full overflow-hidden rounded-md border border-foreground/5 bg-gradient-to-br ${toneMap[tone]} ${aspect} ${className}`}
            role="img"
            aria-label={label}
        >
            {variant === "grid" && (
                <div
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
            )}
            {variant === "map" && (
                <>
                    <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                            backgroundImage:
                                "linear-gradient(115deg, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(65deg, rgba(15,23,42,0.08) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                    <div className="absolute left-[18%] top-[28%] h-40 w-40 rounded-full border-2 border-dashed border-primary/50 bg-primary/10" />
                    <div className="absolute left-[30%] top-[42%] h-3 w-3 rounded-full bg-primary shadow-[0_0_0_6px_rgba(47,39,206,0.18)]" />
                    <div className="absolute right-[22%] top-[58%] h-28 w-28 rounded-full border-2 border-dashed border-emerald-500/50 bg-emerald-500/10" />
                    <div className="absolute right-[30%] top-[66%] h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
                </>
            )}
            {variant === "phone" && (
                <div
                    className="absolute inset-0 opacity-[0.25]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 30% 20%, rgba(47,39,206,0.25) 0%, transparent 40%), radial-gradient(circle at 75% 80%, rgba(16,185,129,0.2) 0%, transparent 40%)",
                    }}
                />
            )}
            {variant === "radar" && (
                <>
                    <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" />
                    <div className="absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30" />
                    <div className="absolute left-1/2 top-1/2 h-[20%] w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40" />
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
                </>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
                <span className={`flex h-2 w-2 rounded-full ${dotMap[tone]}`} />
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/45">
                    Image placeholder
                </p>
                <p className="max-w-md text-sm font-semibold text-foreground/70">{label}</p>
                {sublabel ? (
                    <p className="max-w-md text-xs font-medium text-foreground/45">{sublabel}</p>
                ) : null}
            </div>
        </div>
    );
}
