import { ViewMode } from '../types/menu';

interface PrintControlsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function PrintControls({ viewMode, onViewModeChange }: PrintControlsProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 print:hidden transition-colors">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">View & Print Options</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* View Mode Toggle */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current View
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onViewModeChange('menu')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                viewMode === 'menu'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Restaurant Menu
            </button>
            <button
              onClick={() => onViewModeChange('cards')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                viewMode === 'cards'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Item Cards
            </button>
          </div>
        </div>

        {/* Print Button */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Print Current View
          </label>
          <button
            onClick={handlePrint}
            className="w-full bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print {viewMode === 'menu' ? 'Menu' : 'Cards'}
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p className="mb-1">
          <strong>Restaurant Menu:</strong> Print a traditional restaurant-style menu
        </p>
        <p>
          <strong>Item Cards:</strong> Print individual cards with images for playing restaurant
        </p>
      </div>
    </div>
  );
}
