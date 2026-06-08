import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Book a 15-Minute Payroll Leakage Review | Crewtrace",
    description:
        "Book a focused Crewtrace call to review your crew size, time-tracking workflow, payroll leakage risks, and best next step.",
    path: "/contact",
});

export default function ContactLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
