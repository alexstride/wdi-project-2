const User = require('../models/user');
const Store = require('../models/store');

//Of the form /stores/:id/comments/:commentId
function reviewsShow(req, res) {
  Store
    .findById(req.params.id)
    .populate('reviews.user')
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

module.exports = {
  show: reviewsShow,
  new: reviewsNew,
  create: reviewsCreate,
  edit: reviewsEdit
};