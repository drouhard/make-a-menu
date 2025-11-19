import { Restaurant } from '../types/menu';
import { MenuSection } from './MenuSection';
import { detectRestaurantStyle, restaurantStyleColors } from '../utils/restaurantStyles';

interface MenuDisplayProps {
  restaurant: Restaurant;
}

export function MenuDisplay({ restaurant }: MenuDisplayProps) {
  const style = detectRestaurantStyle(restaurant);
  const colors = restaurantStyleColors[style];

  return (
    <div className={`menu-view ${colors.bg} print:bg-white transition-colors`}>
      <div className="max-w-4xl mx-auto p-8">
        {/* Restaurant Header */}
        <div className="text-center mb-12 print:mb-8">
          <h2 className={`text-5xl font-bold ${colors.header} mb-2 print:text-4xl print:text-gray-900`}>
            {restaurant.name}
          </h2>
          {restaurant.description && (
            <p className={`text-xl ${colors.primary} italic print:text-gray-600`}>{restaurant.description}</p>
          )}
        </div>

        {/* Menu Sections */}
        <div className="space-y-8">
          {restaurant.sections.map((section, index) => (
            <MenuSection key={index} section={section} style={style} />
          ))}
        </div>
      </div>
    </div>
  );
}
