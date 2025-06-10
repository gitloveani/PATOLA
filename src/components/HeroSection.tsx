import { Link } from "react-router-dom";
import { siteConfig } from "@/config/siteConfig";

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="@container">
        <div className="@[480px]:p-4">
          <div
            className="flex min-h-[480px] md:min-h-[600px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("${siteConfig.images.heroBackground}")`
            }}
          >
            <div className="flex flex-col gap-4 text-center animate-fade-in">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em]">
                J K PATOLA
              </h1>
              <p className="text-white text-sm md:text-base lg:text-lg font-normal leading-normal max-w-2xl px-4">
                Discover the timeless beauty of Patola art, a cherished textile tradition. Each piece is a testament to meticulous craftsmanship and cultural heritage, offering a unique blend of artistry and elegance.
              </p>
            </div>
            
            <Link 
              to="/gallery"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 md:h-12 px-4 md:px-5 bg-accent text-primary text-sm md:text-base font-bold leading-normal tracking-[0.015em] hover:bg-accent/90 transition-all duration-300 hover:scale-105 animate-scale-in"
            >
              <span className="truncate">Explore Collection</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
