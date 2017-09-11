const Store = require('../models/store.js');

function storesIndex(req, res) {
  Store
    .find()
    .exec()
    .then(stores => {
      res.render('stores/index', { stores });
    });
}

function storesShow(req, res) {
  Store
    .findById(req.params.id)
    .populate('reviews.user')
    .exec()
    .then(store => {
      console.log(store);
      if(!store) res.render('error', {err: 'Could not find the record you are looking for'});
      res.render('stores/show', { store });
    })
    .catch(err => res.render('error', { err }));
}

function storesNew(req, res) {
  res.render('stores/new');
}

function storesCreate(req, res) {
  Store
    .create(req.body)
    .then(() => res.redirect('/stores'))
    .catch(err => res.render('error', { err }));
}

function storesEdit(req, res) {
  Store
    .findById(req.params.id)
    .exec()
    .then(store => res.render('stores/edit', { store }))
    .catch(err => res.render('error', { err }));
}

function storesUpdate(req, res) {
  Store
    .findById(req.params.id)
    .exec()
    .then(store => {
      store = Object.assign(store, req.body);
      return store.save();
    })
    .then(store => res.redirect(`/stores/${store.id}`))
    .catch(err => res.render('error', { err }));
}

function storesDelete(req, res) {
  Store
    .findById(req.params.id)
    .exec()
    .then(store => store.remove())
    .then(() => res.redirect('/stores'))
    .catch(err => res.render('error', { err }));
}

module.exports = {
  index: storesIndex,
  show: storesShow,
  new: storesNew,
  create: storesCreate,
  edit: storesEdit,
  update: storesUpdate,
  delete: storesDelete
};
