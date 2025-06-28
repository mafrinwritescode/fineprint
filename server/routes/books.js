const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ books });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

// ADD a new book
router.post('/', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add book', error: err.message });
  }
});

// DELETE a book by ID
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete book', error: err.message });
  }
});

module.exports = router;
