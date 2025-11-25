import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Trash2, Edit, Plus, Save, X, Lock } from 'lucide-react';

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct, language } = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Form State
  const initialForm: Product = {
    id: '',
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    price: 0,
    category: 'cosmetics',
    image: '',
    isOffer: false,
    oldPrice: 0
  };
  const [formData, setFormData] = useState<Product>(initialForm);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bazarna5532.glitch') {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct({ ...formData, id: isEditing });
      setIsEditing(null);
    } else {
      addProduct({ ...formData, id: Date.now().toString() });
    }
    setFormData(initialForm);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="flex justify-center mb-6 text-accent">
            <Lock size={48} />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-accent focus:ring-0 outline-none transition-all text-center font-english"
            />
            <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-accent hover:text-primary transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">لوحة تحكم بزارنا 🛠️</h1>
          <button onClick={() => setIsAuthenticated(false)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            تسجيل خروج
          </button>
        </div>

        {/* Product Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-10 border-t-4 border-accent">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            {isEditing ? <Edit size={20} /> : <Plus size={20} />}
            {isEditing ? 'تعديل منتج' : 'إضافة منتج جديد'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="اسم المنتج (عربي)"
              value={formData.nameAr}
              onChange={e => setFormData({...formData, nameAr: e.target.value})}
              className="border p-2 rounded"
              required
            />
            <input
              placeholder="Product Name (English)"
              value={formData.nameEn}
              onChange={e => setFormData({...formData, nameEn: e.target.value})}
              className="border p-2 rounded text-left font-english"
              required
            />
            
            <input
              type="number"
              placeholder="السعر (EGP)"
              value={formData.price || ''}
              onChange={e => setFormData({...formData, price: Number(e.target.value)})}
              className="border p-2 rounded font-english"
              required
            />
            
             <select
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value as any})}
              className="border p-2 rounded"
            >
              <option value="cosmetics">مستحضرات تجميل</option>
              <option value="electronics">أجهزة</option>
              <option value="fashion">أزياء</option>
              <option value="other">أخرى</option>
            </select>

            <div className="md:col-span-2">
               <input
                placeholder="رابط الصورة (URL)"
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full border p-2 rounded font-english text-left"
                required
              />
              <p className="text-xs text-gray-400 mt-1">يمكنك استخدام روابط من Google Images أو أي استضافة.</p>
            </div>

            <textarea
              placeholder="الوصف (عربي)"
              value={formData.descriptionAr}
              onChange={e => setFormData({...formData, descriptionAr: e.target.value})}
              className="border p-2 rounded h-24"
              required
            />
            <textarea
              placeholder="Description (English)"
              value={formData.descriptionEn}
              onChange={e => setFormData({...formData, descriptionEn: e.target.value})}
              className="border p-2 rounded h-24 text-left font-english"
              required
            />

            <div className="md:col-span-2 bg-gray-50 p-4 rounded flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.isOffer || false}
                  onChange={e => setFormData({...formData, isOffer: e.target.checked})}
                  className="w-5 h-5 accent-accent"
                />
                <span className="font-bold">تفعيل كعرض خاص؟</span>
              </label>
              {formData.isOffer && (
                <input
                  type="number"
                  placeholder="السعر القديم (قبل الخصم)"
                  value={formData.oldPrice || ''}
                  onChange={e => setFormData({...formData, oldPrice: Number(e.target.value)})}
                  className="border p-2 rounded font-english w-48"
                />
              )}
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 flex justify-center gap-2">
                <Save size={20} /> {isEditing ? 'حفظ التعديلات' : 'إضافة المنتج'}
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  onClick={() => { setIsEditing(null); setFormData(initialForm); }}
                  className="bg-gray-500 text-white px-6 rounded font-bold hover:bg-gray-600"
                >
                  <X />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b bg-gray-50 font-bold flex justify-between">
            <span>قائمة المنتجات ({products.length})</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-4">الصورة</th>
                  <th className="p-4">الاسم</th>
                  <th className="p-4">السعر</th>
                  <th className="p-4">تحكم</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <img src={product.image} alt="" className="w-12 h-12 object-cover rounded" />
                    </td>
                    <td className="p-4 font-bold">{product.nameAr}</td>
                    <td className="p-4 font-english">{product.price} EGP</td>
                    <td className="p-4 flex gap-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if(window.confirm('هل أنت متأكد من الحذف؟')) deleteProduct(product.id);
                        }}
                        className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;