import OpenAI from 'openai';
import { Restaurant, MenuItem } from '../types/menu';

export async function generateMenu(apiKey: string, prompt: string): Promise<Restaurant> {
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  // Generate menu structure and items
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that generates restaurant menus. Always respond with valid JSON only, no additional text."
      },
      {
        role: "user",
        content: `Generate a complete restaurant menu for: ${prompt}

Create a menu with:
- A creative restaurant name
- A short description (optional)
- 3-5 menu categories (e.g., Appetizers, Main Courses, Desserts, Beverages)
- 3-6 items per category

For each menu item, provide:
- name: the dish name
- description: appetizing description (20-40 words)
- price: realistic price in USD format (e.g., "$12.95")
- category: the category it belongs to

Return ONLY a JSON object in this exact format:
{
  "name": "Restaurant Name",
  "description": "Brief description",
  "sections": [
    {
      "category": "Category Name",
      "items": [
        {
          "name": "Item Name",
          "description": "Item description",
          "price": "$X.XX",
          "category": "Category Name"
        }
      ]
    }
  ]
}`
      }
    ],
    temperature: 0.8,
    max_tokens: 2500
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    throw new Error('No content received from OpenAI');
  }

  const menuData = JSON.parse(content);

  // Add IDs to items
  let itemCounter = 1;
  menuData.sections.forEach((section: any) => {
    section.items = section.items.map((item: any) => ({
      ...item,
      id: `item-${itemCounter++}`
    }));
  });

  return menuData as Restaurant;
}

export type ImageStyle = 'realistic' | 'cartoon' | 'pixel-art' | 'silly';

function getStylePrompt(style: ImageStyle): string {
  switch (style) {
    case 'realistic':
      return 'Professional food photography, restaurant quality, well-lit, appetizing presentation, shallow depth of field, high-end culinary photography style';
    case 'cartoon':
      return 'Anime/manga style illustration, vibrant colors, cartoon food art, japanese animation style, cute and colorful';
    case 'pixel-art':
      return '16-bit pixel art style, retro video game aesthetic, pixel graphics, nostalgic gaming look';
    case 'silly':
      return 'Whimsical and silly illustration, fun cartoon style, playful and humorous, exaggerated features, bright and cheerful';
    default:
      return 'Professional food photography';
  }
}

export async function generateItemImage(
  apiKey: string,
  itemName: string,
  itemDescription: string,
  imageStyle: ImageStyle = 'realistic',
  onProgress?: (status: string) => void
): Promise<string> {
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  if (onProgress) {
    onProgress(`Generating image for ${itemName}...`);
  }

  const stylePrompt = getStylePrompt(imageStyle);
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `${itemName}: ${itemDescription}. ${stylePrompt}`,
    n: 1,
    size: "1024x1024",
    quality: "standard"
  });

  if (!response.data || response.data.length === 0) {
    throw new Error('No image data received from OpenAI');
  }

  return response.data[0].url || '';
}

export async function generateAllImages(
  apiKey: string,
  restaurant: Restaurant,
  imageStyle: ImageStyle = 'realistic',
  onProgress?: (current: number, total: number, itemName: string) => void
): Promise<Restaurant> {
  const allItems: MenuItem[] = [];

  // Collect all items
  restaurant.sections.forEach(section => {
    section.items.forEach(item => {
      allItems.push(item);
    });
  });

  const total = allItems.length;

  // Generate images one by one (to avoid rate limits)
  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];

    if (onProgress) {
      onProgress(i + 1, total, item.name);
    }

    try {
      const imageUrl = await generateItemImage(apiKey, item.name, item.description, imageStyle);
      item.imageUrl = imageUrl;

      // Small delay to avoid rate limiting
      if (i < allItems.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Failed to generate image for ${item.name}:`, error);
      // Continue with other images even if one fails
    }
  }

  return restaurant;
}
