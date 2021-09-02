var express = require('express');
var router = express.Router();

//Controller Modules
const post_controller = require('../controllers/postController');

//Will be able to view without signing in.
router.get('/', post_controller.posts);

router.get('/sign-up');

router.get('/login');

//After login
router.get('/membership');

router.get('/adminaccess');

module.exports = router;
