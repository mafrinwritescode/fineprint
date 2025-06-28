const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const { userId, items, total, name, email, address, paymentMode } = req.body;

    if (!userId || !items || !total || !name || !email || !address || !paymentMode) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({ userId, items, total, name, email, address, paymentMode });
    await newOrder.save();

    res.status(201).json({ message: 'Order confirmed!', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Order failed', error: err.message });
  }
});

router.get('/history/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'username email');
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all orders', error: err.message });
  }
});

module.exports = router;
