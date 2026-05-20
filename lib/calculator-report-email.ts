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
    likelyCause: string;
    verificationStep: string;
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
            likelyCause: "Start and stop times are being reconstructed after the fact instead of verified at the jobsite.",
            verificationStep: "Compare submitted start times against first jobsite arrival for three workers on one recent payroll.",
        },
        {
            label: "Payroll processing errors",
            yearly: results.yearlyPayrollErrors,
            monthly: results.monthlyPayrollErrors,
            description: "Manual entry, spreadsheet handling, and payroll prep mistakes before hours are approved.",
            likelyCause: "Hours are being copied, cleaned up, or re-keyed before payroll, which creates room for small errors to compound.",
            verificationStep: "Pick one payroll run and trace one worker's hours from field submission to final payroll export.",
        },
        {
            label: "Buddy punching",
            yearly: results.yearlyBuddyPunchLoss,
            monthly: results.monthlyBuddyPunchLoss,
            description: "Clock-ins that are not tied tightly enough to the worker, device, and jobsite.",
            likelyCause: "The current process does not strongly prove who clocked in, where they were, and whether they were actually on site.",
            verificationStep: "Look for workers with identical clock times, repeated round numbers, or clock-ins before anyone reached the site.",
        },
        {
            label: "Overtime misclassification",
            yearly: results.yearlyOTLoss,
            monthly: results.monthlyOTLoss,
            description: "Overtime that is hard to catch when time records are late, incomplete, or manually rebuilt.",
            likelyCause: "OT review depends on late edits and manual approvals instead of a clean daily record.",
            verificationStep: "Review every overtime edit in the last pay period and note which ones were corrected after the workday ended.",
        },
    ].sort((a, b) => b.yearly - a.yearly);
}

