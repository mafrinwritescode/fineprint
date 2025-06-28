const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      title: String,
      author: String,
      genre: [String],
      price: Number,
      image: String,
      description: String,
      rating: Number,
      paragraph_description: String,
      quantity: Number
    }
  ],
  total: Number,
  name: String,
  email: String,
  address: String,
  paymentMode: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
