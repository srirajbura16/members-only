const User = require('./models/user');

exports.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

exports.checkUsernameTaken = (req, res, next) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (user) {
      res.render('sign-up', { errors: [{ msg: 'Username already taken' }] });
      return;
    } else {
      next();
    }
  });
};
