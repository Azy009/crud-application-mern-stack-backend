const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:587,
  secure:false,
  auth: {
    user: 'azy6049@gmail.com',
    pass: 'taed cqld xral ilng'
  },
});

async function sendEmail(to, subject, html) {
  try {
    const mailOptions = {
      from: 'azy6049@gmail.com',
      to: to,
      subject: subject,
      html: html
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', to);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, error: error.message };
  }
}

module.exports = sendEmail;