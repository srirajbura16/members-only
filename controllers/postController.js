const Post = require('../models/post');

exports.posts = (req, res) => {
  res.render('index', { user: req.user });
};

exports.post_create_get = (req, res) => {
  res.render('post');
};

exports.post_create_post = (req, res) => {
  res.render('index', { user: req.user });
};
