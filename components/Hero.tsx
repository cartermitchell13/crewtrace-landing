import Image from "next/image";
import Button from "@/components/Button";

export default function Hero() {
    return (
        <section id="hero" className="relative pt-32 md:pt-36 pb-20 px-6 overflow-hidden scroll-mt-32">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.05)_0%,transparent_50%)]" />

            <div className="max-w-7xl mx-auto text-center space-y-10">
                {/* Social Proof Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Contractors are saving $1,200+/month in recovered wages
                </div>

                <div className="space-y-6 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                        Add more money to your bottom line without selling a single extra job.
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed font-medium">
                        Payroll leakage and inaccurate time entries are silently killing your margins. We install a GPS-verified time tracking system that plugs the leaks in one pay cycle, guaranteed to pay for itself or it is free.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="max-w-lg mx-auto space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="https://cal.com/crewtrace/15min" size="lg">
                            Book a Free Profit Audit
                        </Button>
                        <Button href="https://cal.com/crewtrace/15min" variant="white" size="lg">
                            See How It Works
                        </Button>
                    </div>
                    <p className="text-sm text-foreground/40">
                        Free 15-minute call. We'll show you exactly how much payroll leakage is costing you.
                    </p>
                </div>

                {/* Hero Image */}
                <div className="pt-10 relative max-w-6xl mx-auto">
                    <div className="relative">
                        <Image
                            src="/images/ct-hero-min (1).png"
                            alt="Crewtrace Dashboard Mockup"
                            width={1920}
                            height={1080}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
