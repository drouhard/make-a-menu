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
- A brief, understated description (optional, 1-2 sentences max)
- 3-5 menu categories (e.g., Appetizers, Main Courses, Desserts, Beverages)
- 3-6 items per category

IMPORTANT: Write like a real restaurant menu, not marketing copy:
- Keep descriptions SHORT and SIMPLE (8-15 words max)
- Focus on key ingredients, not adjectives
- Avoid excessive marketing language like "mouth-watering," "indulgent retreat," "artisanal journey"
- Use concise, ingredient-focused descriptions
- Examples of good descriptions:
  * "Butter croissant with dark chocolate"
  * "Fresh mozzarella, tomato, basil, olive oil"
  * "Grilled salmon with lemon butter, seasonal vegetables"
  * "House-made pasta with tomato sauce and parmesan"

For each menu item, provide:
- name: the dish name (simple, authentic)
- description: concise, ingredient-focused description (8-15 words)
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

export type ImageStyle = 'clip-art' | 'realistic' | 'cartoon' | 'pixel-art' | 'watercolor' | 'sketch' | 'silly' | 'custom';

function getStylePrompt(style: ImageStyle, customPrompt?: string): string {
  switch (style) {
    case 'clip-art':
      return 'Simple clean clip art style, vector graphics look, bold outlines, flat colors, minimalist illustration, friendly and approachable design';
    case 'realistic':
      return 'Professional food photography, restaurant quality, well-lit, appetizing presentation, shallow depth of field, high-end culinary photography style';
    case 'cartoon':
      return 'Anime/manga style illustration, vibrant colors, cartoon food art, japanese animation style, cute and colorful';
    case 'pixel-art':
      return '16-bit pixel art style, retro video game aesthetic, pixel graphics, nostalgic gaming look';
    case 'watercolor':
      return 'Watercolor painting style, soft colors, artistic brush strokes, elegant and delicate, hand-painted look, artistic presentation';
    case 'sketch':
      return 'Hand-drawn pencil sketch style, artistic line work, sketchy illustration, black and white or light coloring, artistic and rustic';
    case 'silly':
      return 'Whimsical and silly illustration, fun cartoon style, playful and humorous, exaggerated features, bright and cheerful';
    case 'custom':
      return customPrompt || 'Simple clean illustration';
    default:
      return 'Simple clean clip art style, vector graphics look, bold outlines, flat colors';
  }
}

export async function generateItemImage(
  apiKey: string,
  itemName: string,
  itemDescription: string,
  imageStyle: ImageStyle = 'clip-art',
  backgroundPrompt: string = 'plain white background',
  customStylePrompt?: string,
  onProgress?: (status: string) => void
): Promise<string> {
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });

  if (onProgress) {
    onProgress(`Generating image for ${itemName}...`);
  }

  const stylePrompt = getStylePrompt(imageStyle, customStylePrompt);
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt: `${itemName}: ${itemDescription}. ${stylePrompt}. Background: ${backgroundPrompt}`,
    n: 1,
    size: "256x256"
  });

  if (!response.data || response.data.length === 0) {
    throw new Error('No image data received from OpenAI');
  }

  return response.data[0].url || '';
}

export async function generateAllImages(
  apiKey: string,
  restaurant: Restaurant,
  imageStyle: ImageStyle = 'clip-art',
  backgroundPrompt: string = 'plain white background',
  customStylePrompt?: string,
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
      const imageUrl = await generateItemImage(apiKey, item.name, item.description, imageStyle, backgroundPrompt, customStylePrompt);
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
