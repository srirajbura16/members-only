var express = require('express');
var router = express.Router();

//Controller Modules
const post_controller = require('../controllers/postController');

// router.get('/:id', post_controller.post_get);

// //delete post
router.get('/:id/delete', post_controller.post_delete_get);
router.post('/:id/delete', post_controller.post_delete_post);

module.exports = router;
