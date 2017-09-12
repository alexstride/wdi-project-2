const Store = require('../models/store');

function reviewsShow(req, res) {
  Store
    .findById(req.params.id)
    .populate('reviews.user')
    .populate('reviews.comments.poster')
    .exec()
    .then(store => {
      const review = store.reviews.id(req.params.reviewId);
      res.render('reviews/show', { review, store });
    })
    .catch(err => res.render('error', { err }));
}

function reviewsNew(req, res) {
  Store
    .findById(req.params.id)
    .exec()
    .then(store => {
      res.render('reviews/new', { store });
    })
    .catch(err => res.render('error', { err }));
}

function reviewsCreate(req, res) {
  req.body.user = req.currentUser;
  Store
    .findById(req.params.id)
    .exec()
    .then(store => {
      if(!(req.body.ambienceRating && req.body.customerServiceRating && req.body.foodQualityRating)) {
        req.flash('danger', 'Please enter valid number values for each of the ratings!');
        const review = req.body;
        res.render('reviews/edit', {review, store});
      }
      store.reviews.push(req.body);
      return store.save();
    })
    .then(store => res.redirect(`/stores/${store.id}`))
    .catch(err => res.render('error', { err }));
}

function reviewsEdit(req, res) {
  Store
    .findById(req.params.id)
    .exec()
    .then(store => {
      const review = store.reviews.id(req.params.reviewId);
      res.render('reviews/edit', { review, store });
    })
    .catch(err => res.render('error', { err }));
}

function reviewsUpdate(req, res) {
  Store
    .findById(req.params.id)
    .exec()
    .then(store => {
      const review = store.reviews.id(req.params.reviewId);
      Object.assign(review, req.body);
      return store.save();
    })
    .then(() => res.redirect(`/stores/${req.params.id}/reviews/${req.params.reviewId}`))
    .catch(err => res.render('error', { err }));
}

function reviewsDelete(req, res) {
  Store
    .findById(req.params.id)
    .exec()
    .then(store => {
      const review = store.reviews.id(req.params.reviewId);
      review.remove();
      return store.save();
    })
    .then(() => res.redirect(`/stores/${req.params.id}`))
    .catch(err => res.render('error', { err }));
}

function reviewsCreateComment(req, res) {
  //a post request to /stores/:id/reviews/:reviewId/comments
  Store
    .findById(req.params.id)
    .exec()
    .then(store => {
      req.body.poster = req.currentUser.id;
      const review = store.reviews.id(req.params.reviewId);
      review.comments.push(req.body);
      return store.save();
    })
    .then(() => res.redirect(`/stores/${req.params.id}/reviews/${req.params.reviewId}`))
    .catch(err => res.render('error', { err }));

}

function reviewsDeleteComment(req, res) {
  Store
    .findById(req.params.id)
    .exec()
    .then(store => {
      req.body.poster = req.currentUser.id;
      const review = store.reviews.id(req.params.reviewId);
      const comment = review.comments.id(req.params.commentId);
      comment.remove();
      return store.save();
    })
    .then(() => res.redirect(`/stores/${req.params.id}/reviews/${req.params.reviewId}`))
    .catch(err => res.render('error', { err }));
}

module.exports = {
  show: reviewsShow,
  new: reviewsNew,
  create: reviewsCreate,
  edit: reviewsEdit,
  update: reviewsUpdate,
  delete: reviewsDelete,
  createComment: reviewsCreateComment,
  deleteComment: reviewsDeleteComment
};
