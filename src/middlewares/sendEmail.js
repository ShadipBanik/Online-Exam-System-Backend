const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.main = async (req, res) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    try {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.EMAIL_PASS, // generated ethereal password
            },
        });

        const mailOption = {
            from: `"ONLINE EXAM SYSTEM 👻" <${process.env.EMAIL}>`, // sender address
            to: req.to,
            subject: req.subject, // Subject line
            text: "hello", // plain text body
            html: req.html, // html body
        }
        
        transporter.sendMail(mailOption, function (err, info) {
            if (err) {
                return err
            } else {
                return info.response;
            }
        })
    } catch {
         return 'somethong worng'
    }
}