import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Smartphone } from "lucide-react";

const steps = [
    {
        icon: Smartphone,
        title: "One tap to clock in",
        description:
            "Workers open the app and tap once. No menus, no codes, no calling the office to get started.",
    },
    {
        icon: MapPin,
        title: "GPS verifies the jobsite",
        description:
            "Every clock-in is tied to the project they're on, so location proof happens automatically in the background.",
    },
    {
        icon: Clock,
        title: "Lunch and clock-out stay obvious",
        description:
            "Start Lunch and Clock Out are always on screen during a shift — no digging through settings at the end of the day.",
    },
] as const;

export default function HomeMobileClockInSection() {
    return (
        <section
            id="mobile-clock-in"
            className="relative scroll-mt-32 overflow-hidden bg-background py-20 md:py-28"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(ellipse_at_center_right,rgba(47,39,206,0.06)_0%,transparent_70%)]"
            />

            <div className="layout-shell">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                    <div>
                        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                            <Smartphone size={14} aria-hidden />
                            For your crews
                        </p>

                        <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            Clock in and out in seconds —{" "}
                            <span className="text-primary">right from the jobsite.</span>
                        </h2>

                        <p className="mb-10 max-w-xl text-lg font-medium leading-relaxed text-foreground/60">
                            Your field teams should not need training manuals to punch time.
                            Crewtrace keeps the daily flow simple: open the app, tap once, and
                            get back to work.
                        </p>

                        <ul className="space-y-6">
                            {steps.map((step) => (
                                <li key={step.title} className="flex gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                        <step.icon size={20} aria-hidden />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-foreground">
                                            {step.title}
                                        </h3>
                                        <p className="mt-1 text-sm font-medium leading-relaxed text-foreground/60">
                                            {step.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/features/geofencing-time-clock"
                            className="group mt-10 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/80"
                        >
                            See how GPS clock-ins work
                            <ArrowRight
                                size={16}
                                className="transition-transform motion-safe:group-hover:translate-x-0.5"
                                aria-hidden
                            />
                        </Link>
                    </div>

                    <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
                        <div
                            aria-hidden
                            className="absolute -inset-4 rounded-md bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-2xl"
                        />
                        <div className="relative overflow-hidden rounded-md shadow-[0_8px_40px_rgba(47,39,206,0.12)]">
                            <Image
                                src="/images/mobile-app-mock.png"
                                alt="Crewtrace mobile app showing a simple Clock-In screen with Start Lunch and Clock Out buttons"
                                width={1086}
                                height={1448}
                                className="h-auto w-full"
                                sizes="(min-width: 1024px) 45vw, 100vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
