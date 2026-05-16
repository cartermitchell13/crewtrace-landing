import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Get a Free Demo & Quote for Your Crew | Crewtrace",
    description:
        "Request a personalized Crewtrace demo tailored to your trade and crew size. Get a video walkthrough and quote in one business day — no sales call required.",
    path: "/contact",
});

export default function ContactLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
