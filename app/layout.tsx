import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-crewtrace-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-crewtrace-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crewtrace | Efficient Crew Tracking",
  description: "The definitive crew tracking and management solution for construction professionals.",
  icons: {
    icon: "/images/crew-trace-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${inter.variable} scroll-smooth`}>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
