import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username || 'Creative');
    } else {
      setIsLoggedIn(false);
      setUsername('Creative');
    }
  }, [location]);

  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-wide">
        <Link to="/">Fineprint</Link>
      </h1>

      <nav className="flex items-center gap-6 text-sm font-medium">
        <span className="italic text-white/80">Hello, {username} 👋</span>
        <Link to="/" className="hover:underline hover:text-purple-200">Home</Link>
        <Link to="/books" className="hover:underline hover:text-purple-200">Books</Link>

        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:underline hover:text-purple-200">Login</Link>
            <Link to="/signup" className="hover:underline hover:text-purple-200">Signup</Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/orders" className="hover:underline hover:text-purple-200">Order History</Link>
            <Link to="/logout" className="hover:underline text-sm text-purple-100">Logout</Link>
          </>
        )}

        <Link to="/cart" className="relative flex items-center gap-1 hover:text-purple-200">
          <span>🛒</span>
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
