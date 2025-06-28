import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenText, Users } from 'lucide-react';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, books: 0 });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      alert('🚫 Access denied. Admins only!');
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf4ff] via-[#fae8ff] to-[#f3e8ff] p-10">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-700 mb-2 font-serif">
        ✨ Admin Control Room ✨
      </h1>

      <p className="text-center text-purple-500 max-w-3xl mx-auto text-lg md:text-xl mt-2 mb-10 font-light">
        Welcome, gatekeeper of Fineprint 👑<br />
        From curating magical reads to nurturing readers — your touch makes every chapter count.
      </p>

      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
        <div className="bg-white rounded-2xl shadow-md border border-purple-200 p-6 flex items-center gap-4">
          <BookOpenText className="text-purple-500 w-8 h-8" />
          <div>
            <h4 className="text-lg font-bold text-purple-700">Total Books</h4>
            <p className="text-purple-600 text-xl">{stats.books}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md border border-pink-200 p-6 flex items-center gap-4">
          <Users className="text-pink-500 w-8 h-8" />
          <div>
            <h4 className="text-lg font-bold text-pink-700">Total Users</h4>
            <p className="text-pink-600 text-xl">{stats.users}</p>
          </div>
        </div>
      </div>

      {/* 🧭 Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* 📚 Manage Books */}
        <div
          onClick={() => navigate('/admin/books')}
          className="cursor-pointer p-8 rounded-3xl bg-white/70 backdrop-blur-xl shadow-lg border border-purple-200 hover:scale-[1.02] hover:shadow-purple-300 transition duration-300 ease-in-out group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-purple-100 text-purple-700 rounded-full group-hover:bg-purple-500 group-hover:text-white transition">
              <BookOpenText className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-purple-700 group-hover:text-purple-900 transition">
              Manage Books
            </h2>
          </div>
          <p className="text-purple-500 group-hover:text-purple-600">
            View, add, or remove books from your Fineprint world.
          </p>
        </div>

        {/* 👥 Manage Users */}
        <div
          onClick={() => navigate('/admin/users')}
          className="cursor-pointer p-8 rounded-3xl bg-white/70 backdrop-blur-xl shadow-lg border border-pink-200 hover:scale-[1.02] hover:shadow-pink-300 transition duration-300 ease-in-out group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-pink-100 text-pink-700 rounded-full group-hover:bg-pink-500 group-hover:text-white transition">
              <Users className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-pink-600 group-hover:text-pink-800 transition">
              Manage Users
            </h2>
          </div>
          <p className="text-pink-500 group-hover:text-pink-600">
            Monitor readers and control user access.
          </p>
        </div>
      </div>
    </div>
  );
}
