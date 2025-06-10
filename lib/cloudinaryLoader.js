// lib/cloudinaryLoader.js

// Ensure this cloud name is consistent with your actual Cloudinary cloud name
// It's being fetched from the .env.local file.
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

if (!CLOUDINARY_CLOUD_NAME) {
  // This message is more for development. In production, Vercel env vars should be set.
  console.warn(
    'Cloudinary cloud name not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment variables.'
  );
}

/**
 * Custom loader for Next.js Image component to use Cloudinary.
 *
 * @param {object} params
 * @param {string} params.src - The public_id of the Cloudinary image.
 * @param {number} params.width - The width of the image requested by Next.js.
 * @param {number} [params.quality] - The quality of the image requested by Next.js (1-100).
 * @returns {string} The Cloudinary URL with transformations.
 */
export default function cloudinaryLoader({ src, width, quality }) {
  if (!CLOUDINARY_CLOUD_NAME) {
    // Fallback or throw error if cloud name is not set
    // For now, returning the original src might show a broken image but won't break the app
    console.error('cloudinaryLoader: Cloudinary cloud name is not available.');
    return src; // Or throw an error
  }

  // src is expected to be the public_id of the image.
  // Example: 'single-ekat/15000'
  // Remove leading slash if any, as public_id should not start with / for URL construction
  const publicId = src.startsWith('/') ? src.substring(1) : src;

  // Cloudinary transformation parameters
  // f_auto: Automatically select the best format (WebP, AVIF if supported)
  // q_auto: Automatically adjust quality
  // w_auto: (Not directly used here, Next.js provides specific widths)
  // Instead of w_auto, we use the width provided by Next.js.
  // dpr_auto: (Optional) Automatically set Device Pixel Ratio
  const params = ['f_auto', 'q_auto'];
  if (width) {
    params.push(`w_${width}`);
  }
  if (quality) {
    params.push(`q_${quality}`);
  }

  const transformations = params.join(',');

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

/**
 * Generates a blurDataURL for a Cloudinary image.
 * This creates a very small, low-quality, blurred version of the image.
 *
 * @param {string} publicId - The public_id of the Cloudinary image.
 * @returns {string} The Cloudinary URL for the blurred placeholder.
 */
export function getCloudinaryBlurDataURL(publicId) {
  if (!CLOUDINARY_CLOUD_NAME || !publicId) {
    return null;
  }
  // Example transformations for a small, blurred placeholder:
  // w_10: width of 10px
  // e_blur:1000: strong blur effect
  // q_1: very low quality
  // f_auto: auto format
  const cleanPublicId = publicId.startsWith('/') ? publicId.substring(1) : publicId;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_20,h_20,e_blur:500,q_1,f_auto/${cleanPublicId}`;
}
