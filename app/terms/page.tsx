import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Crewtrace",
    description: "Crewtrace Terms of Service — the rules and guidelines governing your use of our platform.",
};

export default function TermsPage() {
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
                            Terms of Service
                        </h1>
                        <p className="text-foreground/50 font-medium">
                            Last updated: February 12, 2026
                        </p>
                    </div>

                    <div className="prose-custom space-y-10">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">1. Acceptance of Terms</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                By accessing or using the Crewtrace website, mobile application, or any services provided by Crewtrace (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), collectively referred to as the &quot;Services,&quot; you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not access or use the Services.
                            </p>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                If you are using the Services on behalf of a company or organization, you represent and warrant that you have the authority to bind that entity to these Terms.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">2. Description of Services</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                Crewtrace provides a GPS-verified time tracking and workforce management platform designed for the construction industry, accessible via our website at getcrewtrace.com and our application hosted at crewtrace.app. Our Services include, but are not limited to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-foreground/70 font-medium leading-relaxed">
                                <li>GPS geofenced clock-in and clock-out functionality</li>
                                <li>Real-time labor cost tracking and analytics</li>
                                <li>Automated payroll report generation</li>
                                <li>Integration with third-party accounting and project management software</li>
                                <li>Compliance record-keeping and audit trail documentation</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">3. Account Registration</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                To use certain features of our Services, you must create an account. You agree to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-foreground/70 font-medium leading-relaxed">
                                <li>Provide accurate, current, and complete information during registration</li>
                                <li>Maintain and promptly update your account information</li>
                                <li>Keep your login credentials confidential and secure</li>
                                <li>Notify us immediately of any unauthorized access to your account</li>
                                <li>Accept responsibility for all activity that occurs under your account</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">4. Acceptable Use</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-foreground/70 font-medium leading-relaxed">
                                <li>Use the Services in any way that violates applicable federal, state, or local laws</li>
                                <li>Attempt to gain unauthorized access to any part of the Services or related systems</li>
                                <li>Interfere with or disrupt the Services or servers connected to the Services</li>
                                <li>Use the Services to transmit viruses, malware, or other harmful code</li>
                                <li>Reverse-engineer, decompile, or disassemble any portion of the Services</li>
                                <li>Use automated scripts or bots to access the Services without our written permission</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">5. Fees and Payment</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                Access to certain features of the Services requires payment of fees. By subscribing to a paid plan, you agree to the following:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-foreground/70 font-medium leading-relaxed">
                                <li>Fees are billed in advance on a monthly or annual basis as selected during setup</li>
                                <li>All fees are non-refundable except as expressly stated in our Profit Protection Guarantee</li>
                                <li>We reserve the right to change pricing with 30 days&apos; advance notice</li>
                                <li>Failure to pay may result in suspension or termination of your account</li>
                            </ul>

                            <h3 className="text-lg font-bold text-foreground">Profit Protection Guarantee</h3>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                If Crewtrace does not pay for itself within your first 6 months of use, we will refund the difference between your subscription fees and the documented savings achieved through use of the platform. This guarantee is subject to active use of the platform during the guarantee period and is available to qualifying accounts only.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">6. Data Ownership and Licensing</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                You retain all ownership rights to the data you submit to the Services (&quot;Your Data&quot;). By using the Services, you grant us a limited, non-exclusive license to use, process, and store Your Data solely to provide and improve the Services.
                            </p>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We may use aggregated, anonymized data derived from Your Data for analytics, benchmarking, and product improvement purposes. This aggregated data will not identify you or any individual crew member.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">7. Intellectual Property</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                The Services, including all content, features, functionality, software, and design elements, are owned by Crewtrace and are protected by United States and international copyright, trademark, patent, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Services without our explicit written consent.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">8. Third-Party Integrations</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                The Services may integrate with third-party software and services (e.g., QuickBooks, Sage, Procore). These integrations are provided for your convenience. We are not responsible for the availability, accuracy, or content of third-party services, and your use of them is subject to their respective terms and privacy policies.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">9. Disclaimer of Warranties</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">10. Limitation of Liability</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                TO THE FULLEST EXTENT PERMITTED BY LAW, CREWTRACE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOST PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY.
                            </p>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                Our total liability for any claims arising under these Terms shall not exceed the amount you paid to us during the twelve (12) months immediately preceding the event giving rise to the claim.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">11. Indemnification</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                You agree to indemnify, defend, and hold harmless Crewtrace and its officers, directors, employees, agents, and affiliates from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys&apos; fees) arising out of or related to your use of the Services, your violation of these Terms, or your violation of any rights of a third party.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">12. Termination</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                Either party may terminate the agreement at any time. You may cancel your account by contacting our support team. We may suspend or terminate your access to the Services immediately and without notice if you breach these Terms.
                            </p>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                Upon termination, your right to use the Services will cease immediately. You may request an export of Your Data within 30 days of account termination, after which we may delete Your Data in accordance with our data retention policies.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">13. Governing Law</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the state or federal courts located in Orange County, California.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">14. Changes to Terms</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the &quot;Last updated&quot; date. Your continued use of the Services after any modifications constitutes acceptance of the updated Terms.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">15. Contact Us</h2>
                            <p className="text-foreground/70 leading-relaxed font-medium">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="bg-white border border-foreground/5 rounded-2xl p-6 space-y-3">
                                <p className="text-foreground/70 font-medium">
                                    <strong className="text-foreground">Email:</strong>{" "}
                                    <a href="mailto:carter@getcrewtrace.com" className="text-primary hover:underline">carter@getcrewtrace.com</a>
                                </p>
                                <p className="text-foreground/70 font-medium">
                                    <strong className="text-foreground">Website:</strong>{" "}
                                    <a href="https://getcrewtrace.com" className="text-primary hover:underline">getcrewtrace.com</a>
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
