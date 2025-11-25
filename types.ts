export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  oldPrice?: number; // For offers
  category: 'cosmetics' | 'electronics' | 'fashion' | 'other';
  image: string;
  isOffer?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Language = 'ar' | 'en';

export interface User {
  name: string;
  email: string;
  image: string;
}

export interface UserDetails {
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  notes?: string;
}