import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "True Cost of a Construction Employee Calculator | Free Tool",
    description:
        "Calculate the real cost of your construction employees — including payroll taxes, insurance, time theft, and hidden overhead. Free calculator, no email required.",
    path: "/tools/true-cost-calculator",
});

export default function TrueCostCalculatorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
