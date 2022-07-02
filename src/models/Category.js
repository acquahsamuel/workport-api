const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      trim: true,
      unique: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
