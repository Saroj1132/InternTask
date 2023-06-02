var express = require('express');
const { registerUser, loginUser} = require('../controller/userController');
var router = express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
module.exports = router;
