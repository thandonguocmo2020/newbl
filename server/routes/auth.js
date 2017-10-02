var Member = require('../model/member'),
    Hash = require('mix-hash'),
    jwt = require('jsonwebtoken'),
    Joi = require('joi'),
    config = require('../config/index');
const nodemailer = require('nodemailer');

var sendMail = require('./../helper/send-mailer');

var jwtSecret = config.secret;

module.exports = [{
    method: 'POST',
    path: '/auth/login',
    handler: function (request, reply) {

        if (!request.payload.mail || !request.payload.pwd) {
            reply({ msg: 'Missing email or password', stt: 0 });
        } else {
            var _pwd = Hash.sha256(request.payload.pwd);
            var _uid = request.payload.mail;

            Member.findOne({ mail: _uid, pwd: _pwd }, {
                _id: 1,
                uid: 1,
                mail: 1,
                fn: 1,
                img: 1,
            }, (err, doc) => {
                if (err || !doc) {
                    return reply({ stt: 0, message: 'Invalid username or password' });
                } else {
                    var token = jwt.sign(doc, jwtSecret, { expiresIn: '10h' });
                    reply({ stt: 1, message: "Welcome u come back", token: token });
                }
            });
        }
    }
},
{
    method: 'POST',
    path: '/auth/info',
    handler: function (request, reply) {

        let token = request.payload.token;

        var decoded = jwt.verify(token, jwtSecret, function (err, decoded) {

            if (!decoded) {
                reply({ stt: 0, message: "Please sign in again" });
            } else {
                reply({ stt: 1, data: decoded._doc });
            }

        });
    }
},
{
    method: 'GET',
    path: '/auth/logout',
    handler: function (request, reply) {
        reply("login");
    }
},
{
    method: 'post',
    path: '/auth/register',
    handler: function (request, reply) {

        var data = request.payload;

        data.pwd = Hash.sha256(request.payload.pwd);
        data.uid = request.payload.mail;

        Member.findOne({ 'mail': request.payload.mail }, (err, doc) => {

            if (doc) {
                return reply({ success: 0, message: "Email has been registered" });
            } else {


                Member.create(data, function (err, member) {

                    if (err || !member) {
                        reply({ success: 0, message: "Not create member with info enter." });
                    }

                    if (member) {

                        reply({
                            success: 1,
                            message: "Register Success",
                            data: member
                        });
                    }
                });
            }
        });
    },
},
{
    method: 'post',
    path: '/auth/change-pwd',
    handler: function (request, reply) {

        if (request.payload.reset) {
            let userId = request.payload._id;
            let newPwd = Hash.sha256(request.payload.new_pwd);

            Member.findByIdAndUpdate(userId, { $set: { pwd: newPwd } }, { new: true }, (err, doc) => {

                if (err) {
                    throw err;
                    return;
                }

                if (doc) {
                    reply({ stt: 1, message: "update password success", _data: doc });
                } else {
                    reply({ stt: 0, message: "Uid not match" });
                }
            })

        } else {
            let userId = request.payload._id;
            let pwd = Hash.sha256(request.payload.pwd);
            let newPwd = Hash.sha256(request.payload.new_pwd);

            Member.findOne({ _id: userId, pwd: pwd }, (err, doc) => {

                if (err) {
                    console.log(err);
                }

                if (doc) {
                    doc.pwd = newPwd;
                    doc.save((err, doc) => {
                        if (err) {
                            throw err;
                            return;
                        }

                        if (doc) {
                            reply({ stt: 1, message: "update password success", _data: doc });
                        }
                    });
                } else {
                    reply({ stt: 0, message: "Old password does not match" });
                }

            })
        }


    }
},
{
    method: 'POST',
    path: '/send-mail-pwd',
    handler: (req, reply) => {

        Member.findOne({ 'mail': req.payload.email }, (err, doc) => {
            if (err) reply({ msg: err.message })

            if (!_.isNull(doc)) {

                let template = fs.readFileSync('./public/email-welcome.html').toString();

                let data = {
                    host: config.host,
                    site: config.site,
                    uid: doc._id
                }

                let html = Mustache.to_html(template, data);

                let emailPwd = Mustache.render(template, data);

                sendMail.resetPwd(doc.mail, emailPwd, function (err, res) {
                    if (err) {
                        reply(err);
                    }
                    reply({ stt: 1, msg: "Check mail to reset password" });
                });

            } else {
                reply({ stt: 0, msg: 'Email not matching accounts' });
            }
        });

    }
},

{
    method: 'post',
    path: '/auth/update',
    handler: function (request, reply) {

        let userId = request.payload._id;
        console.log(userId);
        Member.findByIdAndUpdate(userId, { $set: request.payload }, { new: true }, (err, doc) => {

            if (err) {
                throw err;
                return;
            }

            if (doc) {
                reply({ stt: 1, message: "update info member", _data: doc });
            }
        })

    }
}]