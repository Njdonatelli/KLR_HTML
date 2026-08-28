import React from "react";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Short uppercase label above the heading. */
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  /** Set on navy/charcoal surfaces so text inverts. */
  onDark?: boolean;
}

export const SectionHeading = React.forwardRef<
  HTMLDivElement,
  SectionHeadingProps
>(function SectionHeading(
  {
    eyebrow,
    title,
    intro,
    align = "left",
    onDark = false,
    className,
    style,
    ...rest
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={className}
      style={{
        textAlign: align,
        maxWidth: align === "center" ? 640 : undefined,
        margin: align === "center" ? "0 auto" : undefined,
        ...style,
      }}
      {...rest}
    >
      {eyebrow && (
        <div
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "var(--text-eyebrow)",
            fontWeight: 600,
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: onDark ? "var(--tan)" : "var(--navy)",
            marginBottom: "var(--space-2)",
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h2)",
          fontWeight: 800,
          lineHeight: "var(--leading-tight)",
          letterSpacing: "var(--tracking-tight)",
          color: onDark ? "var(--white)" : "var(--charcoal)",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {intro && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body-lg)",
            lineHeight: "var(--leading-relaxed)",
            color: onDark ? "var(--stone-200)" : "var(--text-secondary)",
            marginTop: "var(--space-4)",
            marginBottom: 0,
          }}
        >
          {intro}
        </p>
      )}
    </div>
  );
});
