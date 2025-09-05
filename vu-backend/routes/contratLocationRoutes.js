const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const generatePdf = require('../utils/generatePdf');
const sendEmail = require('../utils/SendEmail');
const path = require('path');
const fs = require('fs');

// Cache pour éviter les duplications
const generationCache = new Map();

/* ✅ ROUTE GET : liste simple de tous les contrats */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cl.*, u.name AS client_name, r.start_date, r.end_date
      FROM contratslocation cl
      JOIN reservations r ON cl.reservation_id = r.id
      JOIN users u ON r.user_id = u.id
      ORDER BY cl.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur récupération contrats :', error);
    res.status(500).json({ error: 'Erreur récupération contrats.' });
  }
});

/* ✅ ROUTE GET /all avec filtres */
router.get('/all', async (req, res) => {
  const { statut, client, startDate, endDate } = req.query;

  let query = `
    SELECT cl.*, u.name AS client_name, r.start_date, r.end_date
    FROM contratslocation cl
    JOIN reservations r ON r.id = cl.reservation_id
    JOIN users u ON r.user_id = u.id
    WHERE 1=1
  `;

  const params = [];
  let index = 1;

  if (statut) {
    query += ` AND cl.statut_contrat = $${index++}`;
    params.push(statut);
  }

  if (client) {
    query += ` AND u.name ILIKE $${index++}`;
    params.push(`%${client}%`);
  }

  if (startDate && endDate) {
    query += ` AND cl.date_debut >= $${index++} AND cl.date_fin <= $${index++}`;
    params.push(startDate, endDate);
  }

  query += ` ORDER BY cl.created_at DESC`;

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des contrats :', error);
    res.status(500).json({ error: 'Erreur récupération contrats.' });
  }
});

/* ✅ GET PDF et envoi auto */
router.get('/generate-pdf/:reservationId', async (req, res) => {
  const { reservationId } = req.params;
  const cacheKey = `pdf_${reservationId}`;

  try {
    if (generationCache.has(cacheKey)) {
      return res.status(429).json({ error: 'Génération déjà en cours' });
    }

    generationCache.set(cacheKey, true);

    const query = `
      SELECT r.*, u.name AS user_name, u.email AS user_email, u.phone AS user_phone,
             c.brand, c.model, c.year, c.price_per_day
      FROM reservations r
      JOIN users u ON u.id = r.user_id
      JOIN cars c ON c.id = r.car_id
      WHERE r.id = $1 AND r.is_validated = true
    `;
    const result = await pool.query(query, [reservationId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Réservation non trouvée ou non validée' });
    }

    const reservation = result.rows[0];
    const pdfDir = path.join(__dirname, '../pdfs');
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

    const outputPath = path.join(pdfDir, `contrat-reservation-${reservationId}.pdf`);

    let needToGenerate = true;
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      const fileAge = Date.now() - stats.mtime;
      const oneHour = 3600000;
      needToGenerate = fileAge > oneHour;
    }

    if (needToGenerate) {
      await generatePdf(reservation, outputPath);

      let retries = 0;
      while (!fs.existsSync(outputPath) && retries < 5) {
        await new Promise((r) => setTimeout(r, 300));
        retries++;
      }

      if (!fs.existsSync(outputPath)) {
        throw new Error('PDF non disponible après génération');
      }
    }

    await sendEmail(
      reservation.user_email,
      'Votre contrat de location - VU VÉHICULES',
      'Bonjour, veuillez trouver ci-joint votre contrat de location.',
      outputPath
    );

    await pool.query(`
      INSERT INTO contratslocation (
        reservation_id, date_debut, date_fin, lieu_retrait, lieu_retour,
        montant_total, montant_paye, conditions, statut_contrat,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
    `, [
      reservation.id,
      reservation.start_date,
      reservation.end_date,
      '---', '---',
      reservation.total_price || reservation.price_per_day,
      reservation.total_price || reservation.price_per_day,
      'Conditions générales de location',
      'validé'
    ]);

    res.download(outputPath, `contrat-location-${reservationId}.pdf`);
  } catch (error) {
    console.error('❌ Erreur génération PDF ou email :', error);
    res.status(500).json({ error: 'Erreur génération ou envoi du contrat.' });
  } finally {
    setTimeout(() => generationCache.delete(cacheKey), 3000);
  }
});

