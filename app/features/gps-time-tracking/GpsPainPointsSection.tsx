"use client";

import React from "react";
import {
    Navigation,
    MapPin,
    AlertTriangle,
    CheckCircle2,
    Clock,
    Satellite,
} from "lucide-react";
import FeaturePainPoints from "@/components/FeaturePainPoints";

const painPoints = [
    {
        title: "The parking-lot clock-in",
        description:
            "Workers punch in from the cab on the drive over. The timesheet says 7:00 but the crew didn't touch the job site until 7:45.",
        icon: Navigation,
        tone: "rose" as const,
        visual: (
            <div className="w-full max-w-sm rounded-lg border border-slate-200/60 bg-slate-50/70 p-4 font-sans text-xs shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/50 pb-2">
                    <span className="font-semibold text-slate-800">Punch Exception Log</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600 border border-rose-100">
                        Flagged
                    </span>
                </div>
                <div className="space-y-3 relative text-left">
                    <div className="absolute left-[13px] top-6 bottom-4 w-0.5 border-l border-dashed border-slate-300" />
                    <div className="flex items-start gap-3 relative z-10">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 border border-rose-200 text-rose-600">
                            <Navigation size={12} className="rotate-45" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-700">7:00 AM — Requested Clock-In</p>
                            <p className="text-slate-500 font-medium">Location: Mobile Cab (3.2 mi from job site)</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 relative z-10">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600">
                            <MapPin size={12} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-700">7:45 AM — Actual Site Arrival</p>
                            <p className="text-slate-500 font-medium">Location: Oak Ridge Project (Inside Geofence)</p>
                        </div>
                    </div>
                </div>
                <div className="mt-2 rounded-md bg-rose-50/60 border border-rose-100 p-2.5 text-[11px] font-semibold text-rose-800 flex items-start gap-2 text-left">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0 text-rose-600" />
                    <span>45 minutes of windshield time flagged. Punch adjusted to actual arrival.</span>
                </div>
            </div>
        ),
    },
    {
        title: "\"I was there, I swear\"",
        description:
            "A supervisor flags a short day. The worker insists the hours are right. With no location record, the argument wins over the truth.",
        icon: AlertTriangle,
        tone: "amber" as const,
        visual: (
            <div className="w-full max-w-sm flex flex-col gap-3 font-sans text-xs">
                {/* Supervisor message */}
                <div className="flex items-end gap-2 self-start max-w-[85%] text-left">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-bold text-[10px]">
                        SS
                    </div>
                    <div className="rounded-2xl rounded-bl-sm bg-slate-100 border border-slate-200/50 p-3 text-slate-800 leading-normal font-medium shadow-sm">
                        Hey Jose, your timesheet says 8 hours today, but GPS breadcrumbs show you left the site at 2:32 PM. What happened?
                    </div>
                </div>
                {/* Worker reply */}
                <div className="flex items-end gap-2 self-end max-w-[85%] text-left">
                    <div className="rounded-2xl rounded-br-sm bg-primary text-white p-3 leading-normal font-medium shadow-sm">
                        I was there, I swear! My phone was just charging in the truck and I was working on the far side of the building.
                    </div>
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-[10px]">
                        JM
                    </div>
                </div>
                {/* System verification block */}
                <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50/70 p-3 font-sans text-[11px] font-medium text-amber-900 flex items-start gap-2 text-left">
                    <Satellite size={14} className="mt-0.5 shrink-0 text-amber-600 animate-pulse" />
                    <div>
                        <p className="font-bold text-amber-950">GPS Verification System</p>
                        <p className="mt-0.5 text-amber-800 leading-normal">
                            Worker device left Oak Ridge perimeter at 2:32 PM. Traveled north on Route 4 at 45 mph. Device remained at 85% battery.
                        </p>
                    </div>
                </div>
                <div className="self-center mt-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200">
                        <CheckCircle2 size={10} /> Discrepancy Flag Resolved to 6.5h
                    </span>
                </div>
            </div>
        ),
    },
    {
        title: "Payroll built on memory",
        description:
            "Paper logs get transcribed, errors get guessed at, and by Thursday nobody remembers which site crew #3 actually worked Tuesday.",
        icon: Clock,
        tone: "slate" as const,
        visual: (
            <div className="w-full max-w-sm grid grid-cols-2 gap-4 font-sans text-[11px] text-left">
                {/* Left: Crumpled paper log */}
                <div className="relative rounded-lg border border-slate-300 bg-amber-50/20 p-3 rotate-[-1deg] shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="border-b border-slate-200 pb-1.5 mb-2 flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                            <span>Paper Log</span>
                            <span>Stale</span>
                        </div>
                        <p className="font-mono text-slate-500 line-through font-bold">Crew 3 — Tuesday</p>
                        <ul className="mt-2 space-y-1.5 font-mono text-slate-500 leading-normal">
                            <li>• Jose: 8h?</li>
                            <li>• Bob: 8.5h?</li>
                            <li>• Mike: forgot</li>
                        </ul>
                    </div>
                    <div className="mt-4 border-t border-slate-200 pt-2 text-[9px] font-bold text-rose-600 text-center uppercase tracking-wider">
                        Thursday Guesswork
                    </div>
                </div>

                {/* Right: Crewtrace Live Log */}
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/20 p-3 shadow-md flex flex-col justify-between">
                    <div>
                        <div className="border-b border-emerald-100 pb-1.5 mb-2 flex items-center justify-between text-emerald-600 font-bold uppercase tracking-wider text-[9px]">
                            <span>Crewtrace Live</span>
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <p className="font-bold text-slate-800">Crew 3 • Oak Ridge</p>
                        <ul className="mt-2 space-y-1.5 font-semibold text-slate-700 leading-normal">
                            <li className="flex items-center gap-1 text-emerald-700"><CheckCircle2 size={10} /> Jose: 8:01A</li>
                            <li className="flex items-center gap-1 text-emerald-700"><CheckCircle2 size={10} /> Bob: 7:58A</li>
                            <li className="flex items-center gap-1 text-emerald-700"><CheckCircle2 size={10} /> Mike: 8:00A</li>
                        </ul>
                    </div>
                    <div className="mt-4 border-t border-emerald-100 pt-2 text-[9px] font-bold text-emerald-600 text-center uppercase tracking-wider">
                        GPS Verified
                    </div>
                </div>
            </div>
        ),
    },
];

export default function GpsPainPointsSection() {
    return (
        <FeaturePainPoints
            eyebrow="Why GPS alone isn't enough"
            eyebrowIcon={AlertTriangle}
            title="The 15-minute leak you never see."
            description="GPS coordinate collection is easy. Turning coordinates into a clean payroll record is where the wheels fall off. Most GPS time clocks only capture stamps; we capture truth."
            painPoints={painPoints}
        />
    );
}
