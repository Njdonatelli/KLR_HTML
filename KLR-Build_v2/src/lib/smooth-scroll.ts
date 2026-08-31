import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap-register";

let lenis: Lenis | null = null;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initSmoothScroll(): Lenis | null {
  if (prefersReducedMotion()) return null;
  if (lenis) return lenis;

  lenis = new Lenis({
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
  });

  // Sync Lenis scroll position with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Use GSAP ticker to drive Lenis' requestAnimationFrame loop
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroySmoothScroll() {
  if (lenis) {
    gsap.ticker.remove(lenis.raf);
    lenis.destroy();
    lenis = null;
  }
}

export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Programmatic scroll-to that uses Lenis when available,
 * falls back to native scrollIntoView.
 */
export function scrollTo(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number },
) {
  const el =
    typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
    });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
