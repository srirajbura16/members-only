const User = require('../models/user');

const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.login_get = (req, res) => {
  res.render('login');
};

exports.login_post = (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  });
};

exports.signup_get = (req, res) => {
  res.render('sign-up');
};

exports.signup_post = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    // if err, do something
    if (err) {
      return next(err);
    }
    // otherwise, store hashedPassword in DB
    new User({
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
};
