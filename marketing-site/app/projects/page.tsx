import type { Metadata } from "next";
import { PageIntro } from "@/components/site/PageIntro";
import { CtaBand } from "@/components/site/CtaBand";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Recent KLR Build projects across Oceanside, Carlsbad, Vista, and San Diego County — patios, hardscape, pools, fire features, turf, and four-season rooms.",
};

export default function ProjectsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Recent Work"
        title="Built around North County."
        intro="A look at recent projects across Oceanside and San Diego County. Filter by the kind of work you're planning."
      />
      <section className="bg-surface-page px-6 py-22">
        <div className="max-w-site mx-auto">
          <ProjectsGallery />
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
