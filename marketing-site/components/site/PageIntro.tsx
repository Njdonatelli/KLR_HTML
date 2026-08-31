type PageIntroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
};

/* Page-level variant of the Hero band: same navy treatment, compact, with the route's h1. */
export function PageIntro({ eyebrow, title, intro }: PageIntroProps) {
  return (
    <section className="bg-navy px-6 pt-18 pb-16">
      <div className="max-w-site mx-auto">
        <p className="font-label text-eyebrow font-semibold tracking-label uppercase text-tan mb-2.5">
          {eyebrow}
        </p>
        <h1 className="font-display font-extrabold text-h1 leading-tight tracking-tight text-white m-0">
          {title}
        </h1>
        {intro && (
          <p className="font-body text-body-lg leading-relaxed text-stone-200 mt-3.5 mb-0 max-w-[640px]">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
