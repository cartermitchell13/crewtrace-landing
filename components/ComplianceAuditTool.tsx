"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
    ShieldCheck, ShieldAlert, ShieldX, AlertTriangle, CheckCircle2,
    XCircle, AlertCircle, ArrowRight, Loader2, RotateCcw,
    FileText, Clock, MapPin, Users, DollarSign, HardHat,
    Scale, ClipboardList, Zap, PhoneCall
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────

type OptionValue = string;

interface Question {
    id: string;
    category: string;
    categoryIcon: React.ElementType;
    text: string;
    subtext?: string;
    options: { value: OptionValue; label: string; description: string; riskWeight: number }[];
}

type Answers = Record<string, OptionValue>;
type Phase = "intro" | "questions" | "analyzing" | "results";

// ─── Compliance Questions ────────────────────────────────────────

const QUESTIONS: Question[] = [
    {
        id: "tracking_method",
        category: "Time Recording",
        categoryIcon: Clock,
        text: "How do your workers currently record their time?",
        subtext: "This is the single biggest factor in DOL audit outcomes.",
        options: [
            { value: "paper", label: "Paper timesheets", description: "Handwritten, collected weekly or bi-weekly", riskWeight: 85 },
            { value: "honor", label: "Honor system / verbal", description: "Workers report hours verbally or by text", riskWeight: 100 },
            { value: "spreadsheet", label: "Spreadsheets", description: "Excel or Google Sheets, manually entered", riskWeight: 60 },
            { value: "basic_app", label: "Basic clock-in app", description: "Simple digital punch-in, no GPS or verification", riskWeight: 35 },
            { value: "gps_verified", label: "GPS-verified digital tracking", description: "Geofenced clock-ins with tamper-proof logs", riskWeight: 5 },
        ],
    },
    {
        id: "record_retention",
        category: "Record Keeping",
        categoryIcon: FileText,
        text: "How long do you retain payroll and time records?",
        subtext: "FLSA requires a minimum of 3 years. DOL audits can go back further.",
        options: [
            { value: "less_1yr", label: "Less than 1 year", description: "Records are regularly discarded or lost", riskWeight: 100 },
            { value: "1_2yr", label: "1–2 years", description: "Some records kept, but not systematically", riskWeight: 70 },
            { value: "3yr", label: "3 years", description: "Meeting the FLSA minimum requirement", riskWeight: 20 },
            { value: "5yr_plus", label: "5+ years, digitally archived", description: "Exceeding requirements with searchable records", riskWeight: 0 },
        ],
    },
    {
        id: "overtime_tracking",
        category: "Overtime Compliance",
        categoryIcon: DollarSign,
        text: "How do you track and calculate overtime hours?",
        subtext: "Overtime miscalculation is the #1 cause of DOL wage claims.",
        options: [
            { value: "manual_calc", label: "Manually calculated each week", description: "Someone does the math by hand or in a spreadsheet", riskWeight: 80 },
            { value: "no_formal", label: "No formal process", description: "Overtime is estimated or handled case-by-case", riskWeight: 100 },
            { value: "payroll_software", label: "Payroll software calculates it", description: "Software does the math, but hours are entered manually", riskWeight: 40 },
            { value: "automated", label: "Automatically calculated from digital time logs", description: "Hours feed directly into payroll with no manual entry", riskWeight: 5 },
        ],
    },
    {
        id: "prevailing_wage",
        category: "Prevailing Wage",
        categoryIcon: Scale,
        text: "Do you work on public/government projects subject to prevailing wage laws?",
        subtext: "Davis-Bacon Act violations carry back-pay liability plus debarment risk.",
        options: [
            { value: "yes_no_system", label: "Yes — but we track it manually", description: "We do government work but don't have a dedicated system", riskWeight: 90 },
            { value: "yes_with_system", label: "Yes — with a compliant tracking system", description: "We have documented, verifiable prevailing wage records", riskWeight: 10 },
            { value: "no", label: "No — only private projects", description: "We don't work on public or government contracts", riskWeight: 0 },
            { value: "unsure", label: "Not sure / sometimes", description: "We may do some public work but aren't certain of requirements", riskWeight: 75 },
        ],
    },
    {
        id: "location_verification",
        category: "Job Site Verification",
        categoryIcon: MapPin,
        text: "Can you verify exactly when and where each worker clocked in?",
        subtext: "Location verification is critical for multi-site operations and audit defense.",
        options: [
            { value: "no_way", label: "No — we take workers' word for it", description: "No way to verify location or exact start time", riskWeight: 90 },
            { value: "supervisor", label: "Supervisor sign-off only", description: "A supervisor confirms hours, but no digital record", riskWeight: 65 },
            { value: "basic_digital", label: "Digital records, but no location data", description: "We know when, but not where workers clocked in", riskWeight: 40 },
            { value: "gps_verified", label: "GPS-verified with timestamped logs", description: "Every clock-in is tied to a location and timestamp", riskWeight: 0 },
        ],
    },
    {
        id: "dispute_resolution",
        category: "Dispute Defense",
        categoryIcon: ClipboardList,
        text: "If a worker disputed their hours, how quickly could you produce records?",
        subtext: "DOL investigators expect records within 72 hours. Inability to produce them is itself a violation.",
        options: [
            { value: "days_weeks", label: "Days or weeks — records are scattered", description: "We'd have to dig through paper files or emails", riskWeight: 90 },
            { value: "few_days", label: "A few days with some effort", description: "Records exist but aren't easily accessible", riskWeight: 55 },
            { value: "same_day", label: "Same day — we have digital records", description: "Records are stored digitally and searchable", riskWeight: 20 },
            { value: "instant", label: "Instantly — with a full audit trail", description: "Real-time logs with complete history available on demand", riskWeight: 0 },
        ],
    },
    {
        id: "crew_size",
        category: "Exposure Scale",
        categoryIcon: Users,
        text: "How many field workers are on your payroll?",
        subtext: "Larger crews multiply your compliance exposure with every non-compliant hour.",
        options: [
            { value: "1_5", label: "1–5 workers", description: "Small crew, lower total exposure", riskWeight: 10 },
            { value: "6_15", label: "6–15 workers", description: "Mid-size crew, moderate exposure", riskWeight: 30 },
            { value: "16_40", label: "16–40 workers", description: "Large crew, significant exposure", riskWeight: 60 },
            { value: "40_plus", label: "40+ workers", description: "Enterprise scale, maximum audit risk", riskWeight: 85 },
        ],
    },
];

