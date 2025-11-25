import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Globe, Search, User, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { language, toggleLanguage, cart, searchQuery, setSearchQuery, user, logout } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.includes('/admin');

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg border-b border-accent/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-black text-accent flex items-center gap-2">
            <span className="text-3xl">𓋹</span>
            <span className={language === 'en' ? 'font-english tracking-widest' : ''}>
              {language === 'ar' ? 'بزارنا' : 'BAZARNA'}
            </span>
          </Link>

          {/* Desktop Search */}
          {!isAdmin && (
             <div className="hidden md:flex flex-1 max-w-xl relative">
             <input
               type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder={language === 'ar' ? 'ابحث عن منتج، ماركة...' : 'Search for products, brands...'}
               className="w-full py-2 px-4 rounded-full bg-gray-800 border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-white placeholder-gray-400 transition-all"
             />
             <Search className="absolute top-2.5 right-4 w-5 h-5 text-gray-400 ltr:right-auto ltr:left-4" />
           </div>
          )}

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className="hover:text-accent transition-colors flex items-center gap-1 font-bold">
              <Globe className="w-5 h-5" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {!isAdmin && (
              <Link to="/cart" className="relative hover:text-accent transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Link>
            )}

            {/* User Profile / Login */}
            {!isAdmin && (
              <div className="hidden md:block">
                {user ? (
                  <div className="flex items-center gap-2 border border-gray-700 rounded-full pr-1 pl-3 py-1">
                    <img src={user.image} alt="User" className="w-8 h-8 rounded-full border border-accent" />
                    <span className="text-sm font-bold max-w-[100px] truncate">{user.name}</span>
                    <button onClick={logout} className="text-red-400 hover:text-red-300 ml-2" title={language === 'ar' ? 'خروج' : 'Logout'}>
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login"
                    className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
                  >
                    <User size={16} />
                    {language === 'ar' ? 'دخول' : 'Login'}
                  </Link>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              {!isAdmin && (
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'ar' ? 'بحث...' : 'Search...'}
                    className="w-full py-2 px-4 rounded-full bg-gray-800 border border-gray-700 text-white"
                  />
                  <Search className="absolute top-2.5 right-4 w-5 h-5 text-gray-400 ltr:right-auto ltr:left-4" />
                </div>
              )}
              <div className="flex flex-col gap-2 pb-4 font-bold">
                {user ? (
                  <div className="flex items-center gap-3 py-2 border-b border-gray-800">
                    <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <button onClick={() => {logout(); setIsMenuOpen(false);}} className="text-red-400 text-sm">
                      {language === 'ar' ? 'خروج' : 'Logout'}
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-gray-800 text-accent">
                     {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                  </Link>
                )}

                <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-gray-800">
                  {language === 'ar' ? 'الرئيسية' : 'Home'}
                </Link>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-gray-800">
                  {language === 'ar' ? 'سلة المشتريات' : 'My Cart'}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;