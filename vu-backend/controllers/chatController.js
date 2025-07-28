const pool = require('../config/db');

exports.sendMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, message, room_id, timestamp } = req.body;

    if (!sender_id || !receiver_id || !message || !room_id || !timestamp) {
      return res.status(400).json({ message: 'Champs manquants.' });
    }

    const result = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, message, room_id, timestamp, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [sender_id, receiver_id, message, room_id, timestamp]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur envoi message :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getMessagesByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const result = await pool.query(
      'SELECT * FROM messages WHERE room_id = $1 ORDER BY timestamp ASC',
      [roomId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erreur récupération messages :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
