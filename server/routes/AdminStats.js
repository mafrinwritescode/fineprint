const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');

router.get('/stats', async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: 'user' });
    const bookCount = await Book.countDocuments();
    res.json({ users: userCount, books: bookCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

module.exports = router;
