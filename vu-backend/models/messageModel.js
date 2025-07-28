const pool = require('../config/db');

exports.createMessage = async ({ sender_id, receiver_id, room_id, message, timestamp }) => {
  const query = `
    INSERT INTO messages (sender_id, receiver_id, room_id, message, timestamp)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [sender_id, receiver_id, room_id, message, timestamp];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getMessagesByRoomId = async (room_id) => {
  const query = `
    SELECT * FROM messages
    WHERE room_id = $1
    ORDER BY timestamp ASC;
  `;
  const result = await pool.query(query, [room_id]);
  return result.rows;
};
