import type { LucideIcon } from "lucide-react";
import { AlertTriangle, ArrowRight, Bell, ClipboardCheck, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import ScrollPlaybackVideo from "@/components/ScrollPlaybackVideo";

type InjuryAlertWorkflowSectionProps = {
    eyebrow?: string;
    title?: string;
    description?: string;
    badge?: string;
    steps?: WorkflowStep[];
};

type WorkflowStep = {
    title: string;
    description: string;
    icon: LucideIcon;
};

const workflowSteps = [
    {
        title: "Injury reported from the field",
        description: "A worker marks that they were injured during the shift and adds notes and photos.",
        icon: AlertTriangle,
    },
    {
        title: "Admin notification appears",
        description: "The office gets a clear dashboard notification tied to the worker and shift.",
        icon: Bell,
    },
    {
        title: "Shift review keeps the record together",
        description: "Admins open the shift, review the injury details, and keep photos, notes, and time records connected.",
        icon: ClipboardCheck,
    },
];

export default function InjuryAlertWorkflowSection({
    eyebrow = "Field incident workflow",
    title = "Injury reports reach the office with the shift record attached.",
    description = "When a worker reports an injury, Crewtrace surfaces the notification for admins, links it back to the exact shift, and keeps the worker's photos and notes in the review flow.",
    badge = "Injury alert",
    steps = workflowSteps,
}: InjuryAlertWorkflowSectionProps) {
    return (
        <section className="relative overflow-hidden bg-background py-24 md:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.05)_0%,transparent_70%)]" />

            <div className="layout-shell">
                {/* Header row: copy left, CTA right */}
                <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2 rounded-full border border-red-200/60 bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-red-600">
                            <AlertTriangle size={14} />
                            {eyebrow}
                        </p>
                        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            {title}
                        </h2>
                        <p className="mt-4 text-lg font-medium leading-relaxed text-foreground/60">
                            {description}
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="shrink-0 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                    >
                        See the workflow in your demo
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Workflow steps */}
                <div className="mb-8 grid gap-4 lg:grid-cols-3">
                    {steps.map((step, i) => {
                        const StepIcon = step.icon;

                        return (
                            <div
                                key={step.title}
                                className="flex gap-4 rounded-lg border border-foreground/[0.06] bg-white p-5 transition-shadow hover:shadow-md"
                            >
                                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 ring-1 ring-red-100">
                                    <StepIcon size={18} />
                                    <span className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                                        {i + 1}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground">{step.title}</h3>
                                    <p className="mt-1 text-sm font-medium leading-relaxed text-foreground/55">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Video — the main event */}
                <div className="overflow-hidden rounded-lg border border-foreground/[0.06] bg-white p-2 shadow-2xl shadow-foreground/[0.06] md:p-3">
                    <div className="flex items-center justify-between border-b border-foreground/5 px-4 py-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-foreground/40">
                            <ImageIcon size={14} />
                            Product walkthrough
                        </div>
                        <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 ring-1 ring-red-100">
                            {badge}
                        </span>
                    </div>
                    <ScrollPlaybackVideo
                        src="/videos/injury-alert-workflow.mp4"
                        ariaLabel="Crewtrace injury alert workflow showing admin notification, shift review, and injury details"
                        className="aspect-video w-full rounded-b-md bg-foreground/5 object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
