import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const cart = localStorage.getItem('cart');

    // 💾 Save cart uniquely for the user before logout
    if (user?.email && cart) {
      localStorage.setItem(`cart-${user.email}`, cart);
    }

    // 🧼 Clear only session-related keys
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');

    // ⏳ Redirect to login
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f7ecff] to-[#fde6f8] text-purple-800 font-sans px-6 text-center">
      <h2 className="text-3xl font-bold mb-2 animate-pulse">You've been logged out 💨</h2>
      <p className="text-md text-purple-600 mb-4">We’ll miss you... for now 🥺</p>
      <p className="text-sm text-purple-500">Redirecting you to the login page... 🛤️</p>
    </div>
  );
}
