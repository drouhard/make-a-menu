import { MenuItem } from '../types/menu';

// Flickr API - public photos search
// Using free API, no key required for basic search
const FLICKR_API_KEY = '9c7482096b222c673ca4ce58f9112fe2'; // Public API key for demo purposes

export interface FlickrPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  url: string;
}

/**
 * Search Flickr for Creative Commons licensed images
 */
async function searchFlickrPhotos(query: string, perPage: number = 10): Promise<FlickrPhoto[]> {
  // Flickr API search endpoint
  const url = new URL('https://api.flickr.com/services/rest/');
  url.searchParams.append('method', 'flickr.photos.search');
  url.searchParams.append('api_key', FLICKR_API_KEY);
  url.searchParams.append('text', query);
  url.searchParams.append('license', '4,5,6,7,8,9,10'); // Creative Commons licenses
  url.searchParams.append('sort', 'relevance');
  url.searchParams.append('per_page', perPage.toString());
  url.searchParams.append('format', 'json');
  url.searchParams.append('nojsoncallback', '1');
  url.searchParams.append('safe_search', '1'); // Safe search
  url.searchParams.append('content_type', '1'); // Photos only

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.stat !== 'ok' || !data.photos || !data.photos.photo) {
    throw new Error('Failed to fetch images from Flickr');
  }

  return data.photos.photo.map((photo: any) => {
    // Construct the photo URL
    // Format: https://live.staticflickr.com/{server-id}/{id}_{secret}_c.jpg
    // Using 'c' size (800px on longest side)
    const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`;

    return {
      id: photo.id,
      owner: photo.owner,
      secret: photo.secret,
      server: photo.server,
      farm: photo.farm,
      title: photo.title,
      url: photoUrl
    };
  });
}

/**
 * Generate an image URL for a menu item using Flickr
 */
export async function getFlickrImageForItem(
  itemName: string,
  _itemDescription: string,
  onProgress?: (status: string) => void
): Promise<string> {
  if (onProgress) {
    onProgress(`Searching for image: ${itemName}...`);
  }

  // Create a search query from the item name
  // Remove special characters and just use the food name
  const searchQuery = `${itemName} food`;

  try {
    const photos = await searchFlickrPhotos(searchQuery, 5);

    if (photos.length === 0) {
      // Fallback to a more generic search if no results
      const genericPhotos = await searchFlickrPhotos('food dish', 5);
      if (genericPhotos.length > 0) {
        return genericPhotos[0].url;
      }
      throw new Error(`No images found for ${itemName}`);
    }

    // Return the first (most relevant) photo
    return photos[0].url;
  } catch (error) {
    console.error(`Error fetching Flickr image for ${itemName}:`, error);
    throw error;
  }
}

/**
 * Generate images for all menu items using Flickr
 */
export async function generateFlickrImagesForMenu(
  items: MenuItem[],
  onProgress?: (current: number, total: number, itemName: string) => void
): Promise<void> {
  const total = items.length;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (onProgress) {
      onProgress(i + 1, total, item.name);
    }

    try {
      const imageUrl = await getFlickrImageForItem(item.name, item.description);
      item.imageUrl = imageUrl;

      // Small delay to be respectful to Flickr's API
      if (i < items.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    } catch (error) {
      console.error(`Failed to get Flickr image for ${item.name}:`, error);
      // Continue with other images even if one fails
    }
  }
}
