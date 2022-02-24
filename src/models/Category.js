const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, 'Please add a category name'],
    trim: true,
  },
});

module.exports = mongoose.model('Category', CategorySchema);
