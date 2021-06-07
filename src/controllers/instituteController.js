const express = require('express');
var models=require('../models');
exports.allInstitute=async (req,res)=>{
    try{
      await models.institute.findAll().then(docs=>{
       res.send({status:200,message:"Succcess",result:docs})})
       .catch(err=> {
        res.send({status:500,message:"unable to get all institute",error:err});
    })
  }catch (err){
      console.log(err)
  } 
};
exports.instituteGetById=(req,res)=>{
    if(!req.params.id)
    return res.status(400).send(`No record with given id:${id}`)
    models.institute.findAll({
        where:{
            id:req.params.id
        },
        include:[{model:models.users,as:'users'}]
    }).then(docs=>{
        res.send({status:200,message:"Succcess",result:docs})})
        .catch(err=> {
         res.send({status:500,message:"unable get institute by ID`",error:err});
        })     
};
exports.instituteSave=(req,res)=>{
  var roleBody=new Object(req.body)
   models.institute.create(roleBody).then(result=>{
       res.send({status:200,message:"institute add Sucessfull",result:result})
   }).catch(err=>{
       res.send({status:500,message:"institute add failled",error:err})
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
