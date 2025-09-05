const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/availability?car_id=1&start_date=2025-07-15&end_date=2025-07-18
router.get('/', async (req, res) => {
  try {
    const { car_id, start_date, end_date } = req.query;

    if (!car_id || !start_date || !end_date) {
      return res.status(400).json({ error: 'Champs manquants.' });
    }

    const query = `
      SELECT * FROM reservations
      WHERE car_id = $1
        AND status = 'validé'
        AND (
          (start_date <= $3 AND end_date >= $2)
        )
    `;

    const result = await pool.query(query, [car_id, start_date, end_date]);

    if (result.rows.length > 0) {
      return res.json({
        available: false,
        conflicts: result.rows
      });
    }

    res.json({ available: true, conflicts: [] });

  } catch (err) {
    console.error('Erreur disponibilité :', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

module.exports = router;
