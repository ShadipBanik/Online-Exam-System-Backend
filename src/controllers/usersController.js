const express = require('express');
var models = require('../models');
const sendEmail=require('../middlewares/sendEmail');
const jwt =require('jsonwebtoken');
var bcrypt=require('bcrypt');
exports.userGet = (req, res) => {
    models.users.findAll().then(docs => {
        res.send({ status: 200, message: "Succcess", result: docs })
    })
        .catch(err => {
            res.send({ status: 500, message: "user add failled", error: err });
        })
};
exports.usersGetById = (req, res) => {
    if (!req.params.id)
        return res.status(400).send(`No record with given id:${id}`)
    models.users.findAll({
        where: {
            id: req.params.id
        }
    }).then(docs => {
        res.send({ status: 200, message: "Succcess", result: docs })
    })
        .catch(err => {
            res.send({ status: 500, message: "unable get user by ID`", error: err });
        })
};
exports.userSave = async(req, res) => {
    const hasPassword=await bcrypt.hash(req.body.password,10);
    req.body.password=hasPassword;
    var emp = new Object(req.body)
    models.users.findAll({
        where: {
            email: req.body.email
        }
    }).then(rslt => {
        if (rslt.length > 0 && toString(rslt.email) == toString(req.body.email)) {
            res.send({ status: 500, message: `${req.body.email} already exist!` })
        } else {
           
                const jwtToken=jwt.sign({
                    username:req.body.firstname,
                    email:req.body.email  
                },process.env.JWT_SECRET,{expiresIn:'10h'} )
                mailOption={
                    to: req.body.email,
                    subject:"Email verification", // Subject line
                    text: "VERIFICATION", // plain text body
                    html:`<p> Account activation link: ${process.env.CLIENT_URL}/activate/${jwtToken} <p>`
                }
                sendEmail.main(mailOption).then(rslt=>{
                    models.users.create(emp).then(result => {
                    res.send({status:200,message:"Please check your Email for verfication",result:result})
                    })
                    .catch(err => {
                       res.send({ status: 500, message: "user add failled", error: err })
                   })  
                })
                 .catch(err => {
                    res.send({ status: 500, message: "user add failled", error: err })
                })
            
        }
    })

};

exports.updateUser = (req, res) => {
    if (!req.params.id)
        return res.status(400).send(`No record with given id:${req.params.id}`)
    var emp = req.body

    models.users.update(emp,
        {
            where: {
                id: req.params.id
            }
        }).then(docs => {
            res.send({ status: 200, message: "Updated Sucessfull" })
        }).catch(err => {
            res.send({ status: 500, message: "Update Failled", error: err })
        })

};
exports.delete = (req, res) => {
    if (!req.params.id)
        return res.status(400).send(`No record with given id:${req.params.id}`)
    else {
        models.users.destroy({
            where: {
                id: req.params.id
            }
        }).then(docs => {
            res.send({ status: 200, message: "Deleted Sucessfully", result: docs })
        }).catch(err => {
            res.send({ status: 500, message: "Delete Failled", error: err })
        })
    }
};
