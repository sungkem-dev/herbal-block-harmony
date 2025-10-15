import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(47, 133, 90, 0.85) 0%, rgba(64, 127, 190, 0.85) 100%), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
            Because Your Business Deserves More Than Uncertainty
          </h1>
          <p className="text-xl md:text-2xl text-background/90 mb-12 font-light">
            Herbal Supply Chain, Secured by Blockchain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero-outline" size="lg" className="min-w-[200px]">
              Learn More
            </Button>
            <Button variant="hero" size="lg" className="min-w-[200px]">
              Claim Your Access Now
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-background/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
