import type { Metadata } from "next";
import { PageIntro } from "@/components/site/PageIntro";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { whyChoose as values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "KLR Build LLC is a family-owned design-build company in Oceanside, CA — named for the owner's daughter's initials — building outdoor living spaces across San Diego County.",
};

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow="A Family Company"
        title="Designed with intent. Built to endure."
        intro="KLR Build LLC is a small, family-owned design-build company based in Oceanside, California."
      />
      <section className="bg-surface-page px-6 py-22">
        <div className="max-w-[720px] mx-auto">
          <h2 className="font-display font-extrabold text-h2 text-charcoal m-0 mb-5">
            The name on the trucks is family.
          </h2>
          <p className="font-body text-body-lg leading-relaxed text-text-secondary m-0 mb-4">
            KLR takes its name from the initials of the owner&rsquo;s daughter — a daily reminder
            that every project carries the family&rsquo;s name on it. Quality, integrity, and
            reliability aren&rsquo;t slogans here; they&rsquo;re the standard each job is measured
            against.
          </p>
          <p className="font-body text-body-lg leading-relaxed text-text-secondary m-0">
            We design and build exterior and interior living spaces — patios, hardscape, pools and
            water features, turf and planting, fire features, and four-season rooms — and we run the
            whole job through one team: design, HOA submission, construction, planting, and the
            final walk-through.
          </p>
        </div>
      </section>
      <section className="bg-stone-100 px-6 py-22">
        <div className="max-w-site mx-auto">
          <h2 className="font-display font-extrabold text-h2 text-charcoal m-0 mb-10 max-w-[640px]">
            What working with us feels like.
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {values.map((v) => (
              <FeatureCard key={v.title} title={v.title} description={v.description} tone={v.tone} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface-page px-6 py-22 flex justify-center">
        <TestimonialCard
          quote="We couldn't be more impressed with the transformation of our front and backyard into a truly elevated outdoor living space. The craftsmanship — from the beautiful concrete and paver hardscape to the turf, thoughtfully selected plants, and seamless irrigation system — is exceptional."
          attribution="Oceanside, CA homeowner"
        />
      </section>
      <section aria-labelledby="licensing" className="bg-white border-t border-border-default px-6 py-16">
        <div className="max-w-[720px] mx-auto">
          <h2 id="licensing" className="font-display font-bold text-h3 text-charcoal m-0 mb-4">
            Licensing &amp; insurance
          </h2>
          <p className="font-body text-body leading-relaxed text-text-secondary m-0">
            KLR Build LLC is a California licensed and insured contractor.{" "}
            {/* Placeholder until the CSLB number and bond/insurance details are supplied for launch. */}
            <span className="font-label text-eyebrow font-semibold tracking-label uppercase text-stone-600 border border-dashed border-border-strong rounded-sm px-2 py-1">
              CSLB license number — add before launch
            </span>
          </p>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
