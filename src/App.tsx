import { useState, useEffect } from 'react';
import { Restaurant, MenuItem } from './types/menu';
import { sushiRestaurant } from './data/sushiMenu';
import { generateMenu, generateAllImages } from './services/openai';
import { generateFlickrImagesForMenu } from './services/flickr';
import { saveMenuToHistory, getDarkMode, saveDarkMode } from './utils/storage';
import { Header } from './components/Header';
import { MenuGenerator, ImageStyle, ImageSource } from './components/MenuGenerator';
import { MenuHistory } from './components/MenuHistory';
import { MenuDisplay } from './components/MenuDisplay';
import './App.css';

function App() {
  const [restaurant, setRestaurant] = useState<Restaurant>(sushiRestaurant);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(getDarkMode());

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

  const handleGenerate = async (apiKey: string, prompt: string, imageStyle: ImageStyle, imageSource: ImageSource, customStylePrompt?: string) => {
    setIsGenerating(true);
    setGenerationStatus('Generating menu structure and items...');

    try {
      // Step 1: Generate menu text (always uses OpenAI for menu structure)
      const newMenu = await generateMenu(apiKey, prompt);
      setRestaurant(newMenu);
      setGenerationStatus('Menu created! Now generating images...');

      // Step 2: Generate images based on selected source
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
      } else {
        // Use Flickr for images
        const allItems: MenuItem[] = [];
        newMenu.sections.forEach(section => {
          section.items.forEach(item => {
            allItems.push(item);
          });
        });

        await generateFlickrImagesForMenu(
          allItems,
          (current, total, itemName) => {
            setGenerationStatus(`Finding images from Flickr: ${current}/${total} - ${itemName}`);
          }
        );
        setRestaurant({ ...newMenu });
      }

      setGenerationStatus('All done! Your menu is ready.');

      // Save to history
      saveMenuToHistory(newMenu, prompt);

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
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

          {/* Print Button */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 print:hidden transition-colors">
            <button
              onClick={handlePrint}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Menu
            </button>
          </div>
        </div>

        {/* Content */}
        <MenuDisplay restaurant={restaurant} />
      </main>
    </div>
  );
}

export default App;
