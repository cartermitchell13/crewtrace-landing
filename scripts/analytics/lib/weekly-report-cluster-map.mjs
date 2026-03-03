const clusterPrefixMap = [
    { cluster: "features", root: "/features" },
    { cluster: "industries", root: "/industries" },
    { cluster: "compare", root: "/compare" },
    { cluster: "guides", root: "/guides" },
    { cluster: "case-studies", root: "/case-studies" },
    { cluster: "blog", root: "/blog" },
];

export const orderedWeeklyClusters = [
    "features",
    "industries",
    "compare",
    "guides",
    "case-studies",
    "blog",
    "other",
];

export function normalizeUrlPath(value) {
    if (typeof value !== "string" || value.trim().length === 0) {
        return "/unknown";
    }

    const trimmed = value.trim();
    let pathname = trimmed;

    try {
        const parsed = new URL(trimmed);
        pathname = parsed.pathname;
    } catch {
        pathname = trimmed.split("?")[0].split("#")[0];
    }

    if (!pathname.startsWith("/")) {
        pathname = `/${pathname}`;
    }

    if (pathname.length > 1 && pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1);
    }

    return pathname;
}

export function mapUrlToCluster(value) {
    const normalizedPath = normalizeUrlPath(value);

    for (const mapping of clusterPrefixMap) {
        if (normalizedPath === mapping.root || normalizedPath.startsWith(`${mapping.root}/`)) {
            return mapping.cluster;
        }
    }

    return "other";
}
