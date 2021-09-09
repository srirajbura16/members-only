const { body, validationResult } = require('express-validator');
const User = require('./models/user');
exports.signup_validators = [
  body('username')
    .exists()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be three or more characters.'),
  // .custom((value) => {
  //   User.findOne({ username: value }, (err, user) => {
  //     console.log(value, user);
  //     if (user) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // })
  // .withMessage('username already exists'),
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
