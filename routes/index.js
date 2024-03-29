var express = require('express');
var router = express.Router();

//Controller Modules
const post_controller = require('../controllers/postController');
const user_controller = require('../controllers/userController');

//home page
router.get('/', post_controller.posts);

//sign-up page
router.get('/sign-up', user_controller.signup_get);
router.post('/sign-up', user_controller.signup_post);

//login logout
router.get('/login', user_controller.login_get);
router.post('/login', user_controller.login_post);
router.get('/logout', user_controller.logout_post);

//After login
//post
router.get('/post', post_controller.post_create_get);
router.post('/post', post_controller.post_create_post);

//member
router.get('/membership', user_controller.membership_get);
router.post('/membership', user_controller.membership_post);

//admin
router.get('/admin', user_controller.admin_get);
router.post('/admin', user_controller.admin_post);

module.exports = router;
