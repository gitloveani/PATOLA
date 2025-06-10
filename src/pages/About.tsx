
import { Palette, Hand, Heart, Award, Users, Clock } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Palette,
      title: "Artistry",
      description: "Complex geometric patterns and vibrant color palettes showcase the artistic vision of skilled artisans."
    },
    {
      icon: Hand,
      title: "Craftsmanship", 
      description: "Each Patola sari is meticulously handwoven using the double ikat technique, ensuring precision and quality."
    },
    {
      icon: Heart,
      title: "Heritage",
      description: "Symbols of cultural heritage, representing the artistic legacy and traditions passed down through generations."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Recognized for outstanding quality and authenticity in traditional textile art worldwide."
    },
    {
      icon: Users,
      title: "Community",
      description: "Supporting local artisan communities and preserving traditional weaving techniques."
    },
    {
      icon: Clock,
      title: "Tradition",
      description: "Centuries-old techniques refined and perfected through generations of master weavers."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-foreground text-4xl md:text-5xl font-bold leading-tight mb-6">
            About J K PATOLA
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            For generations, we have been custodians of the ancient art of Patola weaving, preserving this magnificent tradition while creating timeless pieces that celebrate India's rich textile heritage.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-in">
            <h2 className="text-foreground text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Patola is a double ikat woven sari, usually made from silk, representing one of the finest textile art forms in the world. Our workshop has been at the forefront of preserving this ancient craft, where each piece tells a story of dedication, skill, and cultural pride.
              </p>
              <p>
                The intricate process of creating a Patola sari can take anywhere from six months to over a year, depending on the complexity of the design. Our master weavers employ the resist-dyeing technique on both warp and weft threads before weaving, creating patterns that are identical on both sides of the fabric.
              </p>
              <p>
                Every Patola sari is a masterpiece, reflecting not just exceptional craftsmanship but also the cultural heritage and artistic legacy that has been carefully passed down through generations of skilled artisans.
              </p>
            </div>
          </div>

          <div className="animate-fade-in">
            <div 
              className="aspect-square rounded-xl bg-cover bg-center"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")`
              }}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-foreground text-2xl md:text-3xl font-bold text-center mb-12 animate-fade-in">
            What Makes Us Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-foreground">
                  <feature.icon size={28} />
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-secondary rounded-xl p-8 md:p-12 animate-fade-in">
          <h3 className="text-foreground text-2xl md:text-3xl font-bold mb-4">
            Experience the Art of Patola
          </h3>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Each piece in our collection represents months of meticulous work and centuries of tradition. Discover the beauty and heritage of authentic Patola textiles.
          </p>
          <a 
            href="/gallery"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-3 text-base font-semibold hover:bg-primary/90 transition-colors"
          >
            View Our Collection
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
