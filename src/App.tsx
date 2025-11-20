import { useState, useEffect } from 'react';
import { Restaurant, MenuItem, ViewMode } from './types/menu';
import { sushiRestaurant } from './data/sushiMenu';
import { generateMenu, generateAllImages } from './services/openai';
import { generateFlickrImagesForMenu } from './services/flickr';
import { generatePexelsImagesForMenu } from './services/pexels';
import { saveMenuToHistory, getDarkMode, saveDarkMode } from './utils/storage';
import { convertMenuImagesToBase64 } from './utils/imageConverter';
import { Header } from './components/Header';
import { MenuGenerator, ImageStyle, ImageSource } from './components/MenuGenerator';
import { ImageGenerator } from './components/ImageGenerator';
import { MenuHistory } from './components/MenuHistory';
import { MenuDisplay } from './components/MenuDisplay';
import { PrintControls } from './components/PrintControls';
import { ItemCards } from './components/ItemCards';
import './App.css';

function App() {
  const [restaurant, setRestaurant] = useState<Restaurant>(sushiRestaurant);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string>('');
  const [imageGenerationStatus, setImageGenerationStatus] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(getDarkMode());
  const [viewMode, setViewMode] = useState<ViewMode>('menu');
  const [hasGeneratedMenu, setHasGeneratedMenu] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [flickrApiKey, setFlickrApiKey] = useState('');
  const [pexelsApiKey, setPexelsApiKey] = useState('');

  useEffect(() => {
    // Apply dark mode class to document root
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveDarkMode(isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleApiKeysChange = (newApiKey: string, newFlickrKey: string, newPexelsKey: string) => {
    setApiKey(newApiKey);
    setFlickrApiKey(newFlickrKey);
    setPexelsApiKey(newPexelsKey);
  };

  const handleGenerateMenu = async (apiKey: string, prompt: string) => {
    setIsGenerating(true);
    setGenerationStatus('Generating menu structure and items...');

    try {
      // Generate menu text only (no images)
      const newMenu = await generateMenu(apiKey, prompt);
      setRestaurant(newMenu);
      setHasGeneratedMenu(true);

      // Save to history
      saveMenuToHistory(newMenu, prompt);

      setGenerationStatus('Menu created! You can now generate images in Step 2.');

      // Clear status after a few seconds
      setTimeout(() => {
        setGenerationStatus('');
      }, 3000);
    } catch (error: any) {
      console.error('Generation error:', error);
      setGenerationStatus(
        `Error: ${error.message || 'Failed to generate menu. Please check your API key and try again.'}`
      );

      // Clear error after 5 seconds
      setTimeout(() => {
        setGenerationStatus('');
      }, 5000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImages = async (
    apiKey: string,
    flickrApiKey: string,
    pexelsApiKey: string,
    imageStyle: ImageStyle,
    imageSource: ImageSource,
    backgroundPrompt: string,
    customStylePrompt?: string
  ) => {
    setIsGeneratingImages(true);
    setImageGenerationStatus('Starting image generation...');

    try {
      // Collect all items
      const allItems: MenuItem[] = [];
      restaurant.sections.forEach(section => {
        section.items.forEach(item => {
          allItems.push(item);
        });
      });

      if (imageSource === 'openai') {
        // Use OpenAI DALL-E for images
        const menuWithImages = await generateAllImages(
          apiKey,
          restaurant,
          imageStyle,
          backgroundPrompt,
          customStylePrompt,
          (current, total, itemName) => {
            setImageGenerationStatus(`Generating images with DALL-E: ${current}/${total} - ${itemName}`);
          }
        );
        setRestaurant({ ...menuWithImages });
      } else if (imageSource === 'flickr') {
        // Use Flickr for images
        await generateFlickrImagesForMenu(
          flickrApiKey,
          allItems,
          (current, total, itemName) => {
            setImageGenerationStatus(`Finding images from Flickr: ${current}/${total} - ${itemName}`);
          }
        );
        setRestaurant({ ...restaurant });
      } else if (imageSource === 'pexels') {
        // Use Pexels for images
        await generatePexelsImagesForMenu(
          allItems,
          pexelsApiKey,
          (current, total, itemName) => {
            setImageGenerationStatus(`Finding images from Pexels: ${current}/${total} - ${itemName}`);
          }
        );
        setRestaurant({ ...restaurant });
      }

      setImageGenerationStatus('Saving images...');

      // Convert images to base64 before saving (so they persist)
      try {
        await convertMenuImagesToBase64(allItems, (current, total) => {
          setImageGenerationStatus(`Saving images: ${current}/${total}...`);
        });
      } catch (error) {
        console.warn('Some images could not be converted to base64:', error);
      }

      setImageGenerationStatus('All done! Images are ready.');

      // Clear status after a few seconds
      setTimeout(() => {
        setImageGenerationStatus('');
      }, 3000);
    } catch (error: any) {
      console.error('Image generation error:', error);
      setImageGenerationStatus(
        `Error: ${error.message || 'Failed to generate images. Please check your API keys and try again.'}`
      );

      // Clear error after 5 seconds
      setTimeout(() => {
        setImageGenerationStatus('');
      }, 5000);
    } finally {
      setIsGeneratingImages(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 print:bg-white transition-colors">
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto px-4 py-8">
        {/* Controls - Hidden when printing */}
        <div className="print:hidden">
          <MenuGenerator
            onGenerate={handleGenerateMenu}
            isGenerating={isGenerating}
            generationStatus={generationStatus}
            onApiKeysChange={handleApiKeysChange}
          />

          {hasGeneratedMenu && (
            <ImageGenerator
              onGenerate={handleGenerateImages}
              isGenerating={isGeneratingImages}
              generationStatus={imageGenerationStatus}
              apiKey={apiKey}
              flickrApiKey={flickrApiKey}
              pexelsApiKey={pexelsApiKey}
            />
          )}

          <MenuHistory onLoadMenu={setRestaurant} />

          {/* Print Controls */}
          <PrintControls viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {/* Content */}
        {viewMode === 'menu' ? (
          <MenuDisplay restaurant={restaurant} />
        ) : (
          <ItemCards restaurant={restaurant} />
        )}
      </main>
    </div>
  );
}

export default App;
