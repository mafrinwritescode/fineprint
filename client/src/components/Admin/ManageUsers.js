import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Download } from 'lucide-react';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [userOrders, setUserOrders] = useState({});
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      alert('🚫 Access denied. Admins only!');
      navigate('/');
    } else {
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    try {
      const [usersRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/auth/users'),
        axios.get('http://localhost:5000/api/checkout/all'),
      ]);

      setUsers(usersRes.data.users || []);

      const grouped = {};
      ordersRes.data.orders.forEach(order => {
        if (!grouped[order.email]) grouped[order.email] = [];
        grouped[order.email].push(order);
      });

      setUserOrders(grouped);
      setTotalOrdersCount(ordersRes.data.orders.length);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleDelete = async (id) => {
    if (currentUser._id === id) {
      alert("🚫 You can't delete yourself!");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchAllData();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const exportToCSV = (userEmail, orders) => {
    const header = ['Title', 'Quantity', 'Total Price', 'Address', 'Payment Mode', 'Date'];
    const rows = [];

    orders.forEach(order => {
      order.items.forEach(item => {
        rows.push([
          item.title,
          item.quantity || 1,
          `₹${order.total}`,
          order.address.replace(/,/g, ';'),
          order.paymentMode,
          new Date(order.createdAt).toLocaleString(),
        ]);
      });
    });

    const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${userEmail}_orders.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-10 bg-gradient-to-b from-pink-50 to-white min-h-screen">
      <h2 className="text-4xl font-bold mb-4 text-pink-600 font-serif text-center">👥 Manage Users</h2>

      {/* 🧾 TOTAL ORDER COUNT */}
      <div className="text-center mb-8">
        <p className="inline-block text-lg font-semibold text-pink-700 bg-pink-100 px-5 py-2 rounded-full shadow">
          🧾 Total Orders: {totalOrdersCount}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {users.map(user => {
          const orders = userOrders[user.email] || [];

          return (
            <div
              key={user._id}
              className="bg-white p-6 rounded-xl shadow-md border border-pink-100 relative hover:shadow-lg transition-all"
            >
              {user.role === 'admin' && (
                <span className="absolute top-3 left-3 text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                  Admin
                </span>
              )}

              <img
                src={user.avatar || 'https://i.pravatar.cc/150'}
                alt={user.username}
                className="w-20 h-20 object-cover rounded-full mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-center text-pink-700">{user.username}</h3>
              <p className="text-center text-sm text-gray-600">{user.email}</p>
              <p className="text-center text-xs text-pink-500 italic mt-2">{user.bio || 'No bio provided'}</p>

              {/* 📦 Order count badge */}
              <p
                onClick={() => {
                  setSelectedUserOrders(orders);
                  setSelectedUserEmail(user.email);
                  setSelectedUserName(user.username);
                  setShowModal(true);
                }}
                className="text-center text-[13px] mt-2 text-purple-600 font-medium cursor-pointer hover:underline"
                title="Click to view order history"
              >
                📦 {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
              </p>

              {user._id !== currentUser._id && (
                <button
                  onClick={() => handleDelete(user._id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                  title="Remove user"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 🌸 MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative border border-pink-200">
            <h3 className="text-lg font-semibold text-pink-600 mb-3">
              🧾 Order History for {selectedUserName}
            </h3>

            {selectedUserOrders.length === 0 ? (
              <p className="text-sm text-gray-500">No orders found.</p>
            ) : (
              <>
                <button
                  onClick={() => exportToCSV(selectedUserEmail, selectedUserOrders)}
                  className="mb-4 flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  <Download size={14} /> Export to CSV
                </button>

                {selectedUserOrders.map((order, idx) => (
                  <div
                    key={idx}
                    className="mb-4 text-xs text-gray-700 bg-purple-50 p-3 rounded border border-purple-100"
                  >
                    <p className="text-pink-600 font-semibold mb-1">
                      📦 {order.items.length} items — ₹{order.total}
                    </p>
                    <ul className="list-disc ml-4 text-[11px] text-purple-800">
                      {order.items.map((item, i) => (
                        <li key={i}>{item.title} × {item.quantity || 1}</li>
                      ))}
                    </ul>
                    <p className="italic mt-1">📍 {order.address}</p>
                    <p>📧 {order.email}</p>
                    <p>💳 {order.paymentMode}</p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      🕒 {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-sm text-white bg-pink-500 px-4 py-2 rounded-full hover:bg-pink-600 transition-all"
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
