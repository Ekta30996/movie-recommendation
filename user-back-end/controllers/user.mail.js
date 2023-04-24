const nodemailer = require('nodemailer');
const userModel = require('../models/user.model');
const sendMail = async (username, email, userid) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'For Verification Mail',
      html: `<p>Hii ${username}</p> ,
            <p> please click here to <a href=http://localhost:3000/user/verify?id=${userid}> Verify </a> your mail.</p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send('For verification email has been sent');
        console.log('Email has been send', info.response);
      }
    });
  } catch (err) {}
};

const emailVerification = async (req, res) => {
  try {
    const isVerified = await userModel.updateOne(
      { _id: req.query.id },
      { $set: { isverified: 1 } }
    );
    console.log(isVerified);
    res.render('email-verify');
  } catch (err) {
    res.status(500).json({
      message: 'Error occurs when email verification',
      err,
    });
    console.log('Error occurs when email verification ' + err);
  }
};

module.exports = { sendMail, emailVerification };
