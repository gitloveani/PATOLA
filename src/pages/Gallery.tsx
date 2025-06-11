
import { useState, useEffect } from "react";

type Category = "all" | "single-ekat" | "semi-ekat" | "double-ekat" | "more";

// Define a type for the gallery items
interface GalleryItem {
  id: string; // Changed from number to string to match Cloudinary's public_id
  category: Category;
  price: number;
  image: string;
}

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllImages = async () => {
      setIsLoading(true);
      setError(null);
      const folders = ['single-ekat', 'semi-ekat', 'double-ekat', 'more'];
      try {
        const allFolderPromises = folders.map(folder =>
          fetch(`/api/gallery/${folder}`).then(res => {
            if (!res.ok) {
              throw new Error(`Failed to fetch ${folder}`);
            }
            return res.json();
          })
        );

        const resultsByFolder = await Promise.all(allFolderPromises);
        
        // Flatten the array of arrays and map to GalleryItem structure
        const fetchedItems = resultsByFolder.flat().map((item: any, index: number) => {
          // Determine category based on the folder or item data if available
          // This assumes the API returns items that might not have a category field,
          // or you want to override it based on the folder it was fetched from.
          // Adjust logic as per your actual API response structure.
          let category: Category = 'more'; // Default category
          if (item.folder) { // Assuming API might return a folder property
            const folderName = item.folder.toLowerCase();
            if (folderName.includes('single-ekat')) category = 'single-ekat';
            else if (folderName.includes('semi-ekat')) category = 'semi-ekat';
            else if (folderName.includes('double-ekat')) category = 'double-ekat';
          } else {
            // Fallback or alternative logic if item.folder is not present
            // This part needs to be robust based on how categories are determined
            // For now, let's try to infer from a potential item.category or default
            if (folders.includes(item.category)) {
              category = item.category as Category;
            }
            // A simple price might be available directly or needs to be set default/fetched
          }

          return {
            id: item.public_id || `item-${index}`, // Use public_id from Cloudinary, fallback to generated ID
            category: category, // Category determined above
            price: item.price || 0, // Use price from item or default to 0
            image: item.url, // URL from Cloudinary
          };
        });
        
        setGalleryItems(fetchedItems);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch gallery items:", err);
        setError("Failed to load gallery images. Please try again later.");
        setGalleryItems([]); 
        setIsLoading(false);
      }
    };

    fetchAllImages();
  }, []); // Empty dependency array ensures this runs once on mount

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

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Loading gallery...</p>
            {/* Optionally, add a spinner here */}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive text-lg">{error}</p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
