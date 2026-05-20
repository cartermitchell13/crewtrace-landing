"use client";

import React from "react";
import {
    Calculator,
    Timer,
    Tags,
    AlertTriangle,
} from "lucide-react";
import FeaturePainPoints from "@/components/FeaturePainPoints";

const painPoints = [
    {
        title: "The Friday spreadsheet rebuild",
        description:
            "Labor budgets live in Excel while actual hours live in timesheets. By the time someone reconciles them, the week you could have fixed is already in payroll.",
        icon: Calculator,
        tone: "rose" as const,
        visual: (
            <div className="w-full max-w-sm grid grid-cols-[1.1fr_0.9fr] gap-3 font-sans text-xs text-left">
                {/* Excel Card */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="border-b border-slate-200 pb-1.5 mb-2 text-slate-400 font-bold uppercase tracking-wider text-[9px] flex justify-between">
                            <span>Excel Sheet</span>
                            <span className="text-rose-500">Broken</span>
                        </div>
                        <div className="space-y-1 font-mono text-[10px] text-slate-500">
                            <div className="flex justify-between border-b border-slate-200/50 pb-0.5">
                                <span>Est Hours:</span>
                                <span>120</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200/50 pb-0.5 text-rose-500 font-bold">
                                <span>Actual:</span>
                                <span>#REF!</span>
                            </div>
                            <div className="flex justify-between text-rose-500 font-bold">
                                <span>Variance:</span>
                                <span>#VALUE!</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-[9px] text-rose-600 font-semibold italic">
                        2.5 hours spent tracking down Jose&apos;s Monday timesheet.
                    </div>
                </div>

                {/* Crewtrace Card */}
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/20 p-3 shadow-md flex flex-col justify-between">
                    <div>
                        <div className="border-b border-emerald-100 pb-1.5 mb-2 text-emerald-600 font-bold uppercase tracking-wider text-[9px]">
                            Crewtrace Live
                        </div>
                        <div className="space-y-1 text-slate-700 font-semibold text-[10px]">
                            <div className="flex justify-between">
                                <span>Est:</span>
                                <span>120h</span>
                            </div>
                            <div className="flex justify-between text-emerald-700">
                                <span>Actual:</span>
                                <span>114.5h</span>
                            </div>
                            <div className="flex justify-between border-t border-emerald-100/50 mt-1 pt-1 text-emerald-700">
                                <span>Variance:</span>
                                <span>+5.5h</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 text-[8px] bg-emerald-100/50 border border-emerald-250 px-1 py-0.5 rounded text-emerald-700 font-bold text-center uppercase tracking-wide">
                        Synced & Safe
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Job cost that arrives too late",
        description:
            "You find out a job blew its labor budget after payroll closes — when the only option left is to eat the margin or argue about numbers nobody tracked in the field.",
        icon: Timer,
        tone: "amber" as const,
        visual: (
            <div className="w-full max-w-sm rounded-lg border border-slate-200/60 bg-slate-50/70 p-4 font-sans text-xs shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/50 pb-2">
                    <span className="font-semibold text-slate-800">Pine Valley Foundation Budget</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 border border-amber-100">
                        Warning
                    </span>
                </div>
                {/* Progress Bar Visual */}
                <div className="space-y-1.5 text-left">
                    <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                        <span>Labor Budget ($20k limit)</span>
                        <span className="text-rose-600 font-bold">$24.5k Spent (122%)</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: "100%" }} />
                    </div>
                </div>
                <div className="rounded-md bg-rose-50/60 border border-rose-100 p-2.5 text-[10px] font-medium text-rose-800 text-left flex items-start gap-2">
                    <AlertTriangle size={12} className="mt-0.5 shrink-0 text-rose-600" />
                    <span>Labor budget exceeded on Wednesday. Discovered on Friday payroll sync — 2 days after margin loss.</span>
                </div>
            </div>
        ),
    },
    {
        title: "Hours with no work type",
        description:
            "Crews clocked the time, but nobody tagged demolition from framing. Reporting becomes guesswork and cost-code breakdowns never tie to real clock events.",
        icon: Tags,
        tone: "slate" as const,
        visual: (
            <div className="w-full max-w-sm grid grid-cols-2 gap-4 font-sans text-[11px] text-left">
                {/* No Work Type */}
                <div className="rounded-lg border border-slate-300 bg-slate-50/50 p-3 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="border-b border-slate-200 pb-1.5 mb-2 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                            Traditional Timesheet
                        </div>
                        <p className="font-bold text-slate-800">Jose M. — 40 Hours</p>
                        <p className="mt-2 text-slate-500 italic leading-normal">
                            Uncoded / &quot;General Labor&quot;
                        </p>
                    </div>
                    <div className="mt-4 pt-2 text-[9px] font-semibold text-rose-600 border-t border-slate-100 uppercase tracking-wide">
                        0% Estimate Accuracy
                    </div>
                </div>

                {/* Crewtrace Tagged */}
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/20 p-3 shadow-md flex flex-col justify-between">
                    <div>
                        <div className="border-b border-emerald-100 pb-1.5 mb-2 text-emerald-600 font-bold uppercase tracking-wider text-[9px]">
                            Crewtrace Cost Code
                        </div>
                        <p className="font-bold text-slate-800 mb-2">Jose M. — 40 Hours</p>
                        <div className="space-y-1 text-[10px] text-slate-700 font-semibold">
                            <div className="flex justify-between">
                                <span>Demolition:</span>
                                <span>12h</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Framing:</span>
                                <span>20h</span>
                            </div>
                            <div className="flex justify-between text-emerald-700">
                                <span>Clean-up:</span>
                                <span>8h</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 pt-2 text-[9px] font-bold text-emerald-600 border-t border-emerald-100 uppercase tracking-wide">
                        100% Cost Tagged
                    </div>
                </div>
            </div>
        ),
    },
];

export default function JobCostingPainPointsSection() {
    return (
        <FeaturePainPoints
            eyebrow="Sound familiar?"
            eyebrowIcon={AlertTriangle}
            title="Job costing fails when the field and the spreadsheet never meet."
            description="Most contractors do not lack budgets. They lack a live connection between clock events, work types, and the labor numbers finance needs before margin is gone."
            painPoints={painPoints}
        />
    );
}
