import { MenuSection as MenuSectionType, RestaurantStyle } from '../types/menu';
import { MenuItem } from './MenuItem';
import { restaurantStyleColors } from '../utils/restaurantStyles';

interface MenuSectionProps {
  section: MenuSectionType;
  style: RestaurantStyle;
}

export function MenuSection({ section, style }: MenuSectionProps) {
  const colors = restaurantStyleColors[style];

  return (
    <div className="mb-10 print:break-inside-avoid">
      <h3 className={`text-xl font-serif font-semibold ${colors.header} mb-4 pb-1 border-b border-gray-300 dark:border-gray-600 print:text-gray-900 print:border-gray-400 uppercase tracking-wider text-center`}>
        {section.category}
      </h3>
      <div className="space-y-1">
        {section.items.map((item) => (
          <MenuItem key={item.id} item={item} style={style} />
        ))}
      </div>
    </div>
  );
}
