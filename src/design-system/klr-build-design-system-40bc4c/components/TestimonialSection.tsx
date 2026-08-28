import React from "react";
import { TestimonialCard } from "./TestimonialCard";

export interface TestimonialSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  quote: string;
  attribution?: string;
}

export const TestimonialSection = React.forwardRef<
  HTMLElement,
  TestimonialSectionProps
>(function TestimonialSection(
  { quote, attribution, className, style, ...rest },
  ref,
) {
  return (
    <section
      ref={ref}
      className={className}
      style={{
        background: "var(--surface-page)",
        padding: "var(--space-20) var(--space-6)",
        display: "flex",
        justifyContent: "center",
        ...style,
      }}
      {...rest}
    >
      <TestimonialCard
        quote={quote}
        attribution={attribution}
        style={{ maxWidth: 640 }}
      />
    </section>
  );
});
