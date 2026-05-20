import { NextResponse } from "next/server";
import { sendBrrrNotification } from "@/lib/brrr-webhook";
import { sendCalculatorReportEmail } from "@/lib/calculator-report-email";
import {
    type CalculatorSubmissionApiResponse,
    type CalculatorSubmissionPayload,
    validateCalculatorSubmission,
} from "@/lib/calculator-submission-contract";

const DEFAULT_SUPABASE_URL = "https://dythppwtjtcsorhpeazd.supabase.co";
const DEFAULT_TABLE = "calculator_submissions";

function toJson(response: CalculatorSubmissionApiResponse, status = 200) {
    return NextResponse.json(response, { status });
}

function getSupabaseConfig() {
    const url = process.env.SUPABASE_URL?.trim() || DEFAULT_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    const table = process.env.SUPABASE_CALCULATOR_TABLE?.trim() || DEFAULT_TABLE;

    if (!serviceRoleKey) return null;
    return { url, serviceRoleKey, table };
}

function getRequestIp(headers: Headers): string | undefined {
    const forwardedFor = headers.get("x-forwarded-for");
    if (forwardedFor) {
        const [firstIp] = forwardedFor.split(",");
        const trimmed = firstIp?.trim();
        if (trimmed) return trimmed;
    }
    return headers.get("x-real-ip")?.trim() || undefined;
}

async function persistSubmission(
    data: CalculatorSubmissionPayload,
    request: Request,
): Promise<boolean> {
    const supabase = getSupabaseConfig();
    if (!supabase) {
        if (process.env.NODE_ENV === "development") {
            console.warn(
                "Calculator submission storage skipped: SUPABASE_SERVICE_ROLE_KEY is not set.",
            );
            return true;
        }
        return false;
    }

    const response = await fetch(
        `${supabase.url}/rest/v1/${supabase.table}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: supabase.serviceRoleKey,
                Authorization: `Bearer ${supabase.serviceRoleKey}`,
                Prefer: "return=minimal",
            },
            body: JSON.stringify({
                email: data.email,
                name: data.name ?? null,
                company: data.company ?? null,
                phone: data.phone ?? null,
                crew_size: data.crewSize,
                avg_hourly_rate: data.avgHourlyRate,
                hours_per_week_on_payroll: data.hoursPerWeekOnPayroll,
                job_sites: data.jobSites,
                trade_type: data.tradeType,
                tracking_method: data.trackingMethod,
                overtime_level: data.overtimeLevel,
                total_yearly_loss: data.totalYearlyLoss,
                total_monthly_loss: data.totalMonthlyLoss,
                yearly_recovery: data.yearlyRecovery,
                risk_score: data.riskScore,
                risk_level: data.riskLevel,
                utm_source: data.utmSource ?? null,
                utm_medium: data.utmMedium ?? null,
                utm_campaign: data.utmCampaign ?? null,
                utm_content: data.utmContent ?? null,
                utm_term: data.utmTerm ?? null,
                submitted_at: new Date().toISOString(),
                ip: getRequestIp(request.headers),
                user_agent: request.headers.get("user-agent") ?? null,
            }),
        },
    );

    if (!response.ok) {
        const errorBody = await response.text().catch(() => "");
        console.error(
            "Calculator submission Supabase insert failed:",
            response.status,
            errorBody,
        );
    }

    return response.ok;
}

async function persistLead(
    data: CalculatorSubmissionPayload,
    request: Request,
): Promise<boolean> {
    const supabase = getSupabaseConfig();
    if (!supabase) return false;

    const leadsTable = process.env.SUPABASE_LEADS_TABLE?.trim() || "marketing_leads";
    const response = await fetch(
        `${supabase.url}/rest/v1/${leadsTable}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apikey: supabase.serviceRoleKey,
                Authorization: `Bearer ${supabase.serviceRoleKey}`,
                Prefer: "return=minimal",
            },
            body: JSON.stringify({
                source: "Crewtrace-landing",
                source_page: "/calculator",
                submitted_at: new Date().toISOString(),
                name: data.name ?? "Anonymous Calculator Lead",
                email: data.email,
                company: data.company ?? null,
                phone: data.phone ?? null,
                crew_size: `${data.crewSize} workers`,
                current_software: data.trackingMethod,
                message: `Calculator Audit Submission. Est. annual leakage: $${data.totalYearlyLoss.toLocaleString("en-US")}, Recovery: $${data.yearlyRecovery.toLocaleString("en-US")}/yr. Risk: ${data.riskLevel} (${data.riskScore})`,
                ip: getRequestIp(request.headers),
                user_agent: request.headers.get("user-agent") ?? null,
            }),
        },
    );

    return response.ok;
}

function buildBrrrCalculatorMessage(data: CalculatorSubmissionPayload): string {
    const lines = [
        data.name ? `Name: ${data.name}` : null,
        data.company ? `Company: ${data.company}` : null,
        data.phone ? `Phone: ${data.phone}` : null,
        `Email: ${data.email}`,
        `Est. annual leakage: $${data.totalYearlyLoss.toLocaleString("en-US")}`,
        `Est. monthly leakage: $${data.totalMonthlyLoss.toLocaleString("en-US")}`,
        `Recovery potential: $${data.yearlyRecovery.toLocaleString("en-US")}/yr`,
        `Risk: ${data.riskLevel} (${data.riskScore})`,
        `Crew: ${data.crewSize}, $${data.avgHourlyRate}/hr avg, ${data.hoursPerWeekOnPayroll} hrs/wk on payroll`,
        `Job sites: ${data.jobSites}`,
        `Trade: ${data.tradeType}, tracking: ${data.trackingMethod}, OT load: ${data.overtimeLevel}`,
    ].filter(Boolean) as string[];

    const utmParts = [
        data.utmSource,
        data.utmMedium,
        data.utmCampaign,
        data.utmContent,
        data.utmTerm,
    ].filter(Boolean);
    if (utmParts.length) {
        lines.push(`UTM: ${utmParts.join(" / ")}`);
    }
    return lines.join("\n");
}

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return toJson(
            { ok: false, message: "Invalid request body.", errorCode: "invalid_json" },
            400,
        );
    }

    const validated = validateCalculatorSubmission(body);
    if (!validated.ok) {
        return toJson(validated.response, validated.status);
    }

    const persisted = await persistSubmission(validated.data, request).catch(() => false);

    if (!persisted) {
        return toJson(
            {
                ok: false,
                message: "Could not save submission. Please retry.",
                errorCode: "internal_error",
            },
            500,
        );
    }

    // Also save as a marketing lead
    await persistLead(validated.data, request).catch((err) => {
        console.error("Failed to copy calculator submission to marketing_leads", err);
    });

    await sendBrrrNotification(
        "New Crewtrace calculator submission",
        buildBrrrCalculatorMessage(validated.data),
    ).catch((error) => {
        console.error("brrr notification threw an error.", error);
        return false;
    });

    await sendCalculatorReportEmail(validated.data).then((result) => {
        if (result.ok && result.skipped) {
            console.warn("Calculator report email skipped:", result.reason);
        }
        if (!result.ok) {
            console.error(
                "Calculator report email failed:",
                result.status,
                result.message,
            );
        }
    }).catch((error) => {
        console.error("Calculator report email threw an error.", error);
    });

    return toJson({ ok: true, message: "Submission recorded." });
}
