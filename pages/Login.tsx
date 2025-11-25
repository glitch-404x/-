import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

const Login = () => {
  const { login, language } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: Password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Focus effect simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      const input = document.getElementById(step === 1 ? 'email-input' : 'password-input');
      if (input) input.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, [step]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate checking email existence
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleFinalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    // Simulate password verification and login
    setTimeout(() => {
      const namePart = email.split('@')[0];
      // Capitalize first letter
      const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      
      login(email, name);
      navigate('/cart');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4 font-sans dir-ltr">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-[450px] p-10 rounded-2xl shadow-sm border border-gray-200 flex flex-col min-h-[500px]"
      >
        {/* Google Logo */}
        <div className="flex justify-center mb-4">
          <svg className="w-20 h-8" viewBox="0 0 74 24">
            <path fill="#4285F4" d="M9.166 10.368h8.825c.18 1.127.288 2.052.288 3.168 0 5.46-3.66 9.335-9.113 9.335-5.268 0-9.528-4.32-9.528-9.624 0-5.304 4.26-9.623 9.528-9.623 2.568 0 4.908.948 6.708 2.64l-2.7 2.723c-1.164-1.128-2.316-1.74-4.008-1.74-3.468 0-6.288 2.916-6.288 6.432 0 3.516 2.82 6.432 6.288 6.432 3.324 0 4.944-2.124 5.256-3.744h-5.256v-3.48l-.012-2.52z"></path>
            <path fill="#EA4335" d="M26.248 14.807c-3.132 0-5.748-2.376-5.748-5.64 0-3.3 2.616-5.676 5.748-5.676 3.096 0 5.7 2.376 5.7 5.676 0 3.264-2.604 5.64-5.7 5.64m0-9.084c-1.632 0-3.108 1.344-3.108 3.444 0 2.076 1.476 3.444 3.108 3.444 1.62 0 3.096-1.368 3.096-3.444 0-2.1-1.476-3.444-3.096-3.444"></path>
            <path fill="#FBBC05" d="M38.74 14.807c-3.132 0-5.748-2.376-5.748-5.64 0-3.3 2.616-5.676 5.748-5.676 3.096 0 5.7 2.376 5.7 5.676 0 3.264-2.604 5.64-5.7 5.64m0-9.084c-1.632 0-3.108 1.344-3.108 3.444 0 2.076 1.476 3.444 3.108 3.444 1.62 0 3.096-1.368 3.096-3.444 0-2.1-1.476-3.444-3.096-3.444"></path>
            <path fill="#4285F4" d="M50.944 5.64v-1.92h-2.556v16.92h2.556v-1.44c1.176 1.572 2.82 1.608 3.516 1.608 2.892 0 5.388-2.508 5.388-5.7 0-3.156-2.532-5.604-5.34-5.604-.6 0-2.352-.06-3.564 1.632m.204 7.632c-1.584 0-2.76-1.404-2.76-3.324 0-1.956 1.176-3.36 2.76-3.36 1.62 0 2.772 1.404 2.772 3.36 0 1.92-1.152 3.324-2.772 3.324"></path>
            <path fill="#34A853" d="M60.676 20.64h2.58V3.72h-2.58v16.92z"></path>
            <path fill="#EA4335" d="M68.848 14.807c-2.652 0-4.476-1.392-5.184-2.952l9.492-3.924-.348-.828c-.612-1.62-2.388-3.612-5.832-3.612-3.48 0-5.784 2.328-5.784 5.676 0 3.216 2.4 5.64 6.012 5.64 2.784 0 4.416-1.692 4.908-2.436l-2.076-1.38c-.516.768-1.5 1.812-2.832 1.812m-.264-7.068c1.164 0 2.052.588 2.352 1.332l-5.628 2.34c-.132-2.448 1.908-3.672 3.276-3.672"></path>
          </svg>
        </div>

        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col items-center"
              >
                <h2 className="text-2xl font-normal text-gray-800 mb-2">Sign in</h2>
                <p className="text-gray-800 mb-8 text-base">to continue to Bazarna</p>

                <form onSubmit={handleEmailSubmit} className="w-full">
                  <div className="relative mb-8 group">
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`peer w-full h-14 rounded border border-gray-300 px-3 pt-3 outline-none focus:border-blue-600 focus:border-2 transition-colors ${email ? 'filled' : ''}`}
                      required
                    />
                    <label 
                      htmlFor="email-input"
                      className={`absolute left-3 top-4 text-gray-500 text-base transition-all duration-200 pointer-events-none bg-white px-1 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-blue-600 ${email ? 'top-[-10px] text-xs' : ''}`}
                    >
                      Email or phone
                    </label>
                  </div>

                  <div className="mb-8">
                    <button type="button" className="text-blue-600 font-bold text-sm hover:bg-blue-50 px-2 py-1 rounded transition-colors -ml-2">
                      Forgot email?
                    </button>
                  </div>

                  <div className="flex-1"></div>

                  <div className="flex justify-between items-center mt-8">
                    <button type="button" className="text-blue-600 font-bold text-sm hover:bg-blue-50 px-2 py-1 rounded transition-colors">
                      Create account
                    </button>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#0b57d0] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#174ea6] transition-colors hover:shadow-md disabled:opacity-70"
                    >
                      {isLoading ? 'Checking...' : 'Next'}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col items-center w-full"
              >
                <h2 className="text-2xl font-normal text-gray-800 mb-2">Welcome</h2>
                
                <div className="flex items-center gap-2 border border-gray-200 rounded-full px-1 py-1 pr-4 mb-8 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setStep(1)}>
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                    {email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{email}</span>
                  <span className="text-xs text-gray-500 ml-1">▼</span>
                </div>

                <form onSubmit={handleFinalLogin} className="w-full">
                  <div className="relative mb-2">
                    <input
                      id="password-input"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`peer w-full h-14 rounded border border-gray-300 px-3 pt-3 outline-none focus:border-blue-600 focus:border-2 transition-colors ${password ? 'filled' : ''}`}
                      required
                    />
                    <label 
                      htmlFor="password-input"
                      className={`absolute left-3 top-4 text-gray-500 text-base transition-all duration-200 pointer-events-none bg-white px-1 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-blue-600 ${password ? 'top-[-10px] text-xs' : ''}`}
                    >
                      Enter your password
                    </label>
                  </div>

                  <div className="mb-8 flex items-center">
                    <input 
                      type="checkbox" 
                      id="showPass" 
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="showPass" className="ml-2 text-sm text-gray-700">Show password</label>
                  </div>

                  <div className="flex justify-between items-center mt-12">
                    <button type="button" className="text-blue-600 font-bold text-sm hover:bg-blue-50 px-2 py-1 rounded transition-colors -ml-2">
                      Forgot password?
                    </button>
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#0b57d0] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#174ea6] transition-colors hover:shadow-md disabled:opacity-70"
                    >
                      {isLoading ? 'Verifying...' : 'Next'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="fixed bottom-4 left-0 w-full flex justify-between px-8 text-xs text-gray-500">
         <div className="flex gap-4">
           <span>English (United States)</span>
         </div>
         <div className="flex gap-6">
           <a href="#" className="hover:text-gray-700">Help</a>
           <a href="#" className="hover:text-gray-700">Privacy</a>
           <a href="#" className="hover:text-gray-700">Terms</a>
         </div>
      </div>
    </div>
  );
};

export default Login;