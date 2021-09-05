const Post = require('../models/post');

exports.posts = (req, res) => {
  res.render('home', { user: req.user });
};