// ─── Scoring & Results Logic ─────────────────────────────────────

interface ComplianceArea {
    name: string;
    icon: React.ElementType;
    status: "compliant" | "at-risk" | "non-compliant";
    finding: string;
    fix: string;
    regulation: string;
}

interface AuditResults {
    overallScore: number; // 0-100, higher = more compliant
    riskLevel: "Low" | "Moderate" | "High" | "Critical";
    areas: ComplianceArea[];
    estimatedFineExposure: string;
    headline: string;
    subheadline: string;
}

function computeResults(answers: Answers): AuditResults {
    const areas: ComplianceArea[] = [];

    // 1. Time Recording
    const trackingRisk = QUESTIONS[0].options.find(o => o.value === answers.tracking_method)?.riskWeight ?? 50;
    areas.push({
        name: "Time Recording Method",
        icon: Clock,
        status: trackingRisk >= 70 ? "non-compliant" : trackingRisk >= 30 ? "at-risk" : "compliant",
        finding: trackingRisk >= 70
            ? "Your current method cannot produce verifiable time records — a direct FLSA violation."
            : trackingRisk >= 30
                ? "Your records may be challenged. Manual entry creates gaps that auditors exploit."
                : "GPS-verified digital records meet and exceed DOL documentation standards.",
        fix: trackingRisk >= 30
            ? "Implement GPS-verified digital clock-ins that create tamper-proof, timestamped records for every shift."
            : "You're in good shape here. Ensure records are backed up and retained for 3+ years.",
        regulation: "FLSA § 516 — Employers must maintain accurate time records for all non-exempt employees.",
    });

    // 2. Record Retention
    const retentionRisk = QUESTIONS[1].options.find(o => o.value === answers.record_retention)?.riskWeight ?? 50;
    areas.push({
        name: "Record Retention",
        icon: FileText,
        status: retentionRisk >= 70 ? "non-compliant" : retentionRisk >= 20 ? "at-risk" : "compliant",
        finding: retentionRisk >= 70
            ? "Retaining records for less than 3 years is a direct FLSA violation. You have no audit defense."
            : retentionRisk >= 20
                ? "You're meeting minimum requirements, but paper records are vulnerable to loss and tampering."
                : "Your retention policy meets or exceeds federal requirements.",
        fix: retentionRisk >= 20
            ? "Migrate to a digital system that automatically archives records for 5+ years with searchable history."
            : "Continue your current practice. Consider cloud backup for disaster recovery.",
        regulation: "FLSA § 516.5 — Payroll records must be retained for at least 3 years; basic employment records for 2 years.",
    });

    // 3. Overtime
    const overtimeRisk = QUESTIONS[2].options.find(o => o.value === answers.overtime_tracking)?.riskWeight ?? 50;
    areas.push({
        name: "Overtime Calculation",
        icon: DollarSign,
        status: overtimeRisk >= 70 ? "non-compliant" : overtimeRisk >= 30 ? "at-risk" : "compliant",
        finding: overtimeRisk >= 70
            ? "Manual or absent overtime tracking is the #1 source of DOL wage claims. You're highly exposed."
            : overtimeRisk >= 30
                ? "Manual data entry into payroll software creates errors. Even small miscalculations compound into major liability."
                : "Automated overtime calculation from verified time logs is the gold standard.",
        fix: overtimeRisk >= 30
            ? "Connect your time tracking directly to payroll. Eliminate manual entry to remove human error from OT calculations."
            : "Ensure your automated system handles state-specific OT rules (daily OT in CA, for example).",
        regulation: "FLSA § 207 — Non-exempt employees must receive 1.5x pay for hours over 40/week. Violations carry 2-year back-pay liability.",
    });

    // 4. Prevailing Wage
    const prevailingRisk = QUESTIONS[3].options.find(o => o.value === answers.prevailing_wage)?.riskWeight ?? 0;
    if (answers.prevailing_wage !== "no") {
        areas.push({
            name: "Prevailing Wage Compliance",
            icon: Scale,
            status: prevailingRisk >= 70 ? "non-compliant" : prevailingRisk >= 20 ? "at-risk" : "compliant",
            finding: prevailingRisk >= 70
                ? "Working on public projects without a compliant prevailing wage system is a federal violation. Debarment risk is real."
                : prevailingRisk >= 20
                    ? "You have a system, but manual tracking creates documentation gaps that can fail a DOL audit."
                    : "Your prevailing wage tracking meets Davis-Bacon documentation requirements.",
            fix: prevailingRisk >= 20
                ? "Implement certified payroll reporting with digital records tied to specific projects and workers."
                : "Ensure your records include all required Davis-Bacon fringe benefit documentation.",
            regulation: "Davis-Bacon Act — Contractors on federal projects must pay prevailing wages and maintain certified payroll records.",
        });
    }

    // 5. Location Verification
    const locationRisk = QUESTIONS[4].options.find(o => o.value === answers.location_verification)?.riskWeight ?? 50;
    areas.push({
        name: "Job Site Verification",
        icon: MapPin,
        status: locationRisk >= 70 ? "non-compliant" : locationRisk >= 30 ? "at-risk" : "compliant",
        finding: locationRisk >= 70
            ? "No location verification means you cannot prove workers were on-site when they claim. This is indefensible in an audit."
            : locationRisk >= 30
                ? "Without location data, you can verify when but not where. Multi-site operations need both."
                : "GPS-verified clock-ins provide the location proof needed to defend against false claims.",
        fix: locationRisk >= 30
            ? "Add geofenced clock-ins to your process. Workers can only clock in when physically within the job site boundary."
            : "Ensure geofence boundaries are properly configured for each job site.",
        regulation: "DOL Audit Standard — Investigators expect employers to demonstrate workers were at the claimed location during paid hours.",
    });

    // 6. Dispute Defense
    const disputeRisk = QUESTIONS[5].options.find(o => o.value === answers.dispute_resolution)?.riskWeight ?? 50;
    areas.push({
        name: "Audit Readiness",
        icon: ClipboardList,
        status: disputeRisk >= 70 ? "non-compliant" : disputeRisk >= 30 ? "at-risk" : "compliant",
        finding: disputeRisk >= 70
            ? "Inability to produce records quickly signals to investigators that records may not exist. This accelerates enforcement."
            : disputeRisk >= 30
                ? "Delayed record production gives investigators time to build a case before you can mount a defense."
                : "Instant access to complete audit trails is your strongest defense in any investigation.",
        fix: disputeRisk >= 30
            ? "Centralize all time records in a searchable digital system. You should be able to pull any worker's history in under 60 seconds."
            : "Run a mock audit drill annually. Confirm you can produce 3 years of records within 24 hours.",
        regulation: "DOL Investigation Protocol — Employers are expected to produce records promptly. Delays are treated as evidence of non-compliance.",
    });

    // Overall score calculation
    const relevantQuestions = QUESTIONS.filter(q =>
        q.id !== "prevailing_wage" || answers.prevailing_wage !== "no"
    );
    const totalRisk = relevantQuestions.reduce((sum, q) => {
        const risk = q.options.find(o => o.value === answers[q.id])?.riskWeight ?? 50;
        return sum + risk;
    }, 0);
    const maxRisk = relevantQuestions.length * 100;
    const avgRisk = totalRisk / maxRisk;
    const overallScore = Math.round((1 - avgRisk) * 100);

    const riskLevel: AuditResults["riskLevel"] =
        overallScore >= 80 ? "Low" :
            overallScore >= 55 ? "Moderate" :
                overallScore >= 30 ? "High" : "Critical";

    // Fine exposure estimate
    const crewRisk = QUESTIONS[6].options.find(o => o.value === answers.crew_size)?.riskWeight ?? 30;
    const crewMultiplier = crewRisk >= 60 ? 4 : crewRisk >= 30 ? 2.5 : crewRisk >= 10 ? 1.5 : 1;
    const baseFine = avgRisk >= 0.7 ? 45000 : avgRisk >= 0.5 ? 22000 : avgRisk >= 0.3 ? 10000 : 3000;
    const estimatedFine = Math.round(baseFine * crewMultiplier / 1000) * 1000;

    const headline =
        riskLevel === "Critical" ? "Your operation is not compliant." :
            riskLevel === "High" ? "Significant compliance gaps found." :
                riskLevel === "Moderate" ? "You have exploitable vulnerabilities." :
                    "You're mostly compliant — with room to improve.";

    const subheadline =
        riskLevel === "Critical" ? "Based on your answers, a DOL audit would likely result in back-pay orders and penalties. Here's what needs to change immediately." :
            riskLevel === "High" ? "Multiple compliance gaps create real audit risk. The good news: all of these are fixable with the right system." :
                riskLevel === "Moderate" ? "Your records would hold up to basic scrutiny, but a determined investigator would find gaps. Here's where to focus." :
                    "Your practices are solid. A few targeted improvements would make you audit-proof.";

    return {
        overallScore,
        riskLevel,
        areas,
        estimatedFineExposure: `$${estimatedFine.toLocaleString()}`,
        headline,
        subheadline,
    };
}

