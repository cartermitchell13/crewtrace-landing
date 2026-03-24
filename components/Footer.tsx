import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-background">
            <div className="w-full bg-[#050315] rounded-t-2xl md:rounded-t-3xl relative overflow-hidden">
                {/* Visual Decorations */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-12 pb-12 pt-20 md:px-24 md:pb-24 md:pt-28 relative z-10 flex flex-col items-center text-center text-white">
                    {/* Brand Section */}
                    <div className="space-y-8 mb-16">
                        <Link
                            href="/"
                            className="inline-block rounded-md transition-transform duration-300 motion-safe:hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050315]"
                        >
                            <Image
                                src="/images/crew-trace-logo.png"
                                alt="Crewtrace Logo"
                                width={180}
                                height={46}
                                className="h-10 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <div className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium">
                            The definitive crew tracking and management solution <br className="hidden md:block" /> for construction professionals.
                        </div>
                    </div>

                    {/* Navigation - Horizontal & Elegant */}
                    <div className="w-full max-w-3xl py-8 border-y border-white/5 flex flex-wrap justify-center gap-x-10 gap-y-3 sm:gap-x-12 sm:gap-y-4">
                        <Link
                            href="/industries"
                            className="inline-flex min-h-11 items-center px-2 text-sm font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050315] rounded-md"
                        >
                            Industries
                        </Link>
                        <Link
                            href="/features/gps-time-tracking"
                            className="inline-flex min-h-11 items-center px-2 text-sm font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050315] rounded-md"
                        >
                            Features
                        </Link>
                        <Link
                            href="/blog"
                            className="inline-flex min-h-11 items-center px-2 text-sm font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050315] rounded-md"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/guides"
                            className="inline-flex min-h-11 items-center px-2 text-sm font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050315] rounded-md"
                        >
                            Guides
                        </Link>
                        <Link
                            href="/case-studies"
                            className="inline-flex min-h-11 items-center px-2 text-sm font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050315] rounded-md"
                        >
                            Case Studies
                        </Link>
                        <Link
                            href="/privacy"
                            className="inline-flex min-h-11 items-center px-2 text-sm font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050315] rounded-md"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="inline-flex min-h-11 items-center px-2 text-sm font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050315] rounded-md"
                        >
                            Terms
                        </Link>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="mt-16 w-full flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-4">
                            <Link
                                href="https://www.linkedin.com/in/cartermitchell98"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all group hover:bg-primary motion-safe:group-hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050315]"
                                aria-label="Carter Mitchell on LinkedIn"
                            >
                                <span className="text-white/40 group-hover:text-white text-xs font-bold">In</span>
                            </Link>
                        </div>

                        <div className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
                            (c) {new Date().getFullYear()} Crewtrace. Built for the modern jobsite.
                        </div>

                        <div className="text-xs font-bold text-white/40 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                            Status: <span className="text-green-500">Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
