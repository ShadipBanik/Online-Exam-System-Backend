const express = require('express');
var models=require('../models');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

exports.userLogin= async(req,res)=>{
 const user=await models.users.findAll({where:{email:req.body.email}}).then(rslt=>{
     return rslt
 })
    if(user && user.length>0){
        const isValidePassword= await bcrypt.compare(req.body.password,user[0].password)
        
        if(isValidePassword){
           const jwtToken=jwt.sign({
               username:user[0].username,
               email:user[0].email  
           },process.env.JWT_SECRET,{expiresIn:'10h'} )

           res.send({status:200,access_token:jwtToken,message:"Login Succesful!"})
        }else{
            res.send({status:500,message:"Authentication Failled!"})
        }
        
    }else{
        res.send({status:400,message:"user not found"})
    }
}
