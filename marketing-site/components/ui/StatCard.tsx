const tones = {
  navy: "text-navy",
  olive: "text-olive",
  bronze: "text-bronze",
};

type StatCardProps = {
  stat: string;
  label: string;
  description?: string;
  tone?: keyof typeof tones;
};

export function StatCard({ stat, label, description, tone = "navy" }: StatCardProps) {
  return (
    <div className="flex flex-col gap-2 py-1">
      <div className={`font-display text-h1 font-black leading-none ${tones[tone]}`}>{stat}</div>
      <div className="font-label text-body-sm font-semibold tracking-wide uppercase text-charcoal">
        {label}
      </div>
      {description && (
        <p className="font-body text-body-sm leading-normal text-text-secondary m-0 max-w-[260px]">
          {description}
        </p>
      )}
    </div>
  );
}
