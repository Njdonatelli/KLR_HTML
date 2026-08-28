import React from "react";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  stat: string;
  label: string;
  description?: string;
  tone?: "navy" | "olive" | "bronze";
}

const tones: Record<NonNullable<StatCardProps["tone"]>, string> = {
  navy: "var(--navy)",
  olive: "var(--olive)",
  bronze: "var(--bronze)",
};

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  function StatCard(
    { stat, label, description, tone = "navy", className, style, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
          padding: "var(--space-1) 0",
          ...style,
        }}
        {...rest}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h1)",
            fontWeight: 900,
            lineHeight: 1,
            color: tones[tone],
          }}
        >
          {stat}
        </div>
        <div
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "var(--text-body-sm)",
            fontWeight: 600,
            letterSpacing: "var(--tracking-wide)",
            textTransform: "uppercase",
            color: "var(--charcoal)",
          }}
        >
          {label}
        </div>
        {description && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-sm)",
              lineHeight: "var(--leading-normal)",
              color: "var(--text-secondary)",
              margin: 0,
              maxWidth: 260,
            }}
          >
            {description}
          </p>
        )}
      </div>
    );
  },
);
