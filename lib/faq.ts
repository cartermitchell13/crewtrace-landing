export type FaqItem = {
    question: string;
    answer: string;
};

export const homeFaqItems: FaqItem[] = [
    {
        question: "How does GPS time tracking work for construction crews?",
        answer: "Workers download the Crewtrace app on their phone and clock in with a single tap when they arrive at the job site. The app records their GPS location and verifies they are within the designated work zone. When they clock out, the same verification happens. All hours are automatically calculated and ready for payroll export.",
    },
    {
        question: "Is Crewtrace crew tracking and crew location tracking software?",
        answer: "Yes. Crewtrace is built for crew tracking on job sites: clock-ins are tied to verified locations so you can see when crews arrived, how long they stayed on site, and where time exceptions occurred. GPS is used to validate clock events—not to track people continuously when they are off the clock.",
    },
    {
        question: "What is geofencing and how does it prevent time theft?",
        answer: "Geofencing creates a virtual boundary around your job site. Workers can only clock in when their phone's GPS confirms they are physically within that boundary. This eliminates buddy punching, early clock-ins from the parking lot, and inflated hours — the most common forms of construction time theft.",
    },
    {
        question: "My guys can barely use their phones. Will they actually use this?",
        answer: "Yes. We keep it simple for field crews. They install the iOS or Android app once, sign in, and clock in with a single tap.",
    },
    {
        question: "What if there is no cell reception on the job site?",
        answer: "The clock-in records locally on the phone and syncs automatically when signal returns. This is designed for active construction sites, not ideal network conditions.",
    },
    {
        question: "How does Crewtrace compare to paper timesheets?",
        answer: "Paper timesheets cost the average contractor $20,000-40,000 per year in time theft, payroll errors, and admin time. Crewtrace replaces that with GPS-verified digital records that are accurate, audit-ready, and export directly to your payroll software. Most contractors see ROI within the first two weeks.",
    },
    {
        question: "How much does construction time tracking software cost?",
        answer: "Before quoting anything, we run a free audit call to confirm we can save money. For qualified teams, pricing is a one-time setup fee plus a monthly fee. The average contractor saves $1,200+ per month, so the software pays for itself many times over.",
    },
    {
        question: "What if this does not pay for itself?",
        answer: "The process is structured to reduce payroll leakage quickly. If the expected value is not there, we recommend not switching.",
    },
    {
        question: "Do I have to set all this up myself?",
        answer: "No. Crewtrace handles roster setup, job-site configuration, and onboarding support so teams can start without heavy admin overhead.",
    },
    {
        question: "What if a worker forgets to clock in or out?",
        answer: "You get notified and can adjust or flag for review. GPS verification removes most disputes over when someone actually arrived.",
    },
];

export const featuresHubFaqItems: FaqItem[] = [
    {
        question: "Which feature should I deploy first?",
        answer: "Start with the workflow that addresses your biggest payroll risk today. If crews are clocking in from unverified locations, deploy GPS Time Tracking first. If you are spending most of Thursday chasing timesheets, start with Payroll Exports. The features are designed to work independently, so you do not need all six running on day one.",
    },
    {
        question: "Do I need all six features at once?",
        answer: "No. Each feature workflow operates independently. Most teams start with one or two — typically GPS Time Tracking and Payroll Leakage Prevention — and add adjacent workflows as their process matures. The ecosystem links on each feature page show which workflows compose naturally together.",
    },
    {
        question: "How long does a single feature take to roll out?",
        answer: "Most single-feature deployments take one to two weeks from configuration to active use. GPS Time Tracking and Geofencing are the fastest because they require minimal back-office setup. Payroll Exports may take slightly longer if your payroll processor requires a specific file format.",
    },
    {
        question: "What is the difference between GPS Time Tracking and Geofencing?",
        answer: "GPS Time Tracking records the crew member's location at the moment of clock-in and clock-out. Geofencing adds an enforcement layer — it creates a virtual boundary around the job site and restricts clock-ins to workers who are physically inside that boundary. Think of GPS as the evidence and geofencing as the rule.",
    },
    {
        question: "Will these features work for crews across multiple job sites?",
        answer: "Yes. Each feature was built for contractors running multiple crews across multiple active sites. Geofence zones, overtime thresholds, and export templates can all be configured per project or per crew.",
    },
];

