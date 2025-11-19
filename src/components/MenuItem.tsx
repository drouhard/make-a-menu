import { MenuItem as MenuItemType, RestaurantStyle } from '../types/menu';
import { restaurantStyleColors } from '../utils/restaurantStyles';

interface MenuItemProps {
  item: MenuItemType;
  style: RestaurantStyle;
}

export function MenuItem({ item, style }: MenuItemProps) {
  const colors = restaurantStyleColors[style];

  return (
    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 print:break-inside-avoid print:border-gray-200">
      <div className="flex gap-4">
        {/* Image */}
        {item.imageUrl && (
          <div className="flex-shrink-0">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline gap-2">
            <h4 className={`text-lg font-semibold ${colors.header} print:text-gray-800`}>{item.name}</h4>
            <span className={`text-lg font-bold ${colors.primary} flex-shrink-0 print:text-indigo-600`}>{item.price}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm leading-relaxed print:text-gray-600">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
