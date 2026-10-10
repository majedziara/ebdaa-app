import Script from "next/script";
import { siteConfig } from "@/lib/site";

export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.googleAnalyticsId}');`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`}
        strategy="lazyOnload"
      />
    </>
  );
}
