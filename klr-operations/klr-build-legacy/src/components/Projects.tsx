import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";

const Projects = () => {
  const projects = [
    {
      image: projectResidential,
      title: "Modern Residential",
      category: "Residential",
      description: "Contemporary family home with premium finishes",
    },
    {
      image: projectCommercial,
      title: "Downtown Office Complex",
      category: "Commercial",
      description: "State-of-the-art commercial building",
    },
    {
      image: projectIndustrial,
      title: "Industrial Warehouse",
      category: "Industrial",
      description: "Large-scale warehouse facility",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-background watercolor-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-accent mb-3 font-body">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-display mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            Explore our portfolio of completed projects that showcase our commitment to excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-border/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up bg-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="text-xs text-accent font-semibold mb-2 uppercase tracking-[0.2em] font-body">{project.category}</div>
                <h3 className="text-xl font-display mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-muted-foreground font-body">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