export const industriesHubFaqItems: FaqItem[] = [
    {
        question: "What if my trade is not listed?",
        answer: "The eight industries shown are the most common trades using Crewtrace today, but the platform works for any field-based team with hourly workers. If your trade involves crews moving between job sites, clocking in from the field, and exporting hours to payroll, the workflows translate directly. Reach out and we can map a rollout path for your specific operation.",
    },
    {
        question: "Do you support multi-trade contractors?",
        answer: "Yes. General contractors and companies running mixed crews (e.g., plumbing and HVAC under one roof) can configure separate geofence zones, overtime rules, and payroll export templates per trade. The industry pages help you see how each trade's risk profile differs so you can prioritize the highest-ROI rollout order.",
    },
    {
        question: "Why do some trades have a priority badge?",
        answer: "Priority trades are the industries where payroll leakage and compliance risk are highest based on DOL enforcement data and our customer base. Roofing, waterproofing, and general contractors tend to have the most exposure because they run multiple crews across dispersed sites with high overtime and prevailing-wage requirements.",
    },
    {
        question: "How are the industry-specific stats calculated?",
        answer: "The stats shown on each industry page come from a combination of DOL enforcement statistics, Bureau of Labor Statistics data for that trade, and anonymized aggregated data from Crewtrace customers in that industry. Individual results vary based on crew size, hourly rate, and payroll complexity.",
    },
    {
        question: "Can I see how Crewtrace works for my specific trade before committing?",
        answer: "Yes. The contact page lets you describe your crew setup, and we respond with a personalized walkthrough showing how the workflows would apply to your trade. If it is not a fit, we tell you directly.",
    },
];

export const guidesHubFaqItems: FaqItem[] = [
    {
        question: "Are these guides free?",
        answer: "Yes. Every guide on this page is free to read in full. No email gate, no paywall. They are written to be genuinely useful whether or not you end up using Crewtrace.",
    },
    {
        question: "How long does implementation actually take?",
        answer: "For a team of 10–25 field workers rolling out GPS Time Tracking as the first workflow, most are fully operational within two weeks. The Implementation Guide walks through the exact sequence — audit, configuration, pilot, and full rollout — with time estimates for each phase.",
    },
    {
        question: "Do you update these guides when regulations change?",
        answer: "Yes. The DOL compliance guide is reviewed at least quarterly to reflect changes to FLSA recordkeeping requirements, prevailing wage rules, and state-level overtime regulations. Each guide shows its last-reviewed date at the top.",
    },
    {
        question: "Should I read the Implementation Guide or the DOL Compliance Guide first?",
        answer: "If you are actively shopping for time tracking software, start with the Implementation Guide — it helps you evaluate whether your current process actually needs replacing. If you already have a DOL audit on the horizon or compliance concerns, start with the DOL Compliance Guide to understand what records you need to have ready.",
    },
    {
        question: "Can I share these guides with my team?",
        answer: "Absolutely. Link directly to any guide page. No login required. Many operations managers share the Implementation Guide with their payroll admin and the DOL Compliance Guide with their compliance officer or accountant.",
    },
];

export const compareHubFaqItems: FaqItem[] = [
    {
        question: "How do you keep these comparisons accurate?",
        answer: "Each comparison page is reviewed on a fixed cadence — typically every 90 days — and the last-reviewed date is displayed at the top of the page. Claims are tagged as either verified (tested hands-on or sourced from official documentation) or cautious-inference (based on publicly available information but not independently verified). We do not claim feature superiority without a verifiable source.",
    },
    {
        question: "Are these comparisons biased toward Crewtrace?",
        answer: "The comparison framework is designed to be factual and neutral. We document where competitors are strong and where Crewtrace has gaps. Each page includes a claim-safety section showing how we arrived at each assertion. If a competitor has a feature that Crewtrace does not match, we say so directly.",
    },
    {
        question: "What if the comparison information is outdated?",
        answer: "We list the review cadence and last-reviewed date on every comparison page. If you notice something that has changed, you can contact us and we will prioritize a re-review. Software features change frequently, so we encourage using these pages as a starting framework and confirming critical details with each vendor directly.",
    },
    {
        question: "Why only compare Connecteam and Workyard?",
        answer: "These are the two platforms most frequently evaluated alongside Crewtrace by contractors running field crews. If there is another platform you would like to see compared, reach out and we will consider adding it to the review cycle.",
    },
];
