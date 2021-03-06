var express = require('express');
var router = express.Router();
var userRole =require('../controllers/userRoleController');
var gurad=require('../middlewares/checklogin')
/* GET users listing. */
router.get('/all',userRole.alluserRole);
router.get('/:id',gurad.checklogin,userRole.roleGetById);
router.post('/save',userRole.roleSave);
router.put('/update/:id',gurad.checklogin,userRole.updateRole);
router.delete('/delete/:id',gurad.checklogin,userRole.delete);


module.exports = router;
