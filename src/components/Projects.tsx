import { SectionHeading, Badge } from "@/design-system/klr-build-design-system-40bc4c";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";

const projects = [
  {
    image: projectResidential,
    title: "Vista Ridge Residence",
    category: "New Construction",
    description: "A 3,400 sq ft custom home in Vista — board-formed concrete, white oak millwork, and a folding glass wall to the courtyard.",
    tone: "tan" as const,
    feature: true,
  },
  {
    image: projectCommercial,
    title: "Coast Highway Offices",
    category: "Commercial",
    description: "Full tenant improvement across two floors, delivered nights and weekends with zero tenant downtime.",
    tone: "olive" as const,
    feature: false,
  },
  {
    image: projectIndustrial,
    title: "Melrose Yard Facility",
    category: "Industrial",
    description: "18,000 sq ft warehouse shell with office build-out, completed three weeks ahead of schedule.",
    tone: "bronze" as const,
    feature: false,
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      style={{
        background: "var(--surface-inverse)",
        padding: "var(--space-24) var(--space-6)",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <SectionHeading
          eyebrow="Our Work"
          title="Recent builds"
          intro="A small sample of what leaving the site clean and the details right looks like."
          onDark
          style={{ marginBottom: "var(--space-12)", maxWidth: 620 }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "var(--space-8)",
          }}
        >
          {projects.map((project) => (
            <article
              key={project.title}
              style={{
                gridColumn: project.feature ? "span 2" : undefined,
                minWidth: 0,
                background: "var(--surface-card)",
                border: "var(--border-width) solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={project.image}
                alt={`${project.title} — ${project.category} project by KLR Build`}
                loading="lazy"
                style={{
                  width: "100%",
                  aspectRatio: project.feature ? "16 / 9" : "4 / 3",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  padding: "var(--space-6)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-3)",
                  alignItems: "flex-start",
                }}
              >
                <Badge tone={project.tone}>{project.category}</Badge>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontSize: project.feature ? "var(--text-h3)" : "var(--text-h4)",
                    fontWeight: 700,
                    lineHeight: "var(--leading-snug)",
                    letterSpacing: "var(--tracking-tight)",
                    color: "var(--text-primary)",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-body)",
                    lineHeight: "var(--leading-relaxed)",
                    color: "var(--text-secondary)",
                  }}
                >
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
