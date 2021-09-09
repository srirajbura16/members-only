const Post = require('../models/post');
const formatDistanceToNow = require('date-fns/formatDistanceToNow');
const { checkAuthentication } = require('../helpers');

exports.posts = (req, res, next) => {
  Post.find()
    .populate('user')
    .exec((err, posts) => {
      if (err) {
        return next(err);
      }

      res.render('index', { posts: posts, formatDistanceToNow });
    });
};

exports.post_create_get = [
  checkAuthentication,
  (req, res, next) => {
    res.render('post_create');
  },
];

exports.post_create_post = [
  checkAuthentication,
  (req, res, next) => {
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
  },
];
