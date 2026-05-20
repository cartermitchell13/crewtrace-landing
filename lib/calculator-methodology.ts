export const CALCULATOR_BENCHMARK_DISCLAIMER =
    "Calculations based on 2024 construction industry benchmarks from APA, FMI, and AGC research on manual time tracking inaccuracy. Your actual results may vary.";

export const CALCULATOR_METHODOLOGY_ITEMS = [
    {
        title: "Time Discrepancies",
        description:
            "Industry-standard 12-min daily discrepancy per worker (rounding and buddy punching) affecting ~40% of field staff, adjusted by trade and tracking method.",
    },
    {
        title: "Payroll Errors",
        description:
            "Conservative 1.5% base error rate for manual processing, scaled by your tracking method. Includes data entry, miscalculation, and processing mistakes.",
    },
    {
        title: "Site & OT Factors",
        description:
            "Multi-site operations compound discrepancies by ~4% per additional site. Overtime misclassification risk scales with OT frequency and tracking rigor.",
    },
    {
        title: "Recovery Model",
        description:
            "Assumes GPS-verified tracking captures 95% of discrepancies, eliminates 98% of buddy punching, and reduces 80% of administrative overhead.",
    },
] as const;
