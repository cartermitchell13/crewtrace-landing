"use client";

import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#process" },
    { label: "Results", href: "/#results" },
    { label: "FAQ", href: "/#faq" },
];

export default function LandingNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
            <div className="bg-white/85 backdrop-blur-md border border-white/30 shadow-input rounded-2xl px-5 md:px-6 py-3 flex items-center justify-between">
                <a href="/" className="flex items-center">
                    <Image
                        src="/images/crew-trace-logo.png"
                        alt="Crewtrace Logo"
                        width={120}
                        height={32}
                        className="h-8 w-auto object-contain"
                    />
                </a>

                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="px-4 py-2 text-sm font-medium rounded-lg text-foreground/70 hover:text-foreground hover:bg-foreground/[0.03] transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <a
                        href="https://cal.com/crewtrace/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all active:translate-y-[0px] active:translate-x-[0px] inline-flex items-center gap-2"
                    >
                        Book Free Audit
                        <ArrowRight size={16} />
                    </a>
                </div>

                <button
                    type="button"
                    aria-label="Toggle navigation menu"
                    onClick={() => setMobileOpen((open) => !open)}
                    className="md:hidden w-10 h-10 rounded-xl border border-foreground/10 bg-white text-foreground flex items-center justify-center"
                >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            <div className={`md:hidden absolute left-0 right-0 top-full mt-2 transition-all duration-200 ${mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                <div className="bg-white/95 backdrop-blur-md border border-foreground/10 shadow-xl rounded-2xl p-3">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/[0.03] transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="https://cal.com/crewtrace/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="mt-2 w-full bg-primary text-white text-sm font-bold px-4 py-3 rounded-xl shadow-button inline-flex items-center justify-center gap-2"
                    >
                        Book Free Audit
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </nav>
    );
}
