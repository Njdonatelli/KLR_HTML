import React from "react";
import { Button } from "./Button";
import { Input } from "./Input";

export interface ContactSectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onSubmit"> {
  eyebrow?: string;
  title: string;
  body?: string;
  submitLabel?: string;
  /** Phone, email, address line rendered under the form. */
  contactLine?: React.ReactNode;
  /** Message shown in place of the form after submit. */
  confirmation?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const ContactSection = React.forwardRef<HTMLElement, ContactSectionProps>(
  function ContactSection(
    {
      eyebrow,
      title,
      body,
      submitLabel = "Request a Consultation",
      contactLine,
      confirmation = "Thanks — we'll be in touch within a day to schedule your consultation.",
      onSubmit,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const [sent, setSent] = React.useState(false);

    return (
      <section
        ref={ref}
        className={className}
        style={{
          background: "var(--surface-inverse)",
          padding: "var(--space-20) var(--space-6)",
          ...style,
        }}
        {...rest}
      >
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          {eyebrow ? (
            <div
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--text-eyebrow)",
                fontWeight: "var(--weight-semibold)" as unknown as number,
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                color: "var(--tan)",
                marginBottom: "var(--space-2)",
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-extrabold)" as unknown as number,
              fontSize: "var(--text-h2)",
              color: "var(--text-on-inverse)",
              margin: "0 0 var(--space-4)",
            }}
          >
            {title}
          </h2>
          {body ? (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body-lg)",
                lineHeight: "var(--leading-relaxed)",
                color: "var(--stone-200)",
                margin: "0 0 var(--space-10)",
              }}
            >
              {body}
            </p>
          ) : null}

          {sent ? (
            <div
              style={{
                background: "var(--navy)",
                color: "var(--text-on-navy)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-6)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body)",
              }}
            >
              {confirmation}
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                onSubmit?.(event);
                setSent(true);
              }}
              className="grid grid-cols-1 md:grid-cols-2"
              style={{
                gap: "var(--space-4)",
                textAlign: "left",
              }}
            >
              <Input placeholder="Name" required />
              <Input placeholder="Phone or email" required />
              <div style={{ gridColumn: "1 / -1" }}>
                <Input placeholder="What are you envisioning?" multiline />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <Button type="submit" variant="tan" size="lg" style={{ width: "100%" }}>
                  {submitLabel}
                </Button>
              </div>
            </form>
          )}

          {contactLine ? (
            <div
              style={{
                marginTop: "var(--space-10)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body-sm)",
                color: "var(--stone-300)",
              }}
            >
              {contactLine}
            </div>
          ) : null}
        </div>
      </section>
    );
  },
);
