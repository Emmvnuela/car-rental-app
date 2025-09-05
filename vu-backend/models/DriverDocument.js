const pool = require('../config/db'); // ta connexion PostgreSQL

// Fonction pour créer un enregistrement dans la table driverdocuments
const createDriverDocument = async ({ user_id, birth_date, driving_license, national_id }) => {
  const query = `
    INSERT INTO driverdocuments (user_id, birth_date, driving_license, national_id, is_verified, created_at)
    VALUES ($1, $2, $3, $4, false, NOW())
    RETURNING *;
  `;
  const values = [user_id, birth_date, driving_license, national_id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createDriverDocument,
};
