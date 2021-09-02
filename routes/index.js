var express = require('express');
var router = express.Router();

//Controller Modules
const post_controller = require('../controllers/postController');
const user_controller = require('../controllers/userController');

//Will be able to view without signing in.
router.get('/', post_controller.posts);

router.get('/sign-up', user_controller.signup);

router.get('/login', user_controller.login);

//After login
router.get('/membership');

router.get('/adminaccess');

module.exports = router;
