import { CheckCircle } from "lucide-react";
import ParallaxSection from "./ParallaxSection";

const Compliance = () => {
  const certifications = [
    { name: "GMP", description: "Good Manufacturing Practice" },
    { name: "CPOTB", description: "Certificate of Pharmaceutical Product" },
    { name: "BPOM/FDA", description: "Food and Drug Administration Approved" },
    { name: "Phytosanitary", description: "Plant Health Certificate" },
    { name: "Halal & Organic", description: "Certified Halal and Organic Standards" },
  ];

  return (
    <ParallaxSection
      className="py-24 bg-background"
      speed={0.3}
      decorations="primary"
    >
      <section>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Compliance & <span className="text-gradient">Certification</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Meeting international standards for quality and safety
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={cert.name}
                  className={`group flex items-start space-x-4 bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 scroll-reveal stagger-${Math.min(index + 1, 5)}`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};

export default Compliance;
