const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const { username, email, password, bio, avatar } = req.body;

  // Check if email already exists
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Assign role based on email
  const role = email === 'admin@fineprint.com' ? 'admin' : 'user';

  const user = new User({ username, email, password, bio, avatar, role });
  await user.save();

  res.status(201).json({ message: 'User registered', user });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful', user });
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }); // exclude admin
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json({ books });
});


module.exports = router;
