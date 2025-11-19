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
    <div className="mb-8 print:break-inside-avoid">
      <h3 className={`text-2xl font-bold ${colors.header} mb-4 pb-2 border-b-2 ${colors.accent} print:text-gray-900`}>
        {section.category}
      </h3>
      <div className="space-y-2">
        {section.items.map((item) => (
          <MenuItem key={item.id} item={item} style={style} />
        ))}
      </div>
    </div>
  );
}
