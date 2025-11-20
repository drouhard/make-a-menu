import React, { useState, useEffect, useMemo } from 'react';
import { getApiKey, saveApiKey, getFlickrApiKey, saveFlickrApiKey, getPexelsApiKey, savePexelsApiKey } from '../utils/storage';
import { getRandomPrompts } from '../data/restaurantPrompts';

export type ImageStyle = 'clip-art' | 'realistic' | 'cartoon' | 'pixel-art' | 'watercolor' | 'sketch' | 'silly' | 'custom';
export type ImageSource = 'openai' | 'flickr' | 'pexels';

interface MenuGeneratorProps {
  onGenerate: (apiKey: string, prompt: string) => void;
  isGenerating: boolean;
  generationStatus?: string;
  onApiKeysChange: (apiKey: string, flickrApiKey: string, pexelsApiKey: string) => void;
}

export function MenuGenerator({ onGenerate, isGenerating, generationStatus, onApiKeysChange }: MenuGeneratorProps) {
  const [apiKey, setApiKey] = useState('');
  const [flickrApiKey, setFlickrApiKey] = useState('');
  const [pexelsApiKey, setPexelsApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
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

  // Notify parent when API keys change
  useEffect(() => {
    onApiKeysChange(apiKey, flickrApiKey, pexelsApiKey);
  }, [apiKey, flickrApiKey, pexelsApiKey, onApiKeysChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // OpenAI API key is always required for menu generation
    if (!apiKey.trim()) {
      alert('Please enter your OpenAI API key (required for menu generation)');
      return;
    }

    if (!prompt.trim()) {
      alert('Please enter a menu prompt');
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

    // Trigger menu generation only
    onGenerate(apiKey, prompt);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 print:hidden transition-colors">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Step 1: Generate Menu</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Create your restaurant menu with AI. Images can be added in Step 2 (optional).
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* OpenAI API Key Input */}
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

        {/* Optional API Keys for Image Generation */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Optional: Add API keys for image generation (Step 2)
          </p>

          {/* Pexels API Key Input */}
          <div className="mb-3">
            <label htmlFor="pexelsApiKey" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Pexels API Key (for food photos)
            </label>
            <div className="relative">
              <input
                type={showPexelsApiKey ? 'text' : 'password'}
                id="pexelsApiKey"
                value={pexelsApiKey}
                onChange={(e) => setPexelsApiKey(e.target.value)}
                placeholder="Optional..."
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-20"
                disabled={isGenerating}
              />
              <button
                type="button"
                onClick={() => setShowPexelsApiKey(!showPexelsApiKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-2 py-1"
              >
                {showPexelsApiKey ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Flickr API Key Input */}
          <div>
            <label htmlFor="flickrApiKey" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Flickr API Key (for Creative Commons images)
            </label>
            <div className="relative">
              <input
                type={showFlickrApiKey ? 'text' : 'password'}
                id="flickrApiKey"
                value={flickrApiKey}
                onChange={(e) => setFlickrApiKey(e.target.value)}
                placeholder="Optional..."
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-20"
                disabled={isGenerating}
              />
              <button
                type="button"
                onClick={() => setShowFlickrApiKey(!showFlickrApiKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-2 py-1"
              >
                {showFlickrApiKey ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
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

        {/* Generate Button */}
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? 'Generating Menu...' : 'Generate Menu'}
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
