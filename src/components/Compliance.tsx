import { CheckCircle } from "lucide-react";

const Compliance = () => {
  const certifications = [
    { name: "GMP", description: "Good Manufacturing Practice" },
    { name: "CPOTB", description: "Certificate of Pharmaceutical Product" },
    { name: "BPOM/FDA", description: "Food and Drug Administration Approved" },
    { name: "Phytosanitary", description: "Plant Health Certificate" },
    { name: "Halal & Organic", description: "Certified Halal and Organic Standards" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Compliance & Certification
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
                className="flex items-start space-x-4 bg-card p-6 rounded-lg border border-border hover:border-primary transition-all duration-300 hover:shadow-lg fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
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
  );
};

export default Compliance;
