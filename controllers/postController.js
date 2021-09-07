const Post = require('../models/post');

exports.posts = (req, res, next) => {
  Post.find()
    .populate('user')
    .exec((err, posts) => {
      if (err) {
        return next(err);
      }

      res.render('index', { posts: posts });
    });
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
