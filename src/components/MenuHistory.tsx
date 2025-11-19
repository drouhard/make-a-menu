import { useState } from 'react';
import { Restaurant } from '../types/menu';
import { getMenuHistory, deleteMenuFromHistory, MenuHistoryItem } from '../utils/storage';

interface MenuHistoryProps {
  onLoadMenu: (restaurant: Restaurant) => void;
}

export function MenuHistory({ onLoadMenu }: MenuHistoryProps) {
  const [history, setHistory] = useState<MenuHistoryItem[]>(getMenuHistory());
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = (id: string) => {
    deleteMenuFromHistory(id);
    setHistory(getMenuHistory());
  };

  const handleLoad = (item: MenuHistoryItem) => {
    onLoadMenu(item.restaurant);
    setIsExpanded(false);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 print:hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h2 className="text-2xl font-bold text-gray-900">
          Menu History ({history.length})
        </h2>
        <svg
          className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.restaurant.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Prompt: {item.prompt}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleLoad(item)}
                    className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
