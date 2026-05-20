"use client";

import React from "react";
import {
    Repeat,
    AlertTriangle,
    Clock,
    Bell,
} from "lucide-react";
import FeaturePainPoints from "@/components/FeaturePainPoints";

const painPoints = [
    {
        title: "The Sunday-night rebuild",
        description:
            "Spreadsheets get edited by three different people, then printed out before anyone notices the version is already stale.",
        icon: Repeat,
        tone: "rose" as const,
        visual: (
            <div className="w-full max-w-sm flex flex-col gap-2.5 font-sans text-xs text-left">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-sm space-y-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Sunday 7:15 PM Text Thread</span>
                    <div className="space-y-1.5 text-[10px] leading-normal font-medium">
                        <p className="text-slate-600"><span className="font-bold text-slate-800">Steve (Super):</span> Wait, did we move the concrete crew to Oak Ridge or Pine Ave?</p>
                        <p className="text-slate-600"><span className="font-bold text-slate-800">Bob (Super):</span> I thought Oak Ridge was delayed? I edited the spreadsheet at 5 PM.</p>
                        <p className="text-rose-600"><span className="font-bold text-rose-700">Mike (Foreman):</span> I printed the sheet at 4 PM. Mine says Pine Ave. What is the plan?</p>
                    </div>
                </div>
                <div className="rounded border border-rose-200 bg-rose-50/50 p-2 text-[10px] text-rose-800 font-semibold text-center uppercase tracking-wide">
                    Double Booking & Stale Schedule Versions
                </div>
            </div>
        ),
    },
    {
        title: "The 6 AM phone tree",
        description:
            "A job gets pushed and supervisors burn the morning calling, texting, and re-dispatching crews to the right address.",
        icon: AlertTriangle,
        tone: "amber" as const,
        visual: (
            <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50/70 p-4 font-sans text-xs shadow-sm space-y-3">
                {/* Mock Lock Screen */}
                <div className="border border-slate-250 bg-slate-100 rounded p-2.5 space-y-2 relative text-left">
                    <span className="text-[8px] font-bold text-slate-400 uppercase block">Missed Notifications</span>
                    <div className="rounded bg-white/80 p-1.5 border border-slate-200 shadow-sm text-[9px] flex justify-between items-center">
                        <div>
                            <p className="font-bold text-slate-800">Missed Call</p>
                            <p className="text-slate-500">Foreman Steve (6:02 AM)</p>
                        </div>
                        <span className="text-[8px] text-slate-400">5m ago</span>
                    </div>
                    <div className="rounded bg-white/80 p-1.5 border border-slate-200 shadow-sm text-[9px] flex justify-between items-center">
                        <div>
                            <p className="font-bold text-slate-800">Text Message (Jose M.)</p>
                            <p className="text-slate-500">&quot;Where am I supposed to go today?&quot;</p>
                        </div>
                        <span className="text-[8px] text-slate-400">12m ago</span>
                    </div>
                </div>
                <div className="rounded-md bg-emerald-50/60 border border-emerald-100 p-2 text-[10px] font-bold text-emerald-800 text-center flex items-center justify-center gap-1.5">
                    <Bell size={11} className="text-emerald-600 animate-bounce" />
                    <span>Crewtrace sends a push notification letting crews know their schedule is ready to view.</span>
                </div>
            </div>
        ),
    },
    {
        title: "The hours nobody planned",
        description:
            "Schedules say one thing, timesheets say another. Payroll spends Thursday reconciling who was actually where.",
        icon: Clock,
        tone: "slate" as const,
        visual: (
            <div className="w-full max-w-sm grid grid-cols-2 gap-4 font-sans text-[11px] text-left">
                {/* Scheduled */}
                <div className="rounded-lg border border-slate-300 bg-slate-50/50 p-3 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="border-b border-slate-200 pb-1.5 mb-2 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                            Scheduled
                        </div>
                        <p className="font-bold text-slate-700">Oak Ridge Site</p>
                        <p className="mt-1 text-[10px] text-slate-500 leading-normal">
                            Jose M. • 8:00 AM - 4:30 PM (8.0h)
                        </p>
                    </div>
                    <div className="mt-4 pt-2 text-[9px] font-semibold text-slate-500 border-t border-slate-100 uppercase tracking-wide">
                        Planned Target
                    </div>
                </div>

                {/* Clock Event */}
                <div className="rounded-lg border border-rose-200 bg-rose-50/40 p-3 shadow-md flex flex-col justify-between">
                    <div>
                        <div className="border-b border-rose-150 pb-1.5 mb-2 text-rose-600 font-bold uppercase tracking-wider text-[9px] flex justify-between">
                            <span>Clock Event</span>
                            <span className="text-[8px] bg-rose-50 border border-rose-100 px-1 rounded">Flagged</span>
                        </div>
                        <p className="font-bold text-slate-800">Pine Ave Site</p>
                        <p className="mt-1 text-[10px] text-slate-700 leading-normal font-semibold">
                            Jose M. • 7:30 AM - 5:15 PM (9.75h)
                        </p>
                    </div>
                    <div className="mt-4 pt-2 text-[9px] font-bold text-rose-600 border-t border-rose-100 uppercase tracking-wide leading-tight">
                        Wrong Site & Unplanned OT
                    </div>
                </div>
            </div>
        ),
    },
];

export default function SchedulingPainPointsSection() {
    return (
        <FeaturePainPoints
            eyebrow="Better coordination"
            eyebrowIcon={AlertTriangle}
            title="The gap between the schedule and the site."
            description="Whiteboards, texts, and printed sheets look great on Monday morning. But when a job gets pushed, the plan is lost in translation. We connect scheduling directly to the time clock."
            painPoints={painPoints}
        />
    );
}
