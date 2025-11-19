import { Restaurant } from '../types/menu';
import { MenuSection } from './MenuSection';

interface MenuDisplayProps {
  restaurant: Restaurant;
}

export function MenuDisplay({ restaurant }: MenuDisplayProps) {
  return (
    <div className="menu-view bg-white dark:bg-gray-800 print:bg-white transition-colors">
      <div className="max-w-4xl mx-auto p-8">
        {/* Restaurant Header */}
        <div className="text-center mb-12 print:mb-8">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-2 print:text-4xl print:text-gray-900">
            {restaurant.name}
          </h2>
          {restaurant.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 italic print:text-gray-600">{restaurant.description}</p>
          )}
        </div>

        {/* Menu Sections */}
        <div className="space-y-8">
          {restaurant.sections.map((section, index) => (
            <MenuSection key={index} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
