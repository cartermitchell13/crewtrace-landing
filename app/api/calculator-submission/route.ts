import { NextResponse } from "next/server";
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
    if (!supabase) return false;

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

    return response.ok;
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

    return toJson({ ok: true, message: "Submission recorded." });
}