// ─── Sub-components ──────────────────────────────────────────────

interface OptionButtonProps {
    label: string;
    description: string;
    selected: boolean;
    onClick: () => void;
}

const OptionButton = ({ label, description, selected, onClick }: OptionButtonProps) => (
    <button
        type="button"
        onClick={onClick}
        className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 group ${selected
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-foreground/8 bg-white hover:border-foreground/15 hover:bg-foreground/[0.02]"
            }`}
    >
        <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${selected ? "border-primary bg-primary" : "border-foreground/20"}`}>
                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div>
                <div className={`text-sm font-bold transition-colors duration-200 ${selected ? "text-primary" : "text-foreground/80"}`}>{label}</div>
                <div className="text-[11px] text-foreground/40 font-medium mt-0.5 leading-relaxed">{description}</div>
            </div>
        </div>
    </button>
);

interface StatusBadgeProps {
    status: "compliant" | "at-risk" | "non-compliant";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const config = {
        "compliant": { label: "Compliant", className: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: CheckCircle2 },
        "at-risk": { label: "At Risk", className: "bg-amber-50 text-amber-700 border-amber-100", icon: AlertCircle },
        "non-compliant": { label: "Non-Compliant", className: "bg-red-50 text-red-700 border-red-100", icon: XCircle },
    };
    const { label, className, icon: Icon } = config[status];
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${className}`}>
            <Icon size={11} />
            {label}
        </span>
    );
};

const LoadingStep = ({ label, active, completed }: { label: string; active: boolean; completed: boolean }) => (
    <div className={`flex items-center gap-3 py-3 transition-all duration-500 ${active ? "opacity-100" : completed ? "opacity-50" : "opacity-20"}`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${completed ? "bg-primary text-white" : active ? "bg-primary/10 text-primary" : "bg-foreground/5 text-foreground/20"}`}>
            {completed ? <CheckCircle2 size={14} /> : active ? <Loader2 size={14} className="animate-spin" /> : <div className="w-2 h-2 rounded-full bg-current" />}
        </div>
        <span className={`text-sm font-semibold transition-colors duration-300 ${active ? "text-foreground" : completed ? "text-foreground/50" : "text-foreground/20"}`}>{label}</span>
    </div>
);

