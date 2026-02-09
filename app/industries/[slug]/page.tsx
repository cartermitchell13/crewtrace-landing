import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    CheckCircle2,
    ArrowRight,
    Clock,
    MapPin,
    BarChart3,
    TrendingUp,
    ShieldCheck,
    AlertCircle,
    HardHat,
    Home,
    Wind,
    Droplets,
    Trees,
    Layers,
    LucideIcon,
    ArrowUpRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

interface Benefit {
    title: string;
    description: string;
    icon: LucideIcon;
}

interface PainPoint {
    title: string;
    description: string;
}

interface Stat {
    value: string;
    label: string;
}

interface Testimonial {
    quote: string;
    author: string;
    company: string;
}

interface Industry {
    name: string;
    icon: LucideIcon;
    heroTitle: string;
    heroSubtitle: string;
    painPoints: PainPoint[];
    benefits: Benefit[];
    stats: Stat[];
    testimonial?: Testimonial;
}

// Industry data with tailored copy
const industryData: Record<string, Industry> = {
    roofing: {
        name: "Roofing",
        icon: Home,
        heroTitle: "Stop paying roofers for hours they didn't work",
        heroSubtitle: "Roofing crews start early and finish when the job's done—not when they say they did. Crewtrace gives you GPS-verified proof of every hour worked.",
        painPoints: [
            { title: "Early punch-in fraud", description: "Crews claiming they arrived at 6 AM when they really showed up at 7" },
            { title: "Extended lunch breaks", description: "30-minute lunches that mysteriously become 90 minutes" },
            { title: "Job site hopping", description: "Workers leaving early to hit another contractor's job" },
        ],
        benefits: [
            { title: "GPS Geofencing", description: "Workers can only clock in when physically at the job site", icon: MapPin },
            { title: "Photo Verification", description: "Timestamped photos prove work started and ended", icon: CheckCircle2 },
            { title: "Real-Time Alerts", description: "Get notified when crews arrive late or leave early", icon: AlertCircle },
            { title: "Weather Tracking", description: "Log weather delays automatically for accurate records", icon: Wind },
        ],
        stats: [
            { value: "$1,400", label: "Average monthly savings" },
            { value: "23%", label: "Reduction in payroll costs" },
            { value: "4 hrs", label: "Saved on payroll processing weekly" },
        ],
        testimonial: {
            quote: "We were paying for 2 hours of work that wasn't happening every single day. That's $400 a week we were just throwing away.",
            author: "Mike Ramirez",
            company: "Ramirez Roofing Co."
        }
    },
    hvac: {
        name: "HVAC",
        icon: Wind,
        heroTitle: "Track HVAC technicians across every service call",
        heroSubtitle: "Your technicians visit multiple locations daily. Crewtrace automatically logs time at each job site—no manual entry, no guesswork.",
        painPoints: [
            { title: "Drive time padding", description: "Technicians adding extra time between service calls" },
            { title: "Call stacking", description: "Techs running personal errands between appointments" },
            { title: "Inaccurate job duration", description: "No way to know if a 2-hour job really took 2 hours" },
        ],
        benefits: [
            { title: "Multi-Stop Tracking", description: "Automatic time logging at each service location", icon: MapPin },
            { title: "Route Verification", description: "See actual routes taken between jobs", icon: TrendingUp },
            { title: "Service Time Reports", description: "Know exactly how long each job takes", icon: Clock },
            { title: "Customer Communication", description: "Send accurate ETAs to customers", icon: CheckCircle2 },
        ],
        stats: [
            { value: "$1,200", label: "Average monthly savings" },
            { value: "18%", label: "More jobs completed per tech" },
            { value: "2 hrs", label: "Saved on scheduling daily" },
        ],
    },
    plumbing: {
        name: "Plumbing",
        icon: Droplets,
        heroTitle: "Know exactly when plumbers arrive and leave",
        heroSubtitle: "Emergency calls, residential jobs, commercial contracts—track every minute your plumbers spend in the field with GPS precision.",
        painPoints: [
            { title: "Emergency call padding", description: "Overtime claims on after-hours calls you can't verify" },
            { title: "Supply run abuse", description: "2-hour trips to the supply house that should take 30 minutes" },
            { title: "Job time inflation", description: "Simple fixes billed as complex repairs" },
        ],
        benefits: [
            { title: "Emergency Time Logging", description: "Accurate overtime tracking for after-hours calls", icon: Clock },
            { title: "Supply Stop Tracking", description: "Log time at supply houses separately from job sites", icon: MapPin },
            { title: "Job Cost Reports", description: "Compare estimated vs. actual time per job type", icon: BarChart3 },
            { title: "Customer Billing", description: "Generate accurate invoices based on real time", icon: ShieldCheck },
        ],
        stats: [
            { value: "$1,100", label: "Average monthly savings" },
            { value: "15%", label: "Reduction in overtime costs" },
            { value: "95%", label: "Billing accuracy improvement" },
        ],
    },
    "general-contractors": {
        name: "General Contractors",
        icon: HardHat,
        heroTitle: "Manage multiple crews across every job site",
        heroSubtitle: "You're juggling subcontractors, employees, and multiple projects. Crewtrace gives you one dashboard to track everyone, everywhere.",
        painPoints: [
            { title: "Subcontractor disputes", description: "He-said-she-said arguments about hours worked" },
            { title: "Multi-site chaos", description: "No visibility into which crews are where" },
            { title: "Payroll nightmares", description: "Sunday nights spent deciphering timesheets" },
        ],
        benefits: [
            { title: "Multi-Project Dashboard", description: "See all job sites and crews in one view", icon: Layers },
            { title: "Subcontractor Tracking", description: "Log sub hours for accurate billing", icon: CheckCircle2 },
            { title: "Project Cost Reports", description: "Track labor costs by project in real-time", icon: BarChart3 },
            { title: "Payroll Integration", description: "Export directly to QuickBooks, ADP, and more", icon: Clock },
        ],
        stats: [
            { value: "$2,500", label: "Average monthly savings" },
            { value: "6 hrs", label: "Saved on payroll weekly" },
            { value: "100%", label: "Dispute resolution rate" },
        ],
        testimonial: {
            quote: "I used to spend every Sunday night doing payroll. Now it takes 20 minutes on Monday morning, and I actually trust the numbers.",
            author: "David Chen",
            company: "Chen Construction LLC"
        }
    },
    landscaping: {
        name: "Landscaping",
        icon: Trees,
        heroTitle: "GPS tracking for crews that move all day",
        heroSubtitle: "Landscaping crews hit 5-10 properties daily. Crewtrace automatically tracks time at each location—even when there's no office to clock into.",
        painPoints: [
            { title: "Route inefficiency", description: "Crews taking longer routes or extra stops" },
            { title: "Property time guessing", description: "No idea how long each lawn actually takes" },
            { title: "Seasonal worker oversight", description: "Temp workers with no supervision" },
        ],
        benefits: [
            { title: "Auto Location Tracking", description: "Automatic punch in/out at each property", icon: MapPin },
            { title: "Route Optimization Data", description: "See patterns to improve crew routes", icon: TrendingUp },
            { title: "Property Time Logs", description: "Know exactly how long each property takes", icon: Clock },
            { title: "Seasonal Crew Management", description: "Easy onboarding for temporary workers", icon: CheckCircle2 },
        ],
        stats: [
            { value: "$900", label: "Average monthly savings" },
            { value: "12%", label: "More properties per crew per day" },
            { value: "30 min", label: "New worker onboarding time" },
        ],
    },
    concrete: {
        name: "Concrete",
        icon: Layers,
        heroTitle: "Accurate time tracking for pour schedules",
        heroSubtitle: "Concrete work runs on tight timelines. Crewtrace ensures you're paying for the hours your crew actually worked—not what they wrote down.",
        painPoints: [
            { title: "Early arrival claims", description: "Crews claiming prep time that didn't happen" },
            { title: "Cure time padding", description: "Workers sitting around on the clock waiting for concrete to set" },
            { title: "Equipment idle time", description: "Paying labor during equipment breakdowns" },
        ],
        benefits: [
            { title: "Pour Schedule Integration", description: "Track time against scheduled pour windows", icon: Clock },
            { title: "Break Time Logging", description: "Separate active work from wait time", icon: CheckCircle2 },
            { title: "Equipment Downtime Tracking", description: "Log delays for accurate labor cost allocation", icon: AlertCircle },
            { title: "Crew Productivity Reports", description: "Compare efficiency across different crews", icon: BarChart3 },
        ],
        stats: [
            { value: "$1,300", label: "Average monthly savings" },
            { value: "20%", label: "Reduction in labor cost overruns" },
            { value: "98%", label: "Timesheet accuracy" },
        ],
    },
};

