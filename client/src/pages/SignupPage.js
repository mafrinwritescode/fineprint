import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    avatar: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);

      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('loggedIn', 'true');

      alert(`Welcome, ${user.username} ✨`);
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/');
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Signup failed 😢 Try again!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-lg border border-pink-200"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6 font-serif">
          Create Your Fineprint Account ✨
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-xl bg-pink-50 border border-purple-300 placeholder-purple-400 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-xl bg-pink-50 border border-purple-300 placeholder-purple-400 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-xl bg-pink-50 border border-purple-300 placeholder-purple-400 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <textarea
            name="bio"
            placeholder="Short bio (optional)"
            value={form.bio}
            onChange={handleChange}
            rows="3"
            className="px-4 py-3 rounded-xl bg-pink-50 border border-purple-300 placeholder-purple-400 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            name="avatar"
            placeholder="Avatar image URL (optional)"
            value={form.avatar}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl bg-pink-50 border border-purple-300 placeholder-purple-400 text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-200"
        >
          Sign Up 💌
        </button>

        <p className="text-sm text-center text-purple-500 mt-4">
          Already have an account?{' '}
          <span
            className="text-pink-600 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
}
