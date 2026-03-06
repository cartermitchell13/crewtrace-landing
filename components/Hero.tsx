import Image from "next/image";
import BookedCallLink from "@/components/BookedCallLink";
import {
    getTemplateMessaging,
    publicIcpPhrase,
} from "@/lib/messaging";

const homeMessaging = getTemplateMessaging("home");

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden bg-background px-6 pb-20 pt-32 md:pb-32 md:pt-40 scroll-mt-32"
        >
            {/* Subtle blue gradient overlay */}
            <div className="absolute top-0 right-0 -z-10 h-full w-[80%] translate-x-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(47,39,206,0.08)_0%,transparent_60%)] md:w-[60%]" />
            <div className="absolute left-0 top-1/4 -z-10 h-full w-[50%] -translate-x-1/2 bg-[radial-gradient(circle_at_left_center,rgba(47,39,206,0.04)_0%,transparent_50%)]" />

            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-8">
                    {/* Left Column - Copy & CTAs */}
                    <div className="max-w-2xl text-left">
                        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
                            Payroll leakage prevention
                        </p>

                        <h1 className="mb-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5rem]">
                            {homeMessaging.intentHeadline}
                        </h1>

                        <p className="mb-10 max-w-xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
                            Built {publicIcpPhrase}, Crewtrace helps you catch payroll leakage
                            before payroll close so you can protect margin faster.
                        </p>

                        {/* CTA Box styling modernized */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <BookedCallLink
                                asButton
                                buttonSize="lg"
                                cluster="home"
                                templateType="homepage_hero"
                                landingPath="/"
                                ctaLabel={homeMessaging.primaryCta}
                                ctaLocation="hero_primary"
                                className="w-full sm:w-auto cta-highlight px-8 py-4 text-white bg-primary hover:bg-primary/90 rounded-xl transition-all hover:-translate-y-0.5"
                            >
                                {homeMessaging.primaryCta}
                            </BookedCallLink>
                            <a
                                href="#process"
                                className="inline-flex w-full items-center justify-center sm:w-auto px-6 py-4 text-sm font-semibold text-foreground/70 transition-colors hover:text-primary group"
                            >
                                {homeMessaging.secondaryCta}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>

                        <div className="mt-8 flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <svg
                                    className="h-5 w-5 text-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </span>
                            <p className="text-sm font-medium text-foreground/60">
                                15-minute audit call. <span className="text-foreground/80">See your current leakage risk and next steps.</span>
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Image Mockup */}
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        {/* Decorative background shape behind the image */}
                        <div className="absolute -inset-4 z-0 rounded-3xl bg-gradient-to-tr from-primary/10 to-transparent blur-2xl" />

                        <div className="surface-panel relative z-10 rounded-[2rem] border border-foreground/5 bg-white/50 p-2 backdrop-blur-md md:rounded-[2.5rem] md:p-4">
                            <div className="overflow-hidden rounded-[1.5rem] border border-foreground/5 bg-white shadow-inner md:rounded-[2rem]">
                                <Image
                                    src="/images/ct-hero-map-mockup.png"
                                    alt="Crewtrace construction GPS time tracking map view"
                                    width={1200}
                                    height={900}
                                    className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Floating elements to enhance the glassmorphic feel */}
                        <div className="surface-panel absolute -right-6 bottom-12 z-20 hidden animate-[bounce_3s_infinite] rounded-2xl border border-white/40 bg-white/90 p-4 backdrop-blur-xl md:block">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">Crew Clocked In</p>
                                    <p className="text-xs font-semibold text-foreground/60">18 out of 24 active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
