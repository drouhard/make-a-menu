import { MenuItem as MenuItemType, RestaurantStyle } from '../types/menu';
import { restaurantStyleColors } from '../utils/restaurantStyles';

interface MenuItemProps {
  item: MenuItemType;
  style: RestaurantStyle;
}

export function MenuItem({ item, style }: MenuItemProps) {
  const colors = restaurantStyleColors[style];

  return (
    <div className="mb-4 print:break-inside-avoid">
      {/* Menu Item with Dotted Leaders */}
      <div className="flex items-baseline gap-2">
        <div className="flex-1">
          <h4 className={`inline font-serif text-base ${colors.header} print:text-gray-900 dark:text-gray-100`}>
            {item.name}
          </h4>
          <span className="flex-1 border-b border-dotted border-gray-400 dark:border-gray-600 mx-2 inline-block align-bottom min-w-[20px] print:border-gray-400"></span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 font-light print:text-gray-600">
          {item.price}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-snug print:text-gray-700 print:text-xs">
        {item.description}
      </p>
    </div>
  );
}
