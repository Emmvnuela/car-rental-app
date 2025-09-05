const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// 🧾 GET - Toutes les voitures avec filtres, tri et pagination
router.get('/cars', async (req, res) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      available,
      year,
      page = 1,
      limit = 10,
      sort = 'created_at',
      order = 'desc'
    } = req.query;

    let whereClause = `WHERE 1=1`;
    const params = [];
    
    // 🔍 Recherche par brand ou model
    if (search) {
      whereClause += ` AND (brand ILIKE $${params.length + 1} OR model ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }

    // 🎯 Filtre année
    if (year) {
      whereClause += ` AND year = $${params.length + 1}`;
      params.push(Number(year));
    }

    // 💰 Filtre prix
    if (minPrice) {
      whereClause += ` AND price_per_day >= $${params.length + 1}`;
      params.push(Number(minPrice));
    }
    if (maxPrice) {
      whereClause += ` AND price_per_day <= $${params.length + 1}`;
      params.push(Number(maxPrice));
    }

    // ✅ Filtre disponibilité
    if (available !== undefined && available !== '') {
      whereClause += ` AND available = $${params.length + 1}`;
      params.push(available === 'true');
    }

    // 🧮 Nombre total pour pagination
    const countQuery = `SELECT COUNT(*) FROM cars ${whereClause}`;
    const totalCountResult = await db.query(countQuery, params);
    const total = Number(totalCountResult.rows[0].count);

    // 🧾 Validation champ de tri
    const allowedSort = ['brand', 'price_per_day', 'year', 'created_at'];
    if (!allowedSort.includes(sort)) {
      return res.status(400).json({ error: 'Champ de tri invalide' });
    }

    // 📄 Récupération des données
    const dataQuery = `
      SELECT * FROM cars 
      ${whereClause}
      ORDER BY ${sort} ${order === 'asc' ? 'ASC' : 'DESC'}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    params.push(Number(limit), (Number(page) - 1) * Number(limit));

    const { rows } = await db.query(dataQuery, params);
    res.json({ cars: rows, total });
  } catch (error) {
    console.error('❌ Erreur GET /cars:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ➕ POST - Ajouter une voiture (admin uniquement)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  const { brand, model, year, price_per_day, image_url, description, available } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO cars (brand, model, year, price_per_day, image_url, description, available)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [brand, model, year, price_per_day, image_url, description, available]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Erreur POST /cars:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 📝 PUT - Modifier une voiture (admin uniquement)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { brand, model, year, price_per_day, image_url, description, available } = req.body;
  const { id } = req.params;

  try {
    const result = await db.query(
      `UPDATE cars 
       SET brand = $1, model = $2, year = $3, price_per_day = $4, image_url = $5, description = $6, available = $7
       WHERE id = $8 RETURNING *`,
      [brand, model, year, price_per_day, image_url, description, available, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Voiture non trouvée' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Erreur PUT /cars:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🗑️ DELETE - Supprimer une voiture (admin)
router.delete('/:id',verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM cars WHERE id = $1', [id]);
    res.json({ message: 'Voiture supprimée' });
  } catch (error) {
    console.error('❌ Erreur DELETE /cars:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🧮 Statistiques générales sur les voitures
router.get('/stats', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const statsQuery = `
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE available = true) AS disponibles,
        COUNT(*) FILTER (WHERE available = false) AS indisponibles,
        MIN(price_per_day) AS min_price,
        MAX(price_per_day) AS max_price,
        AVG(price_per_day) AS avg_price
      FROM cars
    `;

    const result = await db.query(statsQuery);
    const stats = result.rows[0];

    res.json({
      total: parseInt(stats.total),
      disponibles: parseInt(stats.disponibles),
      indisponibles: parseInt(stats.indisponibles),
      min_price: parseFloat(stats.min_price),
      max_price: parseFloat(stats.max_price),
      avg_price: parseFloat(parseFloat(stats.avg_price).toFixed(2)),
    });
  } catch (error) {
    console.error('❌ Erreur /api/cars/stats :', error);
    res.status(500).json({ error: 'Erreur lors du chargement des statistiques' });
  }
});
module.exports = router;
