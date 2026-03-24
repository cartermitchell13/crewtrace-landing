import Image from "next/image";
import React from "react";
// import Button from "@/components/Button"; // This import is no longer needed

// interface Step {
//     id: string;
//     number: string;
//     title: string;
//     description: string;
//     icon: LucideIcon;
//     benefit: string;
// }

const steps = [
    {
        id: "clock-in",
        title: "Clock In",
        description: "Crew logs time via the mobile app with a single tap.",
        imageSrc: "/images/process-clock-in.png",
    },
    {
        id: "gps",
        title: "GPS Verification",
        description: "Location is instantly verified against site geofences.",
        imageSrc: "/images/process-gps.png",
    },
    {
        id: "compliance",
        title: "Compliance Check",
        description: "Breaks, overtime, and buddy punching are audited automatically.",
        imageSrc: "/images/process-compliance.png",
    },
    {
        id: "payroll",
        title: "Export to Payroll",
        description: "Verified timesheets sync to your payroll software in one click.",
        imageSrc: "/images/process-payroll.png",
    }
];

export default function ProcessSection() {
    return (
        <section id="process" className="py-24 md:py-32 px-6 bg-background relative overflow-hidden scroll-mt-32">
            <style>{`
                @keyframes dataFlow {
                    0% { transform: translateX(-100%); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateX(100%); opacity: 0; }
                }
                @keyframes dataFlowVertical {
                    0% { transform: translateY(-100%); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateY(100%); opacity: 0; }
                }
                .animate-data-flow {
                    animation: dataFlow 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
                }
                .animate-data-flow-vertical {
                    animation: dataFlowVertical 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>

            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        Autonomous Workflow
                    </p>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
                        How Our Time Clock App Works. <br className="hidden md:block" />
                        <span className="text-primary italic">Job site to payroll in four steps.</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Horizontal Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[4rem] left-[12.5%] right-[12.5%] h-[2px] bg-foreground/5 z-0 overflow-hidden rounded-full">
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-data-flow" />
                    </div>

                    {/* Vertical Connector Line (Mobile) */}
                    <div className="absolute md:hidden left-[4.5rem] top-10 bottom-10 w-[2px] bg-foreground/5 z-0 overflow-hidden rounded-full">
                        <div className="w-full h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-data-flow-vertical" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative z-10 flex md:flex-col items-center gap-6 md:gap-8">
                                {/* Image Node */}
                                <div className="relative shrink-0 ml-3 md:ml-0">
                                    <div className="relative w-32 h-32 md:w-36 md:h-36 bg-white border border-foreground/10 shadow-sm rounded-2xl flex items-center justify-center">

                                        <div className="absolute inset-0 rounded-2xl overflow-hidden">

                                            <Image
                                                src={step.imageSrc}
                                                alt={step.title}
                                                width={144}
                                                height={144}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Step number badge - safely sitting outside the overflow-hidden zone */}
                                        <div className="absolute -top-2 -right-2 md:-right-3 md:-top-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md z-20">
                                            {index + 1}
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="text-left md:text-center md:px-2 flex-1">
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm font-medium text-foreground/60 leading-relaxed max-w-[280px] md:mx-auto">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
