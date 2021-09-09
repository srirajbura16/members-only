const { body } = require('express-validator');
const User = require('./models/user');
exports.signup_validators = [
  body('username')
    .exists()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be three or more characters.'),
  body('password', 'Password name must be three or more characters.')
    .exists()
    .isLength({ min: 3 })
    .bail(),
  body('confirm-password', "Passwords don't match.")
    .exists()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
];
