import React from "react";

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  headline: string;
  body?: string;
  /** Primary and secondary calls to action. */
  actions?: React.ReactNode;
  /** Right-hand media — a real project photograph. */
  media?: React.ReactNode;
}

export const Hero = React.forwardRef<HTMLElement, HeroProps>(function Hero(
  { eyebrow, headline, body, actions, media, className, style, ...rest },
  ref,
) {
  return (
    <section
      ref={ref}
      className={className}
      style={{
        background: "var(--navy)",
        padding: "var(--space-24) var(--space-6) var(--space-20)",
        ...style,
      }}
      {...rest}
    >
      <div
        className={`grid gap-12 items-center max-w-[var(--container-max)] mx-auto ${media ? 'grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]' : 'grid-cols-1'}`}
      >
        <div>
          {eyebrow ? (
            <div
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--text-eyebrow)",
                fontWeight: "var(--weight-semibold)" as unknown as number,
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                color: "var(--tan)",
                marginBottom: "var(--space-4)",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-black)" as unknown as number,
              fontSize: "var(--text-h1)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--text-on-navy)",
              margin: 0,
            }}
          >
            {headline}
          </h1>
          {body ? (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body-lg)",
                lineHeight: "var(--leading-relaxed)",
                color: "var(--stone-200)",
                margin: "var(--space-5) 0 var(--space-8)",
                maxWidth: 480,
              }}
            >
              {body}
            </p>
          ) : null}
          {actions ? (
            <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
              {actions}
            </div>
          ) : null}
        </div>
        {media ? (
          <div
            className="w-full aspect-square sm:aspect-video lg:aspect-auto lg:h-full min-h-[340px]"
            style={{
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              background: "var(--navy-light)",
            }}
          >
            {media}
          </div>
        ) : null}
      </div>
    </section>
  );
});
