const User = require('../models/user');
const signup_validators = require('../validators').signup_validators;

const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');
const { checkAuthentication, checkUsernameTaken } = require('../helpers');

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

// JWT Strategy
// exports.login_post = (req, res) => {
//   passport.authenticate('local', { session: false }, (err, user) => {
//     if (err || !user) {
//       return res
//         .status(400)
//         .render('login', { msg: 'Login failed. Please try again.' });
//     }

//     req.login(user, { session: false }, (err) => {
//       if (err) {
//         res.send(err);
//       }

//       // generate a signed son web token with the contents of user object and return it in the response

//       const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
//       // res.header('Authorization', 'Bearer ' + token);
//       return res.render('login', { msg: 'Logged in successfully.', token });
//     });
//   })(req, res);
// };

exports.logout_post = (req, res) => {
  req.logout();
  res.redirect('/');
};

//Sign up User
exports.signup_get = (req, res) => {
  res.render('sign-up');
};

exports.signup_post = [
  signup_validators,
  checkUsernameTaken,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('sign-up', { errors: errors.array() });
      return;
    }

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
  },
];

//Membership access
exports.membership_get = [
  checkAuthentication,
  (req, res) => {
    res.render('membership');
  },
];

exports.membership_post = [
  checkAuthentication,
  (req, res) => {
    const user = req.user;
    if (req.body.code !== process.env.member_code) {
      res.render('membership', { error: 'Wrong code, please try again.' });
    } else {
      //change user status to member
      //display success message.
      User.findByIdAndUpdate(user._id, { member: true }, (err) => {
        if (err) {
          return next(err);
        }
        res.render('membership', { successMsg: "You're a member now!" });
      });
    }
  },
];

//Admin Access
exports.admin_get = [
  checkAuthentication,
  (req, res) => {
    res.render('admin');
  },
];

exports.admin_post = [
  checkAuthentication,
  (req, res) => {
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
  },
];
