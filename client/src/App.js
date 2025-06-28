import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Header from './components/Header';
import AdminHeader from './components/Admin/AdminHeader';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import LandingPage from './pages/LandingPage';
import LogoutPage from './pages/LogoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AdminDashboard from './pages/AdminDashboard';
import ManageBooks from './components/Admin/ManageBooks';
import ManageUsers from './components/Admin/ManageUsers';

function HeaderWrapper() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsAdmin(user?.role === 'admin');
  }, [location]);

  if (location.pathname.startsWith('/admin') && isAdmin) {
    return <AdminHeader />;
  }

  return <Header />;
}

export default function App() {
  useEffect(() => {
  // 👇 Only reset if user is not supposed to be logged in
  const isReturning = sessionStorage.getItem('visited');
  if (!isReturning) {
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    sessionStorage.setItem('visited', 'true');
  }
}, []);
  return (
    <Router>
      <HeaderWrapper />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<ManageBooks />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} /> 
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}
