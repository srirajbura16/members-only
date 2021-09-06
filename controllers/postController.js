const Post = require('../models/post');

exports.posts = (req, res) => {
  res.render('index', { user: req.user });
};
