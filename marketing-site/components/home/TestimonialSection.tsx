export function TestimonialSection() {
  return (
    <section aria-label="Client testimonial" className="bg-surface-page px-6 py-22 flex justify-center">
      <figure className="max-w-[640px] bg-white border border-border-default rounded-lg p-8 shadow-sm text-center m-0">
        <div className="font-display text-[3rem] text-tan-dark leading-none" aria-hidden="true">
          &ldquo;
        </div>
        <blockquote className="m-0">
          <p className="font-body text-body-lg leading-relaxed text-charcoal m-0 mb-4.5">
            We couldn&rsquo;t be more impressed with the transformation of our front and backyard
            into a truly elevated outdoor living space. The craftsmanship — from the beautiful
            concrete and paver hardscape to the turf, thoughtfully selected plants, and seamless
            irrigation system — is exceptional.
          </p>
        </blockquote>
        <figcaption className="font-label text-eyebrow font-semibold tracking-wide uppercase text-navy">
          Oceanside, CA homeowner
        </figcaption>
      </figure>
    </section>
  );
}
