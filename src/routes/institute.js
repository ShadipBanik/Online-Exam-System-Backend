var express = require('express');
var router = express.Router();
var instituts =require('../controllers/instituteController');
var gurad=require('../middlewares/checklogin')
/* GET users listing. */
router.get('/all',instituts.allInstitute);
router.post('/add',gurad.checklogin,instituts.allInstitute)



module.exports = router;
