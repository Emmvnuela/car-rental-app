// models/chatModel.js
const db = require('../config/db');

exports.getRoomsByUser = async (userId) => {
  const result = await db.query(
    `SELECT * FROM chat_rooms WHERE user1_id = $1 OR user2_id = $1`,
    [userId]
  );
  return result.rows;
};

exports.getMessagesByRoom = async (roomId) => {
  const result = await db.query(
    `SELECT * FROM messages WHERE room_id = $1 ORDER BY created_at ASC`,
    [roomId]
  );
  return result.rows;
};

exports.insertMessage = async ({ room_id, sender_id, receiver_id, message }) => {
  const result = await db.query(
    `INSERT INTO messages (room_id, sender_id, receiver_id, message, created_at)
     VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
    [room_id, sender_id, receiver_id, message]
  );
  return result.rows[0];
};

exports.createRoom = async (user1_id, user2_id) => {
  const result = await db.query(
    `INSERT INTO chat_rooms (user1_id, user2_id, created_at)
     VALUES ($1, $2, NOW()) RETURNING *`,
    [user1_id, user2_id]
  );
  return result.rows[0];
};

exports.getRoomById = async (roomId) => {
  const result = await db.query(
    `SELECT * FROM chat_rooms WHERE id = $1`,
    [roomId]
  );
  return result.rows[0];
};
