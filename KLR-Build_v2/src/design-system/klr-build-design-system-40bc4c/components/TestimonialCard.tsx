import React from "react";

export interface TestimonialCardProps
  extends React.HTMLAttributes<HTMLElement> {
  quote: string;
  attribution?: string;
}

export const TestimonialCard = React.forwardRef<
  HTMLElement,
  TestimonialCardProps
>(function TestimonialCard(
  { quote, attribution, className, style, ...rest },
  ref,
) {
  return (
    <figure
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-8)",
        boxShadow: "var(--shadow-sm)",
        maxWidth: 560,
        margin: 0,
        ...style,
      }}
      {...rest}
    >
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h1)",
          color: "var(--tan-dark)",
          lineHeight: 1,
          marginBottom: "var(--space-1)",
        }}
      >
        &ldquo;
      </div>
      <blockquote
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-body-lg)",
          lineHeight: "var(--leading-relaxed)",
          color: "var(--charcoal)",
          margin: 0,
        }}
      >
        {quote}
      </blockquote>
      {attribution && (
        <figcaption
          style={{
            marginTop: "var(--space-4)",
            fontFamily: "var(--font-label)",
            fontSize: "var(--text-caption)",
            fontWeight: 600,
            letterSpacing: "var(--tracking-wide)",
            textTransform: "uppercase",
            color: "var(--navy)",
          }}
        >
          {attribution}
        </figcaption>
      )}
    </figure>
  );
});
