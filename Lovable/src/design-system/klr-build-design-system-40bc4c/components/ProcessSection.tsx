import React from "react";
import { SectionHeading } from "./SectionHeading";
import { ProcessStep } from "./ProcessStep";

export interface ProcessSectionStep {
  title: string;
  description: string;
}

export interface ProcessSectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  intro?: string;
  steps: ProcessSectionStep[];
  columns?: 1 | 2;
}

export const ProcessSection = React.forwardRef<HTMLElement, ProcessSectionProps>(
  function ProcessSection(
    { eyebrow, title, intro, steps, columns = 2, className, style, ...rest },
    ref,
  ) {
    return (
      <section
        ref={ref}
        className={className}
        style={{
          background: "var(--surface-page)",
          padding: "var(--space-20) var(--space-6)",
          ...style,
        }}
        {...rest}
      >
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            intro={intro}
            style={{ marginBottom: "var(--space-12)", maxWidth: 640 }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gap: "var(--space-8) var(--space-12)",
            }}
          >
            {steps.map((step, index) => (
              <ProcessStep
                key={step.title}
                number={index + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>
    );
  },
);
