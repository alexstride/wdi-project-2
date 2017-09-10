const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  ambienceRating: Number,
  foodQualityRating: Number,
  customerServiceRating: Number,
  reviewText: String
});

const storeSchema = new mongoose.Schema({
  locationName: {type: String, required: true},
  address: String,
  reviews: [ reviewSchema ],
  createdByUser: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Store', storeSchema);
