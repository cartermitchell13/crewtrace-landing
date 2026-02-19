import type { Metadata } from "next";
import LandingNavbar from "@/components/LandingNavbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const LINKEDIN_URL = "https://www.linkedin.com/in/cartermitchell98/";
const VIDEO_SRC = "/videos/demo.mp4";
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
    title: "See CrewTrace in Action | Demo",
    description:
        "Watch a quick walkthrough of how CrewTrace stops payroll leakage for construction crews — no sales call required.",
    robots: { index: false, follow: false }, // keep this page off Google
};

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
            <LandingNavbar />

            <main className="flex-grow pt-40 pb-24 px-6 relative">
                {/* Enhanced Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.1)_0%,transparent_70%)] opacity-70" />
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] -z-10 bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] -z-10 bg-primary/5 blur-[120px] rounded-full" />

                <div className="max-w-screen-2xl mx-auto flex flex-col items-center">
                    {/* Hero Section */}
                    <div className="text-center space-y-8 mb-16 max-w-4xl mx-auto">
                        {/* Eye-catching Eyebrow */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary animate-slide-up">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Private walkthrough — just for you
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] animate-slide-up delay-100">
                                See exactly how CrewTrace <br className="hidden md:block" />
                                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">stops payroll leakage</span>
                            </h1>
                            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed font-medium animate-slide-up delay-200">
                                I know you&apos;re busy and the last thing you need is another sales call. So I&apos;m skipping the pitch—just hit play to see exactly how we plug payroll leaks. If it looks like it could help your operation, feel free to reach out whenever you&apos;re ready.
                            </p>
                        </div>
                    </div>

                    {/* Video Section - Maximum Impact */}
                    <div className="w-full max-w-7xl mx-auto transition-all duration-700 animate-zoom-in delay-300">
                        <div className="relative group">
                            {/* Ambient Glow */}
                            <div className="absolute -inset-10 bg-primary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                            <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-foreground/[0.08] shadow-[0_48px_100px_-24px_rgba(0,0,0,0.15),0_0_0_1px_rgba(255,255,255,0.8)] group-hover:shadow-[0_64px_120px_-32px_rgba(47,39,206,0.2),0_0_0_1px_rgba(255,255,255,0.9)] transition-all duration-700">
                                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                    <video
                                        id="demo-video"
                                        className="absolute inset-0 w-full h-full block"
                                        src={VIDEO_SRC}
                                        poster="/images/demo-poster.png"
                                        controls
                                        playsInline
                                        preload="metadata"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA Section */}
                    <div className="mt-16 text-center space-y-8 max-w-2xl mx-auto animate-slide-up delay-500">
                        <div className="space-y-4">
                            <p className="text-xl font-semibold text-foreground">
                                Ready to plug the leaks?
                            </p>
                            <p className="text-foreground/60 leading-relaxed font-medium">
                                If this looks like it could save your operation some serious cash, just shoot me a message on LinkedIn. I&apos;ll handle the rest.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <Button href={LINKEDIN_URL} size="lg" className="px-12">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="w-5 h-5 mr-1"
                                >
                                    <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.984V9h3.102v1.561h.046c.434-.82 1.494-1.685 3.074-1.685 3.288 0 3.893 2.165 3.893 4.981v6.595zM5.337 7.433a1.8 1.8 0 1 1 0-3.601 1.8 1.8 0 0 1 0 3.601zM6.922 20.452H3.749V9h3.173v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                Message me on LinkedIn
                            </Button>
                            <p className="text-sm text-foreground/40 font-medium italic">
                                I typically reply within a few hours.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes zoom-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }
                .animate-slide-up {
                    opacity: 0;
                    animation: slide-up 1s ease-out forwards;
                }
                .animate-zoom-in {
                    opacity: 0;
                    animation: zoom-in 1s ease-out forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-500 { animation-delay: 0.5s; }
            `}</style>
        </div>
    );
}
