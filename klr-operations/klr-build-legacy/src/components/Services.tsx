import { Home, Building2, Warehouse, Hammer } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Residential Construction",
      description: "Custom homes, renovations, and additions built to your exact specifications.",
    },
    {
      icon: Building2,
      title: "Commercial Projects",
      description: "Office buildings, retail spaces, and commercial developments of all sizes.",
    },
    {
      icon: Warehouse,
      title: "Industrial Construction",
      description: "Warehouses, manufacturing facilities, and industrial infrastructure.",
    },
    {
      icon: Hammer,
      title: "Renovations & Remodeling",
      description: "Transform existing spaces with expert renovation and remodeling services.",
    },
  ];

  return (
    <section id="services" className="py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-accent mb-3 font-body">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-display mb-6">Our Services</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            Comprehensive construction solutions tailored to meet your needs. From concept to completion, we handle every detail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all border border-border/50 transform hover:-translate-y-2 animate-slide-up group bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <service.icon className="text-accent group-hover:scale-110 transition-transform" size={26} />
                </div>
                <CardTitle className="text-xl font-display">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-body">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
