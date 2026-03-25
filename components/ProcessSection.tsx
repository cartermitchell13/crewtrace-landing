import Image from "next/image";
import React from "react";

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

type ProcessSectionProps = {
    /** Use on the home page when this block sits on the shared testimonial texture background. */
    variant?: "default" | "texture";
};

export default function ProcessSection({ variant = "default" }: ProcessSectionProps) {
    const isTexture = variant === "texture";
    /* On the home texture band: read as a "workflow / diagram" zone — tinted, soft edge — not a second white proof card like TestimonialsSection. */
    const contentShell =
        isTexture
            ? "max-w-7xl mx-auto rounded-2xl border border-primary/20 bg-gradient-to-b from-secondary/55 via-secondary/20 to-background/90 p-8 shadow-sm ring-1 ring-inset ring-white/40 sm:px-10 sm:py-16 md:rounded-3xl md:px-14 md:py-20"
            : "max-w-7xl mx-auto";
    const lineTrack = isTexture ? "bg-primary/15" : "bg-foreground/5";
    const stepBodyClass = isTexture ? "text-foreground/70" : "text-foreground/60";
    const stepTileClass = isTexture
        ? "border-primary/10 bg-white shadow-sm ring-1 ring-primary/10"
        : "border-foreground/10 bg-white shadow-sm";

    return (
        <section
            id="process"
            className={`relative z-10 overflow-hidden scroll-mt-32 py-24 md:py-32 ${isTexture ? "bg-transparent px-0" : "bg-background px-6"}`}
        >
            <style>{`
                @keyframes dataFlow {
                    0% { transform: translateX(-100%); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateX(100%); opacity: 0; }
                }
                .animate-data-flow {
                    animation: dataFlow 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
                }
                @media (prefers-reduced-motion: reduce) {
                    .animate-data-flow {
                        animation: none !important;
                    }
                }
            `}</style>

            <div className={contentShell}>
                <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        Autonomous Workflow
                    </p>
                    <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                        Job site to payroll{" "}
                        <span className="font-extrabold italic text-primary">in four easy steps.</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Horizontal Connector Line (Desktop) */}
                    <div
                        className={`absolute left-[12.5%] right-[12.5%] top-[4rem] z-0 hidden h-[2px] overflow-hidden rounded-full md:block ${lineTrack}`}
                    >
                        <div className="h-full w-full animate-data-flow bg-gradient-to-r from-transparent via-primary to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className="relative z-10 flex flex-col items-center gap-5 text-center md:gap-8"
                            >
                                {/* Image Node */}
                                <div className="relative shrink-0">
                                    <div
                                        className={`relative flex h-32 w-32 items-center justify-center rounded-2xl border md:h-36 md:w-36 ${stepTileClass}`}
                                    >

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
                                <div className="w-full flex-1 px-1 md:px-2 md:text-center">
                                    <h3 className="mb-2 text-xl font-bold text-foreground">{step.title}</h3>
                                    <p
                                        className={`mx-auto max-w-[280px] text-sm font-medium leading-relaxed ${stepBodyClass}`}
                                    >
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
