import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, MessageCircle, ArrowRight, Lock } from 'lucide-react';
import { UserDetails } from '../types';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, language, clearCart, user } = useStore();
  const [step, setStep] = useState<'cart' | 'details'>('cart');
  const navigate = useNavigate();
  
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    notes: ''
  });

  // Auto-fill user data if logged in
  useEffect(() => {
    if (user) {
      setUserDetails(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const phoneNumber = '201124162523'; // Egypt code + Number
    
    let message = `*طلب جديد من منصة بزارنا (Bazarna)* 🛒%0A%0A`;
    message += `*بيانات العميل:*%0A`;
    message += `👤 الاسم: ${userDetails.name}%0A`;
    message += `📧 البريد: ${userDetails.email}%0A`;
    message += `📍 العنوان: ${userDetails.address}, ${userDetails.city}%0A`;
    message += `📞 الهاتف: ${userDetails.phone}%0A`;
    if (userDetails.notes) message += `📝 ملاحظات: ${userDetails.notes}%0A`;
    
    message += `%0A*الطلب:*%0A`;
    cart.forEach(item => {
      const name = language === 'ar' ? item.nameAr : item.nameEn;
      message += `▫️ ${name} (x${item.quantity}) - ${item.price * item.quantity} EGP%0A`;
    });
    
    message += `%0A*-----------------------------*%0A`;
    message += `💰 *الإجمالي: ${totalPrice} EGP*%0A`;
    message += `*-----------------------------*`;
    message += `%0A*حالة المستخدم:* تم تسجيل الدخول بواسطة Google ✅`;

    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    clearCart();
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      setStep('details');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <MessageCircle className="w-16 h-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {language === 'ar' ? 'السلة فارغة' : 'Your cart is empty'}
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          {language === 'ar' 
            ? 'يبدو أنك لم تقم بإضافة أي منتجات بعد. تصفح منتجاتنا المميزة الآن.'
            : 'Looks like you haven\'t added any items yet. Browse our premium products now.'}
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
        >
          {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {step === 'cart' 
          ? (language === 'ar' ? 'سلة المشتريات' : 'Shopping Cart')
          : (language === 'ar' ? 'بيانات الشحن' : 'Shipping Details')
        }
      </h1>

      <div className="max-w-4xl mx-auto">
        {step === 'cart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <motion.div 
                  layout
                  key={item.id} 
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center"
                >
                  <img src={item.image} alt="" className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">
                      {language === 'ar' ? item.nameAr : item.nameEn}
                    </h3>
                    <p className="text-accent font-bold font-english">EGP {item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/20 sticky top-24">
                <h3 className="font-bold text-lg mb-4 pb-4 border-b">
                  {language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
                </h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{language === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span className="font-bold font-english">{totalPrice} EGP</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-gray-600">{language === 'ar' ? 'الشحن' : 'Shipping'}</span>
                  <span className="text-green-600 font-bold">{language === 'ar' ? 'يحدد لاحقاً' : 'TBD'}</span>
                </div>
                <div className="flex justify-between mb-8 text-xl font-bold">
                  <span>{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
                  <span className="font-english text-primary">{totalPrice} EGP</span>
                </div>
                
                {!user && (
                   <div className="mb-4 bg-yellow-50 border border-yellow-200 p-3 rounded text-xs text-yellow-800 flex items-center gap-2">
                     <Lock size={16} />
                     {language === 'ar' ? 'يجب تسجيل الدخول لإتمام الطلب' : 'Login required to checkout'}
                   </div>
                )}

                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-accent hover:text-primary transition-all flex items-center justify-center gap-2"
                >
                  {user ? (
                    <>
                      {language === 'ar' ? 'متابعة الشراء' : 'Checkout'}
                      <ArrowRight size={18} className={language === 'ar' ? 'rotate-180' : ''} />
                    </>
                  ) : (
                    <>
                      {language === 'ar' ? 'تسجيل الدخول للمتابعة' : 'Login to Continue'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          >
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6 flex items-center gap-4">
                 <img src={user?.image} alt="" className="w-12 h-12 rounded-full border-2 border-white shadow" />
                 <div>
                    <p className="text-sm text-blue-800 font-bold">
                      {language === 'ar' ? 'مرحباً،' : 'Welcome,'} {user?.name}
                    </p>
                    <p className="text-xs text-blue-600">{user?.email}</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    {language === 'ar' ? 'الاسم بالكامل' : 'Full Name'}
                  </label>
                  <input 
                    required
                    type="text" 
                    value={userDetails.name}
                    onChange={e => setUserDetails({...userDetails, name: e.target.value})}
                    className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input 
                    required
                    type="email" 
                    value={userDetails.email}
                    className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed font-english"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <input 
                    required
                    type="tel" 
                    value={userDetails.phone}
                    onChange={e => setUserDetails({...userDetails, phone: e.target.value})}
                    className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-accent outline-none font-english"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
                <div>
                   <label className="block text-sm font-bold mb-2">
                      {language === 'ar' ? 'المدينة / المحافظة' : 'City / Governorate'}
                   </label>
                   <input 
                    required
                    type="text" 
                    value={userDetails.city}
                    onChange={e => setUserDetails({...userDetails, city: e.target.value})}
                    className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-accent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  {language === 'ar' ? 'العنوان بالتفصيل' : 'Detailed Address'}
                </label>
                <textarea 
                  required
                  value={userDetails.address}
                  onChange={e => setUserDetails({...userDetails, address: e.target.value})}
                  className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-accent outline-none h-24"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  {language === 'ar' ? 'ملاحظات إضافية (اختياري)' : 'Additional Notes (Optional)'}
                </label>
                <textarea 
                  value={userDetails.notes}
                  onChange={e => setUserDetails({...userDetails, notes: e.target.value})}
                  className="w-full border rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-accent outline-none h-20"
                ></textarea>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-1/3 border border-gray-300 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                >
                  {language === 'ar' ? 'رجوع' : 'Back'}
                </button>
                <button 
                  type="submit"
                  className="w-2/3 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-600/30"
                >
                  <MessageCircle size={20} />
                  {language === 'ar' ? 'إتمام الطلب عبر واتساب' : 'Complete via WhatsApp'}
                </button>
              </div>
              
              <p className="text-center text-xs text-gray-400 mt-4">
                {language === 'ar' 
                  ? 'سيتم إرسال كافة تفاصيل الطلب بما في ذلك بريدك الإلكتروني لتوثيق الطلب.'
                  : 'All order details including your email will be sent to authenticate the order.'}
              </p>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;