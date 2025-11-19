import { MenuItem as MenuItemType } from '../types/menu';

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 print:break-inside-avoid print:border-gray-200">
      <div className="flex justify-between items-baseline">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 print:text-gray-800">{item.name}</h4>
        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400 ml-4 print:text-indigo-600">{item.price}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm leading-relaxed print:text-gray-600">{item.description}</p>
    </div>
  );
}
