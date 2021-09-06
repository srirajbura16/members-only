const Post = require('../models/post');

exports.posts = (req, res) => {
  res.render('index', { user: req.user });
};

exports.create_post_get = (req, res) => {
  res.render('post');
};

exports.create_post_post = (req, res) => {
  res.render('index', { user: req.user });
};
