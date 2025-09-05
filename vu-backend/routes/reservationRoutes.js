// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const authenticateToken = require('../middlewares/auth');
const reservationController = require('../controllers/reservationController');

// ✅ POST - Créer une réservation
router.post('/', authenticateToken, async (req, res) => {
  const {
    car_id,
    start_date,
    end_date,
    total_price,
    deposit,
    caution,
    status
  } = req.body;

  const user_id = req.user.id;

  try {
    const result = await db.query(
      `INSERT INTO reservations 
        (user_id, car_id, start_date, end_date, total_price, deposit, caution, status, created_at)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *`,
      [user_id, car_id, start_date, end_date, total_price, deposit, caution, status || 'En attente']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur création réservation:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de la réservation' });
  }
});

// ✅ GET - Réservations d’un utilisateur
router.get('/user/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await db.query(
      `SELECT r.*, c.brand AS car_brand 
       FROM reservations r
       JOIN cars c ON r.car_id = c.id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erreur récupération réservations utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ DELETE - Annuler une réservation
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const check = await db.query('SELECT deposit, user_id FROM reservations WHERE id = $1', [id]);

    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }

    if (parseFloat(check.rows[0].deposit) > 0) {
      return res.status(403).json({ error: 'Impossible d’annuler une réservation déjà payée' });
    }

    await db.query('DELETE FROM reservations WHERE id = $1', [id]);

    await db.query(
      `INSERT INTO notifications (user_id, message, type)
       VALUES ($1, $2, 'annulation')`,
      [check.rows[0].user_id, `Votre réservation n°${id} a été annulée.`]
    );

    res.json({ message: 'Réservation annulée avec succès' });
  } catch (error) {
    console.error('Erreur suppression réservation:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ GET - Une réservation par ID (CORRIGÉ pour la table agents)
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT 
        r.id,
        r.user_id AS client_id,
        r.agent_id,
        r.status,
        r.delivery_status,
        u.name AS client_name, 
        u.email AS client_email,
        u.role AS client_role,
        c.brand AS car,
        -- 🔥 JOINTURE CORRECTE : agents -> users pour récupérer l'user_id de l'agent
        au.id AS agent_user_id,  -- ✅ C'est ça qu'on veut pour le chat !
        au.name AS agent_name,
        au.email AS agent_email,
        au.role AS agent_role
       FROM reservations r
       JOIN users u ON r.user_id = u.id
       JOIN cars c ON r.car_id = c.id
       LEFT JOIN agents a ON r.agent_id = a.id
       LEFT JOIN users au ON a.user_id = au.id
       WHERE r.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }

    const reservation = result.rows[0];

    // 🔥 Vérifier si un agent est assigné
    if (!reservation.agent_id) {
      return res.status(400).json({ 
        error: 'Aucun agent assigné à cette réservation',
        code: 'NO_AGENT_ASSIGNED',
        reservation_id: id
      });
    }

    // 🔥 Vérifier si l'agent a un user_id valide
    if (!reservation.agent_user_id) {
      return res.status(400).json({ 
        error: 'Agent assigné mais utilisateur non trouvé',
        code: 'AGENT_USER_NOT_FOUND',
        reservation_id: id
      });
    }

    // 🔥 Retourner les bonnes données pour le chat
    const chatData = {
      id: reservation.id,
      client_id: reservation.client_id,      // ID du client dans users
      agent_id: reservation.agent_user_id,   // ID de l'agent dans users (PAS dans agents!)
      client_name: reservation.client_name,
      agent_name: reservation.agent_name,
      car: reservation.car,
      status: reservation.status
    };

    console.log('✅ Chat data prepared:', chatData);
    res.json(chatData);

  } catch (error) {
    console.error('Erreur récupération réservation par ID:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// ✅ GET - Toutes les réservations pour admin
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        r.id AS reservation_id,
        r.start_date,
        r.end_date,
        r.total_price,
        r.deposit,
        r.status,
        r.is_validated,
        r.created_at,
        u.name AS user_name,
        u.email AS user_email,
        c.brand AS car_brand
       FROM reservations r
       JOIN users u ON r.user_id = u.id
       JOIN cars c ON r.car_id = c.id
       ORDER BY r.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erreur récupération réservations (admin):', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ PUT - Assigner un agent
router.put('/:reservationId/assign-agent', reservationController.assignAgent);

// ✅ PUT - Valider une réservation
router.put('/:id/validate', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `UPDATE reservations SET is_validated = true WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }

    const reservation = result.rows[0];
    await db.query(
      `INSERT INTO notifications (user_id, message, type)
       VALUES ($1, $2, 'validation')`,
      [reservation.user_id, `Votre réservation n°${reservation.id} a été validée. Vous pouvez procéder au paiement.`]
    );

    res.json({ message: 'Réservation validée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la validation de la réservation:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.put('/:id/validate', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `UPDATE reservations SET is_validated = true WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }

    const reservation = result.rows[0];

    // Notification utilisateur
    await db.query(
      `INSERT INTO notifications (user_id, message, type)
       VALUES ($1, $2, 'validation')`,
      [reservation.user_id, `Votre réservation n°${reservation.id} a été validée. Vous pouvez procéder au paiement et télécharger votre contrat.`]
    );

    // NOUVEAU: Générer automatiquement le contrat PDF
    try {
      const generateContratPDF = require('../utils/generatePdf');
      const path = require('path');
      const fs = require('fs');
      
      // Récupérer les données complètes
      const fullDataResult = await db.query(`
        SELECT 
          r.*,
          u.name as user_name, u.email as user_email, u.phone as user_phone,
          c.brand, c.model, c.year, c.price_per_day
        FROM reservations r
        JOIN users u ON r.user_id = u.id
        JOIN cars c ON r.car_id = c.id
        WHERE r.id = $1
      `, [id]);
      
      if (fullDataResult.rows.length > 0) {
        const pdfDir = path.join(__dirname, '../pdfs');
        if (!fs.existsSync(pdfDir)) {
          fs.mkdirSync(pdfDir, { recursive: true });
        }
        
        const outputPath = path.join(pdfDir, `contrat-reservation-${id}.pdf`);
        await generateContratPDF(fullDataResult.rows[0], outputPath);
        
        console.log(`Contrat PDF généré automatiquement pour la réservation ${id}`);
      }
    } catch (pdfError) {
      console.error('Erreur génération PDF automatique:', pdfError);
      // Ne pas bloquer la validation si la génération PDF échoue
    }

    res.json({ message: 'Réservation validée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la validation de la réservation:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// ✅ GET - Réservations disponibles pour livraison (non encore assignées)
router.get('/disponibles', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT r.id AS reservation_id, r.start_date, r.end_date, r.status, r.delivery_status
      FROM reservations r
      WHERE r.is_validated = true AND r.delivery_status = 'non_assigné'
      ORDER BY r.start_date ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Erreur récupération réservations disponibles:", error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


module.exports = router;
