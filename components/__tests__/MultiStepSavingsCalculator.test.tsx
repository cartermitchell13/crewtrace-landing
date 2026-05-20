import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import MultiStepSavingsCalculator from "../MultiStepSavingsCalculator";

// Mock calculation results
vi.mock("../../lib/calculator-calculations", () => ({
    calculateSavings: vi.fn(() => ({
        totalYearlyLoss: 15000,
        totalMonthlyLoss: 1250,
        yearlyRecovery: 13500,
        riskScore: 75,
        riskLevel: "High",
        perWorkerMonthlyLoss: 100,
        perWorkerYearlyLoss: 1200,
        truckPayments: "2.0",
        revenueNeededToRecover: 250000,
        workersAffected: 5,
    })),
    TRADE_MULTIPLIERS: { residential: 1 },
    TRACKING_MULTIPLIERS: { paper: 1.3 },
    OVERTIME_MULTIPLIERS: { moderate: 1 },
}));

// Mock framer-motion to render elements synchronously in tests
vi.mock("framer-motion", () => {
    const motion = new Proxy({}, {
        get: (target, prop) => {
            if (typeof prop === "string") {
                const Component = React.forwardRef<HTMLElement, { children?: React.ReactNode; [key: string]: unknown }>((
                    { children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...cleanProps },
                    ref
                ) => {
                    return React.createElement(prop, { ...cleanProps, ref }, children);
                });
                Component.displayName = `motion.${prop}`;
                return Component;
            }
            return (target as Record<string, unknown>)[prop];
        }
    });
    return {
        motion,
        AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
    };
});

describe("MultiStepSavingsCalculator", () => {
    const mockOnComplete = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        delete (window as typeof window & { gtag?: unknown }).gtag;
        global.fetch = vi.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ ok: true, message: "Recorded" }),
            })
        );
        global.ResizeObserver = class {
            observe = vi.fn();
            unobserve = vi.fn();
            disconnect = vi.fn();
            constructor(_callback: ResizeObserverCallback) {}
        } as unknown as typeof ResizeObserver;
    });

    it("renders the teaser cards initially", () => {
        render(<MultiStepSavingsCalculator onComplete={mockOnComplete} />);

        // Should see the teaser title/question
        expect(screen.getByText(/What is your current time tracking method\?/i)).toBeDefined();

        // Should see the choices
        expect(screen.getByText(/Paper Timesheets/i)).toBeDefined();
        expect(screen.getByText(/Spreadsheets/i)).toBeDefined();
        expect(screen.getByText(/Basic App/i)).toBeDefined();
        expect(screen.getByText(/Honor System/i)).toBeDefined();
    });

    it("opens the full screen overlay when a teaser option is clicked", () => {
        render(<MultiStepSavingsCalculator onComplete={mockOnComplete} />);

        const paperOption = screen.getByText(/Paper Timesheets/i);
        fireEvent.click(paperOption);

        // It should open full screen, and we should be on the next step (Trade Type)
        expect(screen.getByText(/Select your trade or project type/i)).toBeDefined();
    });

    it("validates contact fields correctly", async () => {
        render(<MultiStepSavingsCalculator onComplete={mockOnComplete} />);

        // Click teaser to open modal
        fireEvent.click(screen.getByText(/Paper Timesheets/i));

        // Step 2: Trade type -> click Mixed / General Contractor
        fireEvent.click(screen.getByText(/Mixed \/ General Contractor/i));

        // Step 3: Crew Size -> click Next
        fireEvent.click(screen.getByRole("button", { name: /Next/i }));

        // Step 4: Active Job Sites -> click Next
        fireEvent.click(screen.getByRole("button", { name: /Next/i }));

        // Step 5: Average Hourly Rate -> click Next
        fireEvent.click(screen.getByRole("button", { name: /Next/i }));

        // Step 6: Payroll Admin Time -> click Next
        fireEvent.click(screen.getByRole("button", { name: /Next/i }));

        // Step 7: Overtime frequency -> click Sometimes
        fireEvent.click(screen.getByText(/Sometimes/i));

        // Step 8: Contact info — name slide
        expect(screen.getByText(/Who should we address this report to\?/i)).toBeDefined();

        // Submit name step with empty field
        const continueBtn = screen.getByRole("button", { name: /Continue/i });
        fireEvent.click(continueBtn);

        // Should show validation error (name is required)
        expect(screen.getByText(/Name is required/i)).toBeDefined();

        // Fill name and advance through remaining contact slides
        fireEvent.change(screen.getByPlaceholderText(/John Doe/i), { target: { value: "John Doe" } });
        fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

        fireEvent.change(screen.getByPlaceholderText(/Acme Construction/i), { target: { value: "Acme Construction" } });
        fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

        fireEvent.change(screen.getByPlaceholderText(/john@company.com/i), { target: { value: "john@company.com" } });
        fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

        // Final contact slide
        expect(screen.getByText(/What's the best number to reach you\?/i)).toBeDefined();
    });

    it("reports the Google Ads conversion when the final audit button submits valid contact info", async () => {
        const gtag = vi.fn();
        (window as typeof window & { gtag?: typeof gtag }).gtag = gtag;

        render(<MultiStepSavingsCalculator onComplete={mockOnComplete} />);

        fireEvent.click(screen.getByText(/Paper Timesheets/i));
        fireEvent.click(screen.getByText(/Mixed \/ General Contractor/i));
        fireEvent.click(screen.getByRole("button", { name: /Next/i }));
        fireEvent.click(screen.getByRole("button", { name: /Next/i }));
        fireEvent.click(screen.getByRole("button", { name: /Next/i }));
        fireEvent.click(screen.getByRole("button", { name: /Next/i }));
        fireEvent.click(screen.getByText(/Sometimes/i));

        fireEvent.change(screen.getByPlaceholderText(/John Doe/i), { target: { value: "John Doe" } });
        fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

        fireEvent.change(screen.getByPlaceholderText(/Acme Construction/i), { target: { value: "Acme Construction" } });
        fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

        fireEvent.change(screen.getByPlaceholderText(/john@company.com/i), { target: { value: "john@company.com" } });
        fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

        fireEvent.change(screen.getByPlaceholderText(/\(555\) 555-5555/i), { target: { value: "555-555-5555" } });
        fireEvent.click(screen.getByRole("button", { name: /Unlock My Audit/i }));

        await waitFor(() => {
            expect(gtag).toHaveBeenCalledWith("event", "conversion", {
                send_to: "AW-18173086361/FiaZCOzI2bAcEJmVzdID",
            });
        });
    });

    it("locks body scroll when modal is open and unlocks when closed or unmounted", () => {
        const { unmount } = render(<MultiStepSavingsCalculator onComplete={mockOnComplete} />);

        // Initially scroll is not locked
        expect(document.body.style.overflow).toBe("");

        // Click a teaser card to open the modal
        const paperOption = screen.getByText(/Paper Timesheets/i);
        fireEvent.click(paperOption);

        // Scroll should be locked
        expect(document.body.style.overflow).toBe("hidden");

        // Close the modal
        const closeBtn = screen.getByRole("button", { name: /Close calculator/i });
        fireEvent.click(closeBtn);

        // Scroll should be unlocked
        expect(document.body.style.overflow).toBe("");

        // Open modal again
        fireEvent.click(paperOption);
        expect(document.body.style.overflow).toBe("hidden");

        // Unmount component
        unmount();

        // Scroll should be unlocked
        expect(document.body.style.overflow).toBe("");
    });
});
