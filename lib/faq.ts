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
