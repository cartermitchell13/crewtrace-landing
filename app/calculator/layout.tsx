import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Free Payroll Leakage Calculator for Construction | Crewtrace",
    description:
        "Free 60-second profit audit — find out how much your construction payroll is leaking and what you could recover with GPS-verified time tracking.",
    path: "/calculator",
});

export default function CalculatorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
