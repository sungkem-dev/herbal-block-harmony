import { Shield, Award, CheckCircle2 } from "lucide-react";
import ParallaxSection from "./ParallaxSection";

const WhyChoose = () => {
  const features = [
    {
      icon: Shield,
      title: "Transparency",
      description: "Data-driven traceability for a smarter supply chain",
    },
    {
      icon: CheckCircle2,
      title: "Purity",
      description: "Less adulteration, authenticated materials",
    },
    {
      icon: Award,
      title: "Quality",
      description: "Verified, tested, and certified for excellence",
    },
  ];

  return (
    <ParallaxSection
      className="py-24 bg-gradient-to-b from-background to-muted"
      speed={0.3}
      decorations="primary"
    >
      <section id="about">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose <span className="text-gradient">HerBlocX</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Building trust through technology and transparency in every transaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 scroll-reveal border border-border/50 stagger-${index + 1}`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};

export default WhyChoose;
