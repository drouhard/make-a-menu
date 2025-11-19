import { MenuItem } from '../types/menu';

interface ItemCardProps {
  item: MenuItem;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="item-card border-2 border-dashed border-gray-400 rounded-lg p-4 bg-white flex flex-col items-center text-center print:break-inside-avoid">
      {/* Image placeholder or actual image */}
      <div className="w-full aspect-square bg-gray-200 rounded-lg mb-3 overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-24 h-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Item name */}
      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
    </div>
  );
}
