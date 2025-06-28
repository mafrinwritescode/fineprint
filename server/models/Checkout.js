const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      title: String,
      author: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],
  total: Number,
  name: String,
  email: String,
  address: String,
  paymentMode: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Checkout', CheckoutSchema);
