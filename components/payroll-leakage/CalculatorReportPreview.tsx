import {
    AlertCircle,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    Truck,
} from "lucide-react";
import { calculateSavings, type CalculatorInputs } from "@/lib/calculator-calculations";

const EXAMPLE_INPUTS: CalculatorInputs = {
    crewSize: 12,
    avgHourlyRate: 28,
    hoursPerWeekOnPayroll: 5,
    jobSites: 3,
    tradeType: "residential",
    trackingMethod: "paper",
    overtimeLevel: "moderate",
};

const EXAMPLE_RESULTS = calculateSavings(EXAMPLE_INPUTS);

const BREAKDOWN_CATEGORIES = [
    {
        label: "Rounding & discrepancies",
        yearly: EXAMPLE_RESULTS.yearlyInaccuracyLoss,
    },
    {
        label: "Buddy punching",
        yearly: EXAMPLE_RESULTS.yearlyBuddyPunchLoss,
    },
    {
        label: "Payroll errors",
        yearly: EXAMPLE_RESULTS.yearlyPayrollErrors,
    },
] as const;

function riskStyles(score: number) {
    if (score >= 75) {
        return {
            stroke: "#dc2626",
            badge: "bg-red-50 text-red-600",
        };
    }

    if (score >= 50) {
        return {
            stroke: "#f59e0b",
            badge: "bg-amber-50 text-amber-600",
        };
    }

    return {
        stroke: "#22c55e",
        badge: "bg-green-50 text-green-600",
    };
}

export default function CalculatorReportPreview() {
    const results = EXAMPLE_RESULTS;
    const risk = riskStyles(results.riskScore);
    const dailyLeakage = Math.round(results.totalYearlyLoss / 365);

    return (
        <div
            className="relative w-full overflow-hidden rounded-md border border-white/25 bg-white shadow-[0_24px_64px_-12px_rgba(15,23,42,0.35)]"
            role="img"
            aria-label={`Example payroll leakage calculator report showing an estimated $${results.totalYearlyLoss.toLocaleString()} in annual leakage for a ${EXAMPLE_INPUTS.crewSize}-person crew`}
        >
            <div className="border-b border-foreground/5 px-5 py-4">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/10 bg-primary/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
                    <CheckCircle2 size={11} aria-hidden />
                    <span>Sample audit result</span>
                </div>
                <p className="mt-2 text-xs font-medium text-foreground/45">
                    {EXAMPLE_INPUTS.crewSize}-person crew · Paper timesheets · 3 active sites
                </p>
            </div>

            <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-4 border-b border-foreground/5 px-5 py-4">
                <div className="flex flex-col items-center justify-center rounded-md border border-foreground/5 bg-foreground/[0.02] px-2 py-3 text-center">
                    <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-foreground/40">
                        Risk
                    </div>
                    <div className="relative mt-2 h-14 w-14 shrink-0">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
                            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="8" />
                            <circle
                                cx="50"
                                cy="50"
                                r="42"
                                fill="none"
                                stroke={risk.stroke}
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${results.riskScore * 2.64} 264`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-lg font-bold leading-none tracking-tight text-foreground">
                                {results.riskScore}
                            </div>
                            <div className="text-[9px] font-bold text-foreground/40">/100</div>
                        </div>
                    </div>
                    <div className={`mt-2 rounded-full px-2 py-0.5 text-[9px] font-bold ${risk.badge}`}>
                        {results.riskLevel}
                    </div>
                </div>

                <div className="min-w-0 self-center">
                    <div className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-red-600">
                        <AlertCircle size={10} aria-hidden />
                        Estimated annual leakage
                    </div>
                    <div className="mt-1.5 text-[2rem] font-extrabold leading-none tracking-tighter text-red-600 tabular-nums">
                        ${results.totalYearlyLoss.toLocaleString()}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-foreground/55">
                        <span>
                            <span className="font-bold text-red-600">
                                ${results.totalMonthlyLoss.toLocaleString()}/mo
                            </span>
                        </span>
                        <span>
                            <span className="font-bold text-foreground">
                                ${results.perWorkerYearlyLoss.toLocaleString()}
                            </span>
                            /worker yr
                        </span>
                        <span>
                            <span className="font-bold text-foreground">{results.workersAffected}</span> of{" "}
                            {EXAMPLE_INPUTS.crewSize} affected
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-b border-foreground/5 px-5 py-4">
                <div className="mb-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-foreground/40">
                    <BarChart3 size={11} aria-hidden />
                    Leakage breakdown
                </div>
                <div className="space-y-2.5">
                    {BREAKDOWN_CATEGORIES.map((category) => {
                        const percentage =
                            results.totalYearlyLoss > 0
                                ? (category.yearly / results.totalYearlyLoss) * 100
                                : 0;

                        return (
                            <div key={category.label} className="space-y-1.5">
                                <div className="flex items-baseline justify-between gap-3">
                                    <span className="text-[11px] font-semibold text-foreground/75">
                                        {category.label}
                                    </span>
                                    <span className="shrink-0 text-[11px] font-bold tabular-nums text-red-600">
                                        ${category.yearly.toLocaleString()}
                                    </span>
                                </div>
                                <div className="h-1.5 overflow-hidden rounded-full bg-foreground/[0.05]">
                                    <div
                                        className="h-full rounded-full bg-red-500/70"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-foreground/[0.02] px-5 py-4">
                <div className="flex items-start gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-50">
                        <Truck size={14} className="text-red-500" aria-hidden />
                    </div>
                    <div className="min-w-0">
                        <div className="text-xs font-bold leading-tight text-foreground">
                            {results.truckPayments} truck payments
                        </div>
                        <div className="mt-0.5 text-[10px] font-medium text-foreground/40">At $650/mo avg lease</div>
                    </div>
                </div>
                <div className="flex items-start gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-50">
                        <CalendarDays size={14} className="text-red-500" aria-hidden />
                    </div>
                    <div className="min-w-0">
                        <div className="text-xs font-bold leading-tight text-foreground">
                            ${dailyLeakage.toLocaleString()}/day
                        </div>
                        <div className="mt-0.5 text-[10px] font-medium text-foreground/40">Leaking every day</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
