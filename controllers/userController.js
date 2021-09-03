const User = require('../models/user');

exports.login_get = (req, res) => {
  res.send('NOT IMPLEMENTED: login page GET');
};
exports.login_post = (req, res) => {
  res.send('NOT IMPLEMENTED: login page POST');
};

exports.signup_get = (req, res) => {
  // res.send('NOT IMPLEMENTED: sign-up page GET');
  res.render('sign-up', { user: 'user' });
};

exports.signup_post = (req, res) => {
  res.send('NOT IMPLEMENTED: sign-up page POST');
};
