// models/ContratLocation.js
const pool = require('../config/db');

class ContratLocation {
  static async create(data) {
    const {
      reservation_id,
      date_debut,
      date_fin,
      lieu_retrait,
      lieu_retour,
      montant_total,
      montant_paye,
      conditions,
      statut_contrat
    } = data;

    const query = `
      INSERT INTO contratslocation
      (reservation_id, date_debut, date_fin,
       lieu_retrait, lieu_retour,
       montant_total, montant_paye,
       conditions, statut_contrat)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;
    `;
    const values = [
      reservation_id, date_debut, date_fin,
      lieu_retrait, lieu_retour,
      montant_total, montant_paye,
      conditions, statut_contrat
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query(
      'SELECT * FROM contratslocation ORDER BY id DESC'
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      'SELECT * FROM contratslocation WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const {
      date_fin,
      montant_paye,
      conditions,
      statut_contrat
    } = data;

    const query = `
      UPDATE contratslocation
      SET date_fin      = $1,
          montant_paye  = $2,
          conditions    = $3,
          statut_contrat= $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [date_fin, montant_paye, conditions, statut_contrat, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query(
      'DELETE FROM contratslocation WHERE id = $1',
      [id]
    );
  }
}

module.exports = ContratLocation;
