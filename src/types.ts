export type DrinkCategory = 
  | 'all' 
  | 'cola' 
  | 'desi-masala' 
  | 'fruit-chiller' 
  | 'energy-zero' 
  | 'crates-combos';

export interface Drink {
  id: string;
  name: string;
  nameHinglish: string;
  category: DrinkCategory;
  tagline: string;
  taglineHinglish: string;
  description: string;
  descriptionHinglish: string;
  price: number;
  originalPrice?: number;
  volume: string;
  availableSizes: { label: string; volume: string; price: number }[];
  fizzLevel: 1 | 2 | 3 | 4 | 5; // 1 = Still/Mild, 5 = Extreme Banta Pop
  chillTemp: string; // e.g., "-1°C"
  sweetness: number; // 1-100
  tanginess: number; // 1-100
  kick: number; // 1-100 (spice/caffeine/punch)
  calories: number;
  isZeroSugar?: boolean;
  isBestSeller?: boolean;
  isDesiSpecial?: boolean;
  isNew?: boolean;
  imageUrl: string;
  themeColor: string; // Accent hex or tailwind class
  badgeText?: string;
  ingredients: string[];
  searchKeywords?: string[];
}

export interface CartItem {
  cartItemId: string;
  drinkId: string;
  name: string;
  selectedSize: string;
  volume: string;
  price: number;
  quantity: number;
  imageUrl: string;
  isCustomMix?: boolean;
  customDetails?: {
    base: string;
    flavor: string;
    fizz: string;
    ice: string;
    garnish: string;
  };
}

export interface CustomDrinkMix {
  name: string;
  baseSodaId: string;
  flavorId: string;
  fizzLevel: number;
  iceLevel: 'none' | 'normal' | 'extra-crushed' | 'sub-zero';
  garnishes: string[];
  sweetness: number;
  color: string;
}

export type Language = 'en' | 'hi';
