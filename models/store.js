const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  poster: { type: mongoose.Schema.ObjectId, ref: 'User'},
  text: String
});

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  ambienceRating: {type: Number, required: true},
  foodQualityRating: {type: Number, required: true},
  customerServiceRating: {type: Number, required: true},
  reviewText: String,
  comments: [ commentSchema ]
});

const storeSchema = new mongoose.Schema({
  locationName: {type: String, required: true},
  address: String,
  reviews: [ reviewSchema ],
  createdByUser: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

storeSchema
  .virtual('percentAverage')
  .get(function() {
    console.log(this);
    const totalPercent = this.reviews
      .map(review => (review.ambienceRating + review.foodQualityRating + review.customerServiceRating)/30 *100)
      .reduce((sum, n) => sum + n, 0);
    const average = totalPercent/this.reviews.length;
    return average ? average.toFixed() : '-';
  });

module.exports = mongoose.model('Store', storeSchema);
