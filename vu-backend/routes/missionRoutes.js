const express = require('express');
const router = express.Router();
const db = require('../models/db');
const authenticateToken = require('../middlewares/auth');

// GET all missions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM missions ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur GET /missions:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET mission by id
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM missions WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Mission non trouvée' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur GET /missions/:id:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST create new mission
router.post('/', authenticateToken, async (req, res) => {
  const { agent_id, reservation_id, mission_date, status, description } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO missions (agent_id, reservation_id, mission_date, status, description, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [agent_id, reservation_id, mission_date, status || 'En attente', description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur POST /missions:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PUT update mission
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status, description } = req.body;
  try {
    const result = await db.query(
      'UPDATE missions SET status = $1, description = $2 WHERE id = $3 RETURNING *',
      [status, description, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Mission non trouvée' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur PUT /missions/:id:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE mission
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM missions WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Mission non trouvée' });
    res.json({ message: 'Mission supprimée' });
  } catch (error) {
    console.error('Erreur DELETE /missions/:id:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
