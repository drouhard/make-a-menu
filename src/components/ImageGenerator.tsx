import React, { useState } from 'react';
import { ImageStyle, ImageSource } from './MenuGenerator';

interface ImageGeneratorProps {
  onGenerate: (
    apiKey: string,
    flickrApiKey: string,
    pexelsApiKey: string,
    imageStyle: ImageStyle,
    imageSource: ImageSource,
    backgroundPrompt: string,
    customStylePrompt?: string
  ) => void;
  isGenerating: boolean;
  generationStatus?: string;
  apiKey: string;
  flickrApiKey: string;
  pexelsApiKey: string;
}

export function ImageGenerator({
  onGenerate,
  isGenerating,
  generationStatus,
  apiKey,
  flickrApiKey,
  pexelsApiKey
}: ImageGeneratorProps) {
  const [imageStyle, setImageStyle] = useState<ImageStyle>('clip-art');
  const [customStylePrompt, setCustomStylePrompt] = useState('');
  const [imageSource, setImageSource] = useState<ImageSource>('pexels');
  const [backgroundPrompt, setBackgroundPrompt] = useState('plain white background');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate API keys based on selected source
    if (imageSource === 'openai' && !apiKey.trim()) {
      alert('Please enter your OpenAI API key in the menu generator above');
      return;
    }

    if (imageSource === 'flickr' && !flickrApiKey.trim()) {
      alert('Please enter your Flickr API key in the menu generator above');
      return;
    }

    if (imageSource === 'pexels' && !pexelsApiKey.trim()) {
      alert('Please enter your Pexels API key in the menu generator above');
      return;
    }

    // Validate custom style prompt if custom style is selected
    if (imageSource === 'openai' && imageStyle === 'custom' && !customStylePrompt.trim()) {
      alert('Please enter a custom style prompt');
      return;
    }

    // Trigger generation
    onGenerate(apiKey, flickrApiKey, pexelsApiKey, imageStyle, imageSource, backgroundPrompt, customStylePrompt);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 print:hidden transition-colors border-2 border-indigo-200 dark:border-indigo-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Generate Images</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Optional: Generate images for your menu items. Images will appear in the Cards view for printing.
      </p>

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
                <strong>Pexels</strong> - High-quality food photos (requires API key above)
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
                <strong>Flickr</strong> - Creative Commons images (requires API key above)
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
                <strong>OpenAI DALL-E</strong> - AI-generated images (requires API key above, costs apply)
              </span>
            </label>
          </div>
        </div>

        {/* Background Specification */}
        <div>
          <label htmlFor="background" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Image Background
          </label>
          <input
            type="text"
            id="background"
            value={backgroundPrompt}
            onChange={(e) => setBackgroundPrompt(e.target.value)}
            placeholder="e.g., plain white background, wooden table, marble surface..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isGenerating}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Describe the background you want for food images (most effective with OpenAI DALL-E)
          </p>
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
                  placeholder='e.g., "looks like my cat drew them with a marker in her mouth"'
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
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? 'Generating Images...' : 'Generate Images'}
        </button>

        {/* Status Display */}
        {generationStatus && (
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">{generationStatus}</p>
          </div>
        )}
      </form>
    </div>
  );
}
