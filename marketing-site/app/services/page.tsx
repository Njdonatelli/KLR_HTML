import type { Metadata } from "next";
import { PageIntro } from "@/components/site/PageIntro";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Patios, hardscape, pools and water features, turf and planting, fire features, and four-season rooms — designed and built by one team in Oceanside and San Diego County.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageIntro
        eyebrow="What We Build"
        title="One team for the whole project."
        intro="Design, hardscape, planting, and finish work handled together, so the space arrives cohesive — not in mismatched phases."
      />
      <section className="bg-surface-page px-6 py-22">
        <div className="max-w-site mx-auto grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title}>
              {/* Placeholder until project photography is ready — the blueprint's open dependency. */}
              <div
                aria-hidden="true"
                className="aspect-[4/3] rounded-md border border-dashed border-border-strong bg-stone-100 flex items-center justify-center mb-4"
              >
                <span className="font-label text-eyebrow font-semibold tracking-label uppercase text-stone-600 text-center px-6">
                  {s.title} photo
                </span>
              </div>
              <FeatureCard title={s.title} description={s.description} tone={s.tone} />
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
