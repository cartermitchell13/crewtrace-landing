import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const industries = [
    {
        name: "Roofing",
        slug: "roofing",
        description: "Stop guessing when crews arrive at job sites. GPS-verified time tracking for roofing contractors.",
        icon: "🏠",
        stats: "Avg. $1,400/mo saved",
    },
    {
        name: "HVAC",
        slug: "hvac",
        description: "Track technicians across multiple service calls with accurate, verified time logs.",
        icon: "❄️",
        stats: "Avg. $1,200/mo saved",
    },
    {
        name: "Plumbing",
        slug: "plumbing",
        description: "Know exactly when plumbers clock in and out at each job site.",
        icon: "🔧",
        stats: "Avg. $1,100/mo saved",
    },
    {
        name: "General Contractors",
        slug: "general-contractors",
        description: "Manage multiple crews across different sites with one simple dashboard.",
        icon: "🏗️",
        stats: "Avg. $2,500/mo saved",
    },
    {
        name: "Landscaping",
        slug: "landscaping",
        description: "GPS verification for outdoor job sites. Perfect for crews that move between locations.",
        icon: "🌳",
        stats: "Avg. $900/mo saved",
    },
    {
        name: "Concrete",
        slug: "concrete",
        description: "Accurate time tracking for pour schedules. Never overpay on labor again.",
        icon: "🧱",
        stats: "Avg. $1,300/mo saved",
    },
];

export default function IndustriesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="px-6 text-center mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                            Built for the trades that build America
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
                            Crewtrace is designed specifically for construction and trade businesses.
                            See how contractors in your industry are saving thousands every month.
                        </p>
                    </div>
                </section>

                {/* Industries Grid */}
                <section className="px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {industries.map((industry) => (
                                <Link
                                    key={industry.slug}
                                    href={`/industries/${industry.slug}`}
                                    className="group relative bg-white border border-foreground/5 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {industry.icon}
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {industry.name}
                                    </h2>
                                    <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
                                        {industry.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                            {industry.stats}
                                        </span>
                                        <svg
                                            className="w-5 h-5 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 mt-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                            Don't see your industry?
                        </h2>
                        <p className="text-foreground/60 mb-8">
                            Crewtrace works for any trade that needs accurate time tracking.
                            Let's talk about your specific needs.
                        </p>
                        <a
                            href="https://cal.com/crewtrace/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all active:translate-y-[0px] active:translate-x-[0px]"
                        >
                            Contact Us
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
