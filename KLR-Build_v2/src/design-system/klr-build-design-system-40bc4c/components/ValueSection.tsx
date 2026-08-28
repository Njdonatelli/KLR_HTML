import React from "react";
import { SectionHeading } from "./SectionHeading";
import { StatCard } from "./StatCard";
import { FeatureCard } from "./FeatureCard";

export interface ValueSectionStat {
  stat: string;
  label: string;
  description?: string;
  tone?: "navy" | "olive" | "bronze";
}

export interface ValueSectionFeature {
  title: string;
  description: string;
  tone?: "navy" | "olive" | "bronze" | "outline";
}

export interface ValueSectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  intro?: string;
  stats?: ValueSectionStat[];
  featuresTitle?: string;
  features?: ValueSectionFeature[];
}

export const ValueSection = React.forwardRef<HTMLElement, ValueSectionProps>(
  function ValueSection(
    {
      eyebrow,
      title,
      intro,
      stats = [],
      featuresTitle,
      features = [],
      className,
      style,
      ...rest
    },
    ref,
  ) {
    return (
      <section
        ref={ref}
        className={className}
        style={{
          background: "var(--surface-sunken)",
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
          {stats.length ? (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              style={{
                marginBottom: features.length ? "var(--space-16)" : 0,
              }}
            >
              {stats.map((item) => (
                <StatCard
                  key={item.label}
                  stat={item.stat}
                  label={item.label}
                  description={item.description}
                  tone={item.tone}
                />
              ))}
            </div>
          ) : null}
          {features.length ? (
            <>
              {featuresTitle ? (
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--weight-bold)" as unknown as number,
                    fontSize: "var(--text-h3)",
                    color: "var(--text-primary)",
                    margin: "0 0 var(--space-6)",
                  }}
                >
                  {featuresTitle}
                </h3>
              ) : null}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {features.map((item) => (
                  <FeatureCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    tone={item.tone}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    );
  },
);
