import { Grid, Waves, TreePine, Lightbulb, Utensils, Leaf } from "lucide-react";

const services = [
  {
    title: "3D Design",
    description: "Visualize your dream outdoor space with our advanced 3D rendering technology before construction begins.",
    icon: Grid,
  },
  {
    title: "Hardscapes",
    description: "Expert installation of retaining walls, pavers, concrete work, and other structural elements.",
    icon: Waves,
  },
  {
    title: "Planting & Xeriscape",
    description: "Drought-resistant landscaping solutions perfect for California's climate with beautiful native plants.",
    icon: TreePine,
  },
  {
    title: "Lighting & Irrigation",
    description: "Smart outdoor lighting and efficient irrigation systems to keep your landscape thriving year-round.",
    icon: Lightbulb,
  },
  {
    title: "Outdoor Kitchens",
    description: "Custom outdoor cooking and entertainment spaces with premium appliances and fire features.",
    icon: Utensils,
  },
  {
    title: "Decks & Pergolas",
    description: "Beautiful outdoor structures that expand your living space and add value to your home.",
    icon: Leaf,
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-[#F5F2EB]" id="services">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Intro Section */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#3a352a] mb-8 leading-tight">
            We Specialize in the <br/> Custom Design and Installation <br/> of Outdoor Environments
          </h2>
          <p className="text-lg text-[#55524c] leading-relaxed">
            Experience outdoor living in a whole new way with KLR BUILD's comprehensive experience and knowledge of design and installation. From fire pits and putting greens to outdoor kitchens, pools, and pergolas, we have the craftsmanship to complete it all with great detail and care.
          </p>
        </div>

        {/* Services Grid Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-[#3a352a] mb-4">
            Our Landscaping Services
          </h2>
          <p className="text-lg text-[#55524c]">
            Comprehensive outdoor solutions designed for North San Diego County's unique climate and lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-xl p-8 shadow-sm border border-border flex flex-col gap-4"
              >
                <div className="text-[#6b5235]">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#3a352a]">
                  {service.title}
                </h3>
                <p className="text-[#55524c] leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
