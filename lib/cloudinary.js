import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
// The configuration will automatically use CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY,
// and CLOUDINARY_API_SECRET from environment variables when run in a Node.js environment (like Vercel serverless functions or during build).
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Ensure secure URLs are generated
});

// Define the folder whitelist
const VALID_FOLDERS = ['single-ekat', 'semi-ekat', 'double-ekat', 'more'];

/**
 * Fetches images from a specified Cloudinary folder.
 *
 * @param {string} folderName The name of the folder to fetch images from.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of image objects.
 * Each object contains id, url, category, and price.
 * @throws {Error} If the folderName is not valid or if there's an API error.
 */
export async function getImagesFromFolder(folderName) {
  if (!VALID_FOLDERS.includes(folderName)) {
    throw new Error(`Invalid folder name: ${folderName}. Allowed folders are: ${VALID_FOLDERS.join(', ')}`);
  }

  try {
    const results = await cloudinary.search
      .expression(`folder=${folderName}`)
      .sort_by('public_id', 'desc')
      .max_results(100) // Adjust as needed, or implement pagination if you expect more
      .execute();

    return results.resources.map((resource) => {
      // Extract filename from public_id (e.g., "single-ekat/15000" -> "15000")
      const parts = resource.public_id.split('/');
      const filenameWithExtension = parts.length > 1 ? parts[parts.length - 1] : parts[0];
      // Remove extension if any (Cloudinary public_ids usually don't have them for images)
      const filename = filenameWithExtension.split('.')[0];

      return {
        id: resource.public_id,
        url: resource.secure_url,
        category: folderName,
        price: parseInt(filename, 10) || 0, // Parse price as integer, default to 0 if NaN
      };
    });
  } catch (error) {
    console.error(`Error fetching images from Cloudinary folder ${folderName}:`, error);
    // It's important to decide how to handle errors.
    // For getStaticProps, throwing an error might fail the build for that path.
    // Returning an empty array or a specific error object might be preferable.
    // For now, let it throw to be caught by the caller.
    throw new Error(`Failed to fetch images from Cloudinary for folder ${folderName}.`);
  }
}

export default cloudinary;
