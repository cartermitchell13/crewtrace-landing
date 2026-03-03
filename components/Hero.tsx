import Image from "next/image";
import BookedCallLink from "@/components/BookedCallLink";
import {
    getTemplateMessaging,
    orderedPromiseLine,
    publicIcpPhrase,
} from "@/lib/messaging";

const homeMessaging = getTemplateMessaging("home");

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative overflow-hidden px-6 pb-18 pt-32 md:pb-22 md:pt-36 scroll-mt-32"
        >
            <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(47,39,206,0.08)_0%,transparent_58%)]" />

            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-4xl space-y-8 text-center">
                    <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        Payroll leakage prevention
                    </p>

                    <h1 className="text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-5xl md:text-7xl">
                        {homeMessaging.intentHeadline}
                    </h1>

                    <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-foreground/70 md:text-xl">
                        Crewtrace is built {publicIcpPhrase}. {orderedPromiseLine}{" "}
                        {homeMessaging.proofBody}
                    </p>

                    <div className="mx-auto grid max-w-2xl gap-4 rounded-3xl border border-foreground/10 bg-white p-4 md:grid-cols-2 md:p-5">
                        <BookedCallLink
                            asButton
                            buttonSize="lg"
                            cluster="home"
                            templateType="homepage_hero"
                            landingPath="/"
                            ctaLabel={homeMessaging.primaryCta}
                            ctaLocation="hero_primary"
                            className="w-full"
                        >
                            {homeMessaging.primaryCta}
                        </BookedCallLink>
                        <BookedCallLink
                            asButton
                            buttonVariant="white"
                            buttonSize="lg"
                            cluster="home"
                            templateType="homepage_hero"
                            landingPath="/"
                            ctaLabel={homeMessaging.secondaryCta}
                            ctaLocation="hero_secondary"
                            className="w-full border border-primary/20"
                        >
                            {homeMessaging.secondaryCta}
                        </BookedCallLink>
                    </div>

                    <p className="text-sm font-semibold text-foreground/45">
                        15-minute audit call. See your current leakage risk and next steps.
                    </p>
                </div>

                <div className="mx-auto mt-10 max-w-6xl rounded-[2rem] border border-foreground/10 bg-white p-3 shadow-[0_20px_70px_-24px_rgba(47,39,206,0.35)] md:mt-14 md:rounded-[2.6rem]">
                    <Image
                        src="/images/ct-hero-min (1).png"
                        alt="Crewtrace dashboard with crew activity and payroll controls"
                        width={1920}
                        height={1080}
                        className="h-auto w-full rounded-[1.4rem] object-cover md:rounded-[2.1rem]"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
