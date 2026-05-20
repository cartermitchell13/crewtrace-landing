export type TradeType = "residential" | "commercial" | "industrial" | "mixed";
export type TrackingMethod = "paper" | "spreadsheet" | "basic-app" | "none";
export type OvertimeLevel = "low" | "moderate" | "high";

export interface CalculatorInputs {
    crewSize: number;
    avgHourlyRate: number;
    hoursPerWeekOnPayroll: number;
    jobSites: number;
    tradeType: TradeType;
    trackingMethod: TrackingMethod;
    overtimeLevel: OvertimeLevel;
}

export interface CalculationResults {
    monthlyInaccuracyLoss: number;
    yearlyInaccuracyLoss: number;
    monthlyPayrollErrors: number;
    yearlyPayrollErrors: number;
    monthlyBuddyPunchLoss: number;
    yearlyBuddyPunchLoss: number;
    monthlyOTLoss: number;
    yearlyOTLoss: number;
    monthlyAdminCost: number;
    yearlyAdminCost: number;
    totalMonthlyLoss: number;
    totalYearlyLoss: number;
    monthlyRecovery: number;
    yearlyRecovery: number;
    hoursSavedPerYear: number;
    adminSavingsPerYear: number;
    perWorkerMonthlyLoss: number;
    perWorkerYearlyLoss: number;
    truckPayments: string;
    revenueNeededToRecover: number;
    riskScore: number;
    riskLevel: "Low" | "Moderate" | "High";
    workersAffected: number;
}

export const TRADE_MULTIPLIERS: Record<TradeType, number> = {
    residential: 1.0,
    commercial: 1.15,
    industrial: 1.25,
    mixed: 1.2,
};

export const TRACKING_MULTIPLIERS: Record<TrackingMethod, number> = {
    paper: 1.3,
    spreadsheet: 1.1,
    "basic-app": 0.85,
    none: 1.5,
};

export const OVERTIME_MULTIPLIERS: Record<OvertimeLevel, number> = {
    low: 1.0,
    moderate: 1.15,
    high: 1.35,
};

