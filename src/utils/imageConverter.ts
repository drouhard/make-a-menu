/**
 * Convert an image URL to a base64 data URL
 * This helps preserve images when saving menus to localStorage
 */
export async function convertImageToBase64(imageUrl: string): Promise<string> {
  if (!imageUrl) return '';

  // If it's already a data URL, return it as is
  if (imageUrl.startsWith('data:')) {
    return imageUrl;
  }

  try {
    // Fetch the image
    const response = await fetch(imageUrl, {
      mode: 'cors',
    });

    if (!response.ok) {
      console.warn(`Failed to fetch image: ${imageUrl}`);
      return imageUrl; // Return original URL as fallback
    }

    // Convert to blob
    const blob = await response.blob();

    // Convert blob to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn(`Error converting image to base64:`, error);
    return imageUrl; // Return original URL as fallback
  }
}

/**
 * Convert all images in a menu to base64
 * This ensures images are preserved when saving to localStorage
 */
export async function convertMenuImagesToBase64(
  items: { imageUrl?: string }[],
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const total = items.length;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (onProgress) {
      onProgress(i + 1, total);
    }

    if (item.imageUrl && !item.imageUrl.startsWith('data:')) {
      try {
        item.imageUrl = await convertImageToBase64(item.imageUrl);
      } catch (error) {
        console.warn(`Failed to convert image for item:`, error);
        // Keep the original URL
      }
    }
  }
}
