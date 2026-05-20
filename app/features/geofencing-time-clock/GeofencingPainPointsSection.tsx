"use client";

import React from "react";
import {
    Ban,
    Lock,
    Ruler,
    XCircle,
    AlertTriangle,
} from "lucide-react";
import FeaturePainPoints from "@/components/FeaturePainPoints";

const painPoints = [
    {
        title: "Off-site punches nobody catches",
        description:
            "A worker clocks in from home, from the gas station, or from the truck on the way. The hours look fine on the sheet — because the sheet has no way to know they were wrong.",
        icon: Ban,
        tone: "rose" as const,
        visual: (
            <div className="w-full max-w-sm rounded-lg border border-slate-200/60 bg-slate-50/70 p-4 font-sans text-xs shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/50 pb-2">
                    <span className="font-semibold text-slate-800">Geofence Boundary Check</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600 border border-rose-100">
                        Blocked
                    </span>
                </div>
                {/* Map Mockup */}
                <div className="relative h-28 w-full bg-slate-200/40 rounded border border-slate-200 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:12px_12px]" />
                    {/* Geofence Circle */}
                    <div className="absolute h-20 w-20 rounded-full border border-emerald-400 bg-emerald-500/10 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-emerald-700 bg-white/90 border border-emerald-200 px-1 rounded">Jobsite</span>
                    </div>
                    {/* Blocked Pin Outside */}
                    <div className="absolute bottom-3 right-6 flex flex-col items-center gap-0.5">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white font-bold shadow-md shadow-rose-500/25">
                            <XCircle size={10} />
                        </div>
                        <span className="text-[8px] font-bold text-rose-600 bg-white border border-rose-200 px-1 rounded shadow-sm">Gas Station</span>
                    </div>
                </div>
                <div className="rounded-md bg-rose-50/60 border border-rose-100 p-2 text-[10px] font-medium text-rose-800 text-left">
                    Punch blocked: 1,150 feet outside Jobsite geofence. Worker notified to clock in inside boundary.
                </div>
            </div>
        ),
    },
    {
        title: "Policy without enforcement",
        description:
            "\"Clock in at the site\" is in the handbook. But handbooks don't block a punch. Without a boundary rule, the policy only exists on the day someone decides to argue.",
        icon: Lock,
        tone: "amber" as const,
        visual: (
            <div className="w-full max-w-sm grid grid-cols-2 gap-4 font-sans text-[11px] text-left">
                {/* Handbook policy */}
                <div className="rounded-lg border border-slate-300 bg-slate-50/50 p-3 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="border-b border-slate-200 pb-1.5 mb-2 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                            Handbook PDF
                        </div>
                        <p className="font-semibold text-slate-700 italic leading-normal">
                            &quot;Employees must be present on site at scheduled times before clocking in.&quot;
                        </p>
                    </div>
                    <div className="mt-4 pt-2 text-[9px] font-semibold text-slate-500 border-t border-slate-100">
                        Result: Relies on manual audit.
                    </div>
                </div>

                {/* Geofence Guard */}
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/20 p-3 shadow-md flex flex-col justify-between">
                    <div>
                        <div className="border-b border-emerald-100 pb-1.5 mb-2 text-emerald-600 font-bold uppercase tracking-wider text-[9px]">
                            Rule Engine
                        </div>
                        <p className="font-bold text-slate-800 leading-normal">
                            Enforce Location: ON
                        </p>
                        <p className="mt-1 text-[10px] text-slate-600 leading-normal">
                            If GPS coordinates are outside geofence boundary, block punch-in automatically.
                        </p>
                    </div>
                    <div className="mt-4 pt-2 text-[9px] font-bold text-emerald-600 border-t border-emerald-100">
                        Result: 100% active enforcement.
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "One rule for every job",
        description:
            "Your 40-acre commercial site and your 1/10-acre residential service call need very different boundaries. A single GPS radius either lets cheats through or blocks honest workers in the parking lot.",
        icon: Ruler,
        tone: "slate" as const,
        visual: (
            <div className="w-full max-w-sm flex flex-col gap-3 font-sans text-xs">
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-slate-200 bg-slate-50/35 p-3 text-left">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Service Call (Small)</span>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Ruler size={10} />
                            </span>
                            <span className="font-bold text-slate-700">30-foot Radius</span>
                        </div>
                        <p className="mt-1 text-[10px] text-slate-500 leading-snug">Strict perimeter for single-family residential work.</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50/35 p-3 text-left">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Commercial Site (Large)</span>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <Ruler size={10} />
                            </span>
                            <span className="font-bold text-slate-700">500-foot Radius</span>
                        </div>
                        <p className="mt-1 text-[10px] text-slate-500 leading-snug">Wider perimeter covering laydown yards and parking.</p>
                    </div>
                </div>
                <div className="mt-1 rounded border border-slate-200 bg-white p-2 text-center text-[10px] font-bold text-slate-600">
                    Auto-configured boundaries based on project address.
                </div>
            </div>
        ),
    },
];

export default function GeofencingPainPointsSection() {
    return (
        <FeaturePainPoints
            eyebrow="Why GPS alone isn't enough"
            eyebrowIcon={AlertTriangle}
            title="The rule you never had."
            description="GPS tells you where a punch happened. Geofencing tells the punch whether it's allowed in the first place. Most contractor payroll leaks come from the gap between those two."
            painPoints={painPoints}
        />
    );
}
