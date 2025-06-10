
import { Palette, Hand, Heart } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Palette,
      title: "Artistry",
      description: "Patola art is characterized by its complex geometric patterns and vibrant color palettes, showcasing the artistic vision of skilled artisans."
    },
    {
      icon: Hand,
      title: "Craftsmanship", 
      description: "Each Patola sari is meticulously handwoven using the double ikat technique, a labor-intensive process that ensures precision and quality."
    },
    {
      icon: Heart,
      title: "Heritage",
      description: "Patola saris are not just garments; they are symbols of cultural heritage, representing the artistic legacy and traditions of the region."
    }
  ];

  return (
    <div className="flex flex-col gap-10 px-4 py-10 @container">
      <div className="flex flex-col gap-4 animate-fade-in">
        <h2 className="text-foreground tracking-light text-[32px] md:text-4xl font-bold leading-tight max-w-[720px]">
          About Patola Art
        </h2>
        <p className="text-foreground text-base md:text-lg font-normal leading-normal max-w-[720px] text-muted-foreground">
          Patola is a double ikat woven sari, usually made from silk, is a traditional textile art form with a rich history. Originating in the region, Patola saris are renowned for their intricate designs, vibrant colors, and exceptional craftsmanship. Each sari is a masterpiece, reflecting the cultural heritage and artistic skill passed down through generations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className="flex flex-1 gap-3 rounded-lg border border-border bg-card p-6 flex-col hover-lift animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-foreground">
              <feature.icon size={24} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-foreground text-base font-bold leading-tight">{feature.title}</h3>
              <p className="text-muted-foreground text-sm font-normal leading-normal">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
