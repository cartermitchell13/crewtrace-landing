import { describe, it, expect } from "vitest";
import { calculateSavings, type CalculatorInputs } from "../calculator-calculations";

const STANDARD_INPUTS: CalculatorInputs = {
    crewSize: 12,
    avgHourlyRate: 15,
    hoursPerWeekOnPayroll: 5,
    jobSites: 3,
    tradeType: "residential",
    trackingMethod: "paper",
    overtimeLevel: "moderate",
};

describe("calculateSavings", () => {
    it("computes baseline numbers correctly for standard inputs", () => {
        const results = calculateSavings(STANDARD_INPUTS);

        // Under residential (1.0), paper (1.3), moderate OT (1.15), 3 sites (1.08)
        // Combined multiplier = 1.0 * 1.3 * 1.15 * 1.08 = 1.6146
        // workersWithDiscrepancies = ceil(12 * 0.4) = 5
        // weeklyInaccuracyLoss = 5 * 15 * 1.6146 = 121.095
        // yearlyInaccuracyLoss = 121.095 * 52 = 6296.94 -> 6297
        expect(results.yearlyInaccuracyLoss).toBe(6297);

        // totalWeeklyPayroll = 12 * 40 * 15 = 7200
        // payrollErrorRate = 0.015 * 1.3 = 0.0195
        // weeklyPayrollErrors = 7200 * 0.0195 = 140.4
        // yearlyPayrollErrors = 140.4 * 52 = 7300.8 -> 7301
        expect(results.yearlyPayrollErrors).toBe(7301);

        // buddyPunchRate = 0.015
        // weeklyBuddyPunchLoss = 7200 * 0.015 = 108
        // yearlyBuddyPunchLoss = 108 * 52 = 5616
        expect(results.yearlyBuddyPunchLoss).toBe(5616);

        // otRate = 0.08
        // weeklyOTHours = 7200 * 0.08 / 15 = 38.4
        // otMisclassRate = 0.12
        // weeklyOTLoss = 38.4 * 0.12 * 15 * 0.5 = 34.56
        // yearlyOTLoss = 34.56 * 52 = 1797.12 -> 1797
        expect(results.yearlyOTLoss).toBe(1797);

        // adminCost: 5 * 25 * 52 = 6500
        expect(results.yearlyAdminCost).toBe(6500);

        // totalYearlyLoss = 6297 + 7301 + 5616 + 1797 = 21011
        expect(results.totalYearlyLoss).toBe(21011);

        // totalMonthlyLoss = totalYearlyLoss / 52 * 4.33 = 1749 (or direct calculation from weekly: 121.095 + 140.4 + 108 + 34.56 = 404.055 * 4.33 = 1749.56 -> 1750)
        expect(results.totalMonthlyLoss).toBe(1750);

        // Risk Score
        // baseRisk = 40
        // methodRisk = 25 (paper)
        // sizeRisk = min(12 * 0.3, 15) = 3.6
        // siteRisk = min(3 * 1.5, 10) = 4.5
        // riskScore = round(40 + 25 + 3.6 + 4.5) = 73
        expect(results.riskScore).toBe(73);
        expect(results.riskLevel).toBe("Moderate");
    });

    it("verifies risk level changes depending on score thresholds", () => {
        // High risk scenario
        const highRisk = calculateSavings({
            ...STANDARD_INPUTS,
            trackingMethod: "none", // methodRisk = 30
            crewSize: 60, // sizeRisk = 15
            jobSites: 10, // siteRisk = 10
        });
        // 40 + 30 + 15 + 10 = 95
        expect(highRisk.riskScore).toBe(95);
        expect(highRisk.riskLevel).toBe("High");

        // Low risk scenario
        const lowRisk = calculateSavings({
            ...STANDARD_INPUTS,
            trackingMethod: "basic-app", // methodRisk = 5
            crewSize: 3, // sizeRisk = 0.9
            jobSites: 1, // siteRisk = 1.5
        });
        // 40 + 5 + 0.9 + 1.5 = 47.4 -> 47
        expect(lowRisk.riskScore).toBe(47);
        expect(lowRisk.riskLevel).toBe("Low");
    });
});
