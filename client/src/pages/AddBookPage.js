import React, { useState } from 'react';
import axios from 'axios';

export default function AddBookPage() {
  const [book, setBook] = useState({ title: '', author: '', genre: '', year: '', description: '', image: '' });

  const handleChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/books', book)
      .then(() => alert('Book added!'));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-purple-50 rounded shadow mt-6 space-y-4">
      <h2 className="text-xl font-bold text-purple-800">Add a New Book</h2>
      {['title', 'author', 'genre', 'year', 'description', 'image'].map(field => (
        <input
          key={field}
          name={field}
          placeholder={field}
          onChange={handleChange}
          className="w-full p-2 border border-purple-300 rounded"
        />
      ))}
      <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded">Add Book</button>
    </form>
  );
}
