const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  quantity: { type: Number, default: 1 },
});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  bio: String,
  avatar: String,
  role: {
  type: String,
  enum: ['admin', 'user'],
  default: 'user'
},
 cart: [cartItemSchema]
});

module.exports = mongoose.model('User', UserSchema);