export function calculateSavings(inputs: CalculatorInputs): CalculationResults {
    const {
        crewSize,
        avgHourlyRate,
        hoursPerWeekOnPayroll,
        jobSites,
        tradeType,
        trackingMethod,
        overtimeLevel,
    } = inputs;

    const tradeMult = TRADE_MULTIPLIERS[tradeType];
    const trackMult = TRACKING_MULTIPLIERS[trackingMethod];
    const otMult = OVERTIME_MULTIPLIERS[overtimeLevel];
    const siteMultiplier = 1 + (jobSites - 1) * 0.04;
    const combinedMult = tradeMult * trackMult * otMult * siteMultiplier;

    const avgMinutesDiscrepancyPerDayPerWorker = 12;
    const percentWithDiscrepancies = 0.40;
    const workDaysPerWeek = 5;
    const weeksPerMonth = 4.33;
    const weeksPerYear = 52;

    const discrepancyMinutesPerWeek = avgMinutesDiscrepancyPerDayPerWorker * workDaysPerWeek;
    const workersWithDiscrepancies = Math.ceil(crewSize * percentWithDiscrepancies);
    const totalDiscrepancyHoursPerWeek = (discrepancyMinutesPerWeek * workersWithDiscrepancies) / 60;
    const weeklyInaccuracyLoss = totalDiscrepancyHoursPerWeek * avgHourlyRate * combinedMult;
    const monthlyInaccuracyLoss = weeklyInaccuracyLoss * weeksPerMonth;
    const yearlyInaccuracyLoss = weeklyInaccuracyLoss * weeksPerYear;

    const totalWeeklyPayroll = crewSize * 40 * avgHourlyRate;
    const payrollErrorRate = 0.015 * trackMult;
    const weeklyPayrollErrors = totalWeeklyPayroll * payrollErrorRate;
    const monthlyPayrollErrors = weeklyPayrollErrors * weeksPerMonth;
    const yearlyPayrollErrors = weeklyPayrollErrors * weeksPerYear;

    // Buddy punching estimate
    const buddyPunchRate = trackingMethod === "paper" ? 0.015 : trackingMethod === "none" ? 0.025 : trackingMethod === "spreadsheet" ? 0.01 : 0.005;
    const weeklyBuddyPunchLoss = totalWeeklyPayroll * buddyPunchRate;
    const monthlyBuddyPunchLoss = weeklyBuddyPunchLoss * weeksPerMonth;
    const yearlyBuddyPunchLoss = weeklyBuddyPunchLoss * weeksPerYear;

    // OT misclassification
    const otRate = overtimeLevel === "high" ? 0.15 : overtimeLevel === "moderate" ? 0.08 : 0.03;
    const weeklyOTHours = totalWeeklyPayroll * otRate / avgHourlyRate;
    const otMisclassRate = trackingMethod === "paper" || trackingMethod === "none" ? 0.12 : 0.06;
    const weeklyOTLoss = weeklyOTHours * otMisclassRate * avgHourlyRate * 0.5;
    const monthlyOTLoss = weeklyOTLoss * weeksPerMonth;
    const yearlyOTLoss = weeklyOTLoss * weeksPerYear;

    // Admin overhead
    const adminHourlyRate = 25;
    const weeklyAdminCost = hoursPerWeekOnPayroll * adminHourlyRate;
    const monthlyAdminCost = weeklyAdminCost * weeksPerMonth;
    const yearlyAdminCost = weeklyAdminCost * weeksPerYear;

    // Totals
    const totalMonthlyLoss = monthlyInaccuracyLoss + monthlyPayrollErrors + monthlyBuddyPunchLoss + monthlyOTLoss;
    const totalYearlyLoss = yearlyInaccuracyLoss + yearlyPayrollErrors + yearlyBuddyPunchLoss + yearlyOTLoss;

    // Recovery
    const inaccuracyReduction = 0.95;
    const payrollErrorReduction = 0.90;
    const buddyPunchReduction = 0.98;
    const otReduction = 0.90;
    const payrollTimeReduction = 0.80;

    const yearlyRecovery =
        (yearlyInaccuracyLoss * inaccuracyReduction) +
        (yearlyPayrollErrors * payrollErrorReduction) +
        (yearlyBuddyPunchLoss * buddyPunchReduction) +
        (yearlyOTLoss * otReduction);
    const monthlyRecovery = yearlyRecovery / 12;
    const hoursSavedPerYear = Math.round(hoursPerWeekOnPayroll * 52 * payrollTimeReduction);
    const adminSavingsPerYear = Math.round(yearlyAdminCost * payrollTimeReduction);

    // Per-worker
    const perWorkerMonthlyLoss = totalMonthlyLoss / crewSize;
    const perWorkerYearlyLoss = totalYearlyLoss / crewSize;

    // Equivalent comparisons
    const truckPayments = totalYearlyLoss / 650;
    const avgNetMarginPercent = tradeType === "industrial" ? 0.05 : tradeType === "commercial" ? 0.06 : 0.08;
    const revenueNeededToRecover = totalYearlyLoss / avgNetMarginPercent;

    // Risk score (1-100)
    const baseRisk = 40;
    const methodRisk = trackingMethod === "paper" ? 25 : trackingMethod === "none" ? 30 : trackingMethod === "spreadsheet" ? 15 : 5;
    const sizeRisk = Math.min(crewSize * 0.3, 15);
    const siteRisk = Math.min(jobSites * 1.5, 10);
    const riskScore = Math.min(Math.round(baseRisk + methodRisk + sizeRisk + siteRisk), 98);
    const riskLevel = riskScore >= 75 ? "High" : riskScore >= 50 ? "Moderate" : "Low";

    return {
        monthlyInaccuracyLoss: Math.round(monthlyInaccuracyLoss),
        yearlyInaccuracyLoss: Math.round(yearlyInaccuracyLoss),
        monthlyPayrollErrors: Math.round(monthlyPayrollErrors),
        yearlyPayrollErrors: Math.round(yearlyPayrollErrors),
        monthlyBuddyPunchLoss: Math.round(monthlyBuddyPunchLoss),
        yearlyBuddyPunchLoss: Math.round(yearlyBuddyPunchLoss),
        monthlyOTLoss: Math.round(monthlyOTLoss),
        yearlyOTLoss: Math.round(yearlyOTLoss),
        monthlyAdminCost: Math.round(monthlyAdminCost),
        yearlyAdminCost: Math.round(yearlyAdminCost),
        totalMonthlyLoss: Math.round(totalMonthlyLoss),
        totalYearlyLoss: Math.round(totalYearlyLoss),
        monthlyRecovery: Math.round(monthlyRecovery),
        yearlyRecovery: Math.round(yearlyRecovery),
        hoursSavedPerYear,
        adminSavingsPerYear,
        perWorkerMonthlyLoss: Math.round(perWorkerMonthlyLoss),
        perWorkerYearlyLoss: Math.round(perWorkerYearlyLoss),
        truckPayments: truckPayments.toFixed(1),
        revenueNeededToRecover: Math.round(revenueNeededToRecover),
        riskScore,
        riskLevel,
        workersAffected: workersWithDiscrepancies,
    };
}
