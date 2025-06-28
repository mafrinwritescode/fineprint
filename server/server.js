const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

// 🌐 Middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));


app.use(express.json());

// 🛠 Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟣 Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// 📦 Routes


const authRoutes = require('./routes/auth');         // ✅ ADD THIS
app.use('/api/auth', authRoutes);                    // ✅ AND THIS



const User = require('./models/User');
app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

const statsRoutes = require('./routes/AdminStats');
app.use('/api/admin', statsRoutes);


// const checkoutRoutes = require('./routes/Checkout');
// app.use('/api/checkout', checkoutRoutes);


const checkoutRoutes = require('./routes/checkout');
app.use('/api/checkout', checkoutRoutes);

// 🏁 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
