
import { useState } from "react";

type Category = "all" | "single-ekat" | "semi-ekat" | "double-ekat" | "more";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  // Mock data for gallery items - in real implementation, these would come from Cloudinary
  const galleryItems = [
    { id: 1, category: "single-ekat", price: 12000, image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 2, category: "semi-ekat", price: 15000, image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 3, category: "double-ekat", price: 18000, image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 4, category: "single-ekat", price: 20000, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 5, category: "more", price: 22000, image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 6, category: "semi-ekat", price: 25000, image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 7, category: "double-ekat", price: 28000, image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 8, category: "more", price: 30000, image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 9, category: "single-ekat", price: 32000, image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 10, category: "semi-ekat", price: 35000, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 11, category: "double-ekat", price: 38000, image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 12, category: "more", price: 40000, image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  ];

  const filters = [
    { key: "all" as Category, label: "All" },
    { key: "single-ekat" as Category, label: "Single Ekat" },
    { key: "semi-ekat" as Category, label: "Semi Ekat" },
    { key: "double-ekat" as Category, label: "Double Ekat" },
    { key: "more" as Category, label: "More" },
  ];

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <h1 className="text-foreground text-3xl md:text-4xl font-bold leading-tight">Gallery</h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group aspect-square rounded-xl overflow-hidden relative bg-cover bg-center hover-lift animate-fade-in cursor-pointer"
              style={{ 
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 60%), url("${item.image}")`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <p className="text-white text-lg font-bold leading-tight">
                  ₹ {item.price.toLocaleString()}
                </p>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium bg-primary/80 px-4 py-2 rounded-full">
                  View Details
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
