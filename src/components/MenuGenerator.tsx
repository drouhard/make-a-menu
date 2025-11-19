import React, { useState, useEffect } from 'react';
import { getApiKey, saveApiKey } from '../utils/storage';

export type ImageStyle = 'realistic' | 'cartoon' | 'pixel-art' | 'silly';
export type ImageSource = 'openai' | 'flickr';

interface MenuGeneratorProps {
  onGenerate: (apiKey: string, prompt: string, imageStyle: ImageStyle, imageSource: ImageSource) => void;
  isGenerating: boolean;
  generationStatus?: string;
}

export function MenuGenerator({ onGenerate, isGenerating, generationStatus }: MenuGeneratorProps) {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageStyle, setImageStyle] = useState<ImageStyle>('realistic');
  const [imageSource, setImageSource] = useState<ImageSource>('flickr');
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    const savedKey = getApiKey();
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // API key is always required for menu generation
    if (!apiKey.trim()) {
      alert('Please enter your OpenAI API key (required for menu generation)');
      return;
    }

    if (!prompt.trim()) {
      alert('Please enter a menu prompt');
      return;
    }

    // Save API key to localStorage
    saveApiKey(apiKey);

    // Trigger generation
    onGenerate(apiKey, prompt, imageStyle, imageSource);
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
                value="flickr"
                checked={imageSource === 'flickr'}
                onChange={(e) => setImageSource(e.target.value as ImageSource)}
                disabled={isGenerating}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Flickr / Creative Commons</strong> - Free images, faster generation
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
                <strong>OpenAI DALL-E</strong> - AI-generated, requires API key (costs apply)
              </span>
            </label>
          </div>
        </div>

        {/* API Key Input */}
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
            Your API key is stored locally in your browser and never sent to our servers. {imageSource === 'flickr' && 'Only used for menu generation (images are free via Flickr).'}
          </p>
        </div>

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
              <option value="realistic">Realistic (Professional Food Photography)</option>
              <option value="cartoon">Cartoon / Manga</option>
              <option value="pixel-art">Pixel Art</option>
              <option value="silly">Silly / Whimsical</option>
            </select>
          </div>
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
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Example prompts:</p>
        <div className="flex flex-wrap gap-2">
          {[
            'Italian pizzeria',
            'French bistro',
            'Mexican street food',
            'Thai restaurant',
            'American diner',
            'Indian curry house'
          ].map((example) => (
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
