// --- BACKEND ---
// models/notificationModel.js
const db = require('./db');

const createNotification = async ({ userId, message, type = 'info' }) => {
  return await db.query(
    `INSERT INTO notifications (user_id, message, type, is_read, created_at)
     VALUES ($1, $2, $3, false, NOW()) RETURNING *`,
    [userId, message, type]
  );
};

const getUserNotifications = async (userId) => {
  return await db.query(
    `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
};

const markNotificationAsRead = async (notificationId) => {
  return await db.query(
    `UPDATE notifications SET is_read = true WHERE id = $1`,
    [notificationId]
  );
};

module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationAsRead
};


// Fichier : routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const notifModel = require('../models/notificationModel');

router.get('/user/:userId', auth, async (req, res) => {
  try {
    const result = await notifModel.getUserNotifications(req.params.userId);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur notifications' });
  }
});

router.put('/:id/read', auth, async (req, res) => {
  try {
    await notifModel.markNotificationAsRead(req.params.id);
    res.json({ message: 'Notification marquée comme lue' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;





