import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);

      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('loggedIn', 'true');

      // 💾 Load saved cart for this user (if exists)
      const savedCart = localStorage.getItem(`cart-${user.email}`);
      if (savedCart) {
        localStorage.setItem('cart', savedCart);
      }

      alert(`Welcome back, ${user.username} ✨`);

      // 🎯 Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed 😢');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-100 to-purple-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-purple-200"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6 font-serif">
          Welcome back 💫
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-purple-50 border border-purple-300 placeholder-purple-400 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-purple-50 border border-purple-300 placeholder-purple-400 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-200"
        >
          Log In
        </button>

        <p className="text-sm text-center text-purple-500 mt-4">
          Don’t have an account?{' '}
          <span
            className="text-pink-600 hover:underline cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Sign up here
          </span>
        </p>
      </form>
    </div>
  );
}
