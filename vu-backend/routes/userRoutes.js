const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middlewares
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// ✅ Route protégée (exemple)
router.get('/admin/data', verifyAdmin, (req, res) => {
  res.json({ message: 'Contenu réservé aux admins' });
});

// ✅ GET - Tous les utilisateurs (protégé par token + rôle admin)
router.get('/', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    const result = await db.query('SELECT id, name, email, phone, role FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur GET /users:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ POST - Inscription
router.post('/', async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    const existing = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role',
      [name, email, hashedPassword, phone, role]
    );

    res.status(201).json({ message: 'Utilisateur créé', user: result.rows[0] });
  } catch (error) {
    console.error('Erreur POST /users:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ POST - Connexion (login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2d' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Erreur POST /users/login:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ PUT - Mise à jour utilisateur
router.put('/:id', async (req, res) => {
  const { name, phone } = req.body;
  const { id } = req.params;

  try {
    const result = await db.query(
      'UPDATE users SET name = $1, phone = $2 WHERE id = $3 RETURNING id, name, email, phone, role',
      [name, phone, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur update user:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ DELETE - Supprimer utilisateur
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur delete user:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ✅ GET - Récupérer les infos du user connecté
router.get('/me', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      'SELECT id, name, email, phone, role FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erreur GET /users/me:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// GET - Liste des agents uniquement
// routes/userRoutes.js
router.get('/agents', verifyToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name FROM users WHERE role = $1',
      ['agent']
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur GET /users/agents:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});




module.exports = router;
