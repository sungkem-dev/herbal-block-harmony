import { Button } from "@/components/ui/button";
import turmericImg from "@/assets/turmeric.jpg";
import cinnamonImg from "@/assets/cinnamon.jpg";
import andrographisImg from "@/assets/andrographis.jpg";
import ParallaxSection from "./ParallaxSection";

const TopHerbs = () => {
  const herbs = [
    {
      name: "Turmeric",
      scientificName: "Curcuma longa",
      image: turmericImg,
      description: "Known for its anti-inflammatory properties and golden color",
    },
    {
      name: "Cinnamon",
      scientificName: "Cinnamomum verum",
      image: cinnamonImg,
      description: "Premium quality cinnamon with natural sweet aroma",
    },
    {
      name: "King of Bitter",
      scientificName: "Andrographis paniculata",
      image: andrographisImg,
      description: "Traditional herb known for immune system support",
    },
  ];

  return (
    <ParallaxSection
      className="py-24 bg-background"
      speed={0.25}
      decorations="secondary"
    >
      <section id="discovery">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Top <span className="text-gradient">Herbs</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our premium selection of authenticated herbal materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {herbs.map((herb, index) => (
              <div
                key={herb.name}
                className={`group bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 scroll-reveal border border-border/50 stagger-${index + 1}`}
              >
                <div className="aspect-square overflow-hidden bg-muted relative">
                  <img
                    src={herb.image}
                    alt={herb.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {herb.name}
                  </h3>
                  <p className="text-sm text-primary italic mb-3">
                    {herb.scientificName}
                  </p>
                  <p className="text-muted-foreground">
                    {herb.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center scroll-reveal stagger-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-2 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              View Full Herbal Catalog
            </Button>
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};

export default TopHerbs;
