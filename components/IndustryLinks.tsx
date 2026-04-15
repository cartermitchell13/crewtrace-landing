import Link from "next/link";
import {
    Thermometer,
    Zap,
    Home,
    Wrench,
    HardHat,
    Trees,
    Construction,
    Droplets,
    ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TradeLink {
    name: string;
    slug: string;
    icon: LucideIcon;
    keyword: string;
}

const trades: TradeLink[] = [
    { name: "HVAC", slug: "hvac", icon: Thermometer, keyword: "HVAC time tracking" },
    { name: "Electrical", slug: "electrical", icon: Zap, keyword: "Electrician time tracking" },
    { name: "Roofing", slug: "roofing", icon: Home, keyword: "Roofing crew tracking" },
    { name: "Plumbing", slug: "plumbing", icon: Wrench, keyword: "Plumbing crew tracking" },
    { name: "General Contractors", slug: "general-contractors", icon: HardHat, keyword: "Contractor time tracking" },
    { name: "Landscaping", slug: "landscaping", icon: Trees, keyword: "Landscaping crew tracking" },
    { name: "Concrete", slug: "concrete", icon: Construction, keyword: "Concrete crew tracking" },
    { name: "Waterproofing", slug: "waterproofing", icon: Droplets, keyword: "Waterproofing crew tracking" },
];

export default function IndustryLinks() {
    return (
        <section className="bg-background px-6 py-24 md:py-32">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto mb-14 max-w-3xl space-y-5 text-center">
                    <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        Built for your trade
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        GPS time tracking configured for{" "}
                        <span className="text-primary">every field trade.</span>
                    </h2>
                    <p className="text-lg font-medium leading-relaxed text-foreground/60">
                        Each industry page covers trade-specific workflows, pain points, and rollout steps
                        so you can evaluate Crewtrace for your exact operation.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {trades.map((trade) => {
                        const Icon = trade.icon;
                        return (
                            <Link
                                key={trade.slug}
                                href={`/industries/${trade.slug}`}
                                className="group relative flex flex-col items-center gap-3 rounded-2xl border border-foreground/5 bg-white p-6 text-center transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                                    {trade.name}
                                </h3>
                                <p className="text-xs font-medium text-foreground/50">
                                    {trade.keyword}
                                </p>
                                <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                    Learn more <ArrowRight size={12} />
                                </span>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-10 text-center">
                    <Link
                        href="/industries"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                        View all industries
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
