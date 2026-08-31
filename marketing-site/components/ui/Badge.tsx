import type { ReactNode } from "react";

const tones = {
  navy: "bg-navy text-white",
  olive: "bg-olive text-white",
  bronze: "bg-bronze text-white",
  tan: "bg-tan text-charcoal",
  outline: "bg-transparent text-navy border border-border-strong",
};

export function Badge({
  children,
  tone = "navy",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
}) {
  return (
    <span
      className={`inline-flex items-center px-3.5 py-1.25 rounded-pill font-label text-[0.75rem] font-semibold tracking-label uppercase ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
