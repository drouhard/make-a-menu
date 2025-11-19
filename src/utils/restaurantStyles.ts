import { RestaurantStyle, Restaurant } from '../types/menu';

export function detectRestaurantStyle(restaurant: Restaurant): RestaurantStyle {
  const searchText = `${restaurant.name} ${restaurant.description || ''} ${restaurant.type || ''}`.toLowerCase();

  if (searchText.match(/italian|pizza|pasta|trattoria|osteria/i)) {
    return 'italian';
  }
  if (searchText.match(/french|bistro|brasserie|café|croissant/i)) {
    return 'french';
  }
  if (searchText.match(/japanese|sushi|ramen|izakaya|yakitori/i)) {
    return 'japanese';
  }
  if (searchText.match(/mexican|taco|burrito|cantina|taqueria/i)) {
    return 'mexican';
  }
  if (searchText.match(/american|diner|burger|bbq|steakhouse/i)) {
    return 'american';
  }
  if (searchText.match(/indian|curry|tandoori|masala/i)) {
    return 'indian';
  }
  if (searchText.match(/chinese|dim sum|wok|noodle/i)) {
    return 'chinese';
  }
  if (searchText.match(/thai|pad thai|tom yum/i)) {
    return 'thai';
  }

  return 'default';
}

export const restaurantStyleColors = {
  italian: {
    primary: 'text-red-800 dark:text-red-400',
    accent: 'border-green-600',
    bg: 'bg-red-50 dark:bg-red-950',
    header: 'text-red-900 dark:text-red-300',
  },
  french: {
    primary: 'text-blue-800 dark:text-blue-400',
    accent: 'border-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950',
    header: 'text-blue-900 dark:text-blue-300',
  },
  japanese: {
    primary: 'text-pink-800 dark:text-pink-400',
    accent: 'border-pink-600',
    bg: 'bg-pink-50 dark:bg-pink-950',
    header: 'text-pink-900 dark:text-pink-300',
  },
  mexican: {
    primary: 'text-orange-800 dark:text-orange-400',
    accent: 'border-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-950',
    header: 'text-orange-900 dark:text-orange-300',
  },
  american: {
    primary: 'text-blue-800 dark:text-blue-400',
    accent: 'border-red-600',
    bg: 'bg-slate-50 dark:bg-slate-950',
    header: 'text-slate-900 dark:text-slate-300',
  },
  indian: {
    primary: 'text-amber-800 dark:text-amber-400',
    accent: 'border-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950',
    header: 'text-amber-900 dark:text-amber-300',
  },
  chinese: {
    primary: 'text-red-800 dark:text-red-400',
    accent: 'border-yellow-600',
    bg: 'bg-red-50 dark:bg-red-950',
    header: 'text-red-900 dark:text-red-300',
  },
  thai: {
    primary: 'text-purple-800 dark:text-purple-400',
    accent: 'border-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-950',
    header: 'text-purple-900 dark:text-purple-300',
  },
  default: {
    primary: 'text-indigo-600 dark:text-indigo-400',
    accent: 'border-indigo-600',
    bg: 'bg-white dark:bg-gray-800',
    header: 'text-gray-900 dark:text-white',
  },
};
