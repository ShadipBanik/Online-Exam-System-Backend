var express = require('express');
var router = express.Router();
var users =require('../controllers/usersController')
var auth =require('../controllers/authController')
/* GET users listing. */
router.post('/signup',users.userSave);
router.post('/login',auth.userLogin)

module.exports = router;
