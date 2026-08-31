type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  onDark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center max-w-[640px] mx-auto" : "text-left"}>
      {eyebrow && (
        <div
          className={`font-label text-eyebrow font-semibold tracking-label uppercase mb-2.5 ${onDark ? "text-tan" : "text-navy"}`}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={`font-display text-h2 font-extrabold leading-tight tracking-tight m-0 ${onDark ? "text-white" : "text-charcoal"}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`font-body text-body-lg leading-relaxed mt-3.5 ${onDark ? "text-stone-200" : "text-text-secondary"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
