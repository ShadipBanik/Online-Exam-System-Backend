const jwt = require("jsonwebtoken");
var models = require('../models');
let userRole;
 exports.checklogin=(req,res,next)=>{
  const {authorization}=req.headers;
  try{
    const token=authorization.split(' ')[1];
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    const {username,email}=decode;
    userRole = models.users.findAll({ include: [{ model: models.role, as: 'role' }], where: { email:email } }).then(rslt => {
      return rslt[0].role;
    })
    req.username  = username;
    req.email=email ;
    next();
  }catch{
     next("Unauthorized! ")
  }  
}
exports.roleCheck=function(admin,student,teacher,institute){
  return (req,res,next)=>{
    if(userRole.name==admin || userRole.name== student || userRole.name == teacher || userRole.name== institute){
      next();
    }else{
      next("Unauthorized!")
    }
 }
}