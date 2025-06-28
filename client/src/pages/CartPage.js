import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import booksData from '../data/books_data.json';

const booktokQuotes = [
  "\"You're not just my weakness. You're my strength, my reason to fight.\" – Tristan Caine",
  "\"I don't know how to love anyone but you, even when the world wants to tear us apart.\" – Aaron Warner",
  "\"You are the only light in my endless darkness.\" – Cardan Greenbriar",
  "\"To the stars who listen and the dreams that are answered.\" – Rhysand",
  "\"You're the only one I want beside me in a world full of enemies.\" – Kaz Brekker",
  "\"I don't just want your heart. I want your whole story.\" – Jude Duarte",
  "\"You are my favorite chapter in a book I never want to end.\" – Tessa Gray",
  "\"I'd burn the world down if it meant keeping you safe.\" – Dorian Havilliard",
  "\"Love is chaos, but with you, it feels like home.\" – Jace Wayland",
  "\"When I look at you, I see a future worth fighting for.\" – Alex Volkov"
];

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(items);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % booktokQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const groupedCart = cart.reduce((acc, book) => {
    const key = book.title;
    if (!acc[key]) {
      acc[key] = { ...book, quantity: 1 };
    } else {
      acc[key].quantity += 1;
    }
    return acc;
  }, {});
  const groupedBooks = Object.values(groupedCart);

  const updateQuantity = (title, delta) => {
    let newCart = [...cart];
    if (delta === -1) {
      const indexToRemove = newCart.findIndex((b) => b.title === title);
      if (indexToRemove !== -1) newCart.splice(indexToRemove, 1);
    } else if (delta === 1) {
      const bookToAdd = groupedBooks.find((b) => b.title === title);
      if (bookToAdd) newCart.push(bookToAdd);
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const removeFromCart = (title) => {
    const newCart = cart.filter((b) => b.title !== title);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('storage'));
  };

  const addToCart = (book) => {
    const currentCart = [...cart, book];
    setCart(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    window.dispatchEvent(new Event('storage'));
  };

  const total = cart.reduce((sum, b) => {
    const clean = parseInt(String(b.price).replace(/[^\d]/g, ''));
    return sum + (isNaN(clean) ? 0 : clean);
  }, 0);

  const getRecommendations = () => {
    const cartGenres = new Set(cart.flatMap((book) => book.genre));
    const inCartTitles = new Set(cart.map((book) => book.title));

    const related = booksData.filter(
      (book) =>
        book.genre.some((g) => cartGenres.has(g)) &&
        !inCartTitles.has(book.title)
    );

    return related.slice(0, 3);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100 text-purple-900 px-6 py-24 font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* 🎈 Floating Decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[10%] left-[5%] text-pink-300 text-3xl animate-floatSlow opacity-30 select-none">❤️</div>
          <div className="absolute top-[30%] right-[8%] text-purple-400 text-2xl animate-floatMedium opacity-30 select-none">✨</div>
          <div className="absolute bottom-[20%] left-[15%] text-purple-300 text-4xl animate-floatFast opacity-30 select-none">📚</div>
          <div className="absolute bottom-[10%] right-[12%] text-pink-400 text-3xl animate-floatMedium opacity-30 select-none">🌸</div>
        </div>

        {/* 👤 Greeting */}
        {user?.name && (
          <h2 className="text-center text-xl font-bold text-purple-700 mb-4">
            Hi, {user.name}! Here’s your cozy cart 🧺
          </h2>
        )}

        {/* 💬 Quote */}
        <div className="mb-8 px-6 py-4 bg-pink-50 rounded-xl shadow text-center text-purple-700 font-semibold italic select-none animate-pulse">
          {booktokQuotes[currentQuoteIndex]}
        </div>

        <h1 className="text-center text-4xl font-extrabold font-serif text-pink-600 mb-12 drop-shadow-md">
          🧺 Your Cozy Cart is a Hug in Book Form
        </h1>

        {groupedBooks.length === 0 ? (
          <div className="text-center text-purple-500 mt-20 space-y-4">
            <p className="text-lg">Your shelf looks lonely... let's fill it with magic ✨</p>
            <p className="italic text-sm bg-purple-50 py-2 px-4 inline-block rounded-md shadow-sm animate-pulse">
              {booktokQuotes[(currentQuoteIndex + 1) % booktokQuotes.length]}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-32">
              {groupedBooks.map((book, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-4 bg-white border border-pink-300 p-5 rounded-2xl shadow-md hover:shadow-pink-300 transition-all">
                  <img src={book.image} alt={book.title} className="w-28 sm:w-32 h-44 object-contain bg-pink-50 border rounded-lg p-2 shadow" />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-2xl font-semibold text-purple-800">{book.title}</h2>
                      <p className="text-sm text-purple-500 mb-2">by {book.author}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {book.genre.map((g, i) => (
                          <span key={i} className="bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full">#{g}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center mt-4 gap-4">
                      <span className="text-lg font-bold text-pink-600">{String(book.price).includes('₹') ? book.price : `₹${book.price}`}</span>
                      <div className="flex items-center space-x-2 rounded-full bg-purple-100 px-3 py-1 select-none text-purple-700 font-semibold">
                        <button onClick={() => updateQuantity(book.title, -1)} className="bg-pink-300 hover:bg-pink-400 rounded-full px-2 transition">−</button>
                        <span className="min-w-[24px] text-center">{book.quantity}</span>
                        <button onClick={() => updateQuantity(book.title, 1)} className="bg-pink-300 hover:bg-pink-400 rounded-full px-2 transition">+</button>
                      </div>
                      <button onClick={() => removeFromCart(book.title)} className="ml-auto text-red-500 hover:text-red-700 font-bold px-3 py-1 rounded-lg transition">Remove All ✖</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 💬 Mid Quote */}
            <div className="my-10 px-6 py-3 bg-purple-50 text-purple-700 text-center italic font-medium rounded-xl shadow-md animate-fade">
              {booktokQuotes[(currentQuoteIndex + 2) % booktokQuotes.length]}
            </div>

            {/* 🧡 Recommendations */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-purple-700 mb-6">You might also like ✨</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {getRecommendations().map((book, i) => (
                  <div key={i} className="bg-white border border-pink-300 p-4 rounded-xl shadow-md hover:shadow-pink-300 transition flex flex-col">
                    <img src={book.image} alt={book.title} className="h-44 object-contain mb-3 bg-white p-2 rounded" />
                    <h3 className="font-semibold text-purple-900">{book.title}</h3>
                    <p className="text-sm text-purple-500 mb-1">by {book.author}</p>
                    <div className="flex flex-wrap gap-1 mb-2 text-xs">
                      {book.genre.map((g, idx) => (
                        <span key={idx} className="bg-pink-100 text-purple-600 px-2 py-0.5 rounded-full">#{g}</span>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="font-bold text-purple-700 text-sm">{String(book.price).includes('₹') ? book.price : `₹${book.price}`}</span>
                      <button onClick={() => addToCart(book)} className="text-xs bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full shadow transition">Add +</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 💬 Final Quote */}
            <div className="text-center text-purple-500 italic text-sm mt-12 animate-fadeIn">
              {booktokQuotes[(currentQuoteIndex + 3) % booktokQuotes.length]}
            </div>

            {/* 🧾 Footer */}
            <div className="fixed bottom-0 left-0 w-full bg-pink-100/95 border-t border-purple-300 py-5 px-8 shadow-lg flex justify-between items-center z-50">
              <div>
                <p className="text-sm text-purple-500">Total ({cart.length} items)</p>
                <p className="text-3xl font-extrabold text-pink-600">₹{total}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={clearCart} className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition">Clear Cart</button>
                <button onClick={() => navigate('/checkout')} className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-6 py-2 rounded-xl font-bold shadow-md transition">Checkout →</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
