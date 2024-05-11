// mailer.js

const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "bv.abishek@gmail.com",
      pass: "nFfYb8vS3XwxKjUT",
    },
  });

module.exports = {
  sendPasswordEmail: async function (userEmail, password) {
    console.log(userEmail);
    try {
      let info = await transporter.sendMail({
        from: 'bv.abishek@gmail.com',
        to: userEmail,
        subject: 'Login Credentials',
        text: `Congrats you are successfully onboarded as employee, Here is your credentials email:${userEmail} password:${password}`,
      });

      console.log('Message sent: %s', info.messageId);
    } catch (err) {
      console.error('Error occurred while sending email:', err);
    }
  },
};
