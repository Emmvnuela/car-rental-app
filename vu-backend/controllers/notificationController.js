const db = require('../models/db');

// 📌 Récupérer toutes les notifications pour un utilisateur
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await db.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur getNotifications:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 📌 Compter les notifications non lues
const countUnread = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await db.query(
      `SELECT COUNT(*) FROM notifications WHERE user_id = $1 AND is_read = false`,
      [userId]
    );
    res.json({ unreadCount: parseInt(result.rows[0].count, 10) });
  } catch (err) {
    console.error('Erreur countUnread:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 📌 Marquer une notification comme lue
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`UPDATE notifications SET is_read = true WHERE id = $1`, [id]);
    res.json({ message: 'Notification marquée comme lue' });
  } catch (err) {
    console.error('Erreur markAsRead:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 📌 Supprimer une notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM notifications WHERE id = $1`, [id]);
    res.json({ message: 'Notification supprimée' });
  } catch (err) {
    console.error('Erreur deleteNotification:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  getNotifications,
  countUnread,
  markAsRead,
  deleteNotification
};
