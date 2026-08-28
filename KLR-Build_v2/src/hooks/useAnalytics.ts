import { useEffect, useRef } from "react";

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  console.log(`[Analytics] Event: ${eventName}`, properties || {});
  // Implement actual analytics provider code here (e.g., GA4, Plausible, Mixpanel)
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, properties);
  }
};

export const trackPageView = (url: string) => {
  console.log(`[Analytics] PageView: ${url}`);
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "page_view", {
      page_path: url,
    });
  }
};

export const useScrollTracking = (sectionId: string) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    ref.current = element;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackPageView(`/#${sectionId}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [sectionId]);
};
