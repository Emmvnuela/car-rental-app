  // routes/statsRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../models/db'); // Assure-toi que pool pointe vers ton client pg
const { verifyToken } = require('../middlewares/authMiddleware');

// --- Route principale stats ---
router.get('/', verifyToken, async (req, res) => {
  try {
    // Utilisateurs
    const usersResult = await pool.query(
      'SELECT COUNT(*) AS total, SUM(CASE WHEN role = $1 THEN 1 ELSE 0 END) AS premium FROM users',
      ['premium']
    );
    const totalUsers = parseInt(usersResult.rows[0].total) || 0;
    const premiumUsers = parseInt(usersResult.rows[0].premium) || 0;

    // Actifs (utilisateurs ayant une réservation en cours)
    const activeUsersResult = await pool.query(`
      SELECT COUNT(DISTINCT user_id) AS active
      FROM reservations
      WHERE start_date <= NOW() AND end_date >= NOW()
    `);
    const activeUsers = parseInt(activeUsersResult.rows[0].active) || 0;

    // Réservations
    const reservationsResult = await pool.query(`
      SELECT COUNT(*) AS total
      FROM reservations
    `);
    const totalReservations = parseInt(reservationsResult.rows[0].total) || 0;

    // Livraisons livrées (depuis la table deliveries)
    const deliveredResult = await pool.query(`
      SELECT COUNT(*) AS delivered
      FROM deliveries
      WHERE delivery_status = 'Livré'
    `);
    const deliveredReservations = parseInt(deliveredResult.rows[0].delivered) || 0;

    // Paiements échoués
    const paymentsResult = await pool.query(`
      SELECT COUNT(*) AS failed
      FROM payments
      WHERE amount IS NULL OR amount <= 0
    `);
    const failedPayments = parseInt(paymentsResult.rows[0].failed) || 0;

    // Véhicules
    const carsResult = await pool.query(`
      SELECT COUNT(*) AS total, 
             SUM(CASE WHEN available THEN 1 ELSE 0 END) AS available,
             SUM(CASE WHEN NOT available THEN 1 ELSE 0 END) AS rented
      FROM cars
    `);
    const totalCars = parseInt(carsResult.rows[0].total) || 0;
    const availableCars = parseInt(carsResult.rows[0].available) || 0;
    const rentedCars = parseInt(carsResult.rows[0].rented) || 0;

    // Revenus
    const revenueResult = await pool.query(`
      SELECT COALESCE(SUM(total_price),0) AS totalRevenue,
             COALESCE(SUM(total_price) FILTER (WHERE date_part('month', created_at) = date_part('month', NOW())),0) AS monthlyRevenue
      FROM reservations
    `);
    const totalRevenue = parseInt(revenueResult.rows[0].totalrevenue) || 0;
    const monthlyRevenue = parseInt(revenueResult.rows[0].monthlyrevenue) || 0;

    // Satisfaction client
    const reviewsResult = await pool.query('SELECT AVG(rating) AS avgRating FROM reviews');
    const averageRating = parseFloat(reviewsResult.rows[0].avgrating) || 0;

    // Utilisation flotte
    const averageUtilization = totalCars > 0 ? (rentedCars / totalCars) * 100 : 0;

    // Taux de livraison
    const deliveryRate = totalReservations > 0 ? (deliveredReservations / totalReservations) * 100 : 0;

    res.json({
      stats: {
        totalUsers,
        activeUsers,
        premiumUsers,
        totalReservations,
        deliveredReservations,
        deliveryRate,
        failedPayments,
        totalCars,
        availableCars,
        rentedCars,
        totalRevenue,
        monthlyRevenue,
        averageRating,
        averageUtilization
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// --- Données mensuelles ---
router.get('/monthly', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT date_trunc('month', created_at) AS month, COUNT(*) AS reservations, COALESCE(SUM(total_price),0) AS revenus
      FROM reservations
      GROUP BY month
      ORDER BY month ASC
    `);
    res.json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// --- Véhicules par type ---
router.get('/cars-by-type', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT brand AS name, COUNT(*) AS value
      FROM cars
      GROUP BY brand
    `);
    res.json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// --- Méthodes de paiement ---
router.get('/payment-methods', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT method AS name, COUNT(*) AS value
      FROM payments
      GROUP BY method
    `);
    res.json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// routes/statsRoutes.js
router.get('/monthly', verifyToken, async (req, res) => {
  try {
    // Réservations et revenus par mois
    const reservationsResult = await pool.query(`
      SELECT
        date_trunc('month', created_at) AS month,
        COUNT(*) AS reservations,
        COALESCE(SUM(total_price),0) AS revenus
      FROM reservations
      WHERE created_at <= NOW()
      GROUP BY month
      ORDER BY month ASC
    `);

    // Nouveaux utilisateurs par mois
    const usersResult = await pool.query(`
      SELECT
        date_trunc('month', created_at) AS month,
        COUNT(*) AS "nouveauxUsers"
      FROM users
      WHERE created_at <= NOW()
      GROUP BY month
      ORDER BY month ASC
    `);

    // Créer un tableau de tous les mois de l'année
    const months = [];
    for (let m = 0; m < 12; m++) {
      const date = new Date(2025, m, 1);
      months.push(date);
    }

    const monthlyData = months.map(monthDate => {
      const reservation = reservationsResult.rows.find(r => r.month.getMonth() === monthDate.getMonth());
      const user = usersResult.rows.find(u => u.month.getMonth() === monthDate.getMonth());

      return {
        month: monthDate.toISOString().slice(0,7),
        reservations: reservation ? parseInt(reservation.reservations) : 0,
        revenus: reservation ? parseInt(reservation.revenus) : 0,
        nouveauxUsers: user ? parseInt(user.nouveauxUsers) : 0
      };
    });

    res.json({ monthlyData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;