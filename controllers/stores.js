const Store = require('../models/store.js');

function storesIndex(req, res) {
  Store
    .find()
    .exec()
    .then(stores => {
      res.render('stores/index', { stores });
    });
}

module.exports = {
  index: storesIndex
};
