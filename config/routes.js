const router = require('express').Router();

const stores = require('../controllers/stores');

const sendText = (text) => (req, res) => res.send(text);

//HOME
router.get('/', sendText('HOME'));

//INDEX
router.route('/stores')
  .get(stores.index)
  .post(sendText('CREATE'));

router.route('/stores/new')
  .get(sendText('NEW'));

router.route('/stores/:id')
  .get(sendText('SHOW'))
  .put(sendText('UPDATE'))
  .delete(sendText('DELETE'));

router.route('/stores/:id/edit')
  .get(sendText('EDIT'));


module.exports = router;
