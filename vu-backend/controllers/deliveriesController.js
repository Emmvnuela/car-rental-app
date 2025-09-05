// controllers/deliveriesController.js
const pool = require('../config/db');

const getMyDeliveries = async (req, res) => {
  const userId = req.user.id;
  try {
    const query = `
      SELECT d.id, d.reservation_id, d.delivery_status, d.delivery_date, d.return_date, d.notes,
             r.start_date, r.end_date,
             u.name AS client_name,
             a.id AS agent_id,
             au.name AS agent_name
      FROM deliveries d
      JOIN reservations r ON d.reservation_id = r.id
      JOIN users u ON r.user_id = u.id
      JOIN agents a ON d.agent_id = a.id
      JOIN users au ON a.user_id = au.id
      WHERE a.user_id = $1
      ORDER BY d.delivery_date DESC
    `;
    const result = await pool.query(query, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur GET /deliveries/mine:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};



module.exports = { getMyDeliveries };