import { useState } from 'react';
import { Restaurant, ViewMode } from './types/menu';
import { sushiRestaurant } from './data/sushiMenu';
import { generateMenu, generateAllImages } from './services/openai';
import { saveMenuToHistory } from './utils/storage';
import { Header } from './components/Header';
import { MenuGenerator, ImageStyle } from './components/MenuGenerator';
import { MenuHistory } from './components/MenuHistory';
import { PrintControls } from './components/PrintControls';
import { MenuDisplay } from './components/MenuDisplay';
import { ItemCards } from './components/ItemCards';
import './App.css';

function App() {
  const [restaurant, setRestaurant] = useState<Restaurant>(sushiRestaurant);
  const [viewMode, setViewMode] = useState<ViewMode>('menu');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string>('');

  const handleGenerate = async (apiKey: string, prompt: string, imageStyle: ImageStyle) => {
    setIsGenerating(true);
    setGenerationStatus('Generating menu structure and items...');

    try {
      // Step 1: Generate menu text
      const newMenu = await generateMenu(apiKey, prompt);
      setRestaurant(newMenu);
      setGenerationStatus('Menu created! Now generating images...');

      // Step 2: Generate images for all items
      const menuWithImages = await generateAllImages(
        apiKey,
        newMenu,
        imageStyle,
        (current, total, itemName) => {
          setGenerationStatus(`Generating images: ${current}/${total} - ${itemName}`);
        }
      );

      setRestaurant(menuWithImages);
      setGenerationStatus('All done! Your menu is ready.');

      // Save to history
      saveMenuToHistory(menuWithImages, prompt);

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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Controls - Hidden when printing */}
        <div className="print:hidden">
          <MenuGenerator
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            generationStatus={generationStatus}
          />

          <MenuHistory onLoadMenu={setRestaurant} />

          <PrintControls viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {/* Content - Shown based on view mode */}
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
