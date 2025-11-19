import { MenuSection as MenuSectionType } from '../types/menu';
import { MenuItem } from './MenuItem';

interface MenuSectionProps {
  section: MenuSectionType;
}

export function MenuSection({ section }: MenuSectionProps) {
  return (
    <div className="mb-8 print:break-inside-avoid">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-600">
        {section.category}
      </h3>
      <div className="space-y-2">
        {section.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
