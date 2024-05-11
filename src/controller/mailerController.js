// controller.js

const mailer = require("../model/mailer.model")

// Assuming you have a route that handles sending passwords
exports.postmailer = async (req, res) => {
  const { userEmail, password } = req.body;

  try {
    // Send the password email
    await mailer.sendPasswordEmail(userEmail, password);

    res.status(200).send('Password sent successfully');
  } catch (err) {
    console.error('Error sending password email:', err);
    res.status(500).send('Failed to send password');
  }
};
