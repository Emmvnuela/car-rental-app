const pool = require("../db");

exports.sendMessage = async (req, res) => {
  const { sender_id, receiver_id, message, room_id, timestamp } = req.body;
  if (!sender_id || !receiver_id || !message || !room_id) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, message, room_id, timestamp)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [sender_id, receiver_id, message, room_id, timestamp || new Date()]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur envoi message:", error);
    res.status(500).json({ error: "Erreur interne" });
  }
};

exports.getMessages = async (req, res) => {
  const { roomId } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM messages WHERE room_id = $1 ORDER BY timestamp ASC`,
      [roomId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur récupération messages:", error);
    res.status(500).json({ error: "Erreur interne" });
  }
};
