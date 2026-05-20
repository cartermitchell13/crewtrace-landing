import {
    calculateSavings,
    type CalculatorInputs,
    type CalculationResults,
    type OvertimeLevel,
    type TrackingMethod,
    type TradeType,
} from "@/lib/calculator-calculations";
import {
    CALCULATOR_BENCHMARK_DISCLAIMER,
    CALCULATOR_METHODOLOGY_ITEMS,
} from "@/lib/calculator-methodology";
import type { CalculatorSubmissionPayload } from "@/lib/calculator-submission-contract";

const RESEND_API_URL = "https://api.resend.com/emails";

type EmailSendResult =
    | { ok: true; skipped?: false }
    | { ok: true; skipped: true; reason: string }
    | { ok: false; status?: number; message: string };

type ReportCategory = {
    label: string;
    yearly: number;
    monthly: number;
    description: string;
};

function currency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function humanize(value: string): string {
    return value
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function submissionToInputs(data: CalculatorSubmissionPayload): CalculatorInputs {
    return {
        crewSize: data.crewSize,
        avgHourlyRate: data.avgHourlyRate,
        hoursPerWeekOnPayroll: data.hoursPerWeekOnPayroll,
        jobSites: data.jobSites,
        tradeType: data.tradeType as TradeType,
        trackingMethod: data.trackingMethod as TrackingMethod,
        overtimeLevel: data.overtimeLevel as OvertimeLevel,
        name: data.name,
        company: data.company,
        phone: data.phone,
        email: data.email,
    };
}

function getReportCategories(results: CalculationResults): ReportCategory[] {
    return [
        {
            label: "Time rounding and discrepancies",
            yearly: results.yearlyInaccuracyLoss,
            monthly: results.monthlyInaccuracyLoss,
            description: "Daily rounding, missed edits, and field time that does not match the actual jobsite day.",
        },
        {
            label: "Payroll processing errors",
            yearly: results.yearlyPayrollErrors,
            monthly: results.monthlyPayrollErrors,
            description: "Manual entry, spreadsheet handling, and payroll prep mistakes before hours are approved.",
        },
        {
            label: "Buddy punching",
            yearly: results.yearlyBuddyPunchLoss,
            monthly: results.monthlyBuddyPunchLoss,
            description: "Clock-ins that are not tied tightly enough to the worker, device, and jobsite.",
        },
        {
            label: "Overtime misclassification",
            yearly: results.yearlyOTLoss,
            monthly: results.monthlyOTLoss,
            description: "Overtime that is hard to catch when time records are late, incomplete, or manually rebuilt.",
        },
    ].sort((a, b) => b.yearly - a.yearly);
}

export function buildCalculatorBookingUrl(data: CalculatorSubmissionPayload): string {
    const base = process.env.CALCULATOR_BOOKING_URL?.trim() || "https://cal.com/crewtrace/30min";

    try {
        const url = new URL(base);
        url.searchParams.set("utm_source", "calculator_report");
        url.searchParams.set("utm_medium", "email");
        url.searchParams.set("utm_campaign", "payroll_leakage_audit");
        url.searchParams.set("risk", data.riskLevel);
        url.searchParams.set("loss", String(Math.round(data.totalYearlyLoss)));
        if (data.company) url.searchParams.set("company", data.company);
        return url.toString();
    } catch {
        const separator = base.includes("?") ? "&" : "?";
        return `${base}${separator}utm_source=calculator_report&utm_medium=email&utm_campaign=payroll_leakage_audit`;
    }
}

export function buildCalculatorReportEmail(data: CalculatorSubmissionPayload) {
    const inputs = submissionToInputs(data);
    const results = calculateSavings(inputs);
    const bookingUrl = buildCalculatorBookingUrl({
        ...data,
        totalYearlyLoss: results.totalYearlyLoss,
        totalMonthlyLoss: results.totalMonthlyLoss,
        yearlyRecovery: results.yearlyRecovery,
        riskScore: results.riskScore,
        riskLevel: results.riskLevel,
    });
    const categories = getReportCategories(results);
    const topCategory = categories[0];
    const firstName = data.name?.split(/\s+/)[0] || "there";
    const companyLabel = data.company || "your company";
    const payPeriodLeakage = Math.round(results.totalYearlyLoss / 26);

    const subject = `Your payroll leakage audit: ${currency(results.totalYearlyLoss)}/year at risk`;

    const text = [
        `Hi ${firstName},`,
        "",
        `Here is the more detailed version of your Crewtrace payroll leakage audit for ${companyLabel}.`,
        "",
        `Estimated annual leakage: ${currency(results.totalYearlyLoss)}`,
        `Estimated monthly leakage: ${currency(results.totalMonthlyLoss)}`,
        `Estimated leakage per two-week payroll: ${currency(payPeriodLeakage)}`,
        `Risk score: ${results.riskScore}/100 (${results.riskLevel})`,
        `Estimated annual recovery with GPS-verified time tracking: ${currency(results.yearlyRecovery)}`,
        "",
        `The biggest category in your audit is ${topCategory.label.toLowerCase()} at ${currency(topCategory.yearly)}/year.`,
        "",
        "Breakdown:",
        ...categories.map((category) => `- ${category.label}: ${currency(category.yearly)}/year (${currency(category.monthly)}/month)`),
        "",
        "What to check this week:",
        "- Compare clock-in times against actual first jobsite arrival for one recent pay period.",
        "- Look for repeated rounded start or stop times across the same crew.",
        "- Review overtime edits and late timesheet corrections before payroll is approved.",
        "",
        `If you want to walk through these numbers with Crewtrace, book here: ${bookingUrl}`,
        "",
        CALCULATOR_BENCHMARK_DISCLAIMER,
    ].join("\n");

    const categoryRows = categories
        .map(
            (category) => `
                <tr>
                    <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">
                        <div style="font-weight:700;color:#111827;">${escapeHtml(category.label)}</div>
                        <div style="font-size:13px;line-height:1.5;color:#6b7280;">${escapeHtml(category.description)}</div>
                    </td>
                    <td align="right" style="padding:14px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#dc2626;white-space:nowrap;">
                        ${currency(category.yearly)}
                    </td>
                </tr>`,
        )
        .join("");

    const methodologyItems = CALCULATOR_METHODOLOGY_ITEMS.map(
        (item) => `
            <li style="margin:0 0 10px 0;">
                <strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.description)}
            </li>`,
    ).join("");

    const html = `
        <!doctype html>
        <html>
            <body style="margin:0;background:#f6f4ef;font-family:Arial,Helvetica,sans-serif;color:#111827;">
                <div style="display:none;max-height:0;overflow:hidden;">
                    ${currency(results.totalYearlyLoss)} in estimated annual payroll leakage for ${escapeHtml(companyLabel)}.
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f4ef;padding:28px 12px;">
                    <tr>
                        <td align="center">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                                <tr>
                                    <td style="padding:28px 28px 18px 28px;">
                                        <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2f27ce;">Crewtrace Payroll Leakage Audit</div>
                                        <h1 style="margin:12px 0 8px 0;font-size:28px;line-height:1.15;color:#111827;">${currency(results.totalYearlyLoss)}/year at risk</h1>
                                        <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.6;">
                                            Hi ${escapeHtml(firstName)}, here is the more detailed version of your payroll leakage report for ${escapeHtml(companyLabel)}.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 28px 22px 28px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f9fafb;border:1px solid #eef0f3;border-radius:8px;">
                                            <tr>
                                                <td style="padding:18px;">
                                                    <div style="font-size:13px;color:#6b7280;">Monthly leakage</div>
                                                    <div style="font-size:22px;font-weight:700;color:#dc2626;">${currency(results.totalMonthlyLoss)}</div>
                                                </td>
                                                <td style="padding:18px;">
                                                    <div style="font-size:13px;color:#6b7280;">Risk score</div>
                                                    <div style="font-size:22px;font-weight:700;color:#111827;">${results.riskScore}/100 ${escapeHtml(results.riskLevel)}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:0 18px 18px 18px;">
                                                    <div style="font-size:13px;color:#6b7280;">Per two-week payroll</div>
                                                    <div style="font-size:22px;font-weight:700;color:#111827;">${currency(payPeriodLeakage)}</div>
                                                </td>
                                                <td style="padding:0 18px 18px 18px;">
                                                    <div style="font-size:13px;color:#6b7280;">Estimated recovery</div>
                                                    <div style="font-size:22px;font-weight:700;color:#047857;">${currency(results.yearlyRecovery)}/year</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 28px 22px 28px;">
                                        <h2 style="margin:0 0 10px 0;font-size:18px;color:#111827;">Where the leakage appears to be coming from</h2>
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            ${categoryRows}
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 28px 24px 28px;">
                                        <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:16px;">
                                            <div style="font-size:15px;font-weight:700;color:#9a3412;margin-bottom:8px;">What to check this week</div>
                                            <ol style="margin:0;padding-left:20px;color:#7c2d12;font-size:14px;line-height:1.6;">
                                                <li>Compare clock-in times against actual first jobsite arrival for one recent pay period.</li>
                                                <li>Look for repeated rounded start or stop times across the same crew.</li>
                                                <li>Review overtime edits and late timesheet corrections before payroll is approved.</li>
                                            </ol>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 28px 30px 28px;">
                                        <p style="margin:0 0 18px 0;color:#4b5563;font-size:15px;line-height:1.6;">
                                            Crewtrace helps construction teams replace manual time collection with GPS-verified clock-ins, jobsite-aware approvals, and cleaner payroll handoff.
                                        </p>
                                        <a href="${escapeHtml(bookingUrl)}" style="display:inline-block;background:#2f27ce;color:#ffffff;text-decoration:none;font-weight:700;border-radius:999px;padding:13px 20px;">
                                            Review these numbers with Crewtrace
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:20px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:1.6;">
                                        <div style="font-weight:700;color:#374151;margin-bottom:6px;">Methodology</div>
                                        <ul style="margin:0 0 10px 0;padding-left:18px;">${methodologyItems}</ul>
                                        <div>${escapeHtml(CALCULATOR_BENCHMARK_DISCLAIMER)}</div>
                                        <div style="margin-top:12px;">Crewtrace sent this report because you requested a payroll leakage audit on getcrewtrace.com.</div>
                                        <div style="margin-top:6px;">Audit inputs: ${inputs.crewSize} workers, ${inputs.jobSites} site${inputs.jobSites === 1 ? "" : "s"}, ${escapeHtml(humanize(inputs.tradeType))}, ${escapeHtml(humanize(inputs.trackingMethod))} tracking.</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>`;

    return {
        to: data.email,
        subject,
        html,
        text,
        bookingUrl,
    };
}

export async function sendCalculatorReportEmail(data: CalculatorSubmissionPayload): Promise<EmailSendResult> {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const from = process.env.CALCULATOR_REPORT_FROM?.trim();
    const replyTo = process.env.CALCULATOR_REPORT_REPLY_TO?.trim();

    if (!apiKey) {
        return { ok: true, skipped: true, reason: "RESEND_API_KEY is not set." };
    }
    if (!from) {
        return { ok: true, skipped: true, reason: "CALCULATOR_REPORT_FROM is not set." };
    }

    const email = buildCalculatorReportEmail(data);
    const response = await fetch(RESEND_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to: [email.to],
            subject: email.subject,
            html: email.html,
            text: email.text,
            ...(replyTo ? { reply_to: replyTo } : {}),
            tags: [
                { name: "source", value: "calculator" },
                { name: "type", value: "payroll_leakage_report" },
            ],
        }),
    });

    if (!response.ok) {
        const message = await response.text().catch(() => "");
        return {
            ok: false,
            status: response.status,
            message: message || "Resend API request failed.",
        };
    }

    return { ok: true };
}
