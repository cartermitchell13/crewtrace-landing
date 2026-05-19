import { Suspense } from "react";
import Script from "next/script";
import GoogleAnalyticsPageViewTracker from "@/components/GoogleAnalyticsPageViewTracker";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const GOOGLE_ADS_ID = "AW-18173086361";

export default function GoogleAnalytics() {
    const googleTagId = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;

    if (!googleTagId) {
        return null;
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });` : ""}
gtag('config', '${GOOGLE_ADS_ID}');
`,
                }}
            />
            {GA_MEASUREMENT_ID ? (
                <Suspense fallback={null}>
                    <GoogleAnalyticsPageViewTracker measurementId={GA_MEASUREMENT_ID} />
                </Suspense>
            ) : null}
        </>
    );
}
