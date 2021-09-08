const { body, validationResult } = require('express-validator');
const User = require('./models/user');
exports.signup_validators = [
  body('username')
    .exists()
    .trim()
    .isLength({ min: 3 })
    .withMessage('User name must be three or more characters.')
    .custom((username) => {
      User.find({ username: username }, (err, user) => {
        if (user) {
          return false;
        }
        return true;
      });
    })
    .withMessage('Username is already taken')
    .bail(),
  body('password', 'Password name must be three or more characters.')
    .exists()
    .isLength({ min: 3 })
    .bail(),
  body('confirm-password')
    .exists()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage('Passwords must match'),
];
