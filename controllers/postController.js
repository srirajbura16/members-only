const Post = require('../models/post');

exports.posts = (req, res, next) => {
  res.render('index', { user: req.user });
};

exports.post_create_get = (req, res, next) => {
  res.render('post_create');
};

exports.post_create_post = (req, res, next) => {
  const post = new Post({
    user: req.user._id,
    title: req.body.title,
    message: req.body.message,
  }).save((err) => {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
};
