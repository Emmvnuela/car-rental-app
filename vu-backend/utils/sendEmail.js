// utils/SendEmail.js
require('dotenv').config(); // 👈 Assure le chargement du .env
const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text, attachmentPath) {
  console.log(`📤 Envoi de mail à ${to} avec pièce jointe : ${attachmentPath}`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments: [
      {
        filename: 'contrat-location.pdf',
        path: attachmentPath
      }
    ]
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('📧 Email envoyé avec succès :', info.messageId);
  return info;
}

module.exports = sendEmail;
