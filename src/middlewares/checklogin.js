const jwt = require("jsonwebtoken");

 exports.checklogin=(req,res,next)=>{
  const {authorization}=req.headers;

  try{
    const token=authorization.split(' ')[1];
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    const {username,userId}=decode;
    req.username  = username;
    req.userId=userId;
    next();
  }catch{
     next("Unauthorized! ")
  }  
}
