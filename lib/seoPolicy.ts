import type { MetadataRoute } from "next";

export type SeoPageKind =
    | "home"
    | "feature_detail"
    | "industry_detail"
    | "competitor_detail"
    | "blog_detail"
    | "guide_detail"
    | "case_study_detail"
    | "hub"
    | "legal"
    | "utility"
    | "company";

export type SeoRoutePolicy = {
    path: string;
    pageKind: SeoPageKind;
    indexable: boolean;
    titlePattern: string;
    descriptionPattern: string;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
};

export const staticSeoPolicies: SeoRoutePolicy[] = [
    {
        path: "/",
        pageKind: "home",
        indexable: true,
        titlePattern: "Construction Time Tracking Software — GPS Verified | Crewtrace",
        descriptionPattern: "Core conversion message for U.S. multi-crew businesses.",
        changeFrequency: "weekly",
        priority: 1,
    },
    {
        path: "/industries",
        pageKind: "hub",
        indexable: true,
        titlePattern: "Industries | GPS Time Tracking for Contractors",
        descriptionPattern: "Industry hub for construction-adjacent trades.",
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        path: "/features",
        pageKind: "hub",
        indexable: true,
        titlePattern: "Features | Contractor Time Tracking and Payroll Controls",
        descriptionPattern: "Feature hub for payroll leakage and compliance workflows.",
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        path: "/blog",
        pageKind: "hub",
        indexable: true,
        titlePattern: "Construction Payroll & Time Tracking Blog",
        descriptionPattern: "Operational guides and payroll leakage insights.",
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        path: "/guides",
        pageKind: "hub",
        indexable: true,
        titlePattern: "Construction Time Tracking Guides",
        descriptionPattern: "Implementation playbooks for field operations.",
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        path: "/case-studies",
        pageKind: "hub",
        indexable: true,
        titlePattern: "Construction Case Studies",
        descriptionPattern: "Proof-led case studies for contractor outcomes.",
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        path: "/compare",
        pageKind: "hub",
        indexable: true,
        titlePattern: "Crewtrace Comparison Guides for Connecteam and Workyard",
        descriptionPattern: "Neutral competitor-intent hub for factual comparison pages.",
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        path: "/about",
        pageKind: "company",
        indexable: true,
        titlePattern: "About Crewtrace",
        descriptionPattern: "Company mission and operating approach.",
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        path: "/contact",
        pageKind: "company",
        indexable: true,
        titlePattern: "Contact Crewtrace",
        descriptionPattern: "Book a free audit call.",
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        path: "/demo",
        pageKind: "utility",
        indexable: false,
        titlePattern: "See Crewtrace in Action | Demo",
        descriptionPattern: "Demo walkthrough page.",
    },
    {
        path: "/calculator",
        pageKind: "utility",
        indexable: false,
        titlePattern: "ROI Calculator for Construction Payroll Leakage",
        descriptionPattern: "Interactive calculator utility.",
    },
    {
        path: "/compliance-audit",
        pageKind: "utility",
        indexable: false,
        titlePattern: "Free Compliance Audit",
        descriptionPattern: "Interactive compliance audit utility.",
    },
    {
        path: "/privacy",
        pageKind: "legal",
        indexable: false,
        titlePattern: "Privacy Policy",
        descriptionPattern: "Legal policy page.",
    },
    {
        path: "/terms",
        pageKind: "legal",
        indexable: false,
        titlePattern: "Terms of Service",
        descriptionPattern: "Legal policy page.",
    },
    {
        path: "/tools/true-cost-calculator",
        pageKind: "utility",
        indexable: true,
        titlePattern: "True Cost of a Construction Employee Calculator | Free Tool",
        descriptionPattern: "Calculate the real cost of your construction employees — including payroll taxes, insurance, time theft, and hidden overhead.",
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        path: "/tools/payroll-audit-checklist",
        pageKind: "utility",
        indexable: true,
        titlePattern: "Payroll Audit Checklist | FLSA Compliance Readiness",
        descriptionPattern:
            "Walk through FLSA-focused payroll audit steps for construction crews — timekeeping proof, overtime, classification, and record retention.",
        changeFrequency: "monthly",
        priority: 0.8,
    },
];

const dynamicPolicyPrefixes = [
    "/features/",
    "/industries/",
    "/compare/",
    "/blog/",
    "/guides/",
    "/case-studies/",
    "/tools/",
] as const;

function normalizePath(path: string): string {
    if (!path || path === "/") {
        return "/";
    }

    return path.startsWith("/") ? path : `/${path}`;
}

export function getStaticSeoPolicy(path: string): SeoRoutePolicy | undefined {
    const normalized = normalizePath(path);
    return staticSeoPolicies.find((policy) => policy.path === normalized);
}

export function isIndexablePath(path: string): boolean {
    const normalized = normalizePath(path);
    const staticPolicy = getStaticSeoPolicy(normalized);

    if (staticPolicy) {
        return staticPolicy.indexable;
    }

    return dynamicPolicyPrefixes.some((prefix) => normalized.startsWith(prefix));
}

export function getDisallowedStaticPaths(): string[] {
    return staticSeoPolicies.filter((policy) => !policy.indexable).map((policy) => policy.path);
}

export function getSitemapStaticPolicies(): SeoRoutePolicy[] {
    return staticSeoPolicies.filter((policy) => policy.indexable);
}
