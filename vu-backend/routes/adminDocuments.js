const express = require('express');
const router = express.Router();
const pool  = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// Récupération des documents non vérifiés + noms des conducteurs
router.get('/pending', verifyToken, verifyAdmin, async (req, res) => {
  try {
    console.log("Récupération des documents non vérifiés...");
    
    const result = await pool.query(`
      SELECT dd.*, u.name 
      FROM driverdocuments dd
      JOIN users u ON dd.user_id = u.id
      WHERE dd.is_verified = FALSE
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Erreur dans /pending :", error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// Mise à jour de l'état de vérification
router.post('/validate/:docId', verifyToken, verifyAdmin, async (req, res) => {
  const { docId } = req.params;
  const { is_verified, rejection_reason } = req.body;

  if (typeof is_verified !== 'boolean') {
    return res.status(400).json({ message: 'Champ is_verified requis.' });
  }

  try {
    await pool.query(
      `UPDATE driverdocuments 
       SET is_verified = $1, rejection_reason = $2
       WHERE id = $3`,
      [is_verified, rejection_reason || null, docId]
    );
    res.json({ message: 'Mise à jour effectuée.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
