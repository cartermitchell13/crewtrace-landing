"use client";

import React from "react";
import {
    Clock,
    FileSpreadsheet,
    AlertTriangle,
    MousePointerClick,
    XCircle,
    CheckCircle2,
} from "lucide-react";
import FeaturePainPoints from "@/components/FeaturePainPoints";

const painPoints = [
    {
        title: "The Thursday timesheet grind",
        description:
            "Every pay period, somebody loses three hours retyping approved hours into QuickBooks line by line — and a single typo means a wrong paycheck.",
        icon: Clock,
        tone: "rose" as const,
        visual: (
            <div className="w-full max-w-sm grid grid-cols-[1.15fr_0.85fr] gap-3 font-sans text-xs text-left">
                {/* Manual grind */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="border-b border-slate-200 pb-1.5 mb-2 text-slate-400 font-bold uppercase tracking-wider text-[9px] flex justify-between">
                            <span>Manual Entry</span>
                            <span className="text-rose-500 font-bold">Slow</span>
                        </div>
                        <div className="space-y-1.5">
                            <div>
                                <label className="text-[8px] font-bold text-slate-400 block uppercase">Employee Name</label>
                                <input type="text" readOnly value="Jose Martinez" className="w-full bg-white border border-slate-200 rounded p-1 text-[10px] text-slate-800 focus:outline-none" />
                            </div>
                            <div>
                                <label className="text-[8px] font-bold text-slate-400 block uppercase">Hours (Reg / OT)</label>
                                <div className="grid grid-cols-2 gap-1">
                                    <input type="text" readOnly value="40.0" className="w-full bg-white border border-slate-200 rounded p-1 text-[10px] text-slate-800 text-center" />
                                    <input type="text" readOnly value="5.25" className="w-full bg-white border border-slate-200 rounded p-1 text-[10px] text-slate-800 text-center" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-[9px] text-slate-500 italic leading-snug">
                        Entry 1 of 48. Time remaining: 2.5 hours.
                    </div>
                </div>

                {/* Crewtrace Sync */}
                <div className="rounded-lg border border-emerald-250 bg-emerald-50/20 p-3 shadow-md flex flex-col justify-between items-center text-center">
                    <div className="w-full">
                        <div className="border-b border-emerald-100 pb-1.5 mb-3 text-emerald-600 font-bold uppercase tracking-wider text-[9px] text-left">
                            One-Click Sync
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-2 px-3 rounded shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 text-[10px] transition-all hover:-translate-y-0.5">
                            <MousePointerClick size={10} />
                            Sync QBO
                        </button>
                    </div>
                    <div className="w-full mt-2 pt-2 border-t border-emerald-150 text-[9px] font-bold text-emerald-600 flex items-center justify-center gap-1">
                        <CheckCircle2 size={10} /> Pushed in 12s
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "CSV imports that almost work",
        description:
            "One mismatched name, one renamed job, and the whole import either fails or quietly posts the wrong hours to the wrong customer.",
        icon: FileSpreadsheet,
        tone: "amber" as const,
        visual: (
            <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50/70 p-4 font-sans text-xs shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-semibold text-slate-800">QuickBooks Import Summary</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600 border border-rose-100">
                        Error (CSV)
                    </span>
                </div>
                <div className="rounded border border-rose-200 bg-rose-50/50 p-2.5 text-[10px] text-rose-800 leading-normal text-left space-y-1">
                    <p className="font-bold text-rose-900 flex items-center gap-1">
                        <XCircle size={10} className="shrink-0" /> Sync Aborted
                    </p>
                    <p>Employee name &apos;Marcus Aurelius&apos; on line 17 doesn&apos;t match QuickBooks entry &apos;Marcus H. Aurelius&apos;.</p>
                </div>
                <div className="rounded-md bg-emerald-50/50 border border-emerald-100 p-2.5 text-[10px] text-emerald-800 leading-normal text-left">
                    <p className="font-bold text-emerald-900">Crewtrace Smart Match</p>
                    <p className="mt-0.5">QuickBooks and Crewtrace employee records auto-mapped. Discrepancies resolved prior to sync.</p>
                </div>
            </div>
        ),
    },
    {
        title: "Job costing that doesn't match",
        description:
            "Field hours live in one system, QuickBooks lives in another, and the labor numbers on the project P&L never quite tie out.",
        icon: AlertTriangle,
        tone: "slate" as const,
        visual: (
            <div className="w-full max-w-sm flex flex-col gap-3 font-sans text-xs text-left">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-sm space-y-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Weekly Payroll Reconciliation</span>
                    <div className="space-y-1 text-[10px] text-slate-600 font-medium">
                        <div className="flex justify-between border-b border-slate-200 pb-0.5">
                            <span>QuickBooks Labor Expense Ledger:</span>
                            <span className="font-bold text-slate-800">$14,350.00</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-0.5">
                            <span>Field Clock Hours timesheets:</span>
                            <span className="font-bold text-slate-800">$14,820.00</span>
                        </div>
                        <div className="flex justify-between text-rose-600 font-bold bg-rose-50 px-1 py-0.5 rounded">
                            <span>Variance Mismatch:</span>
                            <span>-$470.00</span>
                        </div>
                    </div>
                </div>
                <div className="rounded border border-emerald-200 bg-white p-2 text-center text-[10px] font-bold text-emerald-700">
                    Crewtrace sync auto-allocates labor directly to QuickBooks projects.
                </div>
            </div>
        ),
    },
];

export default function QuickBooksPainPointsSection() {
    return (
        <FeaturePainPoints
            eyebrow="No more double entry"
            eyebrowIcon={AlertTriangle}
            title="The gap between the field and the ledger."
            description="Field data is messy. QuickBooks needs it neat. Retyping hours into QuickBooks is a chore; uploading spreadsheets is a risk. We built a direct link."
            painPoints={painPoints}
        />
    );
}
