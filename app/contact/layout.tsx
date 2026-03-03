import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Contact Crewtrace",
    description:
        "Book a free Crewtrace audit call to identify payroll leakage and map a GPS-verified time tracking rollout for your team.",
    path: "/contact",
});

export default function ContactLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
