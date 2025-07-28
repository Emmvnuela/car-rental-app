const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');
const verifyDeliveryOwnerOrAdmin = require('../middlewares/verifyDeliveryOwnerOrAdmin');
const { getMyDeliveries } = require('../controllers/deliveriesController');
const authenticateToken = require('../middlewares/auth');
const { Server } = require('socket.io');


// ✅ GET - Toutes les livraisons (admin)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const query = `
      SELECT d.id, d.delivery_status, d.delivery_date, d.return_date, d.notes,
             r.start_date, r.end_date,
             u.name AS client_name,
             a.id AS agent_id,
             au.name AS agent_name
      FROM deliveries d
      JOIN reservations r ON d.reservation_id = r.id
      JOIN users u ON r.user_id = u.id
      JOIN agents a ON d.agent_id = a.id
      JOIN users au ON a.user_id = au.id
      ORDER BY d.delivery_date DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur GET /deliveries:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ POST - Créer une livraison (admin)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  const { reservation_id, agent_id, delivery_status, delivery_date, return_date, notes } = req.body;
  const io = req.app.get('socketio');

  try {
    // Vérifier s'il existe déjà une livraison
    const existing = await pool.query(
      'SELECT * FROM deliveries WHERE reservation_id = $1',
      [reservation_id]
    );

    if (existing.rows.length > 0) {
      io.emit('deliveryExists', {
        message: `Une livraison existe déjà pour la réservation #${reservation_id}`,
        reservation_id,
        agent_id: existing.rows[0].agent_id
      });

      return res.status(400).json({ error: 'Livraison déjà existante pour cette réservation' });
    }

    // ✅ 1. Créer la livraison
    const insertQuery = `
      INSERT INTO deliveries (reservation_id, agent_id, delivery_status, delivery_date, return_date, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const insertValues = [
      reservation_id,
      agent_id,
      delivery_status || 'En attente',
      delivery_date,
      return_date || null,
      notes || null
    ];
    const result = await pool.query(insertQuery, insertValues);

    /// ✅ 2. Mettre à jour reservations
await pool.query(
  `UPDATE reservations
   SET agent_id = $1,
       delivery_status = 'assigné'
   WHERE id = $2`,
  [agent_id, reservation_id]
);


    io.emit('deliveryUpdated');

    res.status(201).json({
      message: 'Livraison créée et agent assigné avec succès',
      delivery: result.rows[0]
    });

  } catch (error) {
    console.error('Erreur POST /deliveries:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ PUT - Modifier une livraison (admin ou agent concerné)
router.put('/:id', verifyToken, verifyDeliveryOwnerOrAdmin, async (req, res) => {
  const { id } = req.params;
  const { delivery_status, delivery_date, return_date, notes } = req.body;

  try {
    const query = `
      UPDATE deliveries
      SET delivery_status = $1,
          delivery_date = $2,
          return_date = $3,
          notes = $4
      WHERE id = $5
      RETURNING *
    `;
    const values = [delivery_status, delivery_date, return_date, notes, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livraison non trouvée' });
    }

    const io = req.app.get('socketio');
    io.emit('deliveryUpdated');

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur PUT /deliveries/:id:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ DELETE - Supprimer une livraison (admin)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM deliveries WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livraison non trouvée' });
    }

    const io = req.app.get('socketio');
    io.emit('deliveryUpdated');

    res.json({ message: 'Livraison supprimée' });
  } catch (error) {
    console.error('Erreur DELETE /deliveries/:id:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ GET - Livraisons de l'agent connecté
router.get('/mine', verifyToken, getMyDeliveries);



// ✅ GET - Réservations sans livraison (pour assignation) ET validées
router.get('/disponibles', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.id AS reservation_id,
             r.start_date,
             r.end_date,
             u.name AS client_name,
             c.brand AS car_brand
      FROM reservations r
      JOIN users u ON r.user_id = u.id
      JOIN cars c ON r.car_id = c.id
      LEFT JOIN deliveries d ON d.reservation_id = r.id
      WHERE d.id IS NULL AND r.is_validated = true
      ORDER BY r.start_date DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Erreur GET /reservations/disponibles:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ GET - Détails d'une livraison
router.get('/:id', async (req, res) => {
  const deliveryId = req.params.id;

  try {
    const query = `
      SELECT d.*, c.brand, c.model, c.year, c.price_per_day, c.image_url, c.description AS car_description
      FROM deliveries d
      JOIN reservations r ON d.reservation_id = r.id
      JOIN cars c ON r.car_id = c.id
      WHERE d.id = $1
    `;
    const result = await pool.query(query, [deliveryId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Livraison non trouvée' });
    }

    const row = result.rows[0];
    const delivery = {
      id: row.id,
      reservation_id: row.reservation_id,
      agent_id: row.agent_id,
      delivery_status: row.delivery_status,
      delivery_date: row.delivery_date,
      return_date: row.return_date,
      notes: row.notes,
      car: {
        brand: row.brand,
        model: row.model,
        year: row.year,
        price_per_day: row.price_per_day,
        image_url: row.image_url,
        description: row.car_description
      }
    };

    res.json(delivery);
  } catch (error) {
    console.error('Erreur récupération livraison:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
module.exports = router;