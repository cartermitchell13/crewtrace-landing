"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
    Home,
    Thermometer,
    Wrench,
    HardHat,
    Trees,
    Construction,
    FileText,
    BarChart3,
    BookOpen,
    Users,
    Mail,
    ArrowRight,
    Calculator,
    ChevronDown,
    ChevronRight,
    X,
    Menu,
} from "lucide-react";

// Industry data for mega menu
const industries = [
    {
        name: "Roofing",
        slug: "roofing",
        description: "Stop guessing when crews arrive",
        Icon: Home,
    },
    {
        name: "HVAC",
        slug: "hvac",
        description: "Track technicians across calls",
        Icon: Thermometer,
    },
    {
        name: "Plumbing",
        slug: "plumbing",
        description: "Know exactly when crews clock in",
        Icon: Wrench,
    },
    {
        name: "General Contractors",
        slug: "general-contractors",
        description: "Manage crews across job sites",
        Icon: HardHat,
    },
    {
        name: "Landscaping",
        slug: "landscaping",
        description: "GPS verification for outdoor sites",
        Icon: Trees,
    },
    {
        name: "Concrete",
        slug: "concrete",
        description: "Accurate time for pour schedules",
        Icon: Construction,
    },
];

const resources = [
    {
        name: "Blog",
        slug: "/blog",
        description: "Industry insights and best practices",
        Icon: FileText,
    },
    {
        name: "Case Studies",
        slug: "/case-studies",
        description: "See how contractors save thousands",
        Icon: BarChart3,
    },
    {
        name: "Guides",
        slug: "/guides",
        description: "Step-by-step implementation guides",
        Icon: BookOpen,
    },
];

const company = [
    {
        name: "About Us",
        slug: "/about",
        description: "Our mission and values",
        Icon: Users,
    },
    {
        name: "Contact",
        slug: "/contact",
        description: "Get in touch with our team",
        Icon: Mail,
    },
];

type MenuType = "industries" | "resources" | "company" | null;

