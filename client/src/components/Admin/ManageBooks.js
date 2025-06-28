import React, { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '', author: '', genre: '', price: '', image: '', description: '', rating: '', paragraph_description: ''
  });

  const [genreFilter, setGenreFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      alert('🚫 Access denied. Admins only!');
      navigate('/');
    } else {
      fetchBooks();
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data.books);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatted = {
      ...form,
      genre: form.genre.split(',').map(g => g.trim()),
      rating: Number(form.rating)
    };
    await axios.post('http://localhost:5000/api/books', formatted);
    setForm({
      title: '', author: '', genre: '', price: '', image: '', description: '', rating: '', paragraph_description: ''
    });
    setShowForm(false);
    fetchBooks();
  };

  const filteredBooks = books.filter(book => {
    const genreMatch = genreFilter === 'All' || book.genre.includes(genreFilter);
    const ratingMatch = ratingFilter === 'All' || book.rating >= Number(ratingFilter);
    return genreMatch && ratingMatch;
  });

  const allGenres = Array.from(new Set(books.flatMap(book => book.genre)));

  return (
    <div className="p-10 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-purple-700 font-serif text-center">📚 Manage Books</h2>

      {/* Filters and Add Button */}
      <div className="flex flex-wrap justify-between items-center gap-4 max-w-6xl mx-auto mb-10">
        <div className="flex gap-4">
          <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
            <option value="All">All Genres</option>
            {allGenres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
            <option value="All">All Ratings</option>
            <option value="5">5★</option>
            <option value="4">4★ & up</option>
            <option value="3">3★ & up</option>
          </select>
        </div>

        <button
          onClick={() => setShowForm(prev => !prev)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
        >
          <Plus size={18} /> {showForm ? 'Cancel' : 'Add Book'}
        </button>
      </div>

      {/* Conditional Add Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4 mb-10 max-w-3xl mx-auto border border-purple-100"
        >
          <h3 className="text-xl font-semibold text-purple-600">Add New Book</h3>
          {['title', 'author', 'genre', 'price', 'image', 'description', 'rating', 'paragraph_description'].map(field => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
              placeholder={field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
              required={field !== 'paragraph_description'}
              className="w-full p-3 rounded-lg border border-purple-200 focus:outline-none"
            />
          ))}
          <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow">
            ➕ Add Book
          </button>
        </form>
      )}

      {/* Book List */}
      <div className="space-y-4 max-w-6xl mx-auto">
        {filteredBooks.map((book, index) => (
          <div
            key={book._id || index}
            className="flex items-start gap-6 p-5 bg-white rounded-xl shadow-md border border-purple-100 hover:shadow-lg transition-all"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-32 h-44 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-purple-700">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
              <p className="text-sm text-purple-500 mb-2">{book.genre.join(', ')}</p>
              <p className="text-sm text-gray-700 mb-2">{book.description}</p>
              <p className="text-sm text-gray-500 italic mb-2">{book.paragraph_description}</p>
              <div className="flex justify-between items-center">
                <span className="text-pink-600 font-semibold">₹{book.price}</span>
                <span className="text-yellow-500">⭐ {book.rating}/5</span>
              </div>
            </div>
            <button
              onClick={() => handleDelete(book._id)}
              className="text-red-500 hover:text-red-700"
              title="Remove book"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
