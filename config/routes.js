const router = require('express').Router();

const stores = require('../controllers/stores');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

//HOME
router.get('/', (req, res) => res.render('home'));

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

module.exports = router;
