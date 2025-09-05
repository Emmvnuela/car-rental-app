const express = require('express');
const router = express.Router();
const db = require('../models/db');
const authenticateToken = require('../middlewares/auth');

// GET all damages
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM damages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur GET /damages:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET damage by id
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM damages WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Dommage non trouvé' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur GET /damages/:id:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST create new damage report
router.post('/', authenticateToken, async (req, res) => {
  const { reservation_id, description, reported_by } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO damages (reservation_id, description, reported_by, created_at)
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [reservation_id, description, reported_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur POST /damages:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PUT update damage report
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const result = await db.query(
      'UPDATE damages SET description = $1 WHERE id = $2 RETURNING *',
      [description, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Dommage non trouvé' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur PUT /damages/:id:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE damage report
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM damages WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Dommage non trouvé' });
    res.json({ message: 'Rapport de dommage supprimé' });
  } catch (error) {
    console.error('Erreur DELETE /damages/:id:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
