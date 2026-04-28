import { CheckCircle2, type LucideIcon } from "lucide-react";

export interface ComparisonRow {
    capability: string;
    icon: LucideIcon;
    left: string;
    right: string;
}

export interface FeatureComparisonProps {
    eyebrow?: string;
    eyebrowIcon?: LucideIcon;
    title: string;
    subtitle?: string;
    leftColumn: {
        label: string;
        sublabel: string;
        icon: LucideIcon;
        tone?: "rose";
    };
    rightColumn: {
        label: string;
        sublabel: string;
        icon: LucideIcon;
        badge?: string;
    };
    rows: ComparisonRow[];
    firstRowAnnotation?: string;
    leftSummary?: {
        icon: LucideIcon;
        text: string;
        highlight: string;
    };
    rightSummary?: {
        icon: LucideIcon;
        text: string;
        highlight: string;
    };
}

export default function FeatureComparison({
    eyebrow,
    eyebrowIcon: EyebrowIcon,
    title,
    subtitle,
    leftColumn,
    rightColumn,
    rows,
    firstRowAnnotation,
    leftSummary,
    rightSummary,
}: FeatureComparisonProps) {
    const LeftIcon = leftColumn.icon;
    const RightIcon = rightColumn.icon;
    const LeftSummaryIcon = leftSummary?.icon;
    const RightSummaryIcon = rightSummary?.icon;

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/60 to-white px-6 py-24 md:py-32">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[520px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(47,39,206,0.08),transparent_60%)]"
            />
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col items-center text-center mb-16">
                    {eyebrow && EyebrowIcon && (
                        <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/15 bg-amber-500/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-600 backdrop-blur-sm">
                            <EyebrowIcon size={14} />
                            {eyebrow}
                        </p>
                    )}
                    <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl max-w-3xl">
                        {title}
                        {subtitle && (
                            <>
                                <br className="hidden sm:block" />
                                <span className="text-foreground/40">{subtitle}</span>
                            </>
                        )}
                    </h2>
                </div>

                <div className="relative">
                    {/* Column headers */}
                    <div className="grid grid-cols-2 gap-3 md:gap-6 mb-3 md:mb-4">
                        <div className="rounded-2xl border border-rose-200/60 bg-gradient-to-br from-rose-50 to-white px-5 py-4 md:px-7 md:py-5">
                            <div className="flex items-center gap-2.5">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 ring-1 ring-rose-200/80">
                                    <LeftIcon size={15} />
                                </span>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-500/80">
                                        {leftColumn.label}
                                    </p>
                                    <p className="text-sm md:text-base font-extrabold tracking-tight text-foreground">
                                        {leftColumn.sublabel}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] via-white to-emerald-50/40 px-5 py-4 md:px-7 md:py-5 shadow-[0_8px_30px_-12px_rgba(47,39,206,0.25)]">
                            <div className="flex items-center gap-2.5">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                                    <RightIcon size={15} />
                                </span>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/80">
                                        {rightColumn.label}
                                    </p>
                                    <p className="text-sm md:text-base font-extrabold tracking-tight text-foreground">
                                        {rightColumn.sublabel}
                                    </p>
                                </div>
                            </div>
                            {rightColumn.badge && (
                                <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-md shadow-emerald-500/30">
                                    <CheckCircle2 size={11} /> {rightColumn.badge}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="surface-panel overflow-hidden rounded-[2rem] border border-foreground/5 bg-white shadow-xl">
                        {rows.map((row, i) => {
                            const Icon = row.icon;
                            return (
                                <div
                                    key={row.capability}
                                    className="group relative grid grid-cols-2 border-b border-foreground/5 last:border-b-0"
                                >
                                    {/* Capability badge — center pill, anchored on the divider */}
                                    <div className="pointer-events-none absolute left-1/2 top-4 z-10 hidden -translate-x-1/2 md:block">
                                        <div className="flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-3 py-1.5 shadow-sm">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-foreground/[0.04] text-foreground/60">
                                                <Icon size={12} />
                                            </span>
                                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-foreground/70">
                                                {row.capability}
                                            </span>
                                        </div>
                                    </div>

                                    {/* LEFT */}
                                    <div className="relative overflow-hidden bg-gradient-to-br from-rose-50/50 to-transparent px-5 py-6 pt-14 md:px-8 md:py-9 md:pt-14">
                                        <div
                                            aria-hidden
                                            className="absolute inset-0 opacity-[0.04]"
                                            style={{
                                                backgroundImage:
                                                    "linear-gradient(rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.5) 1px, transparent 1px)",
                                                backgroundSize: "24px 24px",
                                            }}
                                        />
                                        <div className="relative flex items-start gap-3">
                                            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500 ring-1 ring-rose-200">
                                                <span className="block h-2 w-2 rounded-full bg-rose-500" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="md:hidden mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/40">
                                                    {row.capability}
                                                </p>
                                                <p className="text-[15px] font-semibold leading-snug text-foreground/55 line-through decoration-rose-400/40 decoration-from-font">
                                                    {row.left}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vertical divider line for mobile */}
                                    <div
                                        aria-hidden
                                        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-foreground/10 to-transparent md:block"
                                    />

                                    {/* RIGHT */}
                                    <div className="relative overflow-hidden bg-gradient-to-br from-primary/[0.04] via-white to-emerald-50/30 px-5 py-6 pt-14 md:px-8 md:py-9 md:pt-14 transition-colors duration-500 group-hover:from-primary/[0.07]">
                                        <div className="relative flex items-start gap-3">
                                            <CheckCircle2
                                                size={22}
                                                className="mt-0.5 flex-shrink-0 text-emerald-500"
                                            />
                                            <div className="min-w-0">
                                                <p className="md:hidden mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary/70">
                                                    {row.capability}
                                                </p>
                                                <p className="text-[15px] font-bold leading-snug text-foreground">
                                                    {row.right}
                                                </p>
                                            </div>
                                        </div>
                                        {i === 0 && firstRowAnnotation && (
                                            <span className="pointer-events-none absolute right-4 top-4 hidden text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-600/70 md:block">
                                                ↳ {firstRowAnnotation}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer summary */}
                    {(leftSummary || rightSummary) && (
                        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
                            {leftSummary && LeftSummaryIcon && (
                                <div className="flex items-center gap-3 rounded-2xl border border-rose-200/50 bg-rose-50/40 px-5 py-4 text-sm">
                                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white text-rose-500 ring-1 ring-rose-200">
                                        <LeftSummaryIcon size={16} />
                                    </span>
                                    <p className="font-semibold text-foreground/70">
                                        <span className="text-rose-600">{leftSummary.highlight}</span> {leftSummary.text}
                                    </p>
                                </div>
                            )}
                            {rightSummary && RightSummaryIcon && (
                                <div className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/[0.06] to-emerald-50/40 px-5 py-4 text-sm shadow-[0_8px_30px_-12px_rgba(47,39,206,0.25)]">
                                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white text-primary ring-1 ring-primary/20">
                                        <RightSummaryIcon size={16} />
                                    </span>
                                    <p className="font-bold text-foreground">
                                        {rightSummary.text} <span className="text-primary">{rightSummary.highlight}</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
