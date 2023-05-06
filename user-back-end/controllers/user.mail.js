const nodemailer = require("nodemailer");
const userModel = require("../models/user.model");
const sendMail = async (username, email, userid) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
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
      subject: "For Verification Mail",
      html: `<div style="display: none; font-size: 1px; color: #e53637; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> 
      We're thrilled to have you here! Get ready to dive into your new account. 
      </div> 
      <table border="0" cellpadding="0" cellspacing="0" width="100%"> <!-- LOGO --> <tr> <td bgcolor="#e53637" align="center"> 
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> 
      <tr> 
      <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> 
      </td> 
      </tr> 
     </table>
    </td> 
  </tr> 
  <tr>
   <td bgcolor="#e53637" align="center" style="padding: 0px 10px 0px 10px;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    <tr> 
      <td bgcolor="#070720" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
        <h1 style="font-size: 48px; font-weight: 400; margin: 2; color:white">Welcome to <span style="color: white"
        >Movie<span style="color: #e53637">Flix</span>
        </span>!</h1> 
        <img src="https://cdn-icons-png.flaticon.com/512/1932/1932718.png" width="125" height="120" style="display: block; border: 0px; margin : 30px 20px 20px 20px" /> 
      </td> 
    </tr> 
  </table>
  </td>
  </tr> 
    <tr> 
     <td bgcolor="#e53637" align="center" style="padding: 0px 10px 0px 10px;"> 
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"> 
    <tr>
      <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> 
        <p style="margin: 0;">Hii ${username}, Thank you for choosing MovieFlix. First, you need to confirm your account. Just press the button below.</p>
      </td> 
    </tr> 
    <tr> 
      <td bgcolor="#ffffff" align="center"> 
        <table width="100%" border="0" cellspacing="0" cellpadding="0"> 
          <tr>
            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;"> 
              <table border="0" cellspacing="0" cellpadding="0"> 
          <tr>
          <td align="center" style="border-radius: 20px;" bgcolor="#e53637"> <a href="http://localhost:3000/user/verify?id=${userid}"  target="_blank" style="font-size: 20px; width:200px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 20px; border: 1px solid #FFA73B; display: inline-block;">
            Confirm Account</a>
      </td>
    </tr>  
    </table>

    <!-- admin invite-->
    <tr>
    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> 
      <p style="margin: 0;">Hii ${username}, Thank you for choosing MovieFlix. You have a apportunity for admin. But, If you are admin then you have not user access. So if you want to work as admin. Just press the button below.</p>
    </td> 
  </tr> 
  <tr> 
    <td bgcolor="#ffffff" align="left"> 
      <table width="100%" border="0" cellspacing="0" cellpadding="0"> 
        <tr>
          <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;"> 
            <table border="0" cellspacing="0" cellpadding="0"> 
        <tr>
        <td align="center" style="border-radius: 20px;" bgcolor="#e53637"> <a href="http://localhost:3000/user/invite?id=${userid}"  target="_blank" style="font-size: 20px; width:200px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 20px; border: 1px solid #FFA73B; display: inline-block;">
          Confirm Admin</a>
    </td>
  </tr>  
  </table>
  </td> 
</tr> 
</table>
</td> 
</tr>
<tr>
  <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> 
    <p style="margin: 0;">This is an auto-generated email. 
    Please <b>do not</b> reply to this email.</p>
 </td> 
</tr> 
<tr>
 <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;"> <p style="margin: 0;">Cheers,<br>MovieFlix Team</p></td> 
</tr> 
</table>
</td> 
</tr> 
<tr> 
<td bgcolor="#e53637" align="center" style="padding: 30px 10px 0px 10px;"> 
</tr> 
</table> `,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).send(err);
        // console.log(err);
      } else {
        res.status(200).send("For verification email has been sent");
        // console.log("Email has been send", info.response);
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
    // console.log(isVerified);
    res.render("email-verify");
} catch (err) {
    res.status(500).json({
      message: "Error occurs when email verification",
      err,
    });
    // console.log("Error occurs when email verification " + err);
  }
};

const emailInvitation = async (req, res) => {
  try {
    const isVerified = await userModel.updateOne(
      { _id: req.query.id },
      { $set: { isadmin: 1 } }
    );
    // console.log(isVerified);
    res.render("email-invite");
  } catch (err) {
    res.status(500).json({
      message: "Error occurs when email verification",
      err,
    });
    // console.log("Error occurs when email verification " + err);
  }
};
module.exports = { sendMail, emailVerification , emailInvitation };
