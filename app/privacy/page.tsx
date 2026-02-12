import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Crewtrace",
    description: "Crewtrace Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            <span>Legal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-foreground/50 font-medium">
                            Last updated: February 12, 2026
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
                                <a href="mailto:privacy@crewtrace.com" className="text-primary hover:underline font-bold">privacy@crewtrace.com</a>.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">8. Cookies and Tracking Technologies</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We use cookies, pixels, and similar technologies to collect information about your browsing activity. These technologies help us analyze website traffic, personalize content, and improve your experience. You can control cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">9. Children&apos;s Privacy</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 18, we will take steps to delete that information promptly.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">10. Changes to This Policy</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. Your continued use of the Services after any changes constitutes acceptance of the updated policy.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">11. Contact Us</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="bg-white border border-foreground/5 rounded-2xl p-6 space-y-3">
                                <p className="text-foreground/70 font-medium">
                                    <strong className="text-foreground">Email:</strong>{" "}
                                    <a href="mailto:privacy@crewtrace.com" className="text-primary hover:underline">privacy@crewtrace.com</a>
                                </p>
                                <p className="text-foreground/70 font-medium">
                                    <strong className="text-foreground">Website:</strong>{" "}
                                    <a href="https://crewtrace.com" className="text-primary hover:underline">crewtrace.com</a>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
