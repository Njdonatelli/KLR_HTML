import { useEffect, useRef } from "react";

/**
 * GA4. The measurement ID lives in VITE_GA4_MEASUREMENT_ID; with it unset —
 * local dev, previews, or before the property exists — every call here is a
 * no-op rather than a console.log pretending to be analytics.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

export type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

let initialized = false;

/** Injects gtag.js once. Safe to call repeatedly; only the first call does work. */
export const initAnalytics = () => {
  if (initialized || !MEASUREMENT_ID || typeof window === "undefined") return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  // Views are sent explicitly on route change so the SPA reports real paths.
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
};

export const trackEvent = (eventName: string, properties?: AnalyticsProperties) => {
  window.gtag?.("event", eventName, properties ?? {});
};

export const trackPageView = (path: string, title?: string) => {
  if (!MEASUREMENT_ID) return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title ?? document.title,
  });
};

/** Fires a `section_viewed` event the first time a section scrolls into view. */
export const useScrollTracking = (sectionId: string) => {
  const hasFired = useRef(false);

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFired.current) {
            hasFired.current = true;
            trackEvent("section_viewed", { section: sectionId });
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionId]);
};
