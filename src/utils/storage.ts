import { Restaurant } from '../types/menu';

const API_KEY_STORAGE_KEY = 'menu-maker-openai-api-key';
const MENU_HISTORY_KEY = 'menu-maker-history';
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
