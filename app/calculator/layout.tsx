import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "ROI Calculator for Construction Payroll Leakage",
    description:
        "Estimate how much payroll leakage your construction business could be recovering with GPS-verified time tracking.",
    path: "/calculator",
});

export default function CalculatorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
