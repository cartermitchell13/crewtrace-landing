import { describe, expect, it } from "vitest";
import {
    BOOKED_CALL_BASE_URL,
    buildBookedCallUrl,
    pickBookedCallParams,
} from "@/lib/booked-call-url";

describe("booked call URL builder", () => {
    it("returns canonical base URL when no params are provided", () => {
        expect(buildBookedCallUrl()).toBe(BOOKED_CALL_BASE_URL);
    });

    it("merges source query and explicit params with deterministic precedence", () => {
        const url = buildBookedCallUrl({
            sourceQuery: "utm_source=google&utm_campaign=spring&gclid=test-click",
            params: {
                utm_source: "organic",
                cluster: "features",
                template_type: "feature_detail",
                landing_url: "/features/gps-time-tracking",
            },
        });
        const parsed = new URL(url);

        expect(parsed.searchParams.get("utm_source")).toBe("organic");
        expect(parsed.searchParams.get("utm_campaign")).toBe("spring");
        expect(parsed.searchParams.get("gclid")).toBe("test-click");
        expect(parsed.searchParams.get("cluster")).toBe("features");
        expect(parsed.searchParams.get("template_type")).toBe("feature_detail");
        expect(parsed.searchParams.get("landing_url")).toBe("/features/gps-time-tracking");
    });

    it("drops empty and unknown parameters from source extraction", () => {
        const picked = pickBookedCallParams(
            "utm_source=&utm_medium=organic&cluster=industries&unknown=value",
        );

        expect(picked).toEqual({
            utm_medium: "organic",
            cluster: "industries",
        });
    });
});
