import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Pricing | GPS Time Tracking for Construction Crews",
    description:
        "Flat-rate Crewtrace pricing by team size—no per-seat fees. Plans from $99/mo or done-for-you onboarding with custom pricing for larger rollouts.",
    path: "/pricing",
});

export default function PricingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
