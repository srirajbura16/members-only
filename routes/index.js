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

//login logout page
router.get('/login', user_controller.login_get);
router.post('/login', user_controller.login_post);
router.get('/logout', user_controller.logout_post);

//After login
// router.get('/membership');
// router.get('/adminaccess');

module.exports = router;
