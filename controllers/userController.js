const User = require('../models/user');

const passport = require('passport');
const bcrypt = require('bcryptjs');

// Login User
exports.login_get = (req, res) => {
  res.render('login');
};

exports.login_post = (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })(req, res);
};

exports.logout_post = (req, res) => {
  req.logout();
  res.redirect('/');
};

//Sign up User
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
      // res.redirect('/');
      res.render('sign-up', {
        successMsg: 'Signed up sucessfully.',
      });
    });
  });
};

//Membership access
exports.membership_get = (req, res) => {
  res.render('membership');
};

exports.membership_post = (req, res) => {
  const user = req.user;
  if (req.body.code !== process.env.member_code) {
    res.render('membership', { error: 'Wrong code, please try again.' });
  } else {
    //change user status to member
    //display success message.
    User.findByIdAndUpdate(user._id, { member: true }, (err) => {
      console.log(result);
      if (err) {
        return next(err);
      }
      res.render('membership', { successMsg: "You're a member now!" });
    });
  }
};

//Admin Access
exports.admin_get = (req, res) => {
  res.render('admin');
};
exports.admin_post = (req, res) => {
  const user = req.user;
  if (req.body.code !== process.env.admin_code) {
    res.render('admin', { error: 'Wrong code, please try again.' });
  } else {
    //change user status to admin
    //display success message.
    User.findByIdAndUpdate(user._id, { admin: true }, (err) => {
      if (err) {
        return next(err);
      }
      res.render('admin', { successMsg: "You're an Admin now!" });
    });
  }
};
