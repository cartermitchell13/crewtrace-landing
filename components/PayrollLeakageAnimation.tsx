"use client";

import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import payrollLeakageStack from "@/public/animations/payroll-leakage-stack.json";

export default function PayrollLeakageAnimation() {
    const lottieRef = useRef<LottieRefCurrentProps | null>(null);

    useEffect(() => {
        lottieRef.current?.setSpeed(1.2);
        lottieRef.current?.play();
    }, []);

    return (
        <div className="relative overflow-hidden rounded-md border border-primary/10 bg-[#f3f4ff]">
            <Lottie
                lottieRef={lottieRef}
                animationData={payrollLeakageStack}
                loop
                autoplay
                className="h-auto w-full scale-[1.08]"
                aria-hidden="true"
                rendererSettings={{
                    preserveAspectRatio: "xMidYMid meet",
                }}
            />
            <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/55 shadow-sm">
                    Unverified time
                </span>
                <span className="rounded-full bg-rose-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                    Cost rising
                </span>
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-sm border border-white/70 bg-white/90 px-3 py-2 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/45">
                    Small errors stack
                </p>
            </div>
            <span className="sr-only">
                Animation showing unverified time entries stacking into a rising payroll leakage chart.
            </span>
        </div>
    );
}
