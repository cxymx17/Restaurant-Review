// reviewModel.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  username: String, // Add username property
  title: String,
  body: String,
  recommended: Boolean, // Change the property name to 'recommended'
  image: String,
  establishmnentName: String,
  categoryID: String, // Add categoryID property
  helpful: { type: Number, default: 0 },
  unhelpful: { type: Number, default: 0 },
  avatar: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
