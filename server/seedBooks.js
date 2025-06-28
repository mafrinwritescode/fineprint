const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Book = require('./models/Book'); // adjust if model path differs

mongoose.connect('mongodb+srv://usermafrin:usermafrin@users.jenhrlx.mongodb.net/fineprint')
  .then(async () => {
    console.log('Connected to MongoDB');

    const dataPath = path.join(__dirname, '../client/src/data/books_data.json');
    const books = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log('✅ Books seeded successfully!');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Failed to connect or seed:', err);
    process.exit(1);
  });
