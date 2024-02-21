//Import required libraries and/or modules
import "../styles/globals.css";
import Script from "next/script";
import { useEffect } from "react";

// ID is fetched from .env.local created at project root to maintain security + ability to easily change in the future
export default function MyApp({ Component, pageProps }) {
  const googleAnalyticsTrackingId =
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID;
  // useEffect webhook used to dynamically add GA to pages
  useEffect(() => {
    if (googleAnalyticsTrackingId) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsTrackingId}`;
      // async script loading to ensure smooth page render
      script.async = true;
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", googleAnalyticsTrackingId);
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [googleAnalyticsTrackingId]);

  return <Component {...pageProps} />;
}
