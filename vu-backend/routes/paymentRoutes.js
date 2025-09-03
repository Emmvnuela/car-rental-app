// routes/paymentRoutes.js 
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const authenticateToken = require('../middlewares/auth');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// Importer le modèle de notification
const { createNotification } = require('../models/notificationModel');

// POST - Créer un paiement
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('Corps de la requête reçu :', req.body);

    const { reservationId, amount, method, reference } = req.body;

    // Vérification des champs
    if (!reservationId || !amount || !method || !reference) {
      console.error("Champs manquants");
      return res.status(400).json({ error: "Champs manquants dans la requête" });
    }

    // Insertion du paiement
    const result = await db.query(
      `INSERT INTO payments (reservation_id, amount, method, reference, created_at)
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [reservationId, amount, method, reference]
    );

    // Récupérer le dépôt actuel et le total_price
    const reservation = await db.query(
      `SELECT deposit, total_price FROM reservations WHERE id = $1`,
      [reservationId]
    );
    const currentDeposit = reservation.rows[0].deposit || 0;
    const totalPrice = reservation.rows[0].total_price;

    const newDeposit = currentDeposit + amount;

    // Mise à jour du dépôt et du statut
    const newStatus = newDeposit >= totalPrice + caution? 'Soldé' : 'Payé partiellement';

    await db.query(
      `UPDATE reservations
       SET deposit = $1, status = $2
       WHERE id = $3`,
      [newDeposit, newStatus, reservationId]
    );

    // 🔔 Créer une notification pour l'utilisateur après paiement
    await db.query(
      `INSERT INTO notifications (user_id, message, type)
       SELECT r.user_id, $1, 'paiement'
       FROM reservations r
       WHERE r.id = $2`,
      [`Paiement de ${amount} FCFA effectué avec succès`, reservationId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Erreur interne dans /api/payments:', err);
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
});

// GET - Paiements par utilisateur (enrichi avec jointures)
router.get('/user/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await db.query(
      `SELECT 
         p.id AS payment_id,
         p.amount,
         p.method,
         p.reference,
         p.created_at,
         r.id AS reservation_id,
         r.total_price,
         r.caution,
         r.status,
         r.deposit,
         u.name AS user_name,
         u.email AS user_email,
         c.brand AS car_brand
       FROM payments p
       JOIN reservations r ON p.reservation_id = r.id
       JOIN users u ON r.user_id = u.id
       JOIN cars c ON r.car_id = c.id
       WHERE r.user_id = $1
       ORDER BY p.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erreur GET /payments/user/:userId:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ GET - Tous les paiements (admin)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        p.id AS payment_id,
        p.amount,
        p.method,
        p.reference,
        p.created_at,
        r.total_price,
        r.caution,
        r.deposit,
        r.status,
        u.name AS user_name,
        u.email AS user_email,
        c.brand AS car_brand
      FROM payments p
      JOIN reservations r ON p.reservation_id = r.id
      JOIN users u ON r.user_id = u.id
      JOIN cars c ON r.car_id = c.id
      ORDER BY p.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Erreur GET /api/payments (admin):', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Historique des réservations avec caution séparée
router.get('/history', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const query = `
      SELECT 
        r.id AS reservation_id,
        r.start_date,
        r.end_date,
        r.total_price,
        r.caution,
        r.deposit,
        r.status,
        u.name AS client_name,
        u.email AS client_email,
        c.brand || ' ' || c.model AS car_name,
        r.created_at AS payment_date
      FROM reservations r
      JOIN users u ON r.user_id = u.id
      JOIN cars c ON r.car_id = c.id
      ORDER BY r.created_at DESC
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur GET /payments/history:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
