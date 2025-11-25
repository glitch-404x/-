import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { language } = useStore();

  return (
    <footer className="bg-primary text-gray-300 pt-10 pb-8 border-t-4 border-accent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center">
          
          {/* Column 1: Brand info */}
          <div>
            <h3 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
               <span>𓋹</span>
               {language === 'ar' ? 'بزارنا' : 'BAZARNA'}
            </h3>
            <p className="leading-relaxed max-w-md text-sm">
              {language === 'ar' 
                ? 'منصتك الأولى للتسوق الإلكتروني في مصر والشرق الأوسط. نوفر لك أرقى مستحضرات التجميل والأجهزة الإلكترونية بلمسة مصرية أصيلة.' 
                : 'Your #1 e-commerce platform in Egypt and the Middle East. Providing premium cosmetics and electronics with an authentic Egyptian touch.'}
            </p>
          </div>

          {/* Column 2: Contact Info (Icons only, no header) */}
          <div className="flex flex-col md:items-end gap-4">
            <div className="flex items-center gap-3 bg-gray-800/50 px-4 py-2 rounded-full">
              <Phone className="text-accent w-5 h-5" />
              <span className="font-english text-lg font-bold">01124162523</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-accent w-5 h-5" />
              <span>{language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-accent font-bold text-lg mb-2">
            {language === 'ar' 
              ? 'تم البرمجه والبناء بالاكمل من قبل الباشمهندس محمد حسن' 
              : 'Developed entirely by Engineer Mohamed Hassan'}
          </p>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Bazarna. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;