export async function generateStaticParams() {
    return Object.keys(industryData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const industry = industryData[slug];

    if (!industry) {
        return { title: "Industry Not Found" };
    }

    return {
        title: `Crewtrace for ${industry.name} | GPS Time Tracking`,
        description: industry.heroSubtitle,
        openGraph: {
            title: `Crewtrace for ${industry.name} | GPS Time Tracking`,
            description: industry.heroSubtitle,
            images: [
                {
                    url: "/images/og-ct.png",
                    width: 1200,
                    height: 630,
                    alt: `Crewtrace for ${industry.name}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `Crewtrace for ${industry.name} | GPS Time Tracking`,
            description: industry.heroSubtitle,
            images: ["/images/og-ct.png"],
        },
    };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const industry = industryData[slug];

    if (!industry) {
        notFound();
    }

    const IndustryIcon = industry.icon;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className="relative pt-48 pb-20 px-6 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.05)_0%,transparent_50%)]" />

                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="flex-1 space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary">
                                    <IndustryIcon size={18} />
                                    <span>Crewtrace for {industry.name}</span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                                    {industry.heroTitle}
                                </h1>

                                <p className="text-xl text-foreground/60 max-w-2xl leading-relaxed font-medium">
                                    {industry.heroSubtitle}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/contact"
                                        className="inline-flex justify-center items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all active:translate-y-[0px] active:translate-x-[0px] text-lg"
                                    >
                                        Book a Free Demo <ArrowRight size={20} />
                                    </Link>
                                    <Link
                                        href="#features"
                                        className="inline-flex justify-center bg-secondary text-foreground font-bold px-8 py-4 rounded-xl shadow-button hover:translate-y-[-2px] hover:translate-x-[-2px] transition-all active:translate-y-[0px] active:translate-x-[0px] text-lg"
                                    >
                                        See Features
                                    </Link>
                                </div>

                                <div className="flex items-center gap-6 pt-4 text-sm font-bold text-foreground/40 uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-primary" />
                                        <span>No Hardware Needed</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-primary" />
                                        <span>Setup in 5 Minutes</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 relative">
                                <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-3xl" />
                                <div className="relative rounded-[2.5rem] border border-foreground/5 bg-white p-4 shadow-2xl">
                                    <Image
                                        src="/images/ct-hero-min (1).png"
                                        alt={`${industry.name} Dashbord Mockup`}
                                        width={800}
                                        height={600}
                                        className="rounded-[2rem] w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="px-6 py-16 bg-[#FBFBFE] border-y border-foreground/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/[0.02] -skew-x-12 translate-x-1/2" />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {industry.stats.map((stat) => (
                                <div key={stat.label} className="text-center space-y-2">
                                    <div className="text-5xl font-bold text-primary tracking-tight">{stat.value}</div>
                                    <div className="text-sm font-bold text-foreground/40 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pain Points */}
                <section className="px-6 py-32 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/5 border border-red-500/10 text-red-600 text-sm font-bold">
                                <AlertCircle size={16} />
                                <span>Common Industry Challenges</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                                Stop the <span className="text-red-500">payroll leakage</span> in your {industry.name.toLowerCase()} business.
                            </h2>
                            <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                                Every {industry.name.toLowerCase()} contractor deals with these hidden costs. Here's what's eating your margins.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {industry.painPoints.map((point, index) => (
                                <div key={index} className="group relative overflow-hidden rounded-[2.5rem] border border-red-500/5 bg-red-50/30 p-10 transition-all duration-500 hover:-translate-y-1">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 mb-8 border border-red-500/20">
                                        <AlertCircle size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-red-600 transition-colors">{point.title}</h3>
                                    <p className="text-foreground/60 font-medium leading-relaxed">{point.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section id="features" className="px-6 py-32 bg-[#FBFBFE]">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold">
                                <CheckCircle2 size={16} />
                                <span>The Solution</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                                Built for <span className="text-primary">{industry.name}</span> Contractors
                            </h2>
                            <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                                Features designed specifically for the unique challenges of {industry.name.toLowerCase()} work.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {industry.benefits.map((benefit, index) => {
                                const BenefitIcon = benefit.icon;
                                return (
                                    <div key={index} className="group relative overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-white p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col sm:flex-row gap-8">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0 border border-primary/10 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                            <BenefitIcon size={32} />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{benefit.title}</h3>
                                            <p className="text-foreground/60 font-medium leading-relaxed">{benefit.description}</p>
                                        </div>
                                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                                            <ArrowUpRight size={24} className="text-primary" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Testimonial */}
                {industry.testimonial && (
                    <section className="py-32 px-6 bg-white overflow-hidden relative border-t border-foreground/5">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
                        <div className="max-w-7xl mx-auto relative z-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div className="space-y-8">
                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                        Real results for <span className="text-primary">{industry.name}</span> crews.
                                    </h2>
                                    <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                                        See how other {industry.name.toLowerCase()} contractors are using Crewtrace to eliminate overpayment and streamline their payroll.
                                    </p>
                                    <div className="flex gap-12 pt-4">
                                        <div>
                                            <div className="text-4xl font-bold text-primary">{industry.stats[0].value}</div>
                                            <div className="text-sm font-bold text-foreground/40 uppercase tracking-wider mt-2">Avg. Savings</div>
                                        </div>
                                        <div>
                                            <div className="text-4xl font-bold text-primary">100%</div>
                                            <div className="text-sm font-bold text-foreground/40 uppercase tracking-wider mt-2">Verified Hours</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-12 rounded-[3.5rem] bg-background border border-foreground/5 shadow-[0_32px_64px_-16px_rgba(47,39,206,0.08)] space-y-8 relative">
                                    <div className="text-primary/10 absolute top-8 right-12">
                                        <svg width="60" height="45" viewBox="0 0 60 45" fill="currentColor">
                                            <path d="M15.4 0C6.9 0 0 6.9 0 15.4v29.6h25.7V15.4H10.3c0-2.8 2.3-5.1 5.1-5.1V0zm34.3 0c-8.5 0-15.4 6.9-15.4 15.4v29.6H60V15.4H44.6c0-2.8 2.3-5.1 5.1-5.1V0z" />
                                        </svg>
                                    </div>
                                    <p className="text-2xl font-bold italic tracking-tight leading-relaxed relative z-10">
                                        "{industry.testimonial.quote}"
                                    </p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="font-bold text-foreground text-lg">{industry.testimonial.author}</div>
                                            <div className="text-sm text-foreground/40 font-bold uppercase tracking-widest">{industry.testimonial.company}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
