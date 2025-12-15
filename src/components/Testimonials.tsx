import { Quote } from "lucide-react";
import ParallaxSection from "./ParallaxSection";

const Testimonials = () => {
  const testimonials = [
    {
      name: "James",
      location: "Bogor, Indonesia",
      quote: "HerBlocX helps me import and export herbal materials easily and safely. The blockchain verification gives me confidence in every transaction.",
      role: "Herbal Supplier",
    },
    {
      name: "Reza",
      location: "California, USA",
      quote: "The transparency and quality assurance provided by HerBlocX has transformed how we source our herbal ingredients. Highly recommended!",
      role: "Health Products Manufacturer",
    },
    {
      name: "Steven",
      location: "Toronto, Canada",
      quote: "As an importer, finding reliable suppliers was always a challenge. HerBlocX made it seamless with their verified network and secure platform.",
      role: "International Trader",
    },
  ];

  return (
    <ParallaxSection
      className="py-24 bg-gradient-to-b from-muted to-background"
      speed={0.25}
      decorations="secondary"
    >
      <section id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Trusted by <span className="text-gradient">Traders Worldwide</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from our community of satisfied herbal traders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`group bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 scroll-reveal relative stagger-${index + 1}`}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Quote className="w-5 h-5 text-primary-foreground" />
                </div>
                
                <div className="mb-6 mt-4">
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="border-t border-border/50 pt-4">
                  <p className="font-semibold text-foreground text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-primary mt-1">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};

export default Testimonials;
