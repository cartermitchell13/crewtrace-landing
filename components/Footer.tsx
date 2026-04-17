import Image from "next/image";
import Link from "next/link";

const footerLinkClass =
    "text-sm text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050315] rounded-md";

const columnHeadingClass =
    "text-xs font-bold uppercase tracking-widest text-white/20 mb-4";

export default function Footer() {
    return (
        <footer className="w-full bg-background">
            <div className="w-full bg-[#050315] rounded-t-2xl md:rounded-t-3xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full translate-y-1/2 translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-8 pb-12 pt-20 md:px-16 md:pb-20 md:pt-28 relative z-10 text-white">
                    {/* Top: Logo + tagline */}
                    <div className="mb-16 text-center">
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
                        <p className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium">
                            GPS-verified time tracking and payroll control<br className="hidden md:block" /> for construction professionals.
                        </p>
                    </div>

                    {/* Link columns */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 py-10 border-y border-white/5">
                        {/* Features */}
                        <div>
                            <h3 className={columnHeadingClass}>Features</h3>
                            <ul className="space-y-2.5">
                                <li><Link href="/features" className={footerLinkClass}>All Features</Link></li>
                                <li><Link href="/features/gps-time-tracking" className={footerLinkClass}>GPS Time Tracking</Link></li>
                                <li><Link href="/features/geofencing-time-clock" className={footerLinkClass}>Geofencing Time Clock</Link></li>
                                <li><Link href="/features/payroll-leakage-prevention" className={footerLinkClass}>Payroll Leakage Prevention</Link></li>
                                <li><Link href="/features/payroll-exports" className={footerLinkClass}>Payroll Exports</Link></li>
                                <li><Link href="/features/overtime-alerts" className={footerLinkClass}>Overtime Alerts</Link></li>
                                <li><Link href="/features/dol-compliance" className={footerLinkClass}>DOL Compliance</Link></li>
                            </ul>
                        </div>

                        {/* Industries */}
                        <div>
                            <h3 className={columnHeadingClass}>Industries</h3>
                            <ul className="space-y-2.5">
                                <li><Link href="/industries" className={footerLinkClass}>All Industries</Link></li>
                                <li><Link href="/industries/construction" className={footerLinkClass}>Construction</Link></li>
                                <li><Link href="/industries/roofing" className={footerLinkClass}>Roofing</Link></li>
                                <li><Link href="/industries/hvac" className={footerLinkClass}>HVAC</Link></li>
                                <li><Link href="/industries/electrical" className={footerLinkClass}>Electrical</Link></li>
                                <li><Link href="/industries/plumbing" className={footerLinkClass}>Plumbing</Link></li>
                                <li><Link href="/industries/landscaping" className={footerLinkClass}>Landscaping</Link></li>
                                <li><Link href="/industries/concrete" className={footerLinkClass}>Concrete</Link></li>
                                <li><Link href="/industries/waterproofing" className={footerLinkClass}>Waterproofing</Link></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className={columnHeadingClass}>Resources</h3>
                            <ul className="space-y-2.5">
                                <li><Link href="/blog" className={footerLinkClass}>Blog</Link></li>
                                <li><Link href="/guides" className={footerLinkClass}>Guides</Link></li>
                                <li><Link href="/guides/construction-time-tracking-implementation" className={footerLinkClass}>Implementation Guide</Link></li>
                                <li><Link href="/guides/dol-audit-ready-time-records" className={footerLinkClass}>DOL Audit Guide</Link></li>
                                <li><Link href="/case-studies" className={footerLinkClass}>Case Studies</Link></li>
                                <li><Link href="/tools/true-cost-calculator" className={footerLinkClass}>True Cost Calculator</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className={columnHeadingClass}>Company</h3>
                            <ul className="space-y-2.5">
                                <li><Link href="/about" className={footerLinkClass}>About</Link></li>
                                <li><Link href="/contact" className={footerLinkClass}>Get a Demo</Link></li>
                                <li><Link href="/privacy" className={footerLinkClass}>Privacy</Link></li>
                                <li><Link href="/terms" className={footerLinkClass}>Terms</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-10 w-full flex flex-col md:flex-row justify-between items-center gap-8">
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
                            &copy; {new Date().getFullYear()} Crewtrace. Built for the modern jobsite.
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
