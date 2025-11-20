import { MenuItem } from '../types/menu';

/**
 * Foodish API - Free food images, no API key required
 * https://foodish-api.herokuapp.com/
 */

interface FoodishResponse {
  image: string;
}

/**
 * Get a random food image from Foodish API
 */
async function getRandomFoodImage(): Promise<string> {
  try {
    const response = await fetch('https://foodish-api.herokuapp.com/api/');

    if (!response.ok) {
      throw new Error(`Foodish API request failed: ${response.status}`);
    }

    const data: FoodishResponse = await response.json();
    return data.image;
  } catch (error) {
    console.error('Error fetching from Foodish API:', error);
    // Return a placeholder image URL
    return '';
  }
}

/**
 * Generate an image URL for a menu item using Foodish API
 */
export async function getFoodishImageForItem(
  itemName: string,
  _itemDescription: string,
  onProgress?: (status: string) => void
): Promise<string> {
  if (onProgress) {
    onProgress(`Fetching image for ${itemName}...`);
  }

  // Note: Foodish API returns random food images, not specific to the item name
  // But it's completely free and no API key required!
  return await getRandomFoodImage();
}

/**
 * Generate images for all menu items using Foodish API
 */
export async function generateFoodishImagesForMenu(
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
      const imageUrl = await getFoodishImageForItem(item.name, item.description);
      item.imageUrl = imageUrl;

      // Small delay to be respectful to the API
      if (i < items.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error(`Failed to get Foodish image for ${item.name}:`, error);
      // Continue with other images even if one fails
    }
  }
}
