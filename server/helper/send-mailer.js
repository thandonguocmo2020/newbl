'use strict';
const nodemailer = require('nodemailer');
const config = require('../config/index');


// acount active

function sendMailActionAcount(email, html, cb) {

        // Config mail
        let transporter = nodemailer.createTransport(config.email.smtp);

        // console.log("send mail : "+email);
        // setup email data with unicode symbols
        let mailOptions = {
            from: config.email.activeAcount.sendFrom, // sender address
            to: email, // list of receivers
            subject: config.email.activeAcount.subject, // Subject line
            text: config.email.activeAcount.text, // plain text body
            html: html // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('[ERROR] Message NOT sent: '+ error);
                console.log('Send mail active has a error please contact admin fix bug.');
                cb(error,null);
            }
            // console.log('Message %s sent: %s', info.messageId, info.response);
            cb(null,'Send Email Active Success' + info.message);
        });
}


function resetPwd(email,html,cb){

    // Config mail
    let transporter = nodemailer.createTransport(config.email.smtp);

    // setup email data with unicode symbols
    let mailOptions = {
        from: config.email.resetPwd.sendFrom, // sender address
        to: email, // list of receivers
        subject: config.email.resetPwd.subject, // Subject line
        text: config.email.resetPwd.text, // plain text body
        html: html // html body
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('[ERROR] Message NOT sent : ' + err);

            cb(err,null);

        }

        cb(null,'Send Email Reset Password Success' + info.message);
    });

};


module.exports.actionAcount = sendMailActionAcount;

module.exports.resetPwd = resetPwd;