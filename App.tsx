import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Footer from './components/Footer';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');
  const isLoginPage = location.pathname.includes('/login');

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {!isAdminPage && !isLoginPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      {!isAdminPage && !isLoginPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <AppContent />
      </Router>
    </StoreProvider>
  );
};

export default App;