export default function Navbar() {
    const [activeMenu, setActiveMenu] = useState<MenuType>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (menu: MenuType) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setActiveMenu(menu);
        setIsAnimating(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
            setIsAnimating(false);
        }, 150);
    };

    const handleDropdownMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
            <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-input rounded-2xl px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/crew-trace-logo.png"
                        alt="Crewtrace Logo"
                        width={120}
                        height={32}
                        className="h-8 w-auto object-contain"
                    />
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-1">
                    {/* Industries Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("industries")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeMenu === "industries" ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}>
                            Industries
                        </button>
                    </div>

                    {/* Resources Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("resources")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeMenu === "resources" ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}>
                            Resources
                        </button>
                    </div>

                    {/* Company Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("company")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeMenu === "company" ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}>
                            Company
                        </button>
                    </div>

                    {/* Pricing Link */}
                    <Link
                        href="#pricing"
                        className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-lg transition-all duration-200"
                    >
                        Pricing
                    </Link>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <a
                        href="https://cal.com/crewtrace/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:block text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                    >
                        Contact Sales
                    </a>
                    <a href="https://cal.com/crewtrace/15min" target="_blank" rel="noopener noreferrer" className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all active:translate-y-[0px] active:translate-x-[0px]">
                        Get First Access
                    </a>
                </div>
            </div>

            {/* Mega Menu Dropdown - Full Width */}
            <div
                className={`absolute left-0 right-0 top-full mt-2 transition-all duration-300 ${activeMenu ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="bg-white/95 backdrop-blur-xl border border-foreground/10 shadow-2xl rounded-2xl overflow-hidden">
                    {/* Industries Mega Menu */}
                    {activeMenu === "industries" && (
                        <div className="grid grid-cols-[1fr_320px]">
                            {/* Left: Industry Links */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Industries</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                    {industries.map((industry) => (
                                        <Link
                                            key={industry.slug}
                                            href={`/industries/${industry.slug}`}
                                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-foreground/[0.03] transition-all duration-150"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                                                <industry.Icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {industry.name}
                                                </h4>
                                                <p className="text-xs text-foreground/50 mt-0.5 leading-relaxed">
                                                    {industry.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-foreground/5">
                                    <Link
                                        href="/industries"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                    >
                                        View all industries
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* Right: Featured Image Section */}
                            <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-6 flex flex-col justify-between border-l border-foreground/5">
                                <div>
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Featured</span>
                                    <h4 className="text-lg font-bold text-foreground mt-2">See Crewtrace In Action</h4>
                                    <p className="text-sm text-foreground/60 mt-2 leading-relaxed">
                                        Watch how contractors are saving $3,000+ per month by eliminating time theft and buddy punching.
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-foreground/5 mb-4">
                                        <Image
                                            src="/images/ct-hero-min (1).png"
                                            alt="Crewtrace App Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <a
                                        href="https://cal.com/crewtrace/15min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-button hover:translate-y-[-1px] hover:translate-x-[-1px] transition-all"
                                    >
                                        Book a Demo
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Resources Mega Menu */}
                    {activeMenu === "resources" && (
                        <div className="grid grid-cols-[1fr_340px]">
                            {/* Left: Resource Links */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Learn</h3>
                                </div>
                                <div className="space-y-1">
                                    {resources.map((resource) => (
                                        <Link
                                            key={resource.slug}
                                            href={resource.slug}
                                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-foreground/[0.03] transition-all duration-150"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                                                <resource.Icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {resource.name}
                                                </h4>
                                                <p className="text-xs text-foreground/50 mt-0.5 leading-relaxed">
                                                    {resource.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-4 pt-4 border-t border-foreground/5">
                                    <h3 className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-3">Resources</h3>
                                    <Link
                                        href="/blog"
                                        className="group flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <FileText className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-primary">Industry Blog</h4>
                                            <p className="text-xs text-foreground/50 mt-0.5">Insights and best practices</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Right: Featured Case Study */}
                            <div className="bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] p-6 flex flex-col border-l border-foreground/5">
                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Latest Case Study</span>
                                <h4 className="text-lg font-bold text-foreground mt-2">S&W Waterproofing Saves $4,200/Month</h4>
                                    <p className="text-sm text-foreground/60 mt-2 leading-relaxed flex-1">
                                        Learn how this waterproofing contractor eliminated buddy punching and recovered thousands in lost wages within the first month.
                                    </p>
                                <div className="mt-4">
                                    <Link
                                        href="/case-studies"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Read the case study
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Company Mega Menu */}
                    {activeMenu === "company" && (
                        <div className="grid grid-cols-[1fr_280px]">
                            {/* Left: Company Links */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Company</h3>
                                </div>
                                <div className="space-y-1">
                                    {company.map((item) => (
                                        <Link
                                            key={item.slug}
                                            href={item.slug}
                                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-foreground/[0.03] transition-all duration-150"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                                                <item.Icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs text-foreground/50 mt-0.5 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Get Started CTA */}
                            <div className="bg-gradient-to-br from-primary to-primary/90 p-6 flex flex-col justify-center border-l border-foreground/5">
                                <h4 className="text-lg font-bold text-white">Ready to get started?</h4>
                                <p className="text-sm text-white/80 mt-2 leading-relaxed">
                                    Book a free demo and see how Crewtrace can save you thousands every month.
                                </p>
                                <div className="mt-4">
                                    <a
                                        href="https://cal.com/crewtrace/15min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-white text-primary text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors"
                                    >
                                        Book a Demo
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Button - Hidden on desktop */}
            <MobileMenu />
        </nav>
    );
}

// Mobile Menu Component
function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

    return (
        <>
            {/* Mobile Menu Toggle - Only visible on mobile */}
            <button
                className="md:hidden fixed top-8 right-8 z-[60] w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl shadow-input flex items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <div
                className={`md:hidden fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white z-[56] shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-6 pt-20 h-full overflow-y-auto">
                    {/* Industries Accordion */}
                    <div className="border-b border-foreground/10">
                        <button
                            className="w-full flex items-center justify-between py-4"
                            onClick={() => setActiveAccordion(activeAccordion === "industries" ? null : "industries")}
                        >
                            <span className="font-semibold text-foreground">Industries</span>
                            <svg
                                className={`w-5 h-5 transition-transform duration-200 ${activeAccordion === "industries" ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === "industries" ? "max-h-96 pb-4" : "max-h-0"}`}>
                            <div className="space-y-1">
                                {industries.map((industry) => (
                                    <Link
                                        key={industry.slug}
                                        href={`/industries/${industry.slug}`}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <industry.Icon className="w-4 h-4 text-foreground/50" />
                                        <span className="text-sm font-medium text-foreground/70">{industry.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Resources Accordion */}
                    <div className="border-b border-foreground/10">
                        <button
                            className="w-full flex items-center justify-between py-4"
                            onClick={() => setActiveAccordion(activeAccordion === "resources" ? null : "resources")}
                        >
                            <span className="font-semibold text-foreground">Resources</span>
                            <svg
                                className={`w-5 h-5 transition-transform duration-200 ${activeAccordion === "resources" ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === "resources" ? "max-h-96 pb-4" : "max-h-0"}`}>
                            <div className="space-y-1">
                                {resources.map((resource) => (
                                    <Link
                                        key={resource.slug}
                                        href={resource.slug}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <resource.Icon className="w-4 h-4 text-foreground/50" />
                                        <span className="text-sm font-medium text-foreground/70">{resource.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Company Accordion */}
                    <div className="border-b border-foreground/10">
                        <button
                            className="w-full flex items-center justify-between py-4"
                            onClick={() => setActiveAccordion(activeAccordion === "company" ? null : "company")}
                        >
                            <span className="font-semibold text-foreground">Company</span>
                            <svg
                                className={`w-5 h-5 transition-transform duration-200 ${activeAccordion === "company" ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === "company" ? "max-h-96 pb-4" : "max-h-0"}`}>
                            <div className="space-y-1">
                                {company.map((item) => (
                                    <Link
                                        key={item.slug}
                                        href={item.slug}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <item.Icon className="w-4 h-4 text-foreground/50" />
                                        <span className="text-sm font-medium text-foreground/70">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pricing Link */}
                    <Link
                        href="#pricing"
                        className="block py-4 font-semibold text-foreground border-b border-foreground/10"
                        onClick={() => setIsOpen(false)}
                    >
                        Pricing
                    </Link>

                    {/* Mobile CTA */}
                    <div className="mt-6 space-y-3">
                        <a href="https://cal.com/crewtrace/15min" target="_blank" rel="noopener noreferrer" className="block w-full bg-primary text-white font-bold py-3 rounded-xl shadow-button text-center">
                            Get First Access
                        </a>
                        <a
                            href="https://cal.com/crewtrace/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-3 font-medium text-foreground/70"
                        >
                            Contact Sales
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
