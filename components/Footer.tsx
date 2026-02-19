import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-[#050315] rounded-t-[3rem] md:rounded-t-[5rem] relative overflow-hidden mt-20">
            {/* Visual Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto p-12 md:p-24 relative z-10 flex flex-col items-center text-center">
                {/* Brand Section */}
                <div className="space-y-8 mb-16">
                    <Link href="/" className="inline-block transform hover:scale-105 transition-transform duration-300">
                        <Image
                            src="/images/crew-trace-logo.png"
                            alt="Crewtrace Logo"
                            width={180}
                            height={46}
                            className="h-10 w-auto object-contain brightness-0 invert"
                        />
                    </Link>
                    <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium">
                        The definitive crew tracking and management solution <br className="hidden md:block" /> for construction professionals.
                    </p>
                </div>

                {/* Navigation - Horizontal & Elegant */}
                <div className="w-full max-w-3xl py-8 border-y border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-6">
                    <Link href="#features" className="text-white/40 hover:text-white transition-all text-sm font-bold uppercase tracking-widest">Features</Link>
                    <Link href="#process" className="text-white/40 hover:text-white transition-all text-sm font-bold uppercase tracking-widest">How it Works</Link>
                    <Link href="#pricing" className="text-white/40 hover:text-white transition-all text-sm font-bold uppercase tracking-widest">Pricing</Link>
                    <Link href="/privacy" className="text-white/40 hover:text-white transition-all text-sm font-bold uppercase tracking-widest">Privacy</Link>
                    <Link href="/terms" className="text-white/40 hover:text-white transition-all text-sm font-bold uppercase tracking-widest">Terms</Link>
                </div>

                {/* Bottom Metadata */}
                <div className="mt-16 w-full flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all cursor-pointer group hover:-translate-y-1">
                            <span className="text-white/40 group-hover:text-white text-xs font-bold">X</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all cursor-pointer group hover:-translate-y-1">
                            <span className="text-white/40 group-hover:text-white text-xs font-bold">In</span>
                        </div>
                    </div>

                    <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} Crewtrace. Built for the modern jobsite.
                    </p>

                    <div className="text-xs font-bold text-white/40 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                        Status: <span className="text-green-500">Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
