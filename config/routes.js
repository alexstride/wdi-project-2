const router = require('express').Router();

const stores = require('../controllers/stores');
const registrations = require('../controllers/registrations');

const sendText = (text) => (req, res) => res.send(text);

//HOME
router.get('/', (req, res) => res.render('home'));

//INDEX
router.route('/stores')
  .get(stores.index)
  .post(stores.create);

router.route('/stores/new')
  .get(stores.new);

router.route('/stores/:id')
  .get(stores.show)
  .put(stores.update)
  .delete(stores.delete);

router.route('/stores/:id/edit')
  .get(stores.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

module.exports = router;