/* ✅ POST génération contrat manuelle */
router.post('/generate-contrat', async (req, res) => {
  const { reservationId } = req.body;

  try {
    const result = await pool.query(`
      SELECT r.*, u.name AS user_name, u.email AS user_email, u.phone AS user_phone,
             c.brand, c.model, c.year, c.price_per_day
      FROM reservations r
      JOIN users u ON r.user_id = u.id
      JOIN cars c ON r.car_id = c.id
      WHERE r.id = $1
    `, [reservationId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Réservation non trouvée.' });
    }

    const reservation = result.rows[0];
    const outputPath = path.join(__dirname, `../pdfs/contrat-${reservationId}.pdf`);

    await generatePdf(reservation, outputPath);

    let retries = 0;
    while (!fs.existsSync(outputPath) && retries < 5) {
      await new Promise((r) => setTimeout(r, 300));
      retries++;
    }

    if (!fs.existsSync(outputPath)) {
      throw new Error('PDF non disponible après génération');
    }

    await sendEmail(
      reservation.user_email,
      'Votre contrat de location - VU VÉHICULES',
      'Veuillez trouver ci-joint votre contrat de location.',
      outputPath
    );

    await pool.query(`
      INSERT INTO contratslocation (
        reservation_id, date_debut, date_fin, lieu_retrait, lieu_retour,
        montant_total, montant_paye, conditions, statut_contrat,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
    `, [
      reservation.id,
      reservation.start_date,
      reservation.end_date,
      '---', '---',
      reservation.total_price || reservation.price_per_day,
      reservation.total_price || reservation.price_per_day,
      'Conditions générales de location',
      'validé'
    ]);

    res.json({ message: '✅ Contrat généré et e-mail envoyé avec succès.' });
  } catch (error) {
    console.error('❌ Erreur génération/envoi :', error);
    res.status(500).json({ error: 'Erreur lors de la génération ou de l’envoi du contrat.' });
  }
});

/* ✅ TEST email */
router.get('/test-email', async (req, res) => {
  try {
    const testFile = path.join(__dirname, '../pdfs/test.pdf');

    await sendEmail(
      'tonemail@gmail.com',
      'Test d’envoi depuis VU VÉHICULES',
      'Ceci est un test avec une pièce jointe.',
      testFile
    );

    res.json({ message: '✅ Test envoyé avec succès !' });
  } catch (error) {
    console.error('❌ Erreur test email :', error);
    res.status(500).json({ error: 'Erreur lors du test.' });
  }
});

/* ✅ DELETE */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM contratslocation WHERE id = $1', [id]);
    res.json({ message: '✅ Contrat supprimé avec succès.' });
  } catch (error) {
    console.error('❌ Erreur suppression contrat :', error);
    res.status(500).json({ error: 'Erreur suppression contrat.' });
  }
});

/* ✅ PUT (mise à jour contrat) */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    lieu_retrait, lieu_retour,
    montant_total, montant_paye,
    statut_contrat, conditions
  } = req.body;

  try {
    // 📝 Mise à jour du contrat
    const result = await pool.query(`
      UPDATE contratslocation
      SET lieu_retrait = $1,
          lieu_retour = $2,
          montant_total = $3,
          montant_paye = $4,
          statut_contrat = $5,
          conditions = $6,
          updated_at = NOW()
      WHERE id = $7
      RETURNING *
    `, [lieu_retrait, lieu_retour, montant_total, montant_paye, statut_contrat, conditions, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Contrat non trouvé.' });
    }

    // 🔄 Rechercher la réservation liée pour régénérer le PDF
    const reservationData = await pool.query(`
      SELECT r.*, u.name AS user_name, u.email AS user_email, u.phone AS user_phone,
             c.brand, c.model, c.year, c.price_per_day
      FROM reservations r
      JOIN users u ON u.id = r.user_id
      JOIN cars c ON c.id = r.car_id
      WHERE r.id = (
        SELECT reservation_id FROM contratslocation WHERE id = $1
      )
    `, [id]);

    if (reservationData.rows.length > 0) {
      const reservation = reservationData.rows[0];
      const pdfPath = path.join(__dirname, `../pdfs/contrat-reservation-${reservation.id}.pdf`);

      await generatePdf(reservation, pdfPath);
      console.log(`📄 Contrat PDF régénéré pour réservation ${reservation.id}`);
    }

    res.json({ message: '✅ Contrat mis à jour et PDF régénéré avec succès.', contrat: result.rows[0] });

  } catch (error) {
    console.error('❌ Erreur mise à jour contrat :', error);
    res.status(500).json({ error: 'Erreur mise à jour contrat.' });
  }
});

const pdfPath = path.join(__dirname, '../pdfs');

router.get('/download/:reservationId', (req, res) => {
  const { reservationId } = req.params;
  const filePath = path.join(pdfPath, `contrat-reservation-${reservationId}.pdf`);

  if (fs.existsSync(filePath)) {
    return res.download(filePath, `contrat-location-${reservationId}.pdf`);
  } else {
    return res.status(404).json({ error: 'PDF non trouvé pour cette réservation.' });
  }
});


module.exports = router;
