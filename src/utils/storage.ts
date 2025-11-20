import { Restaurant } from '../types/menu';

const API_KEY_STORAGE_KEY = 'menu-maker-openai-api-key';
const FLICKR_API_KEY_STORAGE_KEY = 'menu-maker-flickr-api-key';
const PEXELS_API_KEY_STORAGE_KEY = 'menu-maker-pexels-api-key';
const MENU_HISTORY_KEY = 'menu-maker-history';
const DARK_MODE_KEY = 'menu-maker-dark-mode';
const MAX_HISTORY_ITEMS = 10;

export interface MenuHistoryItem {
  id: string;
  restaurant: Restaurant;
  timestamp: number;
  prompt: string;
}

export function saveApiKey(apiKey: string): void {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}

export function getApiKey(): string | null {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
}

export function clearApiKey(): void {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
}

export function saveFlickrApiKey(apiKey: string): void {
  localStorage.setItem(FLICKR_API_KEY_STORAGE_KEY, apiKey);
}

export function getFlickrApiKey(): string | null {
  return localStorage.getItem(FLICKR_API_KEY_STORAGE_KEY);
}

export function clearFlickrApiKey(): void {
  localStorage.removeItem(FLICKR_API_KEY_STORAGE_KEY);
}

export function savePexelsApiKey(apiKey: string): void {
  localStorage.setItem(PEXELS_API_KEY_STORAGE_KEY, apiKey);
}

export function getPexelsApiKey(): string | null {
  return localStorage.getItem(PEXELS_API_KEY_STORAGE_KEY);
}

export function clearPexelsApiKey(): void {
  localStorage.removeItem(PEXELS_API_KEY_STORAGE_KEY);
}

export function saveMenuToHistory(restaurant: Restaurant, prompt: string): void {
  const history = getMenuHistory();
  const newItem: MenuHistoryItem = {
    id: `menu-${Date.now()}`,
    restaurant,
    timestamp: Date.now(),
    prompt
  };

  // Add to beginning of array
  history.unshift(newItem);

  // Keep only the most recent items
  const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS);

  localStorage.setItem(MENU_HISTORY_KEY, JSON.stringify(trimmedHistory));
}

export function getMenuHistory(): MenuHistoryItem[] {
  const historyJson = localStorage.getItem(MENU_HISTORY_KEY);
  if (!historyJson) {
    return [];
  }

  try {
    return JSON.parse(historyJson);
  } catch (error) {
    console.error('Failed to parse menu history:', error);
    return [];
  }
}

export function clearMenuHistory(): void {
  localStorage.removeItem(MENU_HISTORY_KEY);
}

export function deleteMenuFromHistory(id: string): void {
  const history = getMenuHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(MENU_HISTORY_KEY, JSON.stringify(filtered));
}

export function saveDarkMode(isDark: boolean): void {
  localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark));
}

export function getDarkMode(): boolean {
  const stored = localStorage.getItem(DARK_MODE_KEY);
  if (stored === null) {
    return true; // Default to dark mode
  }
  try {
    return JSON.parse(stored);
  } catch {
    return true;
  }
}
