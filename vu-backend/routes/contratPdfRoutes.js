// routes/contratPdfRoutes.js
const express = require('express');
const router = express.Router();
const generateContratPDF = require('../utils/generatePdf');
const sendEmail = require('../utils/sendEmail');
const path = require('path');
const pool = require('../config/db');

router.post('/send-contrat/:id', async (req, res) => {
  const contratId = req.params.id;

  try {
    const { rows: contrats } = await pool.query('SELECT * FROM "ContratsLocation" WHERE id = $1', [contratId]);
    const contrat = contrats[0];

    const { rows: users } = await pool.query('SELECT * FROM "Users" WHERE id = $1', [contrat.user_id]);
    const user = users[0];

    const { rows: voitures } = await pool.query('SELECT * FROM "Voitures" WHERE id = $1', [contrat.voiture_id]);
    const voiture = voitures[0];

    const outputPath = path.join(__dirname, `../public/contrat_${contratId}.pdf`);

    await generateContratPDF(contrat, voiture, user, outputPath);
    await sendEmail(user.email, 'Votre contrat de location', 'Veuillez trouver ci-joint votre contrat.', outputPath);

    res.json({ message: 'Contrat envoyé par mail avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de l\'envoi du contrat.');
  }
});

module.exports = router;
