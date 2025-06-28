import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import booksData from '../data/books_data.json';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setBooks(booksData);
    setFilteredBooks(booksData);
    const initialQuantities = {};
    booksData.forEach(book => initialQuantities[book.title] = 0);
    setQuantities(initialQuantities);
  }, []);

  useEffect(() => {
    let filtered = books;

    if (genre !== 'All') {
      filtered = filtered.filter(book => book.genre.includes(genre));
    }

    if (search.trim() !== '') {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'recent') {
      filtered = [...filtered].sort((a, b) => (new Date(b.addedAt || '2023-01-01')) - (new Date(a.addedAt || '2023-01-01')));
    }

    setFilteredBooks(filtered);
  }, [search, genre, books, sortBy]);

  const uniqueGenres = ['All', ...new Set(books.flatMap(book => book.genre))];

  const updateQuantity = (bookTitle, delta) => {
    const newQty = Math.max(0, (quantities[bookTitle] || 0) + delta);
    setQuantities({ ...quantities, [bookTitle]: newQty });

    const book = books.find(b => b.title === bookTitle);
    if (!book) return;

    if (!localStorage.getItem('loggedIn')) {
      alert("Please login to modify your cart.");
      navigate('/login');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const filteredCart = cart.filter(b => b.title !== bookTitle);
    for (let i = 0; i < newQty; i++) filteredCart.push(book);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5e9ff] to-[#ecdfff] text-[#4c1d57] p-6 font-sans">
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-10 font-serif tracking-wide animate-fade-in">
        ✨ Fineprint Bookstore ✨
      </h2>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-1/3 px-4 py-2 rounded-md bg-white border border-purple-300 placeholder-purple-400 text-purple-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full lg:w-1/4 px-4 py-2 rounded-md bg-white border border-purple-300 text-purple-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          {uniqueGenres.map((g, idx) => (
            <option key={idx} value={g}>{g}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full lg:w-1/4 px-4 py-2 rounded-md bg-white border border-purple-300 text-purple-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="default">Sort: Default</option>
          <option value="rating">Most Rated</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>

      {/* Selected tag */}
      {genre !== 'All' && (
        <div className="mb-4 text-center animate-fade-in">
          <span
            className="inline-block bg-purple-300 text-white text-sm px-4 py-1 rounded-full cursor-pointer hover:bg-purple-400 transition"
            onClick={() => setGenre('All')}
          >
            #{genre} ✖
          </span>
        </div>
      )}

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book, idx) => (
          <div
            key={idx}
            className="bg-white border border-purple-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-52 object-contain bg-white p-4 rounded-t-xl transition duration-300 hover:opacity-90"
              onClick={() => setSelectedBook(book)}
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-purple-700">{book.title}</h3>
              <p className="text-sm text-purple-500 mb-1">by {book.author}</p>

              <div className="flex items-center gap-1 mb-2 text-yellow-500 text-sm">
                {Array.from({ length: book.rating || 4 }).map((_, i) => <span key={i}>⭐</span>)}
                <span className="text-xs text-purple-400 ml-1">({book.rating || 4}/5)</span>
              </div>

              <p
                onClick={() => setSelectedBook(book)}
                className="text-xs text-purple-600 line-clamp-2 mb-2 cursor-pointer hover:underline"
              >
                {book.description ? book.description.slice(0, 150) + '...' : 'No description available.'}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {book.genre.map((tag, i) => (
                  <span
                    key={i}
                    onClick={() => setGenre(tag)}
                    className="bg-pink-100 text-purple-700 text-xs px-3 py-0.5 rounded-full cursor-pointer hover:bg-pink-200 transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-auto">
                <span className="text-pink-600 font-bold text-md">
                  {String(book.price).includes('₹') ? book.price : `₹${book.price}`}
                </span>

                {quantities[book.title] === 0 ? (
                  <button
                    onClick={() => updateQuantity(book.title, 1)}
                    className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-4 py-1 rounded-md text-sm transition-all duration-300 hover:scale-105"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(book.title, -1)}
                      className="px-2 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
                    >−</button>
                    <span className="px-2 animate-pulse">{quantities[book.title]}</span>
                    <button
                      onClick={() => updateQuantity(book.title, 1)}
                      className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                    >＋</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <p className="text-center mt-12 text-purple-500 text-lg animate-fade-in">No books found 😢</p>
      )}

      {/* Modal View */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white border border-purple-300 rounded-xl p-6 max-w-lg w-full shadow-xl relative text-purple-800 animate-scale-in">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-3 right-4 text-xl font-bold text-purple-400 hover:text-pink-500 transition"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-1 text-pink-600">{selectedBook.title}</h2>
            <p className="text-sm text-purple-500 mb-3">by {selectedBook.author}</p>

            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              {selectedBook.genre.map((g, i) => (
                <span key={i} className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">#{g}</span>
              ))}
            </div>

            <p className="text-sm mb-4 leading-relaxed">
              {selectedBook.paragraph_description || selectedBook.description || 'No detailed description available.'}
            </p>

            <div className="flex items-center gap-1 mb-2 text-yellow-500 text-lg">
              {Array.from({ length: selectedBook.rating || 4 }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
              <span className="text-xs text-purple-500 ml-1">({selectedBook.rating || 4}/5)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
