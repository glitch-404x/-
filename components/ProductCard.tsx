import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { language, addToCart } = useStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group relative"
    >
      {product.isOffer && (
        <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">
          {language === 'ar' ? 'عرض خاص' : 'Special Offer'}
        </div>
      )}

      <div className="relative overflow-hidden h-64 bg-gray-100">
        <img 
          src={product.image} 
          alt={language === 'ar' ? product.nameAr : product.nameEn} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button 
            onClick={() => addToCart(product)}
            className="bg-accent text-primary p-3 rounded-full hover:bg-white transition-colors transform hover:scale-110"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">
          {product.category === 'cosmetics' ? (language === 'ar' ? 'تجميل' : 'Cosmetics') : 
           product.category === 'electronics' ? (language === 'ar' ? 'أجهزة' : 'Electronics') :
           (language === 'ar' ? 'عام' : 'General')}
        </div>
        <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
          {language === 'ar' ? product.nameAr : product.nameEn}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">
          {language === 'ar' ? product.descriptionAr : product.descriptionEn}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
             {product.oldPrice && (
               <span className="text-xs text-gray-400 line-through font-english">EGP {product.oldPrice}</span>
             )}
             <span className="text-xl font-bold text-primary font-english">
               EGP {product.price}
             </span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-accent hover:text-primary transition-colors"
          >
            {language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;