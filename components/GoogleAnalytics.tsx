import { Suspense } from "react";
import Script from "next/script";
import GoogleAnalyticsPageViewTracker from "@/components/GoogleAnalyticsPageViewTracker";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const GOOGLE_ADS_ID = "AW-18173086361";
const CALCULATOR_LEAD_CONVERSION_SEND_TO = "AW-18173086361/FiaZCOzI2bAcEJmVzdlD";
const DEMO_REQUEST_CONVERSION_SEND_TO = "AW-18173086361/muQVCLiX4LEcEJmVzdlD";
const COOKIE_CONSENT_STORAGE_KEY = "crewtrace_cookie_consent";

export default function GoogleAnalytics() {
    const googleTagId = GOOGLE_ADS_ID;

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
gtag('consent', 'default', {
  'analytics_storage': 'granted',
  'ad_storage': 'granted',
  'ad_user_data': 'granted',
  'ad_personalization': 'granted',
  'functionality_storage': 'granted',
  'security_storage': 'granted',
  'wait_for_update': 500
});
try {
  var storedConsent = window.localStorage.getItem('${COOKIE_CONSENT_STORAGE_KEY}');
  if (storedConsent) {
    var consent = JSON.parse(storedConsent);
    gtag('consent', 'update', {
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied'
    });
  }
} catch (error) {}
gtag('js', new Date());
${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });` : ""}
gtag('config', '${GOOGLE_ADS_ID}');
window.gtag_report_conversion = function(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
    'send_to': '${CALCULATOR_LEAD_CONVERSION_SEND_TO}',
    'event_callback': callback
  });
  return false;
};
window.gtag_report_demo_conversion = function(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
    'send_to': '${DEMO_REQUEST_CONVERSION_SEND_TO}',
    'event_callback': callback
  });
  return false;
};
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
