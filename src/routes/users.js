var express = require('express');
var router = express.Router();
var users =require('../controllers/usersController');
const guard=require('../middlewares/checklogin')
/* GET users listing. */
router.route('/all').get(guard.checklogin,users.userGet);
router.get('/:id',guard.checklogin,users.usersGetById);
router.post('/save',guard.checklogin,users.userSave); 
router.put('/update/:id',guard.checklogin,users.updateUser);
router.delete('/delete/:id',guard.checklogin,users.delete);

module.exports = router;
