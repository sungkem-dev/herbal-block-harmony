import { Shield, Award, CheckCircle2 } from "lucide-react";

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
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose HerBlocX
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
                className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 fade-in-up border border-border"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
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
  );
};

export default WhyChoose;
