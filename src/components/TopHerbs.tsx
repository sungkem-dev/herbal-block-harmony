import { Button } from "@/components/ui/button";
import turmericImg from "@/assets/turmeric.jpg";
import cinnamonImg from "@/assets/cinnamon.jpg";
import andrographisImg from "@/assets/andrographis.jpg";

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
    <section id="discovery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Top Herbs
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our premium selection of authenticated herbal materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {herbs.map((herb, index) => (
            <div
              key={herb.name}
              className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 fade-in-up border border-border"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={herb.image}
                  alt={herb.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {herb.name}
                </h3>
                <p className="text-sm text-muted-foreground italic mb-3">
                  {herb.scientificName}
                </p>
                <p className="text-muted-foreground">
                  {herb.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Button variant="outline" size="lg" className="shadow-md">
            View Full Herbal Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopHerbs;
