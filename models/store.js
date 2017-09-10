const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.ObjectId, ref: 'Store'}, //reference is potential source of bugs!!
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  ambienceRating: Number,
  foodQualityRating: Number,
  customerServiceRating: Number,
  reviewText: String
});

const storeSchema = new mongoose.Schema({
  locationName: String,
  address: String,
  reviews: [ reviewSchema ],
  createdByUser: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Store', storeSchema);
