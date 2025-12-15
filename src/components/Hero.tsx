import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const titleWords = "Because Your Business Deserves More Than Uncertainty".split(" ");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Title */}
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight"
          >
            {titleWords.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-[0.25em] transition-all duration-700 ${
                  titleVisible
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-8 blur-sm"
                }`}
                style={{
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Subtitle with fade-in */}
          <p
            className={`text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto transition-all duration-1000 delay-700 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Herbal Supply Chain, Secured by Blockchain
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1000 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] rounded-full border-2 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Learn More
            </Button>
            <Button
              size="lg"
              className="min-w-[200px] rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
            >
              Claim Your Access Now
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${
          titleVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
