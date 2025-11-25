import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
  const { filteredProducts, language } = useStore();

  const scrollToProducts = () => {
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center overflow-hidden bg-primary text-white">
        {/* Animated Background Blob - Added pointer-events-none to prevent blocking clicks */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
           <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
           <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-bold tracking-widest uppercase mb-4"
          >
            {language === 'ar' ? 'مرحباً بكم في بزارنا' : 'Welcome to Bazarna'}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            {language === 'ar' ? 'جمالك وأناقتك' : 'Your Beauty & Elegance'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">
              {language === 'ar' ? 'بلمسة مصرية' : 'Egyptian Touch'}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8"
          >
            {language === 'ar' 
              ? 'اكتشفي أفضل مستحضرات التجميل والأجهزة العصرية بأفضل الأسعار. توصيل سريع لكل محافظات مصر.'
              : 'Discover the best cosmetics and modern gadgets at the best prices. Fast delivery to all Egyptian governorates.'}
          </motion.p>
          <motion.button 
             onClick={scrollToProducts}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="bg-accent text-primary font-bold py-3 px-8 rounded-full text-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all cursor-pointer z-20"
          >
            {language === 'ar' ? 'تسوقي الآن' : 'Shop Now'}
          </motion.button>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {language === 'ar' ? 'أحدث المنتجات' : 'Latest Products'}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">
                {language === 'ar' ? 'لا توجد منتجات تطابق بحثك.' : 'No products match your search.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;