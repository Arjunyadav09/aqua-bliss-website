export interface Product {
  id: string;
  name: string;
  category: 'Active' | 'Elite';
  flavor: string;
  description: string;
  price: number;
  formattedPrice: string;
  proteinGrams: number;
  image: string;
  badge?: string;
  inStock: boolean;
  volume: string;
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    sugar: string;
    fat: string;
    sodium: string;
    potassium: string;
  };
  highlights: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPack?: 'single' | 'pack6' | 'pack12';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  category: string;
  image: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'promo' | 'announcement';
}
