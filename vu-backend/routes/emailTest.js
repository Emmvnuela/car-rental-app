const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/SendEmail');
const path = require('path');

router.get('/test-email', async (req, res) => {
  try {
    const testPath = path.join(__dirname, '../pdfs/test.pdf');

    // Optionnel : crée un faux fichier PDF pour le test
    const fs = require('fs');
    fs.writeFileSync(testPath, 'Contrat de test');

    await sendEmail(
      'votreEmailDeTest@gmail.com',
      'Test de contrat VU',
      'Voici un test de contrat en pièce jointe.',
      testPath
    );

    res.send('✅ Email envoyé avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Échec de l’envoi d’e-mail');
  }
});

module.exports = router;
