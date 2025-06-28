const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users except admin
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin user' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