function getOperatingProfile(inputs: CalculatorInputs): string {
    const method = humanize(inputs.trackingMethod).toLowerCase();
    const trade = inputs.tradeType === "mixed" ? "general contractor" : inputs.tradeType;
    return `${inputs.crewSize} ${trade} field workers across ${inputs.jobSites} active site${inputs.jobSites === 1 ? "" : "s"}, using ${method} tracking`;
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
    const secondCategory = categories[1];
    const firstName = data.name?.split(/\s+/)[0] || "there";
    const companyLabel = data.company || "your company";
    const payPeriodLeakage = Math.round(results.totalYearlyLoss / 26);
    const thirtyDayCost = Math.round(results.totalYearlyLoss / 12);
    const ninetyDayCost = Math.round(results.totalYearlyLoss / 4);
    const sixPayrollCost = payPeriodLeakage * 6;
    const operatingProfile = getOperatingProfile(inputs);

    const subject = `Your payroll leakage triage memo: ${currency(results.totalYearlyLoss)}/year at risk`;

    const text = [
        `Hi ${firstName},`,
        "",
        `The browser report showed the number. This triage memo is the next step: what to check, what to prioritize, and what we would review with you on a call.`,
        "",
        `Company: ${companyLabel}`,
        `Operating profile: ${operatingProfile}`,
        `Estimated annual leakage: ${currency(results.totalYearlyLoss)}`,
        `Estimated leakage per two-week payroll: ${currency(payPeriodLeakage)}`,
        `Risk score: ${results.riskScore}/100 (${results.riskLevel})`,
        `Estimated annual recovery with GPS-verified time tracking: ${currency(results.yearlyRecovery)}`,
        "",
        "Cost of waiting:",
        `- Next 30 days: ${currency(thirtyDayCost)}`,
        `- Next 90 days: ${currency(ninetyDayCost)}`,
        `- Next 6 payroll cycles: ${currency(sixPayrollCost)}`,
        "",
        "Priority diagnosis:",
        `1. ${topCategory.label}: ${currency(topCategory.yearly)}/year. ${topCategory.likelyCause}`,
        `2. ${secondCategory.label}: ${currency(secondCategory.yearly)}/year. ${secondCategory.likelyCause}`,
        `3. Watch item: ${inputs.hoursPerWeekOnPayroll} hours/week spent on payroll admin, worth about ${currency(results.yearlyAdminCost)}/year in admin load before direct leakage.`,
        "",
        "7-day verification plan:",
        "- Pull one recent payroll run.",
        "- Pick 3 field workers across at least 2 active jobsites.",
        "- Compare scheduled start, actual arrival, submitted time, approved time, and payroll export.",
        `- Start with this check: ${topCategory.verificationStep}`,
        "- Mark every rounded time, late edit, missing jobsite, and overtime adjustment.",
        "",
        "What we would review on a 15-minute call:",
        "- Which part of the estimate is most likely real versus benchmark noise.",
        "- Where your current time-to-payroll workflow loses control.",
        "- Whether Crewtrace is a fit for your crew size, jobsite count, and payroll process.",
        "",
        `Book the triage call here: ${bookingUrl}`,
        "",
        `If the number looks high or low, reply to this email with "check this" and we can sanity-check the assumptions.`,
        "",
        CALCULATOR_BENCHMARK_DISCLAIMER,
    ].join("\n");

    const priorityRows = [topCategory, secondCategory]
        .map((category, index) => `
            <tr>
                <td style="padding:16px 0;border-bottom:1px solid #e5e7eb;vertical-align:top;">
                    <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;">Priority ${index + 1}</div>
                    <div style="margin-top:4px;font-weight:700;color:#111827;">${escapeHtml(category.label)}</div>
                    <div style="margin-top:4px;font-size:13px;line-height:1.5;color:#6b7280;">${escapeHtml(category.likelyCause)}</div>
                </td>
                <td align="right" style="padding:16px 0;border-bottom:1px solid #e5e7eb;font-weight:700;color:#dc2626;white-space:nowrap;vertical-align:top;">
                    ${currency(category.yearly)}
                </td>
            </tr>`)
        .join("");

    const allCategoryRows = categories.map((category) => `
        <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eef0f3;color:#374151;font-size:13px;">${escapeHtml(category.label)}</td>
            <td align="right" style="padding:10px 0;border-bottom:1px solid #eef0f3;color:#111827;font-size:13px;font-weight:700;">${currency(category.yearly)}</td>
        </tr>`).join("");

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
                    The browser report showed the number. This memo shows what to check next.
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f4ef;padding:28px 12px;">
                    <tr>
                        <td align="center">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                                <tr>
                                    <td style="padding:28px 28px 18px 28px;">
                                        <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#2f27ce;">Crewtrace Payroll Leakage Triage Memo</div>
                                        <h1 style="margin:12px 0 8px 0;font-size:28px;line-height:1.15;color:#111827;">${currency(results.totalYearlyLoss)}/year at risk</h1>
                                        <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.6;">
                                            Hi ${escapeHtml(firstName)}, the browser report showed the number. This memo shows what to check next for ${escapeHtml(companyLabel)}.
                                        </p>
                                        <p style="margin:12px 0 0 0;color:#6b7280;font-size:13px;line-height:1.5;">
                                            ${escapeHtml(operatingProfile)}
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
                                        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;">
                                            <div style="font-size:15px;font-weight:700;color:#991b1b;margin-bottom:10px;">Cost of waiting</div>
                                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td style="padding:8px 0;color:#7f1d1d;font-size:13px;">Next 30 days</td>
                                                    <td align="right" style="padding:8px 0;color:#991b1b;font-size:16px;font-weight:700;">${currency(thirtyDayCost)}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:8px 0;color:#7f1d1d;font-size:13px;">Next 90 days</td>
                                                    <td align="right" style="padding:8px 0;color:#991b1b;font-size:16px;font-weight:700;">${currency(ninetyDayCost)}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:8px 0;color:#7f1d1d;font-size:13px;">Next 6 payroll cycles</td>
                                                    <td align="right" style="padding:8px 0;color:#991b1b;font-size:16px;font-weight:700;">${currency(sixPayrollCost)}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 28px 22px 28px;">
                                        <h2 style="margin:0 0 6px 0;font-size:18px;color:#111827;">Priority diagnosis</h2>
                                        <p style="margin:0 0 8px 0;color:#6b7280;font-size:13px;line-height:1.5;">These are the first two places we would inspect based on your inputs.</p>
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            ${priorityRows}
                                        </table>
                                        <div style="margin-top:14px;background:#f9fafb;border:1px solid #eef0f3;border-radius:8px;padding:14px;">
                                            <div style="font-size:13px;font-weight:700;color:#374151;margin-bottom:6px;">Full category snapshot</div>
                                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${allCategoryRows}</table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 28px 24px 28px;">
                                        <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:16px;">
                                            <div style="font-size:15px;font-weight:700;color:#9a3412;margin-bottom:8px;">7-day verification plan</div>
                                            <ol style="margin:0;padding-left:20px;color:#7c2d12;font-size:14px;line-height:1.6;">
                                                <li>Pull one recent payroll run.</li>
                                                <li>Pick 3 field workers across at least 2 active jobsites.</li>
                                                <li>Compare scheduled start, actual arrival, submitted time, approved time, and payroll export.</li>
                                                <li>${escapeHtml(topCategory.verificationStep)}</li>
                                                <li>Mark every rounded time, late edit, missing jobsite, and overtime adjustment.</li>
                                            </ol>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 28px 24px 28px;">
                                        <div style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:8px;padding:16px;">
                                            <div style="font-size:15px;font-weight:700;color:#312e81;margin-bottom:8px;">What we would review on a 15-minute call</div>
                                            <ul style="margin:0;padding-left:20px;color:#3730a3;font-size:14px;line-height:1.6;">
                                                <li>Which part of this estimate is most likely real versus benchmark noise.</li>
                                                <li>Where your current time-to-payroll workflow loses control.</li>
                                                <li>Whether Crewtrace is a fit for your crew size, jobsite count, and payroll process.</li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 28px 30px 28px;">
                                        <p style="margin:0 0 18px 0;color:#4b5563;font-size:15px;line-height:1.6;">
                                            If this number looks high or low, reply with <strong>check this</strong> and we can sanity-check the assumptions. If you want to walk through the triage, book a focused call below.
                                        </p>
                                        <a href="${escapeHtml(bookingUrl)}" style="display:inline-block;background:#2f27ce;color:#ffffff;text-decoration:none;font-weight:700;border-radius:999px;padding:13px 20px;">
                                            Walk through my audit
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
