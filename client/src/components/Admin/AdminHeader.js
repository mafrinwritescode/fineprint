import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white px-8 py-5 shadow-lg flex justify-between items-center">
      <h1
        onClick={() => navigate('/admin/dashboard')}
        className="text-3xl font-extrabold font-serif tracking-wide cursor-pointer hover:scale-105 transition duration-200"
      >
        🌸 Fineprint Admin
      </h1>

      <nav className="flex gap-6 text-lg font-medium">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="hover:text-yellow-200 transition duration-200"
        >
          🛠 Dashboard
        </button>
        <button
          onClick={handleLogout}
          className="hover:text-pink-100 transition duration-200"
        >
          🚪 Logout
        </button>
      </nav>
    </header>
  );
}
