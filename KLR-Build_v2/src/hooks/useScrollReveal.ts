import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "none";

interface UseScrollRevealOptions {
  variant?: RevealVariant;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
  /** For staggering children: pass a CSS selector to target. */
  staggerChildren?: string;
  staggerDelay?: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    variant = "fade-up",
    duration = 0.8,
    delay = 0,
    start = "top 85%",
    once = true,
    staggerChildren,
    staggerDelay = 0.15,
  } = options;

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const el = ref.current;
    const targets = staggerChildren ? el.querySelectorAll(staggerChildren) : [el];
    if (targets.length === 0) return;

    // Set initial state
    const fromVars: gsap.TweenVars = { opacity: 0 };
    switch (variant) {
      case "fade-up":
        fromVars.y = 40;
        break;
      case "fade-down":
        fromVars.y = -40;
        break;
      case "fade-left":
        fromVars.x = -60;
        break;
      case "fade-right":
        fromVars.x = 60;
        break;
      case "scale-in":
        fromVars.scale = 0.9;
        break;
      case "none":
        return;
    }

    gsap.set(targets, fromVars);

    const tween = gsap.to(targets, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: "power3.out",
      stagger: staggerChildren ? staggerDelay : 0,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [variant, duration, delay, start, once, staggerChildren, staggerDelay]);

  return ref;
}
