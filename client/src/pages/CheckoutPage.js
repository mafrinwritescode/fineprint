import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', address: '', paymentMode: 'Card' });
  const [groupedBooks, setGroupedBooks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      alert('Please login first!');
      navigate('/login');
      return;
    }

    const rawCart =
      localStorage.getItem(`cart-${user.email}`) ||
      localStorage.getItem('cart') ||
      localStorage.getItem('cart-guest') ||
      '[]';

    const cartItems = JSON.parse(rawCart);

    const grouped = cartItems.reduce((acc, book) => {
      const existing = acc.find(b => b.title === book.title);
      const cleanPrice = typeof book.price === 'string'
        ? parseInt(book.price.replace(/[^\d]/g, ''))
        : book.price;

      if (existing) {
        existing.quantity += 1;
      } else {
        acc.push({ ...book, price: cleanPrice, quantity: 1 });
      }

      return acc;
    }, []);

    setGroupedBooks(grouped);
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.paymentMode) {
      alert("Please fill all details");
      return;
    }

    if (groupedBooks.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const total = groupedBooks.reduce((sum, b) => sum + b.price * b.quantity, 0);

    try {
      console.log("📦 Sending checkout request:", {
        userId: user._id,
        items: groupedBooks,
        total,
        name: form.name,
        email: user.email,
        address: form.address,
        paymentMode: form.paymentMode,
      });

      await axios.post('http://localhost:5000/api/checkout', {
        userId: user._id,
        items: groupedBooks,
        total,
        name: form.name,
        email: user.email,
        address: form.address,
        paymentMode: form.paymentMode,
      });

      localStorage.removeItem(`cart-${user.email}`);
      setShowToast(true);
      setTimeout(() => navigate('/orders'), 2000);
    } catch (err) {
      console.error("❌ Checkout failed:", err.response?.data || err.message);
      alert("Checkout failed 💔");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100 px-6 py-16 font-sans relative overflow-hidden">
      {/* 🌟 Floating Emojis */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[8%] left-[5%] text-pink-300 text-3xl animate-floatSlow opacity-30">📦</div>
        <div className="absolute top-[28%] right-[10%] text-purple-400 text-2xl animate-floatMedium opacity-30">💌</div>
        <div className="absolute bottom-[15%] left-[18%] text-purple-300 text-4xl animate-floatFast opacity-30">🛍️</div>
        <div className="absolute bottom-[5%] right-[12%] text-pink-400 text-3xl animate-floatMedium opacity-30">✨</div>
      </div>

      {/* ✅ Toast */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-white border border-pink-300 text-pink-700 px-6 py-3 rounded-xl shadow-lg z-50 animate-bounceIn">
          💖 Order Confirmed! Redirecting...
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 space-y-8 border border-pink-200">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-extrabold text-purple-700 font-serif drop-shadow">Checkout</h2>
          <p className="italic text-pink-500">"Books may leave shelves, but never hearts." 💖</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            value={form.name}
            className="p-4 border-2 border-purple-200 rounded-xl shadow-inner"
          />
          <input
            disabled
            name="email"
            value={user.email}
            className="p-4 border-2 border-purple-200 rounded-xl shadow-inner bg-purple-50 text-purple-500"
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            onChange={handleChange}
            value={form.address}
            className="p-4 border-2 border-purple-200 rounded-xl shadow-inner col-span-1 md:col-span-2 h-32 resize-none"
          />
          <select
            name="paymentMode"
            onChange={handleChange}
            value={form.paymentMode}
            className="p-4 border-2 border-purple-200 rounded-xl shadow-inner col-span-1 md:col-span-2"
          >
            <option value="Card">💳 Card</option>
            <option value="UPI">📲 UPI</option>
            <option value="Cash">💵 Cash on Delivery</option>
          </select>

          {/* 📚 Order Summary */}
          <div className="col-span-1 md:col-span-2 bg-fuchsia-50 p-5 rounded-2xl shadow-inner border border-purple-100">
            <h3 className="text-lg font-bold text-purple-700 mb-3">🧺 Your Order</h3>
            {groupedBooks.length === 0 ? (
              <p className="text-sm text-gray-500">Your cart is empty 😢</p>
            ) : (
              groupedBooks.map((book, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-purple-100 text-purple-800 text-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-10 h-14 object-contain rounded shadow"
                    />
                    <span>{book.title} × {book.quantity}</span>
                  </div>
                  <span className="font-medium">₹{book.price}</span>
                </div>
              ))
            )}
          </div>

          <button
            type="submit"
            className="col-span-1 md:col-span-2 w-full mt-2 bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition"
          >
            Confirm Order! 💝
          </button>
        </form>
      </div>
    </div>
  );
}
