const nodemailer = require('nodemailer');

const validateContactInput = require('../validation/contact');

exports.postEmail = (req, res, next) => {
  const { errors, isValid } = validateContactInput(req.body);
  if (!isValid) {
    return res.status(422).json(errors);
  }

  "use strict";
  async function main(){
  
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let account = await nodemailer.createTestAccount();
  
    const htmlEmail = `
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
      </ul>
      <h3>Your Message</h3>
      <p>${req.body.message}</p>
      
      <p>Dear ${req.body.name},</p>

      <p class="default-style">Thank you for your message. I will contact you at my earliest convenience.</p>
      <p class="default-style">Bedankt voor uw bericht. Ik zal zo spoedig contact met u opnemen.</p>
      
      <p class="default-style"><span style="font-size: 10pt; font-family: helvetica;">Kind regards, / Met vriendelijke groet,<br /></span></p>
      <p class="default-style"><span style="font-size: 10pt; font-family: helvetica;">Noerani Samsoedien</span></p>
      <div class="default-style"><span style="font-size: 7pt; font-family: helvetica;">--</span></div>
      <div class="default-style"><span style="font-size: 7pt; font-family: helvetica;">ir. N. Samsoedien</span></div>
      <div class="default-style"><span style="font-size: 7pt; font-family: helvetica;">Industrial Designer</span> <span style="font-size: 7pt; font-family: helvetica;"> </span></div>
      <div class="default-style"> </div>
      <div class="default-style"><span style="font-size: 7pt; font-family: helvetica;">T: +31 (0)6 308 378 22</span></div>
      <div class="default-style"><span style="font-size: 7pt; font-family: helvetica;">E: <a href="mailto:contact@samsoedien.com">contact@samsoedien.com</a></span></div>
      <div class="default-style"><span style="font-size: 7pt; font-family: helvetica;">W: <a href="https://www.samsoedien.com">https://www.samsoedien.com</a></span></div>
      <div class="default-style"><span style="font-size: 7pt; font-family: helvetica;">L: <a href="https://www.linkedin.com/in/samsoedien/">https://www.linkedin.com/in/samsoedien/</a></span></div>
    `

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.TRANSPORTER_HOST,
      port: process.env.TRANSPORTER_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.TRANSPORTER_USERNAME, //account.user, // generated ethereal user
        pass: process.env.TRANSPORTER_PASSWORD, //account.pass // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      } 
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Samsoedien, N" <contact@samsoedien.com>', // sender address
      to: req.body.email, // list of receivers
      cc: 'contact@samsoedien.com',
      replyTo: req.body.email,
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
      html: htmlEmail // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)
  
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return res.status(201).json({ confirmation: true })
  }
  main().catch(console.error);
};