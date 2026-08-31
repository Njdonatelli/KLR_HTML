import { useEffect } from "react";
import { initSmoothScroll, destroySmoothScroll } from "@/lib/smooth-scroll";

/**
 * Mount once at the app root to enable Lenis smooth scrolling.
 * Automatically skips when prefers-reduced-motion is active.
 */
export function useSmoothScroll() {
  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);
}
