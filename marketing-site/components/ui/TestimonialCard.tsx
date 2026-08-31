type TestimonialCardProps = {
  quote: string;
  attribution?: string;
};

export function TestimonialCard({ quote, attribution }: TestimonialCardProps) {
  return (
    <div className="bg-surface-card border border-border-default rounded-lg p-8 shadow-sm max-w-[560px]">
      <div className="font-display text-[2.5rem] text-tan-dark leading-none mb-1" aria-hidden="true">
        &ldquo;
      </div>
      <p className="font-body text-body-lg leading-relaxed text-charcoal m-0">{quote}</p>
      {attribution && (
        <div className="mt-4.5 font-label text-eyebrow font-semibold tracking-wide uppercase text-navy">
          {attribution}
        </div>
      )}
    </div>
  );
}
