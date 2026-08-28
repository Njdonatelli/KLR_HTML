import React from "react";

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  tone?: "navy" | "olive" | "bronze" | "outline";
}

const accents: Record<NonNullable<FeatureCardProps["tone"]>, string> = {
  navy: "var(--navy)",
  olive: "var(--olive)",
  bronze: "var(--bronze)",
  outline: "var(--border-strong)",
};

export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  function FeatureCard(
    { title, description, tone = "outline", className, style, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          background: "var(--surface-card)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-default)",
          borderTop: `3px solid ${accents[tone]}`,
          padding: "var(--space-6)",
          boxShadow: "var(--shadow-sm)",
          ...style,
        }}
        {...rest}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-body)",
            color: "var(--charcoal)",
            marginBottom: "var(--space-2)",
          }}
        >
          {title}
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body-sm)",
            lineHeight: "var(--leading-normal)",
            color: "var(--text-secondary)",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    );
  },
);