// ─── Main Component ──────────────────────────────────────────────

export default function ComplianceAuditTool() {
    const [phase, setPhase] = useState<Phase>("intro");
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [loadingStep, setLoadingStep] = useState(0);
    const [results, setResults] = useState<AuditResults | null>(null);
    const analyzerRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const ANALYZING_STEPS = [
        "Reviewing your time recording method...",
        "Checking record retention against FLSA requirements...",
        "Analyzing overtime calculation risk...",
        "Assessing job site verification coverage...",
        "Benchmarking against DOL audit triggers...",
        "Generating your compliance report...",
    ];

    const currentQuestion = QUESTIONS[currentQ];
    const selectedAnswer = answers[currentQuestion?.id];
    const progress = ((currentQ) / QUESTIONS.length) * 100;

    const handleAnswer = useCallback((value: OptionValue) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    }, [currentQuestion?.id]);

    const handleNext = useCallback(() => {
        if (currentQ < QUESTIONS.length - 1) {
            setCurrentQ(q => q + 1);
        } else {
            // All questions answered — start analysis
            setPhase("analyzing");
            setLoadingStep(0);
        }
    }, [currentQ]);

    const handleBack = useCallback(() => {
        if (currentQ > 0) {
            setCurrentQ(q => q - 1);
        } else {
            setPhase("intro");
        }
    }, [currentQ]);

    const handleReset = useCallback(() => {
        setPhase("intro");
        setCurrentQ(0);
        setAnswers({});
        setLoadingStep(0);
        setResults(null);
    }, []);

    // Loading sequence
    useEffect(() => {
        if (phase !== "analyzing") return;
        if (loadingStep < ANALYZING_STEPS.length) {
            const delay = loadingStep === ANALYZING_STEPS.length - 1 ? 1000 : 700 + Math.random() * 500;
            const timer = setTimeout(() => setLoadingStep(s => s + 1), delay);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setResults(computeResults(answers));
                setPhase("results");
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [phase, loadingStep, answers]);

    // Scroll to analyzer when it appears
    useEffect(() => {
        if (phase === "analyzing") {
            const frameId = requestAnimationFrame(() => {
                analyzerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            });
            return () => cancelAnimationFrame(frameId);
        }
    }, [phase]);

    // Scroll to results when they appear
    useEffect(() => {
        if (phase === "results") {
            const frameId = requestAnimationFrame(() => {
                resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
            return () => cancelAnimationFrame(frameId);
        }
    }, [phase]);

    // ─── PHASE: Intro ────────────────────────────────────────────

    if (phase === "intro") {
        return (
            <section id="compliance-audit" className="py-32 px-6 bg-[#FBFBFE] relative overflow-hidden scroll-mt-32">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-3xl mx-auto relative z-10">
                    <div className="bg-white rounded-[2.5rem] border border-foreground/5 p-8 md:p-14 shadow-sm ring-1 ring-foreground/5">
                        <div className="space-y-8">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest">
                                <AlertTriangle size={12} />
                                <span>Free Compliance Audit</span>
                            </div>

                            {/* Headline */}
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
                                    Is your time-tracking<br />
                                    <span className="text-primary">actually compliant?</span>
                                </h2>
                                <p className="text-base md:text-lg text-foreground/50 font-medium leading-relaxed max-w-xl">
                                    Answer 7 questions about how you currently track time. We'll score your operation against FLSA, Davis-Bacon, and DOL audit standards — and show you exactly where you're exposed.
                                </p>
                            </div>

                            {/* What you'll get */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { icon: ShieldCheck, label: "Compliance Score", desc: "0–100 rating across 6 risk areas" },
                                    { icon: AlertTriangle, label: "Risk Findings", desc: "Specific violations you may be committing" },
                                    { icon: Zap, label: "Fix Roadmap", desc: "Exactly what to do to get compliant" },
                                ].map(({ icon: Icon, label, desc }) => (
                                    <div key={label} className="p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/5">
                                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                                            <Icon size={16} />
                                        </div>
                                        <div className="text-sm font-bold text-foreground">{label}</div>
                                        <div className="text-[11px] text-foreground/40 font-medium mt-0.5">{desc}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Trust signals */}
                            <div className="flex flex-wrap gap-6 pt-2">
                                {[
                                    { icon: CheckCircle2, text: "100% Free — No Email Required" },
                                    { icon: CheckCircle2, text: "Takes Under 2 Minutes" },
                                    { icon: CheckCircle2, text: "Based on Real DOL Audit Standards" },
                                ].map(({ icon: Icon, text }) => (
                                    <div key={text} className="flex items-center gap-2 text-sm font-bold text-foreground/40">
                                        <Icon size={16} className="text-primary" />
                                        <span>{text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                id="start-compliance-audit"
                                onClick={() => setPhase("questions")}
                                className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg group"
                            >
                                <ShieldCheck size={20} />
                                Run My Compliance Audit
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-center text-[11px] text-foreground/30 font-medium">
                                No account needed. Results are instant and private.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ─── PHASE: Questions ────────────────────────────────────────

    if (phase === "questions") {
        const CategoryIcon = currentQuestion.categoryIcon;
        return (
            <section id="compliance-audit" className="py-32 px-6 bg-[#FBFBFE] relative overflow-hidden scroll-mt-32">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-2xl mx-auto relative z-10">
                    <div className="bg-white rounded-[2.5rem] border border-foreground/5 p-8 md:p-12 shadow-sm ring-1 ring-foreground/5">

                        {/* Progress */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                                    Question {currentQ + 1} of {QUESTIONS.length}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                    {Math.round(progress)}% complete
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-foreground/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <CategoryIcon size={15} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                                {currentQuestion.category}
                            </span>
                        </div>

                        {/* Question */}
                        <div className="mb-8 space-y-2">
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-[1.2] text-foreground">
                                {currentQuestion.text}
                            </h2>
                            {currentQuestion.subtext && (
                                <p className="text-sm text-foreground/40 font-medium leading-relaxed">
                                    {currentQuestion.subtext}
                                </p>
                            )}
                        </div>

                        {/* Options */}
                        <div className="space-y-3 mb-10">
                            {currentQuestion.options.map((opt) => (
                                <OptionButton
                                    key={opt.value}
                                    label={opt.label}
                                    description={opt.description}
                                    selected={selectedAnswer === opt.value}
                                    onClick={() => handleAnswer(opt.value)}
                                />
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleBack}
                                className="px-6 py-4 rounded-2xl border border-foreground/10 text-sm font-bold text-foreground/50 hover:text-foreground/80 hover:border-foreground/20 transition-all"
                            >
                                Back
                            </button>
                            <button
                                id={`audit-next-q${currentQ + 1}`}
                                onClick={handleNext}
                                disabled={!selectedAnswer}
                                className="flex-1 bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100 group"
                            >
                                {currentQ < QUESTIONS.length - 1 ? "Next Question" : "Run My Audit"}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform group-disabled:translate-x-0" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ─── PHASE: Analyzing ────────────────────────────────────────

    if (phase === "analyzing") {
        return (
            <section id="compliance-audit" className="py-32 px-6 bg-[#FBFBFE] relative overflow-hidden scroll-mt-32">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="max-w-xl mx-auto relative z-10">
                    <div ref={analyzerRef} className="bg-white rounded-[2.5rem] border border-foreground/5 p-10 md:p-14 shadow-sm ring-1 ring-foreground/5">
                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <Loader2 size={28} className="text-primary animate-spin" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                                Analyzing your operation...
                            </h2>
                            <p className="text-sm text-foreground/40 font-medium">
                                Cross-referencing your answers against DOL audit standards
                            </p>
                        </div>

                        <div className="space-y-1 mb-10">
                            {ANALYZING_STEPS.map((step, i) => (
                                <LoadingStep
                                    key={step}
                                    label={step}
                                    active={loadingStep === i}
                                    completed={loadingStep > i}
                                />
                            ))}
                        </div>

                        <div className="w-full h-2 bg-foreground/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${Math.min((loadingStep / ANALYZING_STEPS.length) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ─── PHASE: Results ──────────────────────────────────────────

    if (!results) return null;

    const scoreColor =
        results.riskLevel === "Critical" ? "#dc2626" :
            results.riskLevel === "High" ? "#f59e0b" :
                results.riskLevel === "Moderate" ? "#f59e0b" : "#22c55e";

    const ScoreIcon =
        results.riskLevel === "Critical" ? ShieldX :
            results.riskLevel === "High" ? ShieldAlert :
                results.riskLevel === "Moderate" ? ShieldAlert : ShieldCheck;

    const nonCompliantCount = results.areas.filter(a => a.status === "non-compliant").length;
    const atRiskCount = results.areas.filter(a => a.status === "at-risk").length;

    return (
        <section id="compliance-audit" className="py-20 px-6 bg-[#FBFBFE] relative overflow-hidden scroll-mt-32">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div ref={resultsRef} className="max-w-5xl mx-auto relative z-10 space-y-6">

                {/* Report Header */}
                <div className="bg-white rounded-[2.5rem] border border-foreground/5 p-8 md:p-12 shadow-sm ring-1 ring-foreground/5">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                                <CheckCircle2 size={12} />
                                <span>Audit Complete</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] text-foreground">
                                Your Compliance Report
                            </h2>
                            <p className="text-sm text-foreground/40 font-medium">
                                Based on your answers &middot; {results.areas.length} areas reviewed &middot; {nonCompliantCount} violations found
                            </p>
                        </div>
                        <button
                            id="audit-reset"
                            onClick={handleReset}
                            className="text-sm font-bold text-foreground/40 hover:text-primary transition-colors flex items-center gap-1.5 shrink-0"
                        >
                            <RotateCcw size={14} />
                            Retake audit
                        </button>
                    </div>
                </div>

                {/* Score + Risk Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Compliance Score */}
                    <div className="bg-white rounded-[2rem] border border-foreground/5 p-8 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-4">Compliance Score</div>
                        <div className="relative w-32 h-32 mb-4">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="8" />
                                <circle
                                    cx="50" cy="50" r="42" fill="none"
                                    stroke={scoreColor}
                                    strokeWidth="8" strokeLinecap="round"
                                    strokeDasharray={`${results.overallScore * 2.64} 264`}
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-3xl font-bold tracking-tight">{results.overallScore}</div>
                                <div className="text-[10px] font-bold text-foreground/40">/100</div>
                            </div>
                        </div>
                        <div
                            className="text-sm font-bold px-3 py-1 rounded-full"
                            style={{
                                backgroundColor: `${scoreColor}15`,
                                color: scoreColor,
                            }}
                        >
                            {results.riskLevel} Risk
                        </div>
                    </div>

                    {/* Verdict */}
                    <div className="md:col-span-2 rounded-[2rem] border-2 p-8 md:p-10 relative overflow-hidden"
                        style={{ borderColor: `${scoreColor}30`, backgroundColor: `${scoreColor}05` }}>
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <ScoreIcon size={120} strokeWidth={1} style={{ color: scoreColor }} />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <div className="flex flex-wrap gap-3">
                                {nonCompliantCount > 0 && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[11px] font-bold border border-red-100">
                                        <XCircle size={12} />
                                        {nonCompliantCount} violation{nonCompliantCount > 1 ? "s" : ""} found
                                    </span>
                                )}
                                {atRiskCount > 0 && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[11px] font-bold border border-amber-100">
                                        <AlertCircle size={12} />
                                        {atRiskCount} area{atRiskCount > 1 ? "s" : ""} at risk
                                    </span>
                                )}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-tight">
                                {results.headline}
                            </h3>
                            <p className="text-base text-foreground/60 font-medium leading-relaxed">
                                {results.subheadline}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Fine Exposure */}
                {(results.riskLevel === "High" || results.riskLevel === "Critical" || results.riskLevel === "Moderate") && (
                    <div className="bg-white rounded-[2rem] border-2 border-red-100 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                            <AlertTriangle size={22} className="text-red-500" />
                        </div>
                        <div className="flex-1">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mb-1">Estimated Fine Exposure</div>
                            <div className="text-3xl font-bold text-red-600 tracking-tight">{results.estimatedFineExposure}</div>
                            <div className="text-sm text-foreground/40 font-medium mt-1">
                                Based on your crew size and compliance gaps. DOL back-pay orders can go back 2–3 years.
                            </div>
                        </div>
                        <div className="text-[11px] text-foreground/30 font-medium max-w-xs leading-relaxed">
                            This is an estimate based on industry averages. Actual penalties depend on violation severity and DOL discretion.
                        </div>
                    </div>
                )}

                {/* Compliance Area Breakdown */}
                <div className="bg-white rounded-[2rem] border border-foreground/5 p-8 md:p-10 shadow-sm space-y-6">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight text-foreground">Findings by Compliance Area</h3>
                        <p className="text-sm text-foreground/40 font-medium mt-1">Each area reviewed against federal DOL standards</p>
                    </div>

                    <div className="space-y-5">
                        {results.areas.map((area) => {
                            const AreaIcon = area.icon;
                            return (
                                <div key={area.name} className="rounded-2xl border border-foreground/5 overflow-hidden">
                                    {/* Area Header */}
                                    <div className={`flex items-center justify-between p-5 ${area.status === "non-compliant"
                                        ? "bg-red-50/50"
                                        : area.status === "at-risk"
                                            ? "bg-amber-50/50"
                                            : "bg-emerald-50/30"
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${area.status === "non-compliant"
                                                ? "bg-red-100 text-red-600"
                                                : area.status === "at-risk"
                                                    ? "bg-amber-100 text-amber-600"
                                                    : "bg-emerald-100 text-emerald-600"
                                                }`}>
                                                <AreaIcon size={16} />
                                            </div>
                                            <span className="text-sm font-bold text-foreground">{area.name}</span>
                                        </div>
                                        <StatusBadge status={area.status} />
                                    </div>

                                    {/* Area Details */}
                                    <div className="p-5 space-y-4">
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1.5">Finding</div>
                                            <p className="text-sm text-foreground/70 font-medium leading-relaxed">{area.finding}</p>
                                        </div>
                                        {area.status !== "compliant" && (
                                            <div>
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1.5">How to Fix It</div>
                                                <p className="text-sm text-foreground/60 font-medium leading-relaxed">{area.fix}</p>
                                            </div>
                                        )}
                                        <div className="pt-3 border-t border-foreground/5">
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/25 mb-1">Regulation</div>
                                            <p className="text-[11px] text-foreground/35 font-medium leading-relaxed italic">{area.regulation}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-primary rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                        <div className="flex-1 space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-bold tracking-wider uppercase">
                                <HardHat size={12} />
                                Crewtrace Fixes All of This
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold leading-tight">
                                {results.riskLevel === "Low"
                                    ? "You're close to audit-proof. Let's get you there."
                                    : "Every gap in your report gets closed with Crewtrace."}
                            </h3>
                            <p className="text-white/70 font-medium leading-relaxed">
                                GPS-verified clock-ins. Tamper-proof records. Automated overtime. Instant audit exports.
                                Everything the DOL wants to see — built for construction crews.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                {["GPS-verified clock-ins", "3-year digital archive", "Automated OT calculation", "One-click audit export"].map(feat => (
                                    <div key={feat} className="flex items-center gap-2 text-sm font-bold text-white/80">
                                        <CheckCircle2 size={14} className="text-secondary" />
                                        {feat}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 shrink-0 w-full md:w-auto">
                            <a
                                id="audit-cta-book-call"
                                href="https://cal.com/crewtrace/15min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-8 py-5 rounded-2xl shadow-button hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 transition-all text-base whitespace-nowrap"
                            >
                                <PhoneCall size={18} />
                                Book a Free 15-Min Call
                            </a>
                            <p className="text-center text-white/40 text-[11px] font-medium">
                                No pressure. We'll walk through your specific gaps.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-3 px-2">
                    <AlertCircle size={14} className="text-foreground/20 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-foreground/30 leading-normal font-medium italic">
                        This audit is for informational purposes only and does not constitute legal advice. Results are based on self-reported information and general DOL standards. Consult a labor attorney for specific compliance guidance.
                    </p>
                </div>
            </div>
        </section>
    );
}
