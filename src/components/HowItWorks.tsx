import { UserPlus, Package, ShieldCheck } from "lucide-react";
import ParallaxSection from "./ParallaxSection";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      number: "01",
      title: "Sign Up & Verify",
      description: "Create your account and complete the verification process to ensure a secure trading environment",
    },
    {
      icon: Package,
      number: "02",
      title: "List or Source Products",
      description: "Easily list your herbal materials or browse authenticated products from verified suppliers",
    },
    {
      icon: ShieldCheck,
      number: "03",
      title: "Seamless, Secure Trade",
      description: "Complete transactions with confidence backed by blockchain technology and smart contracts",
    },
  ];

  return (
    <ParallaxSection
      className="py-24 bg-gradient-to-b from-muted to-background"
      speed={0.35}
      decorations="mixed"
    >
      <section>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get started in three simple steps and join the future of herbal trading
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line for desktop */}
              <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary mx-auto w-2/3 rounded-full"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.number}
                      className={`relative scroll-reveal stagger-${index + 1}`}
                    >
                      {/* Step number badge */}
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl mb-4 relative z-10 group hover:scale-110 transition-transform duration-500">
                          <Icon className="w-10 h-10 text-primary-foreground" />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full animate-pulse-glow opacity-50" />
                        </div>
                        <span className="text-5xl font-bold text-gradient opacity-30">
                          {step.number}
                        </span>
                      </div>

                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};

export default HowItWorks;
