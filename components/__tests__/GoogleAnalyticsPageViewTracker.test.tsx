import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import GoogleAnalyticsPageViewTracker from "../GoogleAnalyticsPageViewTracker";

const navigationMock = vi.hoisted(() => ({
    pathname: "/",
    search: "",
}));

vi.mock("next/navigation", () => ({
    usePathname: () => navigationMock.pathname,
    useSearchParams: () => new URLSearchParams(navigationMock.search),
}));

describe("GoogleAnalyticsPageViewTracker", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        navigationMock.pathname = "/";
        navigationMock.search = "";
        document.title = "Crewtrace";
        delete window.gtag;
        window.history.replaceState({}, "", "/");
    });

    afterEach(() => {
        cleanup();
        vi.useRealTimers();
        delete window.gtag;
    });

    it("sends the current page view when gtag is already available", () => {
        const gtag = vi.fn();
        window.gtag = gtag;
        navigationMock.pathname = "/features";
        navigationMock.search = "utm_source=google";
        window.history.replaceState({}, "", "/features?utm_source=google");

        render(<GoogleAnalyticsPageViewTracker measurementId="G-BXQVVDGBN7" />);

        expect(gtag).toHaveBeenCalledWith("config", "G-BXQVVDGBN7", {
            page_path: "/features?utm_source=google",
            page_location: `${window.location.origin}/features?utm_source=google`,
            page_title: "Crewtrace",
        });
    });

    it("retries the initial page view until the Google tag stub is ready", () => {
        render(<GoogleAnalyticsPageViewTracker measurementId="G-BXQVVDGBN7" />);

        const gtag = vi.fn();
        window.gtag = gtag;

        vi.advanceTimersByTime(100);

        expect(gtag).toHaveBeenCalledWith("config", "G-BXQVVDGBN7", {
            page_path: "/",
            page_location: `${window.location.origin}/`,
            page_title: "Crewtrace",
        });
    });
});
