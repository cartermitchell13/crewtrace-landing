"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import BookedCallLink from "@/components/BookedCallLink";
import { getSolutionSummaries } from "@/lib/solutions";
import { getIndustrySummaries } from "@/lib/industries";
import { industryIconByKey } from "@/lib/industry-icons";
import {
    MapPin,
    Clock,
    FileText,
    Receipt,
    BarChart3,
    BookOpen,
    Users,
    Mail,
    ArrowRight,
    Menu,
    X,
    ChevronDown,
    CalendarDays,
    ShieldCheck,
    Wrench,
} from "lucide-react";

// Industry data for mega menu — derived from lib/industries.ts
const industries = getIndustrySummaries().map((industry) => ({
    name: industry.name,
    slug: industry.slug,
    description: industry.description,
    Icon: industryIconByKey[industry.icon],
}));

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

const tools = [
    {
        name: "True Cost Calculator",
        slug: "/tools/true-cost-calculator",
        description: "Calculate the real hourly cost of your crews",
        Icon: Wrench,
    },
    {
        name: "Payroll Audit Checklist",
        slug: "/tools/payroll-audit-checklist",
        description: "Test your FLSA compliance readiness",
        Icon: ShieldCheck,
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

const solutionIconsBySlug = {
    "gps-time-tracking": MapPin,
    "geofencing-time-clock": Clock,
    "scheduling": CalendarDays,
    "payroll-sync-quickbooks": Receipt,
    "job-costing": BarChart3,
} as const;

const solutionItems = getSolutionSummaries()
    .filter((solution) => solution.slug !== "job-costing")
    .map((solution) => ({
        name: solution.name,
        slug: `/features/${solution.slug}`,
        description: solution.tagline,
        Icon:
            solutionIconsBySlug[solution.slug as keyof typeof solutionIconsBySlug] ??
            FileText,
    }));

type MenuType = "features" | "industries" | "resources" | "company" | null;

export default function Navbar() {
    const [activeMenu, setActiveMenu] = useState<MenuType>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (menu: MenuType) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setActiveMenu(menu);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
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
        <nav ref={navRef} className="fixed top-6 left-0 right-0 mx-auto w-[95%] max-w-7xl z-50">
            <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-input rounded-md px-5 md:px-6 py-3 flex items-center justify-between">
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
                <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                    {/* Features Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("features")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeMenu === "features" ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}>
                            Features
                        </button>
                    </div>

                    {/* Industries Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("industries")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeMenu === "industries" ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}>
                            Industries
                        </button>
                    </div>

                    {/* Resources Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("resources")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeMenu === "resources" ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}>
                            Resources
                        </button>
                    </div>

                    {/* Company Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("company")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeMenu === "company" ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}>
                            Company
                        </button>
                    </div>

                    {/* Calculator Link */}
                    <Link
                        href="/calculator"
                        className="px-2.5 xl:px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-md transition-all duration-200 whitespace-nowrap"
                    >
                        ROI Calculator
                    </Link>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 lg:gap-3">
                    <BookedCallLink
                        templateType="nav"
                        cluster="global"
                        landingPath="/"
                        ctaLabel="Book a call"
                        ctaLocation="desktop_nav_secondary"
                        className="hidden lg:block rounded-md text-sm font-medium text-foreground/70 transition-colors hover:text-primary whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        Book a call
                    </BookedCallLink>
                    <BookedCallLink
                        templateType="nav"
                        cluster="global"
                        landingPath="/"
                        ctaLabel="Book a 15-minute call"
                        ctaLocation="desktop_nav_primary"
                        className="hidden lg:inline-flex items-center gap-2 rounded-md bg-primary px-4 xl:px-6 py-2.5 text-sm font-bold text-white whitespace-nowrap shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(47,39,206,0.15)] transition-all motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        Book a 15-minute call
                        <ArrowRight size={16} className="hidden xl:block" />
                    </BookedCallLink>

                    <button
                        type="button"
                        aria-label="Toggle navigation menu"
                        onClick={() => setMobileOpen((open) => !open)}
                        className="flex h-11 w-11 items-center justify-center rounded-md border border-foreground/10 bg-white/90 text-foreground shadow-sm transition-colors hover:bg-foreground/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mega Menu Dropdown - Full Width */}
            <div
                className={`absolute left-0 right-0 top-full mt-2 transition-all duration-300 ${activeMenu ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="bg-white/95 backdrop-blur-xl border border-foreground/10 shadow-2xl rounded-md overflow-hidden">
                    {/* Features Mega Menu */}
                    {activeMenu === "features" && (
                        <div className="grid grid-cols-[1fr_320px]">
                            {/* Left: Feature Links */}
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="text-xs font-semibold text-foreground/40 uppercase tracking-wider">Features</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                    {solutionItems.map((solution) => (
                                        <Link
                                            key={solution.slug}
                                            href={solution.slug}
                                            className="group flex items-start gap-3 p-3 rounded-md hover:bg-foreground/[0.03] transition-all duration-150"
                                        >
                                            <div className="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                                                <solution.Icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {solution.name}
                                                </h4>
                                                <p className="text-xs text-foreground/50 mt-0.5 leading-relaxed">
                                                    {solution.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Featured CTA */}
                            <div className="bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] p-6 flex flex-col justify-between border-l border-foreground/5">
                                <div>
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Need Help Choosing?</span>
                                    <h4 className="text-lg font-bold text-foreground mt-2">Find your fastest ROI path</h4>
                                    <p className="text-sm text-foreground/60 mt-2 leading-relaxed">
                                        Compare workflows by trade and see where Crewtrace can reduce payroll leakage first.
                                    </p>
                                </div>
                                <div className="mt-4 space-y-3">
                                    <Link
                                        href="/industries"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Explore by industry
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="/calculator"
                                        className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                    >
                                        Estimate your savings
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

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
                                            className="group flex items-start gap-3 p-3 rounded-md hover:bg-foreground/[0.03] transition-all duration-150"
                                        >
                                            <div className="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
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
                                    <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-foreground/5 mb-4">
                                        <Image
                                            src="/images/ct-hero-min (1).png"
                                            alt="Crewtrace App Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                        <BookedCallLink
                                            templateType="nav"
                                            cluster="industries_menu"
                                            landingPath="/"
                                            ctaLabel="Book a call"
                                            ctaLocation="industries_menu_featured"
                                            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                        >
                                        Book a call
                                        <ArrowRight className="w-4 h-4" />
                                    </BookedCallLink>
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
                                            className="group flex items-start gap-3 p-3 rounded-md hover:bg-foreground/[0.03] transition-all duration-150"
                                        >
                                            <div className="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
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
                                    <h3 className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-3">Tools</h3>
                                    <div className="space-y-1">
                                        {tools.map((tool) => (
                                            <Link
                                                key={tool.slug}
                                                href={tool.slug}
                                                className="group flex items-start gap-3 p-3 rounded-md bg-primary/5 hover:bg-primary/10 transition-all duration-150"
                                            >
                                                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
                                                    <tool.Icon className="w-5 h-5 text-primary transition-colors" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-sm font-semibold text-primary transition-colors">
                                                        {tool.name}
                                                    </h4>
                                                    <p className="text-xs text-foreground/50 mt-0.5 leading-relaxed">
                                                        {tool.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Featured Case Study */}
                            <div className="bg-gradient-to-br from-foreground/[0.02] to-foreground/[0.05] p-6 flex flex-col border-l border-foreground/5">
                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Latest Case Study</span>
                                <h4 className="text-lg font-bold text-foreground mt-2 leading-normal">S&W Waterproofing Saves $2,100/Month</h4>
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
                                            className="group flex items-start gap-3 p-3 rounded-md hover:bg-foreground/[0.03] transition-all duration-150"
                                        >
                                            <div className="w-10 h-10 rounded-md bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
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
                                <div className="text-sm text-white mt-2 leading-relaxed">
                                    Book a 15-minute call and see where Crewtrace can help you recover payroll leakage first.
                                </div>
                                <div className="mt-4">
                                    <BookedCallLink
                                        templateType="nav"
                                        cluster="company_menu"
                                        landingPath="/"
                                        ctaLabel="Book a call"
                                        ctaLocation="company_menu_cta"
                                        className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-bold text-primary transition-all hover:bg-white/90 motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                                    >
                                        Book a call
                                        <ArrowRight className="w-4 h-4" />
                                    </BookedCallLink>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Dropdown Wrapper */}
            <div className={`lg:hidden absolute left-0 right-0 top-full mt-2 transition-all duration-300 origin-top ${mobileOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}>
                <div className="bg-white/95 backdrop-blur-xl border border-foreground/10 shadow-2xl rounded-md overflow-hidden max-h-[80vh] overflow-y-auto w-full p-2">

                    {/* Features Accordion */}
                    <div className="border-b border-foreground/5 last:border-0 rounded-md bg-white/50 mb-1">
                        <button
                            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-foreground/[0.02] rounded-md transition-colors"
                            onClick={() => setActiveAccordion(activeAccordion === "features" ? null : "features")}
                        >
                            <span className="text-sm font-semibold text-foreground">Features</span>
                            <ChevronDown className={`w-4 h-4 text-foreground/50 transition-transform duration-200 ${activeAccordion === "features" ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === "features" ? "max-h-96 opacity-100 pb-2" : "max-h-0 opacity-0"}`}>
                            <div className="px-2 space-y-0.5">
                                {solutionItems.map((solution) => (
                                    <Link
                                        key={solution.slug}
                                        href={solution.slug}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-primary/5 transition-colors group"
                                    >
                                        <solution.Icon className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
                                        <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">{solution.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Industries Accordion */}
                    <div className="border-b border-foreground/5 last:border-0 rounded-md bg-white/50 mb-1">
                        <button
                            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-foreground/[0.02] rounded-md transition-colors"
                            onClick={() => setActiveAccordion(activeAccordion === "industries" ? null : "industries")}
                        >
                            <span className="text-sm font-semibold text-foreground">Industries</span>
                            <ChevronDown className={`w-4 h-4 text-foreground/50 transition-transform duration-200 ${activeAccordion === "industries" ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === "industries" ? "max-h-96 opacity-100 pb-2" : "max-h-0 opacity-0"}`}>
                            <div className="px-2 space-y-0.5">
                                {industries.map((industry) => (
                                    <Link
                                        key={industry.slug}
                                        href={`/industries/${industry.slug}`}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-primary/5 transition-colors group"
                                    >
                                        <industry.Icon className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
                                        <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">{industry.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Resources Accordion */}
                    <div className="border-b border-foreground/5 last:border-0 rounded-md bg-white/50 mb-1">
                        <button
                            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-foreground/[0.02] rounded-md transition-colors"
                            onClick={() => setActiveAccordion(activeAccordion === "resources" ? null : "resources")}
                        >
                            <span className="text-sm font-semibold text-foreground">Resources</span>
                            <ChevronDown className={`w-4 h-4 text-foreground/50 transition-transform duration-200 ${activeAccordion === "resources" ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === "resources" ? "max-h-[500px] opacity-100 pb-2" : "max-h-0 opacity-0"}`}>
                            <div className="px-2 space-y-0.5">
                                <div className="px-3 py-1.5">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">Learn</span>
                                </div>
                                {resources.map((resource) => (
                                    <Link
                                        key={resource.slug}
                                        href={resource.slug}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-primary/5 transition-colors group"
                                    >
                                        <resource.Icon className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
                                        <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">{resource.name}</span>
                                    </Link>
                                ))}
                                <div className="px-3 py-1.5 mt-1 border-t border-foreground/5 pt-2.5">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">Tools</span>
                                </div>
                                {tools.map((tool) => (
                                    <Link
                                        key={tool.slug}
                                        href={tool.slug}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-primary/5 transition-colors group"
                                    >
                                        <tool.Icon className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
                                        <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">{tool.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Company Accordion */}
                    <div className="border-b border-foreground/5 last:border-0 rounded-md bg-white/50 mb-1">
                        <button
                            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-foreground/[0.02] rounded-md transition-colors"
                            onClick={() => setActiveAccordion(activeAccordion === "company" ? null : "company")}
                        >
                            <span className="text-sm font-semibold text-foreground">Company</span>
                            <ChevronDown className={`w-4 h-4 text-foreground/50 transition-transform duration-200 ${activeAccordion === "company" ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === "company" ? "max-h-96 opacity-100 pb-2" : "max-h-0 opacity-0"}`}>
                            <div className="px-2 space-y-0.5">
                                {company.map((item) => (
                                    <Link
                                        key={item.slug}
                                        href={item.slug}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-primary/5 transition-colors group"
                                    >
                                        <item.Icon className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
                                        <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ROI Calculator Link */}
                    <Link
                        href="/calculator"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between px-4 py-3.5 hover:bg-foreground/[0.02] rounded-md transition-colors text-sm font-semibold text-foreground mb-1 bg-white/50"
                    >
                        ROI Calculator
                    </Link>
                    {/* Mobile CTAs */}
                    <div className="px-2 pt-2 border-t border-foreground/5 mt-1 pb-2">
                        <BookedCallLink
                            templateType="nav"
                            cluster="global"
                            landingPath="/"
                            ctaLabel="Book a 15-minute call"
                            ctaLocation="mobile_nav_primary"
                            onClick={() => setMobileOpen(false)}
                            className="mb-2 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(47,39,206,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            Book a 15-minute call
                            <ArrowRight size={16} />
                        </BookedCallLink>
                        <BookedCallLink
                            templateType="nav"
                            cluster="global"
                            landingPath="/"
                            ctaLabel="Book a call"
                            ctaLocation="mobile_nav_secondary"
                            onClick={() => setMobileOpen(false)}
                            className="flex w-full items-center justify-center py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                        >
                            Book a call
                        </BookedCallLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
