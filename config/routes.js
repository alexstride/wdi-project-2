const router = require('express').Router();

const stores = require('../controllers/stores');

const sendText = (text) => (req, res) => res.send(text);

//HOME
router.get('/', sendText('HOME'));

//INDEX
router.route('/stores')
  .get(stores.index)
  .post(stores.create);

router.route('/stores/new')
  .get(stores.new);

router.route('/stores/:id')
  .get(stores.show)
  .put(stores.update)
  .delete(sendText('DELETE'));

router.route('/stores/:id/edit')
  .get(stores.edit);


module.exports = router;
