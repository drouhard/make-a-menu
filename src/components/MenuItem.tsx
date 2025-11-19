import { MenuItem as MenuItemType } from '../types/menu';

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 print:break-inside-avoid">
      <div className="flex justify-between items-baseline">
        <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
        <span className="text-lg font-bold text-indigo-600 ml-4">{item.price}</span>
      </div>
      <p className="text-gray-600 mt-1 text-sm leading-relaxed">{item.description}</p>
    </div>
  );
}
