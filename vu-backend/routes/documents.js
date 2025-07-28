const express = require('express'); 
const router = express.Router();
const multer = require('multer');
const { createDriverDocument } = require('../models/DriverDocument');
const pool = require('../config/db');
const auth = require('../middlewares/auth');

// 🔧 Configuration de stockage pour multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// 📌 POST /api/documents/ — Upload des documents
router.post(
  '/',
  auth,
  upload.fields([
    { name: 'driving_license' },
    { name: 'national_id' }
  ]),
  async (req, res) => {
    try {
      const user_id = req.user.id;
      const birth_date = req.body.birth_date;

      const driving_license = req.files['driving_license']?.[0]?.path;
      const national_id = req.files['national_id']?.[0]?.path;

      if (!driving_license || !national_id) {
        return res.status(400).json({ error: "Les deux fichiers sont requis." });
      }

      const doc = await createDriverDocument({
        user_id,
        birth_date,
        driving_license,
        national_id,
      });

      res.status(201).json({ success: true, document: doc });
    } catch (err) {
      console.error('Erreur upload documents:', err);
      res.status(500).json({ error: "Erreur d'upload des documents." });
    }
  }
);

// 📌 GET /api/documents/check/:userId — Vérifie si documents soumis
router.get('/check/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      'SELECT is_verified FROM driverdocuments WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ is_verified: false });
    }

    const { is_verified } = result.rows[0];
    return res.status(200).json({ is_verified });

  } catch (err) {
    console.error('Erreur vérification documents:', err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
});

// 📌 POST /api/documents/validate/:id — Validation ou refus
router.post('/validate/:id', async (req, res) => {
  const docId = req.params.id;
  const { is_verified, rejection_reason } = req.body;

  try {
    const query = `
      UPDATE driverdocuments
      SET is_verified = $1, rejection_reason = $2
      WHERE id = $3
    `;
    const values = [is_verified, rejection_reason, docId];
    await pool.query(query, values);

    res.status(200).json({ message: "Document mis à jour" });
  } catch (err) {
    console.error('Erreur validation:', err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
