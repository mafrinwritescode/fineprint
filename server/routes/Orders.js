const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  items: [
    {
      title: { type: String, required: true },
      author: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
      image: { type: String }
    }
  ],

  total: { type: Number, required: true },

  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  paymentMode: { type: String, enum: ['Card', 'UPI', 'Cash'], required: true },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
