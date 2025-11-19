import { Restaurant } from '../types/menu';
import { ItemCard } from './ItemCard';

interface ItemCardsProps {
  restaurant: Restaurant;
}

export function ItemCards({ restaurant }: ItemCardsProps) {
  // Collect all items from all sections
  const allItems = restaurant.sections.flatMap(section => section.items);

  return (
    <div className="cards-view bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header - hidden when printing */}
        <div className="text-center mb-8 print:mb-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {restaurant.name} - Menu Items
          </h2>
          <p className="text-gray-600">Cut out these cards to play restaurant!</p>
        </div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2 print:gap-4">
          {allItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
