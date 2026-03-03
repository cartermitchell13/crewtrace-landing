import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "About Crewtrace",
    description:
        "Learn Crewtrace’s mission to help construction contractors stop payroll leakage with practical, field-first time tracking workflows.",
    path: "/about",
});

const values = [
    {
        title: "Field-first product decisions",
        description:
            "We build for crews and foremen working live job sites, not idealized office workflows.",
    },
    {
        title: "Proof over guesswork",
        description:
            "GPS verification and clean records help owners run payroll from facts instead of assumptions.",
    },
    {
        title: "Operational simplicity",
        description:
            "Every workflow is designed to reduce admin drag so teams can focus on production.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6">
                <section className="max-w-5xl mx-auto text-center">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        About Crewtrace
                    </span>
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Built to protect contractor margins in the real world
                    </h1>
                    <p className="mt-5 text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed">
                        Crewtrace exists to help construction businesses eliminate payroll leakage with location-verified time tracking, clear records, and implementation support that actually works in the field.
                    </p>
                </section>

                <section className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((value) => (
                        <article
                            key={value.title}
                            className="rounded-2xl border border-foreground/10 bg-white p-6 shadow-sm"
                        >
                            <h2 className="text-lg font-bold tracking-tight text-foreground">
                                {value.title}
                            </h2>
                            <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                                {value.description}
                            </p>
                        </article>
                    ))}
                </section>

                <section className="max-w-5xl mx-auto mt-12 rounded-3xl border border-foreground/10 bg-[#FBFBFE] p-8 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                        Our operating approach
                    </h2>
                    <p className="mt-4 text-foreground/60 leading-relaxed">
                        We partner closely with owners and operations leaders to configure geofencing rules, payroll workflows, and review cadences that fit each business model. The goal is straightforward: cleaner labor data, faster payroll, and less margin erosion.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <a
                            href="https://cal.com/crewtrace/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-button"
                        >
                            Book a free audit
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
