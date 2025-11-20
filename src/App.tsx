import { useState, useEffect } from 'react';
import { Restaurant, MenuItem, ViewMode } from './types/menu';
import { sushiRestaurant } from './data/sushiMenu';
import { generateMenu, generateAllImages } from './services/openai';
import { generateFlickrImagesForMenu } from './services/flickr';
import { generateFoodishImagesForMenu } from './services/foodish';
import { saveMenuToHistory, getDarkMode, saveDarkMode } from './utils/storage';
import { convertMenuImagesToBase64 } from './utils/imageConverter';
import { Header } from './components/Header';
import { MenuGenerator, ImageStyle, ImageSource } from './components/MenuGenerator';
import { MenuHistory } from './components/MenuHistory';
import { MenuDisplay } from './components/MenuDisplay';
import { PrintControls } from './components/PrintControls';
import { ItemCards } from './components/ItemCards';
import './App.css';

function App() {
  const [restaurant, setRestaurant] = useState<Restaurant>(sushiRestaurant);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(getDarkMode());
  const [viewMode, setViewMode] = useState<ViewMode>('menu');

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

  const handleGenerate = async (apiKey: string, flickrApiKey: string, prompt: string, imageStyle: ImageStyle, imageSource: ImageSource, customStylePrompt?: string) => {
    setIsGenerating(true);
    setGenerationStatus('Generating menu structure and items...');

    try {
      // Step 1: Generate menu text (always uses OpenAI for menu structure)
      const newMenu = await generateMenu(apiKey, prompt);
      setRestaurant(newMenu);
      setGenerationStatus('Menu created! Now generating images...');

      // Step 2: Generate images based on selected source
      const allItems: MenuItem[] = [];
      newMenu.sections.forEach(section => {
        section.items.forEach(item => {
          allItems.push(item);
        });
      });

      if (imageSource === 'openai') {
        // Use OpenAI DALL-E for images
        const menuWithImages = await generateAllImages(
          apiKey,
          newMenu,
          imageStyle,
          customStylePrompt,
          (current, total, itemName) => {
            setGenerationStatus(`Generating images with DALL-E: ${current}/${total} - ${itemName}`);
          }
        );
        setRestaurant(menuWithImages);
      } else if (imageSource === 'flickr') {
        // Use Flickr for images
        await generateFlickrImagesForMenu(
          flickrApiKey,
          allItems,
          (current, total, itemName) => {
            setGenerationStatus(`Finding images from Flickr: ${current}/${total} - ${itemName}`);
          }
        );
        setRestaurant({ ...newMenu });
      } else {
        // Use Foodish for images
        await generateFoodishImagesForMenu(
          allItems,
          (current, total, itemName) => {
            setGenerationStatus(`Fetching food images: ${current}/${total} - ${itemName}`);
          }
        );
        setRestaurant({ ...newMenu });
      }

      setGenerationStatus('Saving menu...');

      // Convert images to base64 before saving (so they persist)
      try {
        await convertMenuImagesToBase64(allItems, (current, total) => {
          setGenerationStatus(`Saving images: ${current}/${total}...`);
        });
      } catch (error) {
        console.warn('Some images could not be converted to base64:', error);
      }

      // Save to history
      saveMenuToHistory(newMenu, prompt);

      setGenerationStatus('All done! Your menu is ready.');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 transition-colors">
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto px-4 py-8">
        {/* Controls - Hidden when printing */}
        <div className="print:hidden">
          <MenuGenerator
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            generationStatus={generationStatus}
          />

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
