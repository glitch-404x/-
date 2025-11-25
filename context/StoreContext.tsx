import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Language, User } from '../types';
import { initialProducts } from '../services/data';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  language: Language;
  searchQuery: string;
  user: User | null;
  setSearchQuery: (query: string) => void;
  toggleLanguage: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Auth
  login: (email: string, name: string, photoURL?: string) => void;
  logout: () => void;
  
  // Admin functions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  // Derived
  totalPrice: number;
  filteredProducts: Product[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  // Load products from local storage or use initial data
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bazarna_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bazarna_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bazarna_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [language, setLanguage] = useState<Language>('ar');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist Data
  useEffect(() => {
    localStorage.setItem('bazarna_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bazarna_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('bazarna_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bazarna_user');
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const login = (email: string, name: string, photoURL?: string) => {
    // Use provided photoURL or generate one
    const image = photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
    
    const newUser: User = {
      name: name,
      email: email,
      image: image
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    clearCart(); // Optional: clear cart on logout for security
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  // Admin Actions
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Smart Search Logic
  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase().trim();
    // Normalize Arabic (remove diacritics basic normalization)
    const normalize = (str: string) => str.replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
    
    const normalizedQuery = normalize(query);
    const normalizedNameAr = normalize(product.nameAr.toLowerCase());
    const normalizedDescAr = normalize(product.descriptionAr.toLowerCase());
    
    // Check match in Arabic or English fields
    return (
      normalizedNameAr.includes(normalizedQuery) ||
      product.nameEn.toLowerCase().includes(query) ||
      normalizedDescAr.includes(normalizedQuery) ||
      product.descriptionEn.toLowerCase().includes(query)
    );
  });

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{
      products, cart, language, searchQuery, user, setSearchQuery, toggleLanguage,
      addToCart, removeFromCart, updateQuantity, clearCart,
      login, logout,
      addProduct, updateProduct, deleteProduct,
      totalPrice, filteredProducts
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};