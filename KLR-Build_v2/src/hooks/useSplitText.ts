import { useEffect, useRef, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

type SplitPreset = "hero-reveal" | "heading-reveal" | "line-mask";

interface UseSplitTextOptions {
  preset?: SplitPreset;
  /** "scroll" triggers on scroll enter; "mount" triggers immediately. */
  trigger?: "scroll" | "mount";
  start?: string;
  delay?: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Lightweight text-splitting without the GSAP Club SplitText plugin.
 * Splits text nodes into <span> wrappers by word or character.
 */
function splitIntoSpans(
  el: HTMLElement,
  splitBy: "words" | "chars",
): HTMLSpanElement[] {
  const text = el.textContent || "";
  // Preserve original text for a11y
  el.setAttribute("aria-label", text);

  const words = text.split(/\s+/).filter(Boolean);
  el.innerHTML = "";

  const spans: HTMLSpanElement[] = [];

  words.forEach((word, wordIdx) => {
    if (splitBy === "chars") {
      word.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.willChange = "transform, opacity";
        el.appendChild(span);
        spans.push(span);
      });
      // Add space between words (except last)
      if (wordIdx < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        el.appendChild(space);
      }
    } else {
      const span = document.createElement("span");
      span.textContent = word;
      span.style.display = "inline-block";
      span.style.willChange = "transform, opacity";
      el.appendChild(span);
      spans.push(span);
      if (wordIdx < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        el.appendChild(space);
      }
    }
  });

  return spans;
}

export function useSplitText<T extends HTMLElement = HTMLHeadingElement>(
  options: UseSplitTextOptions = {},
) {
  const ref = useRef<T>(null);
  const originalHTML = useRef<string>("");
  const {
    preset = "heading-reveal",
    trigger = "scroll",
    start = "top 85%",
    delay = 0,
  } = options;

  const revert = useCallback(() => {
    if (ref.current && originalHTML.current) {
      ref.current.innerHTML = originalHTML.current;
      ref.current.removeAttribute("aria-label");
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const el = ref.current;
    originalHTML.current = el.innerHTML;

    // Wait for fonts before measuring/splitting
    const run = () => {
      let spans: HTMLSpanElement[];
      const tweenVars: gsap.TweenVars = { ease: "power3.out" };
      const fromVars: gsap.TweenVars = {};

      switch (preset) {
        case "hero-reveal":
          spans = splitIntoSpans(el, "chars");
          Object.assign(fromVars, { opacity: 0, y: "100%", rotateX: -40 });
          Object.assign(tweenVars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.025,
            ease: "power4.out",
          });
          break;

        case "heading-reveal":
          spans = splitIntoSpans(el, "words");
          Object.assign(fromVars, { opacity: 0, y: 20, filter: "blur(4px)" });
          Object.assign(tweenVars, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.05,
          });
          break;

        case "line-mask":
          spans = splitIntoSpans(el, "words");
          Object.assign(fromVars, { opacity: 0, y: "100%", clipPath: "inset(100% 0 0 0)" });
          Object.assign(tweenVars, {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.8,
            stagger: 0.04,
          });
          break;

        default:
          return;
      }

      gsap.set(spans, fromVars);

      if (trigger === "scroll") {
        tweenVars.delay = delay;
        tweenVars.scrollTrigger = {
          trigger: el,
          start,
          toggleActions: "play none none none",
        };
      } else {
        tweenVars.delay = delay;
      }

      const tween = gsap.to(spans, tweenVars);

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        revert();
      };
    };

    // Ensure fonts are loaded before splitting
    if (document.fonts?.ready) {
      let cleanup: (() => void) | undefined;
      document.fonts.ready.then(() => {
        cleanup = run();
      });
      return () => cleanup?.();
    } else {
      const cleanup = run();
      return () => cleanup?.();
    }
  }, [preset, trigger, start, delay, revert]);

  return ref;
}
