const jwt = require("jsonwebtoken");

 exports.checklogin=(req,res,next)=>{
  const {authorization}=req.headers;

  try{
    const token=authorization.split(' ')[1];
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    const {username,email}=decode;
    req.username  = username;
    req.email=email ;
    next();
  }catch{
     next("Unauthorized! ")
  }  
}
