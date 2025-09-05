// /config/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // à mettre dans .env
    pass: process.env.EMAIL_PASS        // mot de passe d’application
  }
});

module.exports = transporter;
