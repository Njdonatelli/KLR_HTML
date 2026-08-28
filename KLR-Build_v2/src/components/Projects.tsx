import { SectionHeading, Badge } from "@/design-system/klr-build-design-system-40bc4c";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";
import { Button } from "@/components/ui/button";
import { Play, Spline } from "lucide-react";

const projects = [
  {
    image: projectResidential,
    title: "Vista Ridge Residence",
    category: "New Construction",
    description: "A 3,400 sq ft custom home in Vista — board-formed concrete, white oak millwork, and a folding glass wall to the courtyard.",
    tone: "tan" as const,
    has3D: true,
  },
  {
    image: projectCommercial,
    title: "Coast Highway Offices",
    category: "Commercial",
    description: "Full tenant improvement across two floors, delivered nights and weekends with zero tenant downtime.",
    tone: "olive" as const,
    hasBeforeAfter: true,
  },
  {
    image: projectIndustrial,
    title: "Melrose Yard Facility",
    category: "Industrial",
    description: "18,000 sq ft warehouse shell with office build-out, completed three weeks ahead of schedule.",
    tone: "bronze" as const,
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-24 bg-surface-inverse text-white"
      style={{ background: "var(--surface-inverse)" }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading
          eyebrow="Our Work"
          title="Recent builds"
          intro="A small sample of what leaving the site clean and the details right looks like."
          onDark
          style={{ marginBottom: "var(--space-12)", maxWidth: 620 }}
        />

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group rounded-xl overflow-hidden bg-surface-card border border-border flex flex-col hover:shadow-2xl transition-all duration-300"
              style={{
                background: "var(--surface-card)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  src={project.image}
                  alt={`${project.title} — ${project.category} project by KLR Build`}
                  loading="lazy"
                />
                
                {project.has3D && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" className="gap-2 backdrop-blur-md bg-white/80">
                      <Spline className="w-4 h-4" /> View 3D Render
                    </Button>
                  </div>
                )}
                {project.hasBeforeAfter && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" className="gap-2 backdrop-blur-md bg-white/80">
                      <Play className="w-4 h-4" /> Before / After
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div><Badge tone={project.tone}>{project.category}</Badge></div>
                <h3 className="text-2xl font-display font-bold text-foreground" style={{ color: "var(--text-primary)" }}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
