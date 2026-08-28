import React from "react";

export interface ProcessStepProps extends React.HTMLAttributes<HTMLDivElement> {
  number: number | string;
  title: string;
  description: string;
}

export const ProcessStep = React.forwardRef<HTMLDivElement, ProcessStepProps>(
  function ProcessStep(
    { number, title, description, className, style, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: "flex",
          gap: "var(--space-4)",
          alignItems: "flex-start",
          ...style,
        }}
        {...rest}
      >
        <div
          aria-hidden="true"
          style={{
            flex: "none",
            width: 44,
            height: 44,
            borderRadius: "var(--radius-pill)",
            background: "var(--navy)",
            color: "var(--white)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "var(--text-h3)",
          }}
        >
          {number}
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "var(--text-h4)",
              color: "var(--charcoal)",
              marginBottom: "var(--space-1)",
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
      </div>
    );
  },
);
