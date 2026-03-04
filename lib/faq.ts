export type FaqItem = {
    question: string;
    answer: string;
};

export const homeFaqItems: FaqItem[] = [
    {
        question: "My guys can barely use their phones. Will they actually use this?",
        answer: "Yes. We keep it simple for field crews. They install the iOS or Android app once, sign in, and clock in with a single tap.",
    },
    {
        question: "What if there is no cell reception on the job site?",
        answer: "The clock-in records locally on the phone and syncs automatically when signal returns. This is designed for active construction sites, not ideal network conditions.",
    },
    {
        question: "How much does this actually cost?",
        answer: "Before quoting anything, we run a free audit call to confirm we can save money. For qualified teams, pricing is a one-time setup fee plus a monthly fee.",
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
