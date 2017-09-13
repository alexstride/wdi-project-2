const User = require('../models/user');

function registrationsNew(req, res) {
  res.render('registrations/new');
}

function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}! Please login.`);
      res.redirect('/');
    })
    .catch(err => res.render('error', { err }));
}

function registrationsShow(req, res) {
  //for a request at /profiles/:id
  if (req.currentUser && req.currentUser.id === req.params.id) {
    try {
      res.render('registrations/show', {user: req.currentUser});//This should cause problems if the syntax inside the curly braces isn't correct
    } catch (err) {
      res.render('error', { err });
    }
  } else {
    User
      .findById(req.params.id)
      .exec()
      .then(user => res.render('registrations/show', { user }))
      .catch(err => res.render('error', { err }));
  }
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate,
  show: registrationsShow
};
