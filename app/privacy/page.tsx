import LandingNavbar from "@/components/LandingNavbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import SectionDivider from "@/components/SectionDivider";

export const metadata: Metadata = createPageMetadata({
    title: "Privacy Policy",
    description: "Crewtrace Privacy Policy — how we collect, use, and protect your data.",
    path: "/privacy",
});

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            <LandingNavbar />
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <div id="hero" className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            <span>Legal</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-foreground mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-foreground/50 font-medium">
                            Last updated: May 28, 2026
                        </p>
                    </div>

                    <div className="prose-custom space-y-10">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">1. Introduction</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                Crewtrace (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard information when you visit our website, use our mobile application, or engage with our crew tracking and time management services (collectively, the &quot;Services&quot;).
                            </p>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                By accessing or using our Services, you agree to the practices described in this Privacy Policy. If you do not agree with this policy, please do not use our Services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">2. Information We Collect</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We collect information that you provide directly to us, information collected automatically, and information from third-party sources.
                            </p>

                            <h3 className="text-lg font-bold text-foreground">Information You Provide</h3>
                            <ul className="list-disc pl-6 space-y-2 text-foreground/70 font-medium leading-relaxed">
                                <li>Account registration details (name, email address, phone number, company name)</li>
                                <li>Employee and crew member information (names, roles, assigned job sites)</li>
                                <li>Payment and billing information</li>
                                <li>Communications with our support team</li>
                                <li>Form submissions and demo booking requests</li>
                            </ul>

                            <h3 className="text-lg font-bold text-foreground">Information Collected Automatically</h3>
                            <ul className="list-disc pl-6 space-y-2 text-foreground/70 font-medium leading-relaxed">
                                <li><strong>Location Data:</strong> GPS coordinates collected during clock-in and clock-out events for geofence verification. Location data is only collected when workers actively use the time-tracking feature.</li>
                                <li><strong>Device Information:</strong> Device type, operating system, browser type, and unique device identifiers.</li>
                                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the platform, and interaction patterns.</li>
                                <li><strong>Log Data:</strong> IP address, access times, and referring URLs.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">3. How We Use Your Information</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We use the information we collect for the following purposes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-foreground/70 font-medium leading-relaxed">
                                <li>To provide, maintain, and improve our Services</li>
                                <li>To verify employee clock-in/clock-out locations via GPS geofencing</li>
                                <li>To generate payroll reports and labor cost analytics</li>
                                <li>To process transactions and send related information</li>
                                <li>To communicate with you about updates, features, and support</li>
                                <li>To detect, prevent, and address technical issues or fraud</li>
                                <li>To comply with legal obligations and enforce our terms</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">4. Data Sharing and Disclosure</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We do not sell your personal information. We may share your information in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-foreground/70 font-medium leading-relaxed">
                                <li><strong>With Your Employer:</strong> If you are a crew member, your time tracking data (including location verification) is shared with your employer who administers the Crewtrace account.</li>
                                <li><strong>Service Providers:</strong> We share data with third-party vendors who perform services on our behalf, such as hosting, analytics, payment processing, and customer support.</li>
                                <li><strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, or legal process, or if we believe disclosure is necessary to protect rights, safety, or property.</li>
                                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">5. Data Security</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We implement industry-standard security measures to protect your information, including encryption in transit (TLS/SSL) and at rest, access controls, and regular security assessments. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">6. Data Retention</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We retain your personal information for as long as your account is active or as needed to provide our Services. We also retain data as necessary to comply with legal obligations, resolve disputes, and enforce our agreements. Time tracking records are retained for a minimum period consistent with applicable labor law requirements.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">7. Your Rights</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                Depending on your location, you may have the following rights regarding your personal information:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-foreground/70 font-medium leading-relaxed">
                                <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                                <li><strong>Correction:</strong> Request that we correct inaccurate or incomplete information.</li>
                                <li><strong>Deletion:</strong> Request that we delete your personal information, subject to legal retention requirements.</li>
                                <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time.</li>
                                <li><strong>Portability:</strong> Request a portable copy of your data in a commonly used format.</li>
                            </ul>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                To exercise any of these rights, please contact us at{" "}
                                <a href="mailto:carter@getCrewtrace.com" className="text-primary hover:underline font-bold">carter@getCrewtrace.com</a>.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">8. Cookies and Tracking Technologies</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We use cookies, pixels, tags, local storage, and similar technologies to operate our Services, understand website performance, measure advertising effectiveness, and improve the visitor experience.
                            </p>
                            <h3 className="text-lg font-bold text-foreground">Google Analytics and Google Ads</h3>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                Our marketing website uses Google Analytics 4 and Google Ads tags. These services may collect information such as pages viewed, referring URLs, approximate location derived from IP address, browser and device information, interactions with forms or buttons, and conversion events such as demo requests or calculator submissions. Google Analytics uses cookies such as <code className="rounded bg-foreground/5 px-1 py-0.5 text-sm">_ga</code> to distinguish visitors and report aggregate usage statistics.
                            </p>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We use this information to understand which pages and campaigns are working, improve our website, measure Google Ads performance, and avoid showing irrelevant advertising. We do not use Google Analytics to collect account passwords, precise GPS clock-in locations from the app, payroll records, or payment card details.
                            </p>
                            <h3 className="text-lg font-bold text-foreground">Your Choices</h3>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                You can accept or reject non-essential analytics and advertising storage through the privacy choices banner or the &quot;Privacy choices&quot; link in our footer. You can also control cookies through your browser settings, use Google&apos;s advertising personalization controls, or install the Google Analytics opt-out browser add-on.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">9. U.S. State Privacy Rights</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                Depending on your state of residence and whether applicable privacy laws apply to Crewtrace, you may have additional rights to know, access, correct, delete, or obtain a copy of personal information, and to opt out of certain targeted advertising or sale/sharing of personal information.
                            </p>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We do not sell personal information for money. Some analytics, advertising measurement, or remarketing activities may be considered &quot;sharing&quot; or targeted advertising under certain U.S. state privacy laws. You can opt out of non-essential advertising storage using the privacy choices banner or footer link, and you may contact us at{" "}
                                <a href="mailto:carter@getCrewtrace.com" className="text-primary hover:underline font-bold">carter@getCrewtrace.com</a>{" "}
                                with privacy requests.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">10. Children&apos;s Privacy</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 18, we will take steps to delete that information promptly.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">11. Changes to This Policy</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. Your continued use of the Services after any changes constitutes acceptance of the updated policy.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">12. Contact Us</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="bg-white border border-foreground/5 rounded-md p-6 space-y-3">
                                <p className="text-foreground/70 font-medium">
                                    <strong className="text-foreground">Email:</strong>{" "}
                                    <a href="mailto:carter@getCrewtrace.com" className="text-primary hover:underline">carter@getCrewtrace.com</a>
                                </p>
                                <p className="text-foreground/70 font-medium">
                                    <strong className="text-foreground">Website:</strong>{" "}
                                    <a href="https://getCrewtrace.com" className="text-primary hover:underline">getCrewtrace.com</a>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <SectionDivider />
            <Footer />
        </div>
    );
}
