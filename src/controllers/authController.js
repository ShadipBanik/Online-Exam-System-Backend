const express = require('express');
var models = require('../models');
var act = require('../models/login_activity');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { main } = require('../middlewares/sendEmail');
const { OAuth2Client } = require('google-auth-library')
const requestIp = require('request-ip');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.userLogin = async (req, res) => {
    const user = await models.users.findAll({ where: { email: req.body.email } }).then(rslt => {
        return rslt
    })
    const loginAttemptUser = await models.Login_activity.findAll({ where: { email: req.body.email } }).then(rslt => {
        return rslt
    })
    if (user && user.length > 0) {
        const isValidePassword = await bcrypt.compare(req.body.password, user[0].password)

        if (isValidePassword && user[0].status == 'ACTIVATED') {
            const jwtToken = jwt.sign({
                username: user[0].firstname,
                email: user[0].email
            }, process.env.JWT_SECRET, { expiresIn: '10h' })

            res.send({ status: 200, access_token: jwtToken, message: "Login Succesful!", user: {username:user[0].firstname, userEmail: user[0].email, roleName: user[0].roleId } })
        } else {
            if (!loginAttemptUser.length > 0 && loginAttemptUser[0].loginAttemptCount == null) {
                let loginAttempts = new Object({
                    email: req.body.email,
                    loginAttemptCount: 1,
                    lastRryDateTime: Date.now(),
                })
                await models.Login_activity.create(loginAttempts);
            } else {
                console.log(loginAttemptUser[0].loginAttemptCount);
                await models.Login_activity.update({ loginAttemptCount: (loginAttemptUser[0].loginAttemptCount + 1), lastRryDateTime: Date.now() }, { where: { email: req.body.email } });
            }
            res.send({ status: 500, message: "Authentication Failled!" })

        }

    } else {
        res.send({ status: 400, message: "user not found" })
    }
}
exports.checkAttemptsLogin = async (req, res) => {
    const ip=req.ip
    console.log(ip)
    try {
        const loginAttemptUser = await models.Login_activity.findAll({ where: { email: req.body.email } }).then(rslt => {
            return rslt
        })
        if (loginAttemptUser.length>0 && loginAttemptUser[0].loginAttemptCount == 3) {
            let currentTime = new Date() - loginAttemptUser[0].lastRryDateTime;
            var min = Math.round(((currentTime % 86400000) % 3600000) / 60000);
            if (min > 10) {
                await models.Login_activity.update({ loginAttemptCount: 0 }, { where: { email: req.body.email } });
                this.userLogin(req,res);
            } else {
                res.send({ status: "500", message: `This user blocked for 10 minute. ${min} minute left` })
            }
        } else {
            this.userLogin(req, res);
        }
    } catch (err) {
        console.log(err)
    }
}
exports.activeUser = (req, res) => {
    const { token } = req.body;
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const { username, email } = decode;
        if (decode) {
            models.users.update({ status: 'ACTIVATED' },
                {
                    where: {
                        email: email
                    }
                }).then(docs => {
                    res.send({ status: 200, message: "user activated", result: docs })
                }).catch(err => {
                    res.send({ status: 500, message: "user activation failled", error: err })
                })

        } else {
            res.send({ status: 500, message: "invalid or expired token " })
        }
    } catch (err) {
        res.send({ status: 500, message: "invalid or expired token", error: err.message })
    }
}
exports.forgetPassword = async (req, res) => {
    const user = await models.users.findAll({ where: { email: req.body.email } }).then(rslt => {
        return rslt
    })

    if (user) {
        mailOption = {
            to: req.body.email,
            subject: "Forget Password", // Subject line
            text: "forget password", // plain text body
            html: `<p> Reset password link: ${process.env.CLIENT_URL}/resetPassword/${req.body.email} <p>`
        }
        main(mailOption).then(rslt => {
            res.send({ status: 200, message: "send forget password link to your email", info: rslt })
        }).catch(err => {
            res.send({ status: 500, message: "forget password failled", error: err })
        })
    } else {
        res.send({ status: 400, message: "invalid email" })
    }
}

exports.resetPassword = async (req, res) => {
    const hasPassword = await bcrypt.hash(req.body.new_password, 10);
    const user = await models.users.findAll({ where: { email: req.body.email } }).then(rslt => {
        return rslt
    })

    if (user) {
        models.users.update({ password: hasPassword }, {
            where: {
                email: req.body.email
            }
        }).then(docs => {
            res.send({ status: 200, message: "Reset Password Successfully", result: docs });
        }).catch(err => {
            res.send({ status: 500, message: "reset password failled", error: err })
        })
    } else {
        res.send({ status: 400, message: "user not found or email invalid" })
    }
}

exports.googleLogin = (req, res) => {
    const { tokenId } = req.body;

    googleClient.verifyIdToken({ idToken: tokenId, audience: `${process.env.GOOGLE_CLIENT_ID}` }).then(async response => {
        const { email_verified, email, given_name, family_name } = response.payload;

        if (email_verified) {
            console.log(email_verified);
            const user = await models.users.findAll({ where: { email: email } }).then(rslt => {
                return rslt
            });

            if (user && user.length > 0) {
                const jwtToken = jwt.sign({ username: user[0].firstname, email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '10h' })
                res.send({ status: 200, message: "Login Succesfully", access_token: jwtToken, user: {username:user[0].firstname ,email: user[0].email, roleId: user[0].roleId } })
            } else {
                const password = given_name + process.env.JWT_SECRET + family_name;
                const hasPassword = await bcrypt.hash(password, 10);
                const newUser = new Object({
                    firstname: given_name,
                    lastname: family_name,
                    email: email,
                    password: hasPassword,
                    roleId: 1,
                    status: 'ACTIVATED',
                });
                models.users.create(newUser).then(docs => {
                    const jwtToken = jwt.sign({ username: docs.firstname, email: docs.email }, process.env.JWT_SECRET, { expiresIn: '10h' });
                    res.send({ status: 200, message: "registration succesfull", access_token: jwtToken, user: {username:docs.firstname,email: docs.email, roleId: docs.roleId } })
                }).catch(err => {
                    res.send({ status: 500, message: "registration not successful", error: err })
                })

            }

        } else {
            res.send({ status: 400, message: "email not verfied" })
        }
    }).catch(err => {
        res.send({ status: 500, message: "somthing wrong...", error: err })
    })
}