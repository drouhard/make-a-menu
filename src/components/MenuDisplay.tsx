import { Restaurant } from '../types/menu';
import { MenuSection } from './MenuSection';
import { detectRestaurantStyle } from '../utils/restaurantStyles';

interface MenuDisplayProps {
  restaurant: Restaurant;
}

export function MenuDisplay({ restaurant }: MenuDisplayProps) {
  const style = detectRestaurantStyle(restaurant);

  return (
    <div className="menu-view bg-stone-50 dark:bg-gray-900 print:bg-white transition-colors shadow-xl print:shadow-none">
      <div className="max-w-2xl mx-auto p-12 print:p-8 bg-white dark:bg-gray-800 print:bg-white min-h-screen">
        {/* Restaurant Header */}
        <div className="text-center mb-12 print:mb-10 pb-6 border-b-2 border-gray-300 dark:border-gray-600 print:border-gray-400">
          <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-3 print:text-4xl print:text-gray-900 tracking-wide">
            {restaurant.name}
          </h2>
          {restaurant.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 italic print:text-gray-700 max-w-md mx-auto leading-relaxed">
              {restaurant.description}
            </p>
          )}
        </div>

        {/* Menu Sections */}
        <div className="space-y-10">
          {restaurant.sections.map((section, index) => (
            <MenuSection key={index} section={section} style={style} />
          ))}
        </div>
      </div>
    </div>
  );
}
