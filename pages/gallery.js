import { useState, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { getImagesFromFolder } from '../lib/cloudinary';
import cloudinaryLoader, { getCloudinaryBlurDataURL } from '../lib/cloudinaryLoader';

const GALLERY_CATEGORIES = ['single-ekat', 'semi-ekat', 'double-ekat', 'more'];
const ALL_CATEGORIES = 'all'; // Special filter for showing all images

// getStaticProps function remains unchanged (as defined in previous step)
// ... (keep existing getStaticProps here)
export async function getStaticProps() {
  let allImages = [];
  let errorOccurred = false;
  console.log('getStaticProps: Starting to fetch images for gallery categories...');
  for (const category of GALLERY_CATEGORIES) {
    try {
      console.log(`getStaticProps: Fetching images for category: ${category}`);
      const images = await getImagesFromFolder(category);
      // Add blurDataURL to each image object
      const imagesWithBlur = images.map(image => ({
        ...image,
        blurDataURL: getCloudinaryBlurDataURL(image.id) // image.id is the public_id
      }));
      allImages = allImages.concat(imagesWithBlur);
      console.log(`getStaticProps: Successfully fetched ${imagesWithBlur.length} images for ${category}. Total images so far: ${allImages.length}`);
    } catch (error) {
      console.error(`getStaticProps: Error fetching images for category ${category}:`, error.message);
      errorOccurred = true;
    }
  }
  if (errorOccurred && allImages.length === 0) {
    console.warn('getStaticProps: Finished fetching with errors and no images were loaded.');
  } else if (errorOccurred) {
    console.warn('getStaticProps: Finished fetching with some errors, but some images were loaded.');
  } else {
    console.log('getStaticProps: Successfully fetched all images for all categories.');
  }
  return {
    props: {
      images: allImages,
      fetchError: errorOccurred && allImages.length === 0,
    },
    revalidate: 3600,
  };
}

export default function GalleryPage({ images, fetchError }) {
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  const filteredImages = useMemo(() => {
    if (selectedCategory === ALL_CATEGORIES) {
      return images;
    }
    return images.filter(image => image.category === selectedCategory);
  }, [images, selectedCategory]);

  if (fetchError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Head>
          <title>Error - Gallery</title>
        </Head>
        <p>There was an error loading images for the gallery. Please try again later.</p>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Head>
          <title>Empty Gallery</title>
        </Head>
        <p>The gallery is currently empty. Check back soon!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Head>
        <title>Image Gallery - {selectedCategory === ALL_CATEGORIES ? 'All' : selectedCategory}</title>
        <meta name="description" content="Browse our exclusive collection of Patola sarees." />
      </Head>

      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Patola Silk Sarees Gallery</h1>
        <p>Explore our exquisite collection. Prices are in INR.</p>
      </header>

      <nav style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button onClick={() => setSelectedCategory(ALL_CATEGORIES)} disabled={selectedCategory === ALL_CATEGORIES} style={{margin: '5px'}}>
          All
        </button>
        {GALLERY_CATEGORIES.map(category => (
          <button key={category} onClick={() => setSelectedCategory(category)} disabled={selectedCategory === category} style={{margin: '5px'}}>
            {category.replace('-', ' ')} {/* Make button text more readable */}
          </button>
        ))}
      </nav>

      {filteredImages.length === 0 && selectedCategory !== ALL_CATEGORIES && (
        <p style={{ textAlign: 'center' }}>No images found for the category: {selectedCategory.replace('-', ' ')}.</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredImages.map((image, index) => (
          <div key={image.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: '300px' }}> {/* Fixed height container for consistent image sizes */}
              <Image
                loader={cloudinaryLoader}
                src={image.id} // public_id
                alt={`Patola saree - ${image.category} - Price: ${image.price} INR`}
                layout="fill" // 'fill' will fill the parent container
                objectFit="cover" // 'cover' will ensure the image covers the area, cropping if necessary
                                  // 'contain' would show the whole image, possibly with letterboxing
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes, adjust based on your grid
                quality={75} // Default quality
                placeholder="blur"
                blurDataURL={image.blurDataURL || getCloudinaryBlurDataURL(image.id)} // Fallback just in case
                priority={index < 4} // Prioritize loading for the first 4 images
              />
            </div>
            <h3 style={{ marginTop: '10px', fontSize: '1.1em' }}>{image.category.replace('-', ' ')}</h3>
            <p style={{ fontSize: '1em', color: '#333' }}>Price: ₹{image.price.toLocaleString('en-IN')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
