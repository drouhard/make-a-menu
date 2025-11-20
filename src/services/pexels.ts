import { MenuItem } from '../types/menu';

/**
 * Pexels API - Free high-quality food images
 * https://www.pexels.com/api/
 * Free API key at: https://www.pexels.com/api/new/
 */

interface PexelsPhoto {
  id: number;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
  };
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
}

/**
 * Search for a food image using Pexels API
 */
async function searchPexelsImage(query: string, apiKey: string): Promise<string> {
  try {
    // Search for the specific food item
    const searchQuery = encodeURIComponent(`${query} food dish meal`);
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=15&orientation=landscape`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API request failed: ${response.status}`);
    }

    const data: PexelsResponse = await response.json();

    if (data.photos && data.photos.length > 0) {
      // Pick a random photo from the results
      const randomIndex = Math.floor(Math.random() * Math.min(data.photos.length, 5));
      return data.photos[randomIndex].src.medium;
    }

    // If no specific results, try a generic food search
    const fallbackResponse = await fetch(
      `https://api.pexels.com/v1/search?query=food&per_page=15&orientation=landscape`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (fallbackResponse.ok) {
      const fallbackData: PexelsResponse = await fallbackResponse.json();
      if (fallbackData.photos && fallbackData.photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * fallbackData.photos.length);
        return fallbackData.photos[randomIndex].src.medium;
      }
    }

    return '';
  } catch (error) {
    console.error('Error fetching from Pexels API:', error);
    return '';
  }
}

/**
 * Generate an image URL for a menu item using Pexels API
 */
export async function getPexelsImageForItem(
  itemName: string,
  _itemDescription: string,
  apiKey: string,
  onProgress?: (status: string) => void
): Promise<string> {
  if (onProgress) {
    onProgress(`Searching Pexels for ${itemName}...`);
  }

  return await searchPexelsImage(itemName, apiKey);
}

/**
 * Generate images for all menu items using Pexels API
 */
export async function generatePexelsImagesForMenu(
  items: MenuItem[],
  apiKey: string,
  onProgress?: (current: number, total: number, itemName: string) => void
): Promise<void> {
  const total = items.length;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (onProgress) {
      onProgress(i + 1, total, item.name);
    }

    try {
      const imageUrl = await getPexelsImageForItem(item.name, item.description, apiKey);
      item.imageUrl = imageUrl;

      // Small delay to respect API rate limits (avoid hitting limits)
      if (i < items.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    } catch (error) {
      console.error(`Failed to get Pexels image for ${item.name}:`, error);
      // Continue with other images even if one fails
    }
  }
}
