import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#f7ecff] to-[#fce6f9] text-[#4b185c] font-sans flex flex-col overflow-hidden">
      
      {/* FLOATING BOOKS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 text-[5rem] opacity-10 animate-floatSlow">📖</div>
        <div className="absolute bottom-10 right-10 text-[4rem] opacity-10 animate-floatFast">📘</div>
        <div className="absolute top-10 right-1/3 text-[6rem] opacity-10 animate-floatMedium">📕</div>
      </div>

      {/* Header */}
      <header className="w-full px-8 py-4 flex justify-between items-center z-10">
        <h1 className="text-3xl font-bold text-purple-700 font-serif cursor-pointer" onClick={() => navigate('/')}>
          Fineprint
        </h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => navigate('/books')} className="text-sm px-4 py-2 rounded-full bg-white border border-purple-300 hover:bg-purple-100 transition text-purple-800 shadow-sm">
            📖 Books
          </button>
          <button onClick={() => navigate('/login')} className="text-sm px-4 py-2 rounded-full bg-purple-200 hover:bg-purple-300 transition text-purple-800">
            Login
          </button>
          <button onClick={() => navigate('/signup')} className="text-sm px-4 py-2 rounded-full bg-pink-200 hover:bg-pink-300 transition text-pink-800">
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center text-center flex-grow px-6 pt-20 pb-10 z-10"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-purple-800 mb-4 leading-tight">
          📚 Welcome to <span className="text-pink-500">Fineprint</span>
        </h2>
        <p className="text-lg md:text-xl text-purple-600 max-w-2xl mb-6">
          A dreamy book nook where every read feels like a warm hug. Cozy up and explore handpicked stories that match your soul 💜
        </p>
        <button
          onClick={() => navigate('/books')}
          className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          Browse Books
        </button>
      </motion.section>

      {/* Why Fineprint */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white/60 py-12 px-6 rounded-2xl mx-6 my-10 shadow-md z-10"
      >
        <h3 className="text-3xl font-bold text-center text-purple-700 mb-8">Why Fineprint?</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { icon: "📦", title: "Curated Selections", desc: "Only the most loved, highest-rated books make it here." },
            { icon: "🌙", title: "Vibe-based Discovery", desc: "Search by mood, genre, or even your favorite weather." },
            { icon: "💖", title: "Built for Book Lovers", desc: "Your shelf, wishlist & cart — personalized for YOU." },
          ].map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition text-center">
              <div className="text-4xl mb-2">{card.icon}</div>
              <h4 className="text-lg font-bold text-purple-700 mb-1">{card.title}</h4>
              <p className="text-sm text-purple-500">{card.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-purple-50 py-12 px-6 text-center rounded-xl mx-6 shadow-sm mb-10 z-10"
      >
        <h3 className="text-2xl font-bold text-purple-700 mb-6">What Readers Say 🥺</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { name: "Luna 📚", quote: "I felt seen for the first time. Fineprint is a cozy bubble of joy!" },
            { name: "Ash 🐱", quote: "Love the soft UI, it makes browsing books feel like self-care." },
            { name: "Mira 🌸", quote: "Every time I open Fineprint, it’s like hugging a book-scented cloud." }
          ].map((t, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-purple-200 shadow-md text-left text-purple-700">
              <p className="italic text-sm mb-2">"{t.quote}"</p>
              <p className="text-sm font-semibold">— {t.name}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-pink-50 py-10 px-6 text-center rounded-2xl mx-6 mb-10 z-10"
      >
        <h3 className="text-2xl font-bold text-purple-700 mb-4">Join Our Bookmail 💌</h3>
        <p className="text-sm text-purple-500 mb-6">No spam, just the occasional cozy read suggestion 🌷</p>
        <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="px-4 py-2 w-full md:w-2/3 rounded-lg border border-purple-300 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-md transition"
          >
            Subscribe
          </button>
        </form>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-purple-500 z-10">
        Made with 💜 by Mochi for Mafrin • © {new Date().getFullYear()} Fineprint
      </footer>
    </div>
  );
}
