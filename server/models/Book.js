const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: [String],
  price: String,
  image: String,
  description: String,
  rating: Number,
  paragraph_description: String
});

module.exports = mongoose.model('Book', BookSchema);
