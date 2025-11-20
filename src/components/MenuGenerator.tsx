import React, { useState, useEffect, useMemo } from 'react';
import { getApiKey, saveApiKey, getFlickrApiKey, saveFlickrApiKey, getPexelsApiKey, savePexelsApiKey } from '../utils/storage';
import { getRandomPrompts } from '../data/restaurantPrompts';

export type ImageStyle = 'clip-art' | 'realistic' | 'cartoon' | 'pixel-art' | 'watercolor' | 'sketch' | 'silly' | 'custom';
export type ImageSource = 'openai' | 'flickr' | 'pexels';

interface MenuGeneratorProps {
  onGenerate: (apiKey: string, flickrApiKey: string, pexelsApiKey: string, prompt: string, imageStyle: ImageStyle, imageSource: ImageSource, customStylePrompt?: string) => void;
  isGenerating: boolean;
  generationStatus?: string;
}

export function MenuGenerator({ onGenerate, isGenerating, generationStatus }: MenuGeneratorProps) {
  const [apiKey, setApiKey] = useState('');
  const [flickrApiKey, setFlickrApiKey] = useState('');
  const [pexelsApiKey, setPexelsApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageStyle, setImageStyle] = useState<ImageStyle>('clip-art');
  const [customStylePrompt, setCustomStylePrompt] = useState('');
  const [imageSource, setImageSource] = useState<ImageSource>('pexels');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showFlickrApiKey, setShowFlickrApiKey] = useState(false);
  const [showPexelsApiKey, setShowPexelsApiKey] = useState(false);

  // Generate random prompts on component mount
  const examplePrompts = useMemo(() => getRandomPrompts(8), []);

  useEffect(() => {
    const savedKey = getApiKey();
    if (savedKey) {
      setApiKey(savedKey);
    }
    const savedFlickrKey = getFlickrApiKey();
    if (savedFlickrKey) {
      setFlickrApiKey(savedFlickrKey);
    }
    const savedPexelsKey = getPexelsApiKey();
    if (savedPexelsKey) {
      setPexelsApiKey(savedPexelsKey);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // OpenAI API key is always required for menu generation
    if (!apiKey.trim()) {
      alert('Please enter your OpenAI API key (required for menu generation)');
      return;
    }

    // Flickr API key is required if Flickr is selected
    if (imageSource === 'flickr' && !flickrApiKey.trim()) {
      alert('Please enter your Flickr API key');
      return;
    }

    // Pexels API key is required if Pexels is selected
    if (imageSource === 'pexels' && !pexelsApiKey.trim()) {
      alert('Please enter your Pexels API key');
      return;
    }

    if (!prompt.trim()) {
      alert('Please enter a menu prompt');
      return;
    }

    // Validate custom style prompt if custom style is selected
    if (imageStyle === 'custom' && !customStylePrompt.trim()) {
      alert('Please enter a custom style prompt');
      return;
    }

    // Save API keys to localStorage
    saveApiKey(apiKey);
    if (flickrApiKey.trim()) {
      saveFlickrApiKey(flickrApiKey);
    }
    if (pexelsApiKey.trim()) {
      savePexelsApiKey(pexelsApiKey);
    }

    // Trigger generation
    onGenerate(apiKey, flickrApiKey, pexelsApiKey, prompt, imageStyle, imageSource, customStylePrompt);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 print:hidden transition-colors">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Generate Custom Menu</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Source Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Image Source
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="imageSource"
                value="pexels"
                checked={imageSource === 'pexels'}
                onChange={(e) => setImageSource(e.target.value as ImageSource)}
                disabled={isGenerating}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Pexels</strong> - High-quality food photos, requires free API key
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="imageSource"
                value="flickr"
                checked={imageSource === 'flickr'}
                onChange={(e) => setImageSource(e.target.value as ImageSource)}
                disabled={isGenerating}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Flickr / Creative Commons</strong> - Searchable images, requires free API key
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="imageSource"
                value="openai"
                checked={imageSource === 'openai'}
                onChange={(e) => setImageSource(e.target.value as ImageSource)}
                disabled={isGenerating}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>OpenAI DALL-E</strong> - AI-generated custom images, requires API key (costs apply)
              </span>
            </label>
          </div>
        </div>

        {/* OpenAI API Key Input - Always shown */}
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            OpenAI API Key
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-24"
              disabled={isGenerating}
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-2 py-1"
            >
              {showApiKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Required for menu generation. Stored locally in your browser, never sent to our servers.
          </p>
        </div>

        {/* Pexels API Key Input - Only shown when Pexels is selected */}
        {imageSource === 'pexels' && (
          <div>
            <label htmlFor="pexelsApiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pexels API Key
            </label>
            <div className="relative">
              <input
                type={showPexelsApiKey ? 'text' : 'password'}
                id="pexelsApiKey"
                value={pexelsApiKey}
                onChange={(e) => setPexelsApiKey(e.target.value)}
                placeholder="Get free API key from Pexels..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-24"
                disabled={isGenerating}
              />
              <button
                type="button"
                onClick={() => setShowPexelsApiKey(!showPexelsApiKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-2 py-1"
              >
                {showPexelsApiKey ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Get your free Pexels API key at{' '}
              <a
                href="https://www.pexels.com/api/new/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                pexels.com/api
              </a>
            </p>
          </div>
        )}

        {/* Flickr API Key Input - Only shown when Flickr is selected */}
        {imageSource === 'flickr' && (
          <div>
            <label htmlFor="flickrApiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Flickr API Key
            </label>
            <div className="relative">
              <input
                type={showFlickrApiKey ? 'text' : 'password'}
                id="flickrApiKey"
                value={flickrApiKey}
                onChange={(e) => setFlickrApiKey(e.target.value)}
                placeholder="Get free API key from Flickr..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-24"
                disabled={isGenerating}
              />
              <button
                type="button"
                onClick={() => setShowFlickrApiKey(!showFlickrApiKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-2 py-1"
              >
                {showFlickrApiKey ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Get your free Flickr API key at{' '}
              <a
                href="https://www.flickr.com/services/api/misc.api_keys.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                flickr.com/services/api
              </a>
            </p>
          </div>
        )}

        {/* Prompt Input */}
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Restaurant Type / Menu Prompt
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Italian pizzeria, French bistro, Mexican taco truck..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isGenerating}
          />
        </div>

        {/* Image Style Selection - Only for OpenAI */}
        {imageSource === 'openai' && (
          <>
            <div>
              <label htmlFor="imageStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image Style
              </label>
              <select
                id="imageStyle"
                value={imageStyle}
                onChange={(e) => setImageStyle(e.target.value as ImageStyle)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isGenerating}
              >
                <option value="clip-art">Clip Art (Simple & Clean)</option>
                <option value="realistic">Realistic (Professional Food Photography)</option>
                <option value="cartoon">Cartoon / Manga</option>
                <option value="watercolor">Watercolor Painting</option>
                <option value="sketch">Hand-Drawn Sketch</option>
                <option value="pixel-art">Pixel Art</option>
                <option value="silly">Silly / Whimsical</option>
                <option value="custom">Custom (Enter Your Own)</option>
              </select>
            </div>

            {/* Custom Style Prompt Input - Only shown when custom style is selected */}
            {imageStyle === 'custom' && (
              <div>
                <label htmlFor="customStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Custom Style Description
                </label>
                <input
                  type="text"
                  id="customStyle"
                  value={customStylePrompt}
                  onChange={(e) => setCustomStylePrompt(e.target.value)}
                  placeholder='e.g., "looks like my cat drew them with a marker in her mouth" or "dystopian cybernetic future unicorn dreamcore synthwave"'
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={isGenerating}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Get creative! Describe any visual style you want for the images
                </p>
              </div>
            )}
          </>
        )}

        {/* Generate Button */}
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? 'Generating...' : 'Generate Menu with Images'}
        </button>

        {/* Status Display */}
        {generationStatus && (
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">{generationStatus}</p>
          </div>
        )}
      </form>

      {/* Example Prompts */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Try one of these (changes on each reload!):
        </p>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setPrompt(example)}
              disabled={isGenerating}
              className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
