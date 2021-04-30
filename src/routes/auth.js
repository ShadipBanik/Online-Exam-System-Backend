var express = require('express');
var router = express.Router();
var users =require('../controllers/usersController')
var auth =require('../controllers/authController')
/* GET users listing. */
router.post('/signup',users.userSave);
router.post('/login',auth.checkAttemptsLogin);
router.post('/activate',auth.activeUser);
router.post('/forgetPassword',auth.forgetPassword)
router.post('/resetPassword',auth.resetPassword);
router.post('/googleLogin',auth.googleLogin);
module.exports = router;
