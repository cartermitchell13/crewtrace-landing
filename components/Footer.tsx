import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="max-w-full mx-auto bg-[#050315] rounded-t-[4rem] p-12 md:p-20 md:pb-12 shadow-2xl relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        <div className="col-span-2 md:col-span-1 space-y-6">
                            <Link href="/">
                                <Image
                                    src="/images/crew-trace-logo.png"
                                    alt="Crewtrace Logo"
                                    width={140}
                                    height={36}
                                    className="h-8 w-auto object-contain brightness-0 invert"
                                />
                            </Link>
                            <p className="text-sm text-white/50 leading-relaxed">
                                The definitive crew tracking and management solution for construction professionals.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Product</h4>
                            <ul className="space-y-4">
                                <li><Link href="#features" className="text-white/60 hover:text-white transition-colors text-sm">Features</Link></li>
                                <li><Link href="#pricing" className="text-white/60 hover:text-white transition-colors text-sm">Pricing</Link></li>
                                <li><Link href="#benefits" className="text-white/60 hover:text-white transition-colors text-sm">Benefits</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Company</h4>
                            <ul className="space-y-4">
                                <li><Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm">About Us</Link></li>
                                <li><Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-6 text-right md:text-left">
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Legal</h4>
                            <ul className="space-y-4">
                                <li><Link href="/privacy" className="text-white/60 hover:text-white transition-colors text-sm">Privacy</Link></li>
                                <li><Link href="/terms" className="text-white/60 hover:text-white transition-colors text-sm">Terms</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-16 mt-16 border-t border-white/5">
                        <p className="text-xs font-medium text-white/30">
                            © {new Date().getFullYear()} Crewtrace. Built for the modern jobsite.
                        </p>
                        <div className="flex items-center gap-6">
                            {/* Placeholder for social icons if needed */}
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                                <span className="text-white/40 group-hover:text-white text-xs">X</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                                <span className="text-white/40 group-hover:text-white text-xs">In</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
