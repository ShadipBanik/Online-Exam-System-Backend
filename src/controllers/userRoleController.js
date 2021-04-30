const express = require('express');
var models=require('../models');
exports.alluserRole=(req,res)=>{
   models.role.findAll().then(docs=>{
       res.send({status:200,message:"Succcess",result:docs})})
       .catch(err=> {
        res.send({status:500,message:"unable to get all user roles",error:err});
    })
};
exports.roleGetById=(req,res)=>{
    if(!req.params.id)
    return res.status(400).send(`No record with given id:${id}`)
    models.role.findAll({
        where:{
            id:req.params.id
        }
    }).then(docs=>{
        res.send({status:200,message:"Succcess",result:docs})})
        .catch(err=> {
         res.send({status:500,message:"unable get user by ID`",error:err});
        })     
};
exports.roleSave=(req,res)=>{
  var roleBody=new Object(req.body)
   models.role.create(roleBody).then(result=>{
       res.send({status:200,message:"user add Sucessfull",result:result})
   }).catch(err=>{
       res.send({status:500,message:"user add failled",error:err})
   })
};

exports.updateRole=(req,res)=>{
    if(!req.params.id)
    return res.status(400).send(`No record with given id:${req.params.id}`)
    var roleBody=req.body

    models.role.update(roleBody,
        {
            where:{
                id:req.params.id
            }
        }).then(docs=>{
            res.send({status:200,message:"Updated Sucessfull"})
        }).catch(err=>{
            res.send({status:500,message:"Update Failled",error:err})
        })

};
exports.delete=(req,res)=>{
    if(!req.params.id)
    return res.status(400).send(`No record with given id:${req.params.id}`)
    models.role.destroy({
        where:{
            id:req.params.id
        }
    }).then(docs=>{
        res.send({status:200,message:"Deleted Sucessfully",result:docs})
    })
};
