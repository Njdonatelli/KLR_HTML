import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-background watercolor-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-accent mb-3 font-body">Contact Us</p>
          <h2 className="text-4xl md:text-5xl font-display mb-6">Get In Touch</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            Ready to start your project? Contact us today for a free consultation and quote.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-xl border border-border/50 stone-texture">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background/50 font-body"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background/50 font-body"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-background/50 font-body"
              />
              <Textarea
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="bg-background/50 font-body"
              />
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display mb-6">Contact Information</h3>
              <div className="space-y-6">
                {[
                  { icon: Phone, label: "Phone", content: <a href="tel:+16197391135" className="text-muted-foreground hover:text-accent transition-colors font-body">(619) 739-1135</a> },
                  { icon: Mail, label: "Email", content: <a href="mailto:info@klrbuild.com" className="text-muted-foreground hover:text-accent transition-colors font-body">info@klrbuild.com</a> },
                  { icon: MapPin, label: "Location", content: <p className="text-muted-foreground font-body">697 Chimney Rock Drive<br />Oceanside, CA 92058</p> },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-accent" size={22} />
                    </div>
                    <div>
                      <div className="font-display text-sm mb-1">{item.label}</div>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-sand/30 border border-accent/15">
              <h4 className="font-display mb-2">Business Hours</h4>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Monday - Friday: 7:00 AM - 6:00 PM
                <br />
                Saturday: 8:00 AM - 4:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
