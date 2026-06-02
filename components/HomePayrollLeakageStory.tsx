import Image from "next/image";
import Link from "next/link";
import {
    AlertTriangle,
    ArrowRight,
    Calculator,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import CalculatorReportPreview from "@/components/payroll-leakage/CalculatorReportPreview";

const problemCards = [
    "A worker clocks in before reaching the site.",
    "Someone edits missed time at the end of the week.",
    "A foreman approves hours without location proof.",
    "Payroll spends Friday chasing down missing details.",
    "The business pays for time it can't confidently verify.",
];

const beforeItems = [
    "Paper sheets and screenshots",
    "Manual edits with no clear trail",
    "Foremen approving time from memory",
    "Payroll questions every Friday",
    "Hard conversations after checks are already cut",
];

const afterItems = [
    "Clock-ins tied to jobsites",
    "GPS context on every event",
    "Exceptions visible before approval",
    "Cleaner records for payroll",
    "Fewer disputes over who was where and when",
];

function StoryImage({
    src,
    alt,
    className = "",
    imageClassName = "object-cover object-center",
}: {
    src: string;
    alt: string;
    className?: string;
    imageClassName?: string;
}) {
    return (
        <div
            className={`relative aspect-video w-full overflow-hidden rounded-md border border-foreground/[0.06] bg-white/80 ${className}`}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={imageClassName}
            />
        </div>
    );
}

export default function HomePayrollLeakageStory() {
    return (
        <>
            <section id="payroll-leakage" className="scroll-mt-32 py-20 md:py-28">
                <div className="layout-shell">
                    <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
                        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                            Payroll leakage
                        </p>
                        <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            Unverified time turns into real margin loss
                        </h2>
                        <p className="mx-auto text-lg font-medium leading-relaxed text-foreground/60 md:text-xl">
                            Most crews are not trying to create payroll problems. But when time comes
                            from paper sheets, texts, memory, or a generic clock app, small errors stack up fast.
                        </p>
                    </div>

                    <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {problemCards.map((card, index) => (
                            <div
                                key={card}
                                className="group relative overflow-hidden rounded-md border border-slate-200/90 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.04),0_12px_32px_-8px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_16px_40px_-8px_rgba(47,39,206,0.1)]"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-rose-50 text-xs font-bold tabular-nums text-rose-600">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <AlertTriangle
                                        size={18}
                                        className="text-rose-400/70 transition-colors group-hover:text-rose-500"
                                    />
                                </div>
                                <p className="text-[15px] font-semibold leading-snug text-foreground/85">
                                    {card}
                                </p>
                            </div>
                        ))}
                        <div className="relative overflow-hidden rounded-md border border-primary/15 bg-gradient-to-br from-primary/[0.06] via-secondary/30 to-white p-6 sm:col-span-2 lg:col-span-1">
                            <StoryImage
                                src="/images/blog/payroll-signs-cover.png"
                                alt="Construction business owner reviewing payroll paperwork and calculator at a desk"
                                className="mb-4 border-primary/10"
                            />
                            <p className="text-sm font-medium leading-relaxed text-foreground/60">
                                Small gaps in verification compound across every crew, every week.
                            </p>
                        </div>
                    </div>

                    <p className="mx-auto max-w-2xl text-center text-lg font-semibold leading-relaxed text-foreground/70">
                        One or two questionable entries may not look like much. Across every crew, every
                        week, they become a payroll problem worth measuring.
                    </p>
                </div>
            </section>

            <section id="payroll-audit" className="scroll-mt-32 py-20 md:py-28">
                <div className="layout-shell">
                    <div className="relative overflow-hidden rounded-md border border-primary/20 bg-gradient-to-br from-primary via-primary to-[#1e18a8] p-8 md:p-12 lg:p-16">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-[url('/images/background-design-ct.png')] bg-cover bg-center opacity-20"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12)_0%,transparent_55%)]"
                        />

                        <div className="relative z-10 grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-center lg:gap-12 xl:gap-14">
                            <div className="space-y-6 text-white">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/90">
                                    <Calculator size={14} />
                                    <span>Free payroll leakage audit</span>
                                </div>
                                <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                                    What could a few unverified hours be costing you?
                                </h2>
                                <p className="max-w-xl text-lg font-medium leading-relaxed text-white/80">
                                    Run a quick audit using your crew size, hourly rates, and estimated
                                    time errors. You will see where money may be slipping through before
                                    you change any systems.
                                </p>
                                <div className="flex flex-col items-start gap-3">
                                    <Link
                                        href="/calculator"
                                        className="group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-white px-6 py-3.5 text-base font-bold text-primary transition-all hover:bg-white/95 motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                                    >
                                        Calculate My Payroll Leakage
                                        <ArrowRight
                                            size={18}
                                            className="shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5"
                                        />
                                    </Link>
                                    <p className="text-sm font-medium text-white/65">
                                        Takes about 60 seconds. No spreadsheet required.
                                    </p>
                                </div>
                            </div>

                            <div className="w-full">
                                <CalculatorReportPreview />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="payroll-proof" className="scroll-mt-32 py-20 md:py-28">
                <div className="layout-shell">
                    <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            From payroll guessing to payroll proof
                        </h2>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="overflow-hidden rounded-md border border-rose-200/80 bg-gradient-to-b from-rose-50/80 to-white">
                            <div className="border-b border-rose-100 px-6 py-4">
                                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-rose-600">
                                    <XCircle size={16} />
                                    Before
                                </div>
                            </div>
                            <div className="space-y-4 p-6">
                                <StoryImage
                                    src="/images/quickbooks/before-csv.png"
                                    alt="Messy payroll spreadsheet with errors, warnings, and manual notes"
                                    className="border-rose-100"
                                />
                                <ul className="space-y-3">
                                    {beforeItems.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-3 text-[15px] font-medium text-foreground/70"
                                        >
                                            <XCircle
                                                size={18}
                                                className="mt-0.5 shrink-0 text-rose-400"
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-md border border-emerald-200/80 bg-gradient-to-b from-emerald-50/80 to-white">
                            <div className="border-b border-emerald-100 px-6 py-4">
                                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-700">
                                    <CheckCircle2 size={16} />
                                    After
                                </div>
                            </div>
                            <div className="space-y-4 p-6">
                                <StoryImage
                                    src="/images/quickbooks/after-sync.png"
                                    alt="Crewtrace payroll report ready for review and sync"
                                    className="border-emerald-100"
                                />
                                <ul className="space-y-3">
                                    {afterItems.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-3 text-[15px] font-medium text-foreground/70"
                                        >
                                            <CheckCircle2
                                                size={18}
                                                className="mt-0.5 shrink-0 text-emerald-500"
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
