import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/checkout/history/${user._id}`);
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-fuchsia-50 to-purple-100 px-6 py-14 font-sans relative overflow-hidden">

      {/* 🌈 Floating Emojis */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[8%] left-[5%] text-3xl animate-floatSlow opacity-30">📦</div>
        <div className="absolute top-[22%] right-[8%] text-4xl animate-floatMedium opacity-30">💌</div>
        <div className="absolute bottom-[20%] left-[14%] text-5xl animate-floatFast opacity-30">🛍️</div>
        <div className="absolute bottom-[6%] right-[12%] text-3xl animate-floatMedium opacity-30">📚</div>
        <div className="absolute top-[15%] right-[30%] text-3xl animate-floatSlow opacity-20">🌸</div>
        <div className="absolute bottom-[10%] left-[28%] text-4xl animate-floatMedium opacity-30">📖</div>
        <div className="absolute top-[38%] left-[50%] text-3xl animate-floatFast opacity-20">✨</div>
        <div className="absolute bottom-[32%] right-[22%] text-4xl animate-floatSlow opacity-30">🧸</div>
      </div>

      {/* 🧾 Order Section */}
      <div className="relative z-10 max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-pink-200 space-y-8 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-purple-700 text-center font-serif">📚 Your Order History</h2>

        {orders.length === 0 ? (
          <p className="text-center text-pink-500 italic text-sm">You haven’t placed any orders yet... your shelf is lonely 😢</p>
        ) : (
          orders.map((order, idx) => (
            <div
              key={idx}
              className="bg-pink-50 border border-purple-100 p-5 rounded-xl shadow-inner hover:shadow-md transition animate-scale-in"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-purple-700">Order #{idx + 1}</h3>
                <span className="text-sm text-gray-500">🕒 {new Date(order.createdAt).toLocaleString()}</span>
              </div>

              <p className="text-sm text-pink-700 mb-1">📍 <span className="font-medium">{order.address}</span></p>
              <p className="text-sm text-purple-700 mb-1">💳 Payment: <span className="font-medium">{order.paymentMode}</span></p>
              <p className="text-sm text-fuchsia-600 font-bold mb-3">🧾 Total: ₹{order.total}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {order.items.map((book, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white border border-purple-100 rounded-xl p-3 shadow-inner text-sm text-purple-800"
                  >
                    <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded shadow" />
                    <div>
                      <p className="font-semibold">{book.title}</p>
                      <p className="text-xs text-pink-500">Qty: {book.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
