import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
    buildCalculatorBookingUrl,
    buildCalculatorReportEmail,
    sendCalculatorReportEmail,
} from "../calculator-report-email";
import type { CalculatorSubmissionPayload } from "../calculator-submission-contract";

const SUBMISSION: CalculatorSubmissionPayload = {
    email: "owner@example.com",
    name: "Carter Mitchell",
    company: "Crewtrace Test Co",
    phone: "555-555-5555",
    crewSize: 12,
    avgHourlyRate: 25,
    hoursPerWeekOnPayroll: 5,
    jobSites: 3,
    tradeType: "residential",
    trackingMethod: "paper",
    overtimeLevel: "moderate",
    totalYearlyLoss: 35018,
    totalMonthlyLoss: 2917,
    yearlyRecovery: 32697,
    riskScore: 73,
    riskLevel: "Moderate",
};

describe("calculator report email", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = { ...originalEnv };
        process.env.CALCULATOR_BOOKING_URL = "https://cal.com/crewtrace/30min";
        process.env.CALCULATOR_REPORT_FROM = "Crewtrace Audit <reports@crewtrace.app>";
        process.env.CALCULATOR_REPORT_REPLY_TO = "Carter at Crewtrace <carter@getcrewtrace.com>";
        process.env.RESEND_API_KEY = "re_test";
    });

    afterEach(() => {
        vi.restoreAllMocks();
        process.env = originalEnv;
    });

    it("adds calculator attribution and result context to the booking URL", () => {
        const url = new URL(buildCalculatorBookingUrl(SUBMISSION));

        expect(url.origin + url.pathname).toBe("https://cal.com/crewtrace/30min");
        expect(url.searchParams.get("utm_source")).toBe("calculator_report");
        expect(url.searchParams.get("utm_medium")).toBe("email");
        expect(url.searchParams.get("utm_campaign")).toBe("payroll_leakage_audit");
        expect(url.searchParams.get("risk")).toBe("Moderate");
        expect(url.searchParams.get("loss")).toBe("35018");
        expect(url.searchParams.get("company")).toBe("Crewtrace Test Co");
    });

    it("builds a triage memo with waiting cost, priorities, verification plan, and CTA", () => {
        const email = buildCalculatorReportEmail(SUBMISSION);

        expect(email.to).toBe("owner@example.com");
        expect(email.subject).toContain("triage memo");
        expect(email.subject).toContain("$35,018/year at risk");
        expect(email.text).toContain("Estimated annual leakage: $35,018");
        expect(email.text).toContain("Cost of waiting:");
        expect(email.text).toContain("Priority diagnosis:");
        expect(email.text).toContain("7-day verification plan:");
        expect(email.text).toContain("What we would review on a 15-minute call:");
        expect(email.text).toContain('reply to this email with "check this"');
        expect(email.html).toContain("Crewtrace Payroll Leakage Triage Memo");
        expect(email.html).toContain("Cost of waiting");
        expect(email.html).toContain("Priority diagnosis");
        expect(email.html).toContain("7-day verification plan");
        expect(email.html).toContain("Walk through my audit");
        expect(email.html).toContain("Crewtrace Test Co");
    });

    it("sends the report through Resend using the configured sender", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            text: vi.fn(),
        });
        vi.stubGlobal("fetch", fetchMock);

        const result = await sendCalculatorReportEmail(SUBMISSION);

        expect(result).toEqual({ ok: true });
        expect(fetchMock).toHaveBeenCalledWith(
            "https://api.resend.com/emails",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    Authorization: "Bearer re_test",
                }),
            }),
        );

        const [, request] = fetchMock.mock.calls[0];
        const body = JSON.parse(request.body);
        expect(body.from).toBe("Crewtrace Audit <reports@crewtrace.app>");
        expect(body.reply_to).toBe("Carter at Crewtrace <carter@getcrewtrace.com>");
        expect(body.to).toEqual(["owner@example.com"]);
        expect(body.tags).toEqual([
            { name: "source", value: "calculator" },
            { name: "type", value: "payroll_leakage_report" },
        ]);
    });

    it("skips sending when Resend is not configured", async () => {
        delete process.env.RESEND_API_KEY;

        const result = await sendCalculatorReportEmail(SUBMISSION);

        expect(result).toEqual({
            ok: true,
            skipped: true,
            reason: "RESEND_API_KEY is not set.",
        });
    });
});
