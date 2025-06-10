import { getImagesFromFolder } from '../../../lib/cloudinary';

// Folder whitelist is managed within getImagesFromFolder

export default async function handler(req, res) {
  const { folder } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // The folder validation is handled by getImagesFromFolder
    const images = await getImagesFromFolder(folder);

    // Set caching headers
    // Cache on Vercel's edge (s-maxage) for 1 hour.
    // stale-while-revalidate allows serving stale content if available while revalidating in the background.
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    return res.status(200).json(images);
  } catch (error) {
    console.error(`API error fetching gallery for folder ${folder}:`, error.message);
    // Check if it's a known error type (e.g., invalid folder from our utility)
    if (error.message.startsWith('Invalid folder name')) {
      return res.status(400).json({ error: error.message });
    }
    // Generic server error for other issues
    return res.status(500).json({ error: 'An unexpected error occurred while fetching images.' });
  }
}
