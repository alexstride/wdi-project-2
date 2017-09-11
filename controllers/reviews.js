const User = require('../models/user');
const Store = require('../models/store');

//Of the form /stores/:id/comments/:commentId
function reviewsShow(req, res) {
  Store
    .findById(req.params.id)
    .exec()
    .then(store => {
      const review = store.reviews.id(req.params.reviewId);
      res.render('reviews/show', { review, store });
    })
    .catch(err => res.render('error', { err }));
}

function reviewsNew(req, res) {
  res.render('reviews/new')
}

module.exports = {
  show: reviewsShow
};
