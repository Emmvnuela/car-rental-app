const pool = require('../config/db');

const Review = {
  async create(reviewData) {
    const { user_id, car_id, reservation_id, agent_id, rating, comment } = reviewData;
    const result = await pool.query(
      `INSERT INTO reviews (user_id, car_id, reservation_id, agent_id, rating, comment)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, car_id, reservation_id, agent_id, rating, comment]
    );
    return result.rows[0];
  },

  async getAll() {
    const result = await pool.query(`SELECT * FROM reviews ORDER BY created_at DESC`);
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query(`SELECT * FROM reviews WHERE id = $1`, [id]);
    return result.rows[0];
  },

  async getByCarId(car_id) {
    const result = await pool.query(`SELECT * FROM reviews WHERE car_id = $1`, [car_id]);
    return result.rows;
  },

  async getByAgentId(agent_id) {
    const result = await pool.query(`SELECT * FROM reviews WHERE agent_id = $1`, [agent_id]);
    return result.rows;
  },

  async delete(id) {
    const result = await pool.query(`DELETE FROM reviews WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
  }
};

module.exports = Review;
