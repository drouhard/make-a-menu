export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  category: string;
}

export interface MenuSection {
  category: string;
  items: MenuItem[];
}

export interface Restaurant {
  name: string;
  description?: string;
  sections: MenuSection[];
  type?: string;
}

export type ViewMode = 'menu' | 'cards';

export type RestaurantStyle = 'italian' | 'french' | 'japanese' | 'mexican' | 'american' | 'indian' | 'chinese' | 'thai' | 'default';
