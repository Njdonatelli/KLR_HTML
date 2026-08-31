const accents = {
  navy: "border-t-navy",
  olive: "border-t-olive",
  bronze: "border-t-bronze",
  outline: "border-t-border-strong",
};

type FeatureCardProps = {
  title: string;
  description: string;
  tone?: keyof typeof accents;
};

export function FeatureCard({ title, description, tone = "outline" }: FeatureCardProps) {
  return (
    <div
      className={`bg-surface-card rounded-md border border-border-default border-t-[3px] p-6 shadow-sm ${accents[tone]}`}
    >
      <div className="font-display font-bold text-body text-charcoal mb-2">{title}</div>
      <p className="font-body text-body-sm leading-normal text-text-secondary m-0">{description}</p>
    </div>
  );
}
