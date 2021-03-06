const router = require('express').Router();

const stores = require('../controllers/stores');
const registrations = require('../controllers/registrations');
const reviews = require('../controllers/reviews');

const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

//HOME
router.get('/', (req, res) => res.render('home', { isHomepage: true }));

//INDEX
router.route('/stores')
  .get(stores.index)
  .post(secureRoute, stores.create);

router.route('/stores/new')
  .get(stores.new);

router.route('/stores/:id')
  .get(stores.show)
  .put(secureRoute, stores.update)
  .delete(secureRoute, stores.delete);

router.route('/stores/:id/edit')
  .get(secureRoute, stores.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/stores/:id/reviews')
  .post(secureRoute, reviews.create);

router.route('/stores/:id/reviews/new')
  .get(secureRoute, reviews.new);

router.route('/stores/:id/reviews/:reviewId')
  .get(reviews.show)
  .put(reviews.update)
  .delete(reviews.delete);

router.route('/stores/:id/reviews/:reviewId/edit')
  .get(secureRoute, reviews.edit); ///MAKE THIS INTO A SECURE ROUTE AFTER TESTING!!

router.route('/stores/:id/reviews/:reviewId/comments')
  .post(secureRoute, reviews.createComment);

router.route('/stores/:id/reviews/:reviewId/comments/:commentId')
  .delete(secureRoute, reviews.deleteComment);

router.route('/profiles/:id')
  .get(registrations.show)
  .put(registrations.update);


module.exports = router;
