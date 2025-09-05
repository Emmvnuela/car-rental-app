const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// ✅ POST - Créer un agent dans users + agents
router.post('/create-agent', verifyToken, verifyAdmin, async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Vérifier doublon
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    // Hasher mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1️⃣ Ajouter à users
    const userResult = await pool.query(
      `INSERT INTO users (name, email, password, phone, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, phone, role`,
      [name, email, hashedPassword, phone, 'agent']
    );

    const userId = userResult.rows[0].id;

    // 2️⃣ Ajouter à agents avec user_id
    const agentResult = await pool.query(
      `INSERT INTO agents (user_id, is_active)
       VALUES ($1, true)
       RETURNING id, user_id, is_active`,
      [userId]
    );

    res.status(201).json({
      message: 'Agent créé avec succès',
      user: userResult.rows[0],
      agent: agentResult.rows[0]
    });
  } catch (error) {
    console.error('Erreur POST /agents/create-agent:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// ✅ GET - Tous les agents dans la table users (plus simple et cohérent)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.id, u.name, u.email, u.phone
      FROM agents a
      JOIN users u ON a.user_id = u.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur GET /agents:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});



// ✅ GET - Voir les livraisons de l'agent connecté
router.get('/deliveries', verifyToken, async (req, res) => {
  const agentId = req.user.id; // ✅ récupéré grâce au token

  try {
    const query = `
      SELECT d.id, d.delivery_status, d.delivery_date, d.return_date, d.notes,
             r.id AS reservation_id, r.start_date, r.end_date,
             u.name AS client_name
      FROM deliveries d
      JOIN reservations r ON d.reservation_id = r.id
      JOIN users u ON r.user_id = u.id
      WHERE d.agent_id = $1
      ORDER BY d.delivery_date DESC
    `;
    const result = await pool.query(query, [agentId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur GET /agent/deliveries:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});



// ✅ PUT - L’agent met à jour le statut de la livraison
router.put('/deliveries/:id', verifyToken, async (req, res) => {
  const agentId = req.user.id;
  const deliveryId = req.params.id;
  const { delivery_status, notes } = req.body;

  try {
    // Vérifie que la livraison appartient bien à l’agent connecté
    const check = await pool.query(
      'SELECT * FROM deliveries WHERE id = $1 AND agent_id = $2',
      [deliveryId, agentId]
    );

    if (check.rows.length === 0) {
      return res.status(403).json({ error: "Vous n'avez pas le droit de modifier cette livraison." });
    }

    const update = await pool.query(
      `UPDATE deliveries
       SET delivery_status = $1,
           notes = $2
       WHERE id = $3
       RETURNING *`,
      [delivery_status, notes || null, deliveryId]
    );

    res.json({ message: 'Livraison mise à jour', delivery: update.rows[0] });
  } catch (error) {
    console.error('Erreur PUT /agent/deliveries/:id:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
module.exports = router;
