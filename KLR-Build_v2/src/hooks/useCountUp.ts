import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: string;
  prefix?: string;
  suffix?: string;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  options: UseCountUpOptions,
) {
  const ref = useRef<T>(null);
  const { end, duration = 1.5, start = "top 85%", prefix = "", suffix = "" } = options;

  useEffect(() => {
    if (!ref.current) return;

    if (prefersReducedMotion()) {
      ref.current.textContent = `${prefix}${end}${suffix}`;
      return;
    }

    const el = ref.current;
    const obj = { val: 0 };
    el.textContent = `${prefix}0${suffix}`;

    const tween = gsap.to(obj, {
      val: end,
      duration,
      ease: "power2.out",
      snap: { val: 1 },
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [end, duration, start, prefix, suffix]);

  return ref;
}
