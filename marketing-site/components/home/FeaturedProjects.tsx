import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects as allProjects } from "@/lib/content";

const projects = allProjects.slice(0, 3);

export function FeaturedProjects() {
  return (
    <section id="projects" className="bg-white px-6 py-22">
      <div className="max-w-site mx-auto">
        <SectionHeading
          eyebrow="Recent Work"
          title="Built around North County."
          intro="A look at recent projects across Oceanside and San Diego County. Full galleries are on the way."
        />
        <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.title}>
              {/* Placeholder until project photography is ready. */}
              <div
                aria-hidden="true"
                className="aspect-[4/3] rounded-md border border-dashed border-border-strong bg-stone-100 flex items-center justify-center mb-4"
              >
                <span className="font-label text-eyebrow font-semibold tracking-label uppercase text-stone-600 text-center px-6">
                  Project photo
                </span>
              </div>
              <Badge tone={p.tone}>{p.tag}</Badge>
              <h3 className="font-display font-bold text-h4 text-charcoal mt-3 mb-1">{p.title}</h3>
              <p className="font-body text-body-sm text-text-secondary m-0">{p.location}, CA</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
