const db = require('./db');

exports.getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
};

exports.createUser = async ({ name, email, password, phone }) => {
  const result = await db.query(
    'INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, phone]
  );
  return result.rows[0];
